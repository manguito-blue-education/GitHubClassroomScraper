// Para copiar las urls del classroom ejecuta lo siguiente en la consola
// copy([...document.getElementsByTagName("h3")].map(item => item.children[0].href));
const dotenv = require('dotenv');
dotenv.config();

const puppeteer = require("puppeteer");

process.setMaxListeners(Infinity);

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const activityUrl = process.argv.slice(2)[0] || "";

const main = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(240000);
    await page.setViewport({ width: 1920, height: 926 });

    await page.goto(activityUrl);

    await page.type("#login_field", process.env.GH_EMAIL || "your_email");
    await page.type("#password", process.env.GH_PASSWORD || "your_pswd");

    await Promise.all([
      page.click(".btn.btn-primary.btn-block"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await page.type("#otp", process.env.GH_OTP_PASSWORD || "your_otp");

    await Promise.all([
      page.click(".btn.btn-primary.btn-block"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await page.waitForNavigation({ waitUntil: "networkidle0" });

    const availableActivities = await page.evaluate(() => {
      const activityTitle = document.getElementsByTagName("h1")[0].innerText;
      const users = [
        ...document.getElementsByClassName("assignment-repo-list-item"),
      ].map((item) => {
        const userName = item.children[0].children[1].children[0].innerText;
        const description = item.children[0].children[1].children[1].innerText
          .trim()
          .split("\n")
          .join(" ");
        return { userName, description };
      });

      return users.map((user) => ({ ...user, activityTitle }));
    });

    await browser.close();

    const csvWriter = createCsvWriter({
      path: `./output/${availableActivities[0].activityTitle
        .trim()
        .split(" ")
        .join("_")}.csv`,
      header: [
        { id: "activityTitle", title: "Actividad" },
        { id: "userName", title: "Usuario" },
        { id: "description", title: "Descripción" },
      ],
    });

    await csvWriter.writeRecords(availableActivities);
  } catch (error) {
    console.log("valió vrg", error);
  }
};

main();
