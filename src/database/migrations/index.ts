import * as migration_20250402_183900_init from './20250402_183900_init'
import * as migration_20240729_100000_add_admins_sessions_table from './20240729_100000_add_admins_sessions_table'

export const migrations = [
  {
    up: migration_20250402_183900_init.up,
    down: migration_20250402_183900_init.down,
    name: '20250402_183900_init',
  },
  {
    up: migration_20240729_100000_add_admins_sessions_table.up,
    down: migration_20240729_100000_add_admins_sessions_table.down,
    name: '20240729_100000_add_admins_sessions_table',
  },
]
