import * as migration_20250319_132743_init from './20250319_132743_init';

export const migrations = [
  {
    up: migration_20250319_132743_init.up,
    down: migration_20250319_132743_init.down,
    name: '20250319_132743_init'
  },
];
