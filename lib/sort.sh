#!/bin/bash

npx tsc src/__mocks__/scores.ts --module nodenext --ignoreConfig &> /dev/null
node lib/sort.js
rm src/__mocks__/scores.js
