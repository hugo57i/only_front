const express = require('express');

const app = express();

app.use(express.static('./dist/tp02'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/tp02/'}),
);

app.listen(process.env.PORT || 8080);