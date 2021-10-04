const inquirer = require('inquirer');
const { command } = require('../helpers/questions');
const Robot = require('./Robot');

const { log, error, info, logTitle, success, buildPlaceObject } = require('../helpers/utils');

let robot = null
/**
 * @description displays a prompt for the user to enter a command
 */
const showMenuPrompt = async () => {
    const cmd = await inquirer.prompt(command);

    log('\nCommand To Execute: ', cmd.action.toUpperCase());

    if (cmd.action.toUpperCase() === 'EXIT') return exit();

    if (!robot.placed && !cmd.action.toUpperCase().includes('PLACE')) {
        error('\nRobot must be placed with the PLACE command before making any moves\n');
        return showMenuPrompt();
    }
    parseCommandsFromPrompt(cmd.action.toUpperCase());
};

/**
 * @description checks the command for multiple commands
*/

const hasMultipleCommands = (command) => {
    if (/(s|PLACE )([0-9],)([0-9],)([A-Z]{4})/.test(command)) {
        return command.replace(/(s|PLACE )([0-9],)([0-9],)([A-Z]{4})/, '').trim().split(' ').length > 1;
    } else if (!/(s|PLACE )([0-9],)([0-9],)([A-Z]{4})/.test(command) && command.split(" ").length > 1) {
        return true;
    }
    return false;
}

/**
 * @description Parse the command 
*/
const parseCommandsFromPrompt = (command) => {
    if (hasMultipleCommands(command)) {
        error('[ERROR] Please enter one command only');
        return showMenuPrompt();
    }

    if (!command.includes('PLACE') && !robot.placed) {
        info(`Skipping command ${command}, robot must be placed first`);
    }

    info(`Executing ${command.trim()}`);

    executeCommand(command.trim());

    info('Command Execution Completed');
    return showMenuPrompt();
}

/**
 * @description Executes a given command 
*/
const executeCommand = (command) => {
    if (command.includes('PLACE')) {
        robot.placed = true
        let placeData = buildPlaceObject(command.split(/[ ,]+/));
        robot.place(placeData.x, placeData.y, placeData.direction);
    } else {
        switch (command) {
            case 'MOVE':
                robot.move();
                break;
            case 'LEFT':
                robot.left();
                break;
            case 'RIGHT':
                robot.right();
                break;
            case 'REPORT':
                success('Reporting Current Location');
                success(robot.report());
                break;
            default:
                error('\n[ERROR]: Invalid command detected\n');
                break;
        }
    }
}
/**
 * @description Exit the app 
*/
const exit = () => {
    success('Exiting application');
    return process.exit();
}
/**
 * @description Start the simulation 
*/
const simulationInit = () => {
    logTitle('Toy Robot \n');
    robot = new Robot()
    return showMenuPrompt();
}
module.exports = { simulationInit };