import os from 'os';
import message from '../../console/messages.js';

export const Os = {
  name: 'Os',
  description: 'Operating system info',
  usage: 'os [--EOL|--cpus|--homedir|--username|--architecture]',
  perform: async (args) => {
    const param = args[0];
    let output = '';

    switch (param) {
      case '--EOL':
        output = `System end-of-line: ${JSON.stringify(os.EOL)}`;
        break;

      case '--cpus':
        const cpus = os.cpus();
        output = `CPUs amount: ${cpus.length}`;
        cpus.forEach((cpu, index) => {
          output += `\nCPU ${index + 1}: Model - ${cpu.model}, Clock Rate - ${
            cpu.speed / 1000
          } GHz`;
        });
        break;

      case '--homedir':
        output = `Home directory: ${os.homedir()}`;
        break;

      case '--username':
        output = `System user name: ${os.userInfo().username}`;
        break;

      case '--architecture':
        output = `CPU architecture: ${os.arch}`;
        break;

      default:
        throw new Error('Operation failed: unknown parameter - ' + param);
    }
    message.showSystemInfo(output);
  },
};
