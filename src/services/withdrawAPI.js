import axios from 'axios';

const http = axios.create({
  baseURL: 'https://us-central1-atm-backend-2cc1b.cloudfunctions.net/'
});

class WithdrawAPI {
  static withdraw(amount) {
    return http.post('withdraw', { amount });
  }
}

export default WithdrawAPI;
