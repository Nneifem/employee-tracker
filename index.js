const inquirer = require('inquirer');
const figlet = require('figlet');
const cTable = require('console.table');
const mysql = require('mysql2');
const express = require('express');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'akaashikeiji',
        database: 'business_db'
    },
    console.log('connected')
)

const questions = [
{
    type: 'list',
    message: 'What would you like to do?',
    name: 'options',
    choices: [
        {
            name: 'View All Departments',
            value: 'viewDepartment'
        },
        {
            name: 'View All Roles',
            value: 'viewRoles'
        },
        {
            name: 'View All Employees',
            value: 'viewEmployees'
        },
        {
            name: 'Add Department',
            value: 'addDepartment'
        },
        {
            name: 'Add Role',
            value: 'addRoles'
        },
        {
            name: 'Add Employee',
            value: 'addEmployee'
        },
        {
            name: 'Update Employee Role',
            value: 'updateEmployeeRole'
        }
    ]
}
];

function init(){
    inquirer
    .prompt(questions)
    .then((answers) => {
        questionAnswers(answers)
    })
}
init();

function questionAnswers(options) {
    if(options.options == 'viewDepartment'){
        db.query('SELECT * FROM department', function (err,results) {
            console.table(results);
            init();
        });
    }
    else if(options.options == 'viewRoles'){
        db.query('SELECT * FROM role', function (err,results) {
            console.table(results);
            init();
        });
    }
    else if(options.options == 'viewEmployees'){
        db.query('SELECT * FROM employee', function (err,results) {
            console.table(results);
            init();
        });
    }
    
    else if(options.options == 'addDepartment'){
        const addingDepartment = [
            {
                type: 'input',
                message: 'What is the name of the new department?',
                name: 'newDepartment'
            }
        ];
        inquirer
        .prompt(addingDepartment)
        .then((answers) => {
            db.query(`INSERT INTO department (name) VALUES ('${answers.newDepartment}')`, function (err,results) {
                console.log('New department was added');
                console.table(results);
                init();
            });
        })
    }
    else if(options.options == 'addRoles'){
        const departments = [];
        db.query('SELECT * FROM department', function (err, results) {
            for(var i = 0; i < results.length; i++){
                departments.push(results[i])
            }
        })
        const addingRoles = [
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'newRole'
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'newSalary'
            },
            {
                type: 'list',
                message: 'Which deparment does the role belong to?',
                name: 'addedDepartment',
                choices: departments
            },
            {
                type: 'input',
                message: 'What is the department id?',
                name: 'departmentID'
            }
        ];
        inquirer
        .prompt(addingRoles)
        .then((answers) => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.newRole}', '${answers.newSalary}', '${answers.departmentID}')`, function (err, results) {
                console.log('New role was added.');
                console.table(results);
                init();
            });
        })
    }
    else if(options.options == 'addEmployee'){
        const roles = [];
        db.query('SELECT title FROM role', function (err, results) {
            for(var i = 0; i < results.length; i++){
                roles.push(results[i].title)
            }
        })

        const employeeManagers = [];
        db.query('SELECT first_name, last_name FROM employee', function (err, results) {
            for(var i = 0; i < results.length; i++){
                employeeManagers.push(`${results[i].first_name} ${results[i].last_name}`)
            }
        })
        const addingEmployees = [
            {
                type: 'input',
                message: 'What is the first name of the employee?',
                name: 'newEmployeeFirstName'
            },
            {
                type: 'input',
                message: 'What is the last name of the employee?',
                name: 'newEmployeeLastName'
            },
            {
                type: 'list',
                message: 'What is the role of the new employee?',
                name: 'employeeRole',
                choices: roles
            },
            {
                type: 'input',
                message: 'What is the role id of the employee?',
                name: 'employeeRoleID'
            },
            {
                type: 'list',
                message: 'Who is the manager of the employee?',
                name: 'newEmployeeManager',
                choices: employeeManagers
            },
            {
                type: 'input',
                message: 'What is the role id of the manager if any?',
                name: 'managerID'
            }
        ];
        inquirer
        .prompt(addingEmployees)
        .then((answers) => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.newEmployeeFirstName}', '${answers.newEmployeeLastName}', '${answers.employeeRoleID}', '${answers.managerID}')`, function (err, results) {
                console.log('New employee was added.');
                console.table(results);
                init();
            });
        })
    }
    else if(options.options == 'updateEmployeeRole'){
        const currentEmployees = [];
        db.query('SELECT first_name, last_name FROM employee', function (err, results){
            for(var i = 0; i < results.length; i++){
                currentEmployees.push(`${results[i].first_name} ${results[i].last_name}`)
            }
        })
        const currentRoles = [];
        db.query('SELECT role_id FROM employee', function (err, results) {
            for(var i = 0; i < results.length; i++){
                currentRoles.push(results[i].role_id)
            }
        })
        const updatingEmployeeRoles = [
            {
                type: 'list',
                message: 'Which employee do you want to update their role?',
                name: 'employeeName',
                choices: currentEmployees
            },
            {
                type: 'list',
                message: 'Whic role do you want to assign to selected employee?',
                name: 'employeeNewRole',
                choices: currentRoles
            }
        ];
        inquirer
        .prompt(updatingEmployeeRoles)
        .then((answers) => { 
                db.query(`UPDATE employee SET first_name, last_name = '${answers.currentEmployees}' WHERE role_id = '${answers.currentRoles}'`)
                console.log('Employee and the role has been updated.');
                console.table(results);
                init();
        })
    }
}