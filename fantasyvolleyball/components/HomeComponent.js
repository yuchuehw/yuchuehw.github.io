export default{
  template: `
    <div>
      <div v-if="logoutSuccess" class="alert alert-info mt-3 position-relative" role="alert">
        Logged out successfully!
        <button type="button" class="btn-close position-absolute end-0" @click="logoutSuccess=false"></button>
      </div>

      <div v-if="alreadyLoggedIn" class="alert alert-info mt-3 position-relative" role="alert">
        Info:You are already Logged in.
        <button type="button" class="btn-close position-absolute end-0" @click="alreadyLoggedIn = false"></button>
      </div>
      <div v-if="incorrectBrowserError" class="alert alert-danger mt-3 position-relative" role="alert">
        The link must be open in the same browser it is requested in. Logged in unsuccessful.
        <button type="button" class="btn-close position-absolute end-0" @click="incorrectBrowserError = false"></button>
      </div>
      
      <h1 class="mb-4">Welcome to Fantasy Volleyball</h1>
      <div class="row">
        <div v-for="article in articles" :key="article.id" class="col-md-4">
          <div class="card mb-4">
            <img :src="article.thumbnail" class="card-img-top" alt="Article Thumbnail">
            <div class="card-body">
              <h5 class="card-title">{{ article.title }}</h5>
              <p class="card-text">{{ article.summary }}</p>
              <router-link :to="'/article/' + article.id" class="btn btn-primary">Read More</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      articles: [
        {
          id: 0,
          title: "Article 1",
          summary: "Summary of Article 1",
          thumbnail: "https://duckduckgo.com/i/4586c410.jpg",
        },
        {
          id: 1,
          title: "Article 2",
          summary: "Summary of Article 2",
          thumbnail: "https://duckduckgo.com/i/4586c410.jpg",
        },
        {
          id: 2,
          title: "Article 3",
          summary: "Summary of Article 3",
          thumbnail: "https://duckduckgo.com/i/4586c410.jpg",
        },
        {
          id: 3,
          title: "Article 4",
          summary: "Summary of Article 4",
          thumbnail: "https://duckduckgo.com/i/4586c410.jpg",
        },
      ],
      logoutSuccess: false,
      incorrectBrowserError: false,
      alreadyLoggedIn: false,
    };
  },
  mounted() {
    this.logoutSuccess = this.$route.query.success === "true";
    const href = window.location.href
    if(href.includes("?apiKey")){
      let email = localStorage.getItem('email')
      if(window.user){
        this.alreadyLoggedIn = true;
      }
      else if(!email){
        this.incorrectBroweserError = true;
      }else{
        let promise = window.handleEmailLog(email, window.location.href)
        promise.then((results) => {
          window.user = results
          this.$router.push({path: "/roster", query: {success: true}});
        });
      }
    }
  },
  methods: {
    
  },
};