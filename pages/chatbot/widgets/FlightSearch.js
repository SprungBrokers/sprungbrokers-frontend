// make a call to the Amadeus API to get the flight offers
import React, { useState, useEffect } from 'react'
import { getDestinationCodeAPI, getFlightOffersAPI } from './ApiCalls.js'

const formatDateTime = date => {
  // takes a string in the format of YYYY-MM-DDTHH:MM:SS and returns a string in the format of HH:MM AM/PM
  const time = date.slice(11, 16)
  const hour = time.slice(0, 2)
  const minutes = time.slice(3, 5)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const formattedHour = hour % 12 || 12
  return `${formattedHour}:${minutes} ${ampm}`
}

const FlightSearch = props => {
  const [flightOffers, setFlightOffers] = useState([])
  const [destinationCode, setDestinationCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { locationLat, locationLng, location, startDate, endDate } = props

  let date = startDate
  if (props.type === 'return') {
    date = endDate
  }

  useEffect(() => {
    setLoading(true)
    const asyncFunc = async () => {
      const destination = location
      const origin = 'DTW'
      const departureDate = startDate.toISOString().slice(0, 10)
      const returnDate = endDate.toISOString().slice(0, 10)
      const getFlightOffers = async destinationCode => {
        setLoading(true)
        try {
          const data = await getFlightOffersAPI(
            origin,
            destinationCode,
            departureDate,
            returnDate,
            props.type
          )
          setFlightOffers(data.data)
        } catch (error) {
          setError(error.message)
        }
        setLoading(false)
      }
      const code = await getDestinationCodeAPI(locationLat, locationLng)
      console.log(code.data[0].iataCode)
      await getFlightOffers(code.data[0].iataCode)
    }
    asyncFunc()
  }, [props.location, props.startDate, props.endDate])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  const selectFlight = flightOffer => {
    console.log('Departing flight:', flightOffer)
    if (props.type === 'depart') {
      props.actionProvider.selectDepartingFlight(flightOffer)
    } else {
      props.actionProvider.selectReturningFlight(flightOffer)
    }
  }

  return (
    <div>
      <strong>Flights on {date.toJSON().slice(0, 10)}:</strong>
      <br />
      <i>All times are in the airport's local timezone</i>
      {flightOffers.map(flightOffer => (
        <div
          onClick={() => selectFlight(flightOffer)}
          className='flightBox'
          key={flightOffer.id}
        >
          {/* <strong>Departure Flight:</strong> */}
          <div className='flightPath'>
            <strong className='airportName'>
              {flightOffer.itineraries[0].segments[0].departure.iataCode}
            </strong>{' '}
            <div>{'->'}</div>
            <strong>{flightOffer.itineraries[0].duration.slice(2, 7)}</strong>
            <div>{'->'}</div>
            <strong className='airportName'>
              {flightOffer.itineraries[0].segments[0].arrival.iataCode}
            </strong>{' '}
            {/* from{' '}
            {formatDateTime(
              flightOffer.itineraries[0].segments[0].departure.at
            )}{' '}
            to{' '}
            {formatDateTime(flightOffer.itineraries[0].segments[0].arrival.at)} */}
          </div>
          <div className='flightPath'>
            <div>
              {formatDateTime(
                flightOffer.itineraries[0].segments[0].departure.at
              )}{' '}
            </div>
            <div>
              {formatDateTime(
                flightOffer.itineraries[0].segments[0].arrival.at
              )}
            </div>
          </div>
          <br />
          {/* <strong>Return Flight:</strong> */}
          {/* <div className='flightPath'>
            <strong className='airportName'>
              {flightOffer.itineraries[1].segments[0].departure.iataCode}
            </strong>{' '}
            {'->'}
            <strong className='airportName'>
              {flightOffer.itineraries[1].segments[0].arrival.iataCode}
            </strong>{' '}
            from{' '}
            {formatDateTime(
              flightOffer.itineraries[1].segments[0].departure.at
            )}{' '}
            to{' '}
            {formatDateTime(flightOffer.itineraries[1].segments[0].arrival.at)}
          </div>
          <br /> */}
          <div>
            <strong>
              ${Math.round(flightOffer.price.total * 1.05 * 100) / 100}
            </strong>{' '}
            ({flightOffer.numberOfBookableSeats} seats left)
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

export default FlightSearch
