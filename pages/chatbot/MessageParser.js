import React, { useState, useEffect } from 'react'

class MessageParser {
  constructor (actionProvider, state) {
    this.actionProvider = actionProvider
    this.state = state
  }
  
  getFlightInfo = () => {
    if (!this.state.startDate) {
      this.actionProvider.handleStartDatePicker()
    } else if (!this.state.endDate) {
      this.actionProvider.handleStartDate()
    } else if (!this.state.originLocation) {
      this.actionProvider.showOriginLocationPicker()
    } else if (!this.state.destLocation) {
      this.actionProvider.showDestinationLocationPicker()
    } else if (!this.state.departingFlight) {
      this.actionProvider.handleFlightSearch()
    } else if (!this.state.returningFlight) {
      this.actionProvider.handleReturnFightSearch()
    }
  }

  fetch_backend = async (message) => {
    // TODO(backend): Backend replace with API
    // const response = await fetch(backend)
    // const response_json = await response.json()

    const response = JSON.stringify({
      message: "",
      booking: true,
      details: {
        location: "Paris, France",
        start_date: null,
        end_date: null
      }
    })
    const response_json = JSON.parse(response)
    return response_json
  }

  // Call backend and update state
  parse = async (message) => {
    console.log(message)

    const response = await this.fetch_backend(message)

    if (response.booking === false) {
      // Send NLP message
      return
    }

    this.actionProvider.responseToState(response)

    // TODO(backend): Need to know if hotel or flight
    // Code below assumes flight
    // if (type == flight) {this.getFlightInfo()}

    this.getFlightInfo()
  }
}

export default MessageParser
