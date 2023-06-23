import { stat } from 'fs/promises';

export default async function getStats(path) {
  try {
    const stats = await stat(path);
    return { err: null, info: stats };
  } catch (err) {
    return { err: err, info: null };
  }
}
