import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1678112501239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL PRIMARY KEY,
        "username" character varying NOT NULL UNIQUE,
        "email" character varying NOT NULL UNIQUE,
        "password" character varying NOT NULL,
        "role" character varying NOT NULL DEFAULT 'user',
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users";`);
  }
}
