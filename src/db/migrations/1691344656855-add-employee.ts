import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmployee1691344656855 implements MigrationInterface {
    name = 'AddEmployee1691344656855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_7e77f562043393b08de949b804b"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "REL_7e77f562043393b08de949b804"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "UQ_f78c7626af1498a0d6e505ea92b" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_f78c7626af1498a0d6e505ea92b" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_f78c7626af1498a0d6e505ea92b"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "UQ_f78c7626af1498a0d6e505ea92b"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "employee_id" uuid`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "REL_7e77f562043393b08de949b804" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_7e77f562043393b08de949b804b" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
