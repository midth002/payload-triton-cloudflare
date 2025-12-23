import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20251217_143649 from './20251217_143649';
import * as migration_20251223_133007 from './20251223_133007';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20251217_143649.up,
    down: migration_20251217_143649.down,
    name: '20251217_143649',
  },
  {
    up: migration_20251223_133007.up,
    down: migration_20251223_133007.down,
    name: '20251223_133007'
  },
];
