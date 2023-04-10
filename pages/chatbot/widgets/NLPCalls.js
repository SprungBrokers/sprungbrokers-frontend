var myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')

export const getGPTResponse = (
  statement,
  details,
  messageHistory,
  messageH
) => {
  var raw = JSON.stringify({
    statement: statement,
    details: JSON.stringify(details),
    message_history: messageHistory,
    message_h: messageH
  })

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  return fetch('http://127.0.0.1:5000', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      return result
    })
    .catch(error => console.log('error', error))
}
