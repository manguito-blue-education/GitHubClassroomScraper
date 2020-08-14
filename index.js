import dotenv from "dotenv";
import puppeteer from "puppeteer";
import csvWriter from "csv-writer";
import { login, getActivityUsers } from "./utils/utils.js";
import reduce from "awaity/reduce.js";
import fs from "fs";

dotenv.config();
// process.setMaxListeners(Infinity);
const createCsvWriter = csvWriter.createObjectCsvWriter;

const main = async (
  activitiesUrls,
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

    const allActivities = await reduce.default(
      activitiesUrls,
      async (carry, activityUrl, idx) => {
        console.log("Fetching:", activityUrl);
        await page.goto(activityUrl);

        if (idx === 0) {
          await login(page);
          await page.waitForNavigation({ waitUntil: "networkidle0" });
        }

        await page.waitFor(regularWait);
        const availableActivities = await getActivityUsers(page);

        return [...carry, ...availableActivities];
      },
      []
    );

    fs.writeFileSync("./cosa.json", JSON.stringify(allActivities, null, "\t"));

    await browser.close();

    // const csvWriter = createCsvWriter({
    //   path: `./output/${availableActivities[0].activityTitle
    //     .trim()
    //     .split(" ")
    //     .join("_")}.csv`,
    //   header: [
    //     { id: "activityTitle", title: "Actividad" },
    //     { id: "userName", title: "Usuario" },
    //     { id: "description", title: "Descripción" },
    //   ],
    // });

    // await csvWriter.writeRecords(availableActivities);
  } catch (error) {
    console.log("An error occured while parsing activities: ", error.message);
  }
};

main([
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-1-hello-world-js",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-1-hello-world-python",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-2-geometry-js",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-2-geometry-python",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-3-array-of-multiples-js",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-3-array-of-multiples-python",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-4-get-budget-js",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-4-get-budget-python",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-5-broken-keyboard-js",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-5-broken-keyboard-python",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-6-highest-occurrence-js",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-6-highest-occurrence-python",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-7-word-search-js",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/activity-7-word-search-python",
  "https://classroom.github.com/classrooms/47409156-prepadawans-gen-8/assignments/extra-web-activity",
]);
