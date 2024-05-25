import { MigrationInterface, QueryRunner,Table } from "typeorm";
import { MigrationOperations } from "./abstractMigration/abstractMigration";
import { Topics } from "./migrationEntity/topic";

export class Topics1716601232990 extends MigrationOperations implements MigrationInterface {
    constructor(queryRunner:QueryRunner){
        super(queryRunner);
    }
    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        try{
            if(await this.getDatabase(queryRunner,"forum"))
            {
               await this.getTable(queryRunner,"Topics") == false ? await this.createTable(queryRunner,"Topics",new Table(Topics)) : console.log("Table Topics exist. Nothing to create"); 
            }else{
               console.error("Topics Migration::Method up:::Database isn't exist") 
            }    
        }catch(error){ 
            console.error("Topics Migration::Method up:::Database error::",`${error}`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {
        try{
            if(await this.getDatabase(queryRunner,"forum"))
            {
                await this.getTable(queryRunner,"Topics") == true ? await this.deleteTable(queryRunner,"Topics") : console.log("Table Topics was deleted successfull."); 
            }else{
                console.error("Topics Migration::Method down:::Database isn't exist") 
            }    
        }catch(error)
        {
            console.error("Topics Migration::Method down::: Error database, because of: \n ", error)
        }
    }
}
