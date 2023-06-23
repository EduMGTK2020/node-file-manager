import { Exit } from './exit.js';

import { Up } from './fs/up.js';
import { Cd } from './fs/cd.js';
import { Ls } from './fs/ls.js';
import { Cat } from './fs/cat.js';

const listCommands = {
  '.exit': Exit,
  up: Up,
  cd: Cd,
  ls: Ls,
  cat: Cat,
};

const handleCommand = async (action) => {
  const command = action.command;
  const args = action.args;

  try {
    await listCommands[command].perform(args);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handleCommand;
