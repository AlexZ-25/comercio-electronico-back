const Episode = require("../models/episode");

const getEpisodes = async (req, res) => {
    const episodios = await Episode.find();

    return res.json({
        ok: true,
        msg: "Episodios obtenidos",
        data: episodios,
    });
};

const getEpisode = async (req, res) => {
    // const { idEpisode } = req.params;
    // const episode = await Episode.findById(idEpisode);
    const { idEpisode } = req.params;
    episode = await Episode.findOne({ Id: idEpisode })

    return res.json({
        msg: "Episodio obtenido",
        data: episode,
    });
};

const createEpisode = async (req, res) => {
    const { Id, Nombre, URL } = req.body;

    const episode = {
        Id,
        Nombre,
        URL
    }

    const newEpisode = await Episode.create(episode);

    return res.json({
        msg: "Episodio creado",
        data: newEpisode,
    });
};

const updateEpisode = async (req, res) => {
    const { idEpisode } = req.params;
    const { Nombre, URL } = req.body;

    const episode = {
        Nombre,
        URL,
    };

    const updatedEpisode = await Episode.findOneAndUpdate(
        { Id: idEpisode }, episode,
        { new: true }
    );

    return res.json({
        msg: "Episodio actualizado",
        data: updatedEpisode,
    });
};

const deleteEpisode = async (req, res) => {
    const { idEpisode } = req.params;

    const deletedEpisode = await Episode.findOneAndDelete({Id: idEpisode})

    return res.json({
        msg: "Episodio eliminado",
        data: deletedEpisode,
    });
};


module.exports = {
    getEpisodes,
    getEpisode,
    createEpisode,
    updateEpisode,
    deleteEpisode,
};
