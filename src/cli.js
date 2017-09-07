"use strict";

const minimist = require("minimist");

const prettier = eval("require")("../index");
const constant = require("./cli-constant");
const util = require("./cli-util");
const validator = require("./cli-validator");

function run(args) {
  const argv = minimist(args, constant.options);
  argv.__args = args;
  argv.__filePatterns = argv["_"];

  validator.validateArgv(argv);

  if (argv["version"]) {
    console.log(prettier.version);
    process.exit(0);
  }

  if (argv["help"]) {
    console.log(constant.usage);
    process.exit(0);
  }

  const hasFilePatterns = argv.__filePatterns.length !== 0;
  const useStdin = argv["stdin"] || (!hasFilePatterns && !process.stdin.isTTY);

  if (argv["find-config-path"]) {
    util.resolveConfig(argv["find-config-path"]);
  } else if (useStdin) {
    util.formatStdin(argv);
  } else if (hasFilePatterns) {
    util.formatFiles(argv);
  } else {
    console.log(constant.usage);
    process.exit(1);
  }
}

module.exports = {
  run
};
