import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyAddressEmployee1691269788268 implements MigrationInterface {
    name = 'ModifyAddressEmployee1691269788268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "joining_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "experience" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "role" SET DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "role" SET DEFAULT 'DEVELOPER'`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "joining_date"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "age" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "email" character varying NOT NULL`);
    }

}
