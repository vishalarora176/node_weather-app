const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const location = document.querySelector('input').value
  messageOne.textContent = 'loading...'
  messageTwo.textContent = ''
  fetch('/weather?address=' + location).then(response => {
    response.json()
    .then(parsedData => {
      if (parsedData.error) {
        messageOne.textContent = parsedData.error
        messageTwo.textContent = ''
      } else {
        messageOne.textContent = parsedData.location
        messageTwo.textContent = parsedData.forecast
      }
    })
  })
})

