(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{142:function(e,t,n){"use strict";n.r(t);var r,a=n(0),c=n.n(a),i=n(30),o=n.n(i),s=n(29),l=n(11),u=n(20),d=n(14),j=n(19),b=n(18),p=n(15),h=n.n(p),f=n(32),x=n(34),m=n.n(x),O="/api/blogs",g="",v=function(){var e=Object(j.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.get(O);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=Object(j.a)(h.a.mark((function e(t){var n,r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:g}},e.next=3,m.a.post(O,t,n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=Object(j.a)(h.a.mark((function e(t,n){var r,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={headers:{Authorization:g}},e.next=3,m.a.put("".concat(O,"/").concat(t),n,r);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),w=function(){var e=Object(j.a)(h.a.mark((function e(t){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:g}},e.next=3,m.a.delete("".concat(O,"/").concat(t),n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),B=function(){var e=Object(j.a)(h.a.mark((function e(t,n){var r,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={headers:{Authorization:g}},e.next=3,m.a.post("".concat(O,"/").concat(t,"/comments"),{comment:n},r);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),S={getAll:v,create:y,remove:w,update:k,addComment:B,setToken:function(e){g="bearer ".concat(e)}},A=Object(f.b)({name:"notification",initialState:{message:null,level:null},reducers:{setNotification:function(e,t){return{message:t.payload.message,level:t.payload.level}},clearNotification:function(){return{message:null,level:null}}}}),W=A.actions,C=W.setNotification,U=W.clearNotification,z=function(e){var t=e.message,n=e.level;return function(e){e(C({message:t,level:n})),r&&clearTimeout(r),r=setTimeout((function(){e(U())}),5e3)}},T=A.reducer,G=Object(f.b)({name:"blogs",initialState:[],reducers:{setBlogs:function(e,t){return t.payload},appendBlog:function(e,t){var n=t.payload;return e.concat(n)},replaceBlog:function(e,t){var n=t.payload.id,r=t.payload.blog;return e.map((function(e){return e.id===n?r:e}))},removeBlog:function(e,t){var n=t.payload;return e.filter((function(e){return e.id!==n}))},addLike:function(e,t){var n=t.payload;return e.map((function(e){return e.id===n?Object(b.a)(Object(b.a)({},e),{},{likes:e.likes+1}):e}))}}}),L=G.actions,N=L.setBlogs,I=L.removeBlog,R=L.addLike,E=L.appendBlog,J=L.replaceBlog,D=function(e,t){return function(){var n=Object(j.a)(h.a.mark((function n(r){var a;return h.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,S.create(e);case 3:a=n.sent,r(E(a)),r(z({message:"a new blog: ".concat(e.title," by ").concat(e.author," added"),level:"info"})),t(),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(0),r(z({message:"failed to add the given blog",level:"error"}));case 12:case"end":return n.stop()}}),n,null,[[0,9]])})));return function(e){return n.apply(this,arguments)}}()},F=G.reducer,M=function(){var e=Object(j.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.get("/api/users");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),V={getAll:M},H=Object(f.b)({name:"users",initialState:[],reducers:{setUsers:function(e,t){return t.payload}}}),P=H.actions.setUsers,q=H.reducer,K=function(){var e=Object(j.a)(h.a.mark((function e(t){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Q={login:K},X=Object(f.b)({name:"user",initialState:null,reducers:{setUser:function(e,t){return t.payload},clearUser:function(){return null}}}),Y=X.actions,Z=Y.setUser,$=Y.clearUser,_=X.reducer,ee=n(211),te=n(197),ne=n(214),re=n(216),ae=n(215),ce=n(95),ie=n(94),oe=n.n(ie),se=n(213),le=n(209),ue=n(208),de=n(203),je=n(207),be=n(1),pe=function(){var e=c.a.useState(null),t=Object(l.a)(e,2),n=t[0],r=t[1],a=c.a.useState(null),i=Object(l.a)(a,2),o=i[0],d=i[1],j=Object(u.c)((function(e){return e.loggedUser})),p=Object(u.b)(),h=j?[{name:"blogs",path:"/blogs"},{name:"users",path:"/users"}]:[],f=j?[{name:"Logout",action:function(){p((function(e){localStorage.clear(),e($()),e(z({message:"logged-out successfully",level:"info"}))}))}}]:[],x=function(){r(null)},m=function(){d(null)},O=function(e){var t,n=0;for(t=0;t<e.length;t+=1)n=e.charCodeAt(t)+((n<<5)-n);var r="#";for(t=0;t<3;t+=1){r+="00".concat((n>>8*t&255).toString(16)).slice(-2)}return r},g=function(e){return{sx:{bgcolor:O(e)},children:e.split(" ").length>=2?"".concat(e.split(" ")[0][0]).concat(e.split(" ")[1][0]):"".concat(e.split(" ")[0][0]).concat(e.split(" ")[0][1])}};return Object(be.jsx)(ee.a,{position:"static",children:Object(be.jsx)(se.a,{maxWidth:"xl",children:Object(be.jsxs)(ne.a,{disableGutters:!0,children:[Object(be.jsx)(ae.a,{variant:"h6",noWrap:!0,component:"div",sx:{mr:2,display:{xs:"none",md:"flex"}},children:"Blog App"}),Object(be.jsxs)(te.a,{sx:{flexGrow:1,display:{xs:"flex",md:"none"}},children:[Object(be.jsx)(re.a,{size:"large","aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:function(e){r(e.currentTarget)},color:"inherit",children:Object(be.jsx)(oe.a,{})}),Object(be.jsx)(ce.a,{id:"menu-appbar",anchorEl:n,anchorOrigin:{vertical:"bottom",horizontal:"left"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"left"},open:Boolean(n),onClose:x,sx:{display:{xs:"block",md:"none"}},children:h.map((function(e){return Object(be.jsx)(je.a,{onClick:x,children:Object(be.jsx)(ae.a,{textAlign:"center",children:Object(be.jsx)(ue.a,{color:"inherit",component:s.b,to:e.path,children:e.name})})},e.name)}))})]}),Object(be.jsx)(ae.a,{variant:"h6",noWrap:!0,component:"div",sx:{flexGrow:1,display:{xs:"flex",md:"none"}},children:"LOGO"}),Object(be.jsx)(te.a,{sx:{flexGrow:1,display:{xs:"none",md:"flex"}},children:h.map((function(e){return Object(be.jsx)(ue.a,{onClick:x,sx:{my:2,color:"white",display:"block"},component:s.b,to:e.path,children:e.name},e.name)}))}),Object(be.jsxs)(te.a,{sx:{flexGrow:0},children:[Object(be.jsx)(de.a,{title:"Open settings",children:Object(be.jsx)(re.a,{onClick:function(e){d(e.currentTarget)},sx:{p:0},children:null!==j?Object(be.jsx)(le.a,Object(b.a)({},g(j.name))):Object(be.jsx)(le.a,Object(b.a)({},g("Guest")))})}),Object(be.jsx)(ce.a,{sx:{mt:"45px"},id:"menu-appbar",anchorEl:o,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:Boolean(o),onClose:m,children:f.map((function(e){return Object(be.jsx)(je.a,{onClick:m,children:Object(be.jsx)(ae.a,{textAlign:"center",children:Object(be.jsx)(ue.a,{color:"inherit",onClick:e.action,children:e.name})})},e)}))})]})]})})})},he=n(217),fe=n(218),xe=function(e){var t=e.user;return t?Object(be.jsxs)("div",{children:[Object(be.jsx)(ae.a,{variant:"h2",component:"h2",sx:{mt:5,textAlign:"center",fontWeight:"bold"},color:"text.secondary",gutterBottom:!0,children:t.name}),Object(be.jsx)(ae.a,{variant:"h5",component:"h5",sx:{mt:5,textAlign:"center",fontWeight:"bold"},color:"success.main",gutterBottom:!0,children:"added blogs"}),Object(be.jsx)("div",{children:t.blogs.slice().sort((function(e,t){return t.likes-e.likes})).map((function(e){return Object(be.jsx)(he.a,{sx:{minWidth:275,mb:5},children:Object(be.jsx)(fe.a,{children:Object(be.jsx)(ae.a,{variant:"h5",component:"p",children:Object(be.jsx)(ue.a,{size:"large",component:s.b,to:"/blogs/".concat(e.id),children:e.title})})})},e.id)}))})]}):null},me=n(204),Oe=n(219),ge=n(220),ve=n(221),ye=n(222),ke=n(223),we=n(212),Be=function(e){var t=Object(a.useState)(""),n=Object(l.a)(t,2),r=n[0],c=n[1];return{attrs:{type:e,value:r,onChange:function(e){c(e.target.value)}},reset:function(){c("")}}},Se=function(e){var t=e.blog,n=Object(u.c)((function(e){return e.loggedUser.username})),r=Be("text"),a=Object(u.b)(),c=Object(d.h)(),i=function(){confirm("Remove blog: ".concat(t.title," by ").concat(t.author))&&(a(function(e){return function(){var t=Object(j.a)(h.a.mark((function t(n){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,S.remove(e.id);case 3:n(I(e.id)),n(z({message:"".concat(e.title," by ").concat(e.author," removed"),level:"info"})),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),n(z({message:"failed to remove the given blog",level:"error"}));case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()}(t)),c("/"))},o=function(){a(function(e){return function(){var t=Object(j.a)(h.a.mark((function t(n){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,S.update(e.id,{user:e.user.id,title:e.title,author:e.author,url:e.url,likes:e.likes+1});case 3:n(R(e.id)),n(z({message:"like added to ".concat(e.title),level:"info"})),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),z({message:"failed to add like to the given blog",level:"error"});case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()}(t))};return t?Object(be.jsxs)("div",{children:[Object(be.jsx)(ae.a,{variant:"h4",component:"h4",sx:{mt:5,fontWeight:"bold"},color:"text.secondary",gutterBottom:!0,children:t.title}),Object(be.jsxs)(ae.a,{variant:"p",component:"p",sx:{mt:3,fontWeight:"bold"},color:"text.secondary",gutterBottom:!0,children:["for more information: ",Object(be.jsx)("a",{href:t.url,children:"click here"})]}),Object(be.jsxs)(ae.a,{variant:"p",component:"p",sx:{mt:2,fontWeight:"bold"},color:"text.secondary",gutterBottom:!0,children:["likes: ",t.likes,Object(be.jsx)(ue.a,{variant:"contained",type:"submit",sx:{height:24,ml:1,mt:0,padding:0},onClick:function(){return o()},children:"like"})]}),Object(be.jsxs)(ae.a,{variant:"p",component:"p",sx:{mt:2,fontWeight:"bold"},color:"text.secondary",gutterBottom:!0,children:["added by ",t.author]}),t.user.username===n?Object(be.jsx)(ue.a,{variant:"contained",color:"error",type:"submit",onClick:function(){return i()},children:"remove"}):null,Object(be.jsx)(ae.a,{variant:"h5",component:"h5",sx:{mt:5,fontWeight:"bold"},color:"text.secondary",gutterBottom:!0,children:"Comments"}),Object(be.jsxs)("form",{onSubmit:function(e){var n,c;e.preventDefault(),a((n=t.id,c=r.attrs.value,function(){var e=Object(j.a)(h.a.mark((function e(t){var r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.addComment(n,c);case 3:r=e.sent,t(J({id:n,blog:r})),t(z({message:"comment ".concat(c," added"),level:"info"})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),t(z({message:"failed to add the given comment",level:"error"}));case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()))},children:[Object(be.jsx)(me.a,Object(b.a)(Object(b.a)({},r.attrs),{},{id:"filled-basic",label:"write a comment",variant:"filled",sx:{height:55,width:"70%"}})),Object(be.jsx)(ue.a,{variant:"contained",type:"submit",sx:{height:55,width:"30%"},children:"add comment"})]}),Object(be.jsx)(Oe.a,{component:we.a,sx:{my:5},children:Object(be.jsx)(ge.a,{sx:{minWidth:700},"aria-label":"spanning table",children:Object(be.jsx)(ve.a,{children:t.comments.map((function(e){var t=e.id,n=e.content;return Object(be.jsx)(ye.a,{children:Object(be.jsx)(ke.a,{align:"left",colSpan:3,children:n})},t)}))})})})]}):null},Ae=Object(a.forwardRef)((function(e,t){var n=Object(a.useState)(!1),r=Object(l.a)(n,2),c=r[0],i=r[1],o=c?{display:"none"}:{display:""},s=c?{display:""}:{display:"none"},u=function(){i(!c)};return Object(a.useImperativeHandle)(t,(function(){return{toggleVisibilty:u}})),Object(be.jsxs)("div",{children:[Object(be.jsx)("div",{style:o,children:Object(be.jsx)(ue.a,{variant:"contained",color:"success",onClick:function(){return i(!0)},sx:{display:"block",my:5,mx:"auto"},children:"new blog"})}),Object(be.jsxs)("div",{style:s,children:[e.children,Object(be.jsx)(ue.a,{variant:"contained",color:"error",onClick:function(){return i(!1)},sx:{display:"block",mx:"auto",my:2},children:"cancel"})]})]})}));Ae.displayName="Togglable";var We=Ae,Ce=n(210),Ue=function(e){var t=e.blogFormRef,n=Object(u.b)(),r=Be("text"),a=Be("text"),c=Be("text"),i=function(){var e=Object(j.a)(h.a.mark((function e(i){var o,s;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i.preventDefault(),o={title:r.attrs.value,author:a.attrs.value,url:c.attrs.value},s=t.current.toggleVisibilty,n(D(o,s)),r.reset(),a.reset(),c.reset();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(be.jsxs)("div",{children:[Object(be.jsx)(ae.a,{variant:"h4",component:"h4",sx:{mt:5,textAlign:"center",fontWeight:"bold"},color:"success.main",gutterBottom:!0,children:"create new"}),Object(be.jsx)(Ce.a,{container:!0,direction:"row",alignItems:"center",justify:"center",children:Object(be.jsxs)("form",{style:{margin:"0 auto"},onSubmit:i,children:[Object(be.jsx)(te.a,{children:Object(be.jsx)(me.a,Object(b.a)(Object(b.a)({},r.attrs),{},{id:"filled-basic",label:"Title",variant:"filled"}))}),Object(be.jsx)(te.a,{children:Object(be.jsx)(me.a,Object(b.a)(Object(b.a)({},a.attrs),{},{id:"filled-basic",label:"Author",variant:"filled"}))}),Object(be.jsx)(te.a,{children:Object(be.jsx)(me.a,Object(b.a)(Object(b.a)({},c.attrs),{},{id:"filled-basic",label:"URL",variant:"filled"}))}),Object(be.jsx)(te.a,{children:Object(be.jsx)(ue.a,{variant:"contained",color:"success",sx:{display:"block",mt:3,mx:"auto"},type:"submit",children:"create"})})]})})]})},ze=function(){var e=Object(u.c)((function(e){return e.blogs})),t=Object(a.useRef)();return Object(be.jsxs)("div",{children:[Object(be.jsx)(ae.a,{variant:"h2",component:"h2",sx:{mt:5,textAlign:"center",fontWeight:"bold"},color:"text.secondary",gutterBottom:!0,children:"Blogs"}),Object(be.jsx)(We,{ref:t,children:Object(be.jsx)(Ue,{blogFormRef:t})}),Object(be.jsx)("div",{children:e.slice().sort((function(e,t){return t.likes-e.likes})).map((function(e){return Object(be.jsx)(he.a,{sx:{minWidth:275,mb:5},children:Object(be.jsx)(fe.a,{children:Object(be.jsx)(ae.a,{variant:"h5",component:"p",children:Object(be.jsx)(ue.a,{size:"large",component:s.b,to:"/blogs/".concat(e.id),children:e.title})})})},e.id)}))})]})},Te=n(224),Ge=function(){var e=Object(u.c)((function(e){return e.users}));return Object(be.jsxs)("div",{children:[Object(be.jsx)(ae.a,{variant:"h2",component:"h2",sx:{mt:5,textAlign:"center",fontWeight:"bold"},color:"text.secondary",gutterBottom:!0,children:"Blogs"}),Object(be.jsx)(Oe.a,{component:we.a,children:Object(be.jsxs)(ge.a,{sx:{minWidth:700},"aria-label":"spanning table",children:[Object(be.jsx)(Te.a,{children:Object(be.jsxs)(ye.a,{children:[Object(be.jsx)(ke.a,{align:"center",colSpan:3,children:"name"}),Object(be.jsx)(ke.a,{align:"right",children:"blogs created"})]})}),Object(be.jsx)(ve.a,{children:e.map((function(e){return Object(be.jsxs)(ye.a,{children:[Object(be.jsx)(ke.a,{align:"center",colSpan:3,children:Object(be.jsx)(s.b,{to:"/users/".concat(e.id),children:e.name})}),Object(be.jsx)(ke.a,{align:"right",children:e.blogs.length})]},e.id)}))})]})})]})},Le=n(202),Ne=function(){var e=Be("text"),t=Be("password"),n=Object(u.b)();return Object(be.jsxs)("div",{children:[Object(be.jsx)(ae.a,{variant:"h2",component:"h2",sx:{mt:5,textAlign:"center",fontWeight:"bold"},color:"text.secondary",gutterBottom:!0,children:"Login to application"}),Object(be.jsx)(Ce.a,{container:!0,direction:"row",alignItems:"center",justify:"center",children:Object(be.jsxs)("form",{style:{margin:"0 auto"},onSubmit:function(r){var a;r.preventDefault(),n((a={username:e.attrs.value,password:t.attrs.value},function(){var e=Object(j.a)(h.a.mark((function e(t){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Q.login(a);case 3:n=e.sent,S.setToken(n.token),localStorage.setItem("loggedBlogsappUser",JSON.stringify(n)),t(Z(n)),t(z({message:"".concat(n.name," logged-in successfully"),level:"info"})),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),t(z({message:"wrong username or password",level:"error"}));case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}())),e.reset(),t.reset()},children:[Object(be.jsx)(Le.a,{children:Object(be.jsx)(me.a,Object(b.a)(Object(b.a)({},e.attrs),{},{label:"Username",variant:"filled"}))}),Object(be.jsx)(Le.a,{children:Object(be.jsx)(me.a,Object(b.a)(Object(b.a)({},t.attrs),{},{label:"Password",variant:"filled"}))}),Object(be.jsx)(Le.a,{children:Object(be.jsx)(ue.a,{variant:"contained",color:"success",sx:{display:"block",mt:5,mx:"auto"},type:"submit",children:"Login"})})]})})]})},Ie=n(206),Re="error",Ee="warn",Je=function(){var e=Object(u.c)((function(e){return e.notification})),t=e.message,n=e.level;if(null===t)return null;switch(n){case Re:return Object(be.jsx)(Ie.a,{severity:"error",children:t});case Ee:return Object(be.jsx)(Ie.a,{severity:"warn",children:t});default:return Object(be.jsx)(Ie.a,{severity:"success",children:t})}},De=function(){var e=Object(u.c)((function(e){return[e.loggedUser,e.users,e.blogs]})),t=Object(l.a)(e,3),n=t[0],r=t[1],c=t[2],i=Object(u.b)();Object(a.useEffect)((function(){i(function(){var e=Object(j.a)(h.a.mark((function e(t){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=JSON.parse(localStorage.getItem("loggedBlogsappUser")),t(Z(n)),null!==n&&S.setToken(n.token);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),i(function(){var e=Object(j.a)(h.a.mark((function e(t){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.getAll();case 2:n=e.sent,t(N(n));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),i(function(){var e=Object(j.a)(h.a.mark((function e(t){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V.getAll();case 2:n=e.sent,t(P(n));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]);var o=Object(d.g)("/users/:id"),s=o?r.find((function(e){return e.id===o.params.id})):null,b=Object(d.g)("/blogs/:id"),p=b?c.find((function(e){return e.id===b.params.id})):null;return null===n?Object(be.jsxs)("div",{children:[Object(be.jsx)(pe,{}),Object(be.jsx)(Je,{}),Object(be.jsx)(Ne,{})]}):Object(be.jsxs)("div",{children:[Object(be.jsxs)("header",{children:[Object(be.jsx)(pe,{}),Object(be.jsx)(Je,{})]}),Object(be.jsx)(se.a,{children:Object(be.jsxs)(d.d,{children:[Object(be.jsx)(d.b,{path:"/blogs/:id",element:Object(be.jsx)(Se,{blog:p})}),Object(be.jsx)(d.b,{path:"/blogs",element:Object(be.jsx)(ze,{})}),Object(be.jsx)(d.b,{path:"/users/:id",element:Object(be.jsx)(xe,{user:s})}),Object(be.jsx)(d.b,{path:"/users",element:Object(be.jsx)(Ge,{})}),Object(be.jsx)(d.b,{path:"/",element:Object(be.jsx)(d.a,{to:"/blogs"})})]})})]})},Fe=Object(f.a)({reducer:{blogs:F,users:q,loggedUser:_,notification:T}});o.a.render(Object(be.jsx)(u.a,{store:Fe,children:Object(be.jsx)(s.a,{children:Object(be.jsx)(De,{})})}),document.getElementById("root"))}},[[142,1,2]]]);
//# sourceMappingURL=main.40abfbf2.chunk.js.map