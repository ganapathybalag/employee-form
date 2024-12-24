let employeeData = JSON.parse(localStorage.getItem('employeeData')) || [];


function saveToLocalStorage() {
    localStorage.setItem('employeeData', JSON.stringify(employeeData));
}

function formSubmit(event) {
    event.preventDefault(); 
    
  
    const employeeName = document.getElementById('name').value;
    const employeeId = document.getElementById('employee id').value;
    const employeeAge = document.getElementById('employee age').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const qualification = document.getElementById('Educational qualification').value;
    const salary = document.getElementById('Employee salary').value;
    const esi = document.getElementById('esi').value;
    const pf = document.getElementById('pf').value;
    const bonus = document.getElementById('bonus').value;
    const contactNo = document.getElementById('contact no').value;

    
    const newEmployee = {
        employeeName,
        employeeId,
        employeeAge,
        gender,
        qualification,
        salary,
        esi,
        pf,
        bonus,
        contactNo
    };

    
    employeeData.push(newEmployee);
    saveToLocalStorage();

    alert("Employee added successfully!");
    
    document.getElementById('myForm').reset();

  
    renderTable();
}

function renderTable() {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; 

    employeeData.forEach((employee, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td class="p-2 border border-gray-300 text-sm">${index + 1}</td>
            <td class="p-2 border border-gray-300 text-sm">${employee.employeeName}</td>
            <td class="p-2 border border-gray-300 text-sm">${employee.employeeId}</td>
            <td class="p-2 border border-gray-300 text-sm">${employee.employeeAge}</td>
            <td class="p-2 border border-gray-300 text-sm">${employee.gender}</td>
            <td class="p-2 border border-gray-300 text-sm">${employee.qualification}</td>
            <td class="p-2 border border-gray-300 text-sm">${employee.salary}</td>
            <td class="p-2 border border-gray-300 text-sm">${employee.esi}</td>
            <td class="p-2 border border-gray-300 text-sm">${employee.pf}</td>
            <td class="p-2 border border-gray-300 text-sm">${employee.bonus}</td>
            <td class="p-2 border border-gray-300 text-sm">${employee.contactNo}</td>
            <td class="p-2 border border-gray-300 text-sm">
                <button onclick="editEmployee(${index})" class="px-3 py-1 bg-yellow-500 text-white rounded-lg">Edit</button>
                <button onclick="deleteEmployee(${index})" class="px-3 py-1 bg-red-500 text-white rounded-lg ml-2">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function editEmployee(index) {
    const employee = employeeData[index];
    
    
    document.getElementById('name').value = employee.employeeName;
    document.getElementById('employee id').value = employee.employeeId;
    document.getElementById('employee age').value = employee.employeeAge;
    document.querySelector(`input[name="gender"][value="${employee.gender}"]`).checked = true;
    document.getElementById('Educational qualification').value = employee.qualification;
    document.getElementById('Employee salary').value = employee.salary;
    document.getElementById('esi').value = employee.esi;
    document.getElementById('pf').value = employee.pf;
    document.getElementById('bonus').value = employee.bonus;
    document.getElementById('contact no').value = employee.contactNo;

                                       // Remove the employee being edited
    employeeData.splice(index, 1);
    saveToLocalStorage();

    alert("Employee data loaded for editing. Please update and submit the form!");
    renderTable();
}

function deleteEmployee(index) {
    const confirmDelete = confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
                                       // Remove employee from array
        employeeData.splice(index, 1);
        saveToLocalStorage();

        alert("Employee deleted successfully!");
        renderTable();
    }
}

                                    // Render table on page load
renderTable();
