// AN ASYNC FUNCTION THAT CALLS THE INFINITE CRAFT API AND RETURNS THE RESPONSE (NOT PARSED)
async function requestAPI(first, second) {
    
    // OPTIONS FOR FETCH REQUEST
    const options = {
        method: 'GET',                                        // REQUEST TYPE
        headers: {
            'Referer': 'https://neal.fun/infinite-craft/',    // PRETEND TO BE INFINITE CRAFT
            'User-Agent': 'Solver'                            // PRETEND TO BE INFINITE CRAFT
        }
    }

    // REQUEST AND RETURN (NOT PARSED) RESPONSE
    const response = await fetch(`https://neal.fun/api/infinite-craft/pair?first=${first}&second=${second}`, options)
    return await response

}

// INITIALIZE A SET WITH THE 4 STARTED ELEMENTS
let elements = new Set(['Water', 'Fire', 'Wind', 'Earth'])

// AN ASYNC FUNCTION THAT GOES THROUGH EVERY COMBINATION OF ELEMENTS IN THE SET
async function fetchData() {

    // GRAB ONE ELEMENT FROM THE ELEMENT SET (IN ORDER)
    for (let first of elements) {

        // GRAB A SECOND ELEMENT FROM THE ELEMENT SET (IN ORDER)
        for (let second of elements) {

            const response = (await requestAPI(first, second)).json()                           // SEND API REQUEST TO INFINITE CRAFT

            elements.add(response.result)                                                       // ADD THE NEW ELEMENT TO THE SET
            console.log(`${first} and ${second} make ${response.emoji}  ${response.result}`)    // LOG THE NEW ELEMENT TO CONSOLE

            if (response.isNew == true) {
                console.log("OH MY GOD!! THE BOT WORKS!!!! FIRST DISCOVERY!!!!!")               // IF FIRST DISCOVERY, LOG
                return                                                                          // IF FIRST DISCOVERY, RETURN
            }
        }
    }
}

// START FINDING!!!
fetchData()