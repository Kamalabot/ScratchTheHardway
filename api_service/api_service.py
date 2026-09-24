import os
import sys
import sqlite3
import re
import logging
from datetime import datetime
from xml.sax.saxutils import escape as xml_escape
import xml.etree.ElementTree as ET

from flask import Flask, request, jsonify, Response

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

app = Flask(__name__)
DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "records.db")
EMAIL_REGEX = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"

WSDL_TEMPLATE = """<?xml version="1.0" encoding="UTF-8"?>
<wsdl:definitions name="RecordService"
    targetNamespace="http://tempuri.org/records"
    xmlns:tns="http://tempuri.org/records"
    xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
    xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema">

  <wsdl:types>
    <xsd:schema targetNamespace="http://tempuri.org/records" elementFormDefault="qualified">
      <xsd:complexType name="RecordType">
        <xsd:sequence>
          <xsd:element name="Id" type="xsd:int"/>
          <xsd:element name="Name" type="xsd:string"/>
          <xsd:element name="Email" type="xsd:string"/>
          <xsd:element name="Notes" type="xsd:string" minOccurs="0"/>
          <xsd:element name="CreatedAt" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>

      <xsd:element name="GetAllRecordsRequest">
        <xsd:complexType/>
      </xsd:element>

      <xsd:element name="GetAllRecordsResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="Record" type="tns:RecordType" minOccurs="0" maxOccurs="unbounded"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>

      <xsd:element name="GetRecordRequest">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="Id" type="xsd:int"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>

      <xsd:element name="GetRecordResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="Record" type="tns:RecordType" minOccurs="0"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>

      <xsd:element name="CreateRecordRequest">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="Name" type="xsd:string"/>
            <xsd:element name="Email" type="xsd:string"/>
            <xsd:element name="Notes" type="xsd:string" minOccurs="0"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>

      <xsd:element name="CreateRecordResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="Id" type="xsd:int"/>
            <xsd:element name="Status" type="xsd:string"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
    </xsd:schema>
  </wsdl:types>

  <wsdl:message name="GetAllRecordsInput">
    <wsdl:part name="parameters" element="tns:GetAllRecordsRequest"/>
  </wsdl:message>
  <wsdl:message name="GetAllRecordsOutput">
    <wsdl:part name="parameters" element="tns:GetAllRecordsResponse"/>
  </wsdl:message>

  <wsdl:message name="GetRecordInput">
    <wsdl:part name="parameters" element="tns:GetRecordRequest"/>
  </wsdl:message>
  <wsdl:message name="GetRecordOutput">
    <wsdl:part name="parameters" element="tns:GetRecordResponse"/>
  </wsdl:message>

  <wsdl:message name="CreateRecordInput">
    <wsdl:part name="parameters" element="tns:CreateRecordRequest"/>
  </wsdl:message>
  <wsdl:message name="CreateRecordOutput">
    <wsdl:part name="parameters" element="tns:CreateRecordResponse"/>
  </wsdl:message>

  <wsdl:portType name="RecordPortType">
    <wsdl:operation name="GetAllRecords">
      <wsdl:input message="tns:GetAllRecordsInput"/>
      <wsdl:output message="tns:GetAllRecordsOutput"/>
    </wsdl:operation>
    <wsdl:operation name="GetRecord">
      <wsdl:input message="tns:GetRecordInput"/>
      <wsdl:output message="tns:GetRecordOutput"/>
    </wsdl:operation>
    <wsdl:operation name="CreateRecord">
      <wsdl:input message="tns:CreateRecordInput"/>
      <wsdl:output message="tns:CreateRecordOutput"/>
    </wsdl:operation>
  </wsdl:portType>

  <wsdl:binding name="RecordBinding" type="tns:RecordPortType">
    <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
    <wsdl:operation name="GetAllRecords">
      <soap:operation soapAction="http://tempuri.org/records/GetAllRecords"/>
      <wsdl:input><soap:body use="literal"/></wsdl:input>
      <wsdl:output><soap:body use="literal"/></wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="GetRecord">
      <soap:operation soapAction="http://tempuri.org/records/GetRecord"/>
      <wsdl:input><soap:body use="literal"/></wsdl:input>
      <wsdl:output><soap:body use="literal"/></wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="CreateRecord">
      <soap:operation soapAction="http://tempuri.org/records/CreateRecord"/>
      <wsdl:input><soap:body use="literal"/></wsdl:input>
      <wsdl:output><soap:body use="literal"/></wsdl:output>
    </wsdl:operation>
  </wsdl:binding>

  <wsdl:service name="RecordService">
    <wsdl:port name="RecordPort" binding="tns:RecordBinding">
      <soap:address location="http://127.0.0.1:5000/soap"/>
    </wsdl:port>
  </wsdl:service>
</wsdl:definitions>"""


