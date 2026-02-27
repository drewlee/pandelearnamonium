import * as AppDataType from './app-data-types.js';

class AppData {
  /**
   * Fetches the JSON data for the application.
   *
   * @returns The application data object.
   */
  async getAppData(): Promise<AppDataType.Data | null> {
    let data: AppDataType.Data | null = null;

    try {
      const response = await fetch(
        '../../../fementor-frontend-quiz-app/fementor-frontend-quiz-app-data.json',
      );

      if (response.ok) {
        data = (await response.json()) as AppDataType.Data;
      }
    } catch (error) {
      console.error(error);
    }

    return data;
  }
}

const data = new AppData();

export default data;
