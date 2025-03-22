import * as migration_20250319_132743_init from './20250319_132743_init';
import * as migration_20250320_185007_user_stripe_customer_id from './20250320_185007_user_stripe_customer_id';
import * as migration_20250322_151105_game_stripe_product_id_regsitration_payment_id from './20250322_151105_game_stripe_product_id_regsitration_payment_id';

export const migrations = [
  {
    up: migration_20250319_132743_init.up,
    down: migration_20250319_132743_init.down,
    name: '20250319_132743_init',
  },
  {
    up: migration_20250320_185007_user_stripe_customer_id.up,
    down: migration_20250320_185007_user_stripe_customer_id.down,
    name: '20250320_185007_user_stripe_customer_id',
  },
  {
    up: migration_20250322_151105_game_stripe_product_id_regsitration_payment_id.up,
    down: migration_20250322_151105_game_stripe_product_id_regsitration_payment_id.down,
    name: '20250322_151105_game_stripe_product_id_regsitration_payment_id'
  },
];
