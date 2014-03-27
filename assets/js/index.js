$(function () {
    htmlFromTemplate('home.html', function(){home.init();});
});
function goBack() {

}
function htmlFromTemplate(fileName, onLoad) {
    $.get(fileName).done(function (data) {
        $('.container').html(data);
        onLoad();
    });
}