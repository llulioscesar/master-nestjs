import { MigrationInterface } from 'typeorm';

export class CreatePublicationsTable1678206837731
  implements MigrationInterface
{
  public async up(queryRunner: any): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "publications" (
                "id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "content" character varying NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT now(),
                "updated_at" timestamp NOT NULL DEFAULT now()
            );
        `);
  }

  public async down(queryRunner: any): Promise<void> {
    await queryRunner.query(`DROP TABLE "publications";`);
  }
}
