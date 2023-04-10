import React, { useEffect } from 'react'

const HotelItinerary = props => {
  const hotel = props.selectedHotel
  const offer = hotel.offers[0]
  const num_adults = offer.guests.adults ?? 0
  const num_children = offer.guests.children ?? 0 //idek if children is a parameter

  const flightCost = props.flightCost
  const budget = props.budget

  // Run the props.actionProvider.showBudgetMessage(flightCost, offer.price.total, budget) function after the component mounts
  useEffect(() => {
    props.actionProvider.showBudgetMessage(
      flightCost,
      offer.price.total,
      budget
    )
  }, [])

  return (
    <div>
      <div className='hotelBooking'>
        <div className='hotelBooking--header'>
          <h3>Hotel Itinerary Outline</h3>
        </div>

        <div className='hotelBooking__left'>
          <div className='hotelBooking__left--hotel'>
            <div className='hotelBooking__left--hotel--header'>
              <h4>Name</h4>
            </div>
            <div className='hotelBooking__left--hotel--body'>
              <p>{hotel.hotel.name}</p>
            </div>
          </div>
          <div className='hotelBooking__left--hotel'>
            <div className='hotelBooking__left--hotel--header'>
              <h4>Check In</h4>
            </div>
            <div className='hotelBooking__left--hotel--body'>
              <p>{offer.checkInDate.replace('-', '/')}</p>
            </div>
          </div>
          <div className='hotelBooking__right--hotel'>
            <div className='hotelBooking__right--hotel--header'>
              <h4>Check Out</h4>
            </div>
            <div className='hotelBooking__right--hotel--body'>
              <p>{offer.checkOutDate.replace('-', '/')}</p>
            </div>
          </div>
          <div className='hotelBooking__left--hotel'>
            <div className='hotelBooking__left--hotel--header'>
              <h4>Adults</h4>
            </div>
            <div className='hotelBooking__left--hotel--body'>
              <p>{num_adults}</p>
            </div>
          </div>
          <div className='hotelBooking__right--hotel'>
            <div className='hotelBooking__right--hotel--header'>
              <h4>Children</h4>
            </div>
            <div className='hotelBooking__right--hotel--body'>
              <p>{num_children}</p>
            </div>
          </div>
          <div className='hotelBooking__right--hotel'>
            <div className='hotelBooking__right--hotel--header'>
              <h4>City</h4>
            </div>
            <div className='hotelBooking__right--hotel--body'>
              <p>{hotel.hotel.cityCode}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='hotel__price'>
        <div ClassName='hotel__price--header'>
          <h3>Description</h3>
        </div>
        <div className='hotel__price--body'>{offer.room.description.text}</div>
      </div>

      <div className='hotel__price'>
        <div className='hotel__price--header'>
          <h3>Total Price</h3>
        </div>
        <div className='hotel__price--body'>
          <p>${Math.round(parseFloat(offer.price.total) * 100) / 100}</p>
        </div>
      </div>

      <style jsx>{`
        .hotelBooking {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          border: 1px solid #000;
        }
        .hotelBooking--header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 10%;
          margin: 0;
          padding: 0;
        }
        .hotelBooking__left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 50%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .hotelBooking__left--hotel {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 20%;
          margin: 0;
          padding: 0;
        }
        .hotelBooking__left--hotel--header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .hotelBooking__left--hotel--body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .hotelBooking__right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 50%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .hotelBooking__right--hotel {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 20%;
          margin: 0;
          padding: 0;
        }
        .hotelBooking__right--hotel--header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .hotelBooking__right--hotel--body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .hotelBooking__description {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        .hotel__description--header {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 10%;
          margin: 0;
          padding: 0;
        }
        .hotel__description--body {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .hotel__price {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .hotel__price--header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 10%;
          margin: 0;
          padding: 0;
        }
        .hotel__price--body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          width: 80%;
          height: 90%;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  )
}

export default HotelItinerary
