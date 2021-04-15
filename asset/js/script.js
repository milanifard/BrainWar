var w3 = $("#aside").width()
jQuery(document).ready(function($) {
    var WebsiteAddress = "http://localhost:8080/Litaxs.com/"
    var background_Array = ["image.jpg"]
    background_Array.push("image.jpg")
    $("#product1").hide()
        // $("#product2").hide()
        // $("#product3").hide()
        // $("#product4").hide()
        // $("#product5").hide()

    // setInterval(function() {
    //     background_Array.push(background_Array[0])
    //     background_Array.shift();
    //     $(".header").fadeOut("slow", function() {
    //         $(".header").css("background-image", "linear-gradient(to right bottom, rgba(243, 240, 69, 0.3), rgba(179, 176, 26, 0.3)), url(" + background_Array[0] + ")");
    //         $(".header").fadeIn("slow");
    //     });
    // }, 5000);

    $(".menu-all div").hover(function() {
        $(this).css("visibility", "visible")
    }, function() {
        setTimeout(function() {
            $(this).css("visibility", "hidden")
        }, 1000)
    })

    // $(".chooser div input").hover(function() {
    //     var stralt = $(this).attr("alt")
    //     $(".chooser").after('<p class="text-dark text-ylw2 ml-2" style="font-size:12px;margin-top: 60px;position: absolute;z-index: 66;">' + stralt + '</p>');
    // }, function() {
    //     $(".chooser").next('p').remove();
    // })

    $("#aside").css(
        "margin-left", -1.5 * w3
    )
    var ruller_state = 0;
    $(".chooser div input").click(function(e) {
        var stralt = $(this).attr("alt")
        if (stralt.localeCompare("ورود کاربران") == 0) {
            if (ruller_state == 1) {
                $("#ruller").removeClass("end-middle");
                $("#ruller").removeClass("first-middle");
                $("#ruller").addClass("middle-first");
            }
            if (ruller_state == 2) {
                $("#ruller").removeClass("first-end");
                $("#ruller").removeClass("middle-end");
                $("#ruller").addClass("end-first");
            }
            ruller_state = 0;
        }
        if (stralt.localeCompare("ورود رانندگان") == 0) {
            if (ruller_state == 0) {
                $("#ruller").removeClass("end-first");
                $("#ruller").removeClass("middle-first");
                $("#ruller").addClass("first-middle");
            }
            if (ruller_state == 2) {
                $("#ruller").removeClass("first-end");
                $("#ruller").removeClass("middle-end");
                $("#ruller").addClass("end-middle");
            }
            ruller_state = 1;
        }
        if (stralt.localeCompare("ورود فروشندگان") == 0) {
            if (ruller_state == 0) {
                $("#ruller").removeClass("end-first");
                $("#ruller").removeClass("middle-first");
                $("#ruller").addClass("first-end");
            }
            if (ruller_state == 1) {
                $("#ruller").removeClass("end-middle");
                $("#ruller").removeClass("first-middle");
                $("#ruller").addClass("middle-end");
            }
            ruller_state = 2;
        }
    });
});
var element = document.getElementById("sin7");
var aside2 = document.getElementById("aside");
var LatestProduct = document.getElementById("LastProduct2");
var siggncard = document.getElementById("signcard");
var siggncard2 = document.getElementById("signcard2");
window.onscroll = () => {
    if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
        element.classList.add("showing");
    }
    if (document.body.scrollTop > 750 || document.documentElement.scrollTop > 750) {
        LatestProduct.classList.add("view_rolling");
    }
    if (document.body.scrollTop > 820 || document.documentElement.scrollTop > 820) {
        siggncard.classList.add("view_scaling");
        siggncard2.classList.add("view_scaling");
    }
    if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
        if (aside2) aside2.classList.add("sticky");
    } else {
        if (aside2) aside2.classList.remove("sticky");
        if (aside2) aside2.style.marginLeft = -1.5 * w3;
    }
}

// var xmlhttp = new XMLHttpRequest();

// xmlhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         myObj = JSON.parse(this.responseText);
//         document.getElementById("demo").innerHTML = myObj.name;
//     }
// };
// xmlhttp.open("GET", "demo_file.php", true);
// xmlhttp.send();