using System;
using System.Collections.Generic;

namespace Entities
{
    public class Employee : Person
    {
        public virtual IList<Person> Dependents { get; set; }
    }
}
