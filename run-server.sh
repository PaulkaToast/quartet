#!/bin/bash

#./compile.sh
mvn install

#java -cp ./out:./derby.jar quartet.Server
java -cp ./target/quartet-1.0-SNAPSHOT.jar quartet.Server
