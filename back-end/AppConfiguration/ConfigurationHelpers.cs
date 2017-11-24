using System;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace AppConfiguration
{
    public static class ConfigurationHelpers
    {
        public static IConfigurationRoot GetConfiguration() 
        {
            var contentRoot = Directory.GetCurrentDirectory() + "\\..\\Api";

            return (new ConfigurationBuilder())
                    .SetBasePath(contentRoot)
                    .AddJsonFile(contentRoot + "\\appsettings.json", true, true)
                    .AddEnvironmentVariables()
                    .Build();
        }
    }
}
