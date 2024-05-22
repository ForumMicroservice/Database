import { Table } from 'typeorm';

/**
 * Define Role model for migrations
 */
export const roleTable = new Table({name:'Roles',columns:[{name:'id',   type:'varchar',isPrimary:true}, {name:'name', type:'varchar', isNullable:false}]});
