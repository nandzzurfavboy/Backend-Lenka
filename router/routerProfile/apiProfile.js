const express = require("express");
const { getProfile, createProfile, updateProfile, updateProfileById, deteleProfile } = require("../../controller/controllerProfile");
const app = express();

app.get("/Profile", getProfile);
app.post("/Profile", createProfile);
app.put("/Profile/:id", updateProfile);
app.patch("/Profile/:id", updateProfileById);
app.delete("/Profile/:id", deteleProfile);

module.exports = app;