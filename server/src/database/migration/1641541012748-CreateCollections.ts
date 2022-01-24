import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCollections1641541012748 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //await queryRunner.query('CREATE TABLE collections (id int AUTO_INCREMENT)');
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
