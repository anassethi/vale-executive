/* =====================================================
   VALE EXECUTIVE CARS
   PRICING CALCULATOR
===================================================== */


/* =====================================================
   PRICING RULES
===================================================== */

const PRICING = {

    /*
        PREMIUM VEHICLE / SALOON

        First 3 miles:
        £7.50 per mile

        After 3 miles:
        £3.00 per mile
    */

    saloon: {

        name: "PREMIUM VEHICLE",

        calculate: function(miles) {

            if (miles <= 3) {

                return miles * 7.50;

            }

            return (
                22.50 +
                ((miles - 3) * 3.00)
            );

        }

    },


    /*
        EXECUTIVE VEHICLE

        Every mile:
        £7.50
    */

    executive: {

        name: "EXECUTIVE VEHICLE",

        calculate: function(miles) {

            return miles * 7.50;

        }

    },


    /*
        EXECUTIVE MPV

        First 3 miles:
        £10.00 per mile

        After 3 miles:
        £7.50 per mile
    */

    mpv: {

        name: "EXECUTIVE MPV (7 SEATER)",

        calculate: function(miles) {

            if (miles <= 3) {

                return miles * 10.00;

            }

            return (
                30.00 +
                ((miles - 3) * 7.50)
            );

        }

    }

};


/* =====================================================
   CURRENT VEHICLE
===================================================== */

let selectedVehicle = "executive";


/* =====================================================
   ROUND TO 2 DECIMAL PLACES
===================================================== */

function roundTwo(number) {

    return Math.round(
        (number + Number.EPSILON) * 100
    ) / 100;

}


/* =====================================================
   FORMAT MONEY
===================================================== */

function formatMoney(number) {

    return "£" + number.toFixed(2);

}


/* =====================================================
   MILES TO KILOMETERS
===================================================== */

function milesToKilometers(miles) {

    return miles * 1.609344;

}


/* =====================================================
   METERS TO MILES
===================================================== */

function metersToMiles(meters) {

    return meters / 1609.344;

}


/* =====================================================
   CALCULATE VEHICLE FARE
===================================================== */

function calculateFare(vehicle, miles) {

    /*
        The distance is rounded to 2 decimals
        BEFORE the fare calculation.
    */

    const roundedMiles = roundTwo(miles);

    const fare =
        PRICING[vehicle].calculate(
            roundedMiles
        );

    /*
        Final fare rounded to nearest penny.
    */

    return roundTwo(fare);

}


/* =====================================================
   SELECT VEHICLE
===================================================== */

function selectVehicle(vehicle) {

    selectedVehicle = vehicle;


    /*
        Remove selection from every card
    */

    document
        .querySelectorAll(".vehicle-card")
        .forEach(function(card) {

            card.classList.remove("selected");

        });


    /*
        Remove check marks
    */

    document
        .querySelectorAll(".selection-circle")
        .forEach(function(circle) {

            circle.classList.remove("checked");

            circle.textContent = "";

        });


    /*
        Selected card
    */

    const selectedCard =
        document.getElementById(
            vehicle + "Card"
        );

    selectedCard.classList.add("selected");


    /*
        Selected circle
    */

    const selectedCircle =
        document.getElementById(
            vehicle + "Circle"
        );

    selectedCircle.classList.add("checked");

    selectedCircle.textContent = "✓";


    /*
        Update pricing
    */

    updatePricing();

}


/* =====================================================
   UPDATE ALL PRICES
===================================================== */

function updatePricing() {

    let miles =
        parseFloat(
            document.getElementById(
                "distanceInput"
            ).value
        );


    /*
        Prevent invalid distance.
    */

    if (
        !Number.isFinite(miles) ||
        miles < 0
    ) {

        miles = 0;

    }


    /*
        Round distance to 2 decimals.
    */

    miles = roundTwo(miles);


    /*
        Convert miles to km.
    */

    const kilometers =
        roundTwo(
            milesToKilometers(miles)
        );


    /* ==========================================
       CALCULATE ALL THREE VEHICLES
    ========================================== */

    const saloonFare =
        calculateFare(
            "saloon",
            miles
        );


    const executiveFare =
        calculateFare(
            "executive",
            miles
        );


    const mpvFare =
        calculateFare(
            "mpv",
            miles
        );


    /* ==========================================
       UPDATE VEHICLE CARDS
    ========================================== */

    document.getElementById(
        "saloonFare"
    ).textContent =
        formatMoney(saloonFare);


    document.getElementById(
        "executiveFare"
    ).textContent =
        formatMoney(executiveFare);


    document.getElementById(
        "mpvFare"
    ).textContent =
        formatMoney(mpvFare);


    /* ==========================================
       DISTANCE DISPLAY
    ========================================== */

    document.getElementById(
        "distanceConversion"
    ).textContent =
        miles.toFixed(2) +
        " mi = " +
        kilometers.toFixed(2) +
        " km";


    document.getElementById(
        "breakdownDistance"
    ).textContent =
        miles.toFixed(2) +
        " mi / " +
        kilometers.toFixed(2) +
        " km";


    /* ==========================================
       SELECTED VEHICLE FARE
    ========================================== */

    const selectedFare =
        calculateFare(
            selectedVehicle,
            miles
        );


    /* ==========================================
       UPDATE TOTAL
    ========================================== */

    document.getElementById(
        "breakdownFare"
    ).textContent =
        formatMoney(selectedFare);


    document.getElementById(
        "totalFare"
    ).textContent =
        formatMoney(selectedFare);


    /* ==========================================
       VEHICLE NAME
    ========================================== */

    document.getElementById(
        "breakdownVehicle"
    ).textContent =
        PRICING[selectedVehicle].name;


    document.getElementById(
        "totalDescription"
    ).textContent =
        PRICING[selectedVehicle].name +
        " • ONE WAY";


    /* ==========================================
       BREAKDOWN
    ========================================== */

    updateBreakdown(
        miles,
        selectedFare
    );

}


