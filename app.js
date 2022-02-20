const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(function(req, res, next) {
	console.log("Request IP: " + req.url);
	console.log("Request Time : " + new Date());
	next();
})

app.use(function(req, res, next) {
	const filePath = path.join(__dirname, "static", req.url);
	fs.stat(filePath, function(err, fileInfo) {
		if (err) {
			next();
			return;
		}
		if (fileInfo.isFile()) {
			res.sendFile(filePath);
		} else {
			next();
		}
	});
});

app.use(function(req, res){
	res.status(404);
	res.send("File not found!");
})

app.get("/", function(req, res) {
	res.send("working");
})

app.listen(8000, function() {
	console.log("Server is running on port 8000");
})
