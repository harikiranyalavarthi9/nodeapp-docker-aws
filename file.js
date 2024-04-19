import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Resolve the directory name of the current module (app.js)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file in the root directory
const envFilePath = join(__dirname, '.', '.env');
dotenv.config({ path: envFilePath });

// Now you can continue with the rest of your application code


// Read .env file contents
try {
    const envFileContents = fs.readFileSync(envFilePath, 'utf-8');
    console.log('Contents of .env file:', envFileContents);
} catch (error) {
    console.error('Error reading .env file:', error);
}
