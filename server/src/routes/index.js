const { Router } = require("express");
const driverRouter = require("./driversRouter");
const teamsRouter = require("./teamsRouter");

const router = Router();

router.use("/drivers", driverRouter);

router.use("/teams", teamsRouter);



module.exports = router;