/* =====================================================
   BREAKDOWN TEXT
===================================================== */

function updateBreakdown(
    miles,
    fare
) {

    let rate = "";

    let calculation = "";


    /* ==========================================
       SALOON
    ========================================== */

    if (
        selectedVehicle === "saloon"
    ) {

        if (miles <= 3) {

            rate =
                "£7.50 / mi";

            calculation =
                miles.toFixed(2) +
                " × £7.50";

        } else {

            rate =
                "First 3 mi £7.50, then £3.00";

            calculation =
                "£22.50 + (" +
                miles.toFixed(2) +
                " − 3) × £3.00";

        }

    }


    /* ==========================================
       EXECUTIVE
    ========================================== */

    if (
        selectedVehicle === "executive"
    ) {

        rate =
            "£7.50 / mi";

        calculation =
            miles.toFixed(2) +
            " × £7.50";

    }


    /* ==========================================
       MPV
    ========================================== */

    if (
        selectedVehicle === "mpv"
    ) {

        if (miles <= 3) {

            rate =
                "£10.00 / mi";

            calculation =
                miles.toFixed(2) +
                " × £10.00";

        } else {

            rate =
                "First 3 mi £10.00, then £7.50";

            calculation =
                "£30.00 + (" +
                miles.toFixed(2) +
                " − 3) × £7.50";

        }

    }


    document.getElementById(
        "breakdownRate"
    ).textContent = rate;


    document.getElementById(
        "breakdownCalculation"
    ).textContent = calculation;

}


/* =====================================================
   GOOGLE DIRECTIONS DISTANCE
===================================================== */

/*
    Google Directions returns distance in METERS.

    Example Google result:

    result.routes[0].legs[0].distance.value

    might return:

    16100

    That means 16,100 meters.

    This function converts it to miles,
    rounds it to 2 decimals,
    and automatically updates the page.
*/

function setDistanceFromMeters(meters) {

    if (
        !Number.isFinite(meters) ||
        meters < 0
    ) {

        return;

    }


    /*
        Convert meters to miles.
    */

    const miles =
        metersToMiles(meters);


    /*
        Round to 2 decimals.
    */

    const roundedMiles =
        roundTwo(miles);


    /*
        Put distance into input.
    */

    document.getElementById(
        "distanceInput"
    ).value =
        roundedMiles.toFixed(2);


    /*
        Recalculate everything.
    */

    updatePricing();

}


/* =====================================================
   SET JOURNEY LOCATIONS
===================================================== */

function setJourneyLocations(
    pickup,
    dropoff
) {

    document.getElementById(
        "pickupLocation"
    ).textContent =
        pickup;


    document.getElementById(
        "dropoffLocation"
    ).textContent =
        dropoff;

}


/* =====================================================
   REVIEW DETAILS
===================================================== */

function reviewDetails() {

    const miles =
        roundTwo(
            parseFloat(
                document.getElementById(
                    "distanceInput"
                ).value
            ) || 0
        );


    const kilometers =
        roundTwo(
            milesToKilometers(miles)
        );


    const fare =
        calculateFare(
            selectedVehicle,
            miles
        );


    alert(

        "BOOKING DETAILS\n\n" +

        "Vehicle: " +
        PRICING[selectedVehicle].name +
        "\n\n" +

        "Distance: " +
        miles.toFixed(2) +
        " miles\n" +

        "Distance: " +
        kilometers.toFixed(2) +
        " km\n\n" +

        "Estimated Fare: " +
        formatMoney(fare)

    );

}


/* =====================================================
   CANCEL
===================================================== */

function cancelBooking() {

    const confirmCancel =
        confirm(
            "Are you sure you want to cancel?"
        );


    if (confirmCancel) {

        /*
            Change this to whatever page
            you want your Cancel button
            to return to.
        */

        window.location.href =
            "index.html";

    }

}


/* =====================================================
   BACK BUTTON
===================================================== */

function goBack() {

    if (
        window.history.length > 1
    ) {

        window.history.back();

    } else {

        window.location.href =
            "index.html";

    }

}


/* =====================================================
   INITIAL CALCULATION
===================================================== */

/*
    Default example:

    10 miles

    Saloon:
    £22.50 + (10 - 3) × £3
    = £43.50

    Executive:
    10 × £7.50
    = £75.00

    MPV:
    £30 + (10 - 3) × £7.50
    = £82.50
*/

updatePricing();