
// use list clients createList Method to send the body
lc.getList({

    listId: get('listid').innerText,
    onDone: function () {

        console.log('got list');
        console.log(this.response);

    }

});
