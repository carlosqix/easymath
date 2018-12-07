/**
 * PessoaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function(req, res) {
    Pessoa.find().then(function(data) {
      res.view("pages/pessoa/index",
        {
          notice: req.param("notice"),
          pessoas: data
        });
    });
  },
  new: function(req, res) {
    res.view("pages/pessoa/new");
  },
  edit: async function(req, res) {
    var pkid = parseInt(req.param('id'))
    if (pkid && !isNaN(pkid)) {
        var p = await Pessoa.findOne({
            id: pkid
        });
            if (p) {
              res.view("pages/pessoa/edit", {
                pessoa: p
              });
            } else {
              res.redirect("/pessoa?notice=Erro.");
            }
    } else {
        res.redirect("/pessoa?notice=Não encontrado.");
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
      Pessoa.update({
        id: pkid
      }, model).exec(function(err, newmodel){
        if (!err) {
          res.redirect(
              "/pessoa?notice=Salvo com Sucesso!"
            );
        }else {
          res.redirect(
              "/pessoa?notice=Erro!"
            );
        }
      });
  } else{
    Pessoa.create(model).exec(function(err, newmodel) {
      if (!err) { // Salvou!
        console.log(newmodel);
          res.redirect(
            "/pessoa?notice=Salvo com sucesso!"
          );
      } else { // Não Salvou!
      }
    });
  }
},
  delete: async function(req, res) {
    var pkid = parseInt(req.param('id'))
    if (pkid && !isNaN(pkid)) {
        Pessoa.destroy({
            id: pkid
        }).exec(function(err) {
            if (!err) {
              res.redirect("/pessoa?notice=Removido.");
            } else {
              res.redirect("/pessoa?notice=Erro.");
            }
        });
    } else {
        res.redirect("/pessoa?notice=Não encontrado.");
    }
  }

};

