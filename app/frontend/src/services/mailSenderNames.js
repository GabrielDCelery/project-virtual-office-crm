import axios from 'axios';

class MailSenderNames {
  async findAll() {
    const { data } = await axios({
      method: 'GET',
      url: `/api/mailSenderNames/findAll`,
      responseType: 'json'
    });

    const { success, payload, errors } = data;

    return { success, payload, errors };
  }
}

export default new MailSenderNames();
