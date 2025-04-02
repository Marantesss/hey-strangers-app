import * as migration_20250328_153030_init from './20250328_153030_init'
import * as migration_20250331_113318_home_pages_seo from './20250331_113318_home_pages_seo'
import * as migration_20250402_095838_invite_and_cities from './20250402_095838_invite_and_cities'
import * as migration_20250402_141544_guest_registration from './20250402_141544_guest_registration'

export const migrations = [
  {
    up: migration_20250328_153030_init.up,
    down: migration_20250328_153030_init.down,
    name: '20250328_153030_init',
  },
  {
    up: migration_20250331_113318_home_pages_seo.up,
    down: migration_20250331_113318_home_pages_seo.down,
    name: '20250331_113318_home_pages_seo',
  },
  {
    up: migration_20250402_095838_invite_and_cities.up,
    down: migration_20250402_095838_invite_and_cities.down,
    name: '20250402_095838_invite_and_cities',
  },
  {
    up: migration_20250402_141544_guest_registration.up,
    down: migration_20250402_141544_guest_registration.down,
    name: '20250402_141544_guest_registration',
  },
]
