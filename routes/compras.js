var express = require('express');
var router = express.Router();
var pagarme = require('../lib/pagarme');

/* POST criação de compra */
router.post('/', function(req, res, next) {
  pagarme.compra(req.body).then((result) => {
    
    const paymentId = result.data.id;
    const amount = result.data.amount;
    
    pagarme.captura(paymentId, amount)
    .then((result) => {
      if (result.data.status == 'paid'){
        res.status(201).send({
          "Status": "Sucesso",
          "Message": "Compra realizada com sucesso.",
          "CompraId": paymentId
        });
      }
      else {
        res.status(402).send({
          "Status": "Falhou",
          "Message": "Compra não realizada, problema na cobrança de cartão de crédito."
        });
      }
    })
    .catch((err) => {
      console.error(err);
    })
  })
  .catch(function (error) {
    console.error(error);
  });
});

/* GET status de compra */
router.get('/:compra_id/status', function(req, res, next) {
  pagarme.consulta(req.params.compra_id)
  .then((result) => {
    let message = {}
    switch (result.data.status){
      case 'authorized':
        message = {
          'Status': 'Pagamento autorizado.'
        };
        break;
      case 'paid':
        message = {
          'Status': 'Pagamento realizado.'
        };
        break;
      case 'processing':
      case 'analyzing':
        message = {
          'Status': 'Pagamento pendente.'
        };
        break;
      default: 
        message = {  
          'Status': 'Pagamento falhou.'
        }
    }
    res.send(message);
  })
  .catch(function (error) {
    console.error(error);
  });
});

module.exports = router;
