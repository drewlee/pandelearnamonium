/**
 * @typedef {{
 *  current: number,
 *  previous: number,
 * }} JSONTimeFrameEntryType
 * @typedef {{
 *  daily: JSONTimeFrameEntryType,
 *  weekly: JSONTimeFrameEntryType,
 *  monthly: JSONTimeFrameEntryType,
 * }} JSONTimeFrameType
 * @typedef {{
 *  title: string,
 *  timeframes: JSONTimeFrameType
 * }} JSONRecordType
 * @typedef {{
 *  title: string,
 *  current: number,
 *  previous: number,
 * }} TimeFrameActivityType
 * @typedef {Record<string, TimeFrameActivityType[]>} TimeFrameRecordType
 */

class App {
  /**
   * Triggers a fetch request for time tracking dashboard data.
   *
   * @returns {Promise<JSONRecordType[]>} The response JSON as a promise.
   */
  async #fetchJsonData() {
    const response = await fetch('../../../fementor-time-tracking-dashboard-data.json');

    if (response.ok) {
      return response.json();
    }
  }

  /**
   * Processes the response JSON into a format that can be consumed by the UI.
   *
   * @param {JSONRecordType[]} json - The response JSON.
   * @returns {TimeFrameRecordType} The formatted data.
   */
  #formatJsonData(json) {
    /** @type {TimeFrameRecordType} */
    const initial = {
      daily: [],
      weekly: [],
      monthly: [],
    };

    const data = json.reduce((data, { title, timeframes }) => {
      return Object.entries(timeframes).reduce((data, [key, value]) => {
        data[key].push({ title, ...value });

        return data;
      }, data);
    }, initial);

    return data;
  }

  /**
   * The public interface for retrieving and processing time tracking dashboard data.
   *
   * @returns {Promise<TimeFrameRecordType>} The formatted data.
   */
  async getDashboardData() {
    const data = await this.#fetchJsonData();
    const formattedData = this.#formatJsonData(data);

    return formattedData;
  }
}

const app = new App();

export default app;
