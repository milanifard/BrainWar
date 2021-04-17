jQuery(document).ready(function($) {

    $(".menu-all div").hover(function() {
        $(this).css("visibility", "visible")
    }, function() {
        setTimeout(function() {
            $(this).css("visibility", "hidden")
        }, 1000)
    })
});