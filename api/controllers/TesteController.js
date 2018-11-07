/**
 * TesteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  index: function(requisicao, resposta) {
    var lista = [
      "Led Zepellin",
      "ACDC",
      "Guns'n'Roses",
      "Furacão 2000",
      "Kalipso"
    ]
    resposta.view("pages/teste/index",
      {
        titulo: "Bandas",
        bandas: lista,
        parametros: Object.keys(
          requisicao.allParams()
        ),
        requisicao: requisicao
      })
  } 

};











