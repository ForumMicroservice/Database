import {Table} from 'typeorm';

export const Subject = new Table({
    name:'Subjects',
    columns:
    [
        {
            name:'id',
            type:'varchar',
            generationStrategy:'uuid',
          //  default: 'default:"uuid_generate_v4()',
            isNullable:false,
            isPrimary:true
        },
        {
            name:'names',
            type:'varchar',
            isNullable:false,
            isUnique:true,

        },
        {
            name:'context',
            type:'text',
            isNullable:false
        },
        {
            name:'avatars',
            type:'varchar',
            isNullable:true,
        },
        {
            name:'topicsId',
            type:'varchar',
            isNullable:false
        },
        {
            name:'createdAt',
            type:'timestapm',
            default:'CURRENT_TIMESTAMP',
            isNullable:false
        }
    ],
    foreignKeys:[
    {
        name:'FK_user_subject',
        columnNames:['topicsId'],
        referencedTableName: "Users",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
    }]
})