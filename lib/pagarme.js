const axios = require('axios');

class Pagarme {
  static compra(params){    
    return axios.post('https://api.pagar.me/1/transactions', 
      params,
      {
        headers: { 
          'Content-Type': 'application/json'
        }
      }
    )
  }

  static captura(paymentId, amount){    
    return axios.post('https://api.pagar.me/1/transactions/' + paymentId + '/capture', 
      {
        amount: amount,
        api_key: ''
      },
      {
        headers: { 
          'Content-Type': 'application/json'
        }
      }
    )
  }

  static consulta(paymentId){    
    return axios.get('https://api.pagar.me/1/transactions/' + paymentId, 
      {
        params: {
          api_key: '',
        },
        headers: { 
          'Content-Type': 'application/json'
        }
      }
    )
  }
}

module.exports = Pagarme;