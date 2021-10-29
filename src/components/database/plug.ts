import mongoose from "mongoose";

// Mongo Connection
mongoose.Promise = global.Promise;
const conn = mongoose.createConnection("mongodb://localhost:27017/devices");

const plugSchema = new mongoose.Schema({
  id: { type: String },
  state: { type: String },
});

const PlugStore = conn.model("plug", plugSchema);

export default PlugStore;
