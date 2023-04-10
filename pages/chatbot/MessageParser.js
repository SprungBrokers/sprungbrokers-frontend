import React, { useState, useEffect } from 'react'

class MessageParser {
  constructor (actionProvider, state) {
    this.actionProvider = actionProvider
    this.state = state
  }

  responseToState = response => {
    const details = response.details
    //TODO: Map all values in details to state
    if (details.start_date) {
      this.setState(prev => ({
        ...prev,
        startDate: details.start_date
      }))
    }
    if (details.end_date) {
      this.setState(prev => ({
        ...prev,
        endDate: details.end_date
      }))
    }
    if (details.location) {
      this.setState(prev => ({
        ...prev,
        location: details.location
      }))
    }
    if (details.budget) {
      this.setState(prev => ({
        ...prev,
        budget: details.budget
      }))
    }
  }

  getTripInfo = message => {
    if (!this.state.name) {
      this.actionProvider.greet(message)
    } else {
      return this.actionProvider.handleGPTPrompt(message, this.state)
    }
  }

  fetch_backend = async message => {
    // TODO(backend): Backend replace with API
    // const response = await fetch(backend)
    // const response_json = await response.json()

    const response = JSON.stringify({
      message: '',
      booking: true,
      details: {
        location: 'Paris, France',
        start_date: null,
        end_date: null
      }
    })
    const response_json = JSON.parse(response)
    return response_json
  }

  // Call backend and update state
  parse = async message => {
    const lowercase = message.toLowerCase()
    console.log(message)

    // const response = await this.fetch_backend(message)

    // if (response.booking === false) {
    //   // Send NLP message
    //   return
    // }

    // this.responseToState(response)

    // TODO(backend): Need to know if hotel or flight
    // Code below assumes flight
    // if (type == flight) {this.getFlightInfo()}

    this.getTripInfo(message)
  }
}

export default MessageParser
