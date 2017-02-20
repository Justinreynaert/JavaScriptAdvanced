class ajaxhandler {

    request(opties){
        // options object met default waarden
        opties = {
            method: opties.method || "GET",
            url: opties.url || "",
            timeout:opties.timeout || 5000,
            callback:opties.callback || {
                success:function(){alert("succes")},
                failure:function(){alert("failure")}
            },
            data: opties.data || ""
        };

        //console.log(opties.callback);


        //data volgens method
        let postVars;

        if(opties.method=="GET") {
            opties.url+= "?" + opties.data;
            postVars = null;
        }
        else if (opties.method=="POST") {
            postVars = opties.data;
        }

        let xhr = this.createXHRObject();


        //console.log(opties.url);


        xhr.open(opties.method, opties.url, true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState!==4)return;
            if(xhr.status>=200 && xhr.status<300) {
                opties.callback.success(xhr.responseText,xhr.responseXML);

            } else {
                opties.callback.failure(xhr.status);
            }
        };



        xhr.send(postVars);


    }


    createXHRObject() {
        //memoizing
        let xmlhttp = '';

        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();

        }

        else if (window.ActiveXObject) {
            try {
                xmlhttp = new ActiveXObject("Msxm12.XMLHTTP");
            }
            catch (e) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e){}
            }
        }

        this.createXHRObject = function() {
            return xmlhttp;
        };

        return xmlhttp;
    }
}