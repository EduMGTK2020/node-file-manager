import process from 'process';
import os from 'os';

const Parameters = {
  userName: '<Anonimus>',
  userWorkDir: os.homedir(),
};

const setUserWorkDir = (pathDir) => {
  Parameters.userWorkDir = pathDir;
};
const getUserWorkDir = () => {
  return Parameters.userWorkDir;
};

process.argv.map((arg) => {
  if (arg.startsWith('--username')) {
    Parameters.userName = arg.split('=')[1].trim();
  }
});

export default { Parameters, setUserWorkDir, getUserWorkDir};
