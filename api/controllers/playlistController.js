const db = require('./../models');
const Logger = require('./../util/Logger');

const playlistController = {}
const logger = new Logger();

// Create a new playlist for a guild.
// If the playlist already exists, then it will update the existing one.
// => Required data: guild_id, songs[{ url, added_by}]
// => Optional data: created_at, updated_at, songs[{ added_at, updated_at}]
playlistController.post = async (req, res) => {
  const guild_id = req.body.guild_id;
  const songs = req.body.songs;

  const exists = await db.Playlist.findOne({ guild_id: req.body.guild_id });
  if (exists) {
    let update = req.body;
    update.updated_at = Date.now();
    try {
      const playlist = await db.Playlist.findOneAndUpdate(guild_id, update);
      return res.status(200).json({
        success: true,
        data: playlist
      });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({
        success: false,
        message: 'Internal server error happened :('
      });
    }
  }

  const playlist = new db.Playlist({
    guild_id,
    songs,
    created_at: Date.now()
  });

  try {
    const newPlaylist = await playlist.save();
    return res.status(200).json({
      sucess: true,
      data: newPlaylist
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error happened :('
    });
  }
}

// Get the playlist of the guild
// => Required data: guild_id
// => Optional data: none
playlistController.get = async (req, res) => {
  try {
    const playlist = await db.Playlist.findOne({ guild_id: req.params.id });
    return res.status(200).json({
      succes: true,
      data: playlist
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error happened :('
    });
  }
}

// Update a existing playlist.
// => Required data: guild_id, songs[{ url, added_by}]
// => Optional data: created_at, updated_at, songs[{ added_at, updated_at}]
playlistController.update = async (req, res) => {
  const guild_id = req.params.id;
  let update = req.body;
  update.updated_at = Date.now();

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  // Validación
  if (isEmpty(update)) {
    return response.status(400).json({
      error: 'Invalid format!'
    });
  }

  try {
    const playlist = await db.Playlist.findOneAndUpdate(guild_id, update);
    return res.status(200).json({
      success: true,
      data: playlist
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error happened :('
    });
  }
}

module.exports = playlistController;