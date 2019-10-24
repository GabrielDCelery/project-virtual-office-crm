import axios from 'axios';

class Mails {
  async create(formData) {
    const { data } = await axios({
      method: 'POST',
      url: `/api/mails/create`,
      responseType: 'json',
      data: formData
    });

    const { success, payload, errors } = data;

    return { success, payload, errors };
  }

  async sendEmailNotifications({ ids }) {
    const { data } = await axios({
      method: 'POST',
      url: `/api/mails/sendEmailNotifications`,
      responseType: 'json',
      data: { ids }
    });

    const { success, payload, errors } = data;

    return { success, payload, errors };
  }
}

export default new Mails();
