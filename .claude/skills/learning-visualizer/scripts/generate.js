#!/usr/bin/env node

/**
 * Learning Visualizer - Main Generator Orchestrator
 * Detects diagram type and routes to appropriate generator
 */

const fs = require('fs');
const path = require('path');

const generators = {
    hierarchy: require('./diagrams/hierarchy/generator.js'),
    flow: require('./diagrams/flow/generator.js'),
    network: require('./diagrams/network/generator.js'),
    timeline: require('./diagrams/timeline/generator.js'),
    matrix: require('./diagrams/matrix/generator.js')
};

function generateDiagram(jsonData, outputPath = null) {
    try {
        // Detect diagram type
        if (!jsonData.type) {
            throw new Error('Missing required field: type');
        }

        if (!generators[jsonData.type]) {
            throw new Error(`Unknown diagram type: ${jsonData.type}. Expected one of: ${Object.keys(generators).join(', ')}`);
        }

        // Call appropriate generator
        const generator = generators[jsonData.type];
        const result = generator(jsonData, outputPath);

        return result;
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// CLI support
if (require.main === module) {
    const inputFile = process.argv[2];
    const outputFile = process.argv[3];

    if (!inputFile) {
        console.error('Usage: node generate.js <input.json> [output.html]');
        console.error('');
        console.error('Supported diagram types: hierarchy, flow, network, timeline, matrix');
        process.exit(1);
    }

    try {
        const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
        const result = generateDiagram(jsonData, outputFile);

        if (result.success) {
            console.log(`✓ Diagram (${jsonData.type}) generated successfully`);
            if (outputFile) console.log(`  Output: ${outputFile}`);
        } else {
            console.error(`✗ Error: ${result.error}`);
            process.exit(1);
        }
    } catch (error) {
        console.error(`✗ Error reading input file: ${error.message}`);
        process.exit(1);
    }
}

module.exports = generateDiagram;
