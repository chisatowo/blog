<template>
	<div>
		<!-- 首页图片  -->
		<el-image class="background-image" v-once lazy style="animation: 2s ease 0s 1 normal none running header-effect;"
			:src="url" fit="cover">
		</el-image>
		<!-- 首页文字 -->
		<div class="signature-wall myCenter my-animation-hideToShow">
			<h1 class="playful">
				<span>GrowthGallery</span>
			</h1>
			<h1 class="playful">
				<span>成长画廊</span>
			</h1>
			<div class="printer">
				<printer :printerInfo="printerInfo">
					<template slot="paper">
						<h3>
							庐山秀出南斗傍,屏风九叠云锦张<span class="cursor">|</span>
						</h3>
					</template>
				</printer>
			</div>
			<div id="bannerWave1"></div>
			<div id="bannerWave2"></div>
			<i class="el-icon-arrow-down" @click="navigation('.page-container-wrap')"></i>
		</div>

		<!-- 首页内容 -->
		<div class="page-container-wrap">
			<div class="page-container">
				<div class="aside-content">
					<MyAside @selectArticle="selectArticle" />
				</div>
				<div class="recent-posts">
					<div class="announcement background-opacity">
						<i class="fa fa-volume-up" aria-hidden="true"></i>
						<div>
							<div>
								哈哈哈哈哈哈哈哈哈哈嗝
							</div>
						</div>
					</div>
					<!-- :articleList="articles" -->

					<articleList :articleList="articles"></articleList>
					<div class="pagination-wrap">
						<!-- <div @click="pageArticles()" class="pagination">
							下一页
						</div> -->
						<div style="user-select: none">
							~~到底啦~~
						</div>
					</div>
				</div>
			</div>

		</div>

		<!-- 页脚 -->
		<div style="background: #375370;">
			<myFooter></myFooter>
		</div>

	</div>
</template>
  
<script>
//import mousedown from '../utils/mousedown';
import MyAside from "./myAside.vue";
import printer from "./common/printer.vue";
import articleList from "./articleList.vue"
import myFooter from "./common/myFooter.vue"
import axios from "axios";

export default {
	data() {
		return {
			pagination: {
				current: 1,
				size: 10,
				total: 0,
				searchKey: "",
				sortId: 0,
				labelId: 0,
				articleSearch: ""
			},
			articles: [],
			fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
			url: 'https://images.unsplash.com/photo-1695018128519-bced2bac1b71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==&auto=format&fit=crop&w=2070&q=80'
		};
	},
	components: {
		MyAside,
		printer,
		articleList,
		myFooter
	},
	created() {
		this.getArticles();
	},
	methods: {
		//获取文章
		async getArticles() {
			await axios({
				method: 'post',
				// url: "http://fastapi.hejianhui.asia:8889/blog/list",
				url: this.$constant.baseURL + "/blog/list",
				data: this.pagination,
			}).then(res => {
				//仅在第一次进入此判断执行
				if (this.articles.length == 0) {
					this.$store.commit("loadTotal", res.data.length);
				}
				this.articles = res.data
			}).catch(() => {
				this.$message({
					message: '文章获取失败',
					type: "error",
				});
			})
		},
		async selectArticle(articleSearch = "", sortId = 0) {
			this.pagination = {
				current: 1,
				size: 10,
				total: 0,
				searchKey: "",
				sortId,
				labelId: 0,
				articleSearch
			}
			this.articles = [];
			await this.getArticles();
			this.$nextTick(() => {
				document.querySelector('.recent-posts').scrollIntoView({
					behavior: "smooth",
					block: "start",
					inline: "nearest"
				});
			});
		},
	}
}
</script>

<style scoped>
.signature-wall {
	/* 向下排列 */
	display: flex;
	flex-direction: column;
	position: relative;
	user-select: none;
	height: 100vh;
	overflow: hidden;
}

.playful {
	color: var(--white);
	font-size: 40px;
}

