import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommentTable1615239822663 implements MigrationInterface {
  name = 'CreateCommentTable1615239822663';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comments" (
            "id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
            "content" text NOT NULL,
            "user_id" uuid NOT NULL,
            "publication_id" uuid NOT NULL, 
            "parent_id" uuid, 
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        )`,
    );

    await queryRunner.query(
      `ALTER TABLE "comments" 
                ADD CONSTRAINT "FK_d0f834af21db6e9e00505a7d937" 
                    FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "comments" 
                ADD CONSTRAINT "FK_6d2165ebd4405ce5aa5cb9319cf" 
                    FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_6d2165ebd4405ce5aa5cb9319cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_d0f834af21db6e9e00505a7d937"`,
    );
    await queryRunner.query(`DROP TABLE "comments"`);
  }
}