def get_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/", methods=["GET"])
def index():
    logging.info("Routing request to landing page summary.")
    html = """<!DOCTYPE html>
<html>
<head>
    <title>Records API Gateway</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px; margin: 0; }
        .card { background: #1e293b; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #334155; }
        h1 { color: #38bdf8; margin-top: 0; }
        h2 { color: #818cf8; margin-top: 0; }
        code { background: #0f172a; color: #38bdf8; padding: 3px 8px; border-radius: 4px; font-size: 0.9em; }
        a { color: #38bdf8; text-decoration: none; }
        a:hover { text-decoration: underline; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        th, td { text-align: left; padding: 10px; border-bottom: 1px solid #334155; }
        th { color: #94a3b8; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Unified REST & SOAP API Gateway</h1>
        <p>Serving local-first SQLite records with Dual API interfaces.</p>
    </div>

    <div class="card">
        <h2>REST API Endpoints</h2>
        <table>
            <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
            <tr><td><code>GET</code></td><td><a href="/api/records">/api/records</a></td><td>Fetch all records (JSON)</td></tr>
            <tr><td><code>GET</code></td><td><code>/api/records/&lt;id&gt;</code></td><td>Fetch single record by ID</td></tr>
            <tr><td><code>POST</code></td><td><code>/api/records</code></td><td>Create new record (JSON body)</td></tr>
            <tr><td><code>DELETE</code></td><td><code>/api/records/&lt;id&gt;</code></td><td>Delete record by ID</td></tr>
        </table>
    </div>

    <div class="card">
        <h2>SOAP API Endpoints</h2>
        <table>
            <tr><th>Type</th><th>Endpoint</th><th>Description</th></tr>
            <tr><td><code>WSDL</code></td><td><a href="/soap?wsdl">/soap?wsdl</a></td><td>Web Services Description Language (WSDL)</td></tr>
            <tr><td><code>POST</code></td><td><code>/soap</code></td><td>SOAP 1.1/1.2 Envelope Endpoint</td></tr>
        </table>
    </div>
</body>
</html>"""
    return Response(html, mimetype="text/html")


# ==========================================
# REST API IMPLEMENTATION
# ==========================================

@app.route("/api/records", methods=["GET"])
def rest_get_all_records():
    logging.info("REST: Initiating request to fetch all records.")
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, name, email, notes, created_at FROM records ORDER BY id ASC")
            rows = cursor.fetchall()
            results = []
            for idx, row in enumerate(rows, start=1):
                logging.info(f"Loop iteration: Serializing REST record {idx}/{len(rows)} (ID: {row['id']}).")
                results.append({
                    "id": row["id"],
                    "name": row["name"],
                    "email": row["email"],
                    "notes": row["notes"],
                    "created_at": row["created_at"]
                })
            logging.info(f"Branch: Successfully serialized {len(results)} records.")
            return jsonify({"status": "success", "count": len(results), "data": results}), 200
    except sqlite3.Error as exc:
        logging.error(f"REST database query error: {exc}")
        return jsonify({"status": "error", "message": str(exc)}), 500


@app.route("/api/records/<int:record_id>", methods=["GET"])
def rest_get_record(record_id: int):
    logging.info(f"REST: Querying record ID {record_id}...")
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, name, email, notes, created_at FROM records WHERE id = ?", (record_id,))
            row = cursor.fetchone()
            if row:
                logging.info(f"Branch: Record ID {record_id} found.")
                return jsonify({
                    "status": "success",
                    "data": {
                        "id": row["id"],
                        "name": row["name"],
                        "email": row["email"],
                        "notes": row["notes"],
                        "created_at": row["created_at"]
                    }
                }), 200
            else:
                logging.warning(f"Branch: Record ID {record_id} not found.")
                return jsonify({"status": "error", "message": f"Record with ID {record_id} not found."}), 404
    except sqlite3.Error as exc:
        logging.error(f"REST record query error: {exc}")
        return jsonify({"status": "error", "message": str(exc)}), 500


