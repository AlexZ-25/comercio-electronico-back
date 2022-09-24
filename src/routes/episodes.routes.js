const { Router } = require("express");

const {
  getEpisodes,
  getEpisode,
  createEpisode,
  updateEpisode,
  deleteEpisode,
} = require("../controllers/episodes.controller");

const { validarJWT } = require("../middlewares/jwt.middleware");

const router = Router();

router.get("/", getEpisodes);

router.get("/:idEpisode", getEpisode);

router.post("/", validarJWT, createEpisode);

router.put("/:idEpisode", validarJWT, updateEpisode);

router.delete("/:idEpisode", validarJWT, deleteEpisode);

module.exports = router;
