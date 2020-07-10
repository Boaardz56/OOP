const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//setting array for variable
const employees = [];

//fxn to start the application and add members
function startApp() {
    startHTML();
    addTeamMember();
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function addTeamMember() {
    inquirer.prompt([{
        message: "Please enter team member's name.",
        name: "name"
    },
    {
        type: "list",
        message: "What is the team member's role?",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        name: "role"
    },
    {
        message: "Please enter team member's id.",
        name: "id"
    },
    {
        message: "Please enter team member's email address.",
        name: "email"
    }
    ])
    //add a promise
    .then(function({name, role, id, email}) {
        let roleInfo = "";
        if (role === "Engineer") {
            roleInfo = "GitHub username";
        } else if (role === "Intern") {
            roleInfo = "School Name";
        } else  {
            roleInfo = "Office Phone Number";
        }
        inquirer.prompt([{
            //must add in jquery call to roleInfo
            message: `Enter team member's ${roleInfo}`,
            name: "roleInfo"
        },
        {
            type: "list",
            message: "Would you like to add more team members?",
            choices: [
                "Yes",
                "No"
            ],
            name: "addingMembers"
        }])
        //promise to add more team members
        .then(function({roleInfo, addingMembers}) {
            var newMember;
            if (role === "Engineer") {
                newMember = new Engineer(name, id, email, roleInfo);
            } else if (role === "Intern") {
                newMember = new Intern(name, id, email, roleInfo);
            } else {
                newMember = new Manager(name, id, email, roleInfo);
            }
            //push answers into empty employees array
            employees.push(newMember);
            addHTML(newMember)
            .then(function() {
                if (addingMembers === "Yes") {
                    addTeamMember();
                } else {
                    finishHTML();
                }
            });
        });
    });
}


const OUTPUT_DIR = path.resolve(__dirname, "output");
//targeting the new team.html path
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!





// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
