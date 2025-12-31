// const express = require("express");
// const router = express.Router();
// const { dashboard } = require("../controllers/admin.controller");

// router.get("/dashboard", dashboard);

// module.exports = router;



const express = require("express");
const router = express.Router();
const { dashboard } = require("../controllers/admin.controller");

router.get("/dashboard", dashboard);

module.exports = router;
