const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const fs = require('fs');
const path = "./colors.json"

app.use(bodyParser.json())

app.post('/api/save', (req, res) => {
	console.log(req.body);
	fs.writeFileSync(path, JSON.stringify(req.body));
	res.end("Successfully Saved")
});

app.get('/api/get', (req, res) => {
	var content = fs.readFileSync(path, 'utf8');
	res.end(content)
});

var server = app.listen(8081, () => {
	var host = server.address().address
	var port = server.address().port

	console.log("App listening at http://%s:%s", host, port)
});
