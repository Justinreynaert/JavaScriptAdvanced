/*
cinemas
 */

define(function() {
    console.log("function:cinemas.keuzelijst");
    return {
        keuzelijst: function() {
            let data = {
                'id':'cin',
                'zalen': [
                    {number: 1, name: 'Brugge'},
                    {number: 2, name: 'Gent'},
                    {number: 3, name: 'Antwerpen'},
                    {number: 4, name: 'Roeselare'}


                ]
            };

            let tpl= "<select name='<%=id%>' id='<%=id%>'><%_.forEach(zalen,function(zaal){%><option value='<%=zaal.number%>'><%=zaal.name%></option><%});%></select>";


            let compiled = _.template(tpl);
            let lijst = compiled(data);
            let $lijst = $(lijst);

            return $lijst;
        }

    }
});