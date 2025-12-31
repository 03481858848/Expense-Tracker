using Microsoft.EntityFrameworkCore;
using Tracker.API.Models;

namespace Tracker.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Expense entity
            modelBuilder.Entity<Expense>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Amount)
                    .HasPrecision(18, 2)
                    .IsRequired();
                entity.Property(e => e.Date)
                    .IsRequired();
                entity.Property(e => e.Category)
                    .IsRequired()
                    .HasMaxLength(100);
                entity.Property(e => e.Notes)
                    .HasMaxLength(500);
            });

            // Configure Category entity
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(c => c.Id);
                entity.Property(c => c.Name)
                    .IsRequired()
                    .HasMaxLength(100);
                entity.HasIndex(c => c.Name)
                    .IsUnique();
            });

            // Seed initial categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Food", CreatedAt = DateTime.UtcNow },
                new Category { Id = 2, Name = "Transport", CreatedAt = DateTime.UtcNow },
                new Category { Id = 3, Name = "Shopping", CreatedAt = DateTime.UtcNow },
                new Category { Id = 4, Name = "Bills", CreatedAt = DateTime.UtcNow },
                new Category { Id = 5, Name = "Entertainment", CreatedAt = DateTime.UtcNow },
                new Category { Id = 6, Name = "Healthcare", CreatedAt = DateTime.UtcNow }
            );
        }
    }
}

