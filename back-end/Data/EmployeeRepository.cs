using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DTO.Commands;
using DTO.Queries;
using DTO.Results;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using BLL;

namespace Data
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private EmployeeContext db;

        public EmployeeRepository(EmployeeContext ctx)
        {
            this.db = ctx;
        }
        public async Task<int> Add(CreateEmployee command)
        {
            var newEmployee = new Entities.Employee
            {
                FirstName = command.Employee.FirstName,
                LastName = command.Employee.LastName,
                Dependents = command.Dependents.Select(d => new Entities.Person
                {
                    FirstName = d.FirstName,
                    LastName = d.LastName
                }).ToList()
            };

            db.Add(newEmployee);
            await db.SaveChangesAsync();

            return newEmployee.Id;
        }

        public async Task Delete(DeleteEmployee command)
        {
            var deleted = await db.Employees
                                .Include(e => e.Dependents)
                                .FirstAsync(e => e.Id == command.Id);
            db.Remove(deleted);
            await db.SaveChangesAsync();
        }

        public async Task<EmployeeDetails> Find(FindEmployee query)
        {
            var e = await db.Employees
                            .Include(emp => emp.Dependents)
                            .FirstOrDefaultAsync(emp => emp.Id == query.Id);
                            
            return e == null ? null : BLL.Conversion.toDetails(e);
        }

        public async Task<IEnumerable<EmployeeDetails>> GetAll() {
            var results = (await db.Employees
                            .Include(e => e.Dependents)
                            .ToListAsync())
                            .Select(BLL.Conversion.toDetails)
                            .ToList();
            return results;
        }
            
    }
}
