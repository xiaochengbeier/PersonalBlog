(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-178bfe8a"],{"0e42":function(t,e,a){},"49a8":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"search-page md-with"},[a("a-list",{staticClass:"demo-loadmore-list",attrs:{rowKey:t.getRandom(),loading:t.loading,"item-layout":"horizontal","data-source":t.data},scopedSlots:t._u([{key:"renderItem",fn:function(e){return a("a-list-item",{staticClass:"a-list-item",on:{click:function(a){return t.goArticleDetail(e)}}},[a("a",{attrs:{slot:"actions"},slot:"actions"},[t._v("阅读: "+t._s(e.reads))]),a("a",{attrs:{slot:"actions"},slot:"actions"},[t._v("喜欢: "+t._s(e.likes))]),a("a-list-item-meta",{attrs:{description:e.content}},[a("a",{staticClass:"name-title",attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.title))])])],1)}}])},[t.showLoadingMore?a("div",{style:{textAlign:"center",marginTop:"12px",height:"32px",lineHeight:"32px"},attrs:{slot:"loadMore"},slot:"loadMore"},[t.loadingMore?a("a-spin"):a("a-button",{on:{click:t.onLoadMore}},[t._v(" "+t._s(t.loadMoreTxt)+" ")])],1):t._e()])],1)},i=[],n=(a("99af"),a("4160"),a("159b"),a("96cf"),a("1da1")),s=a("d4ec"),r=a("bee2"),c=a("262e"),l=a("2caf"),d=a("9ab4"),u=a("60a3"),h=a("e1c3"),g=a("d257");u["a"].registerHooks(["beforeRouteUpdate"]);var p=function(t){Object(c["a"])(a,t);var e=Object(l["a"])(a);function a(){var t;return Object(s["a"])(this,a),t=e.apply(this,arguments),t.loading=!0,t.loadingMore=!1,t.loadMoreTxt="加载更多",t.showLoadingMore=!0,t.lock=!0,t.data=[],t.key="",t.page=1,t.size=5,t}return Object(r["a"])(a,[{key:"created",value:function(){var t=this;this.key=this.$route.query.cw,this.getData((function(e){t.loading=!1,t.data=e}))}},{key:"beforeRouteUpdate",value:function(t,e,a){var o=this;this.page=1,this.key=t.query.cw,this.getData((function(t){o.loading=!1,o.data=t})),a()}},{key:"getRandom",value:function(){return Math.random()}},{key:"getData",value:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){var a,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={key:this.key,page:this.page,size:this.size},t.next=3,h["a"].getByCondition(a);case 3:o=t.sent,this.$store.commit("search/setSpeed",!1),200===o.code&&(o.data.datas.forEach((function(t){t.content=Object(g["a"])(t.content)})),e(o.data.datas));case 6:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"goArticleDetail",value:function(t){var e=t.userId,a=t.blogId;h["a"].addReads(a),this.$router.push("/blogshow?uid=".concat(e,"&bid=").concat(a))}},{key:"onLoadMore",value:function(){var t=this;this.lock&&(this.$store.commit("search/setSpeed",!0),this.lock=!1,this.loadingMore=!0,this.page=this.page+1,this.getData((function(e){0===e.length&&(t.loadMoreTxt="没有更多了",t.$store.commit("search/setSpeed",!1)),t.data=t.data.concat(e),t.loadingMore=!1,t.lock=!0,t.$nextTick((function(){window.dispatchEvent(new Event("resize"))}))})))}}]),a}(u["c"]);p=Object(d["a"])([u["a"]],p);var f=p,v=f,k=(a("6836"),a("2877")),m=Object(k["a"])(v,o,i,!1,null,"6b386b5a",null);e["default"]=m.exports},6836:function(t,e,a){"use strict";a("0e42")}}]);