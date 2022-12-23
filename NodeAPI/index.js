//########################################################################################################################
//Import de paquet

const express=require('express');
const app = express();
require('./models/dbConfig'); // On passe le fichier pour ce co a la BDD
const postsRoutes=require('./routes/postsController');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors = require('cors');  //Pour rendre accesible API depuis internet

//########################################################################################################################
// Nos Middlewares

mongoose.set('useFindAndModify', false);  //Important pour modifier et supprimer une donnée

app.use(bodyParser.json());    //Permet de parser tout nos element dans req et res

app.use(cors());   //Pour rendre accesible API depuis internet a tout le monde

app.use('/posts', postsRoutes);  // Quand notre application est sur le /, tu nous envoie un postRoutes (importer en haut)

//########################################################################################################################

// Ecoute le port
app.listen(5000, ()=>console.log("Le serveur a démaré au port 5000"));  //callback pour nous dire que le serv a démaré