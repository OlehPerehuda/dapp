const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get("/api/profile", (request, response) => {
    const profile = {
        walletAddress: "",
    };

    response.send(profile);
});

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});