import { MigrationInterface, QueryFailedError, QueryRunner, Unique } from "typeorm";
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { error, table } from "console";
import e from "express";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { kMaxLength } from "buffer";
import { takeLast } from "rxjs";

enum RelationTablesAndForeignKey {
    Users  =  "roleId", 
    Topics =  "userId", 
    Comments= "userId" 
}

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
        if (queryRunner && tableName) {
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
                console.log("User migration :: Current table doesn't exist and User table created successfully");
            }).catch(error => {
                console.error("User migration :: Error creating Users table\nBecause: \n", error);
            });
        }
    }

    public async getTable(queryRunner:QueryRunner, tableName:string) : Promise<any>{
        try{
            if(tableName || queryRunner){
                return queryRunner.getTable(tableName);
            }else{
                return undefined;
            }
        }catch(error){
            console.log("User migration :: Error getting User table\nBecause: \n",error);
        }
    }

    /**
     * Set user role for fake user 
     * @param queryRunner 
     * @param tableName 
     * @param roleName 
     * @returns raw database result or undefined
     */
    public async getUserRole(queryRunner:QueryRunner,tableName:string, roleName:string) : Promise<any>{
        try{
           // const role = await this.getUserRole(queryRunner,tableName,roleName);
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
     * Looking relations remove it and drop user table
     * @param queryRunner 
     */
    public async deleteUserTable(queryRunner:QueryRunner):Promise<void>{
         Object.entries(RelationTablesAndForeignKey).forEach(([tableNames, foreignKey]) => {
            this.DetachedAnyRelationsToUser(queryRunner,tableNames,foreignKey)
         })
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

    /**
     * Detached any relations for user table
     * @param queryRunner 
     * @param tableName 
     * @param foreignKeyName 
     */
    public async DetachedAnyRelationsToUser(queryRunner:QueryRunner, tableName:string , foreignKeyName:string):Promise<void>{
        const table = await this.getTable(queryRunner,"Users");
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf(foreignKeyName)); 
        console.log("[Foreign Keys] :"  + foreignKey);
        
        /*
        if(queryRunner && tableName && foreignKeyName)
        {
            
            /*
            queryRunner.query(`ALTER TABLE \`${tableName}\` DROP FOREIGN KEY \`${foreignKeyName}\``)
            .then(() => {
                console.log(`User migration :: Drop relation from \`${tableName}\` with foregein key \`${foreignKeyName}\` is successful`);
            })
            .catch(error => {
                console.error(`User migration :: Error dropping relation from \`${tableName}\` to \`${foreignKeyName}\`\nBecause: \n`, error);
            });*/
    }

    /***
     * Configuration faker for fake user generations
     * @return array with fake user object 
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
     * Generate fake user data with filtering duplications records  
     * @returns HashTable collection objects with fake user
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