import readline from 'readline';
import process from 'process';

import messages from './console/messages.js';
import envParam from './utils/getEnv.js';
import parseInputLine from './console/parser.js';

import handleCommand from './commands/index.js';

messages.showInfo(`Welcome to the File Manager, ${envParam.userName}!`);
messages.showAgenda();

const commandLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

messages.startUserPrompt(`\nYou are currently in ${envParam.userWorkDir}`);
commandLine.on('line', (inputLine) => {
  try {
    const resultParse = parseInputLine(inputLine);
    handleCommand(resultParse);
  } catch (err) {
    messages.showError(err.message);
  }
  messages.startUserPrompt(`\nYou are currently in ${envParam.userWorkDir}`);
});

commandLine.on('close', () => {
  messages.showInfo(
    `\nThank you for using File Manager, ${envParam.userName}, goodbye!\n`
  );
});
