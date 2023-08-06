import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmployeeee1691345376489 implements MigrationInterface {
    name = 'AddEmployeeee1691345376489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departments" DROP COLUMN "age"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departments" ADD "age" character varying NOT NULL`);
    }

}
