#!/usr/bin/env node

import scrapper from "./index.js";
import yargs from "yargs";

const { u: classroomUrl, h: headless, r: regularWait, o: otp } = yargs
  .option("classroom-url", {
    alias: "u",
    describe:
      "The url from the GitHub Clasroom e.g. https://classroom.github.com/classrooms/your-classroom",
    demandOption: "Provide a classroom url that we can fetch for you :)",
    type: "string",
    nargs: 1,
  })
  .option("otp", {
    alias: "o",
    describe:
      "This is the one time password that GitHub need in order to login",
    demandOption: "We need your one time password for login into GitHub",
    type: "string",
    nargs: 1,
  })
  .option("regular-wait", {
    alias: "r",
    describe:
      "The waiting time interval in ms for fetching urls. Increase if you have slow internet connection. Default: 5000",
    type: "number",
    nargs: 1,
  })
  .option("headless", {
    alias: "h",
    describe:
      "Add --no-headless if you want to see the actual automated browser working.",
    type: "boolean",
    nargs: 0,
  })
  .help().argv;

const { GH_EMAIL: email, GH_PASSWORD: password } = process.env;

if (email && password)
  scrapper(classroomUrl, process.env.GH_EMAIL, process.env.GH_PASSWORD, otp, {
    regularWait: regularWait,
    headless: !headless,
  });
else console.log("ENV variables GH_EMAIL and GH_PASSWORD are required");
