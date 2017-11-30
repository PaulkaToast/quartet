#!/bin/bash

rm -rf out
mkdir out
JAVA_FILES=""
for fn in ./src/quartet/*; do
        JAVA_FILES="$JAVA_FILES $fn"
done
javac -d out $JAVA_FILES
java -cp out quartet.Server