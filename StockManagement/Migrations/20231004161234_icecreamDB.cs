using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StockManagement.Migrations
{
    public partial class icecreamDB : Migration
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
                name: "gari1Master_Tbl",
                columns: table => new
                {
                    Gari1MasterId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalReceive = table.Column<int>(type: "int", nullable: false),
                    TotalReturn = table.Column<int>(type: "int", nullable: false),
                    TotalSales = table.Column<int>(type: "int", nullable: false),
                    GrandTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gari1Master_Tbl", x => x.Gari1MasterId);
                });

            migrationBuilder.CreateTable(
                name: "gari2Master_Tbl",
                columns: table => new
                {
                    Gari2MasterId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalReceive = table.Column<int>(type: "int", nullable: false),
                    TotalReturn = table.Column<int>(type: "int", nullable: false),
                    TotalSales = table.Column<int>(type: "int", nullable: false),
                    GrandTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gari2Master_Tbl", x => x.Gari2MasterId);
                });

            migrationBuilder.CreateTable(
                name: "gari3Master_Tbl",
                columns: table => new
                {
                    Gari3MasterId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalReceive = table.Column<int>(type: "int", nullable: false),
                    TotalReturn = table.Column<int>(type: "int", nullable: false),
                    TotalSales = table.Column<int>(type: "int", nullable: false),
                    GrandTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gari3Master_Tbl", x => x.Gari3MasterId);
                });

            migrationBuilder.CreateTable(
                name: "iglooIceCreamMaster_Tbl",
                columns: table => new
                {
                    IglooIceCreamMasterId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TotalEja = table.Column<int>(type: "int", nullable: true),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalNewProduct = table.Column<int>(type: "int", nullable: true),
                    GrandTotal = table.Column<int>(type: "int", nullable: true),
                    TotalSalesQuantity = table.Column<int>(type: "int", nullable: true),
                    GrandTotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TotalDumping = table.Column<int>(type: "int", nullable: true),
                    TotalReceive = table.Column<int>(type: "int", nullable: true),
                    TotalRemaining = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_iglooIceCreamMaster_Tbl", x => x.IglooIceCreamMasterId);
                });

            migrationBuilder.CreateTable(
                name: "kaziFarmFoodMaster_Tbl",
                columns: table => new
                {
                    KaziFarmFoodMasterId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TotalEja = table.Column<int>(type: "int", nullable: true),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalNewProduct = table.Column<int>(type: "int", nullable: true),
                    GrandTotal = table.Column<int>(type: "int", nullable: true),
                    TotalSalesQuantity = table.Column<int>(type: "int", nullable: true),
                    GrandTotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TotalDumping = table.Column<int>(type: "int", nullable: true),
                    TotalReceive = table.Column<int>(type: "int", nullable: true),
                    TotalRemaining = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_kaziFarmFoodMaster_Tbl", x => x.KaziFarmFoodMasterId);
                });

            migrationBuilder.CreateTable(
                name: "lovelloIceCreamMaster_Tbl",
                columns: table => new
                {
                    LovelloIceCreamMasterId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TotalEja = table.Column<int>(type: "int", nullable: true),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalNewProduct = table.Column<int>(type: "int", nullable: true),
                    GrandTotal = table.Column<int>(type: "int", nullable: true),
                    TotalSalesQuantity = table.Column<int>(type: "int", nullable: true),
                    GrandTotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TotalDumping = table.Column<int>(type: "int", nullable: true),
                    TotalReceive = table.Column<int>(type: "int", nullable: true),
                    TotalRemaining = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_lovelloIceCreamMaster_Tbl", x => x.LovelloIceCreamMasterId);
                });

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

            migrationBuilder.CreateTable(
                name: "RoleMaster",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleMaster", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "savoyIceCreamMaster_tbl",
                columns: table => new
                {
                    SavoyIceCreamMasterId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TotalEja = table.Column<int>(type: "int", nullable: true),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalNewProduct = table.Column<int>(type: "int", nullable: true),
                    GrandTotal = table.Column<int>(type: "int", nullable: true),
                    TotalSalesQuantity = table.Column<int>(type: "int", nullable: true),
                    GrandTotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TotalDumping = table.Column<int>(type: "int", nullable: true),
                    TotalReceive = table.Column<int>(type: "int", nullable: true),
                    TotalRemaining = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_savoyIceCreamMaster_tbl", x => x.SavoyIceCreamMasterId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "zaNZeeIceCreamMaster_Tbl",
                columns: table => new
                {
                    ZaNZeeIceCreamMasterId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TotalEja = table.Column<int>(type: "int", nullable: true),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalNewProduct = table.Column<int>(type: "int", nullable: true),
                    GrandTotal = table.Column<int>(type: "int", nullable: true),
                    TotalSalesQuantity = table.Column<int>(type: "int", nullable: true),
                    GrandTotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TotalDumping = table.Column<int>(type: "int", nullable: true),
                    TotalReceive = table.Column<int>(type: "int", nullable: true),
                    TotalRemaining = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_zaNZeeIceCreamMaster_Tbl", x => x.ZaNZeeIceCreamMasterId);
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
                    Gari1MasterId = table.Column<int>(type: "int", nullable: false),
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
                        name: "FK_gari1_gari1Master_Tbl_Gari1MasterId",
                        column: x => x.Gari1MasterId,
                        principalTable: "gari1Master_Tbl",
                        principalColumn: "Gari1MasterId",
                        onDelete: ReferentialAction.Cascade);
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
                    Gari2MasterId = table.Column<int>(type: "int", nullable: false),
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
                        name: "FK_gari2_gari2Master_Tbl_Gari2MasterId",
                        column: x => x.Gari2MasterId,
                        principalTable: "gari2Master_Tbl",
                        principalColumn: "Gari2MasterId",
                        onDelete: ReferentialAction.Cascade);
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
                    Gari3MasterId = table.Column<int>(type: "int", nullable: false),
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
                        name: "FK_gari3_gari3Master_Tbl_Gari3MasterId",
                        column: x => x.Gari3MasterId,
                        principalTable: "gari3Master_Tbl",
                        principalColumn: "Gari3MasterId",
                        onDelete: ReferentialAction.Cascade);
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
                    IglooIceCreamMasterId = table.Column<int>(type: "int", nullable: false),
                    Eja = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NewProduct = table.Column<int>(type: "int", nullable: true),
                    Total = table.Column<int>(type: "int", nullable: true),
                    SalesQuantity = table.Column<int>(type: "int", nullable: true),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Dumping = table.Column<int>(type: "int", nullable: true),
                    Receive = table.Column<int>(type: "int", nullable: true),
                    Remaining = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
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
                        name: "FK_iglooIceCreams_iglooIceCreamMaster_Tbl_IglooIceCreamMasterId",
                        column: x => x.IglooIceCreamMasterId,
                        principalTable: "iglooIceCreamMaster_Tbl",
                        principalColumn: "IglooIceCreamMasterId",
                        onDelete: ReferentialAction.Cascade);
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
                    KaziFarmFoodMasterId = table.Column<int>(type: "int", nullable: false),
                    Eja = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NewProduct = table.Column<int>(type: "int", nullable: true),
                    Total = table.Column<int>(type: "int", nullable: true),
                    SalesQuantity = table.Column<int>(type: "int", nullable: true),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Dumping = table.Column<int>(type: "int", nullable: true),
                    Receive = table.Column<int>(type: "int", nullable: true),
                    Remaining = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
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
                        name: "FK_kaziFarmFoods_kaziFarmFoodMaster_Tbl_KaziFarmFoodMasterId",
                        column: x => x.KaziFarmFoodMasterId,
                        principalTable: "kaziFarmFoodMaster_Tbl",
                        principalColumn: "KaziFarmFoodMasterId",
                        onDelete: ReferentialAction.Cascade);
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
                    LovelloIceCreamMasterId = table.Column<int>(type: "int", nullable: false),
                    Eja = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NewProduct = table.Column<int>(type: "int", nullable: true),
                    Total = table.Column<int>(type: "int", nullable: true),
                    SalesQuantity = table.Column<int>(type: "int", nullable: true),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Dumping = table.Column<int>(type: "int", nullable: true),
                    Receive = table.Column<int>(type: "int", nullable: true),
                    Remaining = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
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
                        name: "FK_lovelloIceCreams_lovelloIceCreamMaster_Tbl_LovelloIceCreamMasterId",
                        column: x => x.LovelloIceCreamMasterId,
                        principalTable: "lovelloIceCreamMaster_Tbl",
                        principalColumn: "LovelloIceCreamMasterId",
                        onDelete: ReferentialAction.Cascade);
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
                    SavoyIceCreamMasterId = table.Column<int>(type: "int", nullable: false),
                    Eja = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NewProduct = table.Column<int>(type: "int", nullable: true),
                    Total = table.Column<int>(type: "int", nullable: true),
                    SalesQuantity = table.Column<int>(type: "int", nullable: true),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Dumping = table.Column<int>(type: "int", nullable: true),
                    Receive = table.Column<int>(type: "int", nullable: true),
                    Remaining = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
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
                    table.ForeignKey(
                        name: "FK_savoyIceCreams_savoyIceCreamMaster_tbl_SavoyIceCreamMasterId",
                        column: x => x.SavoyIceCreamMasterId,
                        principalTable: "savoyIceCreamMaster_tbl",
                        principalColumn: "SavoyIceCreamMasterId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "zaNZeeIceCreams",
                columns: table => new
                {
                    ZaNZeeIceCreamId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    ZaNZeeIceCreamMasterId = table.Column<int>(type: "int", nullable: false),
                    Eja = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NewProduct = table.Column<int>(type: "int", nullable: true),
                    Total = table.Column<int>(type: "int", nullable: true),
                    SalesQuantity = table.Column<int>(type: "int", nullable: true),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Dumping = table.Column<int>(type: "int", nullable: true),
                    Receive = table.Column<int>(type: "int", nullable: true),
                    Remaining = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ZaNZeeIceCreamMaster_tblZaNZeeIceCreamMasterId = table.Column<int>(type: "int", nullable: true)
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
                    table.ForeignKey(
                        name: "FK_zaNZeeIceCreams_savoyIceCreamMaster_tbl_ZaNZeeIceCreamMasterId",
                        column: x => x.ZaNZeeIceCreamMasterId,
                        principalTable: "savoyIceCreamMaster_tbl",
                        principalColumn: "SavoyIceCreamMasterId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_zaNZeeIceCreams_zaNZeeIceCreamMaster_Tbl_ZaNZeeIceCreamMaster_tblZaNZeeIceCreamMasterId",
                        column: x => x.ZaNZeeIceCreamMaster_tblZaNZeeIceCreamMasterId,
                        principalTable: "zaNZeeIceCreamMaster_Tbl",
                        principalColumn: "ZaNZeeIceCreamMasterId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_gari1_Gari1MasterId",
                table: "gari1",
                column: "Gari1MasterId");

            migrationBuilder.CreateIndex(
                name: "IX_gari1_ProductId",
                table: "gari1",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_gari2_Gari2MasterId",
                table: "gari2",
                column: "Gari2MasterId");

            migrationBuilder.CreateIndex(
                name: "IX_gari2_ProductId",
                table: "gari2",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_gari3_Gari3MasterId",
                table: "gari3",
                column: "Gari3MasterId");

            migrationBuilder.CreateIndex(
                name: "IX_gari3_ProductId",
                table: "gari3",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_iglooIceCreams_CompanyId",
                table: "iglooIceCreams",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_iglooIceCreams_IglooIceCreamMasterId",
                table: "iglooIceCreams",
                column: "IglooIceCreamMasterId");

            migrationBuilder.CreateIndex(
                name: "IX_iglooIceCreams_ProductId",
                table: "iglooIceCreams",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_kaziFarmFoods_CompanyId",
                table: "kaziFarmFoods",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_kaziFarmFoods_KaziFarmFoodMasterId",
                table: "kaziFarmFoods",
                column: "KaziFarmFoodMasterId");

            migrationBuilder.CreateIndex(
                name: "IX_kaziFarmFoods_ProductId",
                table: "kaziFarmFoods",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_lovelloIceCreams_CompanyId",
                table: "lovelloIceCreams",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_lovelloIceCreams_LovelloIceCreamMasterId",
                table: "lovelloIceCreams",
                column: "LovelloIceCreamMasterId");

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
                name: "IX_savoyIceCreams_SavoyIceCreamMasterId",
                table: "savoyIceCreams",
                column: "SavoyIceCreamMasterId");

            migrationBuilder.CreateIndex(
                name: "IX_zaNZeeIceCreams_CompanyId",
                table: "zaNZeeIceCreams",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_zaNZeeIceCreams_ProductId",
                table: "zaNZeeIceCreams",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_zaNZeeIceCreams_ZaNZeeIceCreamMaster_tblZaNZeeIceCreamMasterId",
                table: "zaNZeeIceCreams",
                column: "ZaNZeeIceCreamMaster_tblZaNZeeIceCreamMasterId");

            migrationBuilder.CreateIndex(
                name: "IX_zaNZeeIceCreams_ZaNZeeIceCreamMasterId",
                table: "zaNZeeIceCreams",
                column: "ZaNZeeIceCreamMasterId");
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
                name: "RoleAssagin");

            migrationBuilder.DropTable(
                name: "RoleMaster");

            migrationBuilder.DropTable(
                name: "savoyIceCreams");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "zaNZeeIceCreams");

            migrationBuilder.DropTable(
                name: "gari1Master_Tbl");

            migrationBuilder.DropTable(
                name: "gari2Master_Tbl");

            migrationBuilder.DropTable(
                name: "gari3Master_Tbl");

            migrationBuilder.DropTable(
                name: "iglooIceCreamMaster_Tbl");

            migrationBuilder.DropTable(
                name: "kaziFarmFoodMaster_Tbl");

            migrationBuilder.DropTable(
                name: "lovelloIceCreamMaster_Tbl");

            migrationBuilder.DropTable(
                name: "products");

            migrationBuilder.DropTable(
                name: "savoyIceCreamMaster_tbl");

            migrationBuilder.DropTable(
                name: "zaNZeeIceCreamMaster_Tbl");

            migrationBuilder.DropTable(
                name: "Company");
        }
    }
}
