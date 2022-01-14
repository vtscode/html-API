const speechObj = new SpeechSynthesisUtterance(document.getElementById('main').innerHTML);

function sayit(){
  speechObj.volume = 1;   // 0.1 sampai 1
  speechObj.rate = 1;     // 0.1 sampai 10
  speechObj.pitch = 2;    // 0 sampai 2
  speechObj.voice = window.speechSynthesis.getVoices().find(voz => voz.lang == "id-ID");
  window.speechSynthesis.speak(speechObj);
}
function speechData(msg) {
  speechObj.text = msg;
}

document.getElementById('startData').addEventListener('click', () => {
  sayit()
})

// show current location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else { 
  document.writeln("Geolocation is not supported by this browser.");
}
function showPosition(position) {
  // document.writeln(`Your Latitude: ${position.coords.latitude} and Longitude: ${position.coords.longitude}`);
  speechData(`Your Latitude: ${position.coords.latitude} and Longitude: ${position.coords.longitude}`);
}
