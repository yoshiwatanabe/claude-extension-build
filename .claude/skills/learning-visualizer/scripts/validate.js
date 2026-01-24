#!/usr/bin/env node

/**
 * JSON Validator - Validates diagram JSON against schemas
 */

const fs = require('fs');
const path = require('path');

const schemas = {
    hierarchy: require('../diagrams/hierarchy/schema.json'),
    flow: require('../diagrams/flow/schema.json'),
    network: require('../diagrams/network/schema.json'),
    timeline: require('../diagrams/timeline/schema.json'),
    matrix: require('../diagrams/matrix/schema.json')
};

function validateJSON(jsonData, diagramType = null) {
    try {
        // Auto-detect type if not provided
        const type = diagramType || jsonData.type;

        if (!type) {
            return { success: false, errors: ['Missing required field: type'] };
        }

        if (!schemas[type]) {
            return { success: false, errors: [`Unknown diagram type: ${type}`] };
        }

        const schema = schemas[type];
        const errors = validateAgainstSchema(jsonData, schema);

        if (errors.length > 0) {
            return { success: false, errors: errors };
        }

        return { success: true, message: `Valid ${type} diagram` };
    } catch (error) {
        return { success: false, errors: [error.message] };
    }
}

function validateAgainstSchema(data, schema) {
    const errors = [];

    // Check required fields
    if (schema.required) {
        schema.required.forEach(field => {
            if (!(field in data)) {
                errors.push(`Missing required field: ${field}`);
            }
        });
    }

    // Check type
    if (schema.type && typeof data !== schema.type) {
        errors.push(`Expected type ${schema.type}, got ${typeof data}`);
    }

    // Check properties
    if (schema.properties) {
        Object.keys(schema.properties).forEach(prop => {
            if (prop in data) {
                const propSchema = schema.properties[prop];
                if (propSchema.type && typeof data[prop] !== propSchema.type) {
                    // Allow string enum checks
                    if (propSchema.enum && !propSchema.enum.includes(data[prop])) {
                        errors.push(`Field ${prop}: expected one of [${propSchema.enum.join(', ')}], got "${data[prop]}"`);
                    } else if (!propSchema.enum && typeof data[prop] !== propSchema.type) {
                        errors.push(`Field ${prop}: expected type ${propSchema.type}, got ${typeof data[prop]}`);
                    }
                }
            }
        });
    }

    return errors;
}

// CLI support
if (require.main === module) {
    const inputFile = process.argv[2];

    if (!inputFile) {
        console.error('Usage: node validate.js <input.json> [diagram-type]');
        console.error('');
        console.error('If diagram-type is omitted, it will be auto-detected from JSON');
        process.exit(1);
    }

    try {
        const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
        const result = validateJSON(jsonData);

        if (result.success) {
            console.log(`✓ ${result.message}`);
        } else {
            console.error(`✗ Validation failed:`);
            result.errors.forEach(err => console.error(`  - ${err}`));
            process.exit(1);
        }
    } catch (error) {
        console.error(`✗ Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = { validateJSON, validateAgainstSchema };
