# Pogoda - Weather App 

[pogoda.dtsioma.com](http://pogoda.dtsioma.com)

## About

*Pogoda* is an application for getting weather forecast for today and next week. Data is fetched from OpenWeatherMap API and Google API.

![Demo](https://i.imgur.com/VVXdqDt.gif)

## Tech stack

### Front End

* [React](https://reactjs.org)
* [Material UI](https://material-ui.com)

### Back End 

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com)
* [REST API](https://restfulapi.net)

### APIs

* [OpenWeatherMAP](https://openweathermap.org/api) - get forecast
* [Google Place AutoComplete](https://developers.google.com/maps/documentation/places/web-service/autocomplete) - autocomplete for location search
* [Google Place Details](https://developers.google.com/maps/documentation/places/web-service/details) - coordinates for location name (when user selects option from autocomplete)
* [Google Geocoding](https://developers.google.com/maps/documentation/geocoding/overview) - location name for coordinates (when user selects automatic geolocation)

### Typescript

*Yes.*

## Optimization

To reduce the amount of API calls, I decided to save some data in localStorage. When user is fetching forecast for any location, data is written in localStorage in such format: 
```javascript
// in this case, using `|` is easier than stringifying/parsing JSON
{ slug: "name|coordinates" }
```
For example, localStorage record for Seattle will look like this:
```javascript  
{ "seattle-wa-usa": "Seattle, WA, USA|47.6062,-122.3321" }
```
Next time, if the app already knows the name or coordinates of location, it doesn't need to do extra API call. This simple feature decreases loading time and improves user experience.

## To be added in the future

* List of My Cities

###
Deployed with [Heroku.](https://www.heroku.com)

Daniil Tsioma /// August 2, 2021.
