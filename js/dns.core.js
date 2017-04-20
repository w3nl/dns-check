#!/usr/bin/env node

/**
 *  Check the dns.
 *
 * @param {string} domain
 *
 * @return {object}
 */
var dns = require('dns');
var program = require('commander');

var DnsCheck = function(domain) {
    'use strict';

    dns.resolve4(domain, function(err, addresses) {
        if (err) {
            throw err;
        }

        console.log('addresses: ' + JSON.stringify(addresses));

        addresses.forEach(function(a) {
            dns.reverse(a, function(err, domains) {
                if (err) {
                    console.log('reverse for ' + a + ' failed: ' + err.message);
                } else {
                    console.log('reverse for ' + a + ': ' + JSON.stringify(domains));
                }
            });
        });
    });
};

program
  .version('0.0.1')
  .command('<cmd> [domain]')
  .action(function(cmd, domain) {
      console.log(cmd, domain);

      new DnsCheck(domain);
  });

program.parse(process.argv);
