import React from "react";
// import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import ProfileSegment from "./ProfileSegment";

const Profiles = () => {
  const profile_list = useSelector((state) => state.profiles);

  // console.log(profile_list);
  return !profile_list ? (
    <span className="init-stage"> Enter Somthing ...!!! </span>
  ) : profile_list.message ? (
    <span> {profile_list.message} </span>
  ) : (
    <ProfileSegment profile={profile_list} />
  );
};

export default Profiles;
