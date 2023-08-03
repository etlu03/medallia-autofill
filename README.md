# Automate Filling and Submitting the Giant Eagle Feedback Survey

This repository contains the source code of an web automation tool. Through the command-line interface, the program navigates to the [Medallia Giant Eagle Survey](https://survey3.medallia.com/ge) and completes the survey on the user's behalf.

# Installation

```shell
> sh setup.sh
```

# Usage
In order for the program to complete the Medallia survey, the follow command must be run at least once:
```shell
> node core/config.js # asks for the user's Giant Eagle card number
```

After the user provides their Giant Eagle card number, the main routine can be accessed via the following command:
```shell
> node core/autofill.js
```
