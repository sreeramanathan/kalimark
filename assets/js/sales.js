var sales = {
    init:function () {
        var yesterday;
        var tomorrow;
        var sale;
        var addition;
        var price;
        var itemSales = [];

        var onSubmit = function () {
            $("#submit").unbind('click');

            $.ajax({
                url:'http://kalimark.herokuapp.com/shop',
                type:'POST',
                data:{name:'Saravana Stores', tomorrow:tomorrow, issue:sale, addition:addition, price:price, yesterday:yesterday},
                success:function () {
                    htmlFromTemplate('summary.html', function(){summary.init(itemSales);})
                },
                error:function () {
                    alert('Server communication error!');
                }
            });
        };

        var inputValue = function (elem) {
            var val = elem.val();
            return parseInt(val == "" ? 0 : val);
        };

        var inputText = function (elem) {
            var text = elem.text();
            return parseInt(text == "" ? 0 : text);
        }

        var recomputePriceAndTotals = function (elem) {
            var item = elem.parent().parent();
            var price = inputValue(item.find('input[name="sale"]')) * inputText(item.find('.rate')) + inputValue(item.find('input[name="addition"]')) * 10;
            item.find('.price').html(price);

            yesterday = 0;
            tomorrow = 0;
            sale = 0;
            addition = 0;
            price = 0;
            $('.yesterday').each(function () {
                yesterday += inputText($(this));
            });
            $('input[name="tomorrow"]').each(function () {
                tomorrow += inputValue($(this));
            });
            $('input[name="sale"]').each(function (e) {
                sale += inputValue($(this));
                itemSales.push(inputValue($(this)))
            });
            $('input[name="addition"]').each(function (index) {
                addition += inputValue($(this));
                itemSales[index] += inputValue($(this));
            });
            $('.price').each(function () {
                price += inputText($(this));
            });

            $($('.total').find('td')[2]).html(sale);
            $($('.total').find('td')[3]).html(addition);
            $($('.total').find('td')[4]).html(tomorrow);
            $($('.total').find('td')[5]).html(price);
        };

        $('#submit').click(onSubmit);
        $('input').each(function () {
            var self = this;
            $(self).blur(function () {
                recomputePriceAndTotals($(self));
            });
        });
    }
}