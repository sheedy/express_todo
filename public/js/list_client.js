
// list client.
var lc = (function () {

    // simple, custom, http client using XMLHttpRequest
    var http = function (obj) {

        obj = obj || {};

        // defaults to making GET requests to the /list path
        this.method = obj.method || 'GET';
        this.path = obj.path || '/list';
        this.payload = obj.payload || null;
        this.onDone = obj.OnDone || function () {
            console.log(this.response);
        };
        this.onFail = obj.OnFail || function () {
            console.log(this.response);
        };

        // start the request
        var xhr = this.xhr = new XMLHttpRequest();
        xhr.open(this.method, this.path);
        // with this client all GET request should be for JSON
        if (this.method.toUpperCase() === 'GET') {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.onreadystatechange = function () {

            console.log(this);

        };

        xhr.send(this.payload);

    };

    var req = new http();

}
    ());
