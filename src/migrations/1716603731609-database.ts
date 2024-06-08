import { MigrationInterface, QueryRunner } from "typeorm";
import { MigrationOperations } from "./abstractMigration/abstractMigration";

export class Database1716603731609 extends MigrationOperations implements MigrationInterface {
    constructor(queryRunner:QueryRunner){
        super(queryRunner);
    }
    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        try{
           await this.getDatabase(queryRunner,"forum") == false ?  await this.createDatabase(queryRunner,"forum") : console.log("Database Migration:: Current database existing , nothing to create");
        }catch(error){
            console.error("Database migration:: Database error,because of:\n", error)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {
        try{
            await this.getDatabase(queryRunner,"forum") == true ? await queryRunner.dropDatabase("forum") : console.log("Database migration:: Database isn't exist, nothing deleting");
         }catch(error){
             console.error("Database migration:: Database error,because of:\n", error)
         }
    }
}
