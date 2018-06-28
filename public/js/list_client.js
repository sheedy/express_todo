
var get = function (id) {

    return document.getElementById(id);

};


// list client.
var lc = (function () {

    // simple, custom, http client using XMLHttpRequest
    var http = function (obj) {

        obj = obj || {};

        // defaults to making GET requests to the /list path
        this.method = obj.method || 'GET';
        this.path = obj.path || '/list';
        this.body = obj.body || null;
        this.onDone = obj.onDone || function () {
            console.log(this.response);
        };
        this.onFail = obj.onFail || function () {
            console.log(this.response);
        };

        // start the request
        var xhr = this.xhr = new XMLHttpRequest();
        xhr.open(this.method, this.path);

        // with this client all GET,and POST request should be for JSON
        xhr.setRequestHeader('Content-Type', 'application/json');

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
        xhr.send(this.body);

    };

    // no call back default
    var nocb = function () {

        console.log(this.response);

    };

    // public api
    return {

        // expose http
        http: http,

        // just get the main index
        getIndex: function (obj) {

            obj = obj || {};

            obj.onDone = obj.onDone || nocb;
            obj.onFail = obj.onFail || nocb;

            new http({

                onDone: obj.onDone,
                onFail: obj.onFail

            });

        },

        // get a list by id
        getList: function (obj) {

            obj = obj || {};

            obj.onDone = obj.onDone || nocb;
            obj.onFail = obj.onFail || nocb;
            obj.listId = obj.listId || null;

            new http({
                method: 'POST',
                body: JSON.stringify({
                    mode: 'get',
                    listId: obj.listId
                }),
                onDone: obj.onDone,
                onFail: obj.onFail

            });

        },

        // delete a list
        delList: function (obj) {

            obj = obj || {};

            obj.onDone = obj.onDone || nocb;
            obj.onFail = obj.onFail || nocb;
            obj.listId = obj.listId || null;

            new lc.http({

                method: 'POST',
                body: JSON.stringify({
                    mode: 'delete',
                    listId: obj.listId
                }),
                onDone: obj.onDone,
                onFail: obj.onFail

            });

        },

        // creates a new list
        createList: function (obj) {

            obj = obj || {};

            obj.onDone = obj.onDone || nocb;
            obj.onFail = obj.onFail || nocb;

            obj.body.mode = 'create';
            obj.body = JSON.stringify(obj.body);

            new http({

                method: 'POST',
                body: obj.body,
                onDone: obj.onDone,
                onFail: obj.onFail

            });

        },

        // creates a new list
        addListItem: function (obj) {

            obj = obj || {};

            obj.onDone = obj.onDone || nocb;
            obj.onFail = obj.onFail || nocb;

            obj.body = obj.body || {};
            obj.body.mode = 'add_list_item';
            obj.body.item = obj.body.item || {
                name: 'cry'
            };
            obj.body = JSON.stringify(obj.body);

            new http({

                method: 'POST',
                path: '/edit',
                body: obj.body,
                onDone: obj.onDone,
                onFail: obj.onFail

            });

        }

    };

}
    ());