@app.route("/api/records", methods=["POST"])
def rest_create_record():
    logging.info("REST: Processing record creation request...")
    data = request.get_json(silent=True)
    if not data:
        logging.warning("Branch: Invalid or missing JSON body.")
        return jsonify({"status": "error", "message": "Missing or invalid JSON payload."}), 400

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    notes = data.get("notes", "").strip()

    if not name:
        logging.warning("Branch: Validation failed - name missing.")
        return jsonify({"status": "error", "message": "Field 'name' is required and cannot be empty."}), 422

    if not re.match(EMAIL_REGEX, email):
        logging.warning(f"Branch: Validation failed - invalid email '{email}'.")
        return jsonify({"status": "error", "message": "Invalid email address format."}), 422

    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO records (name, email, notes, created_at) VALUES (?, ?, ?, ?)",
                (name, email, notes, created_at)
            )
            conn.commit()
            new_id = cursor.lastrowid
            logging.info(f"Branch: Created new REST record with ID {new_id}.")
            return jsonify({
                "status": "success",
                "message": "Record created successfully.",
                "data": {
                    "id": new_id,
                    "name": name,
                    "email": email,
                    "notes": notes,
                    "created_at": created_at
                }
            }), 201
    except sqlite3.Error as exc:
        logging.error(f"REST record insertion error: {exc}")
        return jsonify({"status": "error", "message": str(exc)}), 500


@app.route("/api/records/<int:record_id>", methods=["DELETE"])
def rest_delete_record(record_id: int):
    logging.info(f"REST: Deleting record ID {record_id}...")
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id FROM records WHERE id = ?", (record_id,))
            if not cursor.fetchone():
                logging.warning(f"Branch: Record ID {record_id} does not exist for deletion.")
                return jsonify({"status": "error", "message": f"Record with ID {record_id} not found."}), 404

            cursor.execute("DELETE FROM records WHERE id = ?", (record_id,))
            conn.commit()
            logging.info(f"Branch: Record ID {record_id} successfully deleted.")
            return jsonify({"status": "success", "message": f"Record {record_id} deleted."}), 200
    except sqlite3.Error as exc:
        logging.error(f"REST record deletion error: {exc}")
        return jsonify({"status": "error", "message": str(exc)}), 500


# ==========================================
# SOAP API IMPLEMENTATION
# ==========================================

def create_soap_fault(fault_code: str, fault_string: str) -> Response:
    xml_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <soap:Fault>
      <faultcode>{xml_escape(fault_code)}</faultcode>
      <faultstring>{xml_escape(fault_string)}</faultstring>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>"""
    return Response(xml_content, status=500, mimetype="text/xml; charset=utf-8")


@app.route("/soap", methods=["GET", "POST"])
def soap_handler():
    if request.method == "GET":
        if "wsdl" in request.args:
            logging.info("Branch: Serving SOAP WSDL definition.")
            return Response(WSDL_TEMPLATE, status=200, mimetype="application/xml; charset=utf-8")
        else:
            logging.info("Branch: GET /soap without ?wsdl; returning info.")
            return Response(
                "SOAP Endpoint Active. Append ?wsdl to view the service definition.",
                status=200,
                mimetype="text/plain"
            )

    logging.info("SOAP: Received incoming SOAP POST request.")
    xml_data = request.data
    if not xml_data:
        logging.warning("Branch: Empty SOAP payload received.")
        return create_soap_fault("soap:Client", "Empty HTTP request payload.")

    try:
        root = ET.fromstring(xml_data)
    except ET.ParseError as exc:
        logging.error(f"Branch: XML parsing failed: {exc}")
        return create_soap_fault("soap:Client", f"XML syntax error: {exc}")

    body_element = None
    for child in root:
        if child.tag.split("}")[-1] == "Body":
            body_element = child
            break

    if body_element is None or len(body_element) == 0:
        logging.warning("Branch: SOAP Body element missing or empty.")
        return create_soap_fault("soap:Client", "SOAP Envelope is missing a valid Body element.")

    operation_element = body_element[0]
    op_name = operation_element.tag.split("}")[-1]
    logging.info(f"Branch: SOAP Operation detected: '{op_name}'.")

    if op_name == "GetAllRecordsRequest":
        return handle_soap_get_all_records()
    elif op_name == "GetRecordRequest":
        return handle_soap_get_record(operation_element)
    elif op_name == "CreateRecordRequest":
        return handle_soap_create_record(operation_element)
    else:
        logging.warning(f"Branch: Unsupported SOAP operation '{op_name}'.")
        return create_soap_fault("soap:Client", f"Unknown SOAP operation: {op_name}")


def handle_soap_get_all_records() -> Response:
    logging.info("SOAP: Executing GetAllRecords query...")
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, name, email, notes, created_at FROM records ORDER BY id ASC")
            rows = cursor.fetchall()
            logging.info(f"Branch: Retrieved {len(rows)} records for SOAP response.")

            record_elements = []
            for idx, row in enumerate(rows, start=1):
                logging.info(f"Loop iteration: Packaging SOAP record {idx}/{len(rows)} (ID: {row['id']}).")
                r_notes = xml_escape(row["notes"] or "")
                record_xml = f"""        <tns:Record>
          <tns:Id>{row['id']}</tns:Id>
          <tns:Name>{xml_escape(row['name'])}</tns:Name>
          <tns:Email>{xml_escape(row['email'])}</tns:Email>
          <tns:Notes>{r_notes}</tns:Notes>
          <tns:CreatedAt>{xml_escape(row['created_at'])}</tns:CreatedAt>
        </tns:Record>"""
                record_elements.append(record_xml)

            body_content = "\n".join(record_elements)
            response_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="http://tempuri.org/records">
  <soap:Body>
    <tns:GetAllRecordsResponse>
{body_content}
    </tns:GetAllRecordsResponse>
  </soap:Body>
</soap:Envelope>"""
            return Response(response_xml, status=200, mimetype="text/xml; charset=utf-8")
    except sqlite3.Error as exc:
        logging.error(f"SOAP database error: {exc}")
        return create_soap_fault("soap:Server", str(exc))


