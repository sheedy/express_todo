
// list client.
var lc = (function () {

    // simple, custom, http client using XMLHttpRequest
    var http = function (obj) {

        obj = obj || {};

        // defaults to making GET requests to the /list path
        this.method = obj.method || 'GET';
        this.path = obj.path || '/list';
        this.payload = obj.payload || null;
        this.onDone = obj.onDone || function () {
            console.log(this.response);
        };
        this.onFail = obj.onFail || function () {
            console.log(this.response);
        };

        // start the request
        var xhr = this.xhr = new XMLHttpRequest();
        xhr.open(this.method, this.path);

        // with this client all GET request should be for JSON
        if (this.method.toUpperCase() === 'GET') {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        var req = this;
        xhr.onreadystatechange = function () {

            if (this.readyState === 4) {

                if (this.status === 200) {

                    req.onDone.call(this, this);

                } else {

                    req.onFail.call(this, this);

                }

            }

        };

        // send
        xhr.send(this.payload);

    };

    // no call back default
    var nocb = function () {

        console.log(this.response);

    };

    // public api
    return {

        // just get the main index
        getIndex: function (done, fail) {

            done = done || nocb;
            fail = fail || nocb;

            new http({

                onDone: done,
                onFail: fail

            });

        }

    };

}
    ());
