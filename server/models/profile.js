import mongoose from "mongoose";

const listRepoSchema = mongoose.Schema({
  name: String,
  repo_url: String,
  contributors_url: String,
  commit_count: Number,
});

const gitSchema = mongoose.Schema({
  id: String,
  username: String,
  name: String,
  avatar: String,
  profile_url: String,
  total_repos: Number,
  total_commits: Number,
  repo_list: [listRepoSchema],
  created_at: {
    type: Date,
    default: new Date(),
  },
});

const Profile = mongoose.model("Profile", gitSchema);

export default Profile;
