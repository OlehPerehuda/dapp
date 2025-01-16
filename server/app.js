const cors = require('cors');
const express = require('express');
const jwt = require("jsonwebtoken");
const nacl = require('tweetnacl');
const { PublicKey } = require('@solana/web3.js');

const SECRET_KEY = 'SECRET_KEY';
const PORT = process.env.PORT || 3003;

const blacklistedTokens = new Set();

const verifySignature = (address, message, signature) => {
    const publicKeyBytes = new PublicKey(address).toBytes();
    const messageBytes = new TextEncoder().encode(message);
    const signatureBytes = Uint8Array.from(Buffer.from(signature, 'base64'));

    return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
};

function checkAuth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token should be provided' });
    };

    if (token && blacklistedTokens.has(token)) {
        return res.status(401).json({ message: 'Token is invalidated' });
    };

    next();
};

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/profile", checkAuth, (request, response) => {
    try {
        const token = request.headers.authorization?.split(' ')[1];
        const verified = jwt.verify(token, SECRET_KEY);

        if (!verified.address) {
            return response.status(400).json({ message: 'Could not verify signature' });
        };

        response.json({ address: verified.address });
    } catch (error) {
        response.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/api/login', (request, response) => {
    const { message, address, signature } = request.body;

    try {
        const isVerified = verifySignature(address, message, signature);

        if (!isVerified) {
            return response.status(400).json({ message: 'Invalid signature' });
        };

        const token = jwt.sign({ address }, SECRET_KEY, { expiresIn: '1h' });
        response.json({ token });
    } catch (error) {
        response.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/api/logout', checkAuth, (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            blacklistedTokens.add(token); // Add token to blacklist
            res.status(200).json({ message: 'Logged out successfully' });
        } else {
            res.status(400).json({ message: 'Token is missing' });
        }
    } catch (error) {
        response.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});