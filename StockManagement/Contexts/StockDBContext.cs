using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Entities;

namespace Contexts
{
    public partial class StockDBContext : DbContext
    {
        public StockDBContext()
        {
        }

        public StockDBContext(DbContextOptions<StockDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Company> Companies { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<RoleAssagin> RoleAssagins { get; set; } = null!;
        public virtual DbSet<RoleMaster> RoleMasters { get; set; } = null!;
        public virtual DbSet<SalesDistribute> SalesDistributes { get; set; } = null!;
        public virtual DbSet<SalesDistributeDetail> SalesDistributeDetails { get; set; } = null!;
        public virtual DbSet<Stock> Stocks { get; set; } = null!;
        public virtual DbSet<StockDetail> StockDetails { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Name=ConnectionStrings:DefaultConnection");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>(entity =>
            {
                entity.ToTable("Company");

                entity.Property(e => e.CompanyId).ValueGeneratedNever();

                entity.Property(e => e.Picture).HasMaxLength(200);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("products");

                entity.HasIndex(e => e.CompanyId, "IX_products_CompanyId");

                entity.Property(e => e.Description)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ProductName).HasMaxLength(200);

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CompanyId);
            });

            modelBuilder.Entity<RoleAssagin>(entity =>
            {
                entity.ToTable("RoleAssagin");
            });

            modelBuilder.Entity<RoleMaster>(entity =>
            {
                entity.HasKey(e => e.RoleId);

                entity.ToTable("RoleMaster");
            });

            modelBuilder.Entity<SalesDistribute>(entity =>
            {
                entity.ToTable("SalesDistribute");

                entity.Property(e => e.SalesDistributeId).HasColumnName("SalesDistributeID");

                entity.Property(e => e.ConcernPerson)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.GrandTotal).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.TotalPrice).HasColumnType("decimal(18, 2)");
            });

            modelBuilder.Entity<SalesDistributeDetail>(entity =>
            {
                entity.HasKey(e => e.SalesDistributeDetailsId);

                entity.Property(e => e.SalesDistributeDetailsId)
                    .ValueGeneratedNever()
                    .HasColumnName("SalesDistributeDetailsID");

                entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.SalesDistributeId).HasColumnName("SalesDistributeID");

                entity.Property(e => e.TotalSalesPrice).HasColumnType("decimal(18, 2)");
            });

            modelBuilder.Entity<Stock>(entity =>
            {
                entity.ToTable("Stock");

                entity.Property(e => e.StockId).HasColumnName("StockID");

                entity.Property(e => e.GrandTotalAmount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.TotalPrice).HasColumnType("decimal(18, 2)");
            });

            modelBuilder.Entity<StockDetail>(entity =>
            {
                entity.HasKey(e => e.StockDetailsId)
                    .HasName("PK_StockDetails_1");

                entity.Property(e => e.StockDetailsId)
                    .ValueGeneratedNever()
                    .HasColumnName("StockDetailsID");

                entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.StockId).HasColumnName("StockID");

                entity.Property(e => e.TotalAmount).HasColumnType("decimal(18, 2)");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
