console.log('This is the main script for lanscape');

/*
lc.getIndex(function(){

console.log('yeah');
console.log(this.response);

});

lc.createList();
 */

var get = function (id) {

    return document.getElementById(id);

};

get('create_submit').addEventListener('click', function (e) {

    var nodes = get('create').querySelectorAll('.meta'),
    body = {

        mode: 'create'

    };

    [].forEach.call(nodes, function (el) {

        body[el.name] = el.value;

    });

    console.log(body);

    lc.createList({

        body: body

    });

});
