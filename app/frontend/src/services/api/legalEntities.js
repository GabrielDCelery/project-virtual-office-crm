import axios from 'axios';

class LegalEntities {
  async getAllVersionsOfAllRecords() {
    const { data } = await axios({
      method: 'GET',
      url: `/api/legalEntities/getAllVersionsOfAllRecords`,
      responseType: 'json'
    });

    const { success, payload, errors } = data;

    return { success, payload, errors };
  }
}

export default new LegalEntities();
