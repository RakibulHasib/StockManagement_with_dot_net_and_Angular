using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StockManagement.Migrations
{
    public partial class IceDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_RoleMaster_RoleId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_RoleId",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "RoleId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RoleMasterRoleId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleMasterRoleId",
                table: "Users",
                column: "RoleMasterRoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_RoleMaster_RoleMasterRoleId",
                table: "Users",
                column: "RoleMasterRoleId",
                principalTable: "RoleMaster",
                principalColumn: "RoleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_RoleMaster_RoleMasterRoleId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_RoleMasterRoleId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RoleMasterRoleId",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "RoleId",
                table: "Users",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_RoleMaster_RoleId",
                table: "Users",
                column: "RoleId",
                principalTable: "RoleMaster",
                principalColumn: "RoleId");
        }
    }
}
