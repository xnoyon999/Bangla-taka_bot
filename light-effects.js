
// V4 - FORCE GLOW + FAST
(function(){
  function applyGlow(){
    try{
      const lb = document.getElementById('vpnBadgeLeft');
      const rb = document.getElementById('vpnBadgeRight');
      const rv = document.getElementById('vpnRightValue');
      const txt = (rv?.textContent||'').toUpperCase();
      const isBD = txt.includes('BD');
      [lb,rb].forEach(el=>{
        if(!el) return;
        el.classList.remove('vpn-bd','vpn-connected-strong');
        if(isBD){ el.classList.add('vpn-bd'); }
        else { el.classList.add('vpn-connected-strong'); }
        // Force inline glow if CSS not loaded
        if(!el.style.boxShadow || el.style.boxShadow===''){
          if(isBD){ el.style.boxShadow='0 0 8px rgba(0,255,136,0.3)'; }
          else { el.style.boxShadow='0 0 18px rgba(0,255,136,0.8), 0 0 35px rgba(0,255,136,0.4)'; el.style.border='2px solid #00ff88'; }
        }
      });
      // Poro Lijent force
      const p=document.getElementById('poroBtn'), l=document.getElementById('lijentBtn');
      if(p && !p.style.animation.includes('poroGlow')){ /* let CSS handle */ }
    }catch(e){}
  }

  function fixNotice(){
    const n=document.getElementById('middleEarningNotice');
    if(!n) return;
    n.style.width='94%'; n.style.margin='16px auto'; n.style.textAlign='center';
    if(n.textContent.includes('Notun Notice') && !n.classList.contains('notice-enter') && n.style.display!=='none'){
      n.classList.add('notice-enter');
      try{ if(navigator.vibrate) navigator.vibrate([80,40,80]); }catch(e){}
      // beep
      try{
        const ctx=new (window.AudioContext||window.webkitAudioContext)();
        const o=ctx.createOscillator(); const g=ctx.createGain();
        o.frequency.value=880; g.gain.value=0.2; o.connect(g); g.connect(ctx.destination); o.start(); setTimeout(()=>o.stop(),300);
      }catch(e){}
      setTimeout(()=>{
        n.classList.remove('notice-enter'); n.classList.add('notice-exit');
        setTimeout(()=>{ n.classList.add('hidden-notice'); n.classList.add('hidden-notice'); n.style.display='none'; n.style.opacity='0'; n.classList.remove('notice-exit','notice-enter'); },450);
      },5000);
    }
  }

  function start(){
    // patch updateVpnBadges
    const orig=window.updateVpnBadges;
    if(orig && !orig._patchedV4){
      window.updateVpnBadges=async function(){ const r=await orig.apply(this,arguments); setTimeout(applyGlow,100); return r; };
      window.updateVpnBadges._patchedV4=true;
    }
    setInterval(applyGlow,1200);
    setInterval(fixNotice,1000);
    applyGlow(); fixNotice();
  }
  setTimeout(start,800);
  setTimeout(start,2000);
  window.addEventListener('load',()=>setTimeout(start,1000));
})();


// ===== Withdraw Premium Patch =====
(function(){
  function playTokSound(){
    try{
      const ctx = new (window.AudioContext||window.webkitAudioContext)();
      // Tok tok - 2 quick clicks
      [0, 120].forEach(delay=>{
        setTimeout(()=>{
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type='sine';
          o.frequency.setValueAtTime(1200, ctx.currentTime);
          o.frequency.exponentialRampToValueAtTime(300, ctx.currentTime+0.08);
          g.gain.setValueAtTime(0.22, ctx.currentTime);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.12);
          o.connect(g); g.connect(ctx.destination);
          o.start(); o.stop(ctx.currentTime+0.13);
        }, delay);
      });
      if(navigator.vibrate) navigator.vibrate(30);
    }catch(e){}
  }

  function normalizeMethod(txt){
    const t = String(txt||'').toLowerCase().trim();
    if(t.includes('bkash')||t.includes('bikas')||t.includes('bkas')) return 'bkash';
    if(t.includes('nagad')||t.includes('ng')) return 'nagad';
    if(t.includes('rocket')||t.includes('rk')) return 'rocket';
    if(t.includes('binance')||t.includes('bc')||t.includes('usdt')) return 'binance';
    if(t.includes('recharge')||t.includes('mobile')||t.includes('rc')) return 'recharge';
    return t;
  }

  function applyMethodClass(){
    const methods = document.querySelectorAll('.method');
    methods.forEach(m=>{
      const name = normalizeMethod(m.textContent);
      m.classList.remove('method-bkash','method-nagad','method-rocket','method-binance','method-recharge');
      if(name==='bkash') m.classList.add('method-bkash');
      else if(name==='nagad') m.classList.add('method-nagad');
      else if(name==='rocket') m.classList.add('method-rocket');
      else if(name==='binance') m.classList.add('method-binance');
      else if(name==='recharge') m.classList.add('method-recharge');
    });
  }

  function updatePlaceholderForMethod(methodName){
    const accInput = document.getElementById('account');
    const amtInput = document.getElementById('amount');
    if(!accInput) return;
    const m = normalizeMethod(methodName);
    accInput.classList.remove('wallet-glow');
    amtInput?.classList.remove('wallet-glow');
    // reset style vars
    void accInput.offsetWidth;
    if(m==='binance'){
      accInput.placeholder = '1234... / Binance ID';
      // show 1234.. style
      accInput.value = accInput.value; // keep
      accInput.style.setProperty('--pm-color','#f3ba2f');
      accInput.style.setProperty('--pm-glow','rgba(243,186,47,0.4)');
    } else {
      accInput.placeholder = '01XXXXXXXXX';
      const colorMap = {bkash:'#e2136e', nagad:'#ff6a00', rocket:'#8a2be2', recharge:'#00c853'};
      const c = colorMap[m] || '#0bc6e8';
      accInput.style.setProperty('--pm-color',c);
    }
    accInput.classList.add('wallet-glow');
    if(amtInput){ amtInput.classList.add('wallet-glow'); amtInput.placeholder = m==='binance' ? 'Amount (USDT)' : 'Amount (TK)'; }
    setTimeout(()=>{ accInput.classList.remove('wallet-glow'); amtInput?.classList.remove('wallet-glow'); }, 1200);
  }

  function hookSelectMethod(){
    const orig = window.selectMethod;
    if(!orig || orig._patchedWithdraw) return;
    window.selectMethod = function(m){
      const res = orig.apply(this, arguments);
      try{
        applyMethodClass();
        playTokSound();
        updatePlaceholderForMethod(m);
      }catch(e){}
      return res;
    };
    window.selectMethod._patchedWithdraw = true;
  }

  function startWithdrawPatch(){
    hookSelectMethod();
    applyMethodClass();
    // Observe method grid for dynamic adds
    const grid = document.querySelector('.method-grid');
    if(grid){
      const obs = new MutationObserver(()=>{ applyMethodClass(); });
      obs.observe(grid, {childList:true});
    }
  }

  setTimeout(startWithdrawPatch, 1000);
  setTimeout(startWithdrawPatch, 2500);
  setInterval(startWithdrawPatch, 4000);
})();
