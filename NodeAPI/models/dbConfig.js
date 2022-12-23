// Fichier qui crée une connection a la BDD

//############################################################################################################

//Import du Paquet Mongoose

const { default: mongoose } = require('mongoose');
const Mongoose = require('mongoose');

//############################################################################################################

mongoose.connect(
    "mongodb://localhost:27017/node-api",  //Mettre le lien pour ce co a la BDD
    { useNewUrlParser:true , useUnifiedTopology:true}, //Ligne Obligatoire, pas chercher a comprendre
    (err)=>{        //CallBack si tout va bien et que on est co a la BDD
        if(!err)    
            console.log("Connecté a MongoDB");
        else
            console.log("erreur de Connection a MongoDB");
    }
)

