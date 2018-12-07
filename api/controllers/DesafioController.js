/**
 * DesafioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function(req, res) {
    Desafio.find().then(function(data) {
      res.view("pages/desafio/index",
        {
          notice: req.param("notice"),
          desafios: data
        });
    });
  },
  new: function(req, res) {
    res.view("pages/desafio/new");
  },
  edit: async function(req, res) {
    var pkid = parseInt(req.param('id'))
    if (pkid && !isNaN(pkid)) {
        var p = await Desafio.findOne({
            id: pkid
        });
            if (p) {
              res.view("pages/desafio/edit", {
                pessoa: p
              });
            } else {
              res.redirect("/desafio?notice=Erro.");
            }
    } else {
        res.redirect("/desafio?notice=Não encontrado.");
    }
  },
  saveOrUpdate: function(req, res) {
    var pkid = parseInt(req.param("id"));
    var model = {
      nome: req.param("nome"),
      sobrenome: req.param("sobrenome"),
      sexo: req.param("sexo")
    }
    if (pkid > 0){
      Desafio.update({
        id: pkid
      }, model).exec(function(err, newmodel){
        if (!err) {
          res.redirect(
              "/desafio?notice=Salvo com Sucesso!"
            );
        }else {
          res.redirect(
              "/desafio?notice=Erro!"
            );
        }
      });
  } else{
    Desafio.create(model).exec(function(err, newmodel) {
      if (!err) { // Salvou!
        console.log(newmodel);
          res.redirect(
            "/desafio?notice=Salvo com sucesso!"
          );
      } else { // Não Salvou!
      }
    });
  }
},
  delete: async function(req, res) {
    var pkid = parseInt(req.param('id'))
    if (pkid && !isNaN(pkid)) {
        Desafio.destroy({
            id: pkid
        }).exec(function(err) {
            if (!err) {
              res.redirect("/desafio?notice=Removido.");
            } else {
              res.redirect("/desafio?notice=Erro.");
            }
        });
    } else {
        res.redirect("/desafio?notice=Não encontrado.");
    }
  }

};

