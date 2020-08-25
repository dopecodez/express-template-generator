const meow = require('meow');
const np = require('.');

const cli = meow(`
	Usage
	  $ create-express-app <folderName>

	  Version can be:
	    Folder name can be anything without a space

	Options
      --template            Name of the template(default:TypeScript)
      --default             Use default template
      --yarn                User Yarn

	Examples
	  $ create-express-app
	  $ create-express-app my-app
	  $ create-express-app my-app -d
	  $ create-express-app my-app template="TypeScript-Inversify-TypeORM" -y
`, {
	flags: {
		template: {
			type: 'string'
		},
		default: {
            type: 'boolean',
            alias: 'd'
        },
        yarn: {
            type: 'boolean',
            alias: 'y'
		}
	}
});

(async () => {
	const defaultFlags = {
        default: false,
        yarn: false
	};

	const flags = {
		...defaultFlags,
		...cli.flags
	};

	const destFolder = cli.input.length > 0 ? cli.input[0] : false;

	const options = await ui({
		...flags,
		destinationFolder
    });

    console.log(); // Prints a newline for readability
	const newPkg = await create(options.version, options);
})