(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7b901aa4"],{"5b80":function(t,e,i){"use strict";i("aacc")},"8d7a":function(t,e,i){"use strict";var n=i("c968");e["a"]={add:function(t){var e=t.recipientId,i=t.subscriberId;return n["b"].post("/subscriptions",{recipientId:e,subscriberId:i})},cancel:function(t){var e=t.recipientId,i=t.subscriberId;return n["b"].delete("/subscriptions/".concat(e),{data:{subscriberId:i}})},history:function(t){var e=t.id;return n["b"].get("/notifications/".concat(e))},getUnread:function(t){var e=t.id;return n["b"].get("/notifications/".concat(e,"/unread"))},cleanUnread:function(t){var e=t.id;return n["b"].put("/notifications/".concat(e,"/unread"),null)}}},aacc:function(t,e,i){},fda7:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"notifications__container"},t._l(t.notifications,(function(e){return i("div",{key:e.notifyId,staticClass:"notifications__wrapper"},[i("div",{staticClass:"notifications__avatar__wrapper"},[i("router-link",{attrs:{to:{name:"user-tweets",params:{id:e.id}}}},[i("img",{staticClass:"notifications__avatar",attrs:{src:t._f("emptyImage")(e.avatar),alt:""}})])],1),"tweet"===e.labelName||"有新的推文通知"===e.title?i("div",{staticClass:"notifications__title"},[t._v(" "+t._s(e.name+" 有新的推文通知")+" ")]):t._e(),"follow"===e.labelName||"開始追蹤你"===e.title?i("div",{staticClass:"notifications__title"},[t._v(" "+t._s(e.name+" 開始追蹤你")+" ")]):t._e(),"reply"===e.labelName||"你的貼文有新的回覆"===e.title?i("div",{staticClass:"notifications__title"},[t._v(" "+t._s(e.name+"回覆你的推文")+" ")]):t._e(),"like"===e.labelName||"喜歡你的推文"===e.title?i("div",{staticClass:"notifications__title"},[t._v(" "+t._s(e.name+" 喜歡你的貼文")+" ")]):t._e(),i("div",{staticClass:"notifications__text"},[t._v(" "+t._s(e.content)+" ")])])})),0)},a=[],s=i("1da1"),r=i("5530"),c=(i("96cf"),i("8d7a")),o=i("2f62"),u=i("4360"),l=i("2708"),d={name:"Notifications",components:{},mixins:[l["a"]],data:function(){return{notifications:[]}},computed:Object(r["a"])({},Object(o["b"])(["currentUser","subscribeNotifyData","subscribeNotification"])),watch:{subscribeNotifyData:{handler:function(t,e){this.notifications.unshift(t)},deep:!0}},created:function(){this.getHistoryNotifications(),this.cleanUnreadNotifications(),this.$socket.emit("enterNotify",{id:this.currentUser.id}),u["a"].dispatch("updateSubscribeNotification")},methods:{getHistoryNotifications:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c["a"].history({id:t.currentUser.id});case 3:i=e.sent,n=i.data,t.notifications=n,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},cleanUnreadNotifications:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c["a"].cleanUnread({id:t.currentUser.id});case 3:if(i=e.sent,n=i.data,"success"===n.status){e.next=7;break}throw new Error(n.message);case 7:e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()}}},f=d,b=(i("5b80"),i("2877")),_=Object(b["a"])(f,n,a,!1,null,"2c1a4e7e",null);e["default"]=_.exports}}]);
//# sourceMappingURL=chunk-7b901aa4.315737b7.js.map