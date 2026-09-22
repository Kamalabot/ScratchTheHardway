import Phaser from 'phaser';
import { gsap } from 'gsap';
import * as WDesign from './workday_design_system.js';

export class WorkdayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WorkdayScene' });
    }

    preload() {
        // Placeholder for audio/images if needed
    }

    create() {
        this.cx = this.scale.width / 2;
        this.cy = this.scale.height / 2;

        // Narration text banner at the top
        this.narrativeBanner = this.add.text(this.cx, 50, 'INITIALIZING WORKDAY ARCHITECTURE', {
            fontFamily: 'monospace',
            fontSize: '24px',
            color: '#FFD600',
            backgroundColor: '#1E2638',
            padding: { x: 20, y: 10 },
            align: 'center'
        }).setOrigin(0.5);

        // Build the environment
        this.setupEnvironment();
        
        // Setup the master GSAP timeline
        this.tl = gsap.timeline({
            onUpdate: () => {
                // Future implementation: tie to a scrub bar if desired
            }
        });

        // Orchestrate the phases
        this.orchestratePhase1();
        this.orchestratePhase2();
        this.orchestratePhase3();
        this.orchestratePhase4();
    }

    setupEnvironment() {
        // Phase 1: Tenants & Databases
        this.implTenant = WDesign.createTenantVault(this, this.cx - 400, this.cy - 150, 'IMPLEMENTATION', WDesign.Colors.ImplTenant).setAlpha(0);
        this.prodTenant = WDesign.createTenantVault(this, this.cx + 400, this.cy - 150, 'PRODUCTION', WDesign.Colors.ProdTenant).setAlpha(0);

        // Tables inside Prod Tenant
        this.workerTable = WDesign.createDatabaseTable(this, this.cx + 400, this.cy - 180, 'workers (Relational)', ['id [PK]', 'name', 'hire_date', 'status']).setAlpha(0);
        
        // Denormalized Cache
        this.workerCache = WDesign.createDenormCache(this, this.cx + 400, this.cy + 30, 'worker_profile_cache').setAlpha(0);

        // Phase 2: BP Engine Tracks & Gates
        const trackPoints = [
            {x: 100, y: this.cy + 250},
            {x: this.cx, y: this.cy + 250},
            {x: this.cx, y: this.cy + 100}, // Gate location
            {x: this.cx + 400, y: this.cy + 100} // Into Prod Tenant
        ];
        this.bpTrack = WDesign.drawPneumaticTrack(this, trackPoints).setAlpha(0);
        
        this.isgGate = WDesign.createISGGate(this, this.cx, this.cy + 120, 'ISG: HR PARTNER').setAlpha(0);
        this.isuGate = WDesign.createISGGate(this, this.cx - 200, this.cy + 220, 'ISU: API SERVICE').setAlpha(0);

        // Event Capsules
        this.hireEvent = WDesign.createEventCapsule(this, 100, this.cy + 250, 'BP: HIRE WORKER', WDesign.Colors.EventHire).setAlpha(0);
        this.absenceEvent = WDesign.createEventCapsule(this, 0, this.cy + 250, 'BP: REQ ABSENCE', WDesign.Colors.EventAbsence).setAlpha(0);
        
        // Crowd of background events
        this.bgEvents = [];
        for(let i=0; i<15; i++) {
            let ev = WDesign.createEventCapsule(this, -100 - (i*80), this.cy + 250, 'EVENT', 0x6272A4).setAlpha(0);
            this.bgEvents.push(ev);
        }

        // Phase 3 & 4
        this.eibContainer = WDesign.createEIBCargoContainer(this, this.cx - 200, this.cy + 350, 'Worker Data').setAlpha(0);
        this.xmlForge = WDesign.createStudioXMLForge(this, this.cx + 200, this.cy + 350).setAlpha(0);
        this.payrollAlu = WDesign.createPayrollALU(this, this.cx - 300, this.cy - 100).setAlpha(0);
        this.sftpTruck = WDesign.createArmoredTruck(this, this.cx - 300, this.cy + 50, 'NACHA/BACS').setAlpha(0);
    }

    setNarration(text) {
        this.tl.call(() => {
            this.narrativeBanner.setText(text);
            // Flash effect
            this.tweens.add({
                targets: this.narrativeBanner,
                alpha: 0.5,
                yoyo: true,
                duration: 100,
                repeat: 1
            });
        });
    }

    orchestratePhase1() {
        this.setNarration("PHASE 1: THE TENANT ARCHITECTURE");
        
        // Fade in Implementation Tenant
        this.tl.to(this.implTenant, { alpha: 1, duration: 1 });
        this.setNarration("Implementation Tenant: Where configuration & testing occurs.");
        this.tl.to({}, { duration: 1.5 }); // dwell

        // Fade in Production Tenant
        this.tl.to(this.prodTenant, { alpha: 1, duration: 1 });
        this.setNarration("Production Tenant: The live enterprise data vault.");
        this.tl.to({}, { duration: 1.5 });

        // Show Relational Tables vs Denormalization
        this.setNarration("Inside the Vault: Strict Relational Tables enforce data integrity.");
        this.tl.to(this.workerTable, { alpha: 1, duration: 1 });
        this.tl.to({}, { duration: 1.5 });

        this.setNarration("Denormalization: Workday flattens data into Read-Optimized Caches for UI speed.");
        this.tl.to(this.workerCache, { alpha: 1, duration: 1, y: this.cy + 50, ease: 'back.out' });
        this.tl.to({}, { duration: 2 });
    }

    orchestratePhase2() {
        this.setNarration("PHASE 2: THE BUSINESS PROCESS (BP) ENGINE");
        
        // Reveal track and gates
        this.tl.to([this.bpTrack, this.isgGate, this.isuGate], { alpha: 1, duration: 1 });
        
        this.setNarration("High-volume Event Traffic queues behind Security Gates (ISG/ISU).");
        
        // Bring in the crowd of events
        this.bgEvents.forEach((ev, i) => {
            this.tl.to(ev, { alpha: 0.6, x: this.cx - 250 - (i*40), duration: 0.5, ease: 'power1.out' }, "-=0.4");
        });
        this.tl.to({}, { duration: 1 });

        // The Hire Worker BP
        this.setNarration("Triggering BP: HIRE WORKER");
        this.tl.to(this.hireEvent, { alpha: 1, x: this.cx - 200, duration: 1, ease: 'power2.out' });
        
        this.setNarration("ISU Gate verifies API Authentication / ISG verifies HR Partner Roles.");
        this.tl.call(() => this.isuGate.openGate());
        this.tl.to(this.hireEvent, { x: this.cx, duration: 1 }, "+=0.5");
        
        this.tl.call(() => {
            this.isuGate.closeGate();
            this.isgGate.openGate();
        });
        
        this.setNarration("Routing condition: Approved! Routing to Production Tenant Vault.");
        this.tl.to(this.hireEvent, { y: this.cy + 100, duration: 0.5, ease: 'power1.in' });
        this.tl.to(this.hireEvent, { x: this.cx + 400, duration: 1, ease: 'power1.out' });
        
        this.tl.call(() => this.isgGate.closeGate());
        this.tl.to(this.hireEvent, { alpha: 0, scale: 0.5, duration: 0.5 }); // Absorbed into DB
        
        this.setNarration("Writing to Relational Table & Updating Denormalized Cache.");
        this.tl.to(this.workerTable, { y: '-=10', yoyo: true, repeat: 1, duration: 0.2 });
        this.tl.to(this.workerCache, { y: '-=10', yoyo: true, repeat: 1, duration: 0.2 }, "+=0.2");
        this.tl.to({}, { duration: 1 });

        // The Absence BP
        this.setNarration("Next: Triggering BP: REQUEST ABSENCE");
        this.tl.to(this.absenceEvent, { alpha: 1, x: this.cx - 200, duration: 1, ease: 'power2.out' });
        this.tl.call(() => this.isuGate.openGate());
        this.tl.to(this.absenceEvent, { x: this.cx, duration: 1 }, "+=0.5");
        this.tl.call(() => {
            this.isuGate.closeGate();
            this.isgGate.openGate();
        });
        this.tl.to(this.absenceEvent, { y: this.cy + 100, duration: 0.5, ease: 'power1.in' });
        this.tl.to(this.absenceEvent, { x: this.cx + 400, duration: 1, ease: 'power1.out' });
        this.tl.call(() => this.isgGate.closeGate());
        this.tl.to(this.absenceEvent, { alpha: 0, scale: 0.5, duration: 0.5 }); 
        
        this.tl.to({}, { duration: 2 });
    }

    orchestratePhase3() {
        this.setNarration("PHASE 3: INTEGRATIONS (EIB & STUDIO)");
        
        // Hide previous elements for visual clarity
        this.tl.to([this.bpTrack, this.isgGate, this.isuGate], { alpha: 0, duration: 1 });
        
        // Bring in EIB
        this.tl.to(this.eibContainer, { alpha: 1, x: this.cx, duration: 1.5, ease: 'power2.out' });
        this.setNarration("EIB: 'Bulk Spreadsheet Forklift' arrives with Cargo.");
        this.tl.to({}, { duration: 1 });

        this.setNarration("Cracking open cargo container. Notice: tabular data is just SOAP in disguise.");
        this.tl.call(() => this.eibContainer.crackOpen());
        this.tl.to({}, { duration: 2 });

        // Studio XML Forge
        this.setNarration("Workday Studio: Complex Multi-step Assembly (Java Engine).");
        this.tl.to(this.xmlForge, { alpha: 1, duration: 1 });
        
        // Dissecting XML
        this.setNarration("XML Payloads are physically dissected. BP triggers execute GET/POST here.");
        this.tl.to(this.eibContainer, { x: this.cx - 150, duration: 1 });
        this.tl.to(this.xmlForge, { x: this.cx + 150, duration: 1 }, "-=1");
        
        // Emit processed tokens
        const token = WDesign.createEventCapsule(this, this.cx + 150, this.cy + 350, 'PROCESSED', 0x00FF88).setAlpha(0);
        this.tl.to(token, { alpha: 1, duration: 0.2 });
        this.tl.to(token, { y: this.cy + 250, duration: 1 });
        this.tl.to(token, { alpha: 0, duration: 0.2 });

        this.tl.to({}, { duration: 2 });
    }

    orchestratePhase4() {
        this.setNarration("PHASE 4: PAYROLL & SCM");
        
        // Hide P3 elements
        this.tl.to([this.eibContainer, this.xmlForge], { alpha: 0, duration: 1 });
        
        this.setNarration("Payroll: Massive Multi-threaded ALU Gearbox.");
        this.tl.to(this.payrollAlu, { alpha: 1, x: this.cx, duration: 1.5, ease: 'power2.out' });
        
        this.setNarration("Laborious Data Lineage: Ingesting Time & Deductions...");
        // Suck in data tokens
        for(let i=0; i<3; i++) {
            let dataTok = WDesign.createEventCapsule(this, this.cx + 200, this.cy - 100, `DATA_${i}`, 0x9D4EDD).setAlpha(0);
            this.tl.to(dataTok, { alpha: 1, duration: 0.2 });
            this.tl.to(dataTok, { x: this.cx, duration: 0.5, ease: 'power1.in' });
            this.tl.to(dataTok, { alpha: 0, duration: 0.1 });
            this.tl.to(this.payrollAlu, { scale: 1.05, yoyo: true, repeat: 1, duration: 0.1 }); // Crunch
        }
        
        this.setNarration("Emitting secure Net Pay and NACHA Settlement files.");
        let nachaFile = WDesign.createEventCapsule(this, this.cx, this.cy - 100, 'NACHA', 0x00F0FF).setAlpha(0);
        this.tl.to(nachaFile, { alpha: 1, y: this.cy + 50, duration: 1 });
        
        this.setNarration("Bank SCM Integration: Armored SFTP truck takes delivery.");
        this.tl.to(this.sftpTruck, { alpha: 1, x: this.cx, duration: 1.5 });
        this.tl.to(nachaFile, { alpha: 0, duration: 0.5 }); // Loaded onto truck
        
        this.setNarration("Truck departs to Bank. Awaits ACK receipt.");
        this.tl.to(this.sftpTruck, { x: this.cx + 500, duration: 2, ease: 'power2.in' });
        
        this.tl.to({}, { duration: 2 });
        this.setNarration("END OF WORKDAY SYSTEM VISUALIZATION");
    }
}
