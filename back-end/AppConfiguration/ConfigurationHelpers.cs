using System;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace AppConfiguration
{
    public static class ConfigurationHelpers
    {
        public static IConfigurationRoot GetConfiguration(string contentRoot) 
        {
            return (new ConfigurationBuilder())
                    .SetBasePath(contentRoot)
                    .AddJsonFile(contentRoot + "\\appsettings.json", true, true)
                    .AddEnvironmentVariables()
                    .Build();
        }
        public static string GetDbConnectionString(IConfigurationRoot config) {
            return config["hr_demo_db"];
        }
    }
}
