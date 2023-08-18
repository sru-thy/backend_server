import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifDepartmet1691385767932 implements MigrationInterface {
    name = 'ModifDepartmet1691385767932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departments" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "departments" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "departments" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_f78c7626af1498a0d6e505ea92b"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "UQ_f78c7626af1498a0d6e505ea92b"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "address_id" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "UQ_f78c7626af1498a0d6e505ea92b" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_f78c7626af1498a0d6e505ea92b" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_f78c7626af1498a0d6e505ea92b"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "UQ_f78c7626af1498a0d6e505ea92b"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "UQ_f78c7626af1498a0d6e505ea92b" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_f78c7626af1498a0d6e505ea92b" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "departments" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "departments" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "departments" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
