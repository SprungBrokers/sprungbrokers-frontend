import Autocomplete from 'react-google-autocomplete'
import { createClientMessage } from 'react-chatbot-kit'

const AutocompleteLocation = props => {
  const onPlaceSelectedFun = place => {
    if (props.type === 'origin') {
      return props.actionProvider.handleOriginLocation(place)
    } else if(props.type === 'dest') {
      return props.actionProvider.handleDestinationLocation(place)
    } else {
      return props.actionProvider.handleHotelLocation(place)
    }
  }

  return (
    <div>
      <Autocomplete
        apiKey={'AIzaSyB_finGlSz_UwQQBDZN1iTYG86dB1RCK5I'}
        style={{
          width: '30%',
          height: '40px',
          paddingLeft: '16px',
          marginTop: '2px',
          marginBottom: '10px',
          borderRadius: '5px'
        }}
        onPlaceSelected={onPlaceSelectedFun}
        types={['(cities)']}
      />
    </div>
  )
}

export default AutocompleteLocation
