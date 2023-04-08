class MessageParser {
  constructor (actionProvider) {
    this.actionProvider = actionProvider
    this.state = {
      name: '',
      currMessage: 0
    }
  }

  responseToState = (response) => {
    const details = response.details
    //TODO: Map all values in details to state
    if (details.start_date) {
      this.state.startDate = details.start_date
    }    
    if (details.end_date) {
      this.state.endDate = details.end_date
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
    const lowercase = message.toLowerCase()
    console.log(message)

    const response = await this.fetch_backend(message)

    if (response.booking === false) {
      // Send NLP message
      return
    }

    this.responseToState(response)

    if (!this.state.startDate) {
      this.actionProvider.handleStartDatePicker()
    }


    // TODO(backend): Need to know if hotel or flight
    // Code below assumes flight
    // Verify all values in details are non null



    // if (this.state.currMessage === 0) {
    //   console.log ('first')
    //   this.state.name = message
    //   this.actionProvider.greet(message)
    //   this.state.currMessage++
    //   this.actionProvider.showHotelLocationPicker()
    // } else if (this.state.currMessage == 1) {
    //   this.state.currMessage++
    // }

    // if (lowercase.includes('javascript') || lowercase.includes('js')) {
    //   this.actionProvider.handleJavascriptQuiz()
    // }
  }
}

export default MessageParser
