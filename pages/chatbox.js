import React from 'react'
import Chatbot, { createChatBotMessage } from 'react-chatbot-kit'

// import config from "./chatbot/chatbotConfig";
import MessageParser from './chatbot/MessageParser'
import ActionProvider from './chatbot/ActionProvider'
import JavascriptQuiz from './chatbot/widgets/JavascriptQuiz'
import AutocompleteLocation from './chatbot/widgets/AutocompleteLocation'
import MyDatePicker from './chatbot/widgets/DatePicker'
import FlightSearch from './chatbot/widgets/FlightSearch'
import HotelSearch from './chatbot/widgets/HotelSearch'
import FlightItinerary from './chatbot/widgets/FlightItinerary'
import HotelItinerary from './chatbot/widgets/HotelItinerary'

import 'react-chatbot-kit/build/main.css'

import styles from '../styles/Chatbox.module.css'

const config = {
  initialMessages: [
    createChatBotMessage(
      "Hey! Welcome to SprungBroker. Let's get you started on booking a trip with us!",
      {
        withAvatar: false
      }
    ),
    createChatBotMessage("What's your name?")
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E'
    },
    chatButton: {
      backgroundColor: '#5ccc9d'
    }
  },
  state: {
    name: '',
    messageHistory: [
      {
        role: 'user',
        content: `Respond to the user as if you were a travel recommendation AI. 
          If the user asks for recommendations on where to travel, recommend specific places (cities, resorts, etc). 
          Keep your responses short.`
      }
    ],
    messageH: [
      {
        role: 'system',
        content: `For all prompts, you must respond with a JSON object that adheres to the following format:
{"follow_up_question": , "start_date": , "end_date": , "budget": , "location": }

To ensure compliance with the rules, please follow these guidelines:

1. Respond only with JSON in the specified format.
2. Dates must be in the format YYYY-MM-DD.
3. Use the airport code of the nearest airport to the user's desired travel destination as the location.
4. Do not change non-null values unless the user provides a new value for that field.
5. If any values in the JSON remain null, continue to update the follow_up_question field to create a question to ask the user to retrieve all missing values.
6. There MUST be a follow_up_question if any of the other JSON values are null.
7. Always keep track of all values that the user has provided and return them if the user does not provide a new value for that field.
8. If the user asks to change any of the values, do not change any of the other values besides the specified one. 
9. If the start_date, end_date, budget, and location values are all non-null, do not ask a follow up question.
10. Do not assume any information other than that the user has provided, except that today's date is April 10th 2023.

Example of a valid conversation:
User: I want to go to Paris
Assistant: {"follow_up_question": "What is your budget?", "start_date": null, "end_date": null, "budget": null, "location": "CDG" }
User: "1200 dollars"
Assistant: {"follow_up_question": "When do you want to go?", "start_date": null, "end_date": null, "budget": "1200", "location": "CDG" }
User: "April 21st to April 28th"
Assistant: {"follow_up_question": null, "start_date": "2023-04-21", "end_date": "2023-04-28", "budget": "1200", "location": "CDG" }

Another valid conversation:
User: I want to go to Miami next week and stay for 5 days.
Assistant: {"follow_up_question": "What is your budget?", "start_date": "2023-04-17", "end_date": "2023-04-22", "budget": null, "location": "MIA" }
User: "I want to spend 2000 dollars"
Assistant: {"follow_up_question": null, "start_date": "2023-04-17", "end_date": "2023-04-22", "budget": "2000", "location": "MIA" }
User: "Actually I want to go to Dallas instead"
Assistant: {"follow_up_question": null, "start_date": "2023-04-17", "end_date": "2023-04-22" "budget": "2000", "location": "DFW" }`
      }
    ],
    // Flight
    originLocationLat: '',
    originLocationLng: '',
    originLocation: '',
    destLocationLat: '',
    destLocationLng: '',
    location: null,
    budget: null,
    startDate: null,
    endDate: null,
    departingFlight: '',
    returningFlight: '',
    address: null,
    hasSearchedFlights: false,
    flightCost: 0,
    // Hotel
    hotelLocation: '',
    hotelLocationLat: '',
    hotelLocationLng: '',
    checkInDate: '',
    checkOutDate: '',
    selectedHotel: ''
  },
  widgets: [
    {
      widgetName: 'javascriptQuiz',
      widgetFunc: props => <JavascriptQuiz {...props} />
    },
    {
      widgetName: 'originautocompleteLocation',
      widgetFunc: props => <AutocompleteLocation {...props} type='origin' />
    },
    {
      widgetName: 'destautocompleteLocation',
      widgetFunc: props => <AutocompleteLocation {...props} type='dest' />
    },
    {
      widgetName: 'hotelautocompleteLocation',
      widgetFunc: props => <AutocompleteLocation {...props} type='hotel' />
    },
    {
      widgetName: 'startDatePicker',
      widgetFunc: props => <MyDatePicker {...props} type='start' />
    },
    {
      widgetName: 'endDatePicker',
      widgetFunc: props => <MyDatePicker {...props} type='end' />,
      mapStateToProps: ['startDate']
    },
    {
      widgetName: 'checkInDatePicker',
      widgetFunc: props => <MyDatePicker {...props} type='checkin' />
    },
    {
      widgetName: 'checkOutDatePicker',
      widgetFunc: props => <MyDatePicker {...props} type='checkout' />,
      mapStateToProps: ['checkInDate']
    },
    {
      widgetName: 'flightSearch',
      widgetFunc: props => <FlightSearch {...props} type='depart' />,
      mapStateToProps: [
        'locationLat',
        'locationLng',
        'location',
        'startDate',
        'endDate'
      ]
    },
    {
      widgetName: 'returnFlightSearch',
      widgetFunc: props => <FlightSearch {...props} type='return' />,
      mapStateToProps: [
        'originLocationLat',
        'originLocationLng',
        'originLocation',
        'destLocationLat',
        'destLocationLng',
        'destLocation',
        'location',
        'startDate',
        'endDate'
      ]
    },
    {
      widgetName: 'hotelSearch',
      widgetFunc: props => <HotelSearch {...props} />,
      mapStateToProps: [
        'address',
        'hotelLocationLat',
        'hotelLocationLng',
        'startDate',
        'endDate',
        'location',
        'budget',
        'flightCost'
      ]
    },
    {
      widgetName: 'flightItinerary',
      widgetFunc: props => <FlightItinerary {...props} />,
      mapStateToProps: ['departingFlight', 'returningFlight']
    },
    {
      widgetName: 'hotelItinerary',
      widgetFunc: props => <HotelItinerary {...props} />,
      mapStateToProps: ['selectedHotel', 'flightCost', 'budget']
    }
  ]
}

function ChatBox () {
  return (
    <div>
      <Chatbot
        className={styles.chatboxStyles}
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  )
}

export default ChatBox
