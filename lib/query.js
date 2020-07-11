/**
 * 对数据的二次加工格式化
 *
 * dependencies: cli-table
 */

const Table = require('cli-table')

module.exports = (dists) => {
  if (!dists || !dists.length) return

  const keys = Object.keys(dists[0])

  const table = new Table({ head: keys })

  return dists
    .reduce((acc, cur) => {
      table.push(Object.values(cur))
      return acc
    }, table)
    .toString()
}
