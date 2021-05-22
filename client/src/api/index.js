import axios from "axios";

const url = "https://git-commit-list.herokuapp.com";
// const url = "http://localhost:5000";

export const fetchProfile = async (user) => await axios.post(`${url}/${user}`);

export const fetchAllCommits = async (user, repo) => {
  const options = {
    url: `${url}/commit/${repo}`,
    method: "post",
    data: {
      username: user,
      repo_name: repo,
    },
  };
  await axios(options);
};
