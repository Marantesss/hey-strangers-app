import * as migration_20250328_153030_init from './20250328_153030_init'
import * as migration_20250331_113318_home_pages_seo from './20250331_113318_home_pages_seo'

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
]
