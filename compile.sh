#!/bin/bash

rm -rf out
mkdir out
JAVA_FILES=""
for fn in ./src/main/java/quartet/*; do
        JAVA_FILES="$JAVA_FILES $fn"
done
echo "Compiling ${JAVA_FILES}"
javac -d out $JAVA_FILES
