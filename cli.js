#!/usr/bin/env node
import scrapper from "./index.js";
import dotenv from "dotenv";
import yargs from "yargs";

dotenv.config();

const { u, h, r, o } = yargs
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
    describe: "Add --no-headless if you want to see the actual automated browser working.",
    type: "boolean",
    nargs: 0,
  })
  .help().argv;

scrapper(u, process.env.GH_EMAIL, process.env.GH_PASSWORD, o, {
  regularWait: r,
  headless: !h,
});
