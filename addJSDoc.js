import fs from 'fs';

/**
 * Auto-generates JSDoc type hints for functions in a TypeScript file.
 * @param {string} filePath - The path to the TypeScript file.
 */
export function addJSDoc(filePath) {
    let code = fs.readFileSync(filePath, 'utf8');

    // Regex to find function declarations and arrow functions in TypeScript
    code = code.replace(/function (\w+)\(([^)]*)\)/g, (match, name, params) => {
        const paramList = params
            .split(',')
            .map(p => p.trim())
            .filter(p => p)
            .map(p => {
                const paramName = p.split(':')[0].trim(); // Extract parameter name
                return ` * @param {any} ${paramName}`;
            })
            .join('\n');

        return `/**
 * Auto-generated JSDoc for ${name}.
${paramList}
 * @returns {any}
 */
${match}`;
    });

    // Regex to find arrow functions and generate JSDoc for them
    code = code.replace(/(\w+)\s*=\s*\(([^)]*)\)\s*=>/g, (match, name, params) => {
        const paramList = params
            .split(',')
            .map(p => p.trim())
            .filter(p => p)
            .map(p => {
                const paramName = p.split(':')[0].trim(); // Extract parameter name
                return ` * @param {any} ${paramName}`;
            })
            .join('\n');

        return `/**
 * Auto-generated JSDoc for ${name}.
${paramList}
 * @returns {any}
 */
${match}`;
    });

    fs.writeFileSync(filePath, code);
    console.log(`JSDoc comments added to ${filePath}`);
}

// Example usage
// addJSDoc();

// module.exports = { addJSDoc };
