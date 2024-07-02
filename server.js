// Async function to request Infinite Craft API (UPDATED)
async function requestAPI(first, second) {

    // Refined options for a more robust request
    const options = {
        method: 'GET',
        headers: {
            'Referer': 'https://neal.fun/infinite-craft/',                          // Tell the API, "NEAL.FUN told us to come here!"
            'User-Agent': 'InfiniteCraftSolver/1.0 (https://www.yaycompany.com)'    // Identify ourselves as an Infinite Craft bot
        }
    };

    try {

        // Await the requested respons frome the Infinite Craft API
        const response = await fetch(`https://neal.fun/api/infinite-craft/pair?first=${first}&second=${second}`, options);

        if (!response.ok) {
            // Throw an error if the response fails
            throw new Error(`API request failed with status: ${response.status}`);
        }

        // If the response is OK (200), return it
        return await response.json();

    } catch (error) {

        // A temporary solve to errors, we'll handle them more gracefully in the future
        console.error('Error fetching data:', error);   

    }
}

// A function that loops through API calls to try and find a first discovery
async function fetchData() {

    // Create a set of elements
    const elements = new Set(['Water', 'Fire', 'Wind', 'Earth']);

    // Get the first element
    for (const first of elements) {

        // Get the second element
        for (const second of elements) {

            try {

                const response = await requestAPI(first, second);                             // Request the API
                const newElement = response.result;                                           // Save the new element
                                                                                              //
                elements.add(newElement);                                                     // Add the element to the set
                                                                                              //
                console.log(`${first} and ${second} make ${response.emoji} ${newElement}`);   // Log the new element
                                                                                              //
                if (response.isNew) {                                                         // Check if the element is new
                    console.log("OH MY GOD!! THE BOT WORKS!!!! FIRST DISCOVERY!!!!!");        // If new, log it
                    break; // Exit the loop if a new element is discovered (optional)         // If new, break loop
                }

            } catch (error) {

                // A temporary solve to errors, we'll handle them more gracefully in the future
                console.error(`Error processing elements ${first} and ${second}:`, error);

            }
        }
    }
}

// Start finding!
fetchData();
