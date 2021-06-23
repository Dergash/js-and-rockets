// Please run your solution from this file
const {fetchSpaceXLaunches, prepareData, renderData} = require('./solution.js')

run()

async function run() {
    const launches = await fetchSpaceXLaunches()
    const data = prepareData(launches)
    renderData(data)
}
