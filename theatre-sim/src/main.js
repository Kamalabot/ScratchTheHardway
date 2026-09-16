import * as core from '@theatre/core';
import studio from '@theatre/studio';

(async function runTheatreWorkflow() {
    try {
        console.log("Initializing local Theatre.js Studio...");
        // This will now correctly initialize the UI
        studio.initialize();

        // Fetch from the local Vite public directory
        const res = await fetch('/generator.svg');
        if (!res.ok) throw new Error("Could not load generator.svg. Is it in the public folder?");
        
        const svgText = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, "image/svg+xml");
        const svg = doc.querySelector('svg');
        
        const container = document.getElementById('container');
        container.appendChild(svg);

        const svgNS = "http://www.w3.org/2000/svg";
        let defs = svg.querySelector('defs');
        if (!defs) {
            defs = document.createElementNS(svgNS, 'defs');
            svg.prepend(defs);
        }
        
        const filter = document.createElementNS(svgNS, 'filter');
        filter.setAttribute('id', 'core-bloom');
        filter.innerHTML = `
            <feGaussianBlur id="blur-node" stdDeviation="0" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        `;
        defs.appendChild(filter);
        const blurNode = filter.querySelector('#blur-node');

        const paths = Array.from(svg.querySelectorAll('path, rect, polygon'));
        let bgBox = null;
        let coreStar = null;

        paths.forEach(el => {
            const bbox = el.getBBox();
            if (bbox.width > 100 && bbox.height > 100 && !coreStar && el.tagName.toLowerCase() === 'path') {
                coreStar = el;
            } else {
                bgBox = el;
            }
        });

        if (!coreStar && paths.length >= 2) {
            bgBox = paths[0];
            coreStar = paths[1];
        } else if (!coreStar && paths.length === 1) {
            coreStar = paths[0];
        }

        if (coreStar) {
            coreStar.style.transformOrigin = "50% 50%";
            coreStar.style.transformBox = "fill-box";
            coreStar.setAttribute('filter', 'url(#core-bloom)');
        }
        
        if (bgBox) {
            bgBox.style.transformOrigin = "50% 50%";
            bgBox.style.transformBox = "fill-box";
        }

        // Establish Sovereign Project State
        const project = core.getProject('GeneratorSimulation');
        const sheet = project.sheet('CoreAnimationSheet');

        const coreObject = sheet.object('Generator Core', {
            rotation: core.types.number(0, { range: [-720, 720] }),
            scale: core.types.number(1, { range: [0.5, 2] }),
            bloom: core.types.number(0, { range: [0, 30] }),
            boxPulse: core.types.number(1, { range: [0.8, 1.4] })
        });

        coreObject.onValuesChange((values) => {
            if (coreStar) {
                coreStar.style.transform = `rotate(${values.rotation}deg) scale(${values.scale})`;
                blurNode.setAttribute('stdDeviation', values.bloom.toString());
            }
            if (bgBox) {
                bgBox.style.transform = `scale(${values.boxPulse})`;
            }
        });

        await project.ready;
        console.log("Theatre project bounded to local DOM.");
        sheet.sequence.play({ iterationCount: Infinity, range: [0, 4] });

    } catch (err) {
        console.error("Local Initialization Failed:", err);
    }
})();