#!/usr/bin/env node
'use strict';
const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const meow = require('meow');

const ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ brish-brush

	Options
		--name  Your name

	Examples
	  $ brish-brush --name=Jane
	  Hello, Jane
`);

render(React.createElement(ui, cli.flags));
