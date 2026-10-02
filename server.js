var https = require('https');
var http = require('http');
var fs = require('fs');
const os = require('os');
const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const app = express();

const options = {
    key: fs.readFileSync('/home/keys/2025/yoowifi-key.pem'),
    cert: fs.readFileSync('/home/keys/2025/star_yoowifi_com.crt')
};

app.enable('trust proxy')

app.use((req, res, next) => {
    if (['', '/'].includes(req.url)) {
        console.log('req', req);
        console.log("\n\n");
        console.log("/////////////////// Starting  //////////////////////");
        console.log("protocol", req.protocol);
        console.log("host", req.headers.host);
        console.log('url', req.url);
        console.log('full path :', req.protocol + '://' + req.headers.host + req.url);
        console.log('secure', req.secure);
        console.log("////////////////////////////////////////////////////");
    }

    if (req.secure) {
        next();
    } else {
        // res.redirect('https://crm.yoowifi.com:4002/')
        res.redirect('https://' + req.headers.host + ':5003' + req.url)
    }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function (req, res) {
    console.log("request", req.protocol, req.headers.host);
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

function parseJwt(token) {
    return JSON.parse(Buffer.from(token, 'base64').toString());
}

/**
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/admin/summary', function (req, res) {
    const data = parseJwt(req.body.paymentResponse);
    if (data?.invoiceNo) {
        res.redirect(`/admin/summary?p=1&invoiceNo=${data.invoiceNo}&respCode=${data.respCode}`);
    }
    else {
        res.redirect('/admin/summary?p=1');
    }
});

**/

var httpsServer = https.createServer(options, app).listen(5003, '172.31.36.47', function () {
    console.log("server started at port 5003");
});
// var httpServer = http.createServer(app).listen(5003, function () {
//     console.log("server started at port 5003");
// });
