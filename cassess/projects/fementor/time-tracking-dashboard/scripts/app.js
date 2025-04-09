class App {
  /**
   * Triggers a fetch request for time tracking dashboard data.
   *
   * @returns {Promise<unknown[]>} The response JSON as a promise.
   */
  async #fetchJsonData() {
    const response = await fetch('./data.json');

    if (response.ok) {
      return response.json();
    }
  }

  /**
   * Processes the response JSON into a format that can be consumed by the UI.
   *
   * @param {object} json - The response JSON.
   * @returns {Record<string, object>} The formatted data.
   */
  #formatJsonData(json) {
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
   * @returns {Promise<Record<string, object>>} The formatted data.
   */
  async getDashboardData() {
    const data = await this.#fetchJsonData();
    const formattedData = this.#formatJsonData(data);

    return formattedData;
  }
}

const app = new App();

export default app;
