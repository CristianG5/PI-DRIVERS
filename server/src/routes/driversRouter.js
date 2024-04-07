const { Router } = require("express");

const {getDriversHandler, getDetailHandler, createDriversHandler} = require("../handlers/driversHandlers")

const driverRouter = Router();


driverRouter.get("/", getDriversHandler); 

driverRouter.get("/:id", getDetailHandler);

driverRouter.post("/", createDriversHandler);


module.exports = driverRouter