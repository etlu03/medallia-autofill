# Automate filling out the Giant Eagle feedback survey
This repository contains the source code of a web automation tool. Through the command-line interface, the program can navigate to the [Medallia Giant Eagle feedback survey](https://survey3.medallia.com/ge) and submit a response on the user's behalf.

<p align="center">
<img src = docs/medallia.com.png>
Medellia Webpage
</p>

# Setup
To use this service, you will need [Node.js](https://nodejs.org/en), which you should install beforehand. <br>
Then, clone this repository to your local machine by running the following command:
```shell
> git clone https://github.com/etlu03/medallia-autofill.git
```
Now, install the module's dependencies by 'cd'-ing into the root of the repository and running one of the following commands:
```shell
> npm install
# or
> sh setup.sh
# to install development dependencies
```

# Usage
Once all dependencies have been installed you can configure your settings by running the following command:
```shell
# this command must be run at least once to create a user profile
node core/configure.js
```
After a user profile is created the tool can be run using the following command:
```shell
> node core/autofill.js {the provided survey code on your receipt}
```
