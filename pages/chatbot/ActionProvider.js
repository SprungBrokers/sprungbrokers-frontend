// import backend call functions from NLPCalls.js
import { getGPTResponse } from './widgets/NLPCalls.js'

class ActionProvider {
  constructor (createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage
    this.createClientMessage = createClientMessage
    this.setState = setStateFunc
  }

  greet = name => {
    console.log(name)
    this.setState(prev => ({
      ...prev,
      name: name
    }))
    this.name = name

    const message = this.createChatBotMessage(
      `Hello ${name}! Please provide me information to help me book your trip. It would be helpful if you could provide your budget, location, and the start and end dates for your trip. You can also ask me questions to help you decide where to go!`,
      {
        withAvatar: false
      }
    )
    this.addMessageToState(message)
  }

  handleGPTPrompt = (message, state) => {
    // const userMessage = this.createClientMessage(message)
    // this.addMessageToState(userMessage)

    console.log(state.startDate)
    console.log(state.endDate)
    console.log(state.location)
    console.log(state.budget)

    const response = getGPTResponse(
      message,
      {
        start_date: state.startDate,
        end_date: state.endDate,
        budget: state.budget,
        location: state.location
      },
      state.messageHistory,
      state.messageH
    )

    response.then(response => {
      if (response.is_booking == false) {
        this.setState(prev => ({
          ...prev,
          messageHistory: response.message_history
        }))

        const botMessage = this.createChatBotMessage(response.message, {
          withAvatar: false
        })
        this.addMessageToState(botMessage)
      } else {
        let oldStartDate = state.startDate
        let oldEndDate = state.endDate
        let oldLocation = state.location
        let oldBudget = state.budget

        this.setState(prev => ({
          ...prev,
          startDate: response.details.start_date,
          endDate: response.details.end_date,
          location: response.details.location,
          budget: response.details.budget,
          messageH: response.message_h
        }))
        console.log(response.details)
        if (response.message != null) {
          const botMessage = this.createChatBotMessage(response.message, {
            withAvatar: false
          })
          this.addMessageToState(botMessage)
        }

        if (
          response.details.start_date &&
          response.details.end_date &&
          response.details.location &&
          response.details.budget
        ) {
          this.handleFlightSearch(state)
        }
      }
    })
  }

  flightsOrHotels = () => {
    const message = this.createChatBotMessage(
      'Would you like to book flights or hotels?',
      {
        withAvatar: false
      }
    )
    this.addMessageToState(message)
  }

  showOriginLocationPicker = () => {
    const message = this.createChatBotMessage('Where are you flying from?', {
      widget: 'originautocompleteLocation',
      withAvatar: false
    })
    this.addMessageToState(message)
  }

  showDestinationLocationPicker = () => {
    const message = this.createChatBotMessage('Where would you like to go?', {
      widget: 'destautocompleteLocation',
      withAvatar: false
    })
    this.addMessageToState(message)
  }

  showHotelLocationPicker = () => {
    const message = this.createChatBotMessage('Where would you like to stay?', {
      widget: 'hotelautocompleteLocation',
      withAvatar: false
    })
    this.addMessageToState(message)
  }

  handleHotelLocation = place => {
    const userMessage = this.createClientMessage(place.formatted_address)
    this.setState(prev => ({
      ...prev,
      hotelLocation: place.formatted_address,
      hotelLocationLat: place.geometry.location.lat(),
      hotelLocationLng: place.geometry.location.lng()
    }))

    this.addMessageToState(userMessage)
    const message = this.createChatBotMessage(
      `Great! You want to stay at ${place.formatted_address}.`,
      {
        withAvatar: false
      }
    )
    this.addMessageToState(message)
    this.handleCheckInDatePicker()
  }

