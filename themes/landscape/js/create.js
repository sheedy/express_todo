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