def handle_soap_get_record(operation_element: ET.Element) -> Response:
    logging.info("SOAP: Processing GetRecord request...")
    id_element = None
    for child in operation_element:
        if child.tag.split("}")[-1] == "Id":
            id_element = child
            break

    if id_element is None or not id_element.text:
        logging.warning("Branch: Missing record Id in SOAP GetRecordRequest.")
        return create_soap_fault("soap:Client", "Element <Id> is required.")

    try:
        record_id = int(id_element.text.strip())
    except ValueError:
        logging.warning(f"Branch: Non-integer record Id '{id_element.text}'.")
        return create_soap_fault("soap:Client", "Element <Id> must be a valid integer.")

    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, name, email, notes, created_at FROM records WHERE id = ?", (record_id,))
            row = cursor.fetchone()
            if not row:
                logging.warning(f"Branch: Record ID {record_id} not found.")
                return create_soap_fault("soap:Client", f"Record with ID {record_id} not found.")

            logging.info(f"Branch: Record ID {record_id} located.")
            r_notes = xml_escape(row["notes"] or "")
            response_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="http://tempuri.org/records">
  <soap:Body>
    <tns:GetRecordResponse>
      <tns:Record>
        <tns:Id>{row['id']}</tns:Id>
        <tns:Name>{xml_escape(row['name'])}</tns:Name>
        <tns:Email>{xml_escape(row['email'])}</tns:Email>
        <tns:Notes>{r_notes}</tns:Notes>
        <tns:CreatedAt>{xml_escape(row['created_at'])}</tns:CreatedAt>
      </tns:Record>
    </tns:GetRecordResponse>
  </soap:Body>
</soap:Envelope>"""
            return Response(response_xml, status=200, mimetype="text/xml; charset=utf-8")
    except sqlite3.Error as exc:
        logging.error(f"SOAP query error: {exc}")
        return create_soap_fault("soap:Server", str(exc))


def handle_soap_create_record(operation_element: ET.Element) -> Response:
    logging.info("SOAP: Processing CreateRecord request...")
    params = {}
    for child in operation_element:
        tag_name = child.tag.split("}")[-1]
        params[tag_name] = (child.text or "").strip()

    name = params.get("Name", "")
    email = params.get("Email", "")
    notes = params.get("Notes", "")

    if not name:
        logging.warning("Branch: Validation failed - <Name> missing.")
        return create_soap_fault("soap:Client", "Field <Name> is required and cannot be empty.")

    if not re.match(EMAIL_REGEX, email):
        logging.warning(f"Branch: Validation failed - invalid <Email> '{email}'.")
        return create_soap_fault("soap:Client", "Invalid <Email> format.")

    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO records (name, email, notes, created_at) VALUES (?, ?, ?, ?)",
                (name, email, notes, created_at)
            )
            conn.commit()
            new_id = cursor.lastrowid
            logging.info(f"Branch: Created new SOAP record with generated ID {new_id}.")

            response_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="http://tempuri.org/records">
  <soap:Body>
    <tns:CreateRecordResponse>
      <tns:Id>{new_id}</tns:Id>
      <tns:Status>Success</tns:Status>
    </tns:CreateRecordResponse>
  </soap:Body>
</soap:Envelope>"""
            return Response(response_xml, status=200, mimetype="text/xml; charset=utf-8")
    except sqlite3.Error as exc:
        logging.error(f"SOAP insertion error: {exc}")
        return create_soap_fault("soap:Server", str(exc))


if __name__ == "__main__":
    logging.info("Starting Unified REST & SOAP API Gateway on http://127.0.0.1:5000 ...")
    app.run(host="127.0.0.1", port=5000, debug=False)
