let t=null;const e={documentBody:document.querySelector("body"),startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};function n(){e.documentBody.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}e.stopBtn.disabled=true,e.startBtn.addEventListener("click",(function(){e.startBtn.disabled=true,e.stopBtn.disabled=!1,t=setInterval(n,1e3)})),e.stopBtn.addEventListener("click",(function(){clearInterval(t),e.startBtn.disabled=!1,e.stopBtn.disabled=true}));
//# sourceMappingURL=01-color-switcher.bbb15315.js.map