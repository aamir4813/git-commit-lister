import CommitsSchema from "../models/commits.js";
import axios from "axios";

const GIT_TOKEN = "Token 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";

const base_url = "https://api.github.com";
const options = {
  url: base_url,
  method: "GET",
  headers: {
    Authorization: GIT_TOKEN,
  },
  data: {},
};

export const createCommits = async (req, res) => {
  // console.log(req.body);
  const { username: user, repo_name: repo } = req.body;
  // const user = req.body.username;
  // const repo = req.body.repo_name;

  console.log(user, repo);
  const [isPresent, commitDataBody] = await repoFinerInDB(user, repo);
  //   console.log(isPresent);

  console.log(options);
  if (isPresent) {
    // console.log(commitDataBody);
    res.status(200).json(commitDataBody[0]);
  } else {
    const commitData = await getAllCommit(user, repo);
    const newCommitData = new CommitsSchema(commitData);
    try {
      await newCommitData.save();
      res.status(201).json(newCommitData);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
};

const getAllCommit = async (user, repo) => {
  try {
    const allBranches = await getAllBrances(user, repo);
    console.log(allBranches);
    const commitSchema = await {
      repo_name: repo,
      username: user,
      brances: allBranches,
    };
    // console.log(commitSchema);
    return commitSchema;
  } catch (error) {}
};

async function getAllBrances(user, repo) {
  try {
    options.url = `${base_url}/repos/${user}/${repo}/branches`;

    // console.log(options.url);
    const responce = await axios(options);

    const allListBranch = [];

    await Promise.all(
      responce.data.map(async (val) => {
        const getCommits = await getCommitsPerBranch(
          user,
          repo,
          val.commit.sha
        );
        const tempBranch = {
          name: val.name,
          latest_sha: val.commit.sha,
          commits: getCommits,
        };
        allListBranch.push(tempBranch);
      })
    );
    console.log(allListBranch);
    return allListBranch;
  } catch (error) {
    console.log({ message: error.message });
  }
}

async function getCommitsPerBranch(user, repo, sha) {
  try {
    options.url = `${base_url}/repos/${user}/${repo}/commits`;

    options.data = {
      per_page: 100,
      sha: sha,
    };
    console.log(options);

    const allCommits = [];
    let last_sha = sha;
    // console.log(allCommits.find((o) => o.sha === last_sha));
    while (!allCommits.find((o) => o.sha === last_sha)) {
      const responce = await axios(options);
      await Promise.all(
        responce.data.map(async (val) => {
          const tempCommit = {
            sha: val.sha,
            html_url: val.html_url,
            url: val.url,
          };
          last_sha = val.sha;
          // console.log(tempCommit);
          allCommits.push(tempCommit);
        })
      );
    }
    console.log(allCommits);

    return allCommits;
  } catch (error) {
    console.log({ message: `error.message` });
  }
}

async function repoFinerInDB(user, repo) {
  const query = {
    repo_name: repo,
    username: user,
  };
  // console.log(query);
  const q = await CommitsSchema.find(query).lean();

  // console.log(q);
  return q.length === 0 ? [false, q] : [true, JSON.parse(JSON.stringify(q))];
}
