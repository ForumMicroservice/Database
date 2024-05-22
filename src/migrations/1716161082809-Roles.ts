import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

export class Roles1716161082809 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        if(await this.getRoleTable(queryRunner,"Roles"))
        { 
           await this.createRecords(queryRunner);
       }else{
           await this.createTable(queryRunner)
           await this.createRecords(queryRunner);
       }
   }  

    public async down(queryRunner: QueryRunner): Promise<void> 
    { 
        if(await this.getRoleTable(queryRunner,"Roles"))
        {
            await queryRunner.query('DELETE FROM Roles').then(()=>{
                console.log("Method down:Revert migration for Roles table is successfull ");
            }).catch(error=>{
                console.error("Method down:Error revert migration for Role tables\nBecause:",error);            
            })
        }else{
            console.error("I can't drop records because Roles table doesn't exist");
        }
    }

    public async getRoleTable(queryRunner:QueryRunner, tableName:string) : Promise<any>{
        if(tableName || queryRunner){
            return queryRunner.getTable(tableName);
        }else{
            return undefined;
        }
    }

    public async createTable(queryRunner:QueryRunner) : Promise<void>{
        if(queryRunner)
        {
            await queryRunner.query('CREATE TABLE Roles (id varchar(255) NOT NULL, name varchar(255) NOT NULL, PRIMARY KEY (id))').then(()=>{
                console.log("Current table isn't exist and Roles table created is successfull")
            }).catch(error=>{
                console.error("Error creating Roles table\nBecause: ",error);
            })
        }
    }

    public async createRecords(queryRunner:QueryRunner) : Promise<void>{
        if(queryRunner)
        {
            await queryRunner.query(`INSERT INTO Roles (id, name) VALUES ('${uuidv4()}', 'superadmin'), ('${uuidv4()}', 'admin') , ('${uuidv4()}', 'users')`).then(()=>{
                console.log("Method Up: User roles created is successfull");
            }).catch(err=>{
                console.error("Method Up: Error creating user roles\nBecause:",err);
            })
        }
    }
}
