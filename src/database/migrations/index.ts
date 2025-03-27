import * as migration_20250327_143908_init from './20250327_143908_init';

export const migrations = [
  {
    up: migration_20250327_143908_init.up,
    down: migration_20250327_143908_init.down,
    name: '20250327_143908_init'
  },
];
