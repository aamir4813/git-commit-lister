import * as api from "../api";
import axios from "axios";

export const getProfile = (val) => async (dispatch) => {
  try {
    if (val !== undefined) {
      // console.log(val);
      const responce = await api.fetchProfile(val);
      // console.log(responce);
      dispatch({ type: "FETCH_ALL", payload: responce.data });
    }
  } catch (error) {
    dispatch({
      type: "FETCH_ALL",
      payload: { message: error.response.data.message },
    });
  }
};

export const getALlCommits = (user, repo) => async (dispatch) => {
  try {
    // const responce = await api.fetchAllCommits(user, repo);
    // console.log(responce);

    const url = "https://git-commit-list.herokuapp.com";

    const options = {
      url: `${url}/commit/${repo}`,
      method: "post",
      data: {
        username: user,
        repo_name: repo,
      },
    };
    const res = await axios(options);
    // console.log(res.data);
    // console.log(res.data);
    dispatch({ type: "FETCH_ALL_COMMITS", payload: res.data });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "FETCH_ALL_COMMITS",
      payload: { message: error.message },
    });
  }
};
