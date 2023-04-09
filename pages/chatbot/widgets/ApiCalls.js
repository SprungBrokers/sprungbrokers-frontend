const API_KEY = 'IvwORyGe4xk9bPkA77w3Qo6nW883'

export const getDestinationCodeAPI = async (latitude, longitude) => {
  console.log('running get destination code')
  console.log(process.env.AMADEUS_API_KEY)
  try {
    const response = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=${latitude}&longitude=${longitude}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }
    )
    const data = await response.json()
    console.log('DATA:', data)
    return data
  } catch (error) {
    console.log('ERROR:', error)
  }
}

export const getFlightOffersAPI = async (
  origin,
  destination,
  departureDate,
  returnDate,
  type
) => {
  console.log(type)
  try {
    let response
    if (type === 'depart') {
      response = await fetch(
        `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=1&nonStop=true`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`
          }
        }
      )
    } else {
      response = await fetch(
        `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${destination}&destinationLocationCode=${origin}&departureDate=${returnDate}&adults=1&nonStop=true`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`
          }
        }
      )
    }
    const data = await response.json()
    console.log('DATA:', data)
    return data
  } catch (error) {
    console.log('ERROR:', error)
  }
}


// dep and arrival time and date and duration must be in ISO 8601
// https://developers.amadeus.com/self-service/category/air/api-doc/flight-delay-prediction/api-reference
export const getDelayPredictionAPI = async (origin, destination, depDate, depTime, arrDate, arrTime, aircraftCode, carrierCode, flightNumber, duration) => {
    console.log('running get delay prediction')
    console.log(process.env.AMADEUS_API_KEY)
    try {
      const response = await fetch(
        `https://test.api.amadeus.com/v1/travel/predictions/flight-delay?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${depDate}&departureTime=${depTime}&arrivalDate=${arrDate}&arrivalTime=${arrTime}&aircraftCode=${aircraftCode}&carrierCode=${carrierCode}&flightNumber=${flightNumber}&duration=${duration}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`
          }
        }
      )
      const data = await response.json()
      console.log('DATA:', data)
      return data
    } catch (error) {
      console.log('ERROR:', error)
    }
  }


  // must be in IATA form
//   documentation: https://developers.amadeus.com/self-service/category/air/api-doc/flight-price-analysis/api-reference
export const getPriceAnalysisAPI = async (origin, destination, depDate, currencyCode='USD', oneWay=true) => {
    console.log('running get price analysis prediction')
    console.log(process.env.AMADEUS_API_KEY)
    try {
      const response = await fetch(
        `https://test.api.amadeus.com/v1/analytics/itinerary-price-metrics?originIataCode=${origin}&destinationIataCode=${destination}&departureDate=${depDate}&currencyCode=${currencyCode}&oneWay=${oneWay}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`
          }
        }
      )
      const data = await response.json()
      console.log('DATA:', data)
      return data
    } catch (error) {
      console.log('ERROR:', error)
    }
  }



  export const getAirportPerformanceAPI = async (airportCode, date) => {
    console.log('running get airport performance')
    console.log(process.env.AMADEUS_API_KEY)
    try {
      const response = await fetch(
        `https://test.api.amadeus.com/v1/airport/predictions/on-time?airportCode=${airportCode}&date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`
          }
        }
      )
      const data = await response.json()
      console.log('DATA:', data)
      return data
    } catch (error) {
      console.log('ERROR:', error)
    }
  }


//   https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=PAR&radius=5&radiusUnit=KM&hotelSource=ALL

  export const getHotelsByCity = async (cityCode, radius=5, radiusUnit="MILE", ratings=["2","3","4","5"]) => {
    console.log('running get hotel ids by city')
    console.log(process.env.AMADEUS_API_KEY)
    try {
      const response = await fetch(
        `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=${radius}&radiusUnit=${radiusUnit}&ratings=${ratings}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`
          }
        }
      )
      const data = await response.json()
      console.log('DATA:', data)
      return data
    } catch (error) {
      console.log('ERROR:', error)
    }
  }




  export const getMultiHotelsOffers = async (hotelIDs, checkInDate, checkOutDate, adults=1, roomQuantity=1, priceRange="1-1000", currency="USD", bestRateOnly=true, lang="ENG") => {
    console.log('running get multihotel offers')
    console.log(process.env.AMADEUS_API_KEY)
    try {
      const response = await fetch(
        `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelIDs}&adults=${adults}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}roomQuantity=${roomQuantity}&bestRateOnly=${bestRateOnly}&lang=${lang}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`
          }
        }
      )
      const data = await response.json()
      console.log('DATA:', data)
      return data
    } catch (error) {
      console.log('ERROR:', error)
    }
  }



export const getHotelsOffers = async (offerID, lang="ENG") => {
    console.log('running get hotel offers')
    console.log(process.env.AMADEUS_API_KEY)
    try {
      const response = await fetch(
        `https://test.api.amadeus.com/v3/shopping/hotel-offers/${offerID}?lang=${lang}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`
          }
        }
      )
      const data = await response.json()
      console.log('DATA:', data)
      return data
    } catch (error) {
      console.log('ERROR:', error)
    }
  }
  


  export const getHotelRatings = async (hotelIDs) => {
    console.log('running get hotel offers')
    console.log(process.env.AMADEUS_API_KEY)
    try {
      const response = await fetch(
        `https://test.api.amadeus.com/v2/e-reputation/hotel-sentiments?hotelIds=${hotelIDs}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`
          }
        }
      )
      const data = await response.json()
      console.log('DATA:', data)
      return data
    } catch (error) {
      console.log('ERROR:', error)
    }
  }


  export const getHotelNameAutocomplete = async (keyword, countryCode="US", lang="ENG", max=15) => {
    console.log('running get hotel name autocomplete')
    console.log(process.env.AMADEUS_API_KEY)
    try {
      const response = await fetch(
        `https://test.api.amadeus.com/v1/reference-data/locations/hotel?keyword=${keyword}&subType=HOTEL_LEISURE&subType=HOTEL_GDS&countryCode=${countryCode}&lang=${lang}&max=${max}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`
          }
        }
      )
      const data = await response.json()
      console.log('DATA:', data)
      return data
    } catch (error) {
      console.log('ERROR:', error)
    }
  }