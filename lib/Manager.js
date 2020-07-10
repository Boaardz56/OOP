// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee");

//adding class extension from Employee
class Manager extends Employee {
    constructor (name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    //calling "Manager"
    getRole() {
        return "Manager";
    }
    //added new property to constructor, must call
    getOfficeNumber() {
        return this.officeNumber;
    }
}


module.exports = Manager;