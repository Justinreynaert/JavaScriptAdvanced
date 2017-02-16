// ajax service

var ajaxHandler = function(){};

ajaxHandler.prototype = {
    request: function(opties) {
        // options object met default waarden

        opties = {
            method: opties.method || "GET",
            url: opties.url || "",
            timeout: opties.timeout || 5000,
            callback: opties.callback ||
            {
                success: function(){alert("succes")},
                failure: function(){alert("failure")}
            },
            data: opties.data || ""
        }

        //data volgens method

        if (opties.method=="GET") {
            opties.url += "?" + opties.data;
            postVars = null;
        }
        else if(opties.method=="POST") {
            postVars = opties.data;
        }

        var xhr = this.createXHRObject();
        xhr.open(opties.method, opties.url, true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState!==4) return;

            if(xhr.status>=200 && xhr.status<300) {
                opties.callback.success(xhr.responseXML, xhr.responseText)
            } else {
                opties.callback.failure(xhr.status);
            }
        };

        xhr.send(postVars);

    },
    createXHRObject: function() {
        //memoizing
        var xmlhttp = '';

        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }

        else if (window.ActiveXObject) {
            try {
                xmlhttp = new ActiveXObject("Msxm12.XMLHTTP");
            }
            catch (e) {
                try{
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch(e) {}
            }
        }

        this.createXHRObject = function() {
            return xmlhttp;
        };

        return xmlhttp;



    }
}