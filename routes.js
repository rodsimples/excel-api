const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const ExcelManager = require('./excelManager'); // Classe que você criará para a lógica do Excel
const excelManager = new ExcelManager();

// 1. Carregar arquivos Excel
router.post('/upload', upload.array('files', 3), (req, res) => {
    try {
        excelManager.loadFiles(req.files);
        res.status(200).json({ message: 'Arquivos carregados com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Mesclar planilhas
router.post('/merge', (req, res) => {
    const { keys, excludeDuplicates, duplicateKey } = req.body;
    try {
        const mergedData = excelManager.mergeFiles(keys, excludeDuplicates, duplicateKey);
        res.status(200).json({ message: 'Mesclagem concluída!', mergedData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Filtrar dados
router.post('/filter', (req, res) => {
    const { column, operator, value } = req.body;
    try {
        const filteredData = excelManager.filterData(column, operator, value);
        res.status(200).json({ message: 'Filtro aplicado!', filteredData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Visualizar dados
router.get('/preview', (req, res) => {
    try {
        const previewData = excelManager.getPreview();
        res.status(200).json(previewData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Exportar dados
router.get('/export', (req, res) => {
    try {
        const filePath = excelManager.exportData();
        res.download(filePath, 'merged_data.xlsx');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Limpar dados
router.delete('/clear', (req, res) => {
    try {
        excelManager.clearData();
        res.status(200).json({ message: 'Dados limpos com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
