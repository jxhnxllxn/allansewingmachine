const NodeGeocoder = require('node-geocoder');

const options = {
    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter:'https',
    apiKey: process.env.GEOCODER_API_KEY,
    
    // Optional depending on the providers
    // fetch: customFetchImplementation,
    
    formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
