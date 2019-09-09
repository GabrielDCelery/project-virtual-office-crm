import axios from 'axios';

class LegalEntities {
  async getAllVersionsOfAllEntities() {
    const { data } = await axios({
      method: 'GET',
      url: `/api/legalEntities/getAllVersionsOfAllEntities`,
      responseType: 'json'
    });

    const { success, payload, errors } = data;

    return { success, payload, errors };
  }
}

export default new LegalEntities();
