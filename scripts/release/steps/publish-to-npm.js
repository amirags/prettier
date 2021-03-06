"use strict";

const chalk = require("chalk");
const dedent = require("dedent");
const execa = require("execa");
const { logPromise, waitForEnter } = require("../utils");

module.exports = async function({ dry, version }) {
  if (dry) {
    return;
  }

  await logPromise(
    "Publishing to npm",
    execa("npm", ["publish"], { cwd: "./dist" })
  );

  console.log(
    dedent(chalk`
      {green.bold Prettier ${version} published!}

      {yellow.bold Some manual steps are necessary.}

      {bold.underline Create a GitHub Release}
      - Go to {cyan.underline https://github.com/prettier/prettier/releases/new?tag=${version}}
      - Copy release notes from {yellow CHANGELOG.md}
      - Attach all files in {yellow dist/} folder.
      - Press {bgGreen.black  Publish release }

      {bold.underline Test the new releae}
      - In a new session, run {yellow npm i prettier@latest} in another directory
      - Test the API and CLI

      After that, we can proceed to bump this repo's Prettier dependency.
      Press any key to continue.
    `)
  );
  await waitForEnter();
};
