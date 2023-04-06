// make a call to the Amadeus API to get the flight offers
import React, { useState, useEffect } from 'react'

// API return jsons from Amadeus Documentation
import hotelList from './HotelList'
import hotelOffers from './HotelOffers'

const API_KEY = 'ffmdpEq1rGKspqNkgq3jXhYXpbqp'

const getHotelsListAPI = async (latitude, longitude) => {
  console.log('running get destination code')
  console.log(process.env.AMADEUS_API_KEY)
  try {
    const response = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/hotels/by-geocode?latitude=${latitude}&longitude=${longitude}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }
    )
    //const data = await response.json()
    const data = hotelList
    console.log('DATA:', data)
    return data
  } catch (error) {
    console.log('ERROR:', error)
  }
}

const getHotelOffersAPI = async (
  hotelids,
  checkindate,
  checkoutdate,
  type
) => {
  console.log(type)
  try {
    let response
    response = await fetch(
    `https://test.api.amadeus.com/v2/shopping/hotel-offers?hotelIds=${hotelids}&checkInDate=${checkindate}&checkOutDate=${checkoutdate}`,
    {
        headers: {
        Authorization: `Bearer ${API_KEY}`
        }
    }
    )
    //const data = await response.json()
    const data = hotelOffers
    console.log('DATA:', data)
    return data
  } catch (error) {
    console.log('ERROR:', error)
  }
}

const HotelSearch = props => {
  const [hotelOffers, setHotelOffers] = useState([])
  const [cityCode, setCityCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { destLocationLat, destLocationLng, startDate, endDate } = props

  useEffect(() => {
    setLoading(true)
    const asyncFunc = async () => {
      const checkindate = startDate.toISOString().slice(0, 10)
      const checkoutdate = endDate.toISOString().slice(0, 10)
      const getHotelOffers = async hotelids => {
        setLoading(true)
        try {
          const data = await getHotelOffersAPI(
            hotelids,
            checkindate,
            checkoutdate,
            props.type
          )
          setHotelOffers(data.data)
        } catch (error) {
          setError(error.message)
        }
        setLoading(false)
      }
      const hotels = await getHotelsListAPI(destLocationLat, destLocationLng)
      console.log(hotels)
      await getHotelOffers(hotels)
    }
    asyncFunc()
  }, [props.checkInDate, props.checkOutDate])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  const selectHotel = hotelOffer => {
    console.log('Hotel Selection:', hotelOffer)
    props.actionProvider.selectHotel(hotelOffer)
  }

  return (
    <div>
      <strong>Hotels from {startDate} to {endDate}:</strong>
      <br />
      <i>All times are in the city's local timezone</i>
      {hotelOffers.map(hotelOffer => (
        <div
          onClick={() => selectHotel(hotelOffer)}
          className='flightBox'
          key={hotelOffer.id}
        >
          {/* <strong>Departure Flight:</strong> */}
          <div className='flightPath'>
            <strong className='airportName'>
              {hotelOffer.hotel.name}
            </strong>
            {/* from{' '}
            {formatDateTime(
              hotelOffer.itineraries[0].segments[0].departure.at
            )}{' '}
            to{' '}
            {formatDateTime(hotelOffer.itineraries[0].segments[0].arrival.at)} */}
          </div>
          <div className='flightPath'>
            <div>
              {hotelOffer.offers[0].rateCode} Star Hotel
            </div>
            <div>
            ${Math.round(hotelOffer.offers[0].price.total * 1.05 * 100) / 100} at ${Math.round(hotelOffer.offers[0].price.base * 1.05 * 100) / 100} per night
            </div>
          </div>
          <br />
          {/* <strong>Return Flight:</strong> */}
          {/* <div className='flightPath'>
            <strong className='airportName'>
              {hotelOffer.itineraries[1].segments[0].departure.iataCode}
            </strong>{' '}
            {'->'}
            <strong className='airportName'>
              {hotelOffer.itineraries[1].segments[0].arrival.iataCode}
            </strong>{' '}
            from{' '}
            {formatDateTime(
              hotelOffer.itineraries[1].segments[0].departure.at
            )}{' '}
            to{' '}
            {formatDateTime(hotelOffer.itineraries[1].segments[0].arrival.at)}
          </div>
          <br /> */}
          <div>
            <strong>
              Room Type: {hotelOffer.offers[0].room.typeEstimated.beds}&nbsp;{hotelOffer.offers[0].room.typeEstimated.bedType}&nbsp;
            </strong>{' '}
          </div>
        </div>
      ))}
      <style jsx>{`
        .flightBox {
          border: 1px solid black;
          margin: 10px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
        }
        .flightBox:hover {
          background-color: #e6e6e6;
          cursor: pointer;
        }
        .flightPath {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .airportName {
          font-weight: bold;
          font-size: 1.2em;
        }
      `}</style>
    </div>
  )
}

export default HotelSearch
