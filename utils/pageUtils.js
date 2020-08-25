export const login = async (page, username, password, otp) => {
  await page.type("#login_field", username);
  await page.type("#password", password);

  await Promise.all([
    page.click(".btn.btn-primary.btn-block"),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);

  await page.type("#otp", otp);

  await Promise.all([
    page.click(".btn.btn-primary.btn-block"),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);
};

export const getActivityUsers = async page => {
  try {
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
  } catch (error) {
    console.log("An error occurred while fetching data: ", error.message);
    console.log(
      "Maybe your internet connection is getting slow. Try increasing regularWait param"
    );
    return null;
  }
};

export const getClassroomActivities = async (
  page,
  classroomUrl,
  regularWait
) => {
  return await page.evaluate(() => {
    return [...document.getElementsByTagName("h3")].map(
      item => item.children[0].href
    );
  });
};
