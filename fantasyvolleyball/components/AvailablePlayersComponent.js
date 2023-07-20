import PlayerCard from './PlayerCardComponent.js';

export default {
  template: `
    <div v-if="isLoading">
      <div class="loading-container" style="justify-content: center; align-items: center;">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <p class="ml-2">Your data is loading... Please wait.</p>
      </div>
    </div>
    <div v-else>
      <div class="container">
        <h1>Top Players</h1>
        <div class="row">
          <div class="col-md-4">
            <div class="mb-3">
              <label for="statsKey">Stats:</label>
              <select id="statsKey" class="form-select">
                <option value="kill">Kills</option>
                <option value="pct">Kill%</option>
                <option value="block">Blocks</option>
                <option value="assist">Assists</option>
                <option value="dig">Digs</option>
                <option value="ace">Aces</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="mb-3">
              <label for="sortKey">Sort by:</label>
              <select id="sortKey" class="form-select" v-model="sortKey">
                <option value="name">Name</option>
                <option value="position">Position</option>
                <option value="school">School</option>
                <option value="year">School Level</option>
                <option value="points">Points</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="mb-3">
              <label for="perPage">Results per page:</label>
              <select id="perPage" class="form-select" v-model="perPage">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
          </div>
          <div class="d-flex align-items-end">
            <div class="mb-3 form-check">
              <input id="showOwnedPlayers" class="form-check-input" type="checkbox" v-model="showOwnedPlayers">
              <label class="form-check-label" for="showOwnedPlayers">Show owned players</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div v-for="player in filteredList" :key="player.name">
              <PlayerCard :player="player"></PlayerCard>
              <br>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <nav aria-label="Page navigation">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                  <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1"> Prev </button>
                </li>
                <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ 'active': pageNumber === currentPage }">
                  <button class="page-link" @click="changePage(pageNumber)">{{ pageNumber }}</button>
                </li>
                <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                  <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"> Next </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  `,
  components: {
    PlayerCard,
  },
  data() {
    return {
      isLoading: true,
      loginSuccess: false,
      sortKey: 'name',
      showOwnedPlayers: false,
      perPage: 5,
      currentPage: 1,
    };
  },
  mounted() {
    console.log("on mounted event." + (new Date().getTime() / 1000))
    this.loadDataFromDB();
    this.loginSuccess = this.$route.query.success === 'true';
  },
  computed: {
    players(){
      return window.players_holder || []
    },
    isLoggedIn() {
      return window.user != null;
    },
    filteredList() {
      console.log("bad event." + (new Date().getTime() / 1000))
      let list = this.players.slice();

      // Apply filter by owned players
      if (!this.showOwnedPlayers) {
        list = list.filter(player => !player.owned);
      }

      // Sort the list based on the selected key
      list.sort((a, b) => {
        const yearOrder = ["Fr.", "R-Fr.", "So.", "R-So.", "Jr.", "R-Jr.", "Sr.", "R-Sr.", "Gr."];
        const aSortValue = (this.sortKey == "year") ? yearOrder.indexOf(a.year.replace(/ /g,'')) : a[this.sortKey];
        const bSortValue = (this.sortKey == "year") ? yearOrder.indexOf(b.year.replace(/ /g,'')) : b[this.sortKey];
        
      
        if (typeof aSortValue === 'string' && typeof bSortValue === 'string') {
          return aSortValue.localeCompare(bSortValue);
        } else {
          return aSortValue - bSortValue; // If not strings, assume numeric and perform numeric comparison
        }
      });

      // Pagination
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      const totalPages = Math.ceil(list.length / this.perPage);
      this.totalPages = totalPages;
      list = list.slice(startIndex, endIndex);

      return list;
    },
  },
  methods: {
    closeSuccessMessage() {
      this.loginSuccess = false;
    },
    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
    },
    loadDataFromDB(){
      if(window.players_holder == null || window.players_holder.length == 0){
        window.getAllPlayers()
          .then((querySnapshot) => {
            console.log("processing event." + (new Date().getTime() / 1000))
            window.players_holder =  querySnapshot;
          })
          .catch((error) => {
            console.log(error)
            window.players_holder = [
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
                "school": "louisville",
                "position": "S",
                "season-points": 0,
                "year": "So.",
                "week-points": 0,
                "height": "5' 11''",
                "name": "Alexis Finnvold"
              }
              ,
              {
                "height": "6' 0''",
                "name": "Anna DeBeer",
                "school": "louisville",
                "season-points": 0,
                "position": "OH",
                "year": "Sr.",
                "week-points": 0
              }
              ,
              {
                "position": "MB/RS",
                "school": "wisconsin",
                "name": "Anna Smrek",
                "height": "6-9",
                "week-points": 0,
                "year": "Jr.",
                "season-points": 0
              }
              ,
              {
                "wee k-points": 0,
                "season-points": 0,
                "height": "6-3",
                "name": "Asjia O'Neal",
                "year": "R-Sr.",
                "position": "MB",
                "school": "texas"
              },
              {
                "name": "Ayden  Bartlett",
                "week-points": 0,
                "position": "L/DS",
                "season-points": 0,
                "school": "louisville",
                "year": "Sr.",
                "height": "5' 7''"
              },
              {
                "name": "Bella Bergmark",
                "year": "R-Sr.",
                "week-points": 0,
                "season-points": 0,
                "position": "MB",
                "height": "6-2",
                "school": "texas"
              },
              {
                "name": "Bre Kelley",
                " school": "pittsburgh",
                "height": "6-4",
                "week-points": 0,
                "year": "Jr.",
                "season-points": 0,
                "position": "MB"
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
              {
                "height": "6' 6''",
                "year": "R-So.",
                "school": "louisville",
                "season-points": 0,
                "week-points": 0,
                "position": "MB",
                "name": "Cara Cresse"
              }
            ]
          })
          .finally(() => {
            console.log("finally event." + (new Date().getTime() / 1000))
            this.isLoading = false;
          })
      }else{
        this.isLoading = false;
      }
      
    }
  },
};
