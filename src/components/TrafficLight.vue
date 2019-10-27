<template id="traffic-light-template">
  <div class="traffic-light">
    <Light
      :color="'red'"
      :isActive="redIsActive"
      :time="redIsActive ? time : null"
      :isBlink="redIsActive ? isBlink : false"/>
    <Light
      :color="'yellow'"
      :isActive="yellowIsActive"
      :time="yellowIsActive ? time : null"
      :isBlink="yellowIsActive ? isBlink : false"/>
    <Light
      :color="'green'"
      :isActive="greenIsActive"
      :time="greenIsActive ? time : null"
      :isBlink="greenIsActive ? isBlink : false"/>
  </div>
</template>

<script>
import Light from './Light';
export default {
  name: 'TrafficLight',
  components: {
    Light
  },
  data: function() {
    return {
      currentLight: 'red',
      prevLight: null,
      time: 10,
      timer: null,
      redIsActive: true,
      yellowIsActive: false,
      greenIsActive: false,
      isBlink: false
    }
  },
  props: {
    lightColor: {
      type: String,
      default: 'red'
    },
    startTime: {
      type: Number
    }
  },
  created: function() {
    this.currentLight = this.lightColor;
    this.prevLight = this.prevLight || this.getRandomPrevLight(['red', 'green']);

    this.setActiveLight(this.currentLight);
    this.startTimer();
  },
  watch: {
    '$route': function () {
      this.prevLight = this.currentLight;
      this.currentLight = this.lightColor;
      this.time = this.startTime;
      this.isBlink = false;
      this.setActiveLight(this.currentLight);
      this.startTimer();
    }
  },
  methods: {
    getRandomPrevLight: function(_arr) {
      var rand = Math.floor(Math.random() * _arr.length);

      return _arr[rand];
    },
    setActiveLight: function(page) {
      switch (page) {
        case 'red':
          this.redIsActive = true;
          this.yellowIsActive = false;
          this.greenIsActive = false;
          break;
        case 'yellow':
          this.redIsActive = false;
          this.yellowIsActive = true;
          this.greenIsActive = false;
          this.isBlink = true;
          break;
        case 'green':
          this.redIsActive = false;
          this.yellowIsActive = false;
          this.greenIsActive = true;
          break;
        default:
          this.redIsActive = true;
          this.yellowIsActive = false;
          this.greenIsActive = false;
      }
    },
    changeLight: function() {

      if(this.currentLight === 'red' || this.currentLight === 'green') {
        this.prevLight = this.currentLight;
        this.$router.replace(`/yellow`);
      }
      else if(this.currentLight === 'yellow' && this.prevLight === 'red') {
        this.prevLight = 'yellow';
        this.$router.replace(`/green`);
      }
      else if(this.currentLight === 'yellow' && this.prevLight === 'green') {
        this.prevLight = 'yellow';
        this.$router.replace(`/red`);
      }
      else if(this.currentLight === 'yellow' && this.prevLight === 'yellow') {
        this.prevLight = 'yellow';
        this.$router.replace(`/green`);
      }
    },
    startTimer: function() {
      this.time = this.startTime;
      if(this.timer) clearInterval(this.timer);

      this.timer = setInterval(this.setCurrentTime, 1000);
    },
    setCurrentTime: function() {
      if(this.time === 3) {
        this.isBlink = true;
      }
      if(this.time > 1) {
        this.time--;
      }
      else {
        clearInterval(this.timer);
        this.changeLight();
      }
    }
  }
}
</script>


<style scoped>
  .traffic-light {
    width: 150px;
    height: 450px;
    background-color: #444444;
    border-radius: 10px;
    margin: 10px auto;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
</style>
