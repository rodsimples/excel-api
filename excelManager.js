const express = require('express');
const app = express();
const routes = require('./routes');
app.use(express.json());
app.use('/api', routes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
