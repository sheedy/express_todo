
// use list clients createList Method to send the body


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

                    var li = document.createElement('li');

                    li.innerHTML = res.body.item.name;

                    get('list_current').appendChild(li);

                }

            });

        }

    });

}
