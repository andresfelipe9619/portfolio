(this.webpackJsonpportfolio=this.webpackJsonpportfolio||[]).push([[7],{208:function(e,t,i){"use strict";i.d(t,"a",(function(){return c}));var a=i(3),o=(i(0),i(56)),r=i(174),n=i(231),l=i.n(n);function c(e){var t=e.children,i=s();return Object(a.jsx)(o.a,{variant:"h3",component:"h1",color:"primary",className:i.root,paragraph:!0,children:Object(a.jsx)(l.a,{avgTypingDelay:120,children:t})})}var s=Object(r.a)((function(){return{root:{fontWeight:900,userSelect:"none"}}}))},574:function(e,t,i){"use strict";var a=i(22);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(i(0)),r=(0,a(i(27)).default)(o.default.createElement("path",{d:"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"}),"StarBorder");t.default=r},689:function(e,t,i){"use strict";i.r(t),i.d(t,"default",(function(){return W}));var a=i(3),o=i(0),r=i(208),n=i(34),l=i(606),c=i(174),s=i(1),d=i(2),p=(i(33),i(5),i(4)),u=i(6),m=o.forwardRef((function(e,t){var i=e.cellHeight,a=void 0===i?180:i,r=e.children,n=e.classes,l=e.className,c=e.cols,u=void 0===c?2:c,m=e.component,f=void 0===m?"ul":m,h=e.spacing,b=void 0===h?4:h,g=e.style,v=Object(d.a)(e,["cellHeight","children","classes","className","cols","component","spacing","style"]);return o.createElement(f,Object(s.a)({className:Object(p.a)(n.root,l),ref:t,style:Object(s.a)({margin:-b/2},g)},v),o.Children.map(r,(function(e){if(!o.isValidElement(e))return null;var t=e.props.cols||1,i=e.props.rows||1;return o.cloneElement(e,{style:Object(s.a)({width:"".concat(100/u*t,"%"),height:"auto"===a?"auto":a*i+b,padding:b/2},e.props.style)})})))})),f=Object(u.a)({root:{display:"flex",flexWrap:"wrap",overflowY:"auto",listStyle:"none",padding:0,WebkitOverflowScrolling:"touch"}},{name:"MuiGridList"})(m),h=i(23),b=i(47),g=i(67),v=function(e,t){var i,a,o,r;e&&e.complete&&(e.width/e.height>e.parentElement.offsetWidth/e.parentElement.offsetHeight?((i=e.classList).remove.apply(i,Object(h.a)(t.imgFullWidth.split(" "))),(a=e.classList).add.apply(a,Object(h.a)(t.imgFullHeight.split(" ")))):((o=e.classList).remove.apply(o,Object(h.a)(t.imgFullHeight.split(" "))),(r=e.classList).add.apply(r,Object(h.a)(t.imgFullWidth.split(" ")))))};var j=o.forwardRef((function(e,t){var i=e.children,a=e.classes,r=e.className,n=(e.cols,e.component),l=void 0===n?"li":n,c=(e.rows,Object(d.a)(e,["children","classes","className","cols","component","rows"])),u=o.useRef(null);return o.useEffect((function(){!function(e,t){e&&(e.complete?v(e,t):e.addEventListener("load",(function(){v(e,t)})))}(u.current,a)})),o.useEffect((function(){var e=Object(b.a)((function(){v(u.current,a)}));return window.addEventListener("resize",e),function(){e.clear(),window.removeEventListener("resize",e)}}),[a]),o.createElement(l,Object(s.a)({className:Object(p.a)(a.root,r),ref:t},c),o.createElement("div",{className:a.tile},o.Children.map(i,(function(e){return o.isValidElement(e)?"img"===e.type||Object(g.a)(e,["Image"])?o.cloneElement(e,{ref:u}):e:null}))))})),O=Object(u.a)({root:{boxSizing:"border-box",flexShrink:0},tile:{position:"relative",display:"block",height:"100%",overflow:"hidden"},imgFullHeight:{height:"100%",transform:"translateX(-50%)",position:"relative",left:"50%"},imgFullWidth:{width:"100%",position:"relative",transform:"translateY(-50%)",top:"50%"}},{name:"MuiGridListTile"})(j),y=o.forwardRef((function(e,t){var i=e.actionIcon,a=e.actionPosition,r=void 0===a?"right":a,n=e.classes,l=e.className,c=e.subtitle,u=e.title,m=e.titlePosition,f=void 0===m?"bottom":m,h=Object(d.a)(e,["actionIcon","actionPosition","classes","className","subtitle","title","titlePosition"]),b=i&&r;return o.createElement("div",Object(s.a)({className:Object(p.a)(n.root,l,"top"===f?n.titlePositionTop:n.titlePositionBottom,c&&n.rootSubtitle),ref:t},h),o.createElement("div",{className:Object(p.a)(n.titleWrap,{left:n.titleWrapActionPosLeft,right:n.titleWrapActionPosRight}[b])},o.createElement("div",{className:n.title},u),c?o.createElement("div",{className:n.subtitle},c):null),i?o.createElement("div",{className:Object(p.a)(n.actionIcon,"left"===b&&n.actionIconActionPosLeft)},i):null)})),w=Object(u.a)((function(e){return{root:{position:"absolute",left:0,right:0,height:48,background:"rgba(0, 0, 0, 0.5)",display:"flex",alignItems:"center",fontFamily:e.typography.fontFamily},titlePositionBottom:{bottom:0},titlePositionTop:{top:0},rootSubtitle:{height:68},titleWrap:{flexGrow:1,marginLeft:16,marginRight:16,color:e.palette.common.white,overflow:"hidden"},titleWrapActionPosLeft:{marginLeft:0},titleWrapActionPosRight:{marginRight:0},title:{fontSize:e.typography.pxToRem(16),lineHeight:"24px",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"},subtitle:{fontSize:e.typography.pxToRem(12),lineHeight:1,textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"},actionIcon:{},actionIconActionPosLeft:{order:-1}}}),{name:"MuiGridListTileBar"})(y),x=i(18),L=i(92),E=i(12),N=o.forwardRef((function(e,t){var i=e.edge,a=void 0!==i&&i,r=e.children,n=e.classes,l=e.className,c=e.color,u=void 0===c?"default":c,m=e.disabled,f=void 0!==m&&m,h=e.disableFocusRipple,b=void 0!==h&&h,g=e.size,v=void 0===g?"medium":g,j=Object(d.a)(e,["edge","children","classes","className","color","disabled","disableFocusRipple","size"]);return o.createElement(L.a,Object(s.a)({className:Object(p.a)(n.root,l,"default"!==u&&n["color".concat(Object(E.a)(u))],f&&n.disabled,"small"===v&&n["size".concat(Object(E.a)(v))],{start:n.edgeStart,end:n.edgeEnd}[a]),centerRipple:!0,focusRipple:!b,disabled:f,ref:t},j),o.createElement("span",{className:n.label},r))})),R=Object(u.a)((function(e){return{root:{textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:12,borderRadius:"50%",overflow:"visible",color:e.palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{backgroundColor:Object(x.b)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"&$disabled":{backgroundColor:"transparent",color:e.palette.action.disabled}},edgeStart:{marginLeft:-12,"$sizeSmall&":{marginLeft:-3}},edgeEnd:{marginRight:-12,"$sizeSmall&":{marginRight:-3}},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(x.b)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},colorSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(x.b)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},disabled:{},sizeSmall:{padding:3,fontSize:e.typography.pxToRem(18)},label:{width:"100%",display:"flex",alignItems:"inherit",justifyContent:"inherit"}}}),{name:"MuiIconButton"})(N),S=i(574),k=i.n(S),P=Object(c.a)((function(e){return{root:{display:"flex",flexWrap:"wrap",justifyContent:"space-around",overflow:"hidden",backgroundColor:e.palette.background.paper},gridList:{width:500,height:450,transform:"translateZ(0)"},titleBar:{background:"linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"},icon:{color:"white"}}})),z=[{title:"Image",author:"author",featured:!0},{title:"Image",author:"author",featured:!0}];function I(){var e=P();return Object(a.jsx)("div",{className:e.root,children:Object(a.jsx)(f,{cellHeight:200,spacing:1,className:e.gridList,children:z.map((function(t){return Object(a.jsxs)(O,{cols:t.featured?2:1,rows:t.featured?2:1,children:[Object(a.jsx)("img",{src:t.img,alt:t.title}),Object(a.jsx)(w,{title:t.title,titlePosition:"top",actionIcon:Object(a.jsx)(R,{"aria-label":"star ".concat(t.title),className:e.icon,children:Object(a.jsx)(k.a,{})}),actionPosition:"left",className:e.titleBar})]},t.img)}))})})}function W(){return Object(a.jsx)(l.a,{container:!0,children:Object(a.jsxs)(l.a,{item:!0,md:12,children:[Object(a.jsx)(r.a,{children:n.i18n._("workTitle")}),Object(a.jsx)(I,{})]})})}}}]);
//# sourceMappingURL=my-work.59378c73.chunk.js.map