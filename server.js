// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const users = [
  { username: 'admin', password: '1234' },
  { username: 'user', password: 'abcd' }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const found = users.find(u => u.username === username && u.password === password);

  if (found) {
    res.json({ success: true, message: 'Login successful!' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
