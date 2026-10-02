var https = require("https");
var http = require("http");
var fs = require("fs");
const express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
const app = express();
var cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

var options = {
  key: fs.readFileSync(path.join(__dirname, "../keystore/yoowifi-key.pem")),
  cert: fs.readFileSync(
    path.join(__dirname, "../keystore/star_yoowifi_com.crt"),
  ),
};

app.enable("trust proxy");
app.use(cors());

//app.use('/user/getallUsers', createProxyMiddleware({
//    target: 'http://13.215.241.47:4001/user/getAllUsers',
//    // target: 'https://crm.yoowifi.com:8443/user/getAllUsers',
//    changeOrigin: true
//}));

app.use((req, res, next) => {
  if (["", "/"].includes(req.url)) {
    console.log("req", req.headers.host.split(":")[0]);
    console.log("\n\n");
    console.log("/////////////////// Starting  //////////////////////");
    console.log("protocol", req.protocol);
    console.log("host", req.headers.host);
    console.log("url", req.url);
    console.log(
      "full path :",
      req.protocol + "://" + req.headers.host + req.url,
    );
    console.log("secure", req.secure);
    console.log("////////////////////////////////////////////////////");
  } else {
    console.log("\n\n");
    console.log("/////////////////// ELSE  //////////////////////");
    console.log("protocol", req.headers);
    console.log("protocol", req.protocol);
    console.log("host", req.headers.host);
    console.log("url", req.url);
    console.log(
      "full path :",
      req.protocol + "://" + req.headers.host + req.url,
    );
    console.log("secure", req.secure);
    console.log("////////////////////////////////////////////////////");
  }

  if (req.headers.host == "crm.yoowifi.com") {
    console.log("body", req.body);
    if (
      [
        "/order/getProcessOrders1",
        "/order/ReturnDevice",
        "/user/getallUsers",
      ].includes(req.url)
    ) {
      console.log("server url", "http://13.215.241.47:4001" + req.url);
      const proxy = createProxyMiddleware({
        target: "http://13.215.241.47:4001",
        changeOrigin: true,
      });
      proxy(req, res, next);
    } else {
      res.redirect("https://crm.yoowifi.com:4002/");
    }
  } else if (
    req.headers.host &&
    req.headers.host.includes("wesim.yoowifi.com")
  ) {
    if (req.secure) {
      if (!req.url.startsWith("/instant-wesim")) {
        return res.redirect("https://wesim.yoowifi.com/instant-wesim");
      }
      next();
    } else {
      res.redirect("https://" + req.headers.host + req.url);
    }
  } else {
    if (req.secure) {
      next();
    } else {
      res.redirect("https://" + req.headers.host + req.url);
    }
  }
});

app.use(express.static(path.join(__dirname, "dist")));

app.get("/*", function (req, res) {
  console.log("request", req.protocol, req.headers.host);
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

function parseJwt(token) {
  return JSON.parse(Buffer.from(token, "base64").toString());
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

var server = https.createServer(options, app).listen(443, function () {
  console.log("server started at port 443");
});
var httpserver = http.createServer(app).listen(5001, function () {
  console.log("server started at port 5001");
});
