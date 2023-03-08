import React, { useState } from 'react'

const formatDateTime = date => {
  // takes a string in the format of YYYY-MM-DDTHH:MM:SS and returns a string in the format of HH:MM AM/PM
  const time = date.slice(11, 16)
  const hour = time.slice(0, 2)
  const minutes = time.slice(3, 5)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const formattedHour = hour % 12 || 12
  return `${formattedHour}:${minutes} ${ampm}`
}

const FlightItinerary = props => {
  const [departingFlight, setDepartingFlight] = useState('')
  const [returningFlight, setReturningFlight] = useState('')

  // format this data to display in a nice way:
  //   props.departingFlight = {
  //             "type": "flight-offer",
  //             "id": "1",
  //             "source": "GDS",
  //             "instantTicketingRequired": false,
  //             "nonHomogeneous": false,
  //             "oneWay": false,
  //             "lastTicketingDate": "2023-03-08",
  //             "numberOfBookableSeats": 3,
  //             "itineraries": [
  //                 {
  //                     "duration": "PT1H22M",
  //                     "segments": [
  //                         {
  //                             "departure": {
  //                                 "iataCode": "DTW",
  //                                 "terminal": "EM",
  //                                 "at": "2023-03-15T20:45:00"
  //                             },
  //                             "arrival": {
  //                                 "iataCode": "ORD",
  //                                 "terminal": "5",
  //                                 "at": "2023-03-15T21:07:00"
  //                             },
  //                             "carrierCode": "DL",
  //                             "number": "1645",
  //                             "aircraft": {
  //                                 "code": "717"
  //                             },
  //                             "operating": {
  //                                 "carrierCode": "DL"
  //                             },
  //                             "duration": "PT1H22M",
  //                             "id": "2",
  //                             "numberOfStops": 0,
  //                             "blacklistedInEU": false
  //                         }
  //                     ]
  //                 }
  //             ],
  //             "price": {
  //                 "currency": "EUR",
  //                 "total": "186.04",
  //                 "base": "160.00",
  //                 "fees": [
  //                     {
  //                         "amount": "0.00",
  //                         "type": "SUPPLIER"
  //                     },
  //                     {
  //                         "amount": "0.00",
  //                         "type": "TICKETING"
  //                     }
  //                 ],
  //                 "grandTotal": "186.04"
  //             },
  //             "pricingOptions": {
  //                 "fareType": [
  //                     "PUBLISHED"
  //                 ],
  //                 "includedCheckedBagsOnly": false
  //             },
  //             "validatingAirlineCodes": [
  //                 "DL"
  //             ],
  //             "travelerPricings": [
  //                 {
  //                     "travelerId": "1",
  //                     "fareOption": "STANDARD",
  //                     "travelerType": "ADULT",
  //                     "price": {
  //                         "currency": "EUR",
  //                         "total": "186.04",
  //                         "base": "160.00"
  //                     },
  //                     "fareDetailsBySegment": [
  //                         {
  //                             "segmentId": "2",
  //                             "cabin": "ECONOMY",
  //                             "fareBasis": "UA7NA0MQ",
  //                             "brandedFare": "MAINCABIN",
  //                             "class": "U",
  //                             "includedCheckedBags": {
  //                                 "quantity": 0
  //                             }
  //                         }
  //                     ]
  //                 }
  //             ]
  //         }
  // data above is an example of what the flight data looks like. We need to format it to display in a nice way.

  return (
    <div>
      <div className='flightPath'>
        <div className='flightPath__depart'>
          <div className='flightPath__depart--header'>
            <h3>Departing Flight</h3>
          </div>
          <div className='flightPath__depart--body'>
            <div className='flightPath__depart--body--flight'>
              <div className='flightPath__depart--body--flight--header'>
                <h4>Date</h4>
              </div>
              <div className='flightPath__depart--body--flight--body'>
                <p>
                  {new Date(
                    props.departingFlight.itineraries[0].segments[0].departure.at
                  )
                    .toJSON()
                    .slice(0, 10)
                    .replace(/-/g, '/')}
                </p>
              </div>
            </div>
            <div className='flightPath__depart--body--flight'>
              <div className='flightPath__depart--body--flight--header'>
                <h4>Flight</h4>
              </div>
              <div className='flightPath__depart--body--flight--body'>
                <p>
                  {props.departingFlight.itineraries[0].segments[0].carrierCode}{' '}
                  {props.departingFlight.itineraries[0].segments[0].number}
                </p>
              </div>
            </div>
            <div className='flightPath__depart--body--flight'>
              <div className='flightPath__depart--body--flight--header'>
                <h4>Departure</h4>
              </div>
              <div className='flightPath__depart--body--flight--body'>
                <p>
                  {
                    props.departingFlight.itineraries[0].segments[0].departure
                      .iataCode
                  }
                </p>
              </div>
            </div>
            <div className='flightPath__depart--body--flight'>
              <div className='flightPath__depart--body--flight--header'>
                <h4>Arrival</h4>
              </div>
              <div className='flightPath__depart--body--flight--body'>
                <p>
                  {
                    props.departingFlight.itineraries[0].segments[0].arrival
                      .iataCode
                  }
                </p>
              </div>
            </div>
            <div className='flightPath__depart--body--flight'>
              <div className='flightPath__depart--body--flight--header'>
                <h4>Departure Time</h4>
              </div>
              <div className='flightPath__depart--body--flight--body'>
                <p>
                  {formatDateTime(
                    props.departingFlight.itineraries[0].segments[0].departure
                      .at
                  )}
                </p>
              </div>
            </div>
            <div className='flightPath__depart--body--flight'>
              <div className='flightPath__depart--body--flight--header'>
                <h4>Arrival Time</h4>
              </div>
              <div className='flightPath__depart--body--flight--body'>
                <p>
                  {formatDateTime(
                    props.departingFlight.itineraries[0].segments[0].arrival.at
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='flightPath__return'>
          <div className='flightPath__return--header'>
            <h3>Returning Flight</h3>
          </div>
          <div className='flightPath__return--body'>
            <div className='flightPath__depart--body--flight'>
              <div className='flightPath__depart--body--flight--header'>
                <h4>Date</h4>
              </div>
              <div className='flightPath__depart--body--flight--body'>
                <p>
                  {new Date(
                    props.returningFlight.itineraries[0].segments[0].departure.at
                  )
                    .toJSON()
                    .slice(0, 10)
                    .replace(/-/g, '/')}
                </p>
              </div>
            </div>
            <div className='flightPath__return--body--flight'>
              <div className='flightPath__return--body--flight--header'>
                <h4>Flight</h4>
              </div>
              <div className='flightPath__return--body--flight--body'>
                <p>
                  {props.returningFlight.itineraries[0].segments[0].carrierCode}{' '}
                  {props.returningFlight.itineraries[0].segments[0].number}
                </p>
              </div>
            </div>
            <div className='flightPath__return--body--flight'>
              <div className='flightPath__return--body--flight--header'>
                <h4>Departure</h4>
              </div>
              <div className='flightPath__return--body--flight--body'>
                <p>
                  {
                    props.returningFlight.itineraries[0].segments[0].departure
                      .iataCode
                  }
                </p>
              </div>
            </div>
            <div className='flightPath__return--body--flight'>
              <div className='flightPath__return--body--flight--header'>
                <h4>Arrival</h4>
              </div>
              <div className='flightPath__return--body--flight--body'>
                <p>
                  {
                    props.returningFlight.itineraries[0].segments[0].arrival
                      .iataCode
                  }
                </p>
              </div>
            </div>
            <div className='flightPath__return--body--flight'>
              <div className='flightPath__return--body--flight--header'>
                <h4>Departure Time</h4>
              </div>
              <div className='flightPath__return--body--flight--body'>
                <p>
                  {formatDateTime(
                    props.returningFlight.itineraries[0].segments[0].departure
                      .at
                  )}
                </p>
              </div>
            </div>
            <div className='flightPath__return--body--flight'>
              <div className='flightPath__return--body--flight--header'>
                <h4>Arrival Time</h4>
              </div>
              <div className='flightPath__return--body--flight--body'>
                <p>
                  {formatDateTime(
                    props.returningFlight.itineraries[0].segments[0].arrival.at
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flightPath__price'>
        <div className='flightPath__price--header'>
          <h3>Total Price</h3>
        </div>
        <div className='flightPath__price--body'>
          <p>
            $
            {Math.round(
              (parseFloat(props.departingFlight.price.total) +
                parseFloat(props.returningFlight.price.total)) *
                1.05 *
                100
            ) / 100}
          </p>
        </div>
      </div>
      <style jsx>{`
        .flightPath {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          border: 1px solid #000;
        }
        .flightPath__depart {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 50%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .flightPath__depart--header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 10%;
          margin: 0;
          padding: 0;
        }
        .flightPath__depart--body {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 90%;
          margin: 0;
          padding: 0;
        }
        .flightPath__depart--body--flight {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 20%;
          margin: 0;
          padding: 0;
        }
        .flightPath__depart--body--flight--header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .flightPath__depart--body--flight--body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .flightPath__return {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 50%;

          height: 100%;
          margin: 0;
          padding: 0;
        }
        .flightPath__return--header {
          display: flex;
          flex-direction: column;

          justify-content: center;
          align-items: center;
          width: 100%;
          height: 10%;
          margin: 0;
          padding: 0;
        }
        .flightPath__return--body {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 90%;
          margin: 0;
          padding: 0;
        }
        .flightPath__return--body--flight {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 20%;
          margin: 0;
          padding: 0;
        }
        .flightPath__return--body--flight--header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .flightPath__return--body--flight--body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .flightPath__price {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .flightPath__price--header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 10%;
          margin: 0;
          padding: 0;
        }
        .flightPath__price--body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 90%;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  )
}

export default FlightItinerary
