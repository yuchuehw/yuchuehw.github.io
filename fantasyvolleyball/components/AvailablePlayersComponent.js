import PlayerCard from './PlayerCardComponent.js';

export default {
  template: `
    <div>
      <div v-if="loginSuccess" class="alert alert-info mt-3 position-relative" role="alert">
        Welcome Back!
        <button type="button" class="btn-close position-absolute end-0" @click="closeSuccessMessage"></button>
      </div>
  
      <div v-if="isLoggedIn">
        <div class="container">
          <h1>Available Players</h1>
  
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
                  <option value="schoolLevel">School Level</option>
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
                    <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
                      Prev
                    </button>
                  </li>
  
                  <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber"
                      :class="{ 'active': pageNumber === currentPage }">
                    <button class="page-link" @click="changePage(pageNumber)">{{ pageNumber }}</button>
                  </li>
  
                  <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                    <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
  
      <div v-else>
        <div class="alert alert-info mt-3 position-relative" role="alert">
          The website is currently only demoing. no email is required to login. go login right now and enjoy the demo!
        </div>
        <p>Please login to access the available players.</p>
      </div>
    </div>
  `,
  components: {
    PlayerCard,
  },
  data() {
    return {
      loginSuccess: false,
      players: [
        { name: 'Player A', position: 'L', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player B', position: 'S', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player C', position: 'OPP', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player D', position: 'MB', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player E', position: 'MB', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player F', position: 'OH', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player G', position: 'OH', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player H', position: 'L', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player I', position: 'OH', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player J', position: 'MB', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player K', position: 'MB', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player L', position: 'MB', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player M', position: 'MB', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player N', position: 'MB', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player O', position: 'MB', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player P', position: 'MB', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player Q', position: 'MB', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player R', position: 'MB', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player S', position: 'MB', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        { name: 'Player T', position: 'MB', school: 'UCLA', schoolLevel: 'FR', points: '999' },
        
      ],
      sortKey: 'name',
      showOwnedPlayers: false,
      perPage: 5,
      currentPage: 1,
    };
  },
  mounted() {
    this.loginSuccess = this.$route.query.success === 'true';
  },
  computed: {
    isLoggedIn() {
      return window.user != null;
    },
    filteredList() {
      let list = this.players.slice();

      // Apply filter by owned players
      if (!this.showOwnedPlayers) {
        list = list.filter(player => !player.owned);
      }

      // Sort the list based on the selected key
      list.sort((a, b) => a[this.sortKey].localeCompare(b[this.sortKey]));

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
  },
};
