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
  // const [destinationCode, setDestinationCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [show, setShow] = useState(true)

  const {
    originLocationLat,
    originLocationLng,
    originLocation,
    location,
    startDate,
    endDate
  } = props

  let date = startDate
  if (props.type === 'return') {
    date = endDate
  }

  useEffect(() => {
    setLoading(true)
    const asyncFunc = async () => {
      // const departureDate = startDate.toISOString().slice(0, 10)
      // const returnDate = endDate.toISOString().slice(0, 10)
      const departureDate = startDate
      const returnDate = endDate
      const getFlightOffers = async (destinationCode, originCode) => {
        setLoading(true)
        try {
          const data = await getFlightOffersAPI(
            originCode,
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
      const originCode = await getDestinationCodeAPI(
        originLocationLat,
        originLocationLng
      )
      console.log(location)
      await getFlightOffers(location, 'ORD')
    }
    asyncFunc()
  }, [props.destLocation, props.originLocation, props.startDate, props.endDate])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  const selectFlight = flightOffer => {
    console.log('Departing flight:', flightOffer)
    if (props.type === 'depart') {
      setShow(false)
      props.actionProvider.selectDepartingFlight(flightOffer)
    } else {
      setShow(false)
      props.actionProvider.selectReturningFlight(flightOffer)
    }
  }

  if (!show) {
    return null
  } else if (flightOffers?.length === 0) {
    return <div>Sorry, there are no nonstop flights available on {date} </div>
  } else {
    return (
      <div>
        <strong>Flights on {date}:</strong>
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
                ${Math.round(flightOffer.price.total * 100) / 100}
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
}

export default FlightSearch
