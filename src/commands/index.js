import { Exit } from './exit.js';

import { Up } from './fs/up.js';
import { Cd } from './fs/cd.js';
import { Ls } from './fs/ls.js';
import { Cat } from './fs/cat.js';
import { Add } from './fs/add.js';
import { Rn } from './fs/rn.js';
import { Cp } from './fs/cp.js';
import { Mv } from './fs/mv.js';
import { Rm } from './fs/rm.js';

import { Hash } from './fs/hash.js';
import { Compress } from './fs/compress.js';
import { Decompress } from './fs/decompress.js';

import { Os } from './os.js';

const listCommands = {
  '.exit': Exit,
  up: Up,
  cd: Cd,
  ls: Ls,
  cat: Cat,
  add: Add,
  rn: Rn,
  cp: Cp,
  mv: Mv,
  rm: Rm,
  os: Os,
  hash: Hash,
  compress: Compress,
  decompress: Decompress,
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
