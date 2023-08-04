import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPassword1691125745151 implements MigrationInterface {
    name = 'AddPassword1691125745151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "password"`);
    }

}
