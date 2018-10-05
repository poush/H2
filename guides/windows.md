# Installation instructions for Windows systems
These instructions have been tested on Windows 10 1803 x64

# Install Node.js
 - Go to https://nodejs.org 
 - Download the "Current" version 
    - If the homepage doesn't show a download link get it from the "Downloads" section (https://nodejs.org/en/download/current/)
 - Run the .msi package and complete the install
 - Verify the installation by opening Powershell and typing `node --version` and hitting Enter. The version number of your node installation is shown in the next line
 
# Install h2
## Cloning from Github 
 - Clone this repository
```
git clone https://github.com/poush/h2`
```
 - Go into the repository on your machine
 - Open Powershell 
 - Change to the folder containing the cloned version
 - Install dependencies - this might take a few minutes
```
npm install
```

## Using the zip file from Github
 - Save the zip to your disk 
 - Unzip it to the desired target location
 - Open Powershell 
 - Change to the folder containing the cloned version (__h2-master__)
 - Install dependencies - this might take a few minutes
```
npm install
```

# Run h2
After the installation is complete stay in the h2 directory and type
```
nmp start
```

   