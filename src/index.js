import readline from 'readline';
import process from 'process';

import messages from './console/messages.js';
import envParam from './utils/getEnv.js';

const startUserName = envParam.getStartUserName();

messages.showInfo(`Welcome to the File Manager, ${startUserName}!`);
messages.showAgenda();

const commandLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(messages.startPrompt());
commandLine.on('line', (inputLine) => {
  //console.log(inputLine);
  //console.log(messages.startPrompt());
});

commandLine.on('close', () => {
  messages.showInfo(
    `\nThank you for using File Manager, ${startUserName}, goodbye!\n`
  );
});
