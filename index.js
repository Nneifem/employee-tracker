const inquirer = require('inquirer');
const figlet = require('figlet');
// import { table } from 'table';
const table = require('table');
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

// will display a text before the question displayed 
figlet("Employee Manager", function (err, data) {
    if (err) {
        console.log('error');
        console.dir(err);
        return;
    }
    console.log(data);
});

// list of questions the user can choose from
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
        // {
        //     name: 'Add Employee',
        //     value: 'addEmployee'
        // },
        // {
        //     name: 'Update Employee Role',
        //     value: 'updateEmployeeRole'
        // }
    ]
}
];

function init(){
    inquirer
    .prompt(questions)
    .then((answers) => {
        console.log(answers)
        questionAnswers(answers)
    })
}
init();

function questionAnswers(options) {
    if(options.options == 'viewDepartment'){
        db.query('SELECT * FROM department', function (err,results) {
            console.table(results);
        });
    }
    else if(options.options == 'viewRoles'){
        db.query('SELECT * FROM role', function (err,results) {
            console.table(results);
        });
    }
    else if(options.options == 'viewEmployees'){
        db.query('SELECT * FROM employee', function (err,results) {
            console.table(results);
        });
    }
    else if(options.options == 'addDepartment'){
        const optionFourQuestion = [
            {
                type: 'input',
                message: 'What is the name of the new department?',
                name: 'newDepartment'
            }
        ];
        inquirer
        .prompt(optionFourQuestion)
        .then((answers) => {
            db.query(`INSERT INTO department (name) VALUES (?)`, answers.newDepartment, function (err,results) {
                console.table(results);
            });
            init();
        })
    }
    else if(options.options == 'addRoles'){
        const deparments = [];
        db.query('SELECT * FROM department', function (err, results) {
            for(var i = 0; i < results.length; i++){
                deparments.push(results[i])
            }
        })
        const addingRoles = [
            {
                type: 'input',
                message: 'What role would you like to add?',
                name: 'newRole'
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'newSalary'
            },
            {
                type: 'list',
                message: 'message',
                name: 'addedDepartment',
                choices: deparments
            }
        ];
        inquirer
        .prompt(addingRoles)
        .then((answers) => {
            db.query(`INSERT INTO role (title) VALUES (?)`, )
        })

    }
    else if(options.options == 'addEmployee'){
        db.query()
    }
    else if(options.options == 'updateEmployeeRole'){
        db.query()
    }
}
