const express = require("express");
const app = express();
const port = 5000;
const { init } = require("./config/socket");

const server = app.listen(port, () => {
  console.log(`Chat app backend listening on port ${port}`);
});

init(server);
