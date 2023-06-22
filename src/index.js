import readline from 'readline';
import process from 'process';

import messages from './console/messages.js';
import envParam from './utils/getEnv.js';

messages.showInfo(`Welcome to the File Manager, ${envParam.userName}!`);
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
    `\nThank you for using File Manager, ${envParam.userName}, goodbye!\n`
  );
});
