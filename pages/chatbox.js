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
    originLocationLat: '',
    originLocationLng: '',
    originLocation: '',
    destLocationLat: '',
    destLocationLng: '',
    destLocation: '',
    hotelLocation: '',
    hotelLocationLat: '',
    hotelLocationLng: '',
    checkInDate: '',
    checkOutDate: '',
    startDate: '',
    endDate: '',
    departingFlight: '',
    returningFlight: '',
    selectedHotel: '',
  },
  widgets: [
    {
      widgetName: 'javascriptQuiz',
      widgetFunc: props => <JavascriptQuiz {...props} />
    },
    {
      widgetName: 'originautocompleteLocation',
      widgetFunc: props => <AutocompleteLocation {...props} type='origin'/>
    },
    {
      widgetName: 'destautocompleteLocation',
      widgetFunc: props => <AutocompleteLocation {...props} type='dest'/>
    },
    {
      widgetName: 'hotelautocompleteLocation',
      widgetFunc: props => <AutocompleteLocation {...props} type='hotel'/>
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
        'startDate',
        'endDate'
      ]
    },
    {
      widgetName: 'hotelSearch',
      widgetFunc: props => <HotelSearch {...props}/>,
      mapStateToProps: [
        'hotelLocation',
        'hotelLocationLat',
        'hotelLocationLng',
        'checkInDate',
        'checkOutDate'
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
      mapStateToProps: ['selectedHotel']
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
