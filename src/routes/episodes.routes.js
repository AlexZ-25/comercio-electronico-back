const { Router } = require("express");

const {
  getEpisodes,
//   createEpisode,
//   updateEpisode,
//   deleteEpisode,
} = require("../controllers/episodes.controller");

const router = Router();

router.get("/", getEpisodes);

// router.post("/", createEpisode);

// router.put("/:idEpisode", updateEpisode);

// router.delete("/:idEpisode", deleteEpisode);

module.exports = router;
