import { Migration } from '@mikro-orm/migrations';

export class Migration20220209124253 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `dragon` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `token_id` bigserial not null, `face` text not null, `dragon_url` text null, `egg_url` text null, `egg_processing` integer not null, `dragon_processing` integer not null);');
    this.addSql('create unique index `dragon_token_id_unique` on `dragon` (`token_id`);');
  }

}
