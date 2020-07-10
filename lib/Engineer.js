// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

//adding class extension from Employee
class Engineer extends Employee {
    constructor (name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    //calling "Engineer"
    getRole() {
        return "Engineer";
    }
    //added new property to constructor, must call
    getGithub() {
        return this.github;
    }
}


module.exports = Engineer;