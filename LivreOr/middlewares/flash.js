module.exports=function(request, response, next){

    if(request.session.flash){
        response.locales.flash=request.session.flash  //crée une variable local dans la response qui va s'appeller flash  et qui va contenir les info de la session
        request.session.flash= undefined // suppression de la session
    }
    // Notre fonction flash qui initialise dans la session une clé flash qui va contenir l'erreur

    request.flash=function(type, content){

        if(request.session.flash===undefined){ 
            request.session.flash={}  //Objet vide
        }
        request.session.flash[type]=content
    }

}

next()
}