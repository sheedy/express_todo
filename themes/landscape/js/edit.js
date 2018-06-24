
// use list clients createList Method to send the body


new lc.http({

    path: '/edit',
    method: 'POST',
    body: JSON.stringify({

        mode: 'get_list_item',
        listId: 'H1pqTf3bm',
        itemId: 'SklipM2bX'

    }),
    onDone: function () {

        console.log(this.response);

    }

});

if (get('listid')) {

    /*
    lc.getList({

    listId: get('listid').innerText,
    onDone: function () {

    console.log('got list');
    console.log(this.response);

    }

    });
     */

    [].forEach.call(document.querySelectorAll('.button_delete'), function(el){
		
		console.log(el.dataset.itemId)
		
	});


    get('newitem_submit').addEventListener('click', function () {

        var text = get('newitem_text').value;

        if (text !== '') {

            lc.addListItem({

                body: {
                    listId: get('listid').innerText,
                    item: {

                        name: text
                    }

                },
                onDone: function () {

                    var res = JSON.parse(this.response);

                    if (res.success) {

                        var li = document.createElement('li');

                        li.innerHTML = res.body.item.name;

                        get('list_current').appendChild(li);

                    } else {

                        console.log(this.response);

                    }

                }

            });

        }

    });

}
