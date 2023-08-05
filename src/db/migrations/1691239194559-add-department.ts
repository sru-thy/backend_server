import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDepartment1691239194559 implements MigrationInterface {
    name = 'AddDepartment1691239194559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "age" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "role" character varying NOT NULL DEFAULT 'DEVELOPER'`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "department_id" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY ("department_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_678a3540f843823784b0fe4a4f2"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "department_id"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "role" character varying NOT NULL DEFAULT 'DEVELOPER'`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "age" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "email" character varying NOT NULL`);
    }

}
