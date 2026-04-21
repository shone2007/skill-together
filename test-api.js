import { MongoMemoryServer } from 'mongodb-memory-server';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTests() {
    console.log('🔄 Starting MongoDB Memory Server...');
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    console.log('✅ MongoDB started at:', uri);

    const PORT = 3005;

    console.log(`🔄 Starting Node.js API Server on port ${PORT}...`);
    const serverProcess = spawn('node', ['server.js'], {
        env: { ...process.env, MONGODB_URI: uri, PORT: PORT.toString() },
        cwd: __dirname,
        stdio: 'pipe'
    });

    serverProcess.stdout.on('data', (d) => console.log('SERVER:', d.toString().trim()));
    serverProcess.stderr.on('data', (d) => console.error('SERVER ERR:', d.toString().trim()));

    // Wait a bit for the server to start
    await new Promise(r => setTimeout(r, 4000));

    let passed = 0;
    let failed = 0;

    console.log('\n==============================');
    console.log('🧪 RUNNING AUTOMATED API TESTS');
    console.log('==============================\n');

    try {
        // Test 1: Health Check
        console.log('Test 1: GET /api/health');
        let res = await fetch(`http://localhost:${PORT}/api/health`);
        let data = await res.json();
        if (data.db === 'connected') {
            console.log('✅ PASS: Database is connected.');
            passed++;
        } else {
            console.error('❌ FAIL: Database not connected.', data);
            failed++;
        }

        // Test 2: Signup
        console.log('\nTest 2: POST /api/auth/signup');
        res = await fetch(`http://localhost:${PORT}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'testuser', email: 'test@example.com', password: 'password123' })
        });
        data = await res.json();
        if (res.status === 201 && data.token && data.user.email === 'test@example.com') {
            console.log('✅ PASS: User registered successfully and returned token.');
            passed++;
        } else {
            console.error('❌ FAIL: User registration failed.', res.status, data);
            failed++;
        }

        // Test 3: Login
        console.log('\nTest 3: POST /api/auth/login');
        res = await fetch(`http://localhost:${PORT}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'test@example.com', password: 'password123' })
        });
        const loginData = await res.json();
        if (res.status === 200 && loginData.token) {
            console.log('✅ PASS: Login successful and returned token.');
            passed++;
        } else {
            console.error('❌ FAIL: Login failed.', res.status, loginData);
            failed++;
        }

        // Test 4: Get Current User (Me)
        console.log('\nTest 4: GET /api/auth/me');
        res = await fetch(`http://localhost:${PORT}/api/auth/me`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${loginData.token}` }
        });
        data = await res.json();
        if (res.status === 200 && data.user.email === 'test@example.com') {
            console.log('✅ PASS: Protected route returned user info.');
            passed++;
        } else {
            console.error('❌ FAIL: Protected route failed.', res.status, data);
            failed++;
        }

    } catch (err) {
        console.error('❌ FATAL ERROR DURING TESTS:', err);
    }

    console.log('\n==============================');
    console.log(`📊 TEST RESULTS: ${passed} Passed, ${failed} Failed`);
    console.log('==============================\n');

    console.log('🔄 Cleaning up...');
    serverProcess.kill();
    await mongod.stop();
    process.exit(failed > 0 ? 1 : 0);
}

runTests();
