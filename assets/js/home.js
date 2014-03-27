var home = {
    init:function () {
        var onSubmit = function (e) {
            $("#submit").unbind('click');

            var yesterday = 0;
            $('.yesterday').each(function () {
                yesterday += inputText($(this));
            });
            var tomorrow = 0;
            $('input[name="tomorrow"]').each(function () {
                tomorrow += inputValue($(this));
            });
            var sale = 0;
            $('input[name="sale"]').each(function (e) {
                sale += inputValue($(this));
            });
            var addition = 0;
            $('input[name="addition"]').each(function () {
                addition += inputValue($(this));
            });
            var price = 0;
            $('.price').each(function () {
                price += inputText($(this));
            });

            $.ajax({
                url:'http://kalimark.herokuapp.com/shop',
                type:'POST',
                data:{name:'Saravana Stores', tomorrow:tomorrow, issue:sale, addition:addition, price:price, yesterday:yesterday},
                success:function () {
                    $('input').each(function () {
                        $(this).val("");
                    });
                    $('.price').each(function () {
                        $(this).html("");
                    });
                    $('#submit').click(onSubmit);
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

        var recomputePrice = function (elem) {
            var item = elem.parent().parent();
            var price = inputValue(item.find('input[name="sale"]')) * inputText(item.find('.rate')) + inputValue(item.find('input[name="addition"]')) * 10;
            item.find('.price').html(price);
        };

        $('#submit').click(onSubmit);
        $('input').each(function () {
            var self = this;
            $(self).blur(function () {
                recomputePrice($(self));
            });
        });
    }
}