  handleOriginLocation = place => {
    const userMessage = this.createClientMessage(place.formatted_address)
    this.setState(prev => ({
      ...prev,
      originLocation: place.formatted_address,
      originLocationLat: place.geometry.location.lat(),
      originLocationLng: place.geometry.location.lng()
    }))

    this.addMessageToState(userMessage)
    const message = this.createChatBotMessage(
      `Great! You want to fly from ${place.formatted_address}.`,
      {
        withAvatar: false
      }
    )
    this.addMessageToState(message)
    this.showDestinationLocationPicker()
  }

  handleDestinationLocation = place => {
    const userMessage = this.createClientMessage(place.formatted_address)
    this.setState(prev => ({
      ...prev,
      destLocation: place.formatted_address,
      destLocationLat: place.geometry.location.lat(),
      destLocationLng: place.geometry.location.lng()
    }))

    this.addMessageToState(userMessage)
    const message = this.createChatBotMessage(
      `Great! You want to go to ${place.formatted_address}.`,
      {
        withAvatar: false
      }
    )
    this.addMessageToState(message)
    this.handleStartDatePicker()
  }

  handleStartDatePicker = () => {
    const message = this.createChatBotMessage('When would you like to leave?', {
      widget: 'startDatePicker',
      withAvatar: false
    })
    this.addMessageToState(message)
  }

  handleStartDate = date => {
    console.log('hello')
    const userMessage = this.createClientMessage(date.toLocaleDateString())
    this.setState(prev => ({
      ...prev,
      startDate: date
    }))
    console.log(this.state)
    this.addMessageToState(userMessage)
    const message = this.createChatBotMessage(
      `Great! You want to leave on ${date.toLocaleDateString()}. When would you like to return?`,
      {
        withAvatar: false,
        widget: 'endDatePicker'
      }
    )
    this.addMessageToState(message)
  }

  handleEndDate = date => {
    const userMessage = this.createClientMessage(date.toLocaleDateString())
    this.setState(prev => ({
      ...prev,
      endDate: date
    }))

    this.addMessageToState(userMessage)
    const message = this.createChatBotMessage(
      `Great! You want to return on ${date.toLocaleDateString()}. Let me look for some flights for you.`,
      {
        withAvatar: false
      }
    )
    this.addMessageToState(message)
    this.handleFlightSearch()
    // this.handleCheckInDatePicker()
  }

  handleCheckInDatePicker = () => {
    const message = this.createChatBotMessage(
      'Would you like to book a hotel for the duration of your stay?',
      {
        widget: 'checkInDatePicker',
        withAvatar: false
      }
    )
    this.addMessageToState(message)
  }

  handleHotelCheckInDate = date => {
    const userMessage = this.createClientMessage(date.toLocaleDateString())
    this.setState(prev => ({
      ...prev,
      checkInDate: date
    }))
    this.addMessageToState(userMessage)
    const message = this.createChatBotMessage(
      `Great! You want to check-in on ${date.toLocaleDateString()}. When would you like to check-out?`,
      {
        withAvatar: false,
        widget: 'checkOutDatePicker'
      }
    )
    this.addMessageToState(message)
  }

  handleHotelCheckOutDate = date => {
    const userMessage = this.createClientMessage(date.toLocaleDateString())
    this.setState(prev => ({
      ...prev,
      checkOutDate: date
    }))

    this.addMessageToState(userMessage)
    const message = this.createChatBotMessage(
      `Great! You want to check-out on ${date.toLocaleDateString()}. Let me look for some hotels for you.`,
      {
        withAvatar: false
      }
    )
    this.addMessageToState(message)
    this.handleHotelSearch()
  }

  handleFlightSearch = state => {
    if (state.hasSearchedFlights) {
      this.removeLastBotMessageFromState(state)
    }
    const message = this.createChatBotMessage(
      'Please pick a departing flight from the list below.',
      {
        withAvatar: false,
        widget: 'flightSearch'
      }
    )
    this.addMessageToState(message)
    this.setState(prev => ({
      ...prev,
      hasSearchedFlights: true
    }))
  }

