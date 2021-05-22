import React from "react";
import RepoComponent from "./RepoComponent";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const ProfileSegment = ({ profile }) => {
  // console.log(profile);

  return (
    <div className="profile-list">
      <Container className="profile-container">
        <Row className="container-item">
          <Col>
            <h1 className="profile-item">username : {profile.username}</h1>
            <h1 className="profile-item">Name : {profile.name}</h1>
            <h1 className="profile-item">
              Total Repos : {profile.total_repos}
            </h1>
            <h1 className="profile-item">
              Total Commits : {profile.total_commits}
            </h1>
            {/* <h1 className="profile-item">created_at : {profile.created_at}</h1> */}
          </Col>
          <Col xs={6} md={4} className="container-col-2">
            <span className="avatar">
              <Image src={profile.avatar} roundedCircle />
            </span>
            {/* <h1 className="profile-item">
              Profile_url : {profile.profile_url}
            </h1> */}
            <Button
              className="profile-button"
              variant="dark"
              onClick={(event) => window.open(profile.profile_url, "_blank")}
              type="Submit"
            >
              Visit Profile
            </Button>
          </Col>
        </Row>
      </Container>

      <h1 className="profile-item">
        <div className="repo-list">
          {profile.repo_list.length ? (
            <p className="repo-para"> Repo List : </p>
          ) : (
            <p className="repo-para"> No Public Repos Found </p>
          )}

          {profile.repo_list.map((repos) => {
            // console.log(repos);
            return (
              <span key={repos._id} className="repo-span">
                <RepoComponent repos={repos} />
              </span>
            );
          })}
        </div>
      </h1>
    </div>
  );
};

export default ProfileSegment;
