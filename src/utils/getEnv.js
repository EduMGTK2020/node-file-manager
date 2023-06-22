import process from 'process';
import os from 'os';

const envParameter = {
  userName: '<Anonimus>',
  userWorkDir: os.homedir(),
};

process.argv.map((arg) => {
  if (arg.startsWith('--username')) {
    envParameter.userName = arg.split('=')[1].trim();
  }
});

export default envParameter;
