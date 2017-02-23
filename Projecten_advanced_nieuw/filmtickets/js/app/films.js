/*
 films
 */

define(['ldsh!selectFilms'], function(selectFilms) {
    //console.log("function:films.keuzelijst");
    return {
        keuzelijst: function(id) {

            let data = {
                'id':'films',
                'films':[
                    { number:1,name:"De Smurfen"},
                    { number:2,name:"Zero Dark Thirty"},
                    { number:3,name:"Heide in Tirol"}
                    ]
            };

            let $lijst = $(selectFilms(data));
            return $lijst;
        }

    }
});