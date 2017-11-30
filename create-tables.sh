#!/bin/bash

./compile.sh
java -cp ./out:./derby.jar quartet.CreateTables