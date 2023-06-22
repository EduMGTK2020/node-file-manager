import path from 'path';

import { EventEmitter } from 'node:events';

export const Exit = {
  name: 'Exit',
  description: 'Exiting the program',
  usage: '.exit',
  perform: (args) => {
    process.exit(0);
  },
};
