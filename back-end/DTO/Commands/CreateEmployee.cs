using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Commands
{
    public class CreateEmployee
    {
        public Person Employee { get; set; }
        public IEnumerable<Person> Dependents { get; set; }
    }
}
