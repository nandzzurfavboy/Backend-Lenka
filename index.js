const express = require("express");
const bodyParser = require("body-parser");
const { createServer } = require("http");
const profileRouter = require("./router/routerProfile");

const app = express();
const PORT = 3030;
const server = createServer(app);

app.use(bodyParser.json());

app.use(profileRouter);

app.use("/config", (_, res) => {
  return res.send("Server already running!");
});

// http://localhost:50501
server.listen(PORT, () => console.log(`server are running in http://localhost:${PORT}`));