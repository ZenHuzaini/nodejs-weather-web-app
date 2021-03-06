const request = require('request')

const geocode = (area, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${area}.json?limit=1&access_token=pk.eyJ1IjoiemVuaHV6YWluaSIsImEiOiJjanlzeXRobTQwMTZ3M2JwMXFsdXFlbDdsIn0.-MWjWymxxtz1_1BbMPmmRg`

    request({ url, json: true }, (err, res) => {
        if (err) {
            //condition if we use different alphabet
            if (err.message === "Request path contains unescaped characters") {
                return callback("Please try using international Alphabet", undefined)
            }
            callback("No internet connection! " + err.message, undefined)

        } else if (res.body.features.length === 0) {
            callback('data cannot be fetched, try other keywords', undefined)
        } else {
            const data = {
                location: res.body.features[0].place_name,
                longitude: res.body.features[0].center[0],
                latitude: res.body.features[0].center[1],
                query: res.body.query[0]
            }
            callback(undefined, data)
        }
    })
}

// const location = process.argv[2]
// geocode('Wroclaw', (err, data) => {
//     if (data === undefined) {
//         console.log(err)
//     } else {
//         console.log(data)
//     }
// })

module.exports = { geocode }