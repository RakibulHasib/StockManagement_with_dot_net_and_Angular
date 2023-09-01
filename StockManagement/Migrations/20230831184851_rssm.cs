using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StockManagement.Migrations
{
    public partial class rssm : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Company",
                columns: table => new
                {
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Company", x => x.CompanyId);
                });

            migrationBuilder.CreateTable(
                name: "products",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_products", x => x.ProductId);
                    table.ForeignKey(
                        name: "FK_products_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "CompanyId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "gari1",
                columns: table => new
                {
                    Gari1Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Receive = table.Column<int>(type: "int", nullable: false),
                    Return = table.Column<int>(type: "int", nullable: false),
                    Sales = table.Column<int>(type: "int", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gari1", x => x.Gari1Id);
                    table.ForeignKey(
                        name: "FK_gari1_products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "gari2",
                columns: table => new
                {
                    Gari2Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Receive = table.Column<int>(type: "int", nullable: false),
                    Return = table.Column<int>(type: "int", nullable: false),
                    Sales = table.Column<int>(type: "int", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gari2", x => x.Gari2Id);
                    table.ForeignKey(
                        name: "FK_gari2_products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "gari3",
                columns: table => new
                {
                    Gari3Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Receive = table.Column<int>(type: "int", nullable: false),
                    Return = table.Column<int>(type: "int", nullable: false),
                    Sales = table.Column<int>(type: "int", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gari3", x => x.Gari3Id);
                    table.ForeignKey(
                        name: "FK_gari3_products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "iglooIceCreams",
                columns: table => new
                {
                    IglooIceCreamId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Eja = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NewProduct = table.Column<int>(type: "int", nullable: true),
                    Total = table.Column<int>(type: "int", nullable: true),
                    SalesQuantity = table.Column<int>(type: "int", nullable: true),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Dumping = table.Column<int>(type: "int", nullable: true),
                    Receive = table.Column<int>(type: "int", nullable: true),
                    Remaining = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_iglooIceCreams", x => x.IglooIceCreamId);
                    table.ForeignKey(
                        name: "FK_iglooIceCreams_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "CompanyId");
                    table.ForeignKey(
                        name: "FK_iglooIceCreams_products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "products",
                        principalColumn: "ProductId");
                });

            migrationBuilder.CreateTable(
                name: "kaziFarmFoods",
                columns: table => new
                {
                    KaziFarmFoodId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Eja = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NewProduct = table.Column<int>(type: "int", nullable: true),
                    Total = table.Column<int>(type: "int", nullable: true),
                    SalesQuantity = table.Column<int>(type: "int", nullable: true),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Dumping = table.Column<int>(type: "int", nullable: true),
                    Receive = table.Column<int>(type: "int", nullable: true),
                    Remaining = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_kaziFarmFoods", x => x.KaziFarmFoodId);
                    table.ForeignKey(
                        name: "FK_kaziFarmFoods_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "CompanyId");
                    table.ForeignKey(
                        name: "FK_kaziFarmFoods_products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "products",
                        principalColumn: "ProductId");
                });

            migrationBuilder.CreateTable(
                name: "lovelloIceCreams",
                columns: table => new
                {
                    LovelloIceCreamId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Eja = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NewProduct = table.Column<int>(type: "int", nullable: true),
                    Total = table.Column<int>(type: "int", nullable: true),
                    SalesQuantity = table.Column<int>(type: "int", nullable: true),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Dumping = table.Column<int>(type: "int", nullable: true),
                    Receive = table.Column<int>(type: "int", nullable: true),
                    Remaining = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_lovelloIceCreams", x => x.LovelloIceCreamId);
                    table.ForeignKey(
                        name: "FK_lovelloIceCreams_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "CompanyId");
                    table.ForeignKey(
                        name: "FK_lovelloIceCreams_products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "products",
                        principalColumn: "ProductId");
                });

            migrationBuilder.CreateTable(
                name: "savoyIceCreams",
                columns: table => new
                {
                    SavoyIceCreamId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Eja = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NewProduct = table.Column<int>(type: "int", nullable: true),
                    Total = table.Column<int>(type: "int", nullable: true),
                    SalesQuantity = table.Column<int>(type: "int", nullable: true),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Dumping = table.Column<int>(type: "int", nullable: true),
                    Receive = table.Column<int>(type: "int", nullable: true),
                    Remaining = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_savoyIceCreams", x => x.SavoyIceCreamId);
                    table.ForeignKey(
                        name: "FK_savoyIceCreams_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "CompanyId");
                    table.ForeignKey(
                        name: "FK_savoyIceCreams_products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "products",
                        principalColumn: "ProductId");
                });

            migrationBuilder.CreateTable(
                name: "zaNZeeIceCreams",
                columns: table => new
                {
                    ZaNZeeIceCreamId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Eja = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NewProduct = table.Column<int>(type: "int", nullable: true),
                    Total = table.Column<int>(type: "int", nullable: true),
                    SalesQuantity = table.Column<int>(type: "int", nullable: true),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Dumping = table.Column<int>(type: "int", nullable: true),
                    Receive = table.Column<int>(type: "int", nullable: true),
                    Remaining = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_zaNZeeIceCreams", x => x.ZaNZeeIceCreamId);
                    table.ForeignKey(
                        name: "FK_zaNZeeIceCreams_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "CompanyId");
                    table.ForeignKey(
                        name: "FK_zaNZeeIceCreams_products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "products",
                        principalColumn: "ProductId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_gari1_ProductId",
                table: "gari1",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_gari2_ProductId",
                table: "gari2",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_gari3_ProductId",
                table: "gari3",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_iglooIceCreams_CompanyId",
                table: "iglooIceCreams",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_iglooIceCreams_ProductId",
                table: "iglooIceCreams",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_kaziFarmFoods_CompanyId",
                table: "kaziFarmFoods",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_kaziFarmFoods_ProductId",
                table: "kaziFarmFoods",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_lovelloIceCreams_CompanyId",
                table: "lovelloIceCreams",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_lovelloIceCreams_ProductId",
                table: "lovelloIceCreams",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_products_CompanyId",
                table: "products",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_savoyIceCreams_CompanyId",
                table: "savoyIceCreams",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_savoyIceCreams_ProductId",
                table: "savoyIceCreams",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_zaNZeeIceCreams_CompanyId",
                table: "zaNZeeIceCreams",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_zaNZeeIceCreams_ProductId",
                table: "zaNZeeIceCreams",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "gari1");

            migrationBuilder.DropTable(
                name: "gari2");

            migrationBuilder.DropTable(
                name: "gari3");

            migrationBuilder.DropTable(
                name: "iglooIceCreams");

            migrationBuilder.DropTable(
                name: "kaziFarmFoods");

            migrationBuilder.DropTable(
                name: "lovelloIceCreams");

            migrationBuilder.DropTable(
                name: "savoyIceCreams");

            migrationBuilder.DropTable(
                name: "zaNZeeIceCreams");

            migrationBuilder.DropTable(
                name: "products");

            migrationBuilder.DropTable(
                name: "Company");
        }
    }
}
