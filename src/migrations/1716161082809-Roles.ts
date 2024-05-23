import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { roleTable } from "./migrationEntity/role";
import { v4 as uuidv4 } from 'uuid';

export class Roles1716161082809 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        try{
            if(await this.getDatabase(queryRunner,"forum"))
            {
               await this.getTable(queryRunner,"Roles") == false ? await this.createTable(queryRunner,"Roles") : await this.createRecords(queryRunner,"Roles") 
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
            console.error("Migration:: Method Down :: Error database because: \n",err);
        }
    }

     /**
     * Check exist table 
     * @param queryRunner 
     * @param tableName 
     * @returns true or false
     */
     public async getTable(queryRunner:QueryRunner,tableName:string):Promise<boolean>{
        try{
            if(queryRunner || tableName){
                  const table : any = await queryRunner.getTable(tableName);
                return table instanceof Table ? true : false; 
             }else{
                console.error("Migration Role :: CreateTable method:: Missing agruments");
             }
        }catch(error){
            console.error("Migration:: Method getTable :: Error database because: \n",error);
        }
         
    }

    /**
     * Check existing database 
     * @param queryRunner 
     * @param databaseName 
     */
    public async getDatabase(queryRunner:QueryRunner, databaseName:string) : Promise<boolean>
    { 
        try{
            if(queryRunner || databaseName)
            {
                return await queryRunner.hasDatabase(databaseName) ? true : false;
            }else{
                console.error("Migration::Method getDatabase:::Empty params"); 
            }
        }catch(error){
            console.error("Migration::Method getDatabase:::Error database because: \n",error);
        }  
    }

    public async createDatabase(queryRunner:QueryRunner,databaseName:string) : Promise<any>{
        try{
            if(queryRunner || databaseName)
            {
              const isDatabase = await this.getDatabase(queryRunner,databaseName) ? true : false;
                    isDatabase == false ? await queryRunner.createDatabase(databaseName,true) : console.log("Migration:::createDatabase Method ::: Don't worry, database existing ...");  
            }else{
                console.error("Migration::createDatabase Method:::Empty arguments");
            }
        }catch(error){
            console.error("Migration::: createDatabase Method:::Error database because, because of ",`${error}`)
        }
    }
    /**
     * Create role table 
     * @param queryRunner 
     * @param tableName 
     * @returns true or false
     */
    public async createTable(queryRunner:QueryRunner, tableName:string) : Promise<any>{
       try{
        if(queryRunner || tableName)
        {
            const isTable = await this.getTable(queryRunner,tableName) == false ? await queryRunner.createTable(new Table(roleTable)) : false;
            return isTable;
         }else{
            console.error("Migration::createTable method:::Empty params");
         }
       }catch(error){
           console.error("Migration::createTable method:::Database error , because" ,`${error}`);
       } 
    }

    public async deleteTable(queryRunner:QueryRunner, tableName:string) : Promise<any>{
        try{
            if(queryRunner || tableName){
                const isTable = await this.getTable(queryRunner,"Roles") == true ? await queryRunner.dropTable(tableName) : false;
                return isTable;
            }else{
                console.error("Migration::Method deleteTable:::Empty params");
            }
        }catch(err){
            console.error("Migration::Method deleteTable:::Error database because: \n",err);
        }
    }

    public async deleteRecords(queryRunner:QueryRunner,tableName:string) : Promise<any>
    {
        try{
            if(queryRunner || tableName)
            {
               const isTable = await this.getTable(queryRunner,tableName) == true ? await queryRunner.query(`DELETE FROM "${tableName}"`) : false;
               return isTable;
            }else{
                console.error("Migration::Method deleteRecords:::Empty params");
            }
        }catch(error){
            console.error("Migration::Method deleteTable:::Error database because: \n",error);
        }        
    }

    public async createRecords(queryRunner:QueryRunner, roleName:string) : Promise<any>{
        try {
            if (queryRunner || roleName) {
             const isTable = await this.getTable(queryRunner,roleName) == true ? await queryRunner.query(`INSERT INTO Roles (id, name) VALUES ('${uuidv4()}', 'superadmin'),
                                                                                                                            ('${uuidv4()}', 'admin'), ('${uuidv4()}', 'users')`) : false
              return isTable;                                                                          
            } else {
               console.error("Migration::Method createRecords:::Empty params");
            }
          } catch (error) {
             console.error("Migration::Method createRecords:::Error database because: \n", error);
          }
        }
}
