import PlayerCard from './PlayerCardComponent.js';
export default {
  template: `
    <!-- News Subscription Modal -->
    <div class="modal fade" id="newsSubscriptionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="background-color: #333; color: #fff; border-radius: 0.5rem;">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Fantasy Volleyball News Subscription</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Would you like to receive news and updates from Fantasy Volleyball? You can cancel anytime at https://yuchuehw.github.io/fantasyvolleyball/#/subscription
          </div>
          
          <div class="modal-footer">
            <!-- Button to decline news subscription -->
            <button type="button" class="btn btn-secondary"data-bs-dismiss="modal">Let me think about it.</button>
            <!-- Button to decline news subscription -->
            <button type="button" class="btn btn-secondary" @click="dontSubscribe()" data-bs-dismiss="modal">No, thanks</button>
            <!-- Button to confirm news subscription -->
            <button type="button" class="btn btn-primary" @click="subscribe()" data-bs-dismiss="modal">Yes, subscribe</button>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <div v-if="loginSuccess" class="alert alert-info mt-3 position-relative" role="alert">
        Welcome Back!
        <button type="button" class="btn-close position-absolute end-0" @click="loginSuccess = false"></button>
      </div>

      <div v-if="noOpeningWarning" class="alert alert-danger mt-3 position-relative" role="alert">
        Changed not made. Starting roster is full!
        <button type="button" class="btn-close position-absolute end-0" @click="noOpeningWarning = false"></button>
      </div>

      <div v-if="outOfPostionWarning" class="alert alert-danger mt-3 position-relative" role="alert">
        Warning! Highlighted player(s) out of position.
        <button type="button" class="btn-close position-absolute end-0" @click="outOfPostionWarning = false"></button>
      </div>

      <div v-if="actionSuccess" class="alert alert-success mt-3 position-relative" role="alert">
        The roster has been updated!
        <button type="button" class="btn-close position-absolute end-0" @click="actionSuccess = false"></button>
      </div>

      <div v-if="isLoggedIn" class="">
          <div>
            <h1>Roster</h1>
            <div class="row">
              <div class="col-md-4">
                <h3>L</h3>
                <PlayerCard :player="starter[0]" :style="calcStyle(0,'L')">
                  <div style="position:absolute; top:0;right:0">
                    <button class="btn btn-secondary" @click="sendToBench(0)">Bench</button>
                  </div>
                </PlayerCard>
              </div>
              <div class="col-md-4">
                <h3>S</h3>
                <PlayerCard :player="starter[1]" :style="calcStyle(1,'S')">
                  <div style="position:absolute; top:0;right:0">
                    <button class="btn btn-secondary" @click="sendToBench(1)">Bench</button>
                  </div>
                </PlayerCard>
              </div>
              <div class="col-md-4">
                <h3>OPP</h3>
                <PlayerCard :player="starter[2]" :style="calcStyle(2,'OPP')">
                  <div style="position:absolute; top:0;right:0">
                    <button class="btn btn-secondary" @click="sendToBench(2)">Bench</button>
                  </div>
                </PlayerCard>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <h3>MB</h3>
                <PlayerCard :player="starter[3]" :style="calcStyle(3,'MB')">
                  <div style="position:absolute; top:0;right:0">
                    <button class="btn btn-secondary" @click="sendToBench(3)">Bench</button>
                  </div>
                </PlayerCard>
              </div>
              <div class="col-md-6">
                <h3>MB</h3>
                <PlayerCard :player="starter[4]" :style="calcStyle(4,'MB')">
                  <div style="position:absolute; top:0;right:0">
                    <button class="btn btn-secondary" @click="sendToBench(4)">Bench</button>
                  </div>
                </PlayerCard>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <h3>OH</h3>
                <PlayerCard :player="starter[5]" :style="calcStyle(5,'OH')">
                  <div style="position:absolute; top:0;right:0">
                    <button class="btn btn-secondary" @click="sendToBench(5)">Bench</button>
                  </div>
                </PlayerCard>
              </div>
              <div class="col-md-6">
                <h3>OH</h3>
                <PlayerCard :player="starter[6]" :style="calcStyle(6,'OH')">
                  <div style="position:absolute; top:0;right:0">
                    <button class="btn btn-secondary" @click="sendToBench(6)">Bench</button>
                  </div>
                </PlayerCard>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <h3>Bench</h3>
                <div v-for="playerIndexPair in bench" :key="bench">
                  <PlayerCard :player = playerIndexPair[0]>
                    <div style="position:absolute; top:0;right:0">
                      <button class="btn btn-primary" @click="sendToStart(playerIndexPair[1])">Start</button>
                      <button class="btn btn-danger" @click="releasePlayer(playerIndexPair[1])">Release</button>
                    </div>
                  </PlayerCard>
                  <br>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div v-else>
        <p>Please login to access the player roster.</p>
      </div>
    </div>
  `,
  components: {
    PlayerCard,
  },
  data() {
    return {
      loginSuccess: false,
      noOpeningWarning: false,
      actionSuccess: false,
      outOfPostionWarning: false,
      players: [
        {
          "school": "pittsburgh",
          "height": "5-6",
          "week-points": 0,
          "year": "Gr.",
          "position": "DS/L",
          "season-points": 0,
          "name": "Logan Mosley"
        },
        {
          "season-points": 0,
          "year": "Gr.",
          "week-points": 0,
          "height": "5-11",
          "name": "Izzy Ashburn",
          "position": "S",
          "school": "wisconsin"
        },
        {
          "year": "Gr.",
          "season-points": 0,
          "week-points": 0,
          "position": "OPP",
          "height": "6' 2''",
          "school": "louisville",
          "name": "Aiko Jones"
        },
        {
          "height": "-",
          "week-points": 0,
          "season-points": 0,
          "position": "MB",
          "school": "pittsburgh",
          "name": "Chiamaka Nwokolo",
          "year": "Gr."
        },
        {
          "school": "wisconsin",
          "season-points": 0,
          "name": "Gabby McCaa",
          "year": "Gr.",
          "position": "MB/RS",
          "height": "6-3",
          "week-points": 0
        },
        {
          "school": "wisconsin",
          "year": "Gr.",
          "position": "OH",
          "height": "6-2",
          "week-points": 0,
          "season-points": 0,
          "name": "Temi Thomas-Ailara"
        },
        {
          "school": "wisconsin",
          "year": "Gr.",
          "position": "OH",
          "height": "6-2",
          "week-points": 0,
          "season-points": 0,
          "name": "Temi Thomas-Ailara"
        },
        {
          "school": "pittsburgh",
          "position": "S",
          "height": "5-8",
          "season-points": 0,
          "week-points": 0,
          "year": "Gr.",
          "name": "Lexis Akeo"
        },
        {
          "position": "MB",
          "year": "Gr.",
          "school": "pittsburgh",
          "season-points": 0,
          "week-points": 0,
          "height": "6-4",
          "name": "Emma Monks"
        },
        {
          "week-points": 0,
          "position": "S",
          "season-points": 0,
          "name": "Brigitta Petrenko",
          "height": "6' 0''",
          "year": "Gr.",
          "school": "louisville"
        },
      ],
      indexes: [7,8,9,10,11,12,13,14,15,16],
      
    };
  },
  mounted() {
    this.loginSuccess = this.$route.query.success === 'true';
    if(this.$route.query.success === 'true' && window.newUser() == true){
      new bootstrap.Modal(document.getElementById('newsSubscriptionModal')).show();
      
    }
  },
  computed: {
    isLoggedIn() {
      return window.user != null;
    },
    starter() {
      let l = []
      this.players.forEach((element) => {
        if(element){
          l.push(element)
        }else{
          l.push({})
        }
      })
      return l
    },
    bench() {
      let l = [];
      let counter = 7;
      this.players.slice(7).forEach((element) => {
        if(element){
          l.push([element,counter])
        }else{
          l.push([{},counter])
        }
        counter += 1;
      })
      return l
    },
  },
  methods: {
    sendToBench(index){
      [this.players[index],this.players[this.players.length]]=[null, this.players[index]]
      this.actionSuccess = false;
      setTimeout(() => {
        this.actionSuccess = true;
      }, 500);
    },
    sendToStart(index){
      const opening = this.players.indexOf(null)
      if(opening !== -1){
        this.players[opening] = this.players.splice(index,1)[0]
        this.actionSuccess = false;
        setTimeout(() => {
          this.actionSuccess = true;
        }, 500);
      }else{
        this.noOpeningWarning = false;
        setTimeout(() => {
          this.noOpeningWarning = true;
        }, 500);
      }
    },
    releasePlayer(index){
      this.players.splice(index,1)
      this.actionSuccess = false;
      setTimeout(() => {
        this.actionSuccess = true;
      }, 500);
    },
    calcStyle(index,pos){
      const style = {};
      if(!this.players[index] || this.players[index].position.includes(pos)){
        return style;
      }
      style.backgroundColor = "#d8bcbe";
      this.outOfPostionWarning = true;
      return style
    },
    subscribe(){
      window.UpdateSubsribeStatus("true");
    },
    dontSubscribe(){
      window.UpdateSubsribeStatus("false");
    }
  },
};
