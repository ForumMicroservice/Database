import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { roleTable } from "./migrationEntity/role";
import { v4 as uuidv4 } from 'uuid';

export class Roles1716161082809 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        if(await this.getTable(queryRunner,"Roles"))
        { 
           await this.createRecords(queryRunner,"Roles") ? console.log("Method up ::Create Record is successfull ") : console.error("Method up :: Error migration for Role tables::Empty params");
       }else{
           await this.createTable(queryRunner,"Roles") ? console.log("Method up: Role table create is successfull ") : console.error("Method down:Error revert migration for Role tables");
           await this.createRecords(queryRunner,"Roles") ? console.log("Method up ::Record create is successfull ") : console.error("Method up :: Error migration for Role tables::Empty params");
       }
   }  

    public async down(queryRunner: QueryRunner): Promise<any> 
    { 
        try{
            if(await this.getTable(queryRunner,"Roles"))
            {
                await this.deleteRoleRecords(queryRunner,"Roles") ? console.log("Method down ::Delete Record is successfull ") : console.error("Method down :: Error migration for Role tables::Empty params");
            }else{
                console.error("Migration :: Method Down :: I can't drop records because Roles table doesn't exist");
                return undefined;
            }
        }catch(err){
            console.error("Migration:: Method Down :: Error database because: \n",err);
        }
    }

    public async createTable(queryRunner:QueryRunner, tableName:string) : Promise<any>{
        try{
            if(queryRunner || await this.getTable(queryRunner,"Roles"))
            {
             // return await queryRunner.query('CREATE TABLE Roles (id varchar(255) NOT NULL, name varchar(255) NOT NULL, PRIMARY KEY (id))');
                return await queryRunner.createTable(new Table(roleTable)); 
            }else{
                return undefined;
            } 
        }catch(error){
            console.error("Migration:: Method Create table :: Error database because: \n",error);
        }
    }

    public async getTable(queryRunner:QueryRunner,tableName:string):Promise<any>{
        try{
            if(await queryRunner.getTable(tableName)){
                return await queryRunner.getTable(tableName);
             }else{
                return undefined;
             }
        }catch(error){
            console.error("Migration:: Method Get table :: Error database because: \n",error);
        }
         
    }

    public async deleteRoleTable(queryRunner:QueryRunner, tableName:string) : Promise<any>{
        try{
            if(await this.getTable(queryRunner,tableName)){
                const table = await this.getTable(queryRunner,"Roles");
                return await queryRunner.dropTable(table);
            }else{
                return undefined;
            }
        }catch(err){
            console.error("Migration:: Method Delete table :: Error database because: \n",err);
        }
    }

    public async deleteRoleRecords(queryRunner:QueryRunner,tableName:string)
    {
        try{
            if(queryRunner || await this.getTable(queryRunner,tableName))
            {
                return await queryRunner.query(`DELETE FROM "${tableName}"`);
            }else{
                return undefined;
            }
        }catch(error){
            console.error("Migration:: Method Delete table :: Error database because: \n",error);
        }        
    }

    public async createRecords(queryRunner:QueryRunner, roleName:string) : Promise<any>{
        try {
            if (queryRunner || roleName) {
              return await queryRunner.query(`
                INSERT INTO Roles (id, name) VALUES
                  ('${uuidv4()}', 'superadmin'),
                  ('${uuidv4()}', 'admin'),
                  ('${uuidv4()}', 'users')`);
            } else {
              return undefined;
            }
          } catch (error) {
            console.error("Migration:: Method Create table :: Error database because: \n", error);
          }
        }
}
