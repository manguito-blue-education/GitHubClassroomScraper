# GitHub Classroom Scraper

CLI scraper for obtaining information about activities from a GitHub classroom.

## Requirements

- Have installed the latest version of [node](https://nodejs.org/en/).
- Enabled 2 factor authentication in your GitHub account.
- You need to set env variables with your GitHub username and password, they are `GH_EMAIL`, `GH_PASSWORD` respectively.

## Install

To install this tool, you need to do it with npm.

```bash
npm i -g @hackademymx/github-classroom-scraper
```

## Usage

To use the tool, you need to type:

```bash
github-classroom-scraper -u YOUR_CLASSROOM_URL -o YOUR_OTP
```

The different options are:
 

| Option | Name          | Description                                                                            | Required | Default |
| ---    | ---           | ---                                                                                    | ---      | ---     |
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

|User|Activities|Submitted|Python Completed|JS Completed|Total Tried Activities|
|-|-|-|-|-|-|

## Contribution

Fork the repo, and install the dependencies:

```bash
npm install
```

Feel free to open an issue or pull request. Contributions welcome!

## License

This project is licensed under the terms of the MIT license.


Made with 💙 and 🌮 in 🇲🇽
