const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(morgan("short"));

app.use(express.static(path.join(__dirname, "static")));

app.use(function(req, res) {
	res.status(404);
	res.send("File not found!");
})

app.get("/", function(req, res) {
	res.send("working");
})

app.listen(8000, function() {
	console.log("Server is running on port 8000");
})
