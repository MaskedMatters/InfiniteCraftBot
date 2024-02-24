function requestUrl(first, second) {
    return 'https://neal.fun/api/infinite-craft/pair?first=' + first + '&second=' + second
}

const response = fetch(requestUrl('Water', 'Ampharos 5.5'), {
    headers: {
        'Referer': 'https://neal.fun/infinite-craft/',
        'User-Agent': 'Solver'
    }
})

response
    .then((res) => res.json())
    .then((data) => console.log(data))