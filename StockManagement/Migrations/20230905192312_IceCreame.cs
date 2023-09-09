using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StockManagement.Migrations
{
    public partial class IceCreame : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "RoleAssagin",
                columns: table => new
                {
                    RoleAssaginId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleAssagin", x => x.RoleAssaginId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoleAssagin");

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
    }
}
