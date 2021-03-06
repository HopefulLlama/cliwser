module.exports = {
	env: {
		es6: true,
		node: true,
		jest: true,
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 6,
	},
	rules: {
		'no-console': ['off'],
		'prefer-const': ['error'],
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'windows'],
		quotes: ['off'],
		semi: ['error', 'always'],
		'prettier/prettier': [
			'warn',
			{
				useTabs: true,
				tabWidth: 2,
				singleQuote: true,
				trailingComma: 'es5',
				printWidth: 120,
			},
		],
	},
};
