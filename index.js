const inquirer = require('inquirer');
const figlet = require('figlet');
import { table } from 'table';
const fs = require('fs');

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
            value: 'questionOne'
        },
        {
            name: 'View All Roles',
            value: 'questionTwo'
        },
        {
            name: 'View All Employees',
            value: 'questionThree'
        },
        {
            name: 'Add Department',
            value: 'questionFour'
        },
        {
            name: 'Add Role',
            value: 'questionFive'
        },
        {
            name: 'Add Employee',
            value: 'questionSix'
        },
        {
            name: 'Update Employee Role',
            value: 'questionSeven'
        }
    ]
}
];