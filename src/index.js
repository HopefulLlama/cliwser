const inquirer = require('inquirer');
const puppeteer = require('puppeteer');

const CommandTable = require('./CommandTable');

function waitForPrompt(commandTable) {
  return inquirer.prompt([{
    type: 'input',
    name: 'input',
    message: '>'
  }])
  .then(input => {
    return commandTable.safeExecute(input);
  })
  .then(() => {
    return waitForPrompt(commandTable);
  });
}

if(require.main === module) {
  let browser, page;

  puppeteer
    .launch()
    .then(b => {
      browser = b;
      return b.newPage();
    })
    .then(p => {
      page = p;
      console.log('cliwser has started.');

      return waitForPrompt(new CommandTable(browser, page));
    });
}