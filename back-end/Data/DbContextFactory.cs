using Microsoft.EntityFrameworkCore.Design;
using AppConfiguration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Data {
    public class DbContextFactory : IDesignTimeDbContextFactory<EmployeeContext>
    {
        public EmployeeContext CreateDbContext(string[] args)
        {
            var config = ConfigurationHelpers.GetConfiguration();
            var builder = new DbContextOptionsBuilder<EmployeeContext>();
            builder.UseSqlServer(config.GetConnectionString("db"));

            return new EmployeeContext(builder.Options);
        }
    }
}