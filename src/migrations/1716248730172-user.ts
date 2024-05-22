import { MigrationInterface, QueryRunner } from "typeorm";
import { faker } from '@faker-js/faker';
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

export class User1716248730172 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        if(await this.getTable(queryRunner,"Users")){;
           await this.createUserRecord(queryRunner, this.generateFakeUserData(10),"superadmin");
        }else{
            console.log("User migration :: Users table isn't exist and she'll be created");
            await this.createTable(queryRunner,"Users");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {  
        try{
            if(await this.getTable(queryRunner,"Users")){
                await this.deleteUserTable(queryRunner);
            }else{
                console.error("User migration :: Users table isn't exist. Nothing to delete");
            }
        }catch(error){
            console.error("User migration :: Error deleting Users table\nBecause: \n",error);
        }
    }
    /**
     * Create user table
     * @param queryRunner 
     * @param tableName 
     */
    public async createTable(queryRunner:QueryRunner, tableName:string) : Promise<void>{
        if (queryRunner || await this.getTable(queryRunner,tableName)) {
            await queryRunner.query(`
                CREATE TABLE IF NOT EXISTS forum."${tableName}" (
                    id VARCHAR(36) PRIMARY KEY,
                    username VARCHAR(255) NOT NULL UNIQUE,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    avatar VARCHAR(255) NULL DEFAULT NULL,
                    isBlocked TINYINT NOT NULL DEFAULT 0,
                    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    roleId VARCHAR(36) NULL DEFAULT NULL,
                    FOREIGN KEY (roleId) REFERENCES Roles (id)
                )`).then(() => {
                console.log("User migration :: User table created successfully");
            }).catch(error => {
                console.error("User migration :: Error creating Users table\nBecause: \n", error);
            });
        }
    }

    /**
     * 
     * @param queryRunner 
     * @param tableName 
     * @returns raw database result or undefined
     */
    public async getTable(queryRunner:QueryRunner, tableName:string) : Promise<any>{
        try{
            if(tableName || queryRunner){
                return await queryRunner.getTable(tableName);
            }else{
                return undefined;
            }
        }catch(error){
            console.log("User migration :: Error getting User table\nBecause: \n",error);
        }
    }

    /**
     * Set user role for fake user seeder
     * @param queryRunner 
     * @param tableName 
     * @param roleName 
     * @returns raw database result or undefined
     */
    public async getUserRole(queryRunner:QueryRunner,tableName:string, roleName:string) : Promise<any>{
        try{
            if(await this.getTable(queryRunner,tableName)){
                return queryRunner.query(`SELECT * FROM ${tableName} WHERE name = '${roleName}'`);
            }else{
                console.log("User migration ::Role isn't exist. Nothing to return");
                return undefined;
            }
        }catch(error){
            console.error("User migration :: Error getting Roles table\nBecause: \n",error);
            return undefined;
        }
    }

    /**
     * Drop user table
     * @param queryRunner 
     */
    public async deleteUserTable(queryRunner:QueryRunner):Promise<void>{
        if(queryRunner)
        {
            await queryRunner.query(`DROP TABLE IF EXISTS forum.Users`).then(()=>{
                console.log("User migration :: Users table deleted successfully");
            }).catch(error=>{
                console.error("User migration :: Error deleting Users table\nBecause: \n",error);
            })
            }else{
            console.error("User migration :: QueryRunner isn't exist. Nothing to delete");};
        }
    

    /**
     *  Send and execute query to create data into User table
     * @param queryRunner 
     * @param user 
     * @param roleName 
     * @returns raw database result or undefined
     */
    public async createUserRecord(queryRunner:QueryRunner, user:any,roleName:string):Promise<any>{
        try{
            const roleGuid= await this.getUserRole(queryRunner,"Roles",roleName);
            if(roleGuid || user){ 
               user.forEach((fakeUsers)=>{
                    queryRunner.query(`INSERT INTO Users(id,username, email, password,avatar, isBlocked, roleId) VALUES ('${fakeUsers.userId}', "${fakeUsers.username}", '${fakeUsers.email}','${fakeUsers.password}', '${fakeUsers.avatar}', 0 ,'${roleGuid[0].id}')`);  
                });
            }else{
                console.error("User migration :: Role isn't exist. Breaking insert operations");
                return undefined;
            }
        }catch(error){
            if (error instanceof ExceptionsHandler){
                console.error("User migration :: Error creating fake users records\nBecause duplicate value constraint\nBecause: \n",error);
            }
        }
    }

    /***
     * Configuration faker for fake user generations
     * @return object with fake user's object
     * */
    public createRandomUser() : any
    {
       return {
              userId: faker.string.uuid(),
              username: faker.person.lastName(),
              email: faker.internet.email(),
              avatar: faker.image.avatar(),
              password: faker.internet.password(),
       };
    }
    
    /***
     * Generate fake user data with filtering duplications records  [ A Filtering is not implemented now] 
     * @returns Array objects with fake user data generation
     */
     public generateFakeUserData(maxFakeUserRecords:number): any{
        if(maxFakeUserRecords > 0)
        {
           const fakeUser : any = faker.helpers.multiple(this.createRandomUser,{count:maxFakeUserRecords});
           return fakeUser;
        }else{
            console.error("User migration :: Count for fake data must be greater than 0");
        }
      } 
}