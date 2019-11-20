import axios from 'axios';
import { withHandling } from './utils';

const http = axios.create({
  baseURL: 'https://us-central1-atm-backend-2cc1b.cloudfunctions.net/'
});

class WithdrawAPI {
  static async withdraw(amount) {
    const result = await withHandling(http.post('withdraw', { amount }));
    return result;
  }
}

export default WithdrawAPI;
