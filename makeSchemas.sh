

for i in $(ls src/store/schemas); do
  node ./node_modules/maketypes/index.js -p src/store/$i.ts src/store/schemas/$i $i
done
