#!/usr/bin/env node

'use strict';
/**
 *  Check the dns.
 *
 * @param {string} domain
 *
 * @return {object}
 */
var dns = require('dns');
var vorpal = require('vorpal')();
var DnsCheck = require(__dirname + '/dns.core');
var servers = require('../servers.json');

vorpal
  .command('check [domain]', 'Check the dns.')
  .action(function(args, callback) {
      new DnsCheck(args.domain);
      callback();
  });

vorpal
  .delimiter('dns$')
  .show();
