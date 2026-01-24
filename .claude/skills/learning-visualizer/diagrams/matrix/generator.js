#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function generateMatrixDiagram(jsonData, outputPath = null) {
    try {
        if (!jsonData.type || jsonData.type !== 'matrix') {
            throw new Error('Invalid diagram type. Expected "matrix"');
        }
        if (!Array.isArray(jsonData.rows) || !Array.isArray(jsonData.columns) || !Array.isArray(jsonData.cells)) {
            throw new Error('Missing required fields: rows, columns, cells');
        }

        const templatePath = path.join(__dirname, 'template.html');
        let html = fs.readFileSync(templatePath, 'utf-8');
        const dataJson = JSON.stringify(jsonData);
        html = html.replace('const diagramData = __DIAGRAM_DATA__;',
            `const diagramData = ${dataJson};`);

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

if (require.main === module) {
    const inputFile = process.argv[2];
    const outputFile = process.argv[3];

    if (!inputFile) {
        console.error('Usage: node generator.js <input.json> [output.html]');
        process.exit(1);
    }

    try {
        const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
        const result = generateMatrixDiagram(jsonData, outputFile);

        if (result.success) {
            console.log(`✓ Matrix diagram generated successfully`);
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

module.exports = generateMatrixDiagram;
