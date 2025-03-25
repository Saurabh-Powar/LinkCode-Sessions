const express = require('express');
const app = express();
const PORT = 3000;

app.get('/hello', (req, res, next) => {
    res.status(200).json({
        msg: 'Hello World'
    });
});

app.listen(PORT, () => {
    console.log('Express server started on http://localhost:3000');
});