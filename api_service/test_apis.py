import sys
import logging
import requests
import xml.etree.ElementTree as ET
from zeep import Client

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

BASE_URL = "http://127.0.0.1:5000"


def test_rest_api():
    print("\n" + "=" * 60)
    print("                TESTING REST API")
    print("=" * 60)

    # 1. GET /api/records
    logging.info("Testing REST GET /api/records...")
    res = requests.get(f"{BASE_URL}/api/records")
    assert res.status_code == 200, f"Expected 200, got {res.status_code}"
    data = res.json()
    logging.info(f"REST GET success: retrieved {data['count']} records.")

    # 2. POST /api/records
    logging.info("Testing REST POST /api/records...")
    payload = {
        "name": "Arthur Dent",
        "email": "arthur.dent@hitchhiker.galaxy",
        "notes": "Created via REST automated verification"
    }
    res = requests.post(f"{BASE_URL}/api/records", json=payload)
    assert res.status_code == 201, f"Expected 201, got {res.status_code}"
    created_id = res.json()["data"]["id"]
    logging.info(f"REST POST success: created record ID {created_id}.")

    # 3. GET /api/records/<id>
    logging.info(f"Testing REST GET /api/records/{created_id}...")
    res = requests.get(f"{BASE_URL}/api/records/{created_id}")
    assert res.status_code == 200, f"Expected 200, got {res.status_code}"
    rec = res.json()["data"]
    assert rec["name"] == "Arthur Dent"
    logging.info(f"REST GET ID success: verified name '{rec['name']}'.")

    print("[SUCCESS] All REST API operations validated.")


def test_soap_api_raw_xml():
    print("\n" + "=" * 60)
    print("            TESTING SOAP API (RAW XML)")
    print("=" * 60)

    # 1. WSDL inspection
    logging.info("Testing SOAP GET /soap?wsdl...")
    res = requests.get(f"{BASE_URL}/soap?wsdl")
    assert res.status_code == 200, f"Expected 200, got {res.status_code}"
    assert "<wsdl:definitions" in res.text
    logging.info("SOAP WSDL retrieval success: valid XML definition received.")

    # 2. CreateRecordRequest
    logging.info("Testing SOAP POST CreateRecordRequest...")
    create_soap_req = """<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:rec="http://tempuri.org/records">
  <soapenv:Body>
    <rec:CreateRecordRequest>
      <rec:Name>Ford Prefect</rec:Name>
      <rec:Email>ford.prefect@betelgeuse.galaxy</rec:Email>
      <rec:Notes>Created via SOAP automated verification</rec:Notes>
    </rec:CreateRecordRequest>
  </soapenv:Body>
</soapenv:Envelope>"""
    res = requests.post(
        f"{BASE_URL}/soap",
        data=create_soap_req.encode("utf-8"),
        headers={"Content-Type": "text/xml; charset=utf-8"}
    )
    assert res.status_code == 200, f"Expected 200, got {res.status_code}"
    root = ET.fromstring(res.text)
    id_el = root.find(".//{http://tempuri.org/records}Id")
    created_id = int(id_el.text)
    logging.info(f"SOAP CreateRecord success: created record ID {created_id}.")

    # 3. GetRecordRequest
    logging.info(f"Testing SOAP POST GetRecordRequest for ID {created_id}...")
    get_soap_req = f"""<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:rec="http://tempuri.org/records">
  <soapenv:Body>
    <rec:GetRecordRequest>
      <rec:Id>{created_id}</rec:Id>
    </rec:GetRecordRequest>
  </soapenv:Body>
</soapenv:Envelope>"""
    res = requests.post(
        f"{BASE_URL}/soap",
        data=get_soap_req.encode("utf-8"),
        headers={"Content-Type": "text/xml; charset=utf-8"}
    )
    assert res.status_code == 200, f"Expected 200, got {res.status_code}"
    root = ET.fromstring(res.text)
    name_el = root.find(".//{http://tempuri.org/records}Name")
    assert name_el.text == "Ford Prefect"
    logging.info(f"SOAP GetRecord success: retrieved name '{name_el.text}'.")

    # 4. GetAllRecordsRequest
    logging.info("Testing SOAP POST GetAllRecordsRequest...")
    get_all_soap_req = """<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:rec="http://tempuri.org/records">
  <soapenv:Body>
    <rec:GetAllRecordsRequest/>
  </soapenv:Body>
</soapenv:Envelope>"""
    res = requests.post(
        f"{BASE_URL}/soap",
        data=get_all_soap_req.encode("utf-8"),
        headers={"Content-Type": "text/xml; charset=utf-8"}
    )
    assert res.status_code == 200, f"Expected 200, got {res.status_code}"
    root = ET.fromstring(res.text)
    records = root.findall(".//{http://tempuri.org/records}Record")
    logging.info(f"SOAP GetAllRecords success: retrieved {len(records)} records.")

    print("[SUCCESS] All raw SOAP XML operations validated.")


def test_soap_api_zeep():
    print("\n" + "=" * 60)
    print("            TESTING SOAP API (ZEEP CLIENT)")
    print("=" * 60)
    logging.info("Connecting Zeep client to WSDL...")
    client = Client(f"{BASE_URL}/soap?wsdl")

    logging.info("Calling Zeep GetAllRecords()...")
    res = client.service.GetAllRecords()
    logging.info(f"Zeep GetAllRecords response raw: {res}")
    records = res if isinstance(res, list) else (res.get("Record", []) if isinstance(res, dict) else [res])
    logging.info(f"Zeep GetAllRecords success: {len(records)} records received via enterprise client.")

    logging.info("Calling Zeep CreateRecord()...")
    create_res = client.service.CreateRecord(
        Name="Tricia McMillan",
        Email="trillian@sub-etha.net",
        Notes="Created via Zeep SOAP Client"
    )
    logging.info(f"Zeep CreateRecord success: Created ID {create_res['Id']}.")

    print("[SUCCESS] Enterprise Zeep SOAP Client validated.")


def main():
    try:
        test_rest_api()
        test_soap_api_raw_xml()
        test_soap_api_zeep()
        print("\n" + "=" * 60)
        print("          ALL VERIFICATION TESTS PASSED (100%)")
        print("=" * 60 + "\n")
        sys.exit(0)
    except requests.exceptions.ConnectionError:
        print("\n[ERROR] Could not connect to API Gateway at http://127.0.0.1:5000.")
        print("Ensure 'python api_service.py' is running in another terminal window first.")
        sys.exit(1)
    except Exception as exc:
        logging.error(f"Test failure: {exc}")
        sys.exit(1)


if __name__ == "__main__":
    main()
