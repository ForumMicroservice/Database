import { MigrationInterface, QueryRunner,Table } from "typeorm";
import { faker } from '@faker-js/faker';
import { userTable } from "./migrationEntity/user";
import { MigrationOperations } from "./abstractMigration/abstractMigration";

export class User1716248730172 extends MigrationOperations implements MigrationInterface {

    constructor(queryRunner:QueryRunner)
    {
        super(queryRunner);
    }

    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        try{
            if(await this.getDatabase(queryRunner,"forum"))
            {
                await this.getTable(queryRunner,"Users") == false ? await this.createTable(queryRunner,"Users",new Table(userTable)) : await this.createRecords(queryRunner, 'superadmin', await this.generateFakeUserData(10)); 
            }else{
               console.error("Migration::Method up:::Database isn't exist") 
            }    
        }catch(error){ 
            console.error("Migration::Method up:::Database error::",`${error}`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {  
        try{
            if(await this.getDatabase(queryRunner,"forum"))
            {
                await this.getTable(queryRunner,"Users") == true ? await this.deleteTable(queryRunner,"Users") : console.error("Table isn't exist, nothing to delete "); 
            }else{
               console.error("User Migration::Method up:::Database isn't exist") 
            }    
        }catch(error){ 
            console.error("User Migration::Method up:::Database error::",`${error}`);
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
            return;
        }
      } 

    public override async createRecords(queryRunner: QueryRunner, roleName:string="", users:any={}): Promise<any> {
        try{
          const roleGuid = await this.getRole(queryRunner,"Roles",roleName);
          users.forEach((fakeUsers)=>{
          queryRunner.query(`INSERT INTO Users(id,usernames, emails, passwords,avatars, rolesId) VALUES 
                                              ('${fakeUsers.userId}', "${fakeUsers.username}", 
                                               '${fakeUsers.email}' , '${fakeUsers.password}', 
                                               '${fakeUsers.avatar}','${roleGuid[0].id}')`);});
        }catch(error){
           console.error("User migration :: Error creating fake users records\nBecause duplicate value constraint\nBecause: \n",error);
        }
    }
}