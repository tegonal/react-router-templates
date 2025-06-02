// i18next-parser.config.js
export default {
	contextSeparator: '_',
	// Key separator used in your translation keys

	createOldCatalogs: true,
	// Save the \_old files

	customValueTemplate: null,
	// Default namespace used in your i18next config

	defaultNamespace: 'common',
	// Default value to give to keys with no value
	// You may also specify a function accepting the locale, namespace, key, and value as arguments

	defaultValue: '',
	// Indentation of the catalog files

	failOnUpdate: false,
	// Keep keys from the catalog that are no longer in code
	// You may either specify a boolean to keep or discard all removed keys.
	// You may also specify an array of patterns: the keys from the catalog that are no long in the code but match one of the patterns will be kept.
	// The patterns are applied to the full key including the namespace, the parent keys and the separators.

	failOnWarnings: false,
	// Key separator used in your translation keys
	// If you want to use plain english keys, separators such as `.` and `:` will conflict. You might want to set `keySeparator: false` and `namespaceSeparator: false`. That way, `t('Status: Loading...')` will not think that there are a namespace and three separator dots for instance.

	i18nextOptions: null,

	indentation: 2,
	// Control the line ending. See options at https://github.com/ryanve/eol

	input: undefined,
	// An array of the locales in your applications

	keepRemoved: false,
	// Namespace separator used in your translation keys
	// If you want to use plain english keys, separators such as `.` and `:` will conflict. You might want to set `keySeparator: false` and `namespaceSeparator: false`. That way, `t('Status: Loading...')` will not think that there are a namespace and three separator dots for instance.

	keySeparator: '.',
	// Supports $LOCALE and $NAMESPACE injection
	// Supports JSON (.json) and YAML (.yml) file formats
	// Where to write the locale files relative to process.cwd()

	// see below for more details
	lexers: {
		default: ['JavascriptLexer'],
		handlebars: ['HandlebarsLexer'],

		hbs: ['HandlebarsLexer'],
		htm: ['HTMLLexer'],

		html: ['HTMLLexer'],
		js: ['JavascriptLexer'], // if you're writing jsx inside .js files, change this to JsxLexer
		jsx: ['JsxLexer'],
		mjs: ['JavascriptLexer'],
		ts: ['JavascriptLexer'],

		tsx: ['JsxLexer'],
	},
	// Plural separator used in your translation keys
	// If you want to use plain english keys, separators such as `_` might conflict. You might want to set `pluralSeparator` to a different string that does not occur in your keys.
	// If you don't want to generate keys for plurals (for example, in case you are using ICU format), set `pluralSeparator: false`.

	lineEnding: 'auto',
	// An array of globs that describe where to look for source files
	// relative to the location of the configuration file

	locales: ['en', 'de'],
	// Whether or not to sort the catalog. Can also be a [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#parameters)

	namespaceSeparator: ':',
	// Display info about the parsing including some stats

	output: './app/locales/$LOCALE/$NAMESPACE.json',
	// Exit with an exit code of 1 on warnings

	pluralSeparator: '_',
	// Exit with an exit code of 1 when translations are updated (for CI purpose)

	resetDefaultValueLocale: null,
	// If you wish to customize the value output the value as an object, you can set your own format.
	//
	// - ${defaultValue} is the default value you set in your translation function.
	// - ${filePaths} will be expanded to an array that contains the absolute
	//   file paths where the translations originated in, in case e.g., you need
	//   to provide translators with context
	//
	// Any other custom property will be automatically extracted from the 2nd
	// argument of your `t()` function or tOptions in <Trans tOptions={...} />
	//
	// Example:
	// For `t('my-key', {maxLength: 150, defaultValue: 'Hello'})` in
	// /path/to/your/file.js,
	//
	// Using the following customValueTemplate:
	//
	// customValueTemplate: {
	//   message: "${defaultValue}",
	//   description: "${maxLength}",
	//   paths: "${filePaths}",
	// }
	//
	// Will result in the following item being extracted:
	//
	// "my-key": {
	//   "message": "Hello",
	//   "description": 150,
	//   "paths": ["/path/to/your/file.js"]
	// }

	sort: true,
	// The locale to compare with default values to determine whether a default value has been changed.
	// If this is set and a default value differs from a translation in the specified locale, all entries
	// for that key across locales are reset to the default value, and existing translations are moved to
	// the `_old` file.

	verbose: false,
	// If you wish to customize options in internally used i18next instance, you can define an object with any
	// configuration property supported by i18next (https://www.i18next.com/overview/configuration-options).
	// { compatibilityJSON: 'v3' } can be used to generate v3 compatible plurals.

	yamlOptions: null,
	// If you wish to customize options for yaml output, you can define an object here.
	// Configuration options are here (https://github.com/nodeca/js-yaml#dump-object---options-).
	// Example:
	// {
	//   lineWidth: -1,
	// }
}
