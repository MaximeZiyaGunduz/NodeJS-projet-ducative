const { response } = require('express')
let app = require('express')  //importe le framework express

let bodyParser=require('body-parser') // importe body parser 

let session=require('express-session') // importe les session d'express

const { request } = require('http')

let app =express()  //sauvegarde la variable

// MOTEUR DE TEMPLATE

app.set('view engine','ejs')  // definition du moteur de modéle

// NOS MIDDLEWARES

app.use(express.static('public')) //permet de dire quelle dossier distribue les fichiers static

app.use(bodyParser.urlencoded({extended; false}))

app.use(bodyParser.json())

    //CONFIGURATION DE LA SESSION DANS MIDDLEWARES

app.use(session({
    secret: 'keyboard',  //clé secret pour chifrée notre Cookies (qui seras crée)
    resave: false,
    saveUninitialized:true,
    cookie:{secure:true}
}))

app.use(require('.middlewares/flash'))


// NOS ROUTES

app.get('/', (request, response) =>{  // quand je suis dans / execute la fonction
/*
    //MSG ERREUR
    if(request.session.error){  // Si y'a une erreur
        response.locals.error=request.session.error // definition de la clé error et mettre ce qu'on a obtenu au niveau de la session
        response.locals.error=undefined //suppression de la variable
    }
*/
    // response.send("TOTO") Envoie a la page TOTO
    console.log(request.session)
    response.render('pages/index' , {test: 'test'})  //Rendre une vue, nous POUVONS passer une variable (ici test)
})

app.post('/', (request, response) => {    //Lorsque tu va en POST sur la page d'acceuil tu va lancer

    console.log(request.body) //obtenir des information sur la requete faite

    //CAS ERREUR (MSG VIDE)

    if(request.body.message === undefined || request.body.message===''){
       // response.render('pages/index', { error: "Vous avez pas entré de msg"})  //si on envoie un msg vide on retour une erreur

      // response.session.error()="Il y'a une Erreur" //sauvegarder un msg d'erreur avec une cé "erreur" dans la session
      request.flash('error', "Vous n'avez pas posté de msg") // 1er paramétre type, le 2éme erreur que je donne 
      response.redirect('/') // en cas d'ereeur on redirige vers la racine
    }
   

})
app.listen(8000)  //ecoute sur le port 8000