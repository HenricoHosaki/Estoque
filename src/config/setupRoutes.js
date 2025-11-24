const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const routesPath = path.join(__dirname, "../route");

fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith(".js")) {
    const routeModule = require(path.join(routesPath, file));

    const prefix = `/${file.replace(".js", "")}`;

    if (typeof routeModule === "function") {
      const tempRouter = express.Router();
      routeModule(tempRouter);
      router.use(prefix, tempRouter);
    }
    else if (routeModule && typeof routeModule === "object" && routeModule.stack) {
      router.use(prefix, routeModule);
    }
    else {
      console.warn(`File ${file} is not a valid router or function`);
    }
  }
});

module.exports = router;
