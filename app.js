const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("domain");

//Declaring global variables
const teamMembers = [];
const idArray = [];



 

    function createManager() {
        console.log("Let's go ahead and build your team!");

        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What's your manager name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a name.";
                }
            },
            {
                type: "input",
                name: "managerID",
                message: "What's your manager ID?",
                validate: answer => {
                    const id = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (id) {
                        return true;
                    }

                    return "Please enter a number greater than 0 to assign the Manager an ID";
                }

            },
            {
                type: "input",
                name: "managerEmail",
                message: "What's your manager email?",
                validate: answer => {
                    const email = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (email) {
                        return true;
                    }

                    return "Please enter a valid email address";
                }

            },
            {
                type: "input",
                name: "officeNumber",
                message: "What's the managers office number?",
                validate: answer => {
                    const offNum = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (offNum) {
                        return true;
                    }
                    return "Please enter valid office number for the manager";
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.officeNumber);
            console.log(manager);
            teamMembers.push(manager);
            startingQuestion();
        });

 
    }



function createEngineer() {
    console.log("Let's join the team!");

    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "Provide the name of the engineer?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name.";
            }
        },
        {
            type: "input",
            name: "engineerID",
            message: "What's your engineer ID?",
            validate: answer => {
                const id = answer.match(
                    /^[1-9]\d*$/
                );
                if (id) {
                    return true;
                }

                return "Please enter a number greater than 0 to assign the Manager an ID";
            }

        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What's your engineer email?",
            validate: answer => {
                const email = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (email) {
                    return true;
                }

                return "Please enter a valid email address";
            }

        },
        {
            type: "input",
            name: "engineerNumber",
            message: "What's the engineer's contact number?",
            validate: answer => {
                const engineerNum = answer.match(
                    /^[1-9]\d*$/
                );
                if (engineerNum) {
                    return true;
                }
                return "Please enter a valid number for the engineer";
            }
        }

    ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerNumber);
        console.log(engineer);
        teamMembers.push(engineer);
        startingQuestion();
    });


}
function createIntern() {
    console.log("Let's join the team!");

    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "Provide the name of the intern?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name.";
            }
        },
        {
            type: "input",
            name: "internID",
            message: "What's your engineer ID?",
            validate: answer => {
                const id = answer.match(
                    /^[1-9]\d*$/
                );
                if (id) {
                    return true;
                }

                return "Please enter a number greater than 0 to assign the Manager an ID";
            }

        },
        {
            type: "input",
            name: "internEmail",
            message: "What's your intern email?",
            validate: answer => {
                const email = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (email) {
                    return true;
                }

                return "Please enter a valid email address";
            }

        },
        {
            type: "input",
            name: "internNumber",
            message: "What's the engineer's contact number?",
            validate: answer => {
                const internNum = answer.match(
                    /^[1-9]\d*$/
                );
                if (internNum) {
                    return true;
                }
                return "Please enter a valid number for the intern";
            }
        }
    ]).then(answers => {
        const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internNumber);
        console.log(intern);
        teamMembers.push(intern);
        startingQuestion();
    });

}







function startingQuestion() {
    return inquirer.prompt ([{
        type: "list",
        message: "Provide your employee role",
        name: "role",
        choices:["Manager", "Engineer", "Intern", "Finished"]

}])

.then(function (data) {
    if (data.role === "Manager"){
    createManager();
    }   
if (data.role === "Engineer"){
    createEngineer();
    }
if (data.role === "Intern"){
    createIntern();
    }
    if (data.role === "Finished"){
    fs.writeFile("./rendered/rendered.html", render(teamMembers),  "utf8",function(err){console.log("Success!")});
    }
});    
  

}       


startingQuestion();







// const answers = render (employees);
// fs.writeFile(".rendered/rendered.html", answers,'utf8',function(){
// console.log("success")
// });
    





// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
