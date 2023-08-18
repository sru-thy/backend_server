import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifDepa1691309069650 implements MigrationInterface {
    name = 'ModifDepa1691309069650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_678a3540f843823784b0fe4a4f2"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "departmentId" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_4edfe103ebf2fcb98dbb582554b" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_4edfe103ebf2fcb98dbb582554b"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "departmentId"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
