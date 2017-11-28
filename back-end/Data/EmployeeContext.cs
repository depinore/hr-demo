using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Data
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options): base(options) { }
        public DbSet<Entities.Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            var personEntity = modelBuilder.Entity<Entities.Person>();

            personEntity.Property(p => p.FirstName).IsRequired();
            personEntity.Property(p => p.LastName).IsRequired();
            
            modelBuilder.Entity<Entities.Employee>()
                .HasMany(e => e.Dependents);
        }
    }
}
