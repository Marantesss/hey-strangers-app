import * as migration_20250319_111851 from './20250319_111851';

export const migrations = [
  {
    up: migration_20250319_111851.up,
    down: migration_20250319_111851.down,
    name: '20250319_111851'
  },
];
