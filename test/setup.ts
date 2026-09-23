import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

global.beforeEach(async () => {
  await rm(resolve(process.cwd(), 'test.sqlite'), { force: true });
});
