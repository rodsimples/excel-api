const express = require('express');
const app = express();
const excelManager = require('./excelManager'); // Certifique-se de que o caminho está correto

app.use(express.json());
app.use(excelManager); // Use o router aqui

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor rodando em http://0.0.0.0:${port}`);
});