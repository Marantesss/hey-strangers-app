import * as migration_20250328_153030_init from './20250328_153030_init';

export const migrations = [
  {
    up: migration_20250328_153030_init.up,
    down: migration_20250328_153030_init.down,
    name: '20250328_153030_init'
  },
];
