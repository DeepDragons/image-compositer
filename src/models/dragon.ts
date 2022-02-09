import {
  Entity,
  PrimaryKey,
  Property,
  Unique
} from '@mikro-orm/core';

@Entity()
export class Dragon {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ columnType: 'bigserial', type: 'number' })
  @Unique()
  tokenId!: string;

  @Property()
  face!: string;

  @Property({ nullable: true })
  dragonUrl?: string;

  @Property({ nullable: true })
  eggUrl?: string;

  @Property()
  eggProcessing: boolean = false;

  @Property()
  dragonProcessing: boolean = false;
}
