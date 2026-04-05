import{$ as S,A as rt,B as I,C as q,D as Q,E as Z,F as Re,G as Ve,H as Be,I as ne,J as pt,K as ye,L as de,M as Ze,N as We,O as et,P as E,Q as vt,R as Oe,S as mt,T as gt,U as He,V as pe,W as tt,X as A,Y as Ke,Z as ee,_ as B,a as y,aa as te,b as ct,ba as L,c as oe,ca as Fe,d as Y,da as $,e as ge,ea as at,f as t,fa as ft,g as $t,ga as _t,h as ae,ha as bt,i as a,ia as fe,j as Qe,ja as le,k as p,ka as Pe,l as z,la as ht,m as e,ma as nt,n as _,o as dt,p as j,q as H,r as K,s as ut,t as X,u as G,v as P,w as Ye,x as we,y as J}from"./chunk-SIWLJPTP.js";import"./chunk-WOT6VMZA.js";import st from"interactjs";H();Ce[y]="Resources/Private/JavaScript/components/Image.svelte";var yt=P(J('<div><span class="text-break"> </span> <span class="ui-resizable-handle ui-resizable-nw svelte-1gqnvin"></span> <span class="ui-resizable-handle ui-resizable-ne svelte-1gqnvin"></span> <span class="ui-resizable-handle ui-resizable-sw svelte-1gqnvin"></span> <span class="ui-resizable-handle ui-resizable-se svelte-1gqnvin"></span></div>'),Ce[y],[[245,12,[[254,16],[255,16],[256,16],[257,16],[258,16]]]]),zt=P(J('<div touch-action="none"><div class="wrapper svelte-1gqnvin"><!> <img alt="Selected" unselectable="on" class="svelte-1gqnvin"></div></div>'),Ce[y],[[242,0,[[243,4,[[261,8]]]]]]),Et={hash:"svelte-1gqnvin",code:`
    .draggable.svelte-1gqnvin {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.15s ease;
        user-select: none;
    }

    .style1.svelte-1gqnvin {
        display: inline-grid;
        background-color: rgba(0, 0, 0, 0.6);
        border: 1px dashed rgba(255, 255, 255, 0.8);
        color: white;
        padding: 10px;
        --typo3-state-primary-bg: rgba(255, 255, 255, 0.8);
    }

    .opacity-0.svelte-1gqnvin {
        opacity: 0;
    }

    .style1.active.svelte-1gqnvin {
        border-color: #ff8700;
        --typo3-state-primary-bg: #ff8700;
        border-style: solid;
        background-color: rgba(0, 0, 0, 0.8);
    }

    img.svelte-1gqnvin {
        pointer-events: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        max-width: 100%;
        max-height: calc(100vh - 200px);
    }

    .cropper-bg.svelte-1gqnvin {
        padding: 20px;
        display: flex;
        justify-content: center;

        --chess-color: rgba(0, 0, 0, 0.1);
        opacity: 0.8;
        background-image: linear-gradient(45deg, var(--chess-color) 25%, transparent 25%), linear-gradient(-45deg, var(--chess-color) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--chess-color) 75%), linear-gradient(-45deg, transparent 75%, var(--chess-color) 75%);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0;
    }

    .cropper-bg--dark.svelte-1gqnvin {
        --chess-color: rgba(255, 255, 255, 0.1);
    }

    .wrapper.svelte-1gqnvin {
        align-self: center;
    }

    .ui-resizable-handle.ui-resizable-nw.svelte-1gqnvin, .ui-resizable-handle.ui-resizable-ne.svelte-1gqnvin {
        top: -3px;
    }

    .ui-resizable-handle.ui-resizable-sw.svelte-1gqnvin, .ui-resizable-handle.ui-resizable-se.svelte-1gqnvin {
        bottom: -3px;
    }

    .ui-resizable-handle.ui-resizable-ne.svelte-1gqnvin, .ui-resizable-handle.ui-resizable-se.svelte-1gqnvin {
        right: -3px;
    }

    .ui-resizable-handle.ui-resizable-nw.svelte-1gqnvin, .ui-resizable-handle.ui-resizable-sw.svelte-1gqnvin {
        left: -3px;
    }
`};function Ce(b,i){Q(new.target),X(i,!0,Ce),ye(b,Et);let[k,V]=ee(),n=()=>(L($,"focuspoints"),A($,"$focuspoints",k)),d=S(i,"image",7),r=oe(0),s=oe(0),c=ge(()=>(l,u)=>nt(u)),o,h=oe(!1),m=oe(!1);function x(l){let u=n().findIndex(N=>N.active);if(ae(u,-1))return;let F=l.shiftKey?10:1;switch(l.key){case"ArrowUp":l.preventDefault(),f(u,0,-F);break;case"ArrowDown":l.preventDefault(),f(u,0,F);break;case"ArrowLeft":l.preventDefault(),f(u,-F,0);break;case"ArrowRight":l.preventDefault(),f(u,F,0);break}}function f(l,u,F){let N=n()[l].x*e(s)+u,ue=n()[l].y*e(r)+F;B($,_(n)[l].x=Math.max(0,Math.min(1,N/e(s))),_(n)),B($,_(n)[l].y=Math.max(0,Math.min(1,ue/e(r))),_(n))}st(".draggable").resizable({edges:{left:!0,right:!0,bottom:!0,top:!0},modifiers:[st.modifiers.restrictEdges({outer:"parent",endOnly:!0})],listeners:{move(l){let u=parseInt(l.target.getAttribute("data-index"));B($,_(n)[u].width=l.rect.width/e(s),_(n)),B($,_(n)[u].height=l.rect.height/e(r),_(n));let F=n()[u].x*e(s)+l.deltaRect.left,N=n()[u].y*e(r)+l.deltaRect.top;B($,_(n)[u].x=F/e(s),_(n)),B($,_(n)[u].y=N/e(r),_(n))},end(l){let u=parseInt(l.target.getAttribute("data-index"));n()[u].active&&Pe(u)}}}).draggable({modifiers:[st.modifiers.restrictRect({restriction:"parent",endOnly:!0})],autoScroll:!0,listeners:{move(l){let u=parseInt(l.target.getAttribute("data-index")),F=n()[u].x*e(s)+l.dx,N=n()[u].y*e(r)+l.dy;B($,_(n)[u].x=F/e(s),_(n)),B($,_(n)[u].y=N/e(r),_(n))},end(l){let u=parseInt(l.target.getAttribute("data-index"));n()[u].active&&Pe(u)}}}),pe(()=>{o.complete?w():o.addEventListener("load",w),window.addEventListener("resize",T),window.addEventListener("keydown",x);let l=document.querySelector("html").getAttribute("data-color-scheme"),u=document.querySelector("html").getAttribute("data-theme"),F=window.matchMedia("(prefers-color-scheme: dark)").matches;(ae(l,"dark")||ae(u,"auto")&&F&&ae(l,"light",!1))&&Y(m,!0)}),tt(()=>{window.removeEventListener("resize",T),window.removeEventListener("keydown",x)});function w(){setTimeout(()=>{T()},300)}function T(){Y(r,o.parentElement.getBoundingClientRect().height,!0),Y(s,o.parentElement.getBoundingClientRect().width,!0),Y(h,!0)}let D=ge(()=>l=>n()[l].x*e(s)),U=ge(()=>l=>n()[l].y*e(r)),R=ge(()=>l=>n()[l].width*e(s)),C=ge(()=>l=>n()[l].height*e(r));var W=zt();let v;var O=a(W),M=a(O);Be(M,1,n,Ve,(l,u,F)=>{var N=yt();N.__click=()=>Pe(F),E(N,"data-index",F);let ue;var re=a(N),be=a(re,!0);t(re),$t(8),t(N),j((he,ie,_e,ve,ke,me,ze,Ee)=>{ue=de(N,1,"draggable style1 resizable svelte-1gqnvin",null,ue,he),Ze(N,`transform:translate3d(${ie??""}px, ${_e??""}px, 0); width: ${ve??""}px; height: ${ke??""}px;`),E(N,"data-x",me),E(N,"data-y",ze),q(be,Ee)},[()=>({active:e(u).active,"opacity-0":!e(h)}),()=>e(D)(F),()=>e(U)(F),()=>e(R)(F),()=>e(C)(F),()=>e(D)(F),()=>e(U)(F),()=>e(c)(e(u),F)]),I(l,N)});var ce=p(M,2);He(ce,l=>o=l,()=>o),t(O),t(W),j(l=>{v=de(W,1,"cropper-bg svelte-1gqnvin",null,v,l),E(ce,"src",d())},[()=>({"cropper-bg--dark":e(m)})]),I(b,W);var se=G({get updateCanvasSizes(){return T},get image(){return d()},set image(l){d(l),z()},...Z()});return V(),se}K(Ce);we(["click"]);te(Ce,{image:{}},[],["updateCanvasSizes"],!0);H();Ie[y]="Resources/Private/JavaScript/components/Fields/Select.svelte";var St=P(J("<option> </option>"),Ie[y],[[14,12]]),Ft=P(J('<div class="form-group"><label class="form-label"> </label> <select class="form-select"></select></div>'),Ie[y],[[8,0,[[9,4],[12,4]]]]);function Ie(b,i){Q(new.target),X(i,!0,Ie);let[k,V]=ee(),n=()=>(L($,"focuspoints"),A($,"$focuspoints",k)),d=S(i,"config",7),r=S(i,"index",7),s=S(i,"name",7),c=Object.entries(d().options).map(([w,T])=>({value:w,label:T}));var o=Ft(),h=a(o),m=a(h,!0);t(h);var x=p(h,2);Be(x,21,()=>c,Ve,(w,T)=>{let D=()=>e(T).value;D();let U=()=>e(T).label;U();var R=St(),C={},W=a(R,!0);t(R),j(()=>{C!==(C=D())&&(R.value=(R.__value=D())==null?"":D()),q(W,U())}),I(w,R)}),t(x),t(o),j(()=>{E(h,"for",`input-${r()??""}-${s()??""}`),q(m,d().title),E(x,"id",`input-${r()??""}-${s()??""}`)}),gt(x,()=>n()[r()][s()],w=>B($,_(n)[r()][s()]=w,_(n))),I(b,o);var f=G({get config(){return d()},set config(w){d(w),z()},get index(){return r()},set index(w){r(w),z()},get name(){return s()},set name(w){s(w),z()},...Z()});return V(),f}K(Ie);te(Ie,{config:{},index:{},name:{}},[],[],!0);H();Je[y]="Resources/Private/JavaScript/components/Fields/Text.svelte";var Nt=P(J('<div class="form-group"><label class="form-label"> </label> <input type="text" class="form-control"></div>'),Je[y],[[7,0,[[8,4],[11,4]]]]);function Je(b,i){Q(new.target),X(i,!0,Je);let[k,V]=ee(),n=()=>(L($,"focuspoints"),A($,"$focuspoints",k)),d=S(i,"config",7),r=S(i,"index",7),s=S(i,"name",7);var c=Nt(),o=a(c),h=a(o,!0);t(o);var m=p(o,2);We(m),t(c),j(()=>{E(o,"for",`input-${r()??""}-${s()??""}`),q(h,d().title),E(m,"id",`input-${r()??""}-${s()??""}`)}),Oe(m,()=>n()[r()][s()],f=>B($,_(n)[r()][s()]=f,_(n))),I(b,c);var x=G({get config(){return d()},set config(f){d(f),z()},get index(){return r()},set index(f){r(f),z()},get name(){return s()},set name(f){s(f),z()},...Z()});return V(),x}K(Je);te(Je,{config:{},index:{},name:{}},[],[],!0);H();Te[y]="Resources/Private/JavaScript/components/Fields/Textarea.svelte";var Ct=P(J('<div class="form-group"><label class="form-label"> </label> <textarea type="text" class="form-control"></textarea></div>'),Te[y],[[7,0,[[8,4],[11,4]]]]);function Te(b,i){Q(new.target),X(i,!0,Te);let[k,V]=ee(),n=()=>(L($,"focuspoints"),A($,"$focuspoints",k)),d=S(i,"config",7),r=S(i,"index",7),s=S(i,"name",7);var c=Ct(),o=a(c),h=a(o,!0);t(o);var m=p(o,2);Ye(m),t(c),j(()=>{E(o,"for",`input-${r()??""}-${s()??""}`),q(h,d().title),E(m,"id",`input-${r()??""}-${s()??""}`)}),Oe(m,()=>n()[r()][s()],f=>B($,_(n)[r()][s()]=f,_(n))),I(b,c);var x=G({get config(){return d()},set config(f){d(f),z()},get index(){return r()},set index(f){r(f),z()},get name(){return s()},set name(f){s(f),z()},...Z()});return V(),x}K(Te);te(Te,{config:{},index:{},name:{}},[],[],!0);import It from"@typo3/core/ajax/ajax-request.js";import it from"@typo3/backend/modal.js";H();Me[y]="Resources/Private/JavaScript/components/Fields/Link.svelte";var Mt=(b,i,k)=>{b.preventDefault(),i(k())},qt=(b,i)=>{b.preventDefault(),Y(i,!e(i))},At=(b,i)=>{b.preventDefault(),i()},Lt=P(J('<div class="form-wizards-item-bottom"><div class="callout callout-info mt-3 mb-0"><div class="callout-content"><div class="callout-body"><!></div></div></div></div>'),Me[y],[[122,8,[[123,12,[[124,16,[[125,20]]]]]]]]),Rt=P(J('<div class="form-group"><label class="form-label"> </label> <div class="form-wizards-wrap"><div class="form-wizards-element"><div class="input-group t3js-form-field-link"><span class="t3js-form-field-link-icon input-group-text"><!></span> <input class="form-control" title="" value="" readonly="" hidden=""> <div class="form-control-clearable-wrapper"><input type="text" readonly=""> <input type="text"> <button type="button" tabindex="-1" title="Clear input" aria-label="Clear input"><!></button></div> <button class="btn btn-default"><!></button></div></div> <div class="form-wizards-item-aside formwizards-item-aside--field-control"><div class="btn-group"><button aria-label="Open link wizard" class="btn btn-default"><!></button></div></div></div> <!></div>'),Me[y],[[73,0,[[74,4],[77,4,[[78,8,[[79,12,[[80,16],[81,16],[82,16,[[83,20],[90,20],[96,20]]],[107,16]]]]],[112,8,[[113,12,[[114,16]]]]]]]]]]);function Me(b,i){Q(new.target),X(i,!0,Me);let[k,V]=ee(),n=()=>(L($,"focuspoints"),A($,"$focuspoints",k)),d=()=>(L(Fe,"wizardConfigStore"),A(Fe,"$wizardConfigStore",k)),r=()=>(L(fe,"iconStore"),A(fe,"$iconStore",k)),s=S(i,"config",7),c=S(i,"index",7),o=S(i,"name",7),h=oe(null),m=oe(!0),x=ge(()=>e(h)?.preview?.text??""),f=ge(()=>e(h)?.preview?.icon??""),w=ge(()=>e(h)?.preview?.additionalAttributes??"");pe(()=>{D(),le("actions-close"),le("actions-wizard-link"),le("actions-version-workspaces-preview-link")});let T=g=>{B($,_(n)[c()][o()]=g.detail.link,_(n)),D()};async function D(){let g=TYPO3.settings.ajaxUrls.wizard_focuspoint_linkbrowserurl;return g+=`&inputName=${encodeURIComponent(d().itemFormElName+"-hidden-link-field")}`,g+="&inputValue="+encodeURIComponent(n()[c()][o()]||""),g+="&config="+encodeURIComponent(JSON.stringify(s()||{})),g+="&pid="+encodeURIComponent(d().pid),new It(g).get().then(async $e=>{Y(h,await $e.resolve(),!0)})}function U(){let g=it.advanced({type:it.types.iframe,content:e(h).url,size:it.sizes.large});g.addEventListener("typo3:form-engine:link-browser:set-link",Se=>{T({detail:{link:Se.value}}),g.hideModal()});let $e=new BroadcastChannel(at(d().itemFormElName));$e.onmessage=Se=>{ae(Se.data.type,"link-selected")&&(T({detail:{link:Se.data.link}}),$e.close())},g.addEventListener("typo3-modal-hidden",()=>{$e.close()})}function R(g){B($,_(n)[g][o()]="",_(n)),e(h).preview=null}var C=Rt(),W=a(C),v=a(W,!0);t(W);var O=p(W,2),M=a(O),ce=a(M),se=a(ce),l=a(se);ne(l,()=>e(f),!1,!1),t(se);var u=p(se,2),F=p(u,2),N=a(F);We(N);let ue;var re=p(N,2);We(re);let be;var he=p(re,2);he.__click=[Mt,R,c];let ie;var _e=a(he);ne(_e,()=>r()["actions-close"],!1,!1),t(he),t(F);var ve=p(F,2);ve.__click=[qt,m];var ke=a(ve);ne(ke,()=>r()["actions-version-workspaces-preview-link"],!1,!1),t(ve),t(ce),t(M);var me=p(M,2),ze=a(me),Ee=a(ze);Ee.__click=[At,U];var xe=a(Ee);ne(xe,()=>r()["actions-wizard-link"],!1,!1),t(Ee),t(ze),t(me),t(O);var je=p(O,2);{var Xe=g=>{var $e=Lt(),Se=a($e),ot=a(Se),lt=a(ot),wt=a(lt);ne(wt,()=>e(w),!1,!1),t(lt),t(ot),t(Se),t($e),I(g,$e)};Re(je,g=>{e(w)&&g(Xe)})}t(C),j((g,$e,Se)=>{E(W,"for",`input-${c()??""}-${o()??""}`),q(v,s().title),E(N,"id",`input-${c()??""}-${o()??""}`),ue=de(N,1,"form-control form-control-clearable",null,ue,g),et(N,e(x)),be=de(re,1,"form-control form-control-clearable",null,be,$e),E(re,"id",`input-${c()??""}-${o()??""}`),ie=de(he,1,"close text-black",null,ie,Se)},[()=>({hidden:!e(m)}),()=>({hidden:e(m)}),()=>({hidden:!n()[c()][o()]||ae(n()[c()][o()],"")})]),Oe(re,()=>n()[c()][o()],g=>B($,_(n)[c()][o()]=g,_(n))),I(b,C);var Ge=G({get config(){return s()},set config(g){s(g),z()},get index(){return c()},set index(g){c(g),z()},get name(){return o()},set name(g){o(g),z()},...Z()});return V(),Ge}K(Me);we(["click"]);te(Me,{config:{},index:{},name:{}},[],[],!0);H();qe[y]="Resources/Private/JavaScript/components/Fields/Checkbox.svelte";var Ot=P(J('<span class="form-check-label-icon"><span class="form-check-label-icon-checked"><!></span> <span class="form-check-label-icon-unchecked"><!></span></span>'),qe[y],[[30,16,[[31,20],[34,20]]]]),Pt=P(J('<div class="form-group"><label class="form-label"> </label> <div><input type="checkbox" class="form-check-input me-1"> <label class="form-check-label"><!> </label></div></div>'),qe[y],[[16,0,[[17,4],[20,4,[[22,8],[28,8]]]]]]);function qe(b,i){Q(new.target),X(i,!0,qe);let[k,V]=ee(),n=()=>(L($,"focuspoints"),A($,"$focuspoints",k)),d=()=>(L(fe,"iconStore"),A(fe,"$iconStore",k)),r=S(i,"config",7),s=S(i,"index",7),c=S(i,"name",7),o=ae(r()?.renderType,"check")||!Object.hasOwn(r(),"renderType"),h=ae(r()?.renderType,"checkboxToggle");pe(()=>{le("actions-check"),le("empty-empty")});var m=Pt(),x=a(m),f=a(x,!0);t(x);var w=p(x,2);de(w,1,"form-check",null,{},{"form-check-type-icon-toggle":o,"form-switch":h});var T=a(w);We(T);var D=p(T,2),U=a(D);{var R=v=>{var O=Ot(),M=a(O),ce=a(M);ne(ce,()=>d()["actions-check"],!1,!1),t(M);var se=p(M,2),l=a(se);ne(l,()=>d()["empty-empty"],!1,!1),t(se),t(O),I(v,O)};Re(U,v=>{o&&v(R)})}var C=p(U);t(D),t(w),t(m),j(()=>{E(x,"for",`input-${s()??""}-${c()??""}`),E(x,"id",`label-${s()??""}-${c()??""}`),q(f,r()?.title??r().title),E(T,"id",`input-${s()??""}-${c()??""}`),E(T,"aria-labelledby",`label-${s()??""}-${c()??""}`),E(D,"for",`input-${s()??""}-${c()??""}`),q(C,` ${r()?.label??""}`)}),mt(T,()=>n()[s()][c()],v=>B($,_(n)[s()][c()]=v,_(n))),I(b,m);var W=G({get config(){return r()},set config(v){r(v),z()},get index(){return s()},set index(v){s(v),z()},get name(){return c()},set name(v){c(v),z()},...Z()});return V(),W}K(qe);te(qe,{config:{},index:{},name:{}},[],[],!0);H();De[y]="Resources/Private/JavaScript/components/Fields/Rte.svelte";function Jt(b,i,k,V){B($,_(i)[k()][V()]=b.target.value??"",_(i))}var Tt=P(J('<div class="form-group"><label class="form-label"> </label> <typo3-rte-ckeditor-ckeditor5><textarea slot="textarea" class="form-control" rows="5"></textarea></typo3-rte-ckeditor-ckeditor5></div>',2),De[y],[[22,0,[[23,4],[26,4,[[27,8]]]]]]),Dt={hash:"svelte-cbm421",code:`
    .ck-content {
        background-color: var(--bs-body-bg) !important;
    }
`};function De(b,i){Q(new.target),X(i,!0,De),ye(b,Dt);let[k,V]=ee(),n=()=>(L($,"focuspoints"),A($,"$focuspoints",k)),d=S(i,"config",7),r=S(i,"index",7),s=S(i,"name",7);pe(()=>{import("./ckeditor-rte.js")});var c=Tt(),o=a(c),h=a(o,!0);t(o);var m=p(o,2);j(()=>vt(m,"options",d().editorConfig??{}));var x=a(m);Ye(x),x.__change=[Jt,n,r,s],t(m),t(c),j(()=>{E(o,"for",`rte-${r()??""}-${s()??""}`),q(h,d().title),E(x,"id",`rte-${r()??""}-${s()??""}`),et(x,n()[r()][s()])}),I(b,c);var f=G({get config(){return d()},set config(w){d(w),z()},get index(){return r()},set index(w){r(w),z()},get name(){return s()},set name(w){s(w),z()},...Z()});return V(),f}K(De);we(["change"]);te(De,{config:{},index:{},name:{}},[],[],!0);H();Ae[y]="Resources/Private/JavaScript/components/Sidebar.svelte";var jt=P(J('<div class="panel panel-default"><div class="panel-heading" role="tab"><h4 class="panel-title"><button data-bs-toggle="collapse"><span class="caret"></span> <span class="panel-title"> </span></button></h4></div> <div role="tabpanel"><div class="panel-body"><!> <button class="btn btn-danger" name="reset" title="Reset"><!> </button></div></div></div>'),Ae[y],[[66,12,[[67,16,[[68,20,[[69,24,[[81,28],[82,28]]]]]]],[88,16,[[95,20,[[102,24]]]]]]]]),Vt=b=>{b.preventDefault(),bt()},Bt=P(J('<div class="modal-panel-sidebar svelte-1r4yq85"><div class="panel-group svelte-1r4yq85" role="tablist" aria-multiselectable="false"></div> <div class="pt-3"><button class="btn btn-success w-100 "><!> </button></div></div>'),Ae[y],[[62,0,[[63,4],[118,4,[[119,8]]]]]]),Wt={hash:"svelte-1r4yq85",code:`
    .modal-panel-sidebar.svelte-1r4yq85 {
        padding-top: 0;
        width: 100%;
        --typo3-state-primary-bg: #ff8700;
        --typo3-component-border-radius: 0;
        --panel-border-radius: 0;
    }

    .panel-group.svelte-1r4yq85 {
        margin-top: 0;
        margin-bottom: 0;
    }

    .callout {
        --typo3-component-border-radius: 4px;
    }

`};function Ae(b,i){Q(new.target),X(i,!0,Ae),ye(b,Wt);let[k,V]=ee(),n=()=>(L($,"focuspoints"),A($,"$focuspoints",k)),d=()=>(L(Fe,"wizardConfigStore"),A(Fe,"$wizardConfigStore",k)),r=()=>(L(fe,"iconStore"),A(fe,"$iconStore",k));pe(()=>{le("actions-chevron-up"),le("actions-delete"),le("actions-add")});let s=ge(()=>(U,R)=>nt(R));function c(U){Ke($,n().filter((R,C)=>ae(C,U,!1)))}let o={text:Je,textarea:Te,select:Ie,link:Me,checkbox:qe,rte:De};var h=Bt(),m=a(h);Be(m,5,n,Ve,(U,R,C)=>{var W=jt(),v=a(W),O=a(v);E(O,"id",`cropper-accordion-heading-${C??""}`);var M=a(O);M.__click=ie=>{ie.preventDefault(),Pe(C)},E(M,"data-bs-target",`#cropper-collapse-${C??""}`),E(M,"aria-controls",`cropper-collapse-${C??""}`);let ce;var se=p(a(M),2),l=a(se,!0);t(se),t(M),t(O),t(v);var u=p(v,2);E(u,"id",`cropper-collapse-${C??""}`);let F;E(u,"aria-labelledby",`cropper-accordion-heading-${C??""}`);var N=a(u),ue=a(N);Be(ue,1,()=>Object.entries(d().fields),Ve,(ie,_e)=>{let ve=()=>e(_e)[0];ve();let ke=()=>e(_e)[1];ke();var me=rt(),ze=Qe(me);{var Ee=xe=>{var je=rt(),Xe=Qe(je);let Ge=ge(()=>ke()??{});pt(Xe,()=>o[ke().type],(g,$e)=>{$e(g,{index:C,get name(){return ve()},get config(){return e(Ge)}})}),I(xe,je)};Re(ze,xe=>{_t(ve(),e(R))&&xe(Ee)})}I(ie,me)});var re=p(ue,2);re.__click=ie=>{ie.preventDefault(),c(C)};var be=a(re);ne(be,()=>r()["actions-delete"],!1,!1);var he=p(be);t(re),t(N),t(u),t(W),j((ie,_e,ve)=>{E(M,"aria-expanded",e(R).active),ce=de(M,1,"panel-button",null,ce,ie),q(l,_e),F=de(u,1,"panel-collapse",null,F,ve),q(he,` ${d()?.lang["wizard.single_point.button.delete"]??""}`)},[()=>({collapsed:!e(R).active,show:e(R).active}),()=>e(s)(e(R),C),()=>({show:e(R).active,collapse:!e(R).active})]),I(U,W)}),t(m);var x=p(m,2),f=a(x);f.__click=[Vt];var w=a(f);ne(w,()=>r()["actions-add"],!1,!1);var T=p(w);t(f),t(x),t(h),j(()=>q(T,` ${d()?.lang["wizard.single_point.button.addnew"]??""}`)),I(b,h);var D=G({...Z()});return V(),D}K(Ae);we(["click"]);te(Ae,{},[],[],!0);import xt from"interactjs";import kt from"@typo3/backend/notification.js";H();Le[y]="Resources/Private/JavaScript/components/Settings.svelte";function Ut(b,i){navigator.clipboard.readText().then(k=>{Y(i,k,!0)})}function Yt(b,i,k){Y(i,JSON.stringify(k()),!0)}function Ht(b,i,k,V){try{Ke($,JSON.parse(e(k))),V(!1)}catch{kt.error("Error","Invalid JSON",5)}}var Kt=(b,i)=>i(!1),Xt=P(J('<div class="d-flex justify-content-center align-items-center wrapper svelte-1iitar9"><fieldset class="form-section svelte-1iitar9"><div class="d-flex justify-content-between"><h3 class="form-section-headline"> </h3> <button aria-label="Close settings" class="btn-close svelte-1iitar9"><!> <span class="visually-hidden"> </span></button></div> <div class="row"><label for="points">Import / Export</label> <div class="form-group"><textarea id="points" rows="10" cols="50"></textarea> <div class="d-flex justify-content-between"><div><button class="btn btn-default"><!> </button> <button class="btn btn-default"><!> </button></div> <div><button class="btn btn-default"><!> </button> <button class="btn btn-primary"><!> </button></div></div></div></div></fieldset></div>'),Le[y],[[77,0,[[79,4,[[80,8,[[81,12],[82,12,[[84,16]]]]],[87,8,[[88,12],[89,12,[[90,20],[99,16,[[100,20,[[101,24],[104,24]]],[108,20,[[109,24],[112,24]]]]]]]]]]]]]]),Gt={hash:"svelte-1iitar9",code:`
    .wrapper.svelte-1iitar9 {
        grid-column: 1 / 4;
    }

    .form-section.svelte-1iitar9 {
        container-type: unset;
    }

    .btn-close.svelte-1iitar9 {
        background: transparent;
        border: none;
        height: fit-content;
        padding-top: 0;
        color: var(--icon-color-primary, currentColor)
    }
`};function Le(b,i){Q(new.target),X(i,!0,Le),ye(b,Gt);let[k,V]=ee(),n=()=>(L($,"focuspoints"),A($,"$focuspoints",k)),d=()=>(L(Fe,"wizardConfigStore"),A(Fe,"$wizardConfigStore",k)),r=()=>(L(fe,"iconStore"),A(fe,"$iconStore",k)),s=S(i,"itemFormElName",7),c=S(i,"isSettingsOpenValue",15),o,h=oe(ct(JSON.stringify(n()))),m=oe(!1),x=oe(!1);dt(()=>{try{JSON.parse(e(h)),Y(m,!1)}catch{Y(m,!0)}Y(x,ae(e(h),JSON.stringify(n()),!1))}),pe(()=>{le("actions-clipboard"),le("actions-clipboard-paste"),le("actions-check"),le("actions-undo")});function f(){navigator.clipboard.writeText(o.value),kt.success(d()?.lang["wizard.settings.copied"],d()?.lang["wizard.settings.copied.message"],3)}var w=Xt(),T=a(w),D=a(T),U=a(D),R=a(U,!0);t(U);var C=p(U,2);C.__click=[Kt,c];var W=a(C);ne(W,()=>r()["actions-close"],!1,!1);var v=p(W,2),O=a(v,!0);t(v),t(C),t(D);var M=p(D,2),ce=a(M);let se;var l=p(ce,2),u=a(l);Ye(u);let F;He(u,g=>o=g,()=>o);var N=p(u,2),ue=a(N),re=a(ue);re.__click=f;var be=a(re);ne(be,()=>r()["actions-clipboard"],!1,!1);var he=p(be);t(re);var ie=p(re,2);ie.__click=[Ut,h];var _e=a(ie);ne(_e,()=>r()["actions-clipboard-paste"],!1,!1);var ve=p(_e);t(ie),t(ue);var ke=p(ue,2),me=a(ke);me.__click=[Yt,h,n];var ze=a(me);ne(ze,()=>r()["actions-undo"],!1,!1);var Ee=p(ze);t(me);var xe=p(me,2);xe.__click=[Ht,n,h,c];var je=a(xe);ne(je,()=>r()["actions-check"],!1,!1);var Xe=p(je);t(xe),t(ke),t(N),t(l),t(M),t(T),t(w),j((g,$e)=>{q(R,d()?.lang["wizard.button.settings"]),q(O,d()?.lang["wizard.button.cancel"]),se=de(ce,1,"form-label",null,se,g),F=de(u,1,"form-control t3js-formengine-textarea formengine-textarea mb-3",null,F,$e),q(he,` ${d()?.lang["wizard.button.copy"]??""}`),q(ve,` ${d()?.lang["wizard.button.paste"]??""}`),me.disabled=!e(x),q(Ee,` ${d()?.lang["wizard.button.undo"]??""}`),xe.disabled=!e(x)||e(m),q(Xe,` ${d()?.lang["wizard.button.accept"]??""}`)},[()=>({"has-error":e(m),"has-change":e(x)}),()=>({"has-error":e(m),"has-change":e(x)})]),Oe(u,()=>e(h),g=>Y(h,g)),I(b,w);var Ge=G({get itemFormElName(){return s()},set itemFormElName(g){s(g),z()},get isSettingsOpenValue(){return c()},set isSettingsOpenValue(g){c(g),z()},...Z()});return V(),Ge}K(Le);we(["click"]);te(Le,{itemFormElName:{},isSettingsOpenValue:{}},[],[],!0);H();Ue[y]="Resources/Private/JavaScript/FocuspointWizard.svelte";var Qt=P(J('<!> <div class="resize-handle svelte-2ek5u1" aria-label="Resize sidebar"></div> <!>',1),Ue[y],[[105,8]]),Zt=P(J('<div class="wizard svelte-2ek5u1"><!></div>'),Ue[y],[[100,0]]),ea={hash:"svelte-2ek5u1",code:`
    .wizard.svelte-2ek5u1 {
        display: grid;
        max-height: 100%;
        grid-template-columns: 1fr 1px var(--sidebar-width, 300px);
        grid-template-rows: 100%;
    }

    .resize-handle.svelte-2ek5u1 {
        cursor: ew-resize !important;
        user-select: none;
        position: relative;
    }

    .resize-handle.svelte-2ek5u1:after {
        content: '';
        position: absolute;
        z-index: 1;
        top: 0;
        right: -4px;
        width: 4px;
        height: 100%;
        background: rgba(255, 255, 255, 0);
    }

    .resize-handle.svelte-2ek5u1:hover:after {
        background: var(--scaffold-content-navigation-drag-bg-hover, #bbb);
    }
`};function Ue(b,i){Q(new.target),X(i,!0,Ue),ye(b,ea);let[k,V]=ee(),n=()=>(L($,"focuspoints"),A($,"$focuspoints",k)),d=S(i,"itemFormElName",7),r=S(i,"wizardConfig",7),s=S(i,"image",7),c=S(i,"itemFormElValue",7),o=oe(!1),h=oe(null),m=oe(300),x=200,f;pe(()=>{ft(c(),r()),n().length>0&&(ht(),setTimeout(()=>{Pe(0)},300)),f=new BroadcastChannel(at(d())),f.onmessage=O=>{ae(O.data.type,"modal-save")&&w(),ae(O.data.type,"settings")&&T()};let v=localStorage.getItem("focuspoint-sidebar-width");v&&parseInt(v)>=x&&Y(m,parseInt(v),!0),xt(".resize-handle").draggable({axis:"x",listeners:{move(O){let M=e(m)+O.dx*-1;M>=x&&(Y(m,M),localStorage.setItem("focuspoint-sidebar-width",e(m).toString()),e(h)?.updateCanvasSizes())}}})}),tt(()=>{f?.close(),Ke($,[]),xt(".resize-handle").unset()});let w=()=>{f?.postMessage({type:"wizard-update",focuspoints:n()})},T=()=>{Y(o,!e(o))};var D=Zt(),U=a(D);{var R=v=>{ut(()=>e(o),Le),Le(v,{get itemFormElName(){return d()},get isSettingsOpenValue(){return e(o)},set isSettingsOpenValue(O){Y(o,O,!0)}})},C=v=>{var O=Qt(),M=Qe(O);He(Ce(M,{get image(){return s()}}),se=>Y(h,se,!0),()=>e(h));var ce=p(M,4);Ae(ce,{}),I(v,O)};Re(U,v=>{e(o)?v(R):v(C,!1)})}t(D),j(()=>Ze(D,`--sidebar-width: ${e(m)??""}px;`)),I(b,D);var W=G({get itemFormElName(){return d()},set itemFormElName(v){d(v),z()},get wizardConfig(){return r()},set wizardConfig(v){r(v),z()},get image(){return s()},set image(v){s(v),z()},get itemFormElValue(){return c()},set itemFormElValue(v){c(v),z()},...Z()});return V(),W}K(Ue);customElements.define("focuspoint-wizard",te(Ue,{itemFormElName:{},wizardConfig:{},image:{},itemFormElValue:{}},[],[],!1));export{Ue as default};
