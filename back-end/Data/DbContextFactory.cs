using Microsoft.EntityFrameworkCore.Design;
using AppConfiguration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Data {
    public class DbContextFactory : IDesignTimeDbContextFactory<EmployeeContext>
    {
        public EmployeeContext CreateDbContext(string[] args)
        {
            var config = ConfigurationHelpers.GetConfiguration(Directory.GetCurrentDirectory() + "\\..\\Api");
            var builder = new DbContextOptionsBuilder<EmployeeContext>();
            builder.UseSqlServer(ConfigurationHelpers.GetDbConnectionString(config));

            return new EmployeeContext(builder.Options);
        }
    }
}