const { Router } = require("express");

const {createTeamsHandlers, getTeamsHandlers} = require("../handlers/teamsHandlers")

const teamsRouter = Router();

teamsRouter.get("/", getTeamsHandlers)

teamsRouter.post("/", createTeamsHandlers);

module.exports = teamsRouter