console.log('this is home');

lc.getIndex({

    onDone: function () {

        var res = JSON.parse(this.response);

        var ul = document.createElement('ul');

        res.lists.forEach(function (list) {

            var li = document.createElement('li');

            li.innerHTML = '<a href="/edit?l='+list.id+'">'+list.name+'</a>';

            ul.appendChild(li);

        });

        get('lists').innerHTML = '';
        get('lists').appendChild(ul);

    }

});
