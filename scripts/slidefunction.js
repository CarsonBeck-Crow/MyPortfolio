console.log("Script Loaded");

let slideIndex = 1;
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed"); // Debugging statement

    let slideIndex = 1;
    showSlides(slideIndex);

    window.plusSlides = function(n) {
        showSlides(slideIndex += n);
    };

    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    };

    function showSlides(n) {
        console.log("showSlides called with n =", n); // Debugging statement

        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("demo");
        let captionText = document.getElementById("slideCaption");

        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].style.display = "block";
        }
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].className += " active";
        }
        if (captionText && dots[slideIndex - 1]) {
            captionText.innerHTML = dots[slideIndex - 1].alt;
        }
    }
});