const Episode = require("../models/episode");

const getEpisodes = async (req, res) => {
    const episodios = await Episode.find();

    return res.json({
        ok: true,
        msg: "Episodios obtenidos",
        data: episodios,
    });
};


module.exports = {
    getEpisodes,
    // createEpisode,
    // updateEpisode,
    // deleteEpisode,
};
