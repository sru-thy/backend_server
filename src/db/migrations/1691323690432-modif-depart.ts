import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifDepart1691323690432 implements MigrationInterface {
    name = 'ModifDepart1691323690432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_3b80acaf3052672f7196c04de9e"`);
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "department_id_id" TO "department_id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_678a3540f843823784b0fe4a4f2"`);
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "department_id" TO "department_id_id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_3b80acaf3052672f7196c04de9e" FOREIGN KEY ("department_id_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
