import{$ as v,B as N,D as V,E as Y,G as D,H as j,I as X,K as Z,N as ee,P as a,R as te,V as ie,W as ae,a as h,aa as B,c as H,d as K,e as Q,ea as re,f as $,h as U,i as g,k as d,l as p,m as l,p as y,q as I,r as T,t as A,u as L,v as x,x as W,y as S,z as R}from"./chunk-SIWLJPTP.js";import"./chunk-WOT6VMZA.js";import G from"@typo3/backend/modal.js";import ne from"@typo3/backend/icons.js";import{html as ce}from"lit";I();c[h]="Resources/Private/JavaScript/components/Preview.svelte";var oe=x(R('<rect fill="#000"></rect>'),c[h],[[41,20]]),le=x(R('<rect stroke="#ff8700" stroke-width="1.5px" fill="none"></rect>'),c[h],[[51,16]]),me=x(S('<div class="wrapper svelte-bwhiq6"><div class="preview svelte-bwhiq6"><img alt="Preview" class="svelte-bwhiq6"> <svg viewBox="0 0 200 200" preserveAspectRatio="none" class="focuspoint__svg svelte-bwhiq6" xmlns="http://www.w3.org/2000/svg"><mask><rect x="0" y="0" width="200" height="200" fill="#FFF" fill-opacity="0.5"></rect><!></mask><rect x="0" y="0" width="200" height="200" fill="#000"></rect><!></svg></div></div>'),c[h],[[34,0,[[35,4,[[36,8],[37,8,[[38,12,[[39,16]]],[49,12]]]]]]]]),de={hash:"svelte-bwhiq6",code:`
    .wrapper.svelte-bwhiq6 {
        display: flex;
        margin-bottom: 1rem;
    }

    .preview.svelte-bwhiq6 {
        display: inline-block;
        position: relative;
    }

    img.svelte-bwhiq6 {
        max-width: 200px;
        max-height: 200px;
    }

    svg.svelte-bwhiq6 {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
`};function c(_,n){V(new.target),A(n,!0,c),Z(_,de);let m=v(n,"image",7),s=v(n,"points",7),f=v(n,"itemFormElName",7);function r(e){return e*100+"%"}var w=me(),P=g(w),u=g(P),q=d(u,2),b=g(q),J=d(g(b));j(J,17,s,D,(e,o)=>{var t=oe();y((E,C,F,k)=>{a(t,"x",E),a(t,"y",C),a(t,"width",F),a(t,"height",k)},[()=>r(l(o).x),()=>r(l(o).y),()=>r(l(o).width),()=>r(l(o).height)]),N(e,t)}),$(b);var O=d(b),M=d(O);return j(M,17,s,D,(e,o)=>{var t=le();y((E,C,F,k)=>{a(t,"x",E),a(t,"y",C),a(t,"width",F),a(t,"height",k)},[()=>r(l(o).x),()=>r(l(o).y),()=>r(l(o).width),()=>r(l(o).height)]),N(e,t)}),$(q),$(P),$(w),y(()=>{a(u,"src",m()),a(b,"id",`mask${f()??""}`),a(O,"mask",`url(#mask${f()??""})`)}),N(_,w),L({get image(){return m()},set image(e){m(e),p()},get points(){return s()},set points(e){s(e),p()},get itemFormElName(){return f()},set itemFormElName(e){f(e),p()},...Y()})}T(c);B(c,{image:{},points:{},itemFormElName:{}},[],[],!0);I();z[h]="Resources/Private/JavaScript/FocuspointElement.svelte";var ue=(_,n)=>n(_),$e=x(S('<div><input type="hidden"> <!> <button class="btn btn-default"><!> </button> <form name="editform"><input type="hidden"></form></div>'),z[h],[[88,0,[[89,4],[91,4],[96,4,[[97,8]]]]]]);function z(_,n){V(new.target),A(n,!0,z);let m=v(n,"itemFormElName",7),s=v(n,"itemFormElValue",7),f=v(n,"wizardConfig",7),r=v(n,"image",7),w=H(""),P=Q(()=>s()?JSON.parse(s()):[]),u;ie(()=>{ne.getIcon("content-target",ne.sizes.small).then(i=>{K(w,i,!0)}),u=new BroadcastChannel(re(m())),u.onmessage=i=>{U(i.data.type,"wizard-update")&&s(JSON.stringify(i.data.focuspoints))}}),ae(()=>{u?.close()});function q(i){i.preventDefault(),G.advanced({additionalCssClasses:["modal-image-manipulation","cropper"],buttons:[{btnClass:"btn-default btn--left",name:"settings",icon:"actions-cog",text:TYPO3.lang["wizard.button.settings"],trigger:J},{btnClass:"btn-default",name:"dismiss",icon:"actions-close",text:TYPO3.lang["wizard.button.cancel"],trigger:()=>window.parent.TYPO3.Modal.dismiss()},{btnClass:"btn-primary",name:"save",icon:"actions-document-save",text:TYPO3.lang["wizard.button.save"],trigger:b}],content:ce`
                <focuspoint-wizard
                    style="height: 100%; width: 100%; display: grid;"
                    image="${r()}"
                    itemFormElName="${m()}"
                    itemFormElValue="${s()}"
                    wizardConfig="${f()}"></focuspoint-wizard>`,size:G.sizes.full,title:TYPO3.lang["wizard.focuspoints.title"],style:G.styles.dark,staticBackdrop:!0})}function b(){u?.postMessage({type:"modal-save"}),window.parent.TYPO3.Modal.dismiss()}function J(){u?.postMessage({type:"settings"})}function O(i){u?.postMessage({type:"link-selected",link:i.currentTarget.value})}var M=$e(),e=g(M);ee(e);var o=d(e,2);c(o,{get image(){return r()},get points(){return l(P)},get itemFormElName(){return m()}});var t=d(o,2);t.__click=[ue,q];var E=g(t);X(E,()=>l(w),!1,!1);var C=d(E);C.nodeValue=` ${TYPO3.lang["wizard.button"]??""}`,$(t);var F=d(t,2),k=g(F);return k.__change=O,$(F),$(M),y(()=>{a(e,"name",m()),a(k,"data-formengine-input-name",`${m()}-hidden-link-field`)}),te(e,s),N(_,M),L({get itemFormElName(){return m()},set itemFormElName(i){m(i),p()},get itemFormElValue(){return s()},set itemFormElValue(i){s(i),p()},get wizardConfig(){return f()},set wizardConfig(i){f(i),p()},get image(){return r()},set image(i){r(i),p()},...Y()})}T(z);W(["click","change"]);customElements.define("focuspoint-element",B(z,{itemFormElName:{},itemFormElValue:{},wizardConfig:{},image:{}},[],[],!1));export{z as default};
