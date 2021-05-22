import React from "react";
import { ListGroup } from "react-bootstrap";
const CommitSegment = ({ commit }) => {
  //   console.log("Hey i'm here", commit);
  return (
    <div>
      <ListGroup className="commit-item">
        <ListGroup.Item variant="dark">sha : {commit.sha}</ListGroup.Item>
        <ListGroup.Item>
          Link :{" "}
          <a
            href="/"
            onClick={(event) => window.open(commit.html_url, "_blank")}
            className="link-widh"
          >
            {" "}
            {commit.html_url}{" "}
          </a>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default CommitSegment;
