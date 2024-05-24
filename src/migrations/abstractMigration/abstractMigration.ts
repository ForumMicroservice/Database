import { QueryRunner,Table } from "typeorm";
import { roleTable } from "../migrationEntity/role";
import { userTable } from "../migrationEntity/user";
import { v4 as uuidv4 } from 'uuid';

export abstract class MigrationOperations {
    private queryRunner:QueryRunner;
    constructor(queryRunner: QueryRunner) {
        this.queryRunner = queryRunner;
    }

    /**
     * Check exist table 
     * @param queryRunner 
     * @param tableName 
     * @returns true or false
     */
    public async getTable(queryRunner:QueryRunner,tableName:string):Promise<boolean>{
        try{
            if(queryRunner || tableName)
             {
                 const table : any = await queryRunner.getTable(tableName);
                return table instanceof Table ? true : false; 
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
            }
        }catch(error){
            console.error("Migration::Method getDatabase:::Error database because: \n",error);
        }  
    }

    /**
     * Create Database
     * @param queryRunner 
     * @param databaseName 
     */
    public async createDatabase(queryRunner:QueryRunner,databaseName:string) : Promise<any>{
        try{
            if(queryRunner || databaseName)
            {
              const isDatabase = await this.getDatabase(queryRunner,databaseName) ? true : false;
                    isDatabase == false ? await queryRunner.createDatabase(databaseName,true) : console.log("Migration:::createDatabase Method ::: Don't worry, database existing ...");  
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
    public async createTable(queryRunner:QueryRunner, tableName,table:Table) : Promise<any>{
       try{
        if(queryRunner || tableName || table)
        {
            const isTable = await this.getTable(queryRunner,tableName) == false ? await queryRunner.createTable(new Table(table)) : false;
            return isTable;
         }
       }catch(error){
           console.error("Migration::createTable method:::Database error , because" ,`${error}`);
       } 
    }

    /**
     * Drop table from database
     * @param queryRunner 
     * @param tableName 
     * @returns 
     */
    public async deleteTable(queryRunner:QueryRunner, tableName:string) : Promise<any>
    {
        try{
            if(queryRunner || tableName){
                const isTable = await this.getTable(queryRunner,tableName) == true ? await queryRunner.dropTable(tableName) : false;
                return isTable;
            }
        }catch(err){
            console.error("Migration::Method deleteTable:::Error database because: \n",err);
        }
    }

    /**
     * Delete Records from Database
     * @param queryRunner 
     * @param tableName 
     * @returns 
     */
    public async deleteRecords(queryRunner:QueryRunner,tableName:string) : Promise<any>
    {
        try{
            if(queryRunner || tableName)
            {
               const isTable = await this.getTable(queryRunner,tableName) == true ? await queryRunner.query(`DELETE FROM "${tableName}"`) : false;
               return isTable;
            }
        }catch(error){
            console.error("Migration::Method deleteTable:::Error database because: \n",error);
        }        
    }

    /**
     * Create Records into database
     * @param queryRunner 
     * @param tableName 
     * @returns 
     */
    public async createRecords(queryRunner:QueryRunner, tableName:string,columns:string[], values:string[]) : Promise<any>
    {
        try {
            if (queryRunner || tableName) {
                const column = columns.join(', ');
                const value  = values.map(items => `'${items}'`).join(', ')     
                const isTable = await this.getTable(queryRunner,tableName) == true ? await queryRunner.query(`INSERT INTO '${tableName}'  '${column}' VALUES ('${uuidv4()}', '${value}'`) : false
              return isTable;                                                                          
            }
        } catch (error) {
             console.error("Migration::Method createRecords:::Error database because: \n", error);
        }
    }
}



