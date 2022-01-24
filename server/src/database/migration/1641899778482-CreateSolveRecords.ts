import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSolveRecords1641899778482 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE solveRecrods (id int AUTO_INCREMENT)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
