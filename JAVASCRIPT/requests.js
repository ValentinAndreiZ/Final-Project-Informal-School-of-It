var baseURL = "https://siit-webshop.firebaseio.com/.json"


//Functii de request catre server


//GET primeste ca parametru un callback (confera flexibilitate)

function sendHTTPRequestGET(callback) {
    var request = new XMLHttpRequest();
    request.open('GET', baseURL);

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var parsedResponse = JSON.parse(request.response)
            serverData = []
            for (var name in parsedResponse) {
                parsedResponse[name].id = name
                serverData.push(parsedResponse[name])
            }
            callback(serverData)
        }
    }
    request.send()
}


function sendHTTPRequestPOST(data) {
    var request = new XMLHttpRequest();
    request.open('POST', baseURL);
    request.setRequestHeader('Content-type', 'application/json');
    request.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            sendHTTPRequestGET(renderData)
        }
    }
    request.send(JSON.stringify(data))
}

function sendHTTPRequestDELETE(id) {
    var request = new XMLHttpRequest();
    request.open('DELETE', 'https://siit-webshop.firebaseio.com/' + id + '.json');
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log('delete request succesful')
            sendHTTPRequestGET(renderData)
        }
    }
    request.send()
}
 

function sendHTTPRequestUPDATE(id, newObject, callback) { 
    var request = new XMLHttpRequest();
    request.open('PUT', 'https://siit-webshop.firebaseio.com/' + id + '.json');
    request.setRequestHeader('Content-type', 'application/json');
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200 && callback !== undefined) {
            sendHTTPRequestGET(callback) 
        }
    }
    
    request.send(JSON.stringify(newObject))
}
