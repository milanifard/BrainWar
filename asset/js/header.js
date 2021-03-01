jQuery(document).ready(function($) {
    $(".menu a i").hover(function() {
            var txt = $(this).attr("alt")
            $(this).after('<p class="text-white mt-2 pb-0 mb-0" style="border:none !important;">' + txt + '</p>')
        },
        function() {
            $(this).next('p').remove()
        });
    $(".bars").click(function(e) {
        $(".pheader").after('<div><div class=" mx-auto mt-4 col-2"><a href="index.php"><img src="asset/img/logo.png" class="w-100"></a></div>        <div class="menu2 h-max mt-4"><a href="contact.php"><i class="fas fa-phone text-white mr-4" alt="تماس باما"></i></a><a href="about.php"><i class="fas fa-info-circle mr-4 text-white" alt="درباره ما"></i></a><a href="shop.php"><i class="fas fa-shopping-bag mr-4 text-white" alt="فروشگاه"></i></a><a href="register.php btm"><i class="fas fa-cart-arrow-down mr-4 text-white" alt="سبد خرید"></i></a><a href="register.php btm"><i class="fas fa-user mr-4 text-white" alt="ورود/عضویت"></i></a><a href="index.php btm"><i class="fas fa-home mr-4 text-white" alt="خانه"></i></a></div>    <div class="search-field2 pb-2 col-4 mt-4 mx-auto"><a href=""><i class="fa fa-search mr-4 text-white"></i></a><input type="text" placeholder="نام محصول یا فروشگاه"></input></div></div>');
        $(".bars2").removeClass("d-none");
        $(".bars").addClass("d-none");
    });
    $(".bars2").click(function(e) {
        $(".pheader").next('div').remove();
        $(".bars2").addClass("d-none");
        $(".bars").removeClass("d-none");
    });
});