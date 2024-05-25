import { Table } from 'typeorm';

/**
 * Define Role model for migrations
 */
export const roleTable = new Table(
                                   {
                                    name:'Roles',
                                    columns:[
                                    {
                                        name:'id',   
                                        type:'varchar', 
                                        generationStrategy: 'uuid', 
                                       // default: 'uuid_generate_v4()', 
                                        isPrimary:true
                                    }, 
                                    {
                                        name:'names', 
                                        type:'varchar', 
                                        isNullable:false
                                    }]
                                    });
