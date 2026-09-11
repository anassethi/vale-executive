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

    const date =
        document.getElementById("date").value;

    const time =
        document.getElementById("time").value;

    const note =
        document.getElementById("note").value.trim();


    // Validate normal fields
    if (
        !name ||
        !phone ||
        !email ||
        !passengers ||
        !room ||
        !pickup ||
        !dropoff ||
        !date ||
        !time
    ) {

        alert("Please complete all required fields.");

        return;
    }


    // Validate Google Maps route
    if (
        !window.valeMapData ||
        !window.valeMapData.oneWay ||
        window.valeMapData.oneWay.distanceMiles <= 0
    ) {

        alert(
            "Please select valid pickup and drop-off locations so the route can be calculated."
        );

        return;
    }


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

            note: note,

            distanceMeters:
                window.valeMapData.oneWay.distanceMeters,

            distanceMiles:
                window.valeMapData.oneWay.distanceMiles,

            distanceKm:
                window.valeMapData.oneWay.distanceKm
        },


        returnJourney: null
    };


    localStorage.setItem(
        "valeBooking",
        JSON.stringify(bookingData)
    );


    window.location.href =
        "pricing.html";
});