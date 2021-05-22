import React from "react";
import { useSelector } from "react-redux";
import BranchList from "./BranchList";

const Commitlist = () => {
  const commitRed = useSelector((state) => state.commitReducer);

  return (
    <div>
      <h1 className="branch-name"> {commitRed.repo_name} </h1>

      {/* {console.log("here", commitRed.brances)} */}
      {commitRed.brances ? (
        commitRed.brances.map((branch) => {
          return (
            <span key={branch._id}>
              <BranchList branch={branch} />
            </span>
          );
        })
      ) : (
        <span key="not-found-any-branch">Waiting.......</span>
      )}
    </div>
  );
};

export default Commitlist;
