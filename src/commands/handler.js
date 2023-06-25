import { up } from './fs/up.js';
import { cd } from './fs/cd.js';
import { ls } from './fs/ls.js';
import { cat } from './fs/cat.js';
import { add } from './fs/add.js';
import { rn } from './fs/rn.js';
import { cp } from './fs/cp.js';
import { mv } from './fs/mv.js';
import { rm } from './fs/rm.js';
import { compress } from './fs/compress.js';
import { decompress } from './fs/decompress.js';

import { exit } from './systems/exit.js';
import { Os } from './systems/os.js';
import { hash } from './systems/hash.js';

const listCommands = {
  '.exit': exit,
  up,
  cd,
  ls,
  cat,
  add,
  rn,
  cp,
  mv,
  rm,
  os: Os,
  hash,
  compress,
  decompress,
};

const handleCommand = async (action) => {
  const command = action.command;
  const args = action.args;

  const actualCommand = listCommands[command];

  if (actualCommand) {
    const mandatoryArgsNumber = actualCommand.usage.split(' ').length - 1;
    if (mandatoryArgsNumber != args.length) {
      throw new Error(
        `Invalid input: wrong arguments number - ${args.length}, should be ${mandatoryArgsNumber}`
      );
    }

    try {
      await listCommands[command].perform(args);
    } catch (err) {
      throw new Error(err.message);
    }
  } else {
    throw new Error(`Invalid input: unknown operation`);
  }
};

export default handleCommand;
