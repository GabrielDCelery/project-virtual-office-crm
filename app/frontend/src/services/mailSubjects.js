import axios from 'axios';

class MailSubjects {
  async findAll() {
    const { data } = await axios({
      method: 'GET',
      url: `/api/mailSubjects/findAll`,
      responseType: 'json'
    });

    const { success, payload, errors } = data;

    return { success, payload, errors };
  }
}

export default new MailSubjects();
