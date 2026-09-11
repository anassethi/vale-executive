/* =====================================================
   VALE EXECUTIVE CARS
   ONE WAY BOOKING
===================================================== */


const returnBtn =
    document.getElementById("returnBtn");


const estimateBtn =
    document.getElementById("estimateBtn");



/* =====================================================
   RETURN BUTTON
===================================================== */

returnBtn.addEventListener(
    "click",
    function () {

        window.location.href =
            "index-return.html";

    }
);



/* =====================================================
   GET ESTIMATE
===================================================== */

estimateBtn.addEventListener(
    "click",
    function () {


        /* ---------------------------------------------
           GET CUSTOMER DATA
        --------------------------------------------- */

        const name =
            document.getElementById("name").value.trim();


        const phone =
            document.getElementById("phone").value.trim();


        const email =
            document.getElementById("email").value.trim();


        const passengers =
            document.getElementById("passengers").value;


        const room =
            document.getElementById("room").value.trim();



        /* ---------------------------------------------
           GET JOURNEY DATA
        --------------------------------------------- */

        const pickup =
            document.getElementById("pickup").value.trim();


        const dropoff =
            document.getElementById("dropoff").value.trim();


        const date =
            document.getElementById("date").value;


        const time =
            document.getElementById("time").value;


        const note =
            document.getElementById("note").value.trim();



        /* ---------------------------------------------
           VALIDATION
        --------------------------------------------- */

        if (
            !name ||
            !phone ||
            !email ||
            !passengers ||
            !pickup ||
            !dropoff ||
            !date ||
            !time
        ) {

            alert(
                "Please complete all required fields."
            );

            return;

        }



        /* ---------------------------------------------
           CREATE BOOKING DATA
        --------------------------------------------- */

        const bookingData = {

            tripType: "ONE WAY",

            customer: {

                name: name,

                phone: phone,

                email: email,

                passengers: passengers,

                room: room

            },

            journey: {

                pickup: pickup,

                dropoff: dropoff,

                date: date,

                time: time,

                note: note

            },

            returnJourney: null

        };



        /* ---------------------------------------------
           SAVE DATA
        --------------------------------------------- */

        localStorage.setItem(
            "valeBooking",
            JSON.stringify(bookingData)
        );



        /* ---------------------------------------------
           OPEN PRICING PAGE
        --------------------------------------------- */

        window.location.href =
            "pricing.html";

    }
);