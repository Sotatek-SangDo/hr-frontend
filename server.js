const express = require("express");
const port = 80;
const host = "http://fe-hrm.cf";
const app = express();

app.use(express.static(__dirname + "/dist/"));
app.get(/.*/, function (req, res) {
    res.sendfile(__dirname + "/dist/index.html");
});

app.listen(port, host);

console.log('Server started %s:%s', host, port);
