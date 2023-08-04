import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRole1691138011860 implements MigrationInterface {
    name = 'AddRole1691138011860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "role" character varying NOT NULL DEFAULT 'DEVELOPER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role"`);
    }

}
