var balance = [108, 72, 96, 60, 84, 48, 72, 84];
$(function () {
    htmlFromTemplate('summary.html', function(){summary.init();});
});
function goBack() {

}
function htmlFromTemplate(fileName, onLoad) {
    $.get(fileName).done(function (data) {
        $('.container').html(data);
        onLoad();
    });
}