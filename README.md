# node-locations

Write a web server in javascript using Node.js 
The web server will be a REST API
Should handle the following calls :
GET /geocode?address={{address}}
Should get an address and return the coordinates
Feel free to use any of the public geocoding services listed here
The coordinates should be returned in a json object like this : 
{ 
  “lat”: 456.456,
  “lon”: 123.123
}
GET /wikiNearby?lon={{lon}}&lat={{lat}}
Should get coordinates and return nearby wikipedia information
You can use the MediaWiki API explained here
The response should be an array of objects like this :
{
  “title”: "Yerba Buena Gardens",
  “thumbnailUrl”: “https://www.example.com/wikipedia/commons/thumbs/Yerba_Buena_Gardens.jpg”,
  “coordinates”: {
    “lat”: 37.7856,
    “lon”: -122.403
  }
}
Requests 4+5 should be cached (in-memory) of the API so when someone requests the same thing the API will return the response from memory and not go to the external API’s.
POST /purgeCache
Should clear the cache mentioned above
GET /usage
Should return a list of all requests made to the API since it went up (can be kept in-memory)
This request should be authenticated using basic HTTP authentication
The source code should be available in a public GitHub repository.
