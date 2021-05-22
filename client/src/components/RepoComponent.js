import React from "react";
import { ListGroup } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getALlCommits } from "../actions";
import { Button } from "react-bootstrap";
const RepoComponent = ({ repos }) => {
  const profile = useSelector((state) => state.profiles);
  const dispatch = useDispatch();
  // const commitRed = useSelector((state) => state.commitReducer);
  // console.log(commitRed);
  const handleClick = (e) => {
    // e.preventDefault();

    dispatch(getALlCommits(profile.username, repos.name));
  };

  // console.log(commitRed);
  return (
    <ListGroup className="repo-item">
      <ListGroup.Item variant="dark">
        name :{" "}
        <Link
          name="repo_name"
          onClick={handleClick}
          to={`/commit/${repos.name}`}
        >
          <Button variant="dark" onClick={handleClick}>
            {repos.name}
          </Button>
        </Link>
      </ListGroup.Item>
      <ListGroup.Item>
        {" "}
        repo_url :{" "}
        <a href="/" onClick={(event) => window.open(repos.repo_url, "_blank")}>
          {" "}
          {repos.repo_url}{" "}
        </a>{" "}
      </ListGroup.Item>
      <ListGroup.Item>Commit_Count : {repos.commit_count}</ListGroup.Item>
    </ListGroup>
  );
};

export default RepoComponent;
