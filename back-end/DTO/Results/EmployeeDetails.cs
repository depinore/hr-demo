using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Results
{
    public class EmployeeDetails : Person
    {
        public IEnumerable<Person> Dependents { get; set; }
    }
}
