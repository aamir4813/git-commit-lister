import mongoose from "mongoose";

const commits = mongoose.Schema({
  sha: String,
  html_url: String,
  url: String,
});

const brachSchema = mongoose.Schema({
  name: String,
  latest_sha: String,
  commits: [commits],
});

const CommitSchema = mongoose.Schema({
  repo_name: String,
  username: String,
  brances: [brachSchema],
});

const CommitsSchema = mongoose.model("CommitsSchema", CommitSchema);

export default CommitsSchema;
