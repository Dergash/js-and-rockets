/**
 * I omit properties that are not important for this exercise
 */

/**
 * Mission is essentially a `Launch` with calculated `payloads_count` and majority of fields omitted.
 *
 * It is not obvious from the API that launch is mapped to mission one to one and each launch has a dedicated
 * mission, though it is implied through `flight_number` field in sample output for this exercise.
 *
 * @typedef {Object} Mission
 * @property {number} flight_number - Flight number
 * @property {string} mission_name - Mission name
 * @property {payloads_count} payloads_count - Number of payloads
 * 
 */

/**
 * Response from Space X API of past launches
 * 
 * @typedef {Object} Launch
 * @property {number} flight_number - Flight number
 * @property {string} mission_name - Mission name
 * @property {string} launch_date_utc - UTC ISO timestamp
 * @property {string} launch_year - Launch year
 * @property {Rocket} rocket - Rocket
 */

/**
 * Rocket that was used in launch
 * 
 * @typedef {Object} Rocket
 * @property {SecondStage} second_stage Second Stage
 */

/**
 * Second stage of the rocket
 * 
 * @typedef {Object} SecondStage
 * @property {Payload[]} payloads - Payload that second stage of the rocket carried
 */

/**
 * Rocket payload
 * 
 * @typedef {Object} Payload
 * @property {string[]} customers - Customers who own carried payload
 */
