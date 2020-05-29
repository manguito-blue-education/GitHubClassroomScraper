#!/bin/bash
# For getting activities link, use the following snippet inside browser console
# Para copiar las urls del classroom ejecuta lo siguiente en la consola
# copy([...document.getElementsByTagName("h3")].map(item => item.children[0].href));
ACTIVIDADES=(https://classroom.github.com/classrooms/47409156-prepadawans-gen-3/assignments/activity-6-highest-ocurrence-python)

for actividad in "${ACTIVIDADES[@]}"
do
	node index.js $actividad
done

echo "All activities done"