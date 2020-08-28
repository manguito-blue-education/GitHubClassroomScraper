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

export default async (
  classroomUrl,
  user,
  password,
  otp,
  {
    regularWait = 5000,
    headless = true,
    navigationTimeout = 24000,
    defaultViewport = null,
    generateFiles = true,
  } = {}
) => {
  const browser = await puppeteer.launch({ headless, defaultViewport });
  try {
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(navigationTimeout);

    await page.goto(classroomUrl);
    console.log("Trying login...");
    await login(page, user, password, otp);
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    await page.waitFor(regularWait);
    console.log("Login successful");

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

    if (generateFiles) {
      const parsedActivities = allActivities.map(activity =>
        parseActivityInfo(activity)
      );
      saveResultsPerActivity(parsedActivities);

      await saveResultsPerUser(parsedActivities);
    }

    return allActivities;
  } catch (error) {
    console.log("An error occured while parsing activities: ", error.message);
    return null;
  } finally {
    await browser.close();
  }
};
