

export default {
  template:`
    <div class="container">
      <h1>Leaderboard</h1>
  
      <div class="row">
        <div class="col-lg-6 w-100">
          <div class="card mb-3" v-for="(player, index) in rankedPlayers" :key="player.name" :class="getPlayerCardClass(player)">
            <div class="card-body">
              <h5 class="card-title">Rank {{ player.rank }}: {{ relabel(player) }}</h5>
              <div class="card-text">
                <p>Points: {{ player.points }}</p>
                <p>Most Points in a Week: {{ player.mostPointsInWeek }}</p>
                <p>Favorite Team: {{ player.favoriteTeam }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      
    };
  },
  computed: {
    rankedPlayers() {
      // Sort the players array based on points in descending order
      const sortedPlayers = this.players.sort((a, b) => b.points - a.points);

      // Assign ranks to the players
      const rankedPlayers = sortedPlayers.map((player, index) => ({
        ...player,
        rank: index + 1
      }));

      return rankedPlayers;
    },
    players(){
      
      return [
              { name: 'Player M', id:2, points: 100, mostPointsInWeek: 50, favoriteTeam: 'Team X' },
              { name: 'Player K', id:0, points: 200, mostPointsInWeek: 75, favoriteTeam: 'Team Y' },
              { name: 'Player L', id:1, points: 150, mostPointsInWeek: 60, favoriteTeam: 'Team Z' },
              // Add more players...
            ]
      
    },
    currentUserID(){
      if(window.user){
        return 0
      }
      return ''
    }, 
    
  },
  methods: {
    getPlayerCardClass(player) {
      return {
        'bg-primary': player.id === this.currentUserID,
        'text-white': player.id === this.currentUserID
      };
    },
    relabel(player){
      if(player.id === this.currentUserID){
        return "You"
      }
      return player.name
    }    
  }
};
