#!/usr/bin/env node

/**
 * Hierarchy Tree Diagram Generator
 * Converts JSON data into interactive HTML visualization
 */

const fs = require('fs');
const path = require('path');

function generateHierarchyDiagram(jsonData, outputPath = null) {
    try {
        // Validate data
        if (!jsonData.type || jsonData.type !== 'hierarchy') {
            throw new Error('Invalid diagram type. Expected "hierarchy"');
        }
        if (!jsonData.root || !Array.isArray(jsonData.nodes)) {
            throw new Error('Missing required fields: root, nodes');
        }

        // Read template
        const templatePath = path.join(__dirname, 'template.html');
        let html = fs.readFileSync(templatePath, 'utf-8');

        // Inject data
        const dataJson = JSON.stringify(jsonData);
        html = html.replace('const diagramData = __DIAGRAM_DATA__;',
            `const diagramData = ${dataJson};`);

        // Return or write file
        if (outputPath) {
            fs.writeFileSync(outputPath, html, 'utf-8');
            return { success: true, path: outputPath };
        } else {
            return { success: true, html: html };
        }

    } catch (error) {
        return { success: false, error: error.message };
    }
}

// CLI support
if (require.main === module) {
    const inputFile = process.argv[2];
    const outputFile = process.argv[3];

    if (!inputFile) {
        console.error('Usage: node generator.js <input.json> [output.html]');
        process.exit(1);
    }

    try {
        const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
        const result = generateHierarchyDiagram(jsonData, outputFile);

        if (result.success) {
            console.log(`✓ Diagram generated successfully`);
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

module.exports = generateHierarchyDiagram;
