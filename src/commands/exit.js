import path from 'path';

import { EventEmitter } from 'node:events';

export const Exit = {
  name: 'Exit',
  description: 'Exiting the program',
  usage: '.exit',
  perform: async (args) => {
    process.exit(0);
  },
};
