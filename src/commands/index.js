import { Up } from './fs/up.js';

const listCommands = {
  up: Up,
};

const handleCommand = (action) => {
  const command = action.command;
  const args = action.args;

  try {
    listCommands[command].perform(args);
  } catch {
    throw new Error('no such command');
  }
};

export default handleCommand;
