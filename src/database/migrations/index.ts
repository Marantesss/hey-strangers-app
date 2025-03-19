import * as migration_20250319_122511_init from './20250319_122511_init';

export const migrations = [
  {
    up: migration_20250319_122511_init.up,
    down: migration_20250319_122511_init.down,
    name: '20250319_122511_init'
  },
];
