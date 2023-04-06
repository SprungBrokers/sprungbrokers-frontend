// create a start date picker widget
//
// Path: pages/chatbot/widgets/StartDatePicker.js
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { createClientMessage } from 'react-chatbot-kit'

const MyDatePicker = props => {
  const [startDate, setStartDate] = useState(new Date())
  if (props.type === 'start') {
    return (
      <div>
        <DatePicker
          startDate={startDate}
          minDate={startDate}
          // selected={startDate}
          onChange={date => {
            props.actionProvider.handleStartDate(date)
          }}
        />
      </div>
    )
  } else {
    return (
      <div>
        <DatePicker
          startDate={props.startDate}
          minDate={props.startDate}
          onChange={date => {
            props.actionProvider.handleEndDate(date)
          }}
        />
      </div>
    )
  }
}

export default MyDatePicker
