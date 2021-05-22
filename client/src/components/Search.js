import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Form, FormControl } from "react-bootstrap";

import { useDispatch } from "react-redux";

import { getProfile } from "../actions";

const Search = () => {
  // const profile = useSelector((state) => state.profiles);
  const dispatch = useDispatch();

  const handleSumit = (e) => {
    // console.log(e);
    e.preventDefault();
    const val = e.target.search.value;
    if (val) dispatch(getProfile(val));
  };

  // console.log(profile);
  return (
    <div className="form">
      <Form
        className="search"
        noValidate
        autoComplete="off"
        onSubmit={handleSumit}
      >
        <FormControl
          className="text-field"
          type="text"
          id="search"
          placeholder="Enter your github username"
          defaultValue=""
        />
        <Button className="button" variant="dark" type="Submit">
          Search
        </Button>{" "}
      </Form>
    </div>
  );
};

export default Search;
