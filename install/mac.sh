#!/bin/bash
if which node > /dev/null
  then
  echo "Node installed properly"
  else
  echo "Installing node"
  brew -v
  brew install node
  node -v
  echo "Node installed successfully"
fi
cd ..
echo "Installing dependencies"
npm install
npm start
