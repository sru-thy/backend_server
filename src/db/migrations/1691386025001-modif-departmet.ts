import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifDepartmet1691386025001 implements MigrationInterface {
    name = 'ModifDepartmet1691386025001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departments" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "departments" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "departments" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departments" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "departments" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "departments" DROP COLUMN "created_at"`);
    }

}
