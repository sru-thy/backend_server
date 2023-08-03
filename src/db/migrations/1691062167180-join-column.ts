import { MigrationInterface, QueryRunner } from "typeorm";

export class JoinColumn1691062167180 implements MigrationInterface {
    name = 'JoinColumn1691062167180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_f78c7626af1498a0d6e505ea92b"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "REL_f78c7626af1498a0d6e505ea92"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "employee_id" integer`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "UQ_7e77f562043393b08de949b804b" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_7e77f562043393b08de949b804b" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_7e77f562043393b08de949b804b"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "UQ_7e77f562043393b08de949b804b"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "address_id" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "REL_f78c7626af1498a0d6e505ea92" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_f78c7626af1498a0d6e505ea92b" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
