#!/usr/bin/env node

const color = require('cli-color')
const pkg = require('../package.json')

const { query, update } = require('..')

/**
 * 输出结果到命令行窗口
 */
function printResult(version) {
  update(version).then((dists) => {
    const results = query(dists)
    console.log(results)
    process.exit()
  })
}

/**
 *
 */
function printVersion() {
  console.log(color.bold('ltsn ' + pkg.version))
  process.exit()
}

/**
 *
 */
function printHelp() {
  const lines = [
    '',
    '  Usage:',
    '    ltsn [8]',
    '',
    '  Options:',
    '    -v, --version             print the version of vc',
    '    -h, --help                display this message',
    '',
    '  Examples:',
    '    $ ltsn 8',
    '',
  ]

  console.log(lines.join('\n'))
  process.exit(code || 0)
}

function main(argv) {
  if (!argv || !argv.length) {
    printHelp(1)
  }

  const getArg = function() {
    let args = argv.shift()

    args = args.split('=')
    if (args.length > 1) {
      argv.unshift(args.slice(1).join('='))
    }
    return args[0]
  }

  let arg

  while (argv.length) {
    arg = getArg()
    switch (arg) {
      case '-v':
      case '-V':
      case '--version':
        printVersion()

        break
      case '-h':
      case '-H':
      case '--help':
        printHelp()

        break
      default:
        printResult(arg)

        break
    }
  }
}

main(process.argv.slice(2))

module.exports = main
