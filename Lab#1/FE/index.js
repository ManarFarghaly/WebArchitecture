function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
const employeeForm = document.querySelector('#employeeForm');
employeeForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  await createEmployee();
  employeeForm.reset();
});

// TODO
// add event listener to delete button
const table = document.querySelector('#dataTable');
table.addEventListener('click', async (e) => {
  if (e.target && e.target.classList.contains('btn-danger')) {
    const row = e.target.closest('tr');
    const idCell = row.querySelector('td:first-child');
    const employeeId = idCell.textContent; // Clean the ID
    await deleteEmployee(employeeId); // Call the deleteEmployee function
  }
});

// TODO
async function createEmployee (){
  // get data from input field
  try{
    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    // send data to BE
    const response = await fetch('http://localhost:3000/api/v1/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, id: id }), //converts the js into json
    });
    // call fetchEmployees
    console.log(response)
    if (response.ok) {
      fetchEmployees();
      alert('Employee created successfully');
    }else{
      console.log(error);
      alert("Employee with this ID already exists")
    }
}catch (error) {
  console.error(error);
  alert('Failed to create employee. Please try again later.');
}
}

// TODO
async function deleteEmployee (employeeId){
  try{
    // get id
    const id = employeeId
    // send id to BE
    const response = await fetch(`http://localhost:3000/api/v1/employee/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    // call fetchEmployees
    if (response.ok) {
      fetchEmployees();
      alert('Employee deleted successfully');
    }else{
      console.log(error);
    }
  }catch(error){
    console.error(error);
    alert("Failed to delete employee")
  }
}
fetchEmployees()
