#!/bin/bash
# For getting activities link, use the following snippet inside browser console
# Para copiar las urls del classroom ejecuta lo siguiente en la consola
# copy([...document.getElementsByTagName("h3")].map(item => item.children[0].href));
ACTIVIDADES=(https://classroom.github.com/classrooms/47409156-prepadawans-gen-2/assignments/activity-1-hello-world-js https://classroom.github.com/classrooms/47409156-prepadawans-gen-2/assignments/activity-2-geometry-js https://classroom.github.com/classrooms/47409156-prepadawans-gen-2/assignments/activity-3-array-of-multiples https://classroom.github.com/classrooms/47409156-prepadawans-gen-2/assignments/activity-4-get-budget https://classroom.github.com/classrooms/47409156-prepadawans-gen-2/assignments/activity-5-broken-keyboard-js)
for actividad in "${ACTIVIDADES[@]}"
do
	node index.js $actividad
done

echo "All activities done"