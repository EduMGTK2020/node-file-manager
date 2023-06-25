import commands from '../../commands/handler.js';
import message from '../../console/messages.js';

export const help = {
  name: 'Help',
  description: 'Information  table by all commands',
  usage: '.help',
  perform: async () => {
    message.showTable(commands.infoTable);
  },
};
