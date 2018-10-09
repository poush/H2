#!/bin/bash
if which node > /dev/null
  then
  echo "Node installed properly"
  else
  echo "Installing node"
  curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
  sudo apt-get install -y nodejs
  node -v
  echo "Node installed successfully"
fi
cd ..
echo "Installing dependencies"
npm install
npm start
