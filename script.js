// Function to fetch data from ThingSpeak
var temp1;
function fetchFlowData() {
  if(temp3===1){
  fetch('https://api.thingspeak.com/channels/2516914/feeds.json?results=1')
  .then(response => response.json())
  .then(data => {
    const latestEntry = data.feeds[0];
    const field1Value = latestEntry.field1;
    const field2Value = latestEntry.field2;
    document.getElementById('dataDisplay').innerHTML = `Flow sensor 1: ${field1Value}<br>Flow sensor 2: ${field2Value}`;
    enableButtons();
  })
  .catch(error => console.error('Error fetching data:', error));
}
}

function fetchPressureData() {
  if(temp2===1){
  fetch('https://api.thingspeak.com/channels/2516914/feeds.json?results=1')
  .then(response => response.json())
  .then(data => {
    const latestEntry = data.feeds[0];
    const field3Value = latestEntry.field3;
    const field4Value = latestEntry.field4;

    document.getElementById('dataDisplay').innerHTML = `Field3: ${field3Value}<br>Field4: ${field4Value}`;
    enableButtons();
  })
  .catch(error => console.error('Error fetching data:', error));
}
}

function checkData() {
  if(temp1===1){
  fetch('https://api.thingspeak.com/channels/2516914/feeds.json?results=1')
  .then(response => response.json())
  .then(data => {
    const latestEntry = data.feeds[0];
    const field1Value = latestEntry.field1;
    const field2Value = latestEntry.field2;
    const field3Value = latestEntry.field3;
    const field4Value = latestEntry.field4;

    document.getElementById('dataDisplay').innerHTML = `Field1: ${field1Value}<br>Field2: ${field2Value}<br>Field3: ${field3Value}<br>Field4: ${field4Value}`;
    const status = document.getElementById('status');
    if (field1Value === field2Value && field3Value === field4Value) {
      status.innerText = 'Fields are stable';
      status.style.color = 'green';
    } else {
      status.innerText = 'Fields are unstable';
      status.style.color = 'red';
    }
  })
  .catch(error => console.error('Error fetching data:', error))
}
}

function disableButtons() {
  document.getElementById('flowButton').disabled = true;
  document.getElementById('pressureButton').disabled = true;
  document.getElementById('checkButton').disabled = true;
}

function enableButtons() {
  document.getElementById('flowButton').disabled = false;
  document.getElementById('pressureButton').disabled = false;
  document.getElementById('checkButton').disabled = false;
}

// Event listeners for buttons
document.getElementById('flowButton').addEventListener('click', () => {
  document.getElementById('status').style.display = 'none';
  document.getElementById('dataDisplay').style.display = 'block';
  document.getElementById('dataDisplay').classList.add("glow");
  temp1=0;
  temp2=0;
  temp3=1;
  fetchFlowData();
  setInterval(fetchFlowData, 1000);// Continuously check every 5 seconds
});

document.getElementById('pressureButton').addEventListener('click', () => {
  document.getElementById('status').style.display = 'none';
  document.getElementById('dataDisplay').style.display = 'block';
  document.getElementById('dataDisplay').classList.add("glow");
  temp1=0;
  temp2=1;
  temp3=0;
  fetchPressureData();
  setInterval(fetchPressureData, 1000); // Continuously check every 5 seconds
});

document.getElementById('checkButton').addEventListener('click', () => {
  temp2=0;
  temp3=0;
  temp1=1;
  document.getElementById('dataDisplay').style.display = 'block';
  document.getElementById('dataDisplay').classList.add("glow");
  document.getElementById('status').style.display = '';
  checkData();
  setInterval(checkData, 1000); // Continuously check every 5 seconds
});
document.getElementById('reset').addEventListener('click', () => {
  temp2=0;
  temp3=0;
  temp1=0;
  document.getElementById('dataDisplay').style.display = 'none';
  document.getElementById('status').style.display = 'none';
  checkData();
  setInterval(checkData, 1000); // Continuously check every 5 seconds
});
function downloadCSV() {
  // Replace 'YOUR_CHANNEL_ID' with your ThingSpeak channel ID
  var channelID = '2516914';
  var url = 'https://api.thingspeak.com/channels/' + channelID + '/feeds.csv';

  // Fetch the CSV data from ThingSpeak
  fetch(url)
      .then(response => response.blob())
      .then(blob => {
          // Create a temporary link element
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);

          // Set the file name
          link.setAttribute('download', 'channel_data.csv');

          // Append the link to the body
          document.body.appendChild(link);

          // Trigger the click event to start the download
          link.click();

          // Remove the link from the body
          document.body.removeChild(link);
      });
}
