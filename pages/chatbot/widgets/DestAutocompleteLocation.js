import Autocomplete from 'react-google-autocomplete'
import { createClientMessage } from 'react-chatbot-kit'

const DestAutocompleteLocation = props => {
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
          onPlaceSelected={place => {
            props.actionProvider.handleDestinationLocation(place)
          }}
          types={['(cities)']}
        />
      </div>
    )
  }

export default DestAutocompleteLocation