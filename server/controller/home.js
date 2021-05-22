import Profile from "../models/profile.js";
import axios from "axios";

const GIT_TOKEN = process.env.GIT_TOKEN;

export const homePage = async (req, res) => {
  try {
    // const profiles = await Profile.find();
    res.status(200).json({});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProfile = async (req, res) => {
  const user = req.params.user;

  console.log(user);
  // check already exists or not
  const [isPresent, profileBody] = await userFindInDB(user);

  if (isPresent) {
    res.status(200).json(profileBody[0]);
  } else {
    const profile = await getUser(user);
    // console.log(profile);
    const newProfile = new Profile(profile);
    try {
      if (profile) {
        await newProfile.save();
        res.status(201).json(newProfile);
      } else res.status(404).json({ message: `${user} is Not Found` });
    } catch (error) {
      res.status(409).json({ message: `${user} is Not Found` });
    }
  }
};

const options = {
  url: `https://api.github.com/users/`,
  method: "GET",
  headers: {
    Authorization: GIT_TOKEN,
  },
  data: {},
};

const getUser = async (user) => {
  //   const user = req.params.user;

  options.url = `https://api.github.com/users/${user}`;

  const responce = await axios(options).catch(console.log);
  try {
    const repo_list = await getReposList(responce.data.repos_url).catch(
      console.log
    );

    const commit_array = repo_list.map((v) => v.commit_count);
    // console.log(commit_array);
    const total_commit = await totalCommit(commit_array);

    const userInfo = {
      id: responce.data.id,
      username: responce.data.login,
      name: responce.data.name,
      avatar: responce.data.avatar_url,
      profile_url: responce.data.html_url,
      total_repos: responce.data.public_repos,
      total_commits: total_commit,
      repo_list: repo_list,
    };
    //   res.status(200).send(userInfo);

    return userInfo;
  } catch (error) {
    // res.status(404).json({ message: `${user}  Not Found` });
    console.log({ message: `${user} Not Found` });
  }
};

async function getReposList(url) {
  try {
    options.url = url;
    const responce = await axios(options);

    const repoList = [];
    // console.log(responce.data[0].contributors_url);
    await Promise.all(
      responce.data.map(async (val) => {
        const commit_count = await countCommitPerRepo(val.contributors_url);
        const tempRepo = {
          name: val.name,
          repo_url: val.html_url,
          contributors_url: val.contributors_url,
          commit_count: commit_count,
        };
        //   console.log(tempRepo);
        repoList.push(tempRepo);
      })
    );
    return repoList;
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function countCommitPerRepo(url) {
  try {
    options.url = url;

    // console.log(options);
    const responce = await axios(options);

    let totoal_commit_count = 0;
    responce.data.map((val) => {
      totoal_commit_count += val.contributions;
    });

    return totoal_commit_count;
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function totalCommit(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

async function userFindInDB(user) {
  const q = await Profile.find({ username: user }).lean();

  return q.length === 0 ? [false, q] : [true, JSON.parse(JSON.stringify(q))];
}
