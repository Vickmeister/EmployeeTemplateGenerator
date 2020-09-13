const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const teamMembers = [];
const idArray = [];

function init() {
  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Select team member category",
          name: "teamMemberType",
          choices: ["engineer", "intern", "I don't want to add anyone else"],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.teamMemberType) {
          case "engineer":
            engineerQuestions();
            break;
          case "intern":
            internQuestions();
            break;
          default:
            buildTeam();
            break;
        }
      });
  }

  function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  function questions() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "What's your manager's name?",
          validate: (answer) => {
            if (answer !== " ") {
              return true;
            }
            return "Please enter manager name";
          },
        },
        {
          type: "input",
          message: "What's the manager's employee ID number?",
          name: "managerId",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter manager's employee ID number";
          },
        },
        {
          type: "input",
          message: "What is the manager's email?",
          name: "managerEmail",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter manager email";
          },
        },
        {
          type: "input",
          message: "What's your manager's office number?",
          name: "managerOfficeNumber",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter office number";
          },
        },
      ])

      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }

  function engineerQuestions() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "employeeName",
          message: "What's the employee's name?",
          validate: (answer) => {
            if (answer !== " ") {
              return true;
            }
            return "Please enter employee name";
          },
        },
        {
          type: "input",
          message: "What's the employee's ID number?",
          name: "employeeId",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter employee ID number";
          },
        },
        {
          type: "input",
          message: "What's the employee's email address?",
          name: "employeeEmail",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter employee email";
          },
        },
        {
          type: "input",
          message: "What's the employee's GitHub username?",
          name: "employeeGitHub",
          validate: (answer) => {
            if (answer !== " ") {
              return true;
            }
            return "Please enter GitHub username";
          },
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.employeeName,
          answers.employeeId,
          answers.employeeEmail,
          answers.employeeGithub
        );
        teamMembers.push(engineer);
        idArray.push(answers.employeeId);
        createTeam();
      });
  }

  function internQuestions() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What is the employee's name?",
          validate: (answer) => {
            if (answer !== " ") {
              return true;
            }
            return "Please enter employee name";
          },
        },
        {
          type: "input",
          message: "What is the employee id?",
          name: "internId",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter employee ID number";
          },
        },
        {
          type: "input",
          message: "What is the employee's email?",
          name: "internEmail",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter employee email";
          },
        },
        {
          type: "input",
          message: "What's the intern's school?",
          name: "internSchool",
          validate: (answer) => {
            if (answer !== " ") {
              return true;
            }
            return "Please enter intern school";
          },
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        teamMembers.push(intern);
        idArray.push(answers.internId);
        createTeam();
      });
  }
  questions();
}

// function call to initialize program
init();
