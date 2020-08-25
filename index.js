import dotenv from "dotenv";
import puppeteer from "puppeteer";
import {
  login,
  getActivityUsers,
  getClassroomActivities,
} from "./utils/pageUtils.js";
import {
  parseActivityInfo,
  saveResultsPerActivity,
  saveResultsPerUser,
} from "./utils/persistanceUtils.js";
import reduce from "awaity/reduce.js";
import fs from "fs";

dotenv.config();

const main = async (
  classroomUrl,
  {
    regularWait = 3000,
    headless = true,
    navigationTimeout = 24000,
    defaultViewport = null,
  } = {}
) => {
  try {
    const browser = await puppeteer.launch({ headless, defaultViewport });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(navigationTimeout);

    await page.goto(classroomUrl);
    await login(page);
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    await page.waitFor(regularWait);

    const activitiesUrls = await getClassroomActivities(
      page,
      classroomUrl,
      regularWait
    );
    const allActivities = await reduce.default(
      activitiesUrls,
      async (carry, activityUrl, idx) => {
        console.log("Fetching:", activityUrl);
        await page.goto(activityUrl);

        await page.waitFor(regularWait);
        const availableActivities = await getActivityUsers(page);

        return [...carry, ...availableActivities];
      },
      []
    );

    await browser.close();
    const parsedActivities = allActivities.map(activity =>
      parseActivityInfo(activity)
    );
    saveResultsPerActivity(parsedActivities);

    await saveResultsPerUser(parsedActivities);
  } catch (error) {
    console.log("An error occured while parsing activities: ", error.message);
  }
};
main("https://classroom.github.com/classrooms/47409156-prepadawans-gen-8", {
  regularWait: 7000,
  headless: false,
});
