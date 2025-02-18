const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  const index = employee.findIndex((emp) => emp.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  employee.splice(index, 1);
  res.status(200).json({ message: 'Employee deleted successfully' });
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { name, id } = req.body;
  const index = employee.findIndex((emp) => emp.id === id);
  if(index !== -1) {        //found an employee with the same id
    return res.status(409).json({ message: 'Employee already exists' });
  }
  if(!name || !id) {        //either fields are empty
    return res.status(400).json({ message: 'Please provide name and id' });
  }
  if ( 20 < name.length || name.length < 3) { //name length is not valid
    return res.status(400).json({ message: 'Name should be at least 3 characters and at most 20' });
  }
  if (typeof name !== 'string') { //type of name or id is not valid
    return res.status(400).json({ message: 'Name should be a string and id should be a number' });
  }
  const newEmployee = { name, id };
  employee.push(newEmployee);
  res.status(201).json({ message: 'Employee created successfully', data: newEmployee });
};
