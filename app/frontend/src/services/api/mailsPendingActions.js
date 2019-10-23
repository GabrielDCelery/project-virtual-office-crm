import axios from 'axios';

class MailsPendingActions {
  async findAllPendingEmailNotifications() {
    const { data } = await axios({
      method: 'GET',
      url: `/api/mailsPendingActions/findAllPendingEmailNotifications`,
      responseType: 'json'
    });

    const { success, payload, errors } = data;

    return { success, payload, errors };
  }
}

export default new MailsPendingActions();
