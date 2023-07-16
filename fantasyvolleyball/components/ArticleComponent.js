export default {
  template: `
    <div class="article-page" v-if="article">
      <div class="text-center">
        <img :src="article.image" class="img-fluid mb-3 w-100" :alt="article.title">
      </div>
      <div class="container">
        <h1 class="text-center">{{ article.title }}</h1>
        <p class="text-center">Author: {{ article.author }}</p>
        <p class="text-center">Publish Date: {{ article.publishDate }}</p>
        <div class="text-left">
          <p>{{ article.content }}</p>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      articles: [
        {
          id: 0,
          title: "Sample Article",
          author: "John Doe",
          publishDate: "2023-07-01",
          image: "https://duckduckgo.com/i/4586c410.jpg",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          id: 1,
          title: "Sample Article",
          author: "John Doe",
          publishDate: "2023-07-01",
          image: "https://duckduckgo.com/i/4586c410.jpg",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          id: 2,
          title: "Sample Article",
          author: "John Doe",
          publishDate: "2023-07-01",
          image: "https://duckduckgo.com/i/4586c410.jpg",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          id: 3,
          title: "Sample Article",
          author: "John Doe",
          publishDate: "2023-07-01",
          image: "https://duckduckgo.com/i/4586c410.jpg",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
      ],
    };
  },
  computed: {
    article() {
      const id = parseInt(this.$route.params.id);
      console.log("id:" + id)
      console.log("articles:" + this.articles.length)
      if (Number.isInteger(id) && id >= 0 && id < this.articles.length) {
        return this.articles[id];
      } else {
        this.$router.push("/404");
        return null;
      }
    },
  },
};