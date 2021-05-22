import React from "react";
import CommitSegment from "./CommitSegment";
const BranchList = ({ branch }) => {
  // console.log("Branch", branch);
  return (
    <div>
      <h2 className="branch-name bch2">{branch.name}</h2>
      <h6 className="branch-name link-widh">
        latest_sha : {branch.latest_sha}{" "}
      </h6>
      {branch.commits.length ? (
        <p className="repo-para"> Commit List : </p>
      ) : (
        <p className="repo-para"> No Commmit Found </p>
      )}
      {branch.commits.map((commit) => {
        return (
          <span key={commit._id}>
            {/* {(console.log("called"))} */}
            <CommitSegment commit={commit} />
          </span>
        );
      })}
    </div>
  );
};

export default BranchList;
