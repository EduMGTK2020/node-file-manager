import readline from 'readline';
import process from 'process';

import messages from './console/messages.js';
import env from './utils/getEnv.js';
import parseInputLine from './console/parser.js';

import handleCommand from './commands/index.js';

messages.showInfo(`Welcome to the File Manager, ${env.Parameters.userName}!`);
messages.showAgenda();

const commandLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

messages.showSystemInfo(`\nYou are currently in ${env.Parameters.userWorkDir}`);
commandLine.on('line', async (inputLine) => {
  try {
    await handleCommand(parseInputLine(inputLine));
  } catch (err) {
    messages.showError(err.message);
  }
  messages.showSystemInfo(`\nYou are currently in ${env.getUserWorkDir()}`);
});

process.on('exit', () => {
  messages.showInfo(
    `\nThank you for using File Manager, ${env.Parameters.userName}, goodbye!\n`
  );
});
