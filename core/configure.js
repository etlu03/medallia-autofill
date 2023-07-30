/**
 * @fileoverview Enables users to set their Giant Eagle card number
 *
 * @author https://github.com/etlu03
 * @release 2023
 */

const readline = require('readline');
const process = require('process');
const fs = require('fs');

/* Main point of entry for 'configure.js' */
(async () => {
  const commandLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  commandLine.question('Update card number (y/n)? ', (response) => {
    if (response === 'y') {
      commandLine.question('Giant Eagle card number: ', (cardNumber) => {
        const json = JSON.stringify(
          { cardNumber: cardNumber },
          (replacer = null),
          (space = 2)
        );
        fs.promises
          .writeFile('.config.json', json, { encoding: 'utf8', flag: 'w' })
          .catch((err) => {
            console.error(err);
          });

        commandLine.close();
      });
    } else if (response === 'n') {
      commandLine.close();
    } else {
      console.log(
        `Your response ('${response}') was not one of the expected responses: y, n`
      );

      commandLine.close();
    }
  });
})();
