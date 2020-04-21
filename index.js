const puppeteer = require("puppeteer");

process.setMaxListeners(Infinity);

const main = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(240000);
    await page.setViewport({ width: 1920, height: 926 });

    await page.goto(
      "https://classroom.github.com/classrooms/47409156-prepadawans-gen-2"
    );

    const cookies = [
      { name: "_octo", value: "GH1.1.349947777.1585017639" },
      { name: "_ga", value: "GA1.2.918775446.1585018562" },
      { name: "tz", value: "America%2FMexico_City" },
    ];

    await page.setCookie(...cookies);

    await page.screenshot({ path: "buddy-screenshot.png" });

    const availableActivities = await page.evaluate(() => {
      return [...document.getElementsByTagName("h3")];
    });

    console.log(availableActivities);

    await browser.close();
  } catch (error) {
    console.log("valió vrg", error);
  }
};

main();
