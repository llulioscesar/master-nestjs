import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfileTable1678112501239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "profiles" (
        "id" uuid NOT NULL PRIMARY KEY,
        "user_id" uuid NOT NULL,
        "first_name" character varying NOT NULL,
        "last_name" character varying NOT NULL,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "profiles";`);
  }
}