  handleReturnFlightSearch = () => {
    const message = this.createChatBotMessage(
      'Please pick a returning flight from the list below.',
      {
        withAvatar: false,
        widget: 'returnFlightSearch'
      }
    )
    this.addMessageToState(message)
  }

  selectDepartingFlight = flight => {
    const userMessage = this.createClientMessage('Selected flight ' + flight.id)
    this.setState(prev => ({
      ...prev,
      departingFlight: flight,
      flightCost: parseFloat(flight.price.total)
    }))
    this.addMessageToState(userMessage)
    const message = this.createChatBotMessage(
      `Great! You picked a departing flight! Now let's pick a return flight`,
      {
        withAvatar: false
      }
    )
    this.addMessageToState(message)
    this.handleReturnFlightSearch()
  }

  selectReturningFlight = flight => {
    const userMessage = this.createClientMessage('Selected flight ' + flight.id)
    this.setState(prev => ({
      ...prev,
      returningFlight: flight,
      flightCost: prev.flightCost + parseFloat(flight.price.total)
    }))
    this.addMessageToState(userMessage)
    console.log(flight)
    const message = this.createChatBotMessage(
      `Great! You picked a return flight! Here is your flight itinerary`,
      {
        widget: 'flightItinerary',
        withAvatar: false
      }
    )
    this.addMessageToState(message)
    this.handleHotelSearch()
  }

  handleHotelSearch = () => {
    // {Math.round(
    //           (parseFloat(state.departingFlight.price.total) +
    //             parseFloat(state.returningFlight.price.total)) *
    //             1.05 *
    //             100
    //         ) / 100}
    const message = this.createChatBotMessage(
      // `Let's pick a hotel for your stay! You have $${} remaining in your $${} budget. Please pick a hotel from the list below.`,
      "Let's pick a hotel for your stay! Please pick a hotel from the list below: (Note: Hotels in green are within your budget)",
      {
        withAvatar: false,
        widget: 'hotelSearch'
      }
    )
    this.addMessageToState(message)
  }

  selectHotel = hotelOffer => {
    const userMessage = this.createClientMessage(
      'Select hotel ' + hotelOffer.hotel.name
    )
    this.setState(prev => ({
      ...prev,
      selectedHotel: hotelOffer
    }))
    this.addMessageToState(userMessage)
    console.log(hotelOffer)

    const message = this.createChatBotMessage(
      'Great! You picked a hotel! Here is your hotel itinerary',
      {
        widget: 'hotelItinerary',
        withAvatar: false
      }
    )
    this.addMessageToState(message)
  }

  showBudgetMessage = (flightCost, hotelCost, budget) => {
    flightCost = parseFloat(flightCost)
    hotelCost = parseFloat(hotelCost)
    budget = parseFloat(budget)
    let message =
      "Your trip's current cost is $" + (flightCost + hotelCost) + '.'
    if (parseFloat(budget) - flightCost - hotelCost < 0) {
      message += ` You have exceeded your budget by $${(
        flightCost +
        hotelCost -
        parseFloat(budget)
      ).toFixed(2)}!`
    } else {
      message += ` You have $${(
        parseFloat(budget) -
        flightCost -
        hotelCost
      ).toFixed(2)} remaining in your $${budget} budget!`
    }
    const botMessage = this.createChatBotMessage(message, {
      withAvatar: false
    })
    this.addMessageToState(botMessage)
  }

  handleJavascriptQuiz = () => {
    const message = this.createChatBotMessage(
      'Fantastic. Here is your quiz. Good luck!',
      {
        widget: 'javascriptQuiz'
      }
    )

    this.addMessageToState(message)
  }

  addMessageToState = message => {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message]
    }))
  }

  removeLastBotMessageFromState = state => {
    this.setState(prevState => ({
      ...prevState,
      messages: prevState.messages.filter(
        message => message.widget !== 'flightSearch'
      )
    }))
  }
}

export default ActionProvider
