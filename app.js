const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const render = require("./lib/htmlRenderer");
const { rejects } = require("assert");
const { resolve } = require("path");

const OUTPUT_DIR = path.resolve(__dirname, "output");
//targeting the new team.html path
const outputPath = path.join(OUTPUT_DIR, "team.html");

//setting array for variable
const employees = [];

//starting application
function startApp() {
    startHTML();
    addTeamMember();
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function addTeamMember() {
    inquirer.prompt([{
        type: "input",
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
        type: "input",
        message: "Please enter team member's id.",
        name: "id"
    },
    {
        type: "input",
        message: "Please enter team member's email address.",
        name: "email"
    }])



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
                    finalHTML();
                    return addTeamMember();
                } else {
                    finalHTML();
                }
            });
        });
    });
}

//build html
function startHTML() {
 const html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading" style="background-color:thistle";>
                <h1 class="text-center" style="color:white";>My Team</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">`;
    fs.writeFile('./output/team.html', html, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

function addHTML(member) {
    return new Promise(function(res, req) {
        const name = member.getName();
        const id = member.getId();
        const email = member.getEmail();
        const role = member.getRole();
        let data = "";
        if (role === "Engineer") {
            const github = member.getGithub();
            data = `<div class="card employee-card" style="" >
            <div class="card-header" style="background-color:pink">
                <h2 class="card-title" >${name}</h2>
                <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${role}</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email: ${email}</li>
                    <li class="list-group-item">GitHub:${github}</li>
                </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="card employee-card">
            <div class="card-header">
                <h2 class="card-title">${name}</h2>
                <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${role}</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email: ${email}</li>
                    <li class="list-group-item">School: ${school}</li>
                </ul>
            </div>
        </div>`
        } else {
            const officePhone = member.getOfficeNumber();
            data = `<div class="card employee-card">
            <div class="card-header">
                <h2 class="card-title">${name}</h2>
                <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${role}</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email: ${email}</li>
                    <li class="list-group-item">Office number: ${officePhone} </li>
                </ul>
            </div>
        </div`
        }
        fs.appendFile("./output/team.html", data, function (err) {
            if (err) {
                return req(err);
            };
            return res;
         });
    });
}

//put together final html
function finalHTML() {
    const html = `</div>
    </div>
</body>

</html>`;

    fs.appendFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
}

//call starting function
startApp();