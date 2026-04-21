import { MongoMemoryServer } from 'mongodb-memory-server';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function start() {
    console.log('🔄 Starting MongoDB Memory Server...');
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    console.log('✅ MongoDB started at:', uri);

    console.log('🔄 Starting React Frontend & Node Backend concurrently...');
    const child = spawn('npm.cmd', ['run', 'dev'], {
        env: { ...process.env, MONGODB_URI: uri },
        cwd: __dirname,
        stdio: 'inherit',
        shell: true
    });

    child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        mongod.stop();
        process.exit(code);
    });

    process.on('SIGINT', async () => {
        mongod.stop();
        process.exit(0);
    });
}

start();
