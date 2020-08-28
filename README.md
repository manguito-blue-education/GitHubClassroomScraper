# GitHub Classroom Scraper

Scraper for obtaining information about activities from a GitHub classroom.

## Requirements

- Have installed the latest version of [node](https://nodejs.org/en/).
- Enabled 2 factor authentication in your GitHub account, with an authenticator app.
- You need to set env variables with your GitHub username and password, they are `GH_EMAIL`, `GH_PASSWORD` respectively.

## Install

To install this tool, you need to do it with npm. We suggest to do it globally if you are going to use only the CLI.

```bash
npm i -g @hackademymx/github-classroom-scraper
```

or if you prefer you could install it locally

```bash
npm i @hackademymx/github-classroom-scraper
```

## Usage

### CLI

To use the CLI tool, you need to type:

```bash
github-classroom-scraper -u YOUR_CLASSROOM_URL -o YOUR_OTP
```

The different flags are:

| Option | Name          | Description                                                                            | Required | Default |
| ------ | ------------- | -------------------------------------------------------------------------------------- | -------- | ------- |
| u      | classroom-url | The URL of your classroom. e.g. https://classroom.github.com/classrooms/your-classroom | YES      | NA      |
| o      | otp           | The one time password of your 2FA                                                      | YES      | NA      |
| r      | regular-wait  | The waiting interval in ms for fetching info. Increase it for low speed connections    | NO       | 5000    |
| h      | headless      | It controls if you see the automated browser or no                                     | NO       | true    |

It will throw two files:

- `resultsPerActivity.json`: All the results per activity in the following format:

```json
{
  "Activity Name": [
    {
      "userName": "student username",
      "description": "The user's activity message. e.g. 'Latest commit passed 7 commits Submitted'",
      "activityTitle": "Activity Name",
      "isSubmitted": "Parsed submitted value in description",
      "commitsMade": "Parsed commits value in description"
    }
  ]
}
```

- `resultsPerUser.csv`: A condensed activities for JS and Python exercises. It has the following columns:

| User | Activities | Submitted | Python Completed | JS Completed | Total Tried Activities |
| ---- | ---------- | --------- | ---------------- | ------------ | ---------------------- |


### Module

To use this as a module, just import it as another dependency

```javascript
import scraper from "@hackademymx/github-classroom-scraper";
```

This is an `async` function, that has the following signature:

```javascript
scraper(githubClassroomUrl, user, password, otp, { regularWait, headless, navigationTimeout, defaultViewport, generateFiles }) -> Object
```

| Param             | Description                                                                            | Default |
| ----------------- | -------------------------------------------------------------------------------------- | ------- |
| githubClasroomUrl | The URL of your classroom. e.g. https://classroom.github.com/classrooms/your-classroom | NA      |
| user              | Your GitHub user                                                                       | NA      |
| password          | Your GitHub password                                                                   | NA      |
| otp               | The one time password that the app throws you                                          | NA      |
| regularWait       | The time that waits in ms to info to load. Increase for low speed connections          | 5000    |
| headless          | If you want to see the actual browser working                                          | true    |
| navigationTimeout | Time that browser with no interaction will wait in ms before throwing an exception     | 24000   |
| defaultViewport   | The viewport that the browser will launch. Null for max resolution                     | null    |
| generateFiles     | Generate result files as the cli                                                       | true    |

The result object will be a list of objects that have the following structure:

```javascript
[
  {
    userName: "The username of the student that solved the activity",
    description:
      "The description of the activity e.g. 'Latest commit passed  6 commits  Not Submitted'",
    activityTitle: "The title of the activity",
  },
];
```

## Contribution

Fork the repo, and install the dependencies:

```bash
npm install
```

Feel free to open an issue or pull request. Contributions welcome!

## License

This project is licensed under the terms of the MIT license.

Made with 💙 and 🌮 in 🇲🇽
