const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/user', (req, res) => {
    const { name, email } = req.body;
    console.log(`User Info Received: ${name} ${email}`);
    res.status(200).json({ message: "User info received successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
