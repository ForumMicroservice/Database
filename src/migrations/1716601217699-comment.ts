import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { MigrationOperations } from "./abstractMigration/abstractMigration";
import { Comments } from "./migrationEntity/comment";

export class Comment1716601217699 extends MigrationOperations implements MigrationInterface {
    constructor(queryRunner:QueryRunner){
        super(queryRunner);
    }
    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        try{
            if(await this.getDatabase(queryRunner,"forum"))
            {
               await this.getTable(queryRunner,"Comments") == false ? await this.createTable(queryRunner,"Comments",new Table(Comments)) : console.log("Table Comments exist. Nothing to create"); 
            }else{
               console.error("Comments Migration::Method up:::Database isn't exist") 
            }    
        }catch(error){ 
            console.error("Comments Migration::Method up:::Database error, because of: \n",`${error}`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {
        try{
            if(await this.getDatabase(queryRunner,"forum"))
            {
                await this.getTable(queryRunner,"Comments") == true ? await this.deleteTable(queryRunner,"Comments") : console.log("Table Comments was deleted successfull."); 
            }else{
                console.error("Comments Migration::Method up:::Database isn't exist") 
            }    
        }catch(error)
        {
            console.error("Comments Migration::Method down::: Error database, because of: \n ", error)
        }
    }
}
