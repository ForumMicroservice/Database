import { Table } from 'typeorm';
/**
 * Define model User for migrations
 */
export const userTable = new Table({
    name: 'Users',
    columns: [
      {
        name: "id",
        type: "varchar",
        isPrimary: true,
        generationStrategy: "uuid",
       // default:"uuid_generate_v4()"
      },
      {
        name: "usernames",
        type: "varchar",
        isNullable: false,
        isUnique: true,
      },
      {
        name: "emails",
        type: "varchar",
        isNullable: false,
        isUnique: true,
      },
      {
        name: "passwords",
        type: "varchar",
        isNullable: false,
      },
      {
        name: "avatars",
        type: "varchar",
        isNullable: true,
        default: null,
      },
      {
        name: "isBlockeds",
        type: "tinyint",
        isNullable: false,
        default: 0,
      },
      {
        name: "createdAt",
        type: "timestamp",
        isNullable: false,
        default: "CURRENT_TIMESTAMP",
      },
      {
        name: "rolesId",
        type: "varchar",
        isNullable: true,
        default: null,
      },
    ],
    foreignKeys: [
      {
        name: "fk_user_role",
        columnNames: ["rolesId"],
        referencedTableName: "Roles",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      },
    ],
  });

  