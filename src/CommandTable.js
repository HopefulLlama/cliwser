const HtmlUtils = require('./HtmlUtils');

class CommandTable {
	constructor(browser, page) {
		this.browser = browser;
		this.page = page;
		this.commands = {
			goto: args => {
				const url = args[0];

				return this.page.goto(url).then(() => this.commands.render());
			},
			render: () => {
				return (
					this.page
						// eslint-disable-next-line no-undef
						.evaluate(() => document.documentElement.outerHTML)
						.then(data => HtmlUtils.prettyPrintHtml(data))
				);
			},
			exit: () => {
				return this.browser.close().then(() => {
					console.log('Goodbye from cliwser.');
					process.exit(0);
				});
			},
		};
	}

	safeExecute(input) {
		const args = input['input'].split(' ');
		const command = args.shift();

		if (this.commands[command] !== undefined) {
			return this.commands[command](args).catch(err => console.log(err));
		} else {
			return Promise.resolve(() => {
				console.log(`${command} not recognised.`);
			});
		}
	}
}

module.exports = CommandTable;
