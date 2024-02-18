<template>
  <div>
    <!-- 两句诗 -->
    <div class="my-animation-slide-top">
      <twoPoem></twoPoem>
    </div>

    <div style="background: var(--background);padding-top: 40px;" class="my-animation-slide-bottom">
      <!-- 标签 -->
      <div class="sort-warp shadow-box" v-if="!$common.isEmpty(sort) && !$common.isEmpty(sort.labels)">
        <div v-for="(label, index) in sort.labels" :key="index"
          :class="{ isActive: !$common.isEmpty(labelId) && parseInt(labelId) === label.id }"
          @click="listArticle(label.id)">

          <proTag :info="label.name" :color="$constant.before_color_list[Math.floor(Math.random() * 6)]"
            style="margin: 12px"></proTag>

        </div>
      </div>

      <!-- 文章 -->
      <div class="article-wrap">
        <articleList :articleList="articles"></articleList>
        <div class="pagination-wrap">
          <div @click="pageArticles()" v-if="pagination.total !== articles.length" class="pagination">
            下一页
          </div>
          <div v-else style="user-select: none">
            ~~到底啦~~
          </div>
        </div>
      </div>
      <!-- 页脚 -->
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>
const articleList = () => import("./articleList");
const myFooter = () => import("./common/myFooter");
const proTag = () => import("./common/proTag");
const twoPoem = () => import("./common/twoPoem");
import axios from "axios";
export default {
  components: {
    twoPoem,
    articleList,
    myFooter,
    proTag,
  },

  data() {
    return {
      sortId: this.$route.query.sortId,
      labelId: this.$route.query.labelId,
      sort: null,
      pagination: {
        page: 1,
        pageSize: 5,
        title: "",
        sortId: this.$route.query.sortId,
        labelId: this.$route.query.labelId
      },
      articles: []
    }
  },

  computed: {},

  watch: {
    $route() {
      this.pagination = {
        page: 1,
        pageSize: 5,
        title: "",
        sortId: this.$route.query.sortId,
        labelId: this.$route.query.labelId
      };
      this.articles.splice(0, this.articles.length);
      this.sortId = this.$route.query.sortId;
      this.labelId = this.$route.query.labelId;
      this.getSort();
      this.getArticles();
    }
  },

  created() {
    console.log("create");
    this.getSort();
    this.getArticles();
  },

  mounted() {
  },

  methods: {
    //下一页
    pageArticles() {
      this.pagination.page = this.pagination.page + 1;
      this.getArticles();
    },
    getSort() {
      let sortInfo = this.$store.state.sortInfo;
      if (!this.$common.isEmpty(sortInfo)) {
        let sortArray = sortInfo.filter(f => {
          return f.id === parseInt(this.sortId);
        });
        if (!this.$common.isEmpty(sortArray)) {
          this.sort = sortArray[0];
        }
      }
    },
    listArticle(labelId) {
      this.labelId = labelId;
      this.pagination = { ...this.pagination, page: 1, labelId, sortId: this.$route.query.sortId, }
      //先清空文章(视觉效果而已)
      this.articles = [];
      this.$nextTick(() => {
        this.getArticles();
      });
    },
    async getArticles() {
      await axios({
        method: 'get',
        url: this.$constant.baseURL + "/article/page",
        params: this.pagination,
      }).then(res => {
        if (!this.$common.isEmpty(res.data)) {
          this.articles = this.articles.concat(res.data.data.records);
          this.pagination.total = res.data.data.total;
        }
      }).catch(() => {
        this.$message({
          message: '文章获取失败',
          type: "error",
        });
      })
    }
  }
}
</script>

<style scoped>
.sort-warp {
  width: 70%;
  max-width: 780px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
}

.article-wrap {
  width: 70%;
  margin: 40px auto;
  min-height: 600px;
}

.isActive {
  animation: scale 1.5s ease-in-out infinite;
}

.pagination-wrap {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.pagination {
  padding: 13px 15px;
  border: 1px solid var(--lightGray);
  border-radius: 3rem;
  color: var(--greyFont);
  width: 100px;
  user-select: none;
  cursor: pointer;
  text-align: center;
}

.pagination:hover {
  border: 1px solid var(--themeBackground);
  color: var(--themeBackground);
  box-shadow: 0 0 5px var(--themeBackground);
}


@media screen and (max-width: 900px) {
  .sort-warp {
    width: 90%;
  }

  .article-wrap {
    width: 90%;
  }
}
</style>
