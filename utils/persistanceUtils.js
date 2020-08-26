import fs from "fs";
import csvWriter from "csv-writer";
const createCsvWriter = csvWriter.createObjectCsvWriter;

export const parseActivityInfo = ({ userName, description, activityTitle }) => {
  const isValidDescription = /Latest commit (passed|failed)  \d* commits  (Not Submitted|Submitted)/.test(
    description
  );

  // As we are validating if its the expected description, we can safely take the first element
  const isSubmitted =
    (isValidDescription
      ? description.match(/(Not Submitted|Submitted)/g)[0]
      : "NA") === "Submitted";

  const isSolved =
    (isValidDescription
      ? description.match(/Latest commit (passed|failed)/g)[0]
      : "NA"
    ).replace("Latest commit ", "") === "passed";

  const commitsMade = +(isValidDescription
    ? description.match(/\d* commits/g)[0]
    : "0"
  ).replace(" commits", "");

  return {
    userName,
    description,
    activityTitle,
    isSubmitted,
    isSolved,
    commitsMade,
  };
};

export const saveResultsPerActivity = parsedActivityList => {
  const resultsPerActivity = parsedActivityList.reduce((carry, result) => {
    carry[result.activityTitle] = Object.keys(carry).includes(
      result.activityTitle
    )
      ? [{ ...result }, ...carry[result.activityTitle]]
      : [{ ...result }];
    return { ...carry };
  }, {});

  fs.writeFileSync(
    "./resultsPerActivity.json",
    JSON.stringify(resultsPerActivity, null, "\t")
  );

  return resultsPerActivity;
};

export const saveResultsPerUser = async parsedActivityList => {
  const resultsPerUser = parsedActivityList.reduce((carry, result) => {
    const { userName } = result;
    carry[userName] = Object.keys(carry).includes(userName)
      ? [{ ...result }, ...carry[userName]]
      : [{ ...result }];
    return { ...carry };
  }, {});

  const userNames = Object.keys(resultsPerUser);

  const finalResultsPerUser = userNames.map(userName => {
    return resultsPerUser[userName].reduce(
      (
        carry,
        { userName, activityTitle, isSubmitted, isSolved, commitsMade }
      ) => {
        carry.submittedActivities += isSubmitted ? 1 : 0;
        carry.solvedPythonActivities +=
          activityTitle.includes("Python") && isSolved ? 1 : 0;
        carry.solvedJsActivities +=
          activityTitle.includes("JS") && isSolved ? 1 : 0;
        carry.totalActivities += 1;
        carry.userName = userName;

        return { ...carry };
      },
      {
        submittedActivities: 0,
        solvedPythonActivities: 0,
        solvedJsActivities: 0,
        totalActivities: 0,
        userName: "",
      }
    );
  });

  const csvWriter = createCsvWriter({
    path: `./resultsPerUser.csv`,
    header: [
      { id: "userName", title: "User" },
      { id: "submittedActivities", title: "Activities" },
      { id: "solvedPythonActivities", title: "Python Completed" },
      { id: "solvedJsActivities", title: "JS Completed" },
      { id: "totalActivities", title: "Total Tried Activities" },
    ],
  });

  await csvWriter.writeRecords(finalResultsPerUser);
};
