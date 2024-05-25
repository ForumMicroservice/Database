import { Table } from 'typeorm'

export const Topics=new Table(
    {
       name:'Topics',
       columns:[
        {
            name:'id',
            type:'varchar',
            generationStrategy:'uuid',
          //  default:'default:"uuid_generate_v4()'
        },
        {
            name:'names',
            type:'varchar',
            isUnique:true,
            isNullable:false
        },
        {
            name:'descriptions',
            type:'varchar',
            length:'50',
            isNullable:true
        },
        {
            name:'avatars',
            type:'varchar',
            isNullable:true,
        },
        {
            name:'usersId',
            type:'varchar',
            isNullable:false
        }
       ],
       foreignKeys:[{
            name:'usersId',
            columnNames:['usersId'],
            referencedColumnNames:['id'],
            referencedTableName:'Users',
            onDelete:'SET NULL',
            onUpdate:'CASCADE'
       }]
    })