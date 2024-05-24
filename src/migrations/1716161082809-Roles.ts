import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { MigrationOperations } from "./abstractMigration/abstractMigration";
import { v4 as uuidv4 } from 'uuid';
import { roleTable } from "./migrationEntity/role";

export class Roles1716161082809 extends MigrationOperations implements MigrationInterface{
    constructor(queryRunner:QueryRunner){
        super(queryRunner);
    }
    
    public async up(queryRunner: QueryRunner): Promise<void> 
    {  
        try{
            if(await this.getDatabase(queryRunner,"forum"))
            {
               await this.getTable(queryRunner,"Roles") == false ? await this.createTable(queryRunner,"Roles",roleTable) : await this.createRecords(queryRunner,"Roles",['id','name'], ['superuser', 'admin', 'user']); 
            }else{
               console.error("Migration::Method up:::Database isn't exist") 
            }    
        }catch(error){
            console.error("Migration::Method up:::Database error::",`${error}`);
        }
   }  

    public async down(queryRunner: QueryRunner): Promise<any> 
    { 
        try{
            if(await this.getDatabase(queryRunner,"forum"))
            {
               await this.getTable(queryRunner,"Roles") == true ? await this.deleteTable(queryRunner,"Roles") : console.error("Table isn't exist, nothing to delete ");
            } 
        }catch(err){
            console.error("Migration:: Method Down :: Error database because of: \n",err);
        }
    }
}
