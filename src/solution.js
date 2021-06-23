// Please implement your solution in this file
import './types'

/**
 * Fetch SpaceX launches from https://api.spacexdata.com/v3/launches/past
 *
 * @see https://docs.spacexdata.com/?version=latest#fce450d6-e064-499a-b88d-34cc22991bcc for Space X API Reference
 *
 * @returns {Launch[]} Launches
 */
async function fetchSpaceXLaunches() {
  const response = await fetch('https://api.spacexdata.com/v3/launches/past')
  const json = await response.json()
  return json
}

/**
 * Maps launches that had `launch_year` 2018 and at least one NASA payload to missions
 * 
 * @param {Launch[]} launches - Launches
 *
 * @returns {Mission} Missions
 */
function prepareData(launches) {
  return launches
  .filter(launch => launch.launch_year === '2018')
  .map(launch => {
    const result = {
      flight_number: launch.flight_number,
      mission_name: launch.mission_name,
      payloads_count: 0,
      launch_date_utc: launch.launch_date_utc
    }
    const payloads = launch.rocket.second_stage.payloads
    const hasNasaPayload = payloads.some(isNASAPayload)
    result.payloads_count = hasNasaPayload ? payloads.length : 0
    return result
  })
  .filter(mission => mission.payloads_count > 0)
  .sort(missionSorter)
  .map(({ flight_number, mission_name, payloads_count }) => ({ flight_number, mission_name, payloads_count }))
}

/**
 * Payloads are belong to NASA when there is at least one consumer that have `NASA` as part as its name
 *
 * E.g. payload consumers might be `NASA` or `NASA (CRS)`
 * 
 * @param {Payload} payload - Payload 
 */
function isNASAPayload(payload) {
  return payload.customers.some(customer => customer.includes('NASA'))
}

/**
 * Sorts two mission in inverse chronological order based on their `launch_date_utc` property 
 * with the exception that those that carried more payloads (`payloads_count`) should appear first.
 * 
 * @param {Mission} a - First mission to compare
 * @param {Mission} b - Second mission to compare
 * 
 * @returns {number} Negative value if first argument is less than second argument,
 * zero if they're equal and a positive value otherwise.
 */
function missionSorter(a, b) {
  if (b.payloads_count === a.payloads_count) {
    return new Date(b.launch_date_utc) - new Date(a.launch_date_utc)
  }
  return b.payloads_count - a.payloads_count
}

/**
 * Calls `JSON.stringify` to pretty print the `data` and assigns the result
 * to `innerHTML` of the element on the page with id `out`
 *
 * @param {Object} data - JS data to render
 */
function renderData(data) {
  const root = window.document.getElementById('out')
  root.innerHTML = JSON.stringify(data, null, 2)
}

module.exports = {
  prepareData: prepareData,
  renderData: renderData,
  fetchSpaceXLaunches: fetchSpaceXLaunches
};
