#!/bin/bash
# For getting activities link, use the following snippet inside browser console
# Para copiar las urls del classroom ejecuta lo siguiente en la consola
# copy([...document.getElementsByTagName("h3")].map(item => item.children[0].href));
ACTIVIDADES=(https://classroom.github.com/classrooms/47409156-prepadawans-gen-5/assignments/activity-5-broken-keyboard-python https://classroom.github.com/classrooms/47409156-prepadawans-gen-5/assignments/activity-6-highest-occurrence-js https://classroom.github.com/classrooms/47409156-prepadawans-gen-5/assignments/activity-6-highest-occurrence-python https://classroom.github.com/classrooms/47409156-prepadawans-gen-5/assignments/activity-7-word-search-js https://classroom.github.com/classrooms/47409156-prepadawans-gen-5/assignments/activity-7-word-search-python https://classroom.github.com/classrooms/47409156-prepadawans-gen-5/assignments/extra-web-activity-memory-game)

for actividad in "${ACTIVIDADES[@]}"
do
	node index.js $actividad
done

echo "All activities done"