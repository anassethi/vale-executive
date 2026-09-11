const returnbtn = document.getElementById("returnBtn");

returnbtn.addEventListener("click", function () {

     // Add click animation
    returnbtn.classList.add("clicked");

    // Wait for animation, then open booking page
    setTimeout(function () {
    window.location.href = "index-return.html";
     }, 40);

    });