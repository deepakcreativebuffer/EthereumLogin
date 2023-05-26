const express = require("express");
const router = express.Router();
const fs = require("fs");

const frontendRoutes = ['/','/login']


frontendRoutes.forEach((route)=>{
  router.get(route, (_, res) => {
    fs.readFile(__dirname + "/index.html", "utf8", (_, text) => {
      res.send(text);
    });
  });
})



module.exports = router;
