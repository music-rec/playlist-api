const mongoose = require('mongoose');

const { Schema } = mongoose;

const playlistSchema = new Schema({
  guild_id: { type: Number, required: true, unique: true },
  created_at: Date,
  updated_at: Date,
  songs: [{
    //position: { type: Number, required: true },
    url: { type: String, required: true },
    added_by: { type: String, required: true },
    added_at: Date,
    updated_at: Date
  }]
});

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;