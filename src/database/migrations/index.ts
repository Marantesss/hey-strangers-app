import * as migration_20250318_103221 from './20250318_103221';

export const migrations = [
  {
    up: migration_20250318_103221.up,
    down: migration_20250318_103221.down,
    name: '20250318_103221'
  },
];
