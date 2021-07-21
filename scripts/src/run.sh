#!/bin/bash

# execute script each first day of the month
#0 3 1 * * /home/user/path/to/script.sh

# cd /home/user/path/to/nodejs/script/directory/
# node src/run.js

# passing a parameter to run.js is saying that I want to execute the download and the email for the previous month
node src/run.js previous