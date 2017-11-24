using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Results
{
    public class EmployeeSummary : Person
    {
        public int Id { get; set; }
        public int NumDependents { get; set; }
    }
}
