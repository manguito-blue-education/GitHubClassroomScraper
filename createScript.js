const fsp = require("fs/promises");
/////////////////////////////// PASTE THE URLS HERE ///////////////////////////////////////////////////////////
const urlsList = [
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
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////
const templateFile = `
#!/bin/bash
ACTIVIDADES=(${urlsList.join(" ")})

for actividad in "\${ACTIVIDADES[@]}"
do
	node index.js $actividad
done

echo "All activities done"
`;

fsp.writeFile("./main.sh", templateFile);
