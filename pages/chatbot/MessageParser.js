class MessageParser {
  constructor (actionProvider) {
    this.actionProvider = actionProvider
    this.state = {
      name: '',
      currMessage: 0
    }
  }

  parse (message) {
    console.log(message)
    const lowercase = message.toLowerCase()

    if (this.state.currMessage === 0) {
      console.log ('first')
      this.state.name = message
      this.actionProvider.greet(message)
      this.state.currMessage++
      this.actionProvider.showLocationPicker()
    } else if (this.state.currMessage == 1) {
      this.state.currMessage++
    }

    if (lowercase.includes('javascript') || lowercase.includes('js')) {
      this.actionProvider.handleJavascriptQuiz()
    }
  }
}

export default MessageParser