/*.playful span {*/
/*  position: relative;*/
/*  color: #5362f6;*/
/*  text-shadow: 0.25px 0.25px #e485f8, 0.5px 0.5px #e485f8, 0.75px 0.75px #e485f8,*/
/*  1px 1px #e485f8, 1.25px 1.25px #e485f8, 1.5px 1.5px #e485f8, 1.75px 1.75px #e485f8,*/
/*  2px 2px #e485f8, 2.25px 2.25px #e485f8, 2.5px 2.5px #e485f8, 2.75px 2.75px #e485f8,*/
/*  3px 3px #e485f8, 3.25px 3.25px #e485f8, 3.5px 3.5px #e485f8, 3.75px 3.75px #e485f8,*/
/*  4px 4px #e485f8, 4.25px 4.25px #e485f8, 4.5px 4.5px #e485f8, 4.75px 4.75px #e485f8,*/
/*  5px 5px #e485f8, 5.25px 5.25px #e485f8, 5.5px 5.5px #e485f8, 5.75px 5.75px #e485f8,*/
/*  6px 6px #e485f8;*/
/*  animation: scatter 1.75s infinite;*/
/*  font-weight: normal;*/
/*}*/

/*.playful span:nth-child(2n) {*/
/*  color: #ed625c;*/
/*  text-shadow: 0.25px 0.25px #f2a063, 0.5px 0.5px #f2a063, 0.75px 0.75px #f2a063,*/
/*  1px 1px #f2a063, 1.25px 1.25px #f2a063, 1.5px 1.5px #f2a063, 1.75px 1.75px #f2a063,*/
/*  2px 2px #f2a063, 2.25px 2.25px #f2a063, 2.5px 2.5px #f2a063, 2.75px 2.75px #f2a063,*/
/*  3px 3px #f2a063, 3.25px 3.25px #f2a063, 3.5px 3.5px #f2a063, 3.75px 3.75px #f2a063,*/
/*  4px 4px #f2a063, 4.25px 4.25px #f2a063, 4.5px 4.5px #f2a063, 4.75px 4.75px #f2a063,*/
/*  5px 5px #f2a063, 5.25px 5.25px #f2a063, 5.5px 5.5px #f2a063, 5.75px 5.75px #f2a063,*/
/*  6px 6px #f2a063;*/
/*  animation-delay: 0.3s;*/
/*}*/

/*.playful span:nth-child(3n) {*/
/*  color: #ffd913;*/
/*  text-shadow: 0.25px 0.25px #6ec0a9, 0.5px 0.5px #6ec0a9, 0.75px 0.75px #6ec0a9,*/
/*  1px 1px #6ec0a9, 1.25px 1.25px #6ec0a9, 1.5px 1.5px #6ec0a9, 1.75px 1.75px #6ec0a9,*/
/*  2px 2px #6ec0a9, 2.25px 2.25px #6ec0a9, 2.5px 2.5px #6ec0a9, 2.75px 2.75px #6ec0a9,*/
/*  3px 3px #6ec0a9, 3.25px 3.25px #6ec0a9, 3.5px 3.5px #6ec0a9, 3.75px 3.75px #6ec0a9,*/
/*  4px 4px #6ec0a9, 4.25px 4.25px #6ec0a9, 4.5px 4.5px #6ec0a9, 4.75px 4.75px #6ec0a9,*/
/*  5px 5px #6ec0a9, 5.25px 5.25px #6ec0a9, 5.5px 5.5px #6ec0a9, 5.75px 5.75px #6ec0a9,*/
/*  6px 6px #6ec0a9;*/
/*  animation-delay: 0.15s;*/
/*}*/

/*.playful span:nth-child(5n) {*/
/*  color: #555bff;*/
/*  text-shadow: 0.25px 0.25px #e485f8, 0.5px 0.5px #e485f8, 0.75px 0.75px #e485f8,*/
/*  1px 1px #e485f8, 1.25px 1.25px #e485f8, 1.5px 1.5px #e485f8, 1.75px 1.75px #e485f8,*/
/*  2px 2px #e485f8, 2.25px 2.25px #e485f8, 2.5px 2.5px #e485f8, 2.75px 2.75px #e485f8,*/
/*  3px 3px #e485f8, 3.25px 3.25px #e485f8, 3.5px 3.5px #e485f8, 3.75px 3.75px #e485f8,*/
/*  4px 4px #e485f8, 4.25px 4.25px #e485f8, 4.5px 4.5px #e485f8, 4.75px 4.75px #e485f8,*/
/*  5px 5px #e485f8, 5.25px 5.25px #e485f8, 5.5px 5.5px #e485f8, 5.75px 5.75px #e485f8,*/
/*  6px 6px #e485f8;*/
/*  animation-delay: 0.4s;*/
/*}*/

