
//############################################################################################################
//Import de paquet

const mongoose=require("mongoose");

//##############################################################################################################

//Creation de modele de BDD
const PostsModel=mongoose.model(
    "node-api",   // la bdd on ce trouve ?
    {
        authors: {    // Colonne 1
            type:String,
            required:true  //si y'a pas d'auteur ou de msg on peut pas envoyé
        },
        message: {  // colonne 2
            type:String,     //si y'a pas d'auteur ou de msg on peut pas envoyé
            required:true
        },
        date: {     //colonne 3
            type:Date,
            default:Date.now  //prend au moment de ca création la date actuel
        }
    }, 
    "posts"  //on met dans la table post
);

//##############################################################################################################

//Exportation de PostModel pour avoir accés de n'importe ou dans l'app
module.export={PostsModel};  