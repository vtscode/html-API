<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :span="3">
        <p>Choose Type Voice</p>
        <a-select
          style="width: 120px"
          v-model="optSpeech.voice"
          @change="handleChangeVoiceLanguage"
        >
          <a-select-option
            v-for="(optVoice, idx) in listVoices"
            :value="optVoice.name"
            :key="idx"
          >
            {{ optVoice.name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :span="3">
        <p>Set Volume</p>
        <a-input-number
          name="volume"
          :min="0.1"
          :max="1"
          :step="0.1"
          v-model="optSpeech.volume"
          placeholder="Volume"
        />
      </a-col>
      <a-col :span="3">
        <p>Set Pitch</p>
        <a-input-number
          name="pitch"
          :min="0"
          :max="2"
          :step="1"
          v-model="optSpeech.pitch"
          placeholder="Pitch"
        />
      </a-col>
      <a-col :span="3">
        <p>Set Rate</p>
        <a-input-number
          name="rate"
          :min="0.1"
          :max="10"
          :step="0.1"
          v-model="optSpeech.rate"
          placeholder="Rate"
        />
      </a-col>
    </a-row>
    
    <br/>
    <br/>
    <h1>{{ location }}</h1>
    
    <a-button :size="'large'" @click="sayit">SPEAK TO ME</a-button>
  </div>
</template>

<script>
const speechObj = new SpeechSynthesisUtterance();
export default {
  name: 'Home',
  data() {
    return {
      location: '',
      optSpeech: this.$store.state.speech.optSpeech,
      listVoices: this.$store.state.speech.listVoiceLang,
    }
  },
  watch: {
    optSpeech: {
      handler(val){
        console.log(val)
        this.$store.dispatch('speech/actionsObjSpeech',val)
      },
      deep:true,
    }
  },
  mounted() {
    // show current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      this.location = 'Geolocation is not supported by this browser.'
    }

    const dataVoices = [];
    window.speechSynthesis.getVoices().forEach(function(voice) {
      dataVoices.push({
        name: voice.name,
        lang: voice.lang,
        default: voice.default,
        localService: voice.localService,
        voiceURI: voice.voiceURI,
      })
    });

    this.listVoices = dataVoices
    if(dataVoices.length) {
      this.$store.dispatch({
        type: 'speech/actionListVoicesLang',
        voices: dataVoices
      })
    }
  },
  methods: {
    // https://www.coingecko.com/en/api/documentation
    // https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=idr
    handleChangeVoiceLanguage(val) {
      const dtLang = this.listVoices.find(x => x.name === val)
      this.optSpeech = {...this.optSpeech, voice: dtLang.lang}
    },
    speechData(msg) {
      speechObj.text = msg;
    },
    sayit(){
      speechObj.volume = this.optSpeech.volume;   // 0.1 sampai 1
      speechObj.rate = this.optSpeech.rate;     // 0.1 sampai 10
      speechObj.pitch = this.optSpeech.pitch;    // 0 sampai 2
      speechObj.text = this.optSpeech.text;
      speechObj.voice = window.speechSynthesis.getVoices().find(voz => voz.lang == this.optSpeech.voice);
      window.speechSynthesis.speak(speechObj);
    },
    showPosition(position) {
      const data = `Your Latitude: ${position.coords.latitude} and Longitude: ${position.coords.longitude}`;
      this.location = data
      this.optSpeech = {...this.optSpeech, text: data}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