/*.playful span:nth-child(7n) {*/
/*  color: #ff9c55;*/
/*  text-shadow: 0.25px 0.25px #ff5555, 0.5px 0.5px #ff5555, 0.75px 0.75px #ff5555,*/
/*  1px 1px #ff5555, 1.25px 1.25px #ff5555, 1.5px 1.5px #ff5555, 1.75px 1.75px #ff5555,*/
/*  2px 2px #ff5555, 2.25px 2.25px #ff5555, 2.5px 2.5px #ff5555, 2.75px 2.75px #ff5555,*/
/*  3px 3px #ff5555, 3.25px 3.25px #ff5555, 3.5px 3.5px #ff5555, 3.75px 3.75px #ff5555,*/
/*  4px 4px #ff5555, 4.25px 4.25px #ff5555, 4.5px 4.5px #ff5555, 4.75px 4.75px #ff5555,*/
/*  5px 5px #ff5555, 5.25px 5.25px #ff5555, 5.5px 5.5px #ff5555, 5.75px 5.75px #ff5555,*/
/*  6px 6px #ff5555;*/
/*  animation-delay: 0.25s;*/
/*}*/

.printer {
	cursor: pointer;
	color: var(--white);
	background: var(--translucent);
	border-radius: 10px;
	padding-left: 10px;
	padding-right: 10px;
}

#bannerWave1 {
	height: 84px;
	background: var(--bannerWave1);
	position: absolute;
	width: 200%;
	bottom: 0;
	z-index: 10;
	animation: gradientBG 120s linear infinite;
}

#bannerWave2 {
	height: 100px;
	background: var(--bannerWave2);
	position: absolute;
	width: 400%;
	bottom: 0;
	z-index: 5;
	animation: gradientBG 120s linear infinite;
}

/* 光标 */
.cursor {
	margin-left: 1px;
	animation: hideToShow 0.7s infinite;
	font-weight: 200;
}

.el-icon-arrow-down {
	font-size: 40px;
	font-weight: bold;
	color: var(--white);
	position: absolute;
	bottom: 60px;
	animation: my-shake 1.5s ease-out infinite;
	z-index: 15;
	cursor: pointer;
}

.page-container-wrap {
	background: #375370;
	position: relative;
}

.page-container {
	display: flex;
	justify-content: center;
	width: 90%;
	padding: 0 20px 40px 20px;
	margin: 0 auto;
	flex-direction: row;
}

.recent-posts {
	width: 70%;
}

.announcement {
	padding: 22px;
	border: 1px dashed var(--lightGray);
	color: var(--greyFont);
	border-radius: 10px;
	display: flex;
	max-width: 780px;
	margin: 40px auto 40px;
}

.announcement i {
	color: var(--themeBackground);
	font-size: 22px;
	margin: auto 0;
	animation: scale 0.8s ease-in-out infinite;
}

.announcement div div {
	margin-left: 20px;
	line-height: 30px;
}

.aside-content {
	width: calc(30% - 40px);
	user-select: none;
	margin-top: 40px;
	margin-right: 40px;
	max-width: 300px;
	float: right;
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

@media screen and (max-width: 1100px) {
	.recent-posts {
		width: 100%;
	}

	.page-container {
		width: 100%;
	}
}

@media screen and (max-width: 1000px) {

	.page-container {
		/* 文章栏与侧标栏垂直排列 */
		flex-direction: column;
	}

	.aside-content {
		width: 100%;
		max-width: unset;
		float: unset;
		margin: 40px auto 0;
	}
}

@media screen and (max-width: 768px) {

	h1 {
		font-size: 35px;
	}
}
</style>