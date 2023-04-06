class ActionProvider {
  constructor (createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage
    this.createClientMessage = createClientMessage
    this.setState = setStateFunc
    // this.state = {
    //   name: '',
    //   location: '',
    //   startDate: '',
    //   endDate: '',
    //   currMessage: 0
    // }
  }

  greet = name => {
    console.log(name)
    this.setState(prev => ({
      ...prev,
      name: name
    }))

    const message = this.createChatBotMessage(`Hello ${name}!`, {
      withAvatar: false
    })
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
    const userMessage = this.createClientMessage(date.toLocaleDateString())
    this.setState(prev => ({
      ...prev,
      startDate: date
    }))
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
    this.handleHotelSearch()
  }

  handleFlightSearch = () => {
    const message = this.createChatBotMessage(
      'Please pick a departing flight from the list below.',
      {
        withAvatar: false,
        widget: 'flightSearch'
      }
    )
    this.addMessageToState(message)
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
      departingFlight: flight
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
      returningFlight: flight
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
    // this.handleHotelSearch()
  }

  handleHotelSearch = () => {
    const message = this.createChatBotMessage(
      'Please pick a hotel from the list below.',
      {
        withAvatar: false,
        widget: 'hotelSearch'
      }
    )
    this.addMessageToState(message)
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
}

export default ActionProvider
