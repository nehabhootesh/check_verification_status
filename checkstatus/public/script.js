document.getElementById('checkButton').addEventListener('click', async function() {
  const hashValue = document.getElementById('hashInput').value;

  try {
    const passengerResponse = await fetch('/checkPassengerVerification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ hashValue })
    });

    const passengerData = await passengerResponse.json();

    const driverResponse = await fetch('/checkDriverVerification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ hashValue })
    });

    const driverData = await driverResponse.json();

    let statusMessage = '';

    if (passengerData.userId) {
      statusMessage += `Passenger ID: ${passengerData.userId}<br>`;
    }

    if (driverData.userId) {
      statusMessage += `Driver ID: ${driverData.userId}`;
      console.log(driverData.userId);
    }

    if (statusMessage === '') {
      statusMessage = 'User details are yet to be verified.';
    }

    document.getElementById('statusMessage').innerHTML = statusMessage;
  } catch (error) {
    console.error('Error:', error.message);
    document.getElementById('statusMessage').innerText = 'An error occurred. Please try again.';
  }
});
