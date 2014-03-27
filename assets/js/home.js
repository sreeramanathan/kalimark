var home = {
    init:function () {
        $('#submit').click(function () {
            var tomorrow = 0;

            var inputValue = function(elem) {
                var val = $(elem).val();
                return parseInt(val == "" ? 0 : val);
            }

            $('input[name="tomorrow"]').each(function () {
                tomorrow += inputValue(this);
            })
            var sale = 0;
            $('input[name="sale"]').each(function (e) {
                sale += inputValue(this);
            })
            var addition = 0;
            $('input[name="addition"]').each(function () {
                addition += inputValue(this);
            })
            var price = 0;
            $('input[name="price"]').each(function () {
                price += inputValue(this);
            })

            $.ajax({
                url: 'http://10.16.3.59:3000/shop',
                type: 'POST',
                data: {name: 'Saravana Stores', tomorrow: tomorrow, issue: sale, additional: addition, price: price},
                dataType: 'application/json'
            })
        });
    }
}