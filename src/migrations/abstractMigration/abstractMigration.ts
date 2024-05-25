import { QueryRunner,Table } from "typeorm";

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
            const table : any = await queryRunner.getTable(tableName);
            return table instanceof Table ? true : false;  
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
           return await queryRunner.hasDatabase(databaseName) ? true : false;
        }catch(error){
            console.error("Migration::Method getDatabase:::Error database because: \n",error);
        }  
    }

    /**
     * Get user role 
     * @param queryRunner 
     * @param tableName 
     * @param roleName 
     * @returns raw database result or undefined
     */
    public async getRole(queryRunner:QueryRunner,tableName:string, roleName:string) : Promise<any>{
        try{
            const role =  await this.getTable(queryRunner,tableName) == true ? await queryRunner.query(`SELECT id FROM ${tableName} WHERE names = '${roleName}'`) : false;
            return role;
        }catch(error){
            console.error("User migration :: Error getting Roles table\nBecause: \n",error);
        }
    }

    /**
     * Create Database
     * @param queryRunner 
     * @param databaseName 
     */
    public async createDatabase(queryRunner:QueryRunner,databaseName:string) : Promise<any>{
        try{
            const isDatabase = await this.getDatabase(queryRunner,databaseName) ? true : false;
                  isDatabase == false ? await queryRunner.createDatabase(databaseName,true) : console.log("Migration:::createDatabase Method ::: Don't worry, database existing ...");  
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
    public async createTable(queryRunner:QueryRunner, tableName:string="",table:Table) : Promise<any>{
       try{
          const isTable = await this.getTable(queryRunner,tableName) == false ? await queryRunner.createTable(new Table(table)) : false;
          return isTable;
       }catch(error){
           console.error("Migration::createTable method:::Database error , because" ,`${error}`);
       } 
    }

    /**
     * Create Records 
     * @param queryRunner 
     * @param tableName 
     * @param table 
     */
    public async createRecords(queryRunner:QueryRunner,tableName:string,roleName:string="",users:any="") : Promise<any>{
       // Your override implements into extends class; 
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
            const  isTable = await this.getTable(queryRunner,tableName) == true ? await queryRunner.dropTable(tableName) : false;
            return isTable;
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
           const isTable = await this.getTable(queryRunner,tableName) == true ? await queryRunner.query(`DELETE FROM "${tableName}"`) : false;
           return isTable;
        }catch(error){
            console.error("Migration::Method deleteTable:::Error database because: \n",error);
        }        
    }
}



