const express = require('express');
let mysql = require('mysql2');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
    });


app.get('/mahasiswa', (req, res) => {
    const sql = 'SELECT * FROM mahasiswa';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/mahasiswa/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM mahasiswa WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(results[0]);
    });
});

app.post('/mahasiswa', (req, res) => {
    const { Nama, Alamat, Agama } = req.body;
    if (!Nama || !Alamat || !Agama) {
        return res.status(400).json({ error: 'Field "Nama, Alamat, dan Agama" are required' });
    }

    const sql = 'INSERT INTO mahasiswa (Nama, Alamat, Agama) VALUES (?, ?, ?)';
    db.query(sql, [Nama, Alamat, Agama || null], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, Nama, Alamat, Agama});
    });
});


const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: '12345678',
    database: 'Mahasiswa'
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL: ' + err.stack)
        return;
    }
    console.log('MySQL Connected Successfully');
});



app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});