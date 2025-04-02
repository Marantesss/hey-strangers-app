import * as migration_20250402_183900_init from './20250402_183900_init';

export const migrations = [
  {
    up: migration_20250402_183900_init.up,
    down: migration_20250402_183900_init.down,
    name: '20250402_183900_init'
  },
];
