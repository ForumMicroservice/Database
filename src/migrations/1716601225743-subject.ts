import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { MigrationOperations } from "./abstractMigration/abstractMigration";
import { Subject } from "./migrationEntity/subject";

export class Subject1716601225743 extends MigrationOperations implements MigrationInterface {
    constructor(queryRunner:QueryRunner){
        super(queryRunner);
    }
    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        try{
            if(await this.getDatabase(queryRunner,"forum"))
            {
               await this.getTable(queryRunner,"Subjects") == false ? await this.createTable(queryRunner,"Subjects",new Table(Subject)) : console.log("Table Subjects exist. Nothing to create"); 
            }else{
               console.error("Subject Migration::Method up:::Database isn't exist") 
            }    
        }catch(error){ 
            console.error("Subject Migration::Method up:::Database error::",`${error}`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {
        try{
            if(await this.getDatabase(queryRunner,"forum"))
            {
                await this.getTable(queryRunner,"Subjects") == true ? await this.deleteTable(queryRunner,"Subjects") : console.log("Table Subjects was deleted successfull."); 
            }else{
                console.error("Subject Migration::Method down:::Database isn't exist") 
            }    
        }catch(error)
        {
            console.error("Subject Migration::Method down::: Error database, because of: \n ", error)
        }
    }
}

