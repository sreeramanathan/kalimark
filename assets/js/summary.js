var summary = {
    init:function (itemSales) {
        var next = function () {
            htmlFromTemplate('sales.html', function () {
                sales.init();
            });
        };

        for (var count = 0; count < balance.length; count++) {
            if (itemSales != undefined) {
                balance[count] -= itemSales[count];
            }
            $($('.balance')[count]).text(balance[count]);
        }

        $('#next').click(next);
    }

}