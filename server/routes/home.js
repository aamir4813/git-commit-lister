import express from "express";
import { homePage, createProfile } from "../controller/home.js";
import { createCommits } from "../controller/commits.js";

const router = express.Router();

// router.get("/", homePage);

router.post("/:user", createProfile);

router.post("/commit/:reponame", createCommits);

export default router;
