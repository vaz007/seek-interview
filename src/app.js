require('dotenv').config()
const path = require('path');
const Simulation = require('./modules/Simulation');
const argv = require('yargs')
.usage('Usage: $0 <command> [Options]')
    .command('run', 'Run the simulation', {
        prompt: {
            alias: 'p',
            description: 'Run commands through prompt'
        },
        file: {
            alias: 'f',
            description: 'Run commands from a text file'
        }
    })
    .check((argv) => {
        if (argv.f && argv.f === true) {
            return new Error('[ERROR] no file was passed through');
        }
        
        if (argv.f && path.extname(argv.f) !== '.txt') {
			return new Error('[ERROR] File must be of type .txt');
		}
        return true;
    })
	.example('run', 'Run commands automatically from prompt')
	.example('run -p', 'Run commands from prompt')
	.example('run -f src/commands.txt', 'Run instructions from a txt file')
	.options({
		help: {
			alias: 'h',
			describe: 'Get the help screen',
		}
	})
    .demandCommand(1, 'You need at least the run command to begin the app').argv;


/** Run the simulation */
console.log(process.env.GRID_BOUNDARIES)
const simulation = new Simulation(process.env.GRID_BOUNDARIES, argv.file || null);
simulation.run();