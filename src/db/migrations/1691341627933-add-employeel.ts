import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmployeel1691341627933 implements MigrationInterface {
    name = 'AddEmployeel1691341627933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departments" ADD "age" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departments" DROP COLUMN "age"`);
    }

}
