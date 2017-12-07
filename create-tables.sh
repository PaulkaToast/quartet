#!/bin/bash

#./compile.sh
mvn install
#iquartet/target/quartet-1.0-SNAPSHOT.jar
java -cp ./target:./quartet-1.0-SNAPSHOT.jar quartet.CreateTables
