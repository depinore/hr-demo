using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    //Instead of interacting with a DbContext directly, this will serve as an 
    //abstraction over Entity Framework from the perspective of the API layer.
    public interface IEmployeeRepository
    {
        //commands
        Task<int> Add(DTO.Commands.CreateEmployee command);
        Task Delete(DTO.Commands.DeleteEmployee command);
        //for simplicity, I will not be supporting UPDATE commands upon employees.

        //queries
        Task<IEnumerable<DTO.Results.EmployeeSummary>> GetAll();
        Task<DTO.Results.EmployeeDetails> Find(DTO.Queries.FindEmployee query);
    }
}
