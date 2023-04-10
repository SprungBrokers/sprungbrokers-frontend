// make a call to the Amadeus API to get the flight offers
import React, { useState, useEffect } from 'react'

// API return jsons from Amadeus Documentation
import { getHotelsByCity, getMultiHotelsOffers } from './ApiCalls'

const HotelSearch = props => {
  const [hotelOffers, setHotelOffers] = useState([])
  const [cityCode, setCityCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const {
    hotelLocation,
    hotelLocationLat,
    hotelLocationLng,
    startDate,
    endDate,
    location,
    budget,
    flightCost
  } = props

  useEffect(() => {
    setLoading(true)
    const asyncFunc = async () => {
      const getHotelOffers = async hotel_ids => {
        setLoading(true)
        try {
          const data = await getMultiHotelsOffers(hotel_ids, startDate, endDate)
          setHotelOffers(data.data)
        } catch (error) {
          setError(error.message)
        }
        setLoading(false)
      }
      console.log('SEARCHING FOR HOTELS NEAR', location)
      let hotels = await getHotelsByCity(location)
      console.log('HOTELS: ', hotels)
      let hotel_ids = hotels.data.map(hotel => hotel.hotelId)
      console.log(hotel_ids)
      // if the size of the hotel_ids array is greater than 100, then we need to make multiple calls to the API
      // to get the hotel offers
      if (hotel_ids.length > 100) {
        hotel_ids = hotel_ids.slice(0, 100)
      }
      await getHotelOffers(hotel_ids)
    }
    asyncFunc()
  }, [props.startDate, props.endDate])

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

  // calculate the number of nights between the two dates (dates are in YYYY-MM-DD format)
  const getNights = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  console.log ("FLIGHT COST: ", flightCost)
  console.log ("BUDGET: ", budget)
  

  const nightStay = getNights(startDate, endDate)

  return (
    <div>
      <strong>
        Hotels from {startDate} to {endDate}:
      </strong>
      <br />
      <i>All times are in the city's local timezone</i>
      {hotelOffers.map(hotelOffer => (
        <div
          onClick={() => selectHotel(hotelOffer)}
          // className='flightBox'
          // add conditional styling to the flightBox
          className={
            hotelOffer.offers[0].price.total < budget - flightCost
              ? 'flightBox green'
              : 'flightBox red'
          }
          key={hotelOffer.id}
        >
          {/* <strong>Departure Flight:</strong> */}
          <div className='flightPath'>
            <strong className='airportName'>{hotelOffer.hotel.name}</strong>
            {/* from{' '}
            {formatDateTime(
              hotelOffer.itineraries[0].segments[0].departure.at
            )}{' '}
            to{' '}
            {formatDateTime(hotelOffer.itineraries[0].segments[0].arrival.at)} */}
          </div>
          <div className='flightPath'>
            <div>{hotelOffer.offers[0].rateCode} Star Hotel</div>
            <div>
              ${Math.round(hotelOffer.offers[0].price.total * 100) / 100} at $
              {Math.round((hotelOffer.offers[0].price.base * 100) / nightStay) /
                100}{' '}
              per night
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
              Room Type: {hotelOffer.offers[0].room.typeEstimated.beds}&nbsp;
              {hotelOffer.offers[0].room.typeEstimated.bedType}&nbsp;
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
        .green {
          background-color: #b3ffb3;
        }
        .red {
          background-color: #ffb3b3;
        }
      `}</style>
    </div>
  )
}

export default HotelSearch
