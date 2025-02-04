import fs from 'fs';
import chokidar from 'chokidar';
import { exec } from 'child_process';
import { addJSDoc } from './addJSDoc.js'

const tsFolder = './src';  // Folder containing TS
const jsFolder = './dist'; // Output folder for JS


//ts detection and compiler
function compileTS(filePath) {
    console.log(`Compiling ${filePath}...`);
    exec(`tsc ${filePath} --outDir ${jsFolder} `, (err, stdout, stderr) => {
        if (err) {
            console.log(err.message)
            console.error(`❌ Error compiling ${filePath}:\n`, stderr);
        } else {
            console.log(`✅ Successfully compiled: ${filePath}`);
        }
    });
}




//Watcher to detect file changes, but ask Armaan about chokidar

chokidar.watch(tsFolder, { ignored: /node_modules/ }).on('change', (filePath) => {
    if (filePath.endsWith('.ts')) {
        console.log(filePath)
        addJSDoc('src/example.ts')
        compileTS(filePath);
    }
});


console.log(`🚀 Watching TypeScript files in ${tsFolder}...`);
