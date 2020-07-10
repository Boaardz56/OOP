// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

//adding class extension from Employee
class Intern extends Employee {
    constructor (name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }
    //calling "Intern"
    getRole() {
        return "Intern";
    }
    //added new property to constructor, must call
    getSchool() {
        return this.school;
    }
}


module.exports = Intern;