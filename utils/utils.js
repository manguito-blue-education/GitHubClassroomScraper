module.exports.login = async page => {
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
  return page;
};

module.exports.getActivityUsers = async page => {
  return await page.evaluate(() => {
    const activityTitle = document.getElementsByTagName("h1")[0].innerText;
    const users = [
      ...document.getElementsByClassName("assignment-repo-list-item"),
    ].map(item => {
      const userName = item.children[0].children[1].children[0].innerText;
      const description = item.children[0].children[1].children[1].innerText
        .trim()
        .split("\n")
        .join(" ");
      return { userName, description };
    });

    return users.map(user => ({ ...user, activityTitle }));
  });
};
