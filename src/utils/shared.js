import path from 'path';
import process from 'process';
import os from 'os';
import { stat } from 'fs/promises';

export async function fsGetStats(path) {
  try {
    const stats = await stat(path);
    return { err: null, info: stats };
  } catch (err) {
    return { err: err, info: null };
  }
}

export const fsGetAbsPath = (filePath) =>
  path.resolve(envParameters.userWorkDir, filePath);

export const envParameters = {
  userName: '<Anonimus>',
  userWorkDir: os.homedir(),
};

process.argv.map((arg) => {
  if (arg.startsWith('--username')) {
    envParameters.userName = arg.split('=')[1].trim();
  }
});
