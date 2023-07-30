/**
 * @fileoverview Submits Giant Eagle feedback survey through the
 *               command-line
 *
 * @author https://github.com/etlu03
 * @release 2023
 */

const process = require('process');
const puppeteer = require('puppeteer');
const fs = require('fs');

/**
 * Automates typing in survey code
 * @param {Object} page Puppeteer page instance
 * @param {string} surveyNumber Code found on receipt
 */
async function typeInSurveyNumber(page, surveyNumber) {
  await page.type('#spl_q_ge_receipt_code_txt', surveyNumber);

  await page.click('#buttonNext');
  await page.waitForTimeout(1000);
}

/**
 * Automates filling survey response
 * @param {Object} page Puppeteer page instance
 */
async function fillInSatisfaction(page) {
  await page.click('#onf_q_gianteagle_osat_with_store_scale5_5');

  await page.click('#onf_q_ge_additional_exp_feedback_yn_2');
  await page.waitForTimeout(1000);
}

/**
 * Automates typing and submitting card number
 * @param {Object} page Puppeteer page instance
 * @param {string} cardNumber Giant Eagle card number
 */
async function typeInCardNumber(page, cardNumber) {
  await page.type('#spl_q_ge_advantage_card_id_txt', cardNumber);

  await page.click('#buttonNext');
  await page.waitForTimeout(1000);
}

/**
 * Submits Giant Eagle feedback survey
 * @param {boolean} [debug=true] Launches browser in headful mode with web
 *                               developer tools open
 *
 * Main point of entry for 'autofill.js'
 */
async function routine(debug = false) {
  if (debug) console.log("Running 'autofill.js' in debug mode...");
  const argc = process.argv.length;
  try {
    if (argc !== 3) {
      throw new TypeError(
        `Incorrect number of arguments. Expected at least 3, recieved ${argc}`
      );
    }

    const browser = await puppeteer.launch({
      devtools: debug,
      defaultViewport: {
        width: 1366,
        height: 768,
      },
      headless: !debug,
    });
    const page = await browser.newPage();

    await page.goto('https://survey3.medallia.com/ge', {
      waitUntil: 'networkidle2',
    });
    await page.bringToFront();

    const surveyNumber = process.argv[2];
    await typeInSurveyNumber(page, surveyNumber);
    await fillInSatisfaction(page);

    await fs.promises
      .readFile('.config.json', { encoding: 'utf8', flag: 'r' })
      .then((result) => {
        const cardNumber = result.cardNumber;

        typeInCardNumber(page, cardNumber);
      });

    await browser.close();
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
}

routine((debug = true));
