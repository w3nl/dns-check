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
var servers = require('../servers.json');

var DnsCheck = function(domain) {
    'use strict';

    dns.resolve4(domain, function(err, addresses) {
        if (err) {
            throw err;
        }

        addresses.forEach(function(a) {
            dns.reverse(a, function(err, domains) {
                if (err) {
                    console.log('reverse for ' + a + ' failed: ' + err.message);
                } else {
                    console.log('reverse for ' + a + ': ' + JSON.stringify(domains));
                    console.log('server: ' + servers[a]);
                }
            });
        });
    });
};

vorpal
  .command('check [domain]', 'Check the dns.')
  .action(function(args, callback) {
      new DnsCheck(args.domain);
      callback();
  });

vorpal
  .delimiter('dns$')
  .show();
