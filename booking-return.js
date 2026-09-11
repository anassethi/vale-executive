const estimateBtn = document.getElementById("estimateBtn");

estimateBtn.addEventListener("click", function () {

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const passengers =
        document.getElementById("passengers").value.trim();

    const room =
        document.getElementById("room").value.trim();


    const pickup =
        document.getElementById("pickup").value.trim();

    const dropoff =
        document.getElementById("dropoff").value.trim();

    const pickupDate =
        document.getElementById("pickupDate").value;

    const pickupTime =
        document.getElementById("pickupTime").value;


    const returnPickup =
        document.getElementById("returnPickup").value.trim();

    const returnDropoff =
        document.getElementById("returnDropoff").value.trim();

    const returnDate =
        document.getElementById("returnDate").value;

    const returnTime =
        document.getElementById("returnTime").value;


    const note =
        document.getElementById("note").value.trim();


    // ==========================================
    // NORMAL VALIDATION
    // ==========================================

    if (
        !name ||
        !phone ||
        !email ||
        !passengers ||
        !room ||
        !pickup ||
        !dropoff ||
        !pickupDate ||
        !pickupTime ||
        !returnPickup ||
        !returnDropoff ||
        !returnDate ||
        !returnTime
    ) {

        alert("Please complete all required fields.");

        return;
    }


    // ==========================================
    // GOOGLE MAPS VALIDATION
    // ==========================================

    const outbound =
        window.valeMapData?.return?.outbound;

    const returnRoute =
        window.valeMapData?.return?.returnJourney;


    if (
        !outbound ||
        outbound.distanceMiles <= 0
    ) {

        alert(
            "Please select valid outbound locations so the route can be calculated."
        );

        return;
    }


    if (
        !returnRoute ||
        returnRoute.distanceMiles <= 0
    ) {

        alert(
            "Please select valid return locations so the return route can be calculated."
        );

        return;
    }


    // ==========================================
    // SAVE BOOKING
    // ==========================================

    const bookingData = {

        tripType: "RETURN",


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

            date: pickupDate,

            time: pickupTime,

            note: note,

            distanceMeters:
                outbound.distanceMeters,

            distanceMiles:
                outbound.distanceMiles,

            distanceKm:
                outbound.distanceKm
        },


        returnJourney: {

            pickup: returnPickup,

            dropoff: returnDropoff,

            date: returnDate,

            time: returnTime,

            distanceMeters:
                returnRoute.distanceMeters,

            distanceMiles:
                returnRoute.distanceMiles,

            distanceKm:
                returnRoute.distanceKm
        }
    };


    localStorage.setItem(
        "valeBooking",
        JSON.stringify(bookingData)
    );


    window.location.href =
        "pricing.html";
});