/* 
 * maakt html elementen, dependency jquery, lodash
 */

define(['lodash'], function(_) {

    
    return {
        
        makeSelect: function(arr, oAttribs) {
            /*
             * maakt een SELECT element van een array
             * @arr verplicht, Array, array van waarden die als value van de options gezet worden
             * @oAttribs, optioneel, Object, object met alle html attribs die ingesteld moeten worden op dit element
             */

           if (_.isArray(arr)) {

                let $select = $("<select>");
                //lus doorheen oAttr om alle andere attribs in te stellen
                //console.log(oAttribs);
                for (let key in oAttribs || {}) {
                    $select.attr(key, oAttribs[key]);
                }

                //maak option elementen vanuit array
                for (let i = 0; i < arr.length; i++) {
                    let $option = $("<option>");
                    $option.attr("value", arr[i]);
                    $option.html(arr[i]);
                    $select.append($option);
                }
                return $select;
            }
            else {
                throw new Error(this.naam + ': argument arr moet een Array zijn');
            }

        },
        makeInput: function(oAttribs) {
            /*
             * maakt een INPUT element van een array
             * @oAttribs, Object, object met alle extra attribs die ingesteld moeten worden op dit element
             */
            let $input = $("<input>");
            //lus doorheen oAttr om alle andere attribs in te stellen
            for (let key in oAttribs || {}) {
                $input.attr(key, oAttribs[key]);
            }
            return $input;
        },

        makeButton: function(tekst, oAttribs) {
            /*
             * maakt een INPUT element van een array
             * @id verplicht, String, id attr
             * @type verplicht, String, type attribuut
             * @tekst verplicht, String, tekst op de knop
             * @oAttribs, optioneel, Object, object met alle extra attribs die ingesteld moeten worden op dit element
             */

            if (!_.isUndefined(tekst) && tekst != "") {
                let $knop = $("<button>");
                $knop.html(tekst);

                //lus doorheen oAttr om alle andere attribs in te stellen
                for (let key in oAttribs || {}) {
                    $knop.attr(key, oAttribs[key]);
                }
                return $knop;
            }
            else {
                throw new Error(this.naam + ': argument tekst is verplicht en moet een geldige String bevatten');
            }
        }
    }
});

