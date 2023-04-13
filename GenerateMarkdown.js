//generateMarkdown
const inquirer = require('inquirer');
const { writeFile } = require('fs').promises;

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is your project title?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter a description for your project:',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Enter the installation instructions:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Enter the usage information:',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license for your project:',
      choices: ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'MPL-2.0', 'None'],
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Enter the contribution guidelines:',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Enter the test instructions:',
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email address:',
    },
  ]);
};

const generateMarkdown = (data) => {
  const renderLicenseBadge = (license) => {
    if (license === 'None') {
      return '';
    } else {
      return `![License: ${license}](https://img.shields.io/badge/License-${license}-blue.svg)`;
    }
  };

  const renderLicenseLink = (license) => {
    if (license === 'None') {
      return '';
    } else {
      return `https://opensource.org/licenses/${license}`;
    }
  };

  const renderLicenseSection = (license) => {
    if (license === 'None') {
      return '';
    } else {
      return `
## License

${renderLicenseBadge(license)}

This project is licensed under the ${license} license. For more information, visit the [license page](${renderLicenseLink(license)}).
`;
    }
  };

  return `# ${data.title}

${renderLicenseBadge(data.license)}

## Description

${data.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${data.installation}

## Usage

${data.usage}

${renderLicenseSection(data.license)}

## Contributing

${data.contributing}

## Tests

${data.tests}

## Questions

For any questions, please reach out to:

- [GitHub: ${data.github}](https://github.com/${data.github})
- Email: ${data.email}
`;
};

const init = () => {
  promptUser()
    .then((answers) => writeFile('README.md', generateMarkdown(answers)))
    .then(() => console.log('Successfully wrote to README.md'))
    .catch((err) => console.error(err));
};

init();





module.exports = generateMarkdown;
