import {Table} from 'typeorm';

export const Comments=new Table({
    name: "Comments",
    columns: [
    {
      name: "id",
      type: "uuid",
      length: '36',
      isPrimary: true,
      generationStrategy: "uuid",
      //default: "uuid_generate_v4()"
    },
    {
      name: "usersId",
      type: "uuid"
    },
    {
      name: "subjectsId",
      type: "uuid"
    },
    {
       name: "rootsCommentId",
       type: "uuid",
       isNullable: true
    },
    {
       name: "comment",
       type: "text",
       isNullable: true
    },
    {
       name: "createdAt",
       type: "timestamp",
       default: "CURRENT_TIMESTAMP"
    }],
    foreignKeys: [
    {
      columnNames: ["usersId"],
      referencedTableName: "users",
      referencedColumnNames: ["id"],
      onDelete: "CASCADE"
    },
    {
      columnNames: ["subjectsId"],
      referencedTableName: "subjects",
      referencedColumnNames: ["id"],
      onDelete: "CASCADE"
    },
    {
      columnNames: ["rootCommentsId"],
      referencedTableName: "Comments",
      referencedColumnNames: ["id"],
      onDelete: "CASCADE"
    }]
});
