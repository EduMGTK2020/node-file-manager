import process from 'process';

const envParameter = {
  userName: '<Anonimus>',
};

process.argv.map((arg) => {
  if (arg.startsWith('--username')) {
    envParameter.userName = arg.split('=')[1].trim();
  }
});

export default envParameter;
