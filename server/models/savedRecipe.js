const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema({
    id: { type: String, required: true },
 
});

module.exports = mongoose.model("Save", savedSchema);
