const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + "/public"));
app.get("/clothlist", (req, res) => {
    fs.readFile(__dirname + "/public" + "/clothes.txt", "utf-8", (err, data) => {
        if (err) {
          console.log("Error reading file: ", err);
        }
        console.log("here's file data", data.split("").length);
        if (data.split("").length > 0) {
          clothes = data.split("").map((element) => element);
        }
      });
});
app.post("/addclothes", (req, res) => {
  // console.log(req.body);
  let clothes = [];
  fs.readFile(__dirname + "/public" + "/clothes.txt", "utf-8", (err, data) => {
    if (err) {
      console.log("Error reading file: ", err);
    }
    console.log("here's file data", data.split("").length);
    if (data.split("").length > 0) {
      clothes = data.split("").map((element) => element);
    }
  });

  const cloth = {
    code: req.body.code,
    brand: req.body.brand,
    gender: req.body.gender,
    type: req.body.type,
    price: req.body.price,
    stock: req.body.stock,
  };

  clothes.push(cloth);
  console.log(clothes);
  clothes = JSON.stringify(clothes);
  fs.writeFile(__dirname + "/public" + "/clothes.txt", clothes, (err) => {
    if (err) {
      console.log("Error writing file: ", err);
    } else {
      console.log("File written successfully");
    }
  });
  res.send("worked");
});
app.listen(3000);
console.log("server is running on port 3000");
console.log("http://localhost:3000");
