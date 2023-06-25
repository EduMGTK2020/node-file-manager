import readline from 'readline';
import process from 'process';

import messages from './console/messages.js';
import parseInputLine from './console/parser.js';
import commands from './commands/handler.js';
import { envParameters } from './utils/shared.js';

const commandLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

messages.showInfo(`Welcome to the File Manager, ${envParameters.userName}!`);
messages.showAgenda();
messages.showPrompt(
  commandLine,
  `\nYou are currently in ${envParameters.userWorkDir}`
);

commandLine.on('line', async (inputLine) => {
  try {
    await commands.handleCommand(parseInputLine(inputLine));
  } catch (err) {
    messages.showError(err.message);
  }
  messages.showPrompt(
    commandLine,
    `\nYou are currently in ${envParameters.userWorkDir}`
  );
});

process.on('exit', () => {
  messages.showInfo(
    `\nThank you for using File Manager, ${envParameters.userName}, goodbye!\n`
  );
});
