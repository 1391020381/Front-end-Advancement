#!/bin/bash

# req.sh  sh req.sh
for((i=1;i<=4;i++)); do   
  curl http://127.0.0.1:3000
  echo ""
done 