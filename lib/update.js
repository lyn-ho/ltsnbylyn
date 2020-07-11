/**
 * 拿到所有的 Node 版本
 * url: https://nodejs.org/dist/index.json
 *
 * dependencies: axios, compare-versions
 */

const axios = require('axios')
const compareVersions = require('compare-versions')

module.exports = async (version) => {
  const { data } = await axios('https://nodejs.org/dist/index.json')

  console.log(data)
  return data
    .filter((node) => {
      const comp = version ? compareVersions(node.version, `v${v}.0.0`) >= 0 : true

      return node.lts && comp
    })
    .map((it) => {
      const { files, ...rest } = it
      return { ...rest }
    })
}
