
// when create button is clicked
get('create_submit').addEventListener('click', function (e) {

    // get all inputs with class 'meta'
    var nodes = get('create').querySelectorAll('.meta'),

    // set up a new body to send
    body = {};

    // forEach 'meta' input
    [].forEach.call(nodes, function (el) {

        // make it part of body
        body[el.name] = el.value;

    });

    // use list clients createList Method to send the body
    lc.createList({

        body: body,
        onDone: function () {

		    console.log(this.response);
		
            // redirect to origin
            //window.location.href = '/edit'//window.location.origin;

        }

    });

});
