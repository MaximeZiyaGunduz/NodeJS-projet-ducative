

//########################################################################################################################
//Import de paquet

const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;   //récupére ID de l'objet

const { PostsModel } = require('../models/postsModel');

//########################################################################################################################

// get() c ce qu'il y'a ecrit dans URL, ici ci y'a '/' il va executer la la méthode est chercher si y'a une erreur dans le
//1er paramétre, si y'a pas d'erreur dans le cas correct (docs) il va afficher le docs (contenant le contenu de la BDD) 
//dans la console

router.get('/', (req, res) => {   // get c ce qu'il y'a ecrit dans URL
    PostsModel.find((err, docs) => {
        if(!err){
            console.log(docs);
            res.send(docs);  //envoie comme resultat docs
        }
        else{
            console.log("Erreur pour get Data ",+err);  //cas erreur
        }

    })
});

//########################################################################################################################
//Intéraction avec la BDD

// Pour Poster des choses dans la BDD
router.post('/', (req, res) => {
    const newRecord = new PostsModel({  //Nouvel enregistrement dans PostsModel
      author: req.body.author,
      message: req.body.message
    });
  
    newRecord.save((err, docs) => { // On enregistre notre data (newRecord), 
      if (!err)
         res.send(docs);
      else
         console.log('Error creating new data : ' + err);
    })
  });
  
  
  
  // update d'un poste
  router.put("/:id", (req, res) => {  //Mise a jour d'un donnée, la donnée a remplacer et identifier par un Id (chemin dynamique)
    if (!ObjectID.isValid(req.params.id))  // En cas de erreur (connais pas ID)
      return res.status(400).send("ID unknow : " + req.params.id)
    
    const updateRecord = {    // On enregistre la Mise a Jour avec  
      author: req.body.author,
      message: req.body.message
    };
  
    PostsModel.findByIdAndUpdate(  //Met a Jour la PostsModels
      req.params.id,
      { $set: updateRecord},
      { new: true },
      (err, docs) => {
        if (!err)
             res.send(docs);  // Mise a Jour OK
        else
             console.log("Update error : " + err); //Mise a Jour Erreur
      }
    )
  });
  
  //Suppression d'un donnée
  router.delete("/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id))    // En cas de erreur (connais pas ID)
      return res.status(400).send("ID unknow : " + req.params.id)
    
    PostsModel.findByIdAndRemove(  //Suppression dans PostsModels
      req.params.id,
      (err, docs) => {
        if (!err) 
            res.send(docs);   //Suppression OK
        else
             console.log("Delete error : " + err);  //Suppresion erreur
      })
  });

//########################################################################################################################

//Exportation de router pour avoir accés de n'importe ou dans l'app (nous dans l'index)
module.exports=router;