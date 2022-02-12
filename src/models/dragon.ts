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
  eggProcessing = false;

  @Property()
  dragonProcessing = false;

  constructor(tokenId: string, face: string) {
    this.tokenId = tokenId;
    this.face = face;
  }
}
