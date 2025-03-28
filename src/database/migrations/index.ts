import * as migration_20250328_095624_init from './20250328_095624_init';

export const migrations = [
  {
    up: migration_20250328_095624_init.up,
    down: migration_20250328_095624_init.down,
    name: '20250328_095624_init'
  },
];
