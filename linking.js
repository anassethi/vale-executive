const taxibutton = document.getElementById("taxibutton");

taxibutton.addEventListener("click", function () {

    // Add click animation
    taxibutton.classList.add("clicked");

    // Wait for animation, then open booking page
    setTimeout(function () {
        window.location.href = "index.html";
    }, 40);

});