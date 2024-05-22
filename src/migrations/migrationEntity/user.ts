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
      },
      {
        name: "username",
        type: "varchar",
        isNullable: false,
        isUnique: true,
      },
      {
        name: "email",
        type: "varchar",
        isNullable: false,
        isUnique: true,
      },
      {
        name: "password",
        type: "varchar",
        isNullable: false,
      },
      {
        name: "avatar",
        type: "varchar",
        isNullable: true,
        default: null,
      },
      {
        name: "isBlocked",
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
        name: "roleId",
        type: "varchar",
        isNullable: true,
        default: null,
      },
    ],
    foreignKeys: [
      {
        name: "fk_user_role",
        columnNames: ["roleId"],
        referencedTableName: "Roles",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      },
    ],
  });

  