const mainNode = document.getElementById('main');
const speechObj = new SpeechSynthesisUtterance(mainNode.innerHTML);
function speechData(msg) {
  speechObj.text = msg;
}

async function sayit(){
  speechObj.volume = 1;   // 0.1 sampai 1
  speechObj.rate = 1;     // 0.1 sampai 10
  speechObj.pitch = 2;    // 0 sampai 2
  speechObj.voice = window.speechSynthesis.getVoices().find(voz => voz.lang == "id-ID");
  // await new Promise(function(resolve) {
  //   speechObj.text = resolve;
    window.speechSynthesis.speak(speechObj);
  // });
}

document.getElementById('startData').addEventListener('click', () => {
  sayit()
})

// show current location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  mainNode.innerHTML += 'Geolocation is not supported by this browser.'
}
function showPosition(position) {
  mainNode.innerHTML += `Your Latitude: ${position.coords.latitude} and Longitude: ${position.coords.longitude}`
  speechData(`Your Latitude: ${position.coords.latitude} and Longitude: ${position.coords.longitude}`);
}
