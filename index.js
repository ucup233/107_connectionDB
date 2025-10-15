const express = require('express');
let mysql = require('mysql2');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
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