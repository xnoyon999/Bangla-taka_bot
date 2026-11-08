/* BANGLA TAKA BOT V10 FINAL - _noticeTimer FIXED + NO WARNING AT START */
console.log('BANGLA TAKA BOT V10 LOADED');
let isAdLocked = false;

// ===== CUSTOM WARNING MESSAGE =====
function getCustomWarningMessage(){
  try{
    let m = localStorage.getItem('custom_warning_msg');
    if(m && m.trim()) return m.trim();
    if(window._customWarningMsg && window._customWarningMsg.trim()) return window._customWarningMsg.trim();
  }catch(e){}
  return 'আপনি ভুল কাজ করেছেন, নিয়ম মেনে কাজ করুন';
}


console.log('BANGLA TAKA BOT V9 FINAL V5 LOADED - Binance Fixed + Pending Center + Graph 500');
/* V9 FULL RESTORED - ADMIN ONLY + DEVELOPER PIC + NO DEBUG + ALL FEATURES RESTORED - FIXED INSTANT UPDATE */
// ===== PREMIUM UI ONLY - NO BACKEND CHANGE - V9 FINAL =====
function showPremiumErrorRed(){
  try{
    const acc = document.getElementById('account');
    let old = document.getElementById('premiumErrorBox');
    if(old) old.remove();
    if(acc) { acc.classList.add('premium-input-error'); acc.focus(); }
    const box = document.createElement('div');
    box.id='premiumErrorBox';
    box.className='premium-error-red';
    box.innerHTML='⚠️ অনুগ্রহ করে আপনার সঠিক নাম্বারটি লিখুন';
    if(acc && acc.parentNode){ acc.parentNode.insertBefore(box, acc.nextSibling); }
    else { document.body.appendChild(box); }
    if(navigator.vibrate) navigator.vibrate(40);
    setTimeout(()=>{ box.style.animation='premiumRedExit 0.4s ease forwards'; setTimeout(()=>{ box.remove(); if(acc) acc.classList.remove('premium-input-error'); },380); },3000);
  }catch(e){}
}
function showPremiumSuccessCenter(){
  try{
    let old=document.getElementById('premiumSuccessBox'); if(old) old.remove();
    const box=document.createElement('div');
    box.id='premiumSuccessBox'; box.className='premium-success-center';
    box.innerHTML=`<div class="psc-icon">✓</div><div class="psc-title">✅ আপনার উইথড্র সফলভাবে সম্পন্ন হয়েছে<br>অনুগ্রহ করে পেমেন্টের জন্য অপেক্ষা করুন</div><div class="psc-sub">Bangla Taka Premium</div>`;
    document.body.appendChild(box);
    if(navigator.vibrate) navigator.vibrate([60,30,60]);
    setTimeout(()=>{ box.style.animation='premiumFadeOut 0.45s ease forwards'; setTimeout(()=>box.remove(),430); },3000);
  }catch(e){}
}

function showPremiumErrorRedCustom(targetId, message, type){
  try{
    const el = document.getElementById(targetId);
    let old = document.getElementById('premiumErrorBox_'+targetId);
    if(old) old.remove();
    // also remove other error box
    let old2 = document.getElementById('premiumErrorBox');
    if(old2) old2.remove();
    if(el){ el.classList.add('premium-input-error'); el.focus(); }
    const box = document.createElement('div');
    box.id = 'premiumErrorBox_'+targetId;
    box.className = type==='binance' ? 'premium-error-red binance' : 'premium-error-red';
    box.innerHTML = message;
    if(el && el.parentNode){ el.parentNode.insertBefore(box, el.nextSibling); }
    else { document.body.appendChild(box); }
    if(navigator.vibrate) navigator.vibrate(40);
    setTimeout(()=>{ box.style.animation='premiumRedExit 0.4s ease forwards'; setTimeout(()=>{ box.remove(); if(el) el.classList.remove('premium-input-error'); },380); },3000);
  }catch(e){}
}
function showPremiumOrangeMin(targetId, message){
  try{
    const el = document.getElementById(targetId);
    let old = document.getElementById('premiumErrorBox_'+targetId);
    if(old) old.remove();
    if(el){ el.classList.add('premium-input-error-orange'); el.focus(); }
    const box = document.createElement('div');
    box.id = 'premiumErrorBox_'+targetId;
    box.className = 'premium-error-orange';
    box.innerHTML = message;
    if(el && el.parentNode){ el.parentNode.insertBefore(box, el.nextSibling); }
    else { document.body.appendChild(box); }
    if(navigator.vibrate) navigator.vibrate([30,20,30]);
    setTimeout(()=>{ box.style.animation='premiumRedExit 0.4s ease forwards'; setTimeout(()=>{ box.remove(); if(el){ el.classList.remove('premium-input-error-orange'); el.classList.remove('premium-input-error'); } },380); },3500);
  }catch(e){}
}


function showPendingWithdrawalCenter(){
  try{
    let old=document.getElementById('premiumPendingBox'); if(old) old.remove();
    const box=document.createElement('div');
    box.id='premiumPendingBox'; box.className='premium-pending-center';
    box.innerHTML=`<div class="ppc-icon">⚠️</div><div class="ppc-title">আপনার একটি উইথড্র ইতিমধ্যে অপেক্ষমান আছে,<br>অনুগ্রহ করে আগেরটি সম্পন্ন হওয়া পর্যন্ত অপেক্ষা করুন</div>`;
    document.body.appendChild(box);
    if(navigator.vibrate) navigator.vibrate([60,30,60]);
    setTimeout(()=>{ box.style.animation='premiumFadeOut 0.45s ease forwards'; setTimeout(()=>box.remove(),430); },3500);
  }catch(e){}
}

function showPremiumLimitCenter(cur,max){
  try{
    let old=document.getElementById('premiumLimitBox'); if(old) old.remove();
    const box=document.createElement('div');
    box.id='premiumLimitBox'; box.className='premium-limit-center';
    box.innerHTML=`<div class="plc-clock">⏰</div><div class="plc-title">আপনার আজকের লিমিট শেষ!</div><div class="plc-sub">${cur}/${max} সম্পন্ন, ভোর 6AM এর পর আবার পারবেন</div>`;
    document.body.appendChild(box);
    if(navigator.vibrate) navigator.vibrate([80,40,80]);
    setTimeout(()=>{ box.style.animation='premiumFadeOut 0.45s ease forwards'; setTimeout(()=>box.remove(),430); },3500);
  }catch(e){}
}

const tg = window.Telegram?.WebApp || null;
if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor?.('#071426'); tg.setBackgroundColor?.('#071426'); }
const userId = tg?.initDataUnsafe?.user?.id || null;
let BOT_API = new URL('./bot.php', window.location.href).href;
if (location.pathname.includes('/app/')) { BOT_API = new URL('../bot.php', window.location.href).href; } 
else { const path = window.location.pathname; if (path.includes('.php')) { BOT_API = window.location.origin + path; } }

const ADMIN_UID = 6560485203;
const DEV_PIC = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCACAAIADASIAAhEBAxEB/8QAHAAAAgMBAQEBAAAAAAAAAAAABQYDBAcBAgAI/8QAMxAAAgEDAgQFAQgCAwEAAAAAAQIDAAQRBSEGEjFBEyJRYXGBBxQyQpGhscEjYiRSctH/xAAaAQACAwEBAAAAAAAAAAAAAAADBAECBQYA/8QAJhEAAgIBBAEEAwEBAAAAAAAAAQIAAxEEEiExQQUiUXETIzIUYf/aAAwDAQACEQMRAD8AUdPawiZWaEkjvzHerko06bJ5WQk560KgSMvhZM1chWJurjNI5PkTYAQnIMtW8FokissjE+lT3NtDkytLjAzio7O3aadI4V53Y4VR1NNlnwxFkT6oQ4HSFen19f4qPuQxweDMo1m+mMUa2/MyyJz+VSQN+lAPEPMARhu5Ir9E3EMkUZMMNokCpgCQkfwOlYTxFODqtxLi353ck+CuFG+KZpYdARG8HOSZSaWWROXqB+1QMx2ztjv2r0Ji68p23yx9q7JF4hXcDI2HYCj/AFFc/MhkmZts7V0SkgKc+lRyKqthST71NBazSKWRSQu+1RJE0rRLVobCFMvjkB396meC5Zjyc1V+Hb173SYZMFnXyPj1FEAJuccoYUg2QcGbSAFcgyq0d4qkMGqu4vOg5sUTumuQQBzYx6VAj3JByDj4qMycHGeIPvBcrEoCknvQ5jcg9GH0q7cXtwsjLg7H0qMXczTKCu3xXpA4Eit7SOJsq+aswWalubxAPaq8MT9e1WFt2O9XLZlFQA8GN3BNqqXssrBXcJhCfy+tMupXE0CYtITPcNsMnCp7k0vcIwtFBznqz/tVnjLXk0LS5LhFEkuMKpPc1Tsyj8HmJPGFtqsQll1PiCJFxlbaDJ/UnFZ5LMMkpvnq7bk1a1G9u9Sma61GcszdB/QFQ+GjQKDgMtPIu0TOsfc3Epkkk+9TpJ/jAySc461EU8wXIJNfRnD49dqtKTrZklxjqcbCtN4Z0FDYLlT5vMQe9DOGOAbu8aG5uWQRsA2O9ajBpS6fbLyNzcowT6CgWWDoQ6VN2Ynto0mjyyTWbf4ZsF48fhb1FeGurpG82f0ph0ZLvVr4aj4qjTo3YRwlB/kA2DE/IP0olr1na31hNcWTI80S82xyduopdycx+ggL1EttQuM9M/Solv7kty8uB8V1ZZA26ftXm8mlSLnjQZqinJhnAAziVZ7qRXIMYP0qJrxwRmMfpUYu5m3aPer0coeHLxjmq5yJQEEDiUYJcsMjarkl5BCYo5XCvK3LGvdjQy3S5zulSaK1tqHGNkl23ILeQnzYwSoyAPr/ABRRX3mLNqRxjualo9r91tIkk2KrvWc/azeeI9rAh2Lk4zttWgarqKQQsz5VVBJYdhWRcQ3kGveLdRJIRFKI4m/7DBJ2/SqUjLSLmwpz5i94WxblZ8dNtqryc6ncEVNKZYHKMWX02ry3isvKwPMfbc07mIYlcE5z3o3wnocut6mkS8yxIcyOB0Hp81X0vRbu8u44/Ak5Cdzy0+XVynDOlG10dFjuHGZJW6r7/NBssA9o7h66s+5uo/2NzZWHh2SPzzIoURRDJUe/pXOILqWezSwssrc3riBCPyA/ib6Ln64rI7biVrTwIo7vlhlPNcFAWlJ9ydjn26VovAU0Or38+pox8O3QW8CSHzAHdmI7EnH0FCZNvMOtgbiNVpZQafHFbxLi3CiML6AdK5JCscd2yphY42WNRjLbb/vtVu9CkYFUXkcsULnlIzy+9BJh14mSXPFFpAxR0kYrscLjB9N6+h4l0+5UczmH1Eg/umTizgu21lpJrfFveDcOBs//AKH91nN/w5eadL4NzNCj/l58qG+DjFN1pVYOO/uKW2X1nJPH1G4yQzRh4GR1P5lORXefC4I2oNw3Dc2cE0VxGVAYFd8hgR1BHWikl9GVKkDaq3UMhHwZfS6tLQR5HcNwWme1CNR4JOoNNc6dMIZ+Ykq+eVj3we1NKsscWQN+3zV+zHhQY/WqNYydGDqqD53TJ7/ReJ0T7td3D+CTy4NxzKfpTxo3DVpZ6TFZSr4pVudnIxlj3r3qzCS/tg5AUzLnPzRSTVtNhVi95B5eoDAn9Ksjs46lblWs9xPsuBpW1aaa+lRrfJKBerZ6fGKK6xZ6Nodi0/3eKS5TBRMjmbfFR3PGvJKwtLZGjHRnOCfekXW724lUu7szSPzs3pTYpJUl+oj/AKRuAr7hmTi7ULPxTDY2cSLJgpzgkE/z8iq2v6zLrOlxzRWMqIGxc3AGVLdl9h33pUGHYiQ5J71o/wBjEwOo6hYTKGt5YlZgwyMg4/v9qWatU5Aj6WPZ7Se5nipGuHBzWh/ZLHdPq808Qb7sIikjHoTkYHz1pw1XhnhOG5ZTpkRnk3yCVRffHT9qIxXOn6PHBBDEscbbKFAUZ9hVHsyMCFSracmGZFPKMmhNxKFvYwD65q492sqgoeopfuLnm1BsHZdqWJjIHMNOgbDChus6bb31o8VxErqezDNWobkcnmNC9a1QRW0nIfMRgfNQoLMAOzPWMEUs3QiZb2kNkHggz4Yc4yc1E1vH4nM42PXFWl6b1G7DmI9MCup/EpQIZwI1VguNq8ExlhUvJGp9aLSeVMUKt5V++BAQWRQWHpnp/FEpZWKFc5rmre529H8RT4vV3tnVQebG2KzuOSSN8PkZOM1o/F1y0Wnu3MAxOF26mkeKSd2ALYCqMAAU5og204iOvZQwBnYyzDrmpguRhhkGvSRq2STv3NfMxj7gj3rTAxMUtk8ShPYwEtgFD7HamHgzWRpEJSaBWidjmRBhv17j2oOIL3UG8KxtHmY7ZUbD61bjsptPiNtdKBNHs4Bzg0E112EqY0LraVDg+Y9aZdGbEkC+PM2T4ryZVM+lELdozcLGrG5vOsj4yE9h6Cs3s2mgJmhkaNs9j1+aZtK4jkEkNuLVRNK6pzIcDJPXFJWaN1/jmadHqtTLtcYMdbmZLW2d5GHPjGOm9LTXi8w9Seuepqfi60eGztrrMkoiuAZT/qRjOPSqTw2s0WYnUkjKkGk9RS1R2tHtPcty7llg6iwXlFCL2dpJArHpuaO6foskxEs5MUQGSSNyPal+7dZbqWSNAsZbyD0HanfT9K+8WMMAdTJ9Z1qLUaUOSe5GHOKHC4BJZs5ZyVA6kdKs3k3gQSSN0RScCqFkrFPFk/G3T29q2mPOJzdSDaWMa0lig1yfxJFTx4FZOY4yVJB/mp7jW7S1UmSZWPopyakeOG4XlmiRx/sM1m/Ecz2Gs3ECRKIgQUG/QisIVpY3uM6v81tS4QAwlrOpSarc8z+SJPwJ/dD42AZzjAG2aGS6oWQAQgeu9QXV/NcALsiD8q96dVkRcLM9q7bW3P5hS51CGLYks3otC5dQlc+Qco996qVyqNYxh0oRI66L9oNxYRJBPZQtEu3+Ichqxc3qalcS3qKVSZuYKeoFIVOOnbabD/4FX0yjcTF9ef1gf9lhVzFnoM0Z4UtFuNVjlI2icY+aDplkjRSMtsBTzpFkumvAVGQFAY+p9afUZmYnfMbCgIOQCO4NRi2srXLx20UbeqoBUviqEDdQRUUYMr88nQdBUlQTyIcMQMAwHxfqh0/SWIB8W4PIiD8RHc/p/NJNvdwXAxE/mHVG2I+lN/HcEUtqtyXAeDygHoeY9Pms01yIQQowOHLDcdc5qGYrzANUtrhTwfEv603/ABgn/eRV/fP9Vw4UKo6Ch8RluEiM8hZVbKg1cmbzDHaqA5JM9s2AJ9xvhZupO1K32gWSSWsF8oxIrcjH1HamWGTJAAoLxxKo0MqQcmQYx2rFX+hOkPUzkH1r7NeiM+Zf0rx0piDna4aYJuEr8WEV5bFZ1dAxRdmH/wBoA6NG5SRSrDqCMEVUEHqTjE804WQLafAg7oMmk+nCylSPSI5sjaMdaZ0/ZiOvztXHzKWtXzWxjigOHUhiR2ArWNCuo9S0u3uV3EiAn5rErmV5pGcg5J606fZtrrWsx0y5OY3PNFnse4pim39hB6MFbRtpGOxNQiWVMcp5l7A1aDkLvsfSo4JUkUFT9K+duWTzdO1NkRRTE37QbgiC2ts7yMZGHxsP5NZ9rExl+6xucnO/0pw45nMut4G4SJQP3NImrnF5D7Kf5pW48GFoG6yFI2AKAdBXLtyV5FOGc4z6DuagtG5xk+lV5rom9ZFGyDBPYVUtxJWsl/qaRZ6Ve3GGVDGvq21XrrheK9s5be7YurDt2PrTi6xhcAD6VXmMYiOCAKWWhB3Hm1DGYhr3BV5pcoNtKs8TDKk7H4oGNInRh948n+o3NbtqSWN3CIrnl26YOCDQSHh3T1uRPhpGBypc7Ch2Vtu4PEPXcm33A5lK18e00S2a4XEioM/FDr3TtP1mI/eIgsnaRdiKL8T3Cx2rIrAu2wUUFsiyxAEHNK2e1+Iwh3LkxL1nh+60xi4HiwdpFHT5r60kaayigU5VScitB6pysAVPUEdaX9U4c8zXOkt4UvUx/lai1XgH3QV1O4cQMkK/hYV6t4GF7brFs5lXB+tQtfGNjBfwmGUd8V1r4Wk8M6MH5HDA/WnwyEZBmcUsBwRNjs5D4S87csgH4vWppbiYjqrih1hL4ypcRESW8yhlI7Grknhkcx8prTKjxMtXPmInE8hbWpiRjCqMfSk/WeZ7kFN/DTJ+M01cVMF1qUqcgqpz9KXwQbyV8flC1n3DJxHtOdp3T60kCWXiE9RmqdlH4rtL4nmY5K4r3fuI4SqDGdsCvdnD4MQx+LqTQe2A+Iz0pb5n/9k=";

function isAdminUser(){
  try{
    const tid = tg?.initDataUnsafe?.user?.id || userId || state.user?.id || 0;
    return Number(tid) === Number(ADMIN_UID);
  }catch(e){ return false; }
}
const ADMIN_PASS = "noyon@18";
function showPremiumAdminModal(){
  return new Promise((resolve)=>{
    // Remove existing
    let old=document.getElementById('premiumAdminModal'); if(old) old.remove();
    const overlay=document.createElement('div');
    overlay.id='premiumAdminModal';
    overlay.className='premium-admin-overlay';
    overlay.innerHTML=`
      <div class="premium-admin-card">
        <div class="pac-logo">💎 BANGLA TAKA BOT 🔥</div>
        <div class="pac-title">🔐 Admin Password</div>
        <div class="pac-input-wrap">
          <span class="pac-lock">🔒</span>
          <input id="premiumAdminInput" type="password" placeholder="Password din..." class="pac-input" autocomplete="off">
        </div>
        <div class="pac-btns">
          <button id="pacCancel" class="pac-btn cancel">Cancel</button>
          <button id="pacOk" class="pac-btn ok">OK</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    const input=document.getElementById('premiumAdminInput');
    const okBtn=document.getElementById('pacOk');
    const cancelBtn=document.getElementById('pacCancel');
    setTimeout(()=>{ if(input) input.focus(); },100);
    function close(val){
      overlay.style.animation='premiumAdminFadeOut 0.35s ease forwards';
      setTimeout(()=>{ overlay.remove(); resolve(val); },320);
    }
    okBtn.onclick=()=>{ close(input.value||''); };
    cancelBtn.onclick=()=>{ close(null); };
    overlay.onclick=(e)=>{ if(e.target===overlay) close(null); };
    input.onkeydown=(e)=>{ if(e.key==='Enter') close(input.value||''); if(e.key==='Escape') close(null); };
  });
}

async function openAdminPanel(){
  try{
    const authed = sessionStorage.getItem('admin_auth');
    if(authed !== 'ok'){
      const p = await showPremiumAdminModal();
      if(p===null){ return; }
      if(p !== ADMIN_PASS){ toast('❌ Wrong password!'); if(navigator.vibrate) navigator.vibrate([40,20,40]); return; }
      sessionStorage.setItem('admin_auth','ok');
    }
  }catch(e){
    const p = await showPremiumAdminModal();
    if(p===null){ return; }
    if(p !== ADMIN_PASS){ toast('❌ Wrong password!'); return; }
    try{ sessionStorage.setItem('admin_auth','ok'); }catch(e){}
  }
  setTimeout(()=>{ loadAdminBonusTasks(); },500);
  const el = document.getElementById('adminPanel');
  if(el){ el.style.display='grid'; el.classList.remove('hidden'); loadAdminSettings(); }
  if(tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
}
function closeAdminPanel(){
  const el = document.getElementById('adminPanel');
  if(el){ el.style.display='none'; el.classList.add('hidden'); }
}
window.openAdminPanel = openAdminPanel;
window.closeAdminPanel = closeAdminPanel;

async function loadAdminSettings(){
  try{
    const sPoro = document.getElementById('adminPoroReward');
    const sLijent = document.getElementById('adminLijentReward');
    const sMin = document.getElementById('adminMinWithdraw');
    const sMinUsdt = document.getElementById('adminMinUsdt');
    const sMinRecharge = document.getElementById('adminMinRecharge');
    const sAllowed = document.getElementById('adminAllowedCountries');
    const sPoroLim = document.getElementById('adminPoroLimit');
    const sNextPoroLim = document.getElementById('adminNextPoroLimit');
    const sNextLijentLim = document.getElementById('adminNextLijentLimit');
    const sLijentLim = document.getElementById('adminLijentLimit');
    const sWelcome = document.getElementById('adminWelcomeNotice');
    const sEarning = document.getElementById('adminEarningPopup');
    const sBonus = document.getElementById('adminBonusText');
    const sPayment = document.getElementById('adminPaymentInput');
    const sMonetag = document.getElementById('adminMonetagCode');
    const sAdspark = document.getElementById('adminAdsparkCode');
    if(!sPoro) return;
    const res = await api('admin_get_settings');
    if(res && res.ok && res.settings){
      if(res.settings.poro_reward !== undefined) sPoro.value = res.settings.poro_reward;
      if(res.settings.lijent_reward !== undefined) sLijent.value = res.settings.lijent_reward;
      if(res.settings.min_withdraw !== undefined) sMin.value = res.settings.min_withdraw;
      if(res.settings.min_usdt !== undefined && sMinUsdt) sMinUsdt.value = res.settings.min_usdt;
      if(res.settings.min_recharge !== undefined && sMinRecharge) sMinRecharge.value = res.settings.min_recharge;
      if(res.settings.poro_limit !== undefined && sPoroLim) sPoroLim.value = res.settings.poro_limit;
      if(res.settings.lijent_limit !== undefined && sLijentLim) sLijentLim.value = res.settings.lijent_limit;
      if(res.settings.next_poro_limit !== undefined && sNextPoroLim) sNextPoroLim.value = res.settings.next_poro_limit;
      if(res.settings.next_lijent_limit !== undefined && sNextLijentLim) sNextLijentLim.value = res.settings.next_lijent_limit;
      if(res.settings.allowed_countries !== undefined) sAllowed.value = (res.settings.allowed_countries||[]).join(',');
      if(res.settings.welcome_notice !== undefined && sWelcome) sWelcome.value = res.settings.welcome_notice;
      if(res.settings.earning_popup !== undefined && sEarning) sEarning.value = res.settings.earning_popup;
      if(res.settings.bonus_text !== undefined && sBonus) sBonus.value = res.settings.bonus_text;
      if(res.settings.payment_methods !== undefined && sPayment) { sPayment.value = res.settings.payment_methods; updatePaymentPreview(res.settings.payment_methods); }
      if(res.settings.monetag_code !== undefined && sMonetag) sMonetag.value = res.settings.monetag_code;
      if(res.settings.adspark_code !== undefined && sAdspark) sAdspark.value = res.settings.adspark_code;
      // === BOT STOP STATUS ===
      const sBotStopped = document.getElementById('adminBotStopped');
      const sStopMsg = document.getElementById('adminStopMessage');
      const sBotStatusText = document.getElementById('botStatusText');
      if(res.settings.bot_stopped !== undefined && sBotStopped) {
        sBotStopped.checked = !!res.settings.bot_stopped;
        if(sBotStatusText) sBotStatusText.textContent = res.settings.bot_stopped ? '🛑 Bot বন্ধ আছে' : '✅ Bot চালু আছে';
        if(sBotStatusText) sBotStatusText.style.color = res.settings.bot_stopped ? '#ff6b6b' : '#51cf66';
      }
      if(res.settings.stop_message !== undefined && sStopMsg) sStopMsg.value = res.settings.stop_message;
      if(res.settings.notice_ad_set !== undefined) window._noticeAdSet = Number(res.settings.notice_ad_set || 5);
      if(res.settings.notice_add_second_set !== undefined) window._noticeAddSecondSet = Number(res.settings.notice_add_second_set || 30);
      if(res.settings.home_notice !== undefined) window._homeNotice = String(res.settings.home_notice || '');
      if(res.settings.home_notice_country !== undefined) window._homeNoticeCountry = String(res.settings.home_notice_country || 'Australia');
      if(res.settings.home_notice_text !== undefined) window._homeNoticeText = String(res.settings.home_notice_text || '');
    }
  }catch(e){}
}
async function saveAdminSettings(){
  const adNetPanel = document.getElementById('admContent_adnetwork');
  const btn = (adNetPanel && adNetPanel.style.display !== 'none') ? document.getElementById('adminAdNetworkSaveBtn') : document.getElementById('adminSaveBtn');
  const poro = document.getElementById('adminPoroReward')?.value;
  const lijent = document.getElementById('adminLijentReward')?.value;
  const minW = document.getElementById('adminMinWithdraw')?.value;
  const minUsdt = document.getElementById('adminMinUsdt')?.value;
  const minRecharge = document.getElementById('adminMinRecharge')?.value;
  const allowed = document.getElementById('adminAllowedCountries')?.value;
  const monetagCode = document.getElementById('adminMonetagCode')?.value ?? '';
  const adsparkCode = document.getElementById('adminAdsparkCode')?.value ?? '';
  const settings = {
    poro_reward: Number(poro||0),
    lijent_reward: Number(lijent||0),
    min_withdraw: Number(minW||0),
    min_usdt: Number(minUsdt||0),
    min_recharge: Number(minRecharge||0),
    allowed_countries: String(allowed||'BD').split(',').map(s=>s.trim().toUpperCase()).filter(Boolean),
    monetag_code: String(monetagCode).trim(),
    adspark_code: String(adsparkCode).trim()
  };
  if(btn){ btn.textContent='Saving...'; btn.disabled=true; }
  try{
    const res = await api('admin_save_settings', {settings: JSON.stringify(settings)});
    localStorage.setItem('admin_settings_v1', JSON.stringify(settings));
    state.min_withdraw = settings.min_withdraw;
    state.min_usdt = settings.min_usdt;
    state.min_recharge = settings.min_recharge;
    state.allowed_countries = settings.allowed_countries;
    state.allowed_country_names = settings.allowed_countries.join(', ');
    state.ad_networks = {
      monetag: {enabled: settings.monetag_code !== '', code: settings.monetag_code},
      adspark: {enabled: settings.adspark_code !== '', code: settings.adspark_code}
    };
    cachedCountry = null;
    try{ localStorage.setItem('admin_settings_cache', JSON.stringify(settings)); }catch(e){}
    getUserCountry(true).then(()=>{ updateVpnBadges(); }).catch(()=>{});
    if(res && res.ok){ toast('Admin settings saved ✅'); } else { toast('Saved & Applied ✅'); }
    setTimeout(()=>{ updateVpnBadges(); }, 500);
  }catch(e){ toast('Save failed'); } finally { if(btn){ btn.textContent='Save Settings'; btn.disabled=false; } }
}
window.saveAdminSettings = saveAdminSettings;

const screen = document.getElementById('screen');
const toastEl = document.getElementById('toast');
const telegramUser = tg?.initDataUnsafe?.user || null;
let state = {
 user: telegramUser ? { id: telegramUser.id, name: [telegramUser.first_name, telegramUser.last_name].filter(Boolean).join(' ') || telegramUser.username || 'User', photo_url: telegramUser.photo_url || '', username: telegramUser.username || '', balance: 0 } : null,
 ads: [], top_referrers: [], top_earners: [], ref_link: '', min_withdraw: 100, min_usdt: 1, min_recharge: 20,
 allowed_countries: ['BD'], allowed_country_names: 'Bangladesh',
 earnings_history: []
};
let currentTab='home'; let selectedMethod='';
const PAYMENT_MAP={bk:'bKash',bkas:'bKash',bkash:'bKash',nk:'Nagad',ng:'Nagad',nagad:'Nagad',rk:'Rocket',rocket:'Rocket',bc:'Binance',binance:'Binance',rc:'Mobile Recharge',recharge:'Mobile Recharge','mobile_recharge':'Mobile Recharge','mobile recharge':'Mobile Recharge'};
function paymentMethodLabelClient(method){ const m=String(method||'').trim().toLowerCase(); return PAYMENT_MAP[m] || m || 'Unknown'; }
function parsePaymentMethods(){ try{ var cached=null; try{ cached=localStorage.getItem('payment_methods_cache'); }catch(e){} var raw=cached||(state.settings&&state.settings.payment_methods)||'bk,nk,rk'; var codes=String(raw).split(',').map(function(s){return s.trim();}).filter(Boolean); var res=[]; for(var i=0;i<codes.length;i++){ var c=codes[i]; var low=c.toLowerCase(); res.push(PAYMENT_MAP[low]||c); } return res.length?res:['bKash','Nagad','Rocket','Binance']; }catch(e){ return ['bKash','Nagad','Rocket','Binance']; } } let topMode='referrers';
let cachedCountry = null;

function initData(){ return tg?.initData || ''; }
async function api(action,data={}){
 let timeoutId=null;
 try{
  const _photo = tg?.initDataUnsafe?.user?.photo_url || '';
  const body=new URLSearchParams({action,initData:initData(),start_param:tg?.initDataUnsafe?.start_param||'',photo_url:_photo,...data});
  const controller=new AbortController();
  timeoutId=setTimeout(()=>controller.abort(),8000);
  const r=await fetch(`${BOT_API}?api=1`,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded','X-Telegram-Init-Data':initData()},body,signal:controller.signal});
  if(!r.ok) return {ok:false,message:'Server error ('+r.status+')'};
  const text=await r.text();
  try{return JSON.parse(text);}catch{return{ok:false,message:'Invalid response'};}
 }catch(e){return{ok:false,message:e&&e.name==='AbortError'?'Request timed out. Tap Retry':'Network error'};}
 finally{if(timeoutId)clearTimeout(timeoutId);}
}
function toast(msg){ if(!toastEl)return; toastEl.textContent=msg||'Done'; toastEl.style.display='block'; clearTimeout(window._toast); window._toast=setTimeout(()=>{toastEl.style.display='none';},3500); }
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function money(n){return Number(n||0).toFixed(2);}
function userName(){return(state.user?.name||'User');}
function userBalance(){return Number(state.user?.balance||0);}
function userTodayViews(){return Number(state.user?.today_views||0);} function userTotalViews(){ return Number(state.user?.daily_total_views ?? state.user?.total_views ?? 0); }
function userReferrals(){return Number(state.user?.referrals||0);}
function userEarned(){return Number(state.user?.earned||0);}
function userFakeCount(){return Number(state.user?.fake_count||0);}
function userGoodCount(){return Number(state.user?.good_count||0);}

let _poroMem = null; let _lijentMem = null;
function getPoroViews(){ 
  try{
    if(state.user?.poro_views!==undefined){ 
      const srv = Number(state.user.poro_views||0);
      _poroMem=srv; 
      try{ localStorage.setItem('poro_views_v2', String(srv)); }catch{}
      return srv; 
    }
  }catch{}
  if(_poroMem!==null) return _poroMem; 
  try{const v=localStorage.getItem('poro_views_v2'); _poroMem=v?parseInt(v)||0:0; return _poroMem;}catch(e){return 0;} }
function getLijentViews(){ 
  try{
    if(state.user?.lijent_views!==undefined){ 
      const srv = Number(state.user.lijent_views||0);
      _lijentMem=srv; 
      try{ localStorage.setItem('lijent_views_v2', String(srv)); }catch{}
      return srv; 
    }
  }catch{}
  if(_lijentMem!==null) return _lijentMem; 
  try{const v=localStorage.getItem('lijent_views_v2'); _lijentMem=v?parseInt(v)||0:0; return _lijentMem;}catch(e){return 0;} }
function savePoroViews(n){ _poroMem=n; try{localStorage.setItem('poro_views_v2',String(n));}catch(e){} }
function saveLijentViews(n){ _lijentMem=n; try{localStorage.setItem('lijent_views_v2',String(n));}catch(e){} }
function getPoroMax(){ return Number(state.poro_limit||state.settings?.poro_limit||100); } function getLijentMax(){ return Number(state.lijent_limit||state.settings?.lijent_limit||100); }
function getLocalCounts(){ try{ const uid=userId||state.user?.id||'guest'; const key='earn_counts_'+uid; const raw=localStorage.getItem(key); if(raw){const d=JSON.parse(raw); return {fake:Number(d.fake||0),good:Number(d.good||0)};} }catch(e){} return {fake:0,good:0}; }
function saveLocalCounts(fake,good){ try{const uid=userId||state.user?.id||'guest'; const key='earn_counts_'+uid; localStorage.setItem(key,JSON.stringify({fake,good,updated:Date.now()}));}catch(e){} }
function incLocalFake(){ const c=getLocalCounts(); c.fake+=1; saveLocalCounts(c.fake,c.good); if(state.user) state.user.fake_count=(Number(state.user.fake_count||0)+1); updateBoxUI(); }
function incLocalGood(){ const c=getLocalCounts(); c.good+=1; saveLocalCounts(c.fake,c.good); if(state.user) state.user.good_count=(Number(state.user.good_count||0)+1); updateBoxUI(); }
function updateBoxUI(){ const fakeEl=document.getElementById('fakeNum'); const goodEl=document.getElementById('goodNum'); const fakeCount=state.user?.fake_count??getLocalCounts().fake; const goodCount=state.user?.good_count??getLocalCounts().good; if(fakeEl) fakeEl.textContent=fakeCount; if(goodEl) goodEl.textContent=goodCount; }
function getLast7DaysData(){ const out=[]; const now=new Date(); for(let i=6;i>=0;i--){const d=new Date(now); d.setDate(now.getDate()-i); const dayStr=String(d.getDate()).padStart(2,'0'); const full=d.toISOString().split('T')[0]; let earn=0; if(state.earnings_history){const found=state.earnings_history.find(x=>x.full_date===full); if(found) earn=found.earn;} out.push({date:dayStr,full_date:full,earn});} return out;}
function saveDailyEarn(amount){ 
  // LAST FIX: No double add - real total from server only, to fix 28TK vs 14TK bug
  try{ window._lastEarnAmount = Number(amount||0); }catch(e){}
}

function refreshHomeData(){
  try{
    const balBig = document.getElementById('mainBalanceBig');
    if(balBig) balBig.textContent = money(userBalance()) + ' TK';
    const homeAdL = document.getElementById('homeAdLijent');
    const homeAdP = document.getElementById('homeAdPoro');
    if(homeAdL) homeAdL.textContent = getLijentViews()+'/'+getLijentMax()+' AD';
    if(homeAdP) homeAdP.textContent = getPoroViews()+'/'+getPoroMax()+' MG';
    const homeTotal = document.getElementById('homeTotal');
    if(homeTotal) homeTotal.textContent = userTotalViews();
    const homeEarned = document.getElementById('homeEarned');
    if(homeEarned) homeEarned.textContent = money(userEarned());
    const hist = (state.earnings_history && state.earnings_history.length) ? state.earnings_history : getLast7DaysData();
    const total7 = hist.reduce((a,b)=>a+Number(b.earn||0),0);
    const chartTitle = document.querySelector('.chart-title');
    if(chartTitle) chartTitle.textContent = 'LAST 7 DAYS EARNINGS - Total: '+money(total7)+' TK';
    if(document.getElementById('earnChart')){ drawEarnChart(hist); }
  }catch(e){}
}
window.refreshHomeData = refreshHomeData;

function drawEarnChart(hist){
  try{
    const canvas=document.getElementById('earnChart'); if(!canvas) return;
    const ctx=canvas.getContext('2d'); const dpr=window.devicePixelRatio||1; const rect=canvas.getBoundingClientRect();
    canvas.width=rect.width*dpr; canvas.height=150*dpr; ctx.scale(dpr,dpr);
    const W=rect.width, H=150;
    if(!hist||!hist.length) return;
    const FIXED_MAX = 150;
    const padding=10; const barW=(W-padding*2)/hist.length-8;
    let startTime = null;
    const duration = 1500;
    function animate(now){
      if(!startTime) startTime=now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed/duration, 1);
      const ease = progress<0.5 ? 2*progress*progress : 1-Math.pow(-2*progress+2,2)/2;
      ctx.clearRect(0,0,W,H);
      hist.forEach((h,i)=>{
        const heightPercent = Math.min((h.earn / FIXED_MAX) * 100, 100);
        const targetH = Math.max(4, (heightPercent/100)*(H-22));
        const barH = targetH * ease;
        const x=padding+i*((W-padding*2)/hist.length); const y=H-barH-14;
        const grad=ctx.createLinearGradient(0,y,0,y+barH); grad.addColorStop(0,'#12c9e7'); grad.addColorStop(1,'#665cf4');
        ctx.fillStyle=grad; ctx.beginPath();
        if(ctx.roundRect){ ctx.roundRect(x,y,barW,barH,6); } else { ctx.rect(x,y,barW,barH); }
        ctx.fill();
      });
      if(progress<1) requestAnimationFrame(animate);
      else {
        hist.forEach((h,i)=>{
          const heightPercent = Math.min((h.earn / FIXED_MAX) * 100, 100);
          const targetH = Math.max(4, (heightPercent/100)*(H-22));
          const x=padding+i*((W-padding*2)/hist.length); const y=H-targetH-14;
          if(h.earn>0){ ctx.fillStyle='#7c8da8'; ctx.font='10px system-ui'; ctx.textAlign='center'; ctx.fillText(money(h.earn), x+barW/2, y-4); }
        });
        animateTodayTotal();
      }
    }
    requestAnimationFrame(animate);
    function animateTodayTotal(){
      try{
        let countEl=null;
        document.querySelectorAll('div').forEach(d=>{ if(d.textContent.includes('Today Total:')) countEl=d; });
        if(!countEl) return;
        const target = hist.length? hist[hist.length-1].earn : 0;
        let st=null;
        function countAnim(now){
          if(!st) st=now;
          const p=Math.min((now-st)/1500,1);
          const ease=p<0.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
          const cur=(target*ease).toFixed(2);
          countEl.textContent='Today Total: '+cur+' TK';
          if(p<1) requestAnimationFrame(countAnim);
          else countEl.textContent='Today Total: '+Number(target).toFixed(2)+' TK';
        }
        requestAnimationFrame(countAnim);
      }catch(e){}
    }
  }catch(e){}
}
let audioCtx=null; function getAudioCtx(){ if(!audioCtx){try{audioCtx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){return null;}} return audioCtx; }
function playTok(){ try{const ctx=getAudioCtx(); if(!ctx)return; const o=ctx.createOscillator(); const g=ctx.createGain(); o.type='sine'; o.frequency.value=900; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.4,ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.35); o.start(); o.stop(ctx.currentTime+0.35);}catch(e){} }
function playWarningSound(){ try{const ctx=getAudioCtx(); if(!ctx)return; const o=ctx.createOscillator(); const g=ctx.createGain(); o.type='sawtooth'; o.frequency.value=200; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.3,ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.5); o.start(); o.stop(ctx.currentTime+0.5);}catch(e){} }
// Safe JSON fetch helper used by the IP-location fallback lookup.
async function readJson(url, timeoutMs=6000){
  const controller = new AbortController();
  const timer = setTimeout(()=>controller.abort(), timeoutMs);
  try{
    const response = await fetch(url, {cache:'no-store', signal:controller.signal});
    if(!response.ok) throw new Error('HTTP '+response.status);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function getUserCountry(force=false){
  if(cachedCountry&&!force&&cachedCountry.ip&&cachedCountry.code&&cachedCountry.name) return cachedCountry;
  let result={code:'',name:'',ip:''};
  const applyLocation=(d, source)=>{
    if(!d || typeof d!=='object') return;
    const code=String(d.country_code||d.countryCode||d.country||'').trim().toUpperCase();
    // api.country.is returns a two-letter country code in "country".
    const normalizedCode=/^[A-Z]{2}$/.test(code)?code:'';
    const ip=String(d.ip||result.ip||'').trim();
    let name=String(d.country_name||d.countryName||'').trim();
    if(!name && source==='ipwho') name=String(d.country||'').trim();
    if(!name && normalizedCode) name=countryMeta(normalizedCode).name;
    if(normalizedCode) result.code=normalizedCode;
    if(name && name.length>2) result.name=name;
    if(ip) result.ip=ip;
  };
  // Prefer IPinfo as the primary country checker to avoid stale/wrong ipwho.is results.
  try{
    const d=await readJson('https://ipinfo.io/json?t='+Date.now(),6000);
    if(d && d.country) applyLocation({country_code:d.country,country_name:d.country,ip:d.ip},'ipinfo');
  }catch(e){}
  // Fallback to ipapi.co if IPinfo did not return a usable country and IP.
  if(!result.code || !result.ip){
    try{
      const d=await readJson('https://ipapi.co/json/?t='+Date.now(),6000);
      if(d && !d.error) applyLocation(d,'ipapi');
    }catch(e){}
  }
  // Last fallback if the first two providers failed.
  if(!result.code || !result.ip){
    try{
      const d=await readJson('https://ipwho.is/?t='+Date.now(),6000);
      if(d && d.success!==false) applyLocation(d,'ipwho');
    }catch(e){}
  }
  // Country-only fallback; it also provides the public IP on successful responses.
  if(!result.code || !result.ip){
    try{
      const d=await readJson('https://api.country.is/?t='+Date.now(),6000);
      if(d) applyLocation(d,'country-is');
    }catch(e){}
  }
  // If needed, get the public IP separately, then look up that exact address.
  if(!result.ip){
    try{
      const d=await readJson('https://api.ipify.org?format=json&t='+Date.now(),6000);
      if(d && d.ip) result.ip=String(d.ip).trim();
    }catch(e){}
  }
  if(result.ip && (!result.code || !result.name)){
    const ip=encodeURIComponent(String(result.ip).trim());
    try{
      const d=await readJson('https://ipwho.is/'+ip+'?t='+Date.now(),6000);
      if(d && d.success!==false) applyLocation(d,'ipwho');
    }catch(e){}
    if(!result.code || !result.name){
      try{
        const d=await readJson('https://ipapi.co/'+ip+'/json/?t='+Date.now(),6000);
        if(d && !d.error) applyLocation(d,'ipapi');
      }catch(e){}
    }
    if(!result.code){
      try{
        const d=await readJson('https://api.country.is/'+encodeURIComponent(String(result.ip).trim())+'?t='+Date.now(),6000);
        if(d) applyLocation(d,'country-is');
      }catch(e){}
    }
  }
  if(result.code && (!result.name || result.name===result.code)) result.name=countryMeta(result.code).name;
  if(result.code || result.name || result.ip){
    cachedCountry=result;
    return result;
  }
  return null;
}
function hero(){
 const telegramName=[tg?.initDataUnsafe?.user?.first_name,tg?.initDataUnsafe?.user?.last_name].filter(Boolean).join(' ')||tg?.initDataUnsafe?.user?.username||userName();
 const cleanName=telegramName.replace(/[^\w\s\u0000-\u007F]/g,'').trim()||telegramName||'User';
 const telegramPhoto=tg?.initDataUnsafe?.user?.photo_url||state.user?.photo_url||'';
 const firstLetter=(cleanName||'U').charAt(0).toUpperCase();
 let avatarContent='';
 if(telegramPhoto){
   avatarContent=`<img src="${esc(telegramPhoto)}" alt="${esc(cleanName)}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="avatar-fallback" style="display:none;width:100%;height:100%;place-items:center;font-size:28px;font-weight:900;background:linear-gradient(135deg,#2ea8ff,#a855f7);color:#fff;border-radius:50%;">${esc(firstLetter)}</div>`;
 } else {
   avatarContent=`<div class="avatar-fallback" style="width:100%;height:100%;display:grid;place-items:center;font-size:28px;font-weight:900;background:linear-gradient(135deg,#2ea8ff,#a855f7);color:#fff;border-radius:50%;">${esc(firstLetter)}</div>`;
 }
 return `<section class="hero"><div class="avatar-wrap"><div class="avatar" style="overflow:hidden;">${avatarContent}</div><div class="verified-badge">✓</div></div><div class="name">${esc(cleanName)}</div><div class="balance-pill">Balance: <span id="balanceText">${money(userBalance())} TK</span></div></section>`;
}
function earnHero(){
 const telegramName=[tg?.initDataUnsafe?.user?.first_name,tg?.initDataUnsafe?.user?.last_name].filter(Boolean).join(' ')||tg?.initDataUnsafe?.user?.username||userName();
 const cleanName=telegramName.replace(/[^\w\s\u0000-\u007F]/g,'').trim()||telegramName||'User';
 const telegramPhoto=tg?.initDataUnsafe?.user?.photo_url||state.user?.photo_url||'';
 const firstLetter=(cleanName||'U').charAt(0).toUpperCase();
 let avatarContent='';
 if(telegramPhoto){
   avatarContent=`<img src="${esc(telegramPhoto)}" alt="${esc(cleanName)}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="avatar-fallback" style="display:none;width:100%;height:100%;place-items:center;font-size:32px;font-weight:900;">${esc(firstLetter)}</div>`;
 } else {
   avatarContent=`<div class="avatar-fallback" style="width:100%;height:100%;display:grid;place-items:center;font-size:32px;font-weight:900;background:linear-gradient(135deg,#2ea8ff,#a855f7);color:#fff;border-radius:50%;">${esc(firstLetter)}</div>`;
 }
 const local=getLocalCounts(); const fakeCount=state.user?.fake_count??local.fake; const goodCount=state.user?.good_count??local.good;
 return `<section class="hero"><div class="hero-earn-row"><div class="hero-box fake"><div class="box-num" id="fakeNum">${fakeCount}</div><div class="box-label">Fake Kaj</div></div><div class="avatar-wrap"><div class="avatar" style="overflow:hidden;">${avatarContent}</div><div class="verified-badge">✓</div></div><div class="hero-box good"><div class="box-num" id="goodNum">${goodCount}</div><div class="box-label">Good Working</div></div></div><div class="name">${esc(cleanName)}</div><div class="earn-balance-vpn-row"><div class="balance-pill">Balance: <span id="balanceText">${money(userBalance())} TK</span></div><a href="https://play.google.com/store/apps/details?id=free.vpnaustralia.unlimited.tunnel.proxy.secure.hotspot" target="_blank" class="vpn-round-btn">VPN</a></div><div class="kaj-vpn-text-below">KAJ KORAR VPN</div></section>`;
}
function heroHomeWithAdmin(){
 const telegramName=[tg?.initDataUnsafe?.user?.first_name,tg?.initDataUnsafe?.user?.last_name].filter(Boolean).join(' ')||tg?.initDataUnsafe?.user?.username||userName();
 const cleanName=telegramName.replace(/[^\w\s\u0000-\u007F]/g,'').trim()||telegramName||'User';
 const telegramPhoto=tg?.initDataUnsafe?.user?.photo_url||state.user?.photo_url||'';
 const firstLetter=(cleanName||'U').charAt(0).toUpperCase();
 let avatarContent='';
 if(telegramPhoto){
   avatarContent=`<img src="${esc(telegramPhoto)}" alt="${esc(cleanName)}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="avatar-fallback" style="display:none;width:100%;height:100%;place-items:center;font-size:26px;font-weight:900;background:linear-gradient(135deg,#2ea8ff,#a855f7);color:#fff;border-radius:50%;">${esc(firstLetter)}</div>`;
 } else {
   avatarContent=`<div class="avatar-fallback" style="width:100%;height:100%;display:grid;place-items:center;font-size:26px;font-weight:900;background:linear-gradient(135deg,#2ea8ff,#a855f7);color:#fff;border-radius:50%;">${esc(firstLetter)}</div>`;
 }
 return `<section class="hero home-hero-admin"><div class="home-hero-row"><div class="dev-card"><div class="dev-label" style="font-size:13px;font-weight:800;letter-spacing:1px">DEVELOPER</div><div class="dev-avatar"><img src="${DEV_PIC}" alt="Developer" style="width:100%;height:100%;object-fit:cover;" /></div><div style="font-size:18px;font-weight:900;color:#fff;margin-top:8px;letter-spacing:0.5px;text-transform:uppercase">E NOYON</div></div><div class="user-card"><div class="avatar-wrap"><div class="avatar" style="overflow:hidden;">${avatarContent}</div><div class="verified-badge">✓</div></div><div class="name">${esc(cleanName)}</div><div class="balance-pill">Balance: <span id="balanceText">${money(userBalance())} TK</span></div></div></div></section>`;
}

function ensureAdminPanel(){
  if(document.getElementById('adminPanel')) return;
  const div=document.createElement('div'); div.id='adminPanel'; div.className='overlay hidden'; div.style.display='none'; div.style.position='fixed'; div.style.inset='0'; div.style.zIndex='9999'; div.style.background='rgba(7,20,38,0.92)'; div.style.placeItems='start center'; div.style.padding='12px'; div.style.overflowY='auto';
  div.innerHTML=`
  <div style="background:#0e1f35;border:1px solid #1d3048;border-radius:18px;padding:0;width:min(96%,480px);max-height:95vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.6);margin-top:20px;">
    <div style="display:flex;justify-content:space-between;align-items:center;padding:16px 18px;border-bottom:1px solid #1d3048;position:sticky;top:0;background:#0e1f35;z-index:2;">
      <h3 style="margin:0;color:#fff;font-size:18px;font-weight:900;">⚙️ Admin Panel</h3>
      <button onclick="closeAdminPanel()" style="background:#0a172b;border:1px solid #2a4a6b;color:#fff;width:32px;height:32px;border-radius:50%;cursor:pointer;">✕</button>
    </div>
    <div style="display:flex;gap:6px;padding:10px 12px;overflow-x:auto;border-bottom:1px solid #1d3048;background:#0a172b;">
      <button onclick="switchAdminTab('settings')" id="admTab_settings" class="admTab active" style="padding:8px 12px;border-radius:8px;border:1px solid #1d3048;background:#1ec8e8;color:#fff;font-weight:700;white-space:nowrap;cursor:pointer;">Settings</button>
      <button onclick="switchAdminTab('adnetwork')" id="admTab_adnetwork" class="admTab" style="padding:8px 12px;border-radius:8px;border:1px solid #1d3048;background:#0e1f35;color:#8aa0bb;white-space:nowrap;cursor:pointer;">📢 Ad Network Control</button>
      <button onclick="switchAdminTab('limits')" id="admTab_limits" class="admTab" style="padding:8px 12px;border-radius:8px;border:1px solid #1d3048;background:#0e1f35;color:#8aa0bb;white-space:nowrap;cursor:pointer;">Limits</button>
      <button onclick="switchAdminTab('withdraw')" id="admTab_withdraw" class="admTab" style="padding:8px 12px;border-radius:8px;border:1px solid #1d3048;background:#0e1f35;color:#8aa0bb;white-space:nowrap;cursor:pointer;">Withdraw</button>
      <button onclick="switchAdminTab('users')" id="admTab_users" class="admTab" style="padding:8px 12px;border-radius:8px;border:1px solid #1d3048;background:#0e1f35;color:#8aa0bb;white-space:nowrap;cursor:pointer;">Users</button>
      <button onclick="switchAdminTab('payment')" id="admTab_payment" class="admTab" style="padding:8px 12px;border-radius:8px;border:1px solid #1d3048;background:#0e1f35;color:#8aa0bb;white-space:nowrap;cursor:pointer;">Payment</button>
      <button onclick="switchAdminTab('search')" id="admTab_search" class="admTab" style="padding:8px 12px;border-radius:8px;border:1px solid #1d3048;background:#0e1f35;color:#8aa0bb;white-space:nowrap;cursor:pointer;">Search</button>
      <button onclick="switchAdminTab('datareset')" id="admTab_datareset" class="admTab" style="padding:8px 12px;border-radius:8px;border:1px solid #1d3048;background:#0e1f35;color:#8aa0bb;white-space:nowrap;cursor:pointer;">Data Reset</button>
      <button onclick="switchAdminTab('notices')" id="admTab_notices" class="admTab" style="padding:8px 12px;border-radius:8px;border:1px solid #1d3048;background:#0e1f35;color:#8aa0bb;white-space:nowrap;cursor:pointer;">Notices</button>
      <button onclick="switchAdminTab('bonus')" id="admTab_bonus" class="admTab" style="padding:8px 12px;border-radius:8px;border:1px solid #1d3048;background:#0e1f35;color:#8aa0bb;white-space:nowrap;cursor:pointer;">Bonus Tasks</button>
      <button onclick="switchAdminTab('daily')" id="admTab_daily" class="admTab" style="padding:8px 12px;border-radius:8px;border:1px solid #1d3048;background:#0e1f35;color:#8aa0bb;white-space:nowrap;cursor:pointer;">Daily</button>
      <button onclick="switchAdminTab('tracker')" id="admTab_tracker" class="admTab" style="padding:8px 12px;border-radius:8px;border:1px solid #1d3048;background:#0e1f35;color:#8aa0bb;white-space:nowrap;cursor:pointer;">📊 User Ads Tracker</button>
    </div>
    <div style="padding:16px;overflow-y:auto;flex:1;">
      <div id="admContent_settings" class="admContent">
        <div style="display:flex;flex-direction:column;gap:12px;">
          <label style="color:#8aa0bb;font-size:13px;">Poro Reward (TK)<input id="adminPoroReward" class="input" type="number" placeholder="5" style="margin-top:6px"></label>
          <label style="color:#8aa0bb;font-size:13px;">Lijent Reward (TK)<input id="adminLijentReward" class="input" type="number" placeholder="7" style="margin-top:6px"></label>
          <label style="color:#8aa0bb;font-size:13px;">Min Withdraw (TK)<input id="adminMinWithdraw" class="input" type="number" placeholder="100" style="margin-top:6px"></label>
          <label style="color:#8aa0bb;font-size:13px;">Minimum USDT<input id="adminMinUsdt" class="input" type="number" step="0.01" placeholder="1" style="margin-top:6px"></label>
          <label style="color:#8aa0bb;font-size:13px;">Minimum Recharge (TK)<input id="adminMinRecharge" class="input" type="number" step="0.01" placeholder="20" style="margin-top:6px"></label>
          <label style="color:#8aa0bb;font-size:13px;">Allowed Countries (comma)<input id="adminAllowedCountries" class="input" type="text" placeholder="BD,US,AU" style="margin-top:6px"></label>
          <button id="adminSaveBtn" class="gradient-btn" onclick="saveAdminSettings()" style="margin-top:6px;">Save Settings</button>
        </div>
      </div>
      <div id="admContent_adnetwork" class="admContent" style="display:none;">
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="background:#0a172b;border:1px solid #1d3048;border-radius:12px;padding:14px;">
            <div style="color:#fff;font-weight:900;font-size:15px;">💎 Poro Earn Ad SDK</div>
            <div style="color:#8aa0bb;font-size:12px;margin-top:4px;line-height:1.5;">Code/SDK link এখানে রাখুন। খালি রাখলে Poro Earn বন্ধ থাকবে।</div>
            <textarea id="adminMonetagCode" class="input" rows=4 placeholder="SDK link ba &lt;script ...&gt; code" style="margin-top:8px;resize:vertical;min-height:90px;"></textarea>
          </div>
          <div style="background:#0a172b;border:1px solid #1d3048;border-radius:12px;padding:14px;">
            <div style="color:#fff;font-weight:900;font-size:15px;">⚡ Lijent Earn Ad SDK</div>
            <div style="color:#8aa0bb;font-size:12px;margin-top:4px;line-height:1.5;">SDK code/link এখানে রাখুন। খালি রাখলে Lijent Earn বন্ধ থাকবে।</div>
            <textarea id="adminAdsparkCode" class="input" rows=3 placeholder="SDK link ba &lt;script ...&gt; code" style="margin-top:8px;resize:vertical;min-height:75px;"></textarea>
          </div>
          <div style="background:#101f33;border:1px solid #25415f;border-radius:10px;padding:10px;color:#9fb3cc;font-size:12px;line-height:1.5;">ℹ️ দুইটাই চালু রাখতে দুই box-এই code/link রাখুন। কোনো network বন্ধ করতে শুধু সেই box খালি করে Save করুন।</div>
          <button id="adminAdNetworkSaveBtn" class="gradient-btn" onclick="saveAdminSettings()" style="margin-top:2px;">💾 Save Ad Network Settings</button>
        </div>
      </div>
      <div id="admContent_limits" class="admContent" style="display:none;">
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="background:#0a172b;border:1px solid #1d3048;border-radius:10px;padding:12px;"><div style="color:#fff;font-weight:800;">Poro Earn Limit</div><input id="adminPoroLimit" class="input" type="number" placeholder="70" style="margin-top:8px"></div>
          <div style="background:#0a172b;border:1px solid #1d3048;border-radius:10px;padding:12px;"><div style="color:#fff;font-weight:800;">Lijent Earn Limit</div><input id="adminLijentLimit" class="input" type="number" placeholder="37" style="margin-top:8px"></div>
          <div style="background:#0a172b;border:1px solid #1e4a2e;border-radius:10px;padding:12px;"><div style="color:#4ade80;font-weight:800;">🌅 Next Day - Poro Limit (কালকের)</div><input id="adminNextPoroLimit" class="input" type="number" placeholder="39" style="margin-top:8px"></div>
          <div style="background:#0a172b;border:1px solid #1e4a2e;border-radius:10px;padding:12px;"><div style="color:#4ade80;font-weight:800;">🌅 Next Day - Lijent Limit (কালকের)</div><input id="adminNextLijentLimit" class="input" type="number" placeholder="50" style="margin-top:8px"></div>
          <button id="adminLimitSaveBtn" class="gradient-btn" onclick="saveAdminLimits()" style="margin-top:6px;">Save Limits</button>
          <div style="border-top:1px dashed #1d3048;margin-top:8px;padding-top:12px;">
            <button class="gradient-btn" onclick="resetAllAdsAdmin()" style="background:linear-gradient(90deg,#ff3c3c,#ff8a00);">🔄 Reset All Users Ads</button>
          </div>
        </div>
      </div>
      <div id="admContent_withdraw" class="admContent" style="display:none;">
        <div style="display:flex;gap:8px;margin-bottom:12px;">
          <button onclick="loadWithdraws('pending')" id="wdTab_pending" class="wdTab active" style="flex:1;padding:8px;border-radius:8px;border:1px solid #f1c40f;background:#f1c40f;color:#000;font-weight:700;">Pending</button>
          <button onclick="loadWithdraws('approved')" id="wdTab_approved" class="wdTab" style="flex:1;padding:8px;border-radius:8px;border:1px solid #1d3048;background:#0e1f35;color:#8aa0bb;">Approved</button>
          <button onclick="loadWithdraws('rejected')" id="wdTab_rejected" class="wdTab" style="flex:1;padding:8px;border-radius:8px;border:1px solid #1d3048;background:#0e1f35;color:#8aa0bb;">Rejected</button>
        </div>
        <div id="withdrawList" style="display:flex;flex-direction:column;gap:10px;max-height:400px;overflow-y:auto;">Loading...</div>
      </div>
      <div id="admContent_users" class="admContent" style="display:none;">
        <button class="gradient-btn" onclick="loadUsers()" style="margin-bottom:12px;">🔄 Load Users</button>
        <div id="usersList" style="display:flex;flex-direction:column;gap:8px;max-height:400px;overflow-y:auto;">Click Load</div>
      </div>
      <div id="admContent_notices" class="admContent" style="display:none;">
        <div style="display:flex;flex-direction:column;gap:14px;">
          <label style="color:#8aa0bb;font-size:13px;">Welcome Notice<textarea id="adminWelcomeNotice" class="input" style="min-height:100px;margin-top:6px;resize:vertical;"></textarea></label>
          <label style="color:#8aa0bb;font-size:13px;">Earning Popup Notice<textarea id="adminEarningPopup" class="input" style="min-height:100px;margin-top:6px;resize:vertical;"></textarea></label>
          <label style="color:#8aa0bb;font-size:13px;">Rules Update Notice<textarea id="adminBonusText" class="input" style="min-height:80px;margin-top:6px;resize:vertical;"></textarea></label>
          <button class="gradient-btn" onclick="saveNotices()">Save Notices</button>
          <button class="gradient-btn" onclick="saveNoticeAdSet()">Add Notice Set</button>
          <button class="gradient-btn" onclick="saveNoticeAddSecondSet()">Notice Add Second Set</button>
          <button class="gradient-btn" onclick="saveHomeNotice()">Home Notice Set</button>
        </div>
      </div>
      <div id="admContent_payment" class="admContent" style="display:none;"><div style="display:flex;flex-direction:column;gap:12px;"><h3 style="margin:0;color:#fff;">Payment Methods</h3><div style="font-size:12px;color:#8aa0bb;line-height:1.6;">Code দিন: <b>BK</b>=bKash, <b>NG</b>=Nagad, <b>RK</b>=Rocket, <b>BC</b>=Binance, <b>RC</b>=Mobile Recharge</div><input id="adminPaymentInput" class="input" placeholder="Ex: NG, BK, RK, BC, RC"><button class="gradient-btn" onclick="savePaymentMethods()">Save Payment Methods</button><div id="paymentPreview" style="background:#0a172b;border:1px solid #1d3048;border-radius:8px;padding:10px;color:#fff;font-size:13px;">Preview</div></div></div><div id="admContent_search" class="admContent" style="display:none;"><div style="display:flex;flex-direction:column;gap:12px;"><h3 style="margin:0;color:#fff;">User ID Search</h3><input id="adminSearchUid" class="input" type="number" placeholder="Enter User ID"><button class="gradient-btn" onclick="searchUserById()">Search User</button><div id="adminSearchResult" style="display:flex;flex-direction:column;gap:8px;">No search yet</div></div></div><div id="admContent_datareset" class="admContent" style="display:none;"><div style="display:flex;flex-direction:column;gap:14px;"><h3 style="margin:0;color:#fff;">All User Data Reset</h3><div style="background:#2a1a1a;border:1px solid #ff4d4d;border-radius:8px;padding:12px;color:#ffaaaa;font-size:13px;">Balance, Good, Fake thakbe. Withdraw, history, daily clear hobe. Bot fast hobe.</div><button onclick="resetAllUserData()" style="padding:12px;border-radius:8px;border:0;background:#ff4d4d;color:#fff;font-weight:900;">Reset All User Data</button><div id="dataResetResult" style="color:#8aa0bb;font-size:12px;"></div></div></div><div id="admContent_bonus" class="admContent" style="display:none;">
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="font-weight:900;color:#fff;font-size:18px;">🎁 Bonus Tasks Manager</div>
          <div style="background:#0a172b;border:1px solid #1d3048;border-radius:12px;padding:14px;">
            <div style="color:#fff;font-weight:700;font-size:13px;">Task Title</div>
            <input id="adminBonusTitle" class="input" type="text" placeholder="সম্পূর্ণ ভিডিও দেখুন" style="margin-top:6px;">
            <div style="color:#fff;font-weight:700;font-size:13px;margin-top:10px;">Task URL</div>
            <input id="adminBonusUrl" class="input" type="text" placeholder="https://t.me/SmartWorkCommunity" style="margin-top:6px;">
            <div style="color:#fff;font-weight:700;font-size:13px;margin-top:10px;">Task Type</div>
            <select id="adminBonusType" class="input" style="margin-top:6px;"><option value="subscribe">Subscribe/Join Type</option><option value="video">Video Watch Type</option></select>
            <div style="color:#fff;font-weight:700;font-size:13px;margin-top:10px;">Required Watch Time (Seconds)</div>
            <input id="adminBonusWatchTime" class="input" type="number" min="0.15" max="3600" step="0.01" value="5" placeholder="5" style="margin-top:6px;">
            <div style="color:#fff;font-weight:700;font-size:13px;margin-top:10px;">Reward TK</div>
            <input id="adminBonusReward" class="input" type="number" step="0.1" value="0.5" style="margin-top:6px;">
            <button onclick="addAdminBonusTask()" style="width:100%;padding:12px;background:#00c851;color:#fff;border:0;border-radius:10px;font-weight:900;margin-top:14px;font-size:15px;">➕ Add Task</button>
          </div>
          <div id="adminBonusList" style="margin-top:12px;"></div>
        </div>
      </div>
      <div id="admContent_daily" class="admContent" style="display:none;">
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="background:#0a172b;border:1px solid #1d3048;border-radius:10px;padding:12px;"><div style="color:#fff;font-weight:800;">Daily Active Users</div><button class="gradient-btn" onclick="loadDailyActive()" style="margin-top:10px;">Load Daily Active</button><div id="dailyActiveList" style="margin-top:12px;"></div></div>
        </div>
      </div>
      <div id="admContent_tracker" class="admContent" style="display:none;">
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="background:linear-gradient(135deg,#0a172b,#102744);border:1px solid #1d4662;border-radius:12px;padding:14px;">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><div style="color:#fff;font-weight:900;font-size:16px;">📊 User Ads Tracker</div><span id="trackerOnlineCount" style="color:#00ff9d;font-size:12px;font-weight:800;">0 online</span></div>
            <div style="color:#8aa0bb;font-size:11px;line-height:1.6;margin-top:6px;">Live online users only · Daily reset 6:00 AM Bangladesh time · History starts from tracker launch</div>
            <button class="gradient-btn" onclick="loadAdsTracker()" style="width:100%;margin-top:12px;">🔄 Refresh Live Tracker</button>
            <div id="adsTrackerList" style="margin-top:12px;"><div style="color:#8aa0bb;font-size:12px;">Press refresh to load online users.</div></div>
          </div>
        </div>
      </div>
    </div>
    <div style="padding:12px;border-top:1px solid #1d3048;"><button class="gradient-btn" onclick="closeAdminPanel()" style="background:#1d3048;">Close Panel</button></div>
  </div>`;
  document.body.appendChild(div);
}
async function saveNoticeAdSet(){
  const current = Number(window._noticeAdSet || 5);
  const value = prompt('Add Notice Set (Ads):', String(current));
  if(value===null) return;
  const n = Number(value);
  if(!Number.isInteger(n) || n < 1){ toast('Enter a valid ad number'); return; }
  try{
    const res = await api('admin_save_settings',{settings:JSON.stringify({notice_ad_set:n})});
    if(res && res.ok){ window._noticeAdSet=n; toast('Add Notice Set saved: '+n); }
    else { toast(res?.message||'Failed'); }
  }catch(e){ toast('Failed'); }
}
window.saveNoticeAdSet=saveNoticeAdSet;
async function saveNoticeAddSecondSet(){
  const current = Number(window._noticeAddSecondSet || 30);
  const value = prompt('Notice Add Second Set:', String(current));
  if(value===null) return;
  const n = Number(value);
  if(!Number.isFinite(n) || n < 1){ toast('Enter valid seconds'); return; }
  try{
    const res = await api('admin_save_settings',{settings:JSON.stringify({notice_add_second_set:n})});
    if(res && res.ok){ window._noticeAddSecondSet=n; toast('Notice Add Second Set saved: '+n+' seconds'); }
    else { toast(res?.message||'Failed'); }
  }catch(e){ toast('Failed'); }
}
window.saveNoticeAddSecondSet=saveNoticeAddSecondSet;
async function saveHomeNotice(){
  const currentCountry = String(window._homeNoticeCountry || 'Australia');
  const currentText = String(window._homeNoticeText || '');
  const country = prompt('Home Notice Country:', currentCountry);
  if(country === null) return;
  const text = prompt('Home Notice Text:', currentText);
  if(text === null) return;
  try{
    const res = await api('admin_save_settings',{settings:JSON.stringify({home_notice:'',home_notice_country:country.trim(),home_notice_text:text})});
    if(res && res.ok){ window._homeNotice=''; window._homeNoticeCountry=country.trim()||'Australia'; window._homeNoticeText=text; toast('Home Notice saved'); }
    else toast('Save failed');
  }catch(e){ toast('Save failed'); }
}
window.saveHomeNotice=saveHomeNotice;


function switchAdminTab(tab){
  document.querySelectorAll('.admTab').forEach(b=>{b.style.background='#0e1f35'; b.style.color='#8aa0bb'; b.classList.remove('active');});
  const activeBtn=document.getElementById('admTab_'+tab); if(activeBtn){activeBtn.style.background='#1ec8e8'; activeBtn.style.color='#fff'; activeBtn.classList.add('active');}
  document.querySelectorAll('.admContent').forEach(c=>c.style.display='none');
  const content=document.getElementById('admContent_'+tab); if(content) content.style.display='block';
  if(tab==='withdraw') loadWithdraws('pending');
  if(tab==='daily') loadDailyActive();
  if(tab==='tracker') { loadAdsTracker(); if(window._adsTrackerRefresh) clearInterval(window._adsTrackerRefresh); window._adsTrackerRefresh=setInterval(()=>{ if(document.getElementById('admContent_tracker')?.style.display!=='none') loadAdsTracker(); },15000); }
  else { if(window._adsTrackerRefresh) { clearInterval(window._adsTrackerRefresh); window._adsTrackerRefresh=null; } }
}
window.switchAdminTab=switchAdminTab;
async function saveAdminLimits(){
  const btn=document.getElementById('adminLimitSaveBtn');
  const poroLim=document.getElementById('adminPoroLimit')?.value;
  const lijentLim=document.getElementById('adminLijentLimit')?.value;
  const nextPoroLim=document.getElementById('adminNextPoroLimit')?.value;
  const nextLijentLim=document.getElementById('adminNextLijentLimit')?.value;
  const settings={poro_limit:Number(poroLim||100), lijent_limit:Number(lijentLim||100), next_poro_limit:Number(nextPoroLim||39), next_lijent_limit:Number(nextLijentLim||50)};
  if(btn){btn.textContent='Saving...'; btn.disabled=true;}
  try{
    const res=await api('admin_save_settings',{settings:JSON.stringify(settings)});
    state.poro_limit=settings.poro_limit; 
    state.lijent_limit=settings.lijent_limit;
    state.settings = state.settings || {};
    state.settings.poro_limit = settings.poro_limit;
    state.settings.lijent_limit = settings.lijent_limit;
    if(res && res.ok){
      toast('Limits saved ✅ Today:'+settings.poro_limit+'/'+settings.lijent_limit+' Tomorrow:'+settings.next_poro_limit+'/'+settings.next_lijent_limit);
    } else { 
      toast('Saved ✅');
    }
  }catch(e){toast('Save failed');} finally { if(btn){btn.textContent='Save Limits'; btn.disabled=false;} }
}
window.saveAdminLimits=saveAdminLimits;
async function resetAllAdsAdmin(){
  if(!confirm('Are you sure?')) return;
  try{
    const res=await api('admin_reset_all_ads');
    if(res && res.ok){ 
      try{
        localStorage.setItem('poro_views_v2','0'); localStorage.setItem('lijent_views_v2','0');
        _poroMem=0; _lijentMem=0;
      }catch{}
      if(state.user){ state.user.poro_views=0; state.user.lijent_views=0; }
      const poroEl=document.getElementById('poroCount'); const lijentEl=document.getElementById('lijentCount');
      if(poroEl) poroEl.textContent=`0/${getPoroMax()}`;
      if(lijentEl) lijentEl.textContent=`0/${getLijentMax()}`;
      await load();
      renderTasks();
      toast('Reset Done ✅');
    } else { toast(res?.message||'Failed'); }
  }catch(e){toast('Failed');}
}
window.resetAllAdsAdmin=resetAllAdsAdmin;
async function loadWithdraws(status='pending'){
  document.querySelectorAll('.wdTab').forEach(b=>{b.style.background='#0e1f35'; b.style.color='#8aa0bb'; b.style.borderColor='#1d3048'; b.classList.remove('active');});
  const activeBtn=document.getElementById('wdTab_'+status); if(activeBtn){activeBtn.style.background=status==='pending'?'#f1c40f':(status==='approved'?'#2ecc71':'#e74c3c'); activeBtn.style.color=status==='pending'?'#000':'#fff'; activeBtn.classList.add('active');}
  const listEl=document.getElementById('withdrawList'); if(!listEl) return; listEl.innerHTML='Loading...';
  try{
    const res=await api('admin_get_withdraws',{status:status});
    if(!res.ok){ listEl.innerHTML='Failed'; return; }
    const arr=res.withdraws||[]; if(arr.length===0){ listEl.innerHTML='<div style="color:#7c8da8;text-align:center;padding:20px;">No '+esc(status)+' withdraws</div>'; return; }
    let html='';
    for(const w of arr){
      let dateStr='';
      try{
        const d = new Date(w.created_at);
        const dd = String(d.getDate()).padStart(2,'0');
        const mm = String(d.getMonth()+1).padStart(2,'0');
        const yyyy = d.getFullYear();
        let hh = d.getHours();
        const ampm = hh>=12?'PM':'AM';
        hh = hh%12; if(hh===0) hh=12;
        const min = String(d.getMinutes()).padStart(2,'0');
        const sec = String(d.getSeconds()).padStart(2,'0');
        dateStr = `${dd}/${mm}/${yyyy}, ${hh}:${min}:${sec} ${ampm}`;
      }catch(e){ dateStr = w.created_at||''; }
      const good = w.good_count!==undefined? w.good_count : (w.good!==undefined? w.good : 0);
      const fake = w.fake_count!==undefined? w.fake_count : (w.fake!==undefined? w.fake : 0);
      html+=`<div style="background:#0a172b;border:1px solid #1d3048;border-radius:12px;padding:12px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
          <div style="flex:1;"><div style="font-weight:800;color:#fff;">${esc(w.name||'User')} - ID:${esc(String(w.user_id||''))}</div><div style="font-size:13px;color:#fff;margin-top:4px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;">${paymentMethodLabelClient(w.method)==='Binance' ? `${w.amount} USDT` : `${w.amount} TK`} - ${esc(paymentMethodLabelClient(w.method))} - <span>${esc(w.account||'')}</span>${w.account?`<button onclick="copyWithdrawAccount('${esc(String(w.account).replace(/'/g,"&#39;"))}')" style="padding:3px 7px;border-radius:5px;border:1px solid #1d3048;background:#162b45;color:#4fc3f7;font-size:11px;font-weight:800;cursor:pointer;">Copy</button>`:''}</div><div style="font-size:12px;color:#00e676;margin-top:6px;font-weight:700;">Good:${good} | Fake:${fake} | Bal:${w.balance_after!==undefined?w.balance_after:(w.balance||0)} TK</div><div style="font-size:11px;color:#7a8ca8;margin-top:4px;">${esc(dateStr)}</div></div>
          <div style="display:flex;flex-direction:column;gap:6px;">${(w.status==='pending')?`<button onclick="processWithdraw('${w.id}','approve')" style="padding:6px 10px;border-radius:6px;border:0;background:#2ecc71;color:#fff;font-weight:700;">Approve</button><button onclick="processWithdraw('${w.id}','reject')" style="padding:6px 10px;border-radius:6px;border:0;background:#e74c3c;color:#fff;font-weight:700;">Reject</button>`:`<span style="padding:4px 8px;border-radius:6px;background:${w.status==='approved'?'#2ecc71':'#e74c3c'};color:#fff;font-size:11px;font-weight:700;">${esc(w.status)}</span>`}</div>
        </div>
      </div>`;
    }
    listEl.innerHTML=html;
  }catch(e){listEl.innerHTML='Failed to load';}
}
window.loadWithdraws=loadWithdraws;
async function copyWithdrawAccount(account){ const value=String(account||'').trim(); if(!value){toast('No number');return;} try{ if(navigator.clipboard) await navigator.clipboard.writeText(value); else { const input=document.createElement('input'); input.value=value; document.body.appendChild(input); input.select(); document.execCommand('copy'); input.remove(); } toast('Number Copied'); }catch(e){toast('Copy failed');} }
window.copyWithdrawAccount=copyWithdrawAccount;
async function processWithdraw(id, decision){
  if(!confirm(decision+' this withdraw?')) return;
  try{
    const res=await api('admin_withdraw_process',{id:id,decision:decision});
    if(res && res.ok){ toast('Withdraw '+decision+'d ✅'); loadWithdraws('pending'); } else { toast(res?.message||'Failed'); }
  }catch(e){toast('Failed');}
}
window.processWithdraw=processWithdraw;
async function loadUsers(){
  const listEl=document.getElementById('usersList'); if(!listEl) return; listEl.innerHTML='Loading...';
  try{
    const res=await api('admin_get_users');
    if(!res.ok){ listEl.innerHTML='Failed'; return; }
    const arr=res.users||[]; if(arr.length===0){ listEl.innerHTML='No users'; return; }
    let html='';
    for(const u of arr.slice(0,100)){
      const isAdminId = Number(u.id)===Number(ADMIN_UID);
      const isOnline = u.is_online;
      const dotColor = isOnline ? '#00ff88' : '#ffcc00';
      const dotTitle = isOnline ? 'Bot er vitore - Online (Sobuj)' : 'Bot er baire - Offline (Holud)';
      const country = u.last_country || u.country || 'BD';
      html+=`<div style="background:#0a172b;border:1px solid #1d3048;border-radius:10px;padding:10px;display:flex;justify-content:space-between;align-items:center;gap:8px;">
        <div style="flex:1;min-width:0;display:flex;align-items:center;gap:8px;"><div style="width:10px;height:10px;border-radius:50%;background:${dotColor};box-shadow:0 0 6px ${dotColor};flex-shrink:0;" title="${dotTitle}"></div><div style="flex:1;min-width:0;"><div style="font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(u.name||'User')} - ${u.id} ${isAdminId?'<span style="color:#00e5ff;">(Admin)</span>':''} <span style="background:#0e2a4a;border:1px solid #1d5a8a;color:#00e5ff;padding:2px 6px;border-radius:4px;font-size:10px;margin-left:4px;">${esc(country)}</span></div><div style="font-size:12px;color:#8aa0bb;margin-top:2px;">Bal: ${u.balance||0} TK | Good:${u.good_count||0} Fake:${u.fake_count||0} ${u.banned?'<span style="color:#ff6b6b;">BANNED</span>':''} | Country: ${esc(country)}</div></div></div>
        <div style="display:flex;gap:6px;flex-shrink:0;"><button onclick="editUserBal(${u.id})" style="padding:6px 8px;border-radius:6px;border:1px solid #1d3048;background:#0e1f35;color:#fff;font-size:11px;">Edit Bal</button>${isAdminId?`<span style="padding:6px 12px;border-radius:6px;background:#00c6ff;color:#fff;font-size:11px;font-weight:900;">Admin</span>`:`<button onclick="toggleBanUser(${u.id}, ${u.banned?0:1})" style="padding:6px 8px;border-radius:6px;border:0;background:${u.banned?'#2ecc71':'#ff6b6b'};color:#fff;font-size:11px;">${u.banned?'Unban':'Ban'}</button>`}</div>
      </div>`;
    }
    listEl.innerHTML=html;
  }catch(e){listEl.innerHTML='Failed';}
}
window.loadUsers=loadUsers;
async function editUserBal(uid){
  const newBal=prompt('Enter new balance for user '+uid+':');
  if(newBal===null) return;
  const bal=Number(newBal);
  if(isNaN(bal)){ alert('Invalid'); return; }
  try{
    const res=await api('admin_edit_user',{user_id:uid,balance:bal, t: Date.now()});
    if(res && res.ok){
      toast('Balance updated to '+Number(res.user?.balance ?? bal).toFixed(2)+' TK ✅');
      loadUsers();
      // REALTIME FIX: if edited user is current user, update UI instantly without reload
      const curId = Number(userId || state.user?.id || 0);
      if(Number(uid)===curId){
        if(res.user && res.user.balance!==undefined){
          updateAllHomeUIInstant({balance: res.user.balance, earned: res.user.earned});
        }
        await fetchFreshBalance();
      }
      // Also push event for target user (if admin edits other user, their client will pick via polling in 2s)
      window.dispatchEvent(new CustomEvent('balanceUpdated', {detail: res.user}));
    } else { toast(res?.message||'Failed'); }
  }catch(e){toast('Failed');}
}
window.editUserBal=editUserBal;
async function toggleBanUser(uid, ban){
  try{
    if(ban){
      if(!confirm('Ei user ke ban korben?\nUser ar bot chalate parbe na, dhuklei "Apni ban khaisen" dekhabe.')) return;
    }
    const res=await api('admin_edit_user',{user_id:uid,ban:ban?1:0});
    if(res && res.ok){ 
      toast(ban?'🚫 User ban hoye gese ✅ - Ar bot chalate parbe na':'✅ User unban kora holo'); 
      loadUsers(); 
    } else { toast(res?.message||'Failed'); }
  }catch(e){toast('Failed: '+(e?.message||''));}
}
window.toggleBanUser=toggleBanUser;
async function loadDailyActive(){
  const el=document.getElementById('dailyActiveList'); if(!el) return; el.innerHTML='Loading...';
  try{
    const res=await api('admin_get_daily_active');
    if(!res.ok){ el.innerHTML='Failed'; return; }
    const arr=res.active||[]; if(arr.length===0){ el.innerHTML='<div style="color:#7c8da8;">No active today</div>'; return; }
    let html=`<div style="color:#7c8da8;font-size:12px;margin-bottom:8px;">Date: ${esc(res.date||'')} - Total: ${arr.length} users (Sobuj=Online, Holud=Offline)</div>`;
    for(const a of arr.slice(0,50)){
      const time=a.last?new Date(a.last*1000).toLocaleTimeString('en-BD',{timeZone:'Asia/Dhaka'}):'';
      const isOnline = a.is_online;
      const dotColor = isOnline ? '#00ff88' : '#ffcc00';
      const dotTitle = isOnline ? 'Bot er vitore ache - Sobuj' : 'Bot er baire - Holud';
      html+=`<div style="background:#0e1f35;border:1px solid #1d3048;border-radius:8px;padding:8px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;"><div style="display:flex;align-items:center;gap:8px;"><div style="width:10px;height:10px;border-radius:50%;background:${dotColor};box-shadow:0 0 6px ${dotColor};" title="${dotTitle}"></div><div style="color:#fff;font-size:12px;">${esc(a.name||a.id)} - ID:${a.id}</div></div><div style="color:#8aa0bb;font-size:11px;">${a.views} ads - ${time}</div></div>`;
    }
    el.innerHTML=html;
  }catch(e){el.innerHTML='Failed';}
}
window.loadDailyActive=loadDailyActive;
function trackerCountryFlag(code){ const c=String(code||'').toUpperCase(); return /^[A-Z]{2}$/.test(c)?String.fromCodePoint(...[...c].map(x=>127397+x.charCodeAt(0))):'🌐'; }
function trackerTelegramName(){ const u=tg?.initDataUnsafe?.user||{}; const full=[u.first_name,u.last_name].filter(Boolean).join(' ').trim(); const username=String(u.username||'').trim(); return full || (username ? '@'+username : String(state.user?.name||'User')); }
async function sendTrackerHeartbeat(){
  if(!initData()) return;
  let country={telegram_name:trackerTelegramName()};
  try{ const c=await getUserCountry(); if(c) country={country_code:c.code||'',country_name:c.name||''}; }catch(e){}
  await api('tracker_heartbeat',country);
}
async function trackAdEvent(event){
  if(!initData()) return;
  let country={telegram_name:trackerTelegramName()};
  try{ const c=await getUserCountry(); if(c) country={...country,country_code:c.code||'',country_name:c.name||''}; }catch(e){}
  await api('tracker_event',{event,...country});
}
// Tracker rule requested: count a view when the ad is launched; count a click
// only if the user has stayed away from the bot for 26 seconds.
function startAdTrackerSession(){
  // Count a view on launch. The persistent session lets the tracker survive
  // a Telegram webview/page reload while an ad is open.
  const KEY='__mm_ad_tracker_session_v3';
  try{ sessionStorage.setItem(KEY,JSON.stringify({startedAt:Date.now(),leftBot:false})); }catch(e){}
  ensureAdTrackerReturnListener();
  trackAdEvent('view').catch(()=>{});
  return ()=>{};
}
function ensureAdTrackerReturnListener(){
  if(window.__mmAdTrackerReturnListenerV3) return;
  window.__mmAdTrackerReturnListenerV3=true;
  const KEY='__mm_ad_tracker_session_v3';
  const read=()=>{ try{return JSON.parse(sessionStorage.getItem(KEY)||'null');}catch(e){return null;} };
  const write=(s)=>{ try{sessionStorage.setItem(KEY,JSON.stringify(s));}catch(e){} };
  const markAway=()=>{
    const s=read();
    if(!s || !Number(s.startedAt)) return;
    s.leftBot=true; write(s);
  };
  const checkReturn=()=>{
    if(document.hidden) return;
    const s=read();
    if(!s || !s.leftBot || !Number(s.startedAt)) return;
    // Remove first so focus/pageshow/visibility events cannot count twice.
    try{sessionStorage.removeItem(KEY);}catch(e){}
    if((Date.now()-Number(s.startedAt))/1000>=26) trackAdEvent('click').catch(()=>{});
  };
  document.addEventListener('visibilitychange',()=>{ if(document.hidden) markAway(); else checkReturn(); });
  window.addEventListener('pagehide',markAway);
  window.addEventListener('blur',markAway);
  window.addEventListener('pageshow',()=>setTimeout(checkReturn,0));
  window.addEventListener('focus',()=>setTimeout(checkReturn,0));
  // If this script is evaluated on the bot page after returning from an ad,
  // process the saved session as soon as the page becomes active.
  if(document.hidden) markAway(); else setTimeout(checkReturn,0);
}
ensureAdTrackerReturnListener();
async function copyTrackerName(name){
  const value=String(name||'User').trim();
  try{
    if(navigator.clipboard && window.isSecureContext){ await navigator.clipboard.writeText(value); }
    else { const input=document.createElement('textarea'); input.value=value; input.setAttribute('readonly',''); input.style.position='fixed'; input.style.opacity='0'; document.body.appendChild(input); input.select(); document.execCommand('copy'); input.remove(); }
    if(typeof toast==='function') toast('Username Copied');
  }catch(e){ if(typeof toast==='function') toast('Copy failed'); }
}
window.copyTrackerName=copyTrackerName;
async function loadAdsTracker(){
  const el=document.getElementById('adsTrackerList'); if(!el) return;
  el.innerHTML='<div style="color:#8aa0bb;font-size:12px;padding:10px;">Loading live users...</div>';
  try{
    const res=await api('admin_get_ads_tracker');
    if(!res||!res.ok){el.innerHTML='<div style="color:#ff8585;font-size:12px;">Could not load tracker.</div>';return;}
    const arr=res.users||[]; const count=document.getElementById('trackerOnlineCount'); if(count) count.textContent=arr.length+' online';
    if(!arr.length){el.innerHTML='<div style="padding:18px 8px;text-align:center;color:#8aa0bb;font-size:13px;">🟡 No users online right now</div>';return;}
    el.innerHTML=arr.map(u=>{
      const flag=trackerCountryFlag(u.country_code); const country=esc(u.country_name||u.country_code||'Unknown');
      const history=(u.history||[]).slice(-6).reverse().map(h=>`<span style="display:inline-block;background:#0a172b;border:1px solid #1d3048;border-radius:5px;padding:3px 5px;margin:2px;color:#a9c3db;font-size:10px;">${h.event==='view'?'👁 View':'🖱 Click'} · ${new Date(Number(h.time||0)*1000).toLocaleTimeString('en-BD',{timeZone:'Asia/Dhaka'})}</span>`).join('');
      return `<div style="background:#0e1f35;border:1px solid #1d4662;border-radius:10px;padding:11px;margin-bottom:9px;box-shadow:0 4px 14px rgba(0,0,0,.14);"><div style="display:flex;align-items:center;gap:8px;"><span style="width:9px;height:9px;border-radius:50%;background:#00ff9d;box-shadow:0 0 8px #00ff9d;flex-shrink:0;"></span><div style="min-width:0;flex:1;"><div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;"><div style="font-weight:900;color:#fff;font-size:13px;overflow-wrap:anywhere;">${esc(u.name||'User')}</div><button type="button" data-tracker-name="${esc(u.name||'User')}" onclick="copyTrackerName(this.dataset.trackerName)" title="Copy username" aria-label="Copy username" style="padding:2px 5px;border:1px solid #29445e;border-radius:5px;background:#132b43;color:#7ce7ff;font-size:11px;line-height:1.2;cursor:pointer;flex-shrink:0;">⧉</button></div><div style="color:#8aa0bb;font-size:11px;margin-top:3px;">UID: ${Number(u.id)||0} · ${flag} ${country}</div></div><span style="font-size:10px;font-weight:800;color:#00ff9d;">ONLINE</span></div><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-top:10px;"><div style="background:#071426;border-radius:8px;padding:8px;"><div style="color:#8aa0bb;font-size:10px;">TODAY · AD VIEWS</div><div style="color:#36e5ff;font-weight:900;font-size:18px;">${Number(u.daily_views)||0}</div></div><div style="background:#071426;border-radius:8px;padding:8px;"><div style="color:#8aa0bb;font-size:10px;">TODAY · AD CLICKS</div><div style="color:#c6a7ff;font-weight:900;font-size:18px;">${Number(u.daily_clicks)||0}</div></div><div style="background:#071426;border-radius:8px;padding:8px;"><div style="color:#8aa0bb;font-size:10px;">ALL-TIME VIEWS</div><div style="color:#fff;font-weight:800;font-size:14px;">${Number(u.total_views)||0}</div></div><div style="background:#071426;border-radius:8px;padding:8px;"><div style="color:#8aa0bb;font-size:10px;">ALL-TIME CLICKS</div><div style="color:#fff;font-weight:800;font-size:14px;">${Number(u.total_clicks)||0}</div></div></div><div style="margin-top:9px;color:#8aa0bb;font-size:10px;font-weight:800;">RECENT ACTIVITY HISTORY</div><div style="margin-top:3px;">${history||'<span style="color:#70849c;font-size:11px;">No ad activity recorded yet</span>'}</div></div>`;
    }).join('');
  }catch(e){el.innerHTML='<div style="color:#ff8585;font-size:12px;">Tracker load failed.</div>';}
}
window.loadAdsTracker=loadAdsTracker;
if(!window._adsTrackerHeartbeat){ window._adsTrackerHeartbeat=true; sendTrackerHeartbeat(); setInterval(sendTrackerHeartbeat,25000); document.addEventListener('visibilitychange',()=>{if(!document.hidden) sendTrackerHeartbeat();}); }
function updatePaymentPreview(raw){
  try{
    const el=document.getElementById('paymentPreview'); if(!el) return;
    const codes=String(raw||'').split(',').map(x=>x.trim()).filter(Boolean);
    const names=codes.map(c=>PAYMENT_MAP[c.toLowerCase()]||c);
    el.innerHTML=names.length ? names.map(n=>`<span style="display:inline-block;padding:5px 8px;margin:2px;border-radius:7px;background:#10263f;border:1px solid #244767;color:#fff;font-weight:800;">${esc(n)}</span>`).join('') : 'No methods';
  }catch(e){}
}
async function savePaymentMethods(){
  var input=document.getElementById('adminPaymentInput'); var val=input?input.value.trim():'';
  if(!val){ toast('Enter methods'); return; }
  try{
    var res=await api('admin_save_payment_methods',{methods:val});
    if(res&&res.ok){
      var savedMethods=String(res.payment_methods||val).toLowerCase();
      toast('Payment saved ✅');
      state.settings=state.settings||{}; state.settings.payment_methods=savedMethods;
      try{ localStorage.setItem('payment_methods_cache', savedMethods); }catch(e){}
      if(input) input.value=savedMethods;
      updatePaymentPreview(savedMethods);
      if(currentTab==='profile') renderProfile();
    } else { toast(res?.message||'Failed'); }
  }catch(e){ toast('Failed'); }
}

async function searchUserById(){
  var el=document.getElementById('adminSearchUid');
  var uid=el?el.value.trim():'';
  if(!uid){ toast('Enter UID'); return; }
  var resultEl=document.getElementById('adminSearchResult');
  if(resultEl) resultEl.innerHTML='Searching...';
  try{
    var res=await api('admin_search_user',{user_id:uid});
    if(res&&res.ok&&res.user){
      var u=res.user;
      var dot=u.is_online?'#00ff88':'#ffcc00';
      var country=u.last_country||u.country||'BD';
      var banned=!!u.banned;
      var isAdminId=Number(u.id)===Number(ADMIN_UID);
      var safeName=esc(u.name||'User');
      var safeId=esc(String(u.id));
      var safeCountry=esc(String(country));
      var balance=Number(u.balance||0).toFixed(2);
      var good=Number(u.good_count||0);
      var fake=Number(u.fake_count||0);
      resultEl.innerHTML=
        '<div style="background:#0e1f35;border:1px solid #1d3048;border-radius:10px;padding:10px;display:flex;justify-content:space-between;align-items:center;gap:8px;">'+
          '<div style="display:flex;align-items:flex-start;gap:8px;flex:1;min-width:0;">'+
            '<div style="width:10px;height:10px;border-radius:50%;background:'+dot+';box-shadow:0 0 6px '+dot+';flex-shrink:0;margin-top:5px;"></div>'+
            '<div style="min-width:0;">'+
              '<div style="color:#fff;font-weight:700;line-height:1.35;">'+
                safeName+' - '+safeId+
                (isAdminId?' <span style="background:#0e2a4a;border:1px solid #1d5a8a;color:#00e5ff;padding:2px 6px;border-radius:4px;font-size:10px;">Admin</span>':'')+
                ' <span style="background:#0e2a4a;border:1px solid #1d5a8a;color:#00e5ff;padding:2px 6px;border-radius:4px;font-size:10px;margin-left:4px;">'+safeCountry+'</span>'+
              '</div>'+
              '<div style="font-size:12px;color:#8aa0bb;margin-top:3px;">Bal: '+balance+' TK | Good:'+good+' Fake:'+fake+' | Country: '+safeCountry+'</div>'+
            '</div>'+
          '</div>'+
          '<div style="display:flex;gap:6px;flex-shrink:0;">'+
            '<button type="button" onclick="editUserBal('+Number(u.id)+')" style="padding:7px 9px;border-radius:7px;border:1px solid #1d3048;background:#12243a;color:#fff;font-size:11px;font-weight:700;">Edit Bal</button>'+
            (isAdminId
              ? '<span style="padding:7px 10px;border-radius:7px;background:#00c6ff;color:#fff;font-size:11px;font-weight:900;">Admin</span>'
              : (banned
                ? '<button type="button" onclick="toggleBanUser('+Number(u.id)+',false)" style="padding:7px 9px;border-radius:7px;border:0;background:#2ecc71;color:#fff;font-size:11px;font-weight:700;">Unban</button>'
                : '<button type="button" onclick="toggleBanUser('+Number(u.id)+',true)" style="padding:7px 9px;border-radius:7px;border:0;background:#ff6262;color:#fff;font-size:11px;font-weight:700;">Ban</button>'))+
          '</div>'+
        '</div>';
    }else{
      resultEl.innerHTML='<div style="color:#ff6b6b;">User not found: '+esc(uid)+'</div>';
    }
  }catch(e){
    if(resultEl) resultEl.innerHTML='<div style="color:#ff6b6b;">Failed</div>';
  }
}
async function resetAllUserData(){ if(!confirm('Confirm? Balance thakbe')) return; try{ var res=await api('admin_reset_all_user_data',{}); if(res&&res.ok) toast('Reset done'); }catch(e){ toast('Failed'); } }
async function saveNotices(){
  const welcome=document.getElementById('adminWelcomeNotice')?.value;
  const earning=document.getElementById('adminEarningPopup')?.value;
  const bonus=document.getElementById('adminBonusText')?.value;
  try{
    const res=await api('admin_save_notices',{welcome_notice:welcome,earning_popup:earning,bonus_text:bonus});
    if(res && res.ok){ 
      toast('Notices saved ✅ - 3 sec pore sobar bot e update hobe'); 
      state.welcome_notice=welcome; 
      state.earning_popup=earning; 
      state.bonus_text=bonus;
      state.rules_update_notice=bonus;
      state.settings = state.settings || {};
      state.settings.welcome_notice=welcome;
      state.settings.earning_popup=earning;
      state.settings.bonus_text=bonus;
      state.settings.rules_update_notice=bonus;
      setTimeout(()=>{
        const rulesEl=document.getElementById('rulesContent');
        if(rulesEl && bonus){ rulesEl.textContent=bonus; }
        toast('Rules updated ✅ Agerta bad gelo, notun ta aslo');
      },3000);
    } else { toast(res?.message||'Failed'); }
  }catch(e){toast('Failed');}
}
window.saveNotices=saveNotices;

function renderHome(){ 
  if(!screen)return; 
  const hist = (state.earnings_history && state.earnings_history.length) ? state.earnings_history : getLast7DaysData();
  const total7 = hist.reduce((a,b)=>a+Number(b.earn||0),0);
  const datesHtml = hist.map(d=>`<span>${esc(d.date)}</span>`).join('');
  const isAdmin = isAdminUser();
  screen.innerHTML=`
  ${heroHomeWithAdmin()}
  <div class="wrap">
    <div style="display:flex;justify-content:center;margin-bottom:12px;">
      <a href="https://t.me/noyonfb1020" target="_blank" class="home-btn btn-botlink" style="width:65%;display:grid;place-items:center;padding:12px;border-radius:12px;font-size:14px;font-weight:900;text-decoration:none;">🆔 Admin ID</a>
    </div>
    <div class="top-link-wrap" style="margin-top:0;">
      <a href="https://t.me/SmartWorkCommunity" target="_blank" class="home-btn btn-official">✨ Official Telegram 🎯</a>
    </div>
    <div class="stats">
      <div class="stat"><div class="label">TODAY'S ADS</div><div class="value" id="homeTodayAds" style="font-size:18px;line-height:1.2;font-weight:800;"><span id="homeAdLijent">${getLijentViews()}/${getLijentMax()} AD</span><br><span id="homeAdPoro" style="font-size:15px;opacity:0.85;">${getPoroViews()}/${getPoroMax()} MG</span></div></div>
      <div class="stat"><div class="label">REFERRALS</div><div class="value" id="homeRef">${userReferrals()}</div></div>
      <div class="stat"><div class="label">TOTAL VIEW</div><div class="value" id="homeTotal">${userTotalViews()}</div></div>
      <div class="stat"><div class="label">TOTAL EARNED</div><div class="value" id="homeEarned">${money(userEarned())}</div></div>
    </div>
    <div class="chart-card" style="min-height:185px;">
      <div class="chart-title" style="font-size:14px;font-weight:800;">LAST 7 DAYS EARNINGS - Total: ${money(total7)} TK</div>
      <canvas id="earnChart" style="width:100%; height:130px; margin-top:15px;"></canvas>
      <div class="chart-dates" style="font-size:12px;font-weight:700;">${datesHtml}</div>
      <div style="margin-top:10px; font-size:14px; font-weight:800; color:#12c9e7; text-align:center;">Today Total: ${money(hist[hist.length-1]?.earn||0)} TK</div>
    </div>
    ${isAdmin ? `
      <div style="margin:34px 0 120px;display:flex;justify-content:center;">
        <button onclick="openAdminPanel()" aria-label="Open Admin Panel" style="position:relative;overflow:hidden;width:min(88%,340px);min-height:62px;padding:15px 18px;border:1px solid rgba(36,225,255,.72);border-radius:20px;color:#fff;font-size:16px;font-weight:900;letter-spacing:.5px;background:linear-gradient(120deg,#102d4c,#123c5c 48%,#342b70);box-shadow:0 10px 28px rgba(0,0,0,.25),0 0 22px rgba(0,207,255,.26),inset 0 1px 0 rgba(255,255,255,.2);text-shadow:0 1px 8px rgba(25,220,255,.4);cursor:pointer;">⚙️  ADMIN PANEL <span style="display:block;font-size:11px;color:#72eaff;font-weight:700;margin-top:4px;letter-spacing:.8px;">ADMIN ACCESS ONLY</span></button>
      </div>` : ''}
  </div>`;
  setTimeout(()=>{ drawEarnChart(hist); ensureAdminPanel(); }, 150);
}

function showEarningPopupNotice(){
  try{
    const popupText = String(state.earning_popup || state.settings?.earning_popup || '').trim();
    let middleNotice=document.getElementById('middleEarningNotice');
    const dot=document.getElementById('earningNoticeDot');
    const topNotice=document.getElementById('earningPopupNotice');
    if(topNotice){ topNotice.style.display='none'; }
    if(!popupText){ if(middleNotice) middleNotice.style.display='none'; return; }

    // Show the middle banner only once for each new admin notice text, not on tab changes/rerenders.
    const noticeSeenKey='money_max_seen_earning_popup_v1_'+String(userId || tg?.initDataUnsafe?.user?.id || 'user');
    let shouldShowMiddle=true;
    try{
      const previouslySeen=localStorage.getItem(noticeSeenKey);
      shouldShowMiddle=previouslySeen !== popupText;
      if(shouldShowMiddle) localStorage.setItem(noticeSeenKey,popupText);
    }catch(storageError){
      shouldShowMiddle=window.__moneyMaxEarningNoticeSeenText !== popupText;
      if(shouldShowMiddle) window.__moneyMaxEarningNoticeSeenText=popupText;
    }
    
    // Create middle notice - "Notun Notice Sobai Dekun 🔔" in middle green marked area
    if(!middleNotice){
      const balanceRow = document.querySelector('.earn-balance-vpn-row');
      if(balanceRow){
        middleNotice = document.createElement('div');
        middleNotice.id = 'middleEarningNotice';
        middleNotice.style.cssText = 'margin:12px auto 8px; max-width:92%; background:linear-gradient(135deg,#12253e 0%, #162d4a 100%); border:1px solid rgba(255,59,59,0.25); border-left:3px solid #ff3b3b; border-radius:14px; padding:12px 16px; color:#e8f0ff; font-size:13.5px; font-weight:800; text-align:center; line-height:1.5; box-shadow:0 6px 18px rgba(0,0,0,0.28); display:none; align-items:center; justify-content:center; gap:8px; cursor:pointer;';
        middleNotice.onclick = function(){ openEarningPopupFull(); };
        balanceRow.parentNode.insertBefore(middleNotice, balanceRow.nextSibling);
      }
    }
    
    if(middleNotice){
      if(shouldShowMiddle){
        middleNotice.innerHTML = '<span style="flex:1;">Notun Notice Sobai Dekun <span style="font-size:15px;">🔔</span></span><button type="button" aria-label="Close notice" onclick="event.stopPropagation(); this.parentElement.style.display=\'none\';" style="flex:0 0 26px;width:26px;height:26px;border:1px solid rgba(255,255,255,0.35);border-radius:50%;background:rgba(255,255,255,0.08);color:#fff;font-size:16px;font-weight:900;line-height:1;cursor:pointer;padding:0;">✕</button>';
        middleNotice.style.display='flex';
        middleNotice.style.animation='middleSlide 0.45s cubic-bezier(0.34,1.56,0.64,1)';
        if(middleNotice._hideTimer) clearTimeout(middleNotice._hideTimer);
        middleNotice._hideTimer=setTimeout(()=>{ middleNotice.style.display='none'; }, 10000);
      }else{
        if(middleNotice._hideTimer) clearTimeout(middleNotice._hideTimer);
        middleNotice.style.display='none';
      }
    }
    
    // Top right bell - always visible
    if(dot){
      dot.style.display='grid';
      dot.innerHTML='🔔';
      dot.style.background='linear-gradient(135deg,#ff3b3b,#cc0000)';
      dot.style.position='absolute';
      dot.style.top='8px';
      dot.style.right='12px';
      dot.style.width='26px';
      dot.style.height='26px';
      dot.style.borderRadius='50%';
      dot.style.color='#fff';
      dot.style.fontSize='14px';
      dot.style.border='2px solid #fff';
      dot.style.boxShadow='0 4px 12px rgba(255,59,59,0.45)';
      dot.style.cursor='pointer';
      dot.style.zIndex='10';
      dot.style.placeItems='center';
      dot.onclick = function(){ openEarningPopupFull(); };
    }
  }catch(e){}
}
function openEarningPopupFull(){
  try{
    const popupText = state.earning_popup || state.settings?.earning_popup || '';
    if(!popupText){ toast('No notice'); return; }
    const existing = document.getElementById('noticeFullOverlay');
    if(existing) existing.remove();
    const overlay=document.createElement('div'); 
    overlay.id='noticeFullOverlay'; 
    overlay.style.position='fixed'; 
    overlay.style.inset='0'; 
    overlay.style.background='rgba(0,0,0,0.85)'; 
    overlay.style.zIndex='10000'; 
    overlay.style.display='grid'; 
    overlay.style.placeItems='center'; 
    overlay.style.padding='20px'; 
    overlay.onclick=(e)=>{ if(e.target===overlay){ overlay.remove(); } };
    overlay.innerHTML=`<div style="background:#0e1f35;border:1px solid #1d3048;border-radius:16px;padding:20px;max-width:400px;width:90%;max-height:80vh;overflow-y:auto;" onclick="event.stopPropagation()"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><h3 style="margin:0;color:#fff;">📢 Sotik Kajer Niyom</h3><button onclick="document.getElementById('noticeFullOverlay')?.remove();" style="background:#0a172b;border:1px solid #2a4a6b;color:#fff;width:28px;height:28px;border-radius:50%;cursor:pointer;">✕</button></div><div style="color:#c8d6e5;line-height:1.7;white-space:pre-wrap;font-size:14px;">${esc(popupText)}</div><button class="gradient-btn" style="width:100%;margin-top:16px;padding:12px;" onclick="document.getElementById('noticeFullOverlay')?.remove();">Bujhechi - Close</button></div>`;
    document.body.appendChild(overlay);
  }catch(e){}
}
window.openEarningPopupFull=openEarningPopupFull;

function updateBalanceUI(){
  try{
    const bal = Number(state.balance||state.user?.balance||0).toFixed(2);
    const el1 = document.getElementById('mainBalance');
    const el2 = document.getElementById('headerBalance');
    const el3 = document.getElementById('profileBalance');
    if(el1) el1.textContent=bal+' TK';
    if(el2) el2.textContent=bal+' TK';
    if(el3) el3.textContent=bal+' TK';
    const topBal = document.querySelector('.balance-amount');
    if(topBal) topBal.textContent='Balance: '+bal+' TK';
    const mainBal = document.querySelector('.main-balance');
    if(mainBal) mainBal.textContent=bal+' TK';
    const fakeEl = document.getElementById('fakeCount');
    const goodEl = document.getElementById('goodCount');
    if(fakeEl) fakeEl.textContent=String(state.user?.fake_count||state.fake_count||0);
    if(goodEl) goodEl.textContent=String(state.user?.good_count||state.good_count||0);
  }catch(e){}
}

async function loadBonusTasks(){
  try{
    const res=await api('get_bonus_tasks');
    if(res&&res.ok){
      window.__bonusTasks=Array.isArray(res.tasks)?res.tasks:[];
      renderBonusTasks(window.__bonusTasks);
      return;
    }
    renderBonusTasks([]);
  }catch(e){
    const container=document.getElementById('bonusTasksList');
    if(container) container.innerHTML='<div style="text-align:center;padding:24px;color:#ff6b6b;">Failed to load tasks</div>';
  }
}

function bonusTaskMeta(t){
  const title=String(t?.title||'').toLowerCase();
  if(title.includes('telegram')) return {bg:'#229ED9',icon:'<svg viewBox="0 0 24 24" width="23" height="23" aria-hidden="true"><path fill="#fff" d="M21.6 4.2 18.3 19c-.25 1.04-.85 1.3-1.72.81l-4.72-3.48-2.28 2.2c-.25.25-.46.46-.94.46l.34-4.81 8.76-7.91c.38-.34-.08-.53-.59-.19L6.33 12.84l-4.64-1.45c-1.01-.32-1.03-1.01.21-1.49L20.04 3.1c.86-.32 1.61.19 1.56 1.1Z"/></svg>'};
  if(title.includes('facebook')||title.includes('fb')) return {bg:'#1877F2',icon:'<svg viewBox="0 0 24 24" width="23" height="23" aria-hidden="true"><path fill="#fff" d="M13.7 21v-7h2.35l.35-2.73H13.7V9.53c0-.79.22-1.33 1.35-1.33h1.44V5.76c-.25-.03-1.1-.11-2.1-.11-2.08 0-3.5 1.27-3.5 3.61v2.01H8.54V14h2.35v7h2.81Z"/></svg>'};
  if(title.includes('youtube')||title.includes('yt')) return {bg:'#ff0000',icon:'<svg viewBox="0 0 24 24" width="23" height="23" aria-hidden="true"><path fill="#fff" d="M21.6 7.2a2.8 2.8 0 0 0-1.97-1.98C17.9 4.75 12 4.75 12 4.75s-5.9 0-7.63.47A2.8 2.8 0 0 0 2.4 7.2C1.93 8.93 1.93 12 1.93 12s0 3.07.47 4.8a2.8 2.8 0 0 0 1.97 1.98c1.73.47 7.63.47 7.63.47s5.9 0 7.63-.47a2.8 2.8 0 0 0 1.97-1.98c.47-1.73.47-4.8.47-4.8s0-3.07-.47-4.8ZM10.1 15.2V8.8l5.4 3.2-5.4 3.2Z"/></svg>'};
  return {bg:'#ff0000',icon:'▶'};
}
function bonusTaskStartKey(taskId){return 'mm_bonus_task_start_'+String(taskId);}
function bonusTaskPendingKey(taskId){return 'mm_bonus_task_pending_'+String(taskId);}

async function startBonusTask(taskId){
  const res=await api('start_bonus_task',{task_id:taskId});
  if(!res||!res.ok) throw new Error(res?.message||'Task start failed');
  localStorage.setItem(bonusTaskStartKey(taskId),String(Number(res.started_at||0)*1000));
  return res;
}

async function completeBonusTask(taskId){
  const res=await api('claim_bonus_task',{task_id:taskId});
  if(res&&res.ok){
    localStorage.removeItem(bonusTaskStartKey(taskId));
    localStorage.removeItem(bonusTaskPendingKey(taskId));
    if(state.user) state.user.balance=res.balance;
    state.balance=res.balance;
    updateBalanceUI();
    toast(`+${res.reward} TK Bonus!`);
    await loadBonusTasks();
    return true;
  }
  toast(res?.message||'Failed');
  return false;
}

async function finishSubscribeBonusTask(taskId){
  const btn=document.querySelector(`[data-bonus-task-id="${CSS.escape(String(taskId))}"]`);
  if(!btn) return;
  btn.disabled=true;
  const total=5;
  let left=total;
  btn.textContent=`Wait ${left}s...`;
  const timer=setInterval(async()=>{
    left--;
    if(left>0){btn.textContent=`Wait ${left}s...`;return;}
    clearInterval(timer);
    btn.textContent='Claiming...';
    await completeBonusTask(taskId);
  },1000);
}

async function claimBonusTask(taskId,url,taskType,requiredTime){
  try{
    const type=String(taskType||'subscribe');
    const required=Math.min(3600,Math.max(0.15,Number(requiredTime||5)));
    if(type==='video'){
      await startBonusTask(taskId);
      localStorage.setItem(bonusTaskStartKey(taskId),String(Date.now()));
    }else{
      localStorage.setItem(bonusTaskPendingKey(taskId),String(Date.now()));
    }
    if(url&&url!=='#'){
      if(window.Telegram?.WebApp?.openLink) window.Telegram.WebApp.openLink(url); else window.open(url,'_blank');
    }
    if(type==='video') toast(`Video timer started: ${required}s`); else toast('Task opened. ফিরে এলে 5s countdown শুরু হবে');
  }catch(e){toast('Failed: '+(e?.message||''));}
}

async function resumeBonusTasks(){
  const tasks=window.__bonusTasks||[];
  for(const task of tasks){
    if(task.claimed) continue;
    const id=String(task.id||'');
    if(!id) continue;
    const type=String(task.task_type||'subscribe');
    if(type==='video'){
      const start=Number(localStorage.getItem(bonusTaskStartKey(id))||0);
      if(!start) continue;
      const required=Math.min(3600,Math.max(0.15,Number(task.required_watch_time||5)));
      const elapsed=(Date.now()-start)/1000;
      if(elapsed>=required){
        const btn=document.querySelector(`[data-bonus-task-id="${CSS.escape(id)}"]`);
        if(btn){btn.textContent='Claiming...';btn.disabled=true;}
        await completeBonusTask(id);
      }else{
        localStorage.removeItem(bonusTaskStartKey(id));
        
        // Premium popup instead of simple alert
        (function(){
          const old = document.getElementById('premiumVideoAlert');
          if(old) old.remove();
          const wrap = document.createElement('div');
          wrap.id = 'premiumVideoAlert';
          wrap.style.cssText = 'position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:rgba(0,0,0,0.65);backdrop-filter:blur(8px);animation:fadeIn 0.3s ease;';
          wrap.innerHTML = `
            <div style="width:88%;max-width:340px;background:linear-gradient(145deg,#162d50,#0e1f3a);border:1.6px solid rgba(255,80,80,0.5);border-radius:22px;padding:22px 20px;text-align:center;box-shadow:0 0 0 1px rgba(255,255,255,0.05) inset, 0 18px 45px rgba(0,0,0,0.6), 0 0 30px rgba(255,50,50,0.25);animation:popUp 0.45s cubic-bezier(0.34,1.56,0.64,1);">
              <div style="width:64px;height:64px;margin:0 auto 12px;background:radial-gradient(circle at 30% 30%,#ff7a7a,#e60000);border-radius:50%;display:grid;place-items:center;font-size:30px;box-shadow:0 0 0 4px rgba(255,0,0,0.15), 0 0 22px rgba(255,0,0,0.5);">⚠️</div>
              <div style="font-size:13px;font-weight:800;letter-spacing:0.8px;color:#ff7a7a;margin-bottom:6px;text-transform:uppercase;">BANGLA TAKA BOT</div>
              <div style="font-size:16.5px;font-weight:900;line-height:1.4;color:#fff;margin-bottom:16px;text-shadow:0 0 12px rgba(255,255,255,0.15);">আপনি সম্পূর্ণ ভিডিও দেখেন নি</div>
              <div style="font-size:13px;color:#9bb6d1;margin-bottom:18px;line-height:1.5;">সম্পূর্ণ ভিডিও না দেখলে<br>টাকা যোগ হবে না</div>
              <button onclick="this.closest('#premiumVideoAlert').remove()" style="width:100%;height:48px;border-radius:14px;border:0;background:linear-gradient(135deg,#ff4d4d,#ff8a4d);color:#fff;font-size:15px;font-weight:900;box-shadow:0 6px 16px rgba(255,60,60,0.4);cursor:pointer;">ঠিক আছে, বুঝেছি</button>
            </div>
            <style>@keyframes popUp{0%{opacity:0;transform:scale(0.85) translateY(10px)}100%{opacity:1;transform:scale(1) translateY(0)}}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}</style>
          `;
          document.body.appendChild(wrap);
          if(navigator.vibrate) navigator.vibrate([60,30,60]);
          setTimeout(()=>{ const el=document.getElementById('premiumVideoAlert'); if(el) el.remove(); }, 3500);
        })();

        const btn=document.querySelector(`[data-bonus-task-id="${CSS.escape(id)}"]`);
        if(btn){btn.textContent='Claim';btn.disabled=false;}
      }
    }else if(localStorage.getItem(bonusTaskPendingKey(id))){
      localStorage.removeItem(bonusTaskPendingKey(id));
      await startBonusTask(id);
      finishSubscribeBonusTask(id);
    }
  }
}

function renderBonusTasks(tasks){
  const container=document.getElementById('bonusTasksList');
  if(!container) return;
  if(!Array.isArray(tasks)||tasks.length===0){
    container.innerHTML='<div style="text-align:center;padding:24px;color:#7c8da8;">No bonus tasks yet</div>';
    return;
  }
  container.innerHTML=tasks.map(t=>{
    const id=esc(String(t.id||''));
    const title=esc(t.title||'Bonus Task');
    const reward=money(t.reward||0.5);
    const url=esc(t.url||'#');
    const claimed=!!t.claimed;
    const type=String(t.task_type||'subscribe');
    const required=Math.min(3600,Math.max(0.15,Number(t.required_watch_time||5)));
    const meta=bonusTaskMeta(t);
    const btnText=claimed?'Done':'Claim';
    return `<div style="padding:14px 14px;display:flex;align-items:center;gap:12px;background:#111f34;border:1px solid #1d3048;border-radius:16px;">
      <div style="width:46px;height:46px;background:${meta.bg};border-radius:12px;display:grid;place-items:center;flex-shrink:0;">${meta.icon}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-weight:800;color:#fff;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">♻️ ${title} 🎯</div>
        <div style="font-size:13px;color:#8aa0bb;margin-top:3px;">+${reward} TK</div>
      </div>
      <button data-bonus-task-id="${id}" ${claimed?'disabled':''} onclick="${claimed?'':`claimBonusTask('${id}','${url}','${type}',${required})`}" style="padding:7px 14px;border-radius:8px;border:0;font-weight:800;font-size:13px;cursor:${claimed?'default':'pointer'};min-width:64px;${claimed?'background:#1e2a2a;color:#7c8da8;border:1px solid #2a3a3a;':'background:#ffffff;color:#000;'}">${btnText}</button>
    </div>`;
  }).join('');
  setTimeout(()=>{resumeBonusTasks().catch(()=>{});},50);
}

if(!window.__bonusTaskVisibilityBound){
  window.__bonusTaskVisibilityBound=true;
  document.addEventListener('visibilitychange',()=>{if(!document.hidden) resumeBonusTasks().catch(()=>{});});
}

async function loadAdminBonusTasks(){

  try{
    const res = await api('admin_bonus_get');
    const listEl = document.getElementById('adminBonusList');
    if(!listEl) return;
    if(!res || !res.ok){
      listEl.innerHTML = '<div style="color:#ff6b6b;padding:10px;">Load failed: '+(res?.message||'')+'</div>';
      return;
    }
    if(!res.tasks || res.tasks.length===0){
      listEl.innerHTML = '<div style="color:#7c8da8;padding:10px;">No tasks yet - Add korun</div>';
      return;
    }
    listEl.innerHTML = res.tasks.map(t=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:#0a172b;border:1px solid #1d3048;border-radius:8px;margin-bottom:8px;">
      <div style="flex:1;min-width:0;"><div style="font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(t.title)}</div><div style="font-size:11px;color:#7c8da8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(t.url)} - ${t.reward} TK - ${String(t.task_type||'subscribe')==='video'?'Video Watch Type':'Subscribe/Join Type'} - ${Number(t.required_watch_time||5)}s</div></div>
      <button onclick="deleteAdminBonusTask('${t.id}')" style="padding:6px 10px;background:#ff3b30;color:#fff;border:0;border-radius:6px;margin-left:8px;flex-shrink:0;">Delete</button>
    </div>`).join('');
  }catch(e){
    const listEl = document.getElementById('adminBonusList');
    if(listEl) listEl.innerHTML = '<div style="color:#ff6b6b;padding:10px;">Error: '+esc(e?.message||'')+'</div>';
  }
}

async function addAdminBonusTask(){
  const titleEl=document.getElementById('adminBonusTitle');
  const urlEl=document.getElementById('adminBonusUrl');
  const rewardEl=document.getElementById('adminBonusReward');
  const typeEl=document.getElementById('adminBonusType');
  const watchEl=document.getElementById('adminBonusWatchTime');
  const title=titleEl?.value.trim()||'';
  const url=urlEl?.value.trim()||'';
  const reward=parseFloat(rewardEl?.value||'0.5');
  const task_type=(typeEl?.value==='video'?'video':'subscribe');
  let required_watch_time=parseFloat(watchEl?.value||'5');
  if(!Number.isFinite(required_watch_time) || required_watch_time<0.15) required_watch_time=5;
  if(required_watch_time>3600) required_watch_time=3600;
  if(!url){ toast('URL lagbe'); return; }
  const btn = document.querySelector('button[onclick="addAdminBonusTask()"]');
  if(btn){ btn.textContent='Adding...'; btn.disabled=true; }
  try{
    const res=await api('admin_bonus_add',{title: title||'Bonus Task', url, reward, task_type, required_watch_time});
    if(res && res.ok){
      toast('Task added ✅ - '+ (res.task?.title||''));
      if(titleEl) titleEl.value=''; 
      if(urlEl) urlEl.value=''; 
      if(rewardEl) rewardEl.value='0.5';
      if(typeEl) typeEl.value='subscribe';
      if(watchEl) watchEl.value='5';
      await loadAdminBonusTasks();
      await loadBonusTasks();
    } else { 
      toast('Failed: '+(res?.message||'Server error')); 
    }
  }catch(e){ toast('Failed: '+ (e?.message||'')); } 
  finally { if(btn){ btn.textContent='➕ Add Task'; btn.disabled=false; } }
}

async function deleteAdminBonusTask(id){
  if(!confirm('Delete this task?')) return;
  try{
    const res=await api('admin_bonus_delete',{id});
    if(res && res.ok){ toast('Deleted'); loadAdminBonusTasks(); loadBonusTasks(); }
  }catch(e){}
}
window.deleteAdminBonusTask=deleteAdminBonusTask;
window.addAdminBonusTask=addAdminBonusTask;
window.loadAdminBonusTasks=loadAdminBonusTasks;

function renderTasks(){
 if(!screen)return;
 const poroViews=getPoroViews(); const lijentViews=getLijentViews(); const poroMax=getPoroMax(); const lijentMax=getLijentMax();
 const noticeAddSecondSet=Math.max(1, Number(window._noticeAddSecondSet || state.settings?.notice_add_second_set || 30));
 const noticeEarlySeconds=Math.max(0, noticeAddSecondSet-5);
 screen.innerHTML=`${earnHero()}
 <div class="wrap" style="margin-top:-8px;">
   <div class="vpn-badges-row" style="margin-top:4px;margin-bottom:10px;">
     <div class="vpn-badge left" id="vpnBadgeLeft"><div class="badge-label">VPN / PROXY</div><div class="badge-value" id="vpnLeftValue">Checking...</div></div>
     <div class="vpn-badge right" id="vpnBadgeRight"><div class="badge-label">COUNTRY</div><div class="badge-value" id="vpnRightValue">--</div></div>
   </div>
   <div id="rewardAnimWrap" class="reward-anim-wrap" style="display:none;"><div id="rewardAnimText" class="reward-anim-text"></div></div>
   <div class="card" id="mainBalanceCard" style="padding:12px 16px;margin-top:6px;margin-bottom:12px;min-height:72px;transition:all 0.3s ease"><div id="mainBalanceInner"><div class="section-title" style="margin:0;font-size:12px;">Main Balance</div><div style="font-size:28px;font-weight:900;margin-top:4px;line-height:1.2;" id="mainBalanceBig">${money(userBalance())} TK</div></div></div>
   <div class="section-title" style="margin-top:10px;margin-bottom:8px;">Watch & Earn</div>
   <div class="earn-grid">
    <button id="poroBtn" class="premium-earn-btn poro">
      <div class="shine"></div>
      <div class="earn-icon">▶</div>
      <div class="earn-text"><b>Poro Earn</b><small id="poroCount">${poroViews}/${poroMax}</small><small>MG</small></div>
      <div class="progress-ring"><span id="poroProgress" style="width:${Math.min(100, Math.round((poroViews/poroMax)*100))}%"></span></div>
    </button>
    <button id="lijentBtn" class="premium-earn-btn lijent">
      <div class="shine"></div>
      <div class="earn-icon">⚡</div>
      <div class="earn-text"><b>Lijent Earn</b><small id="lijentCount">${lijentViews}/${lijentMax}</small><small>AD</small></div>
      <div class="progress-ring"><span id="lijentProgress" style="width:${Math.min(100, Math.round((lijentViews/lijentMax)*100))}%"></span></div>
    </button>
   </div>
   <div id="earningPopupNotice" style="display:none;position:fixed;top:12px;left:50%;transform:translateX(-50%);background:linear-gradient(90deg,#ff3c00,#ff8a00);color:#fff;padding:10px 16px;border-radius:20px;font-size:13px;font-weight:800;z-index:999;box-shadow:0 8px 24px rgba(255,60,0,0.4);max-width:90%;text-align:center;cursor:pointer;animation:slideDown 0.5s ease;" onclick="openEarningPopupFull()"></div>
   <div id="earningNoticeDot" style="position:absolute;top:8px;right:12px;width:24px;height:24px;background:#ff3c3c;border-radius:50%;display:none;place-items:center;color:#fff;font-size:12px;font-weight:900;cursor:pointer;animation:pulse 1.5s infinite;z-index:5;border:2px solid #fff;" onclick="openEarningPopupFull()">!</div>
   <div class="section-title" style="margin-top:18px;">Bonus Tasks</div>
   <div id="bonusTasksList" style="display:flex;flex-direction:column;gap:10px;">
     <div style="text-align:center;padding:20px;color:#7c8da8;">Loading tasks...</div>
   </div></div>
  </div>
  <div id="adInstructionOverlay" class="overlay hidden" style="backdrop-filter:blur(12px);background:rgba(0,0,0,0.75);"><div class="overlay-card" style="background:linear-gradient(145deg,#0e203a 0%,#132a4d 50%,#0a192f 100%);border:1.8px solid rgba(0,220,255,0.35);border-radius:28px;box-shadow:0 0 0 1px rgba(255,255,255,0.06) inset, 0 20px 60px rgba(0,0,0,0.6), 0 0 35px rgba(0,220,255,0.18), 0 0 80px rgba(0,100,255,0.12);padding:40px 22px 24px;max-width:92%;width:360px;text-align:center;position:relative;animation:noticePop 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards;"><button type="button" id="overlayCloseBtn" aria-label="Close ad notice" style="position:absolute;top:10px;right:10px;width:32px;height:32px;border-radius:50%;border:1px solid rgba(255,255,255,0.35);background:rgba(0,0,0,0.35);color:#fff;font-size:22px;font-weight:900;line-height:1;cursor:pointer;z-index:2;">✕</button><div class="overlay-icon" style="width:72px;height:72px;margin:0 auto 14px;background:radial-gradient(circle at 30% 30%,#ff5a5a,#d00000);border-radius:50%;display:grid;place-items:center;font-size:36px;box-shadow:0 0 0 4px rgba(255,50,50,0.15), 0 0 25px rgba(255,0,0,0.45);animation:iconPulse 1.8s ease-in-out infinite;">📢</div><h3 style="font-size:20px;font-weight:900;letter-spacing:0.3px;margin:0 0 14px;background:linear-gradient(90deg,#ff7a7a,#ff3b3b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-shadow:0 0 20px rgba(255,60,60,0.3);">গুরুত্বপূর্ণ নোটিশ</h3><div style="background:linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02));border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:14px 16px;margin-bottom:14px;"><p class="overlay-text" style="font-size:14.5px;line-height:1.6;color:#d6e4f0;margin:0;font-weight:600;">⏱️ <b style="color:#7dd3ff;">১৫ সেকেন্ড</b> সম্পূর্ণ বিজ্ঞাপন দেখুন<br>তারপর বিজ্ঞাপনের উপর ক্লিক করে<br>ভিউ সম্পূর্ণ করুন</p></div><div style="background:linear-gradient(135deg,rgba(255,50,50,0.15),rgba(255,0,0,0.08));border:1.4px solid rgba(255,70,70,0.45);border-left:4px solid #ff2a2a;border-radius:14px;padding:12px 14px;margin-bottom:18px;box-shadow:0 0 18px rgba(255,0,0,0.18) inset;"><p id="red-notice-text" style="margin:0;font-size:13.5px;line-height:1.5;color:#ffb3b3;font-weight:700;">বিজ্ঞাপন দেখুন বাটনে ক্লিক করে ${noticeAddSecondSet} সেকেন্ড পরে টাকা অ্যাড হবে ✅<br>⚠️ বিজ্ঞাপনে ক্লিক করার পর <b style="color:#fff;background:rgba(255,0,0,0.25);padding:2px 6px;border-radius:6px;">১৫ সেকেন্ড</b> দেখে অ্যাড এ ক্লিক করে অপেক্ষা করতে হবে ${Math.max(0, noticeAddSecondSet - 15)} সেকেন্ড<br><span style="font-size:12.5px;color:#ff9999;">🔔 সম্পূর্ণ ভিউ না করে ফিরে এলে টাকা যোগ হবে না 🚫</span></p></div><div class="overlay-timer" id="overlayTimer" style="width:78px;height:78px;margin:0 auto 10px;background:radial-gradient(circle at 35% 35%,#0ff0ff,#0a7aff);border-radius:50%;display:grid;place-items:center;font-size:42px;font-weight:900;color:#001a33;box-shadow:0 0 0 4px rgba(0,220,255,0.2), 0 0 30px rgba(0,220,255,0.6), 0 0 60px rgba(0,100,255,0.25);animation:timerPulse 1s ease-in-out infinite;">10</div><p class="overlay-sub" style="font-size:12px;color:#7fb4d4;margin:0 0 16px;letter-spacing:0.5px;">বিজ্ঞাপন ক্লিক থেকে ${noticeAddSecondSet} সেকেন্ড কাউন্টডাউন</p><button class="gradient-btn" id="overlayContinueBtn" style="width:100%;height:54px;border-radius:16px;border:0;background:linear-gradient(135deg,#00d4ff 0%,#0a7aff 50%,#6a5aff 100%);color:#fff;font-size:16px;font-weight:900;letter-spacing:0.3px;box-shadow:0 8px 20px rgba(0,150,255,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset;transition:all 0.25s ease;cursor:pointer;">বুঝেছি, বিজ্ঞাপন দেখবো</button></div></div>
  <style>@keyframes noticePop{0%{opacity:0;transform:translateY(-20px) scale(0.88)}100%{opacity:1;transform:translateY(0) scale(1)}}@keyframes iconPulse{0%,100%{transform:scale(1);box-shadow:0 0 0 4px rgba(255,50,50,0.15),0 0 25px rgba(255,0,0,0.45)}50%{transform:scale(1.06);box-shadow:0 0 0 8px rgba(255,50,50,0.22),0 0 35px rgba(255,0,0,0.7)}}@keyframes timerPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08);box-shadow:0 0 0 6px rgba(0,220,255,0.25),0 0 45px rgba(0,220,255,0.85)}}</style>
  <div id="vpnOverlay" class="overlay hidden"><div class="overlay-card vpn-card"><div class="overlay-icon">🌍</div><h3>লোকেশন সমস্যা!</h3><p class="overlay-text" id="vpnText">আপনার বর্তমান লোকেশনটি অনুমোদিত দেশের সঙ্গে মিলছে না।<br><br>VPN অথবা Proxy চালু করে নিচের অনুমোদিত দেশে সংযোগ করুন।<br><span id="vpnRequiredCountry" class="highlight">বাংলাদেশ (BD)</span><br>তারপর বিজ্ঞাপন দেখতে পারবেন।</p><div class="vpn-info" id="vpnInfo"></div><button class="gradient-btn" id="vpnCloseBtn" style="background:linear-gradient(90deg,#ff4d4d,#ff8a4d);">ঠিক আছে, বুঝেছি</button></div></div>`;
 setupEarnButtons(); 
 setTimeout(()=>{ updateVpnBadges(); 
   const bonusText = state.bonus_text || state.settings?.bonus_text || '';
   if(bonusText){ const el=document.getElementById('bonusTextContent'); if(el) el.textContent=bonusText; }
   showEarningPopupNotice();
   loadBonusTasks();
 },100);
}

async function updateVpnBadges(){
  const leftVal=document.getElementById('vpnLeftValue'); const rightVal=document.getElementById('vpnRightValue');
  if(!leftVal||!rightVal) return;
  const country=await getUserCountry();
  if(!country){ leftVal.textContent='Checking...'; rightVal.textContent='--'; return; }
  leftVal.textContent='Connected OK'; 
  rightVal.textContent=country.code+' - '+country.name.substring(0,10);
}
function renderTop(){ if(!screen)return; const referrers=Array.isArray(state.top_referrers)?state.top_referrers:[]; const earners=Array.isArray(state.top_earners)?state.top_earners:[]; let list=topMode==='referrers'?referrers:earners; 
  // FIXED: Top Earn = total earned (lifetime) - never decrease on withdraw
  const myId = Number(state.user?.id || userId || tg?.initDataUnsafe?.user?.id || 0);
  const myLiveBalance = Number(state.user?.balance ?? 0);
  const myLiveEarned = Number(state.user?.earned ?? state.user?.balance ?? 0);
  const myLiveName = state.user?.name || tg?.initDataUnsafe?.user?.first_name || 'User';
  if(topMode==='earners' && myId){
    list = list.map(e=>{
      const eid = Number(e.id || e.user_id || 0);
      if(eid && eid===myId){
        return {...e, balance: myLiveBalance, earned: myLiveEarned, name: (e.name && e.name!=='User'? e.name : myLiveName) };
      }
      return e;
    });
    // if current user not in list but has earned, add him temporarily for instant view - sorted by EARNED not balance
    const exists = list.some(e=> Number(e.id||e.user_id||0)===myId);
    if(!exists && myLiveEarned>0){
      list = [...list, {id: myId, user_id: myId, name: myLiveName, balance: myLiveBalance, earned: myLiveEarned, photo_url: state.user?.photo_url||''}];
      list.sort((a,b)=> Number(b.earned||0)-Number(a.earned||0));
    }
  }
  screen.innerHTML=`${hero()}<div class="wrap"><div class="tabs"><button class="${topMode==='referrers'?'active':''}" onclick="showTop('referrers')">Top Referrers</button><button class="${topMode==='earners'?'active':''}" onclick="showTop('earners')">Top Earners</button></div>${list.length?list.map((x,i)=>{
      let rawName=x.name||x.first_name||'';
      // FIX: If name is User or empty, force real name from Telegram / state
      if(!rawName || rawName.trim()==='' || rawName.toLowerCase()==='user'){
        rawName = myLiveName || state.user?.name || tg?.initDataUnsafe?.user?.first_name || 'User';
        // If still User but this entry looks like current user (same photo or #2), use hero name
        if(rawName.toLowerCase()==='user' || rawName==='User'){
          try{
            const heroNameEl = document.querySelector('h1, .hero-name, [class*="HASAN"]');
            const heroText = document.body.innerHTML.match(/HASAN MIYA/i);
            if(heroText) rawName = 'HASAN MIYA';
            else rawName = myLiveName || 'User';
          }catch(e){ rawName = myLiveName || 'User'; }
        }
      }
      rawName = rawName || 'User';
      const name=String(rawName).replace(/[^\w\s\u0980-\u09FF]/g,'').trim()||'User'; 
      let value=topMode==='referrers'?Number(x.referrals||x.count||0):money(x.earned||0)+' TK'; const photo=x.photo_url||''; let currentPhoto = tg?.initDataUnsafe?.user?.photo_url || state.user?.photo_url || '';
      let displayPhoto = photo;
      if(!displayPhoto){
        const entryId = x.id || x.user_id || 0;
        const myId = state.user?.id || userId || 0;
        if(entryId && myId && Number(entryId)===Number(myId) && currentPhoto){
          displayPhoto = currentPhoto;
        }
      }
      let avatarHtml=displayPhoto?`<img src="${esc(displayPhoto)}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';"><div style="display:none;width:100%;height:100%;place-items:center;background:linear-gradient(135deg,#1ec8e8,#7b5cff);color:#fff;font-weight:800;border-radius:50%;">${esc(name.charAt(0).toUpperCase())}</div>`:`<div style="width:100%;height:100%;display:grid;place-items:center;background:linear-gradient(135deg,#1ec8e8,#7b5cff);color:#fff;font-weight:800;border-radius:50%;">${esc(name.charAt(0).toUpperCase())}</div>`;
      // ===== PREMIUM TOP 3 STICKERS =====
      let rankMedal = '';
      let rankStyle = 'color:#1ec8e8;font-weight:800;min-width:36px;';
      let leaderBorder = '#1d3048';
      let leaderBg = '#0e1f35';
      if(i===0){
        rankMedal = '🥇';
        rankStyle = 'color:#ffd700;font-weight:900;min-width:48px;font-size:18px;text-shadow:0 0 8px rgba(255,215,0,0.6);';
        leaderBorder = '#ffd700';
        leaderBg = 'linear-gradient(135deg,#1a1500,#2a2000)';
      } else if(i===1){
        rankMedal = '🥈';
        rankStyle = 'color:#c0c0c0;font-weight:900;min-width:48px;font-size:18px;text-shadow:0 0 8px rgba(192,192,192,0.5);';
        leaderBorder = '#c0c0c0';
        leaderBg = 'linear-gradient(135deg,#1a1a1a,#2a2a2a)';
      } else if(i===2){
        rankMedal = '🥉';
        rankStyle = 'color:#cd7f32;font-weight:900;min-width:48px;font-size:18px;text-shadow:0 0 8px rgba(205,127,50,0.5);';
        leaderBorder = '#cd7f32';
        leaderBg = 'linear-gradient(135deg,#1a1200,#2a1a00)';
      }
      return `<div class="leader" style="display:flex;align-items:center;gap:12px;padding:14px 16px;background:${leaderBg};border:1px solid ${leaderBorder};border-radius:14px;margin-bottom:10px;${i<3?'box-shadow:0 0 12px rgba(255,215,0,0.15);':''}"><div class="rank" style="${rankStyle}">${rankMedal} #${i+1}</div><div class="avatar-sm" style="width:42px;height:42px;border-radius:50%;overflow:hidden;flex-shrink:0;border:2px solid ${leaderBorder};${i<3?'box-shadow:0 0 8px rgba(255,215,0,0.3);':''}">${avatarHtml}</div><div class="leader-name" style="flex:1;font-weight:600;">${esc(name)}</div><div class="count" style="color:#1ec8e8;font-weight:700;">${esc(String(value))}</div></div>`;}).join(''):`<div class="empty" style="text-align:center;padding:40px;color:#7c8da8;">No data yet.</div>`}</div>`; }
function showTop(type){topMode=type;renderTop();} window.showTop=showTop;
function withdrawMethodCode(name){
  const low=String(name||'').toLowerCase().trim();
  if(low==='binance'||low==='bc') return 'bc';
  if(low==='mobile recharge'||low==='recharge'||low==='rc') return 'rc';
  if(low==='bkash'||low==='bkas'||low==='bk') return 'bk';
  if(low==='nagad'||low==='ng'||low==='nk') return 'ng';
  if(low==='rocket'||low==='rk') return 'rk';
  return low;
}
function withdrawMinimumLabel(){
  const code=withdrawMethodCode(selectedMethod);
  if(code==='rc') return money(Number(state.min_recharge ?? 20))+' TK';
  if(code==='bc'){ const usdt=Number(state.min_usdt ?? 1); return money(usdt)+' USDT = '+money(usdt*130)+' TK'; }
  return money(state.min_withdraw)+' TK';
}
function updateWithdrawMinimumUI(){
  const el=document.getElementById('withdrawMinimumText');
  if(el) el.textContent='Minimum: '+withdrawMinimumLabel();
  const amountEl=document.getElementById('amount');
  if(amountEl) amountEl.placeholder=(withdrawMethodCode(selectedMethod)==='bc')?'Amount ($)':'Amount (TK)';
}

function renderProfile(){ if(!screen)return; screen.innerHTML=`${hero()}<div class="wrap"><div class="card premium-referral-card"><div class="premium-referral-header"><div class="premium-referral-icon">👥</div><div class="section-title" style="margin:0;">Referral</div><div class="premium-referral-badge">10% BONUS</div></div><div class="reward premium-referral-reward">🎁 কেউ Refer করলে আপনি পাবেন <b style="color:#00e5ff;">10% কমিশন</b> Instant!</div><div class="premium-input-wrap"><input class="input premium-referral-input" value="${esc(state.ref_link||'')}" readonly onclick="this.select()"></div><button class="gradient-btn premium-copy-btn" onclick="copyRef()"><span class="copy-icon">🔗</span> Copy Link</button><div id="copyAnimText" class="copy-anim-text"></div></div><div class="card"><div class="section-title">Withdraw Money</div><div id="withdrawMinimumText" class="reward">Minimum: ${withdrawMinimumLabel()}</div><div style="margin-top:16px"><b>Payment Method</b></div><div class="method-grid" style="margin:10px 0 14px">${parsePaymentMethods().map(function(methodName){ var methodCode=String(methodName).toLowerCase().trim(); return `<button class="method ${selectedMethod===methodCode?'selected':''}" data-method="${esc(methodCode)}" onclick="selectMethod(this.dataset.method)">${esc(methodName)}</button>`; }).join('')}</div><input id="account" class="input" placeholder="Wallet number"><input id="amount" class="input" type="number" placeholder="Amount (TK)"><button class="gradient-btn" onclick="withdraw()">Request Withdraw</button></div><div class="card" id="withdrawHistoryCard"><div class="section-title">Withdraw History</div><div id="withdrawHistoryList" style="margin-top:12px;color:#8aa0bb;font-size:14px">Loading...</div></div><div class="card" style="background:linear-gradient(135deg,#1a2a45 0%,#162236 100%);border:1px solid #2a4a6b"><div class="section-title" style="color:#4fc3f7">📜 Rules</div><div id="rulesContent" style="white-space:pre-wrap;line-height:1.7;font-size:14px;color:#c8d6e5;margin-top:10px">${esc(state.rules_update_notice || state.bonus_text || state.settings?.bonus_text || state.settings?.rules_update_notice || `❤️ আসসালামু আলাইকুম ❤️
✅ 💎 ᴍᴏɴᴇʏ ᴍᴀx ʙᴏᴛ 💰
✅ Vpn দিয়ে কাজ করতে হবে 
✅ United States , New Zealand, canada
✅ 10 টা রেফার করতে হবে একবার করলে ওই হবে  withdrawal দিতে পারবেন 
✅ মিনিমাম 10 সর্বোচ্চ 100 টাকা 
✅ বিকাশ, নগত , রিচার্জ, Payeer USD, TRX
✅ withdrawal চার্জ 
❇️ বিকাশ 100 হলে 5 টাকা কম✅
100 কম হলে  কাটবে না ❌ 
 ❇️ নগত   ৫ টাকা কম পাবেন ✅
❇️ Payeer USD 5% কম পাবেন ✅ 
❇️ TRX 5% কম পাবেন ✅
💸 সবাই সঠিক নিয়মে কাজ করবেন ইনশাল্লাহ সব সময় পেমেন্ট পাবেন✅ vpn ছাড়া কাজ করলে পাবেন না ❌`)}</div></div></div>`; setTimeout(loadWithdrawHistory,200); setTimeout(()=>{ const el=document.getElementById('rulesContent'); if(el){ const latest = state.rules_update_notice || state.bonus_text || state.settings?.bonus_text || ''; if(latest) el.textContent=latest; } },3000); }
async function loadWithdrawHistory(){
  const listEl=document.getElementById('withdrawHistoryList'); if(!listEl) return;
  try{
    const res=await api('withdraw_history');
    if(!res.ok||!res.history){listEl.innerHTML='<div style="color:#8aa0bb">No history yet</div>'; return;}
    const h=res.history; if(h.length===0){listEl.innerHTML='<div style="color:#8aa0bb">No withdraw request yet</div>'; return;}
    let html=''; for(const w of h){const status=(w.status||'pending').toLowerCase(); let badgeColor='#f1c40f'; let badgeText='Pending'; if(status==='approved'){badgeColor='#2ecc71'; badgeText='Approved';} else if(status==='rejected'){badgeColor='#e74c3c'; badgeText='Rejected';} else {badgeColor='#f1c40f'; badgeText='Pending';} let date=''; if(w.created_at){ try{const d=new Date(w.created_at); const dd=String(d.getDate()).padStart(2,'0'); const mm=String(d.getMonth()+1).padStart(2,'0'); const yyyy=d.getFullYear(); date=`${dd}-${mm}-${yyyy}`;}catch(e){date=String(w.created_at||'');} } const amountLabel=String(w.method||'').toLowerCase()==='bc'?`${w.amount} USDT`:`${w.amount} TK`; html+=`<div style="background:#0e1e35;border:1px solid #1e3458;border-radius:12px;padding:12px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center"><div><div style="font-weight:600;color:#fff">${amountLabel} - ${esc(paymentMethodLabelClient(w.method))} - ${esc(w.account||'')}</div><div style="font-size:12px;color:#7a8ca8;margin-top:4px">${esc(date)}</div></div><div style="background:${badgeColor};color:#fff;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:700">${badgeText}</div></div>`;} listEl.innerHTML=html;
  }catch(e){listEl.innerHTML='<div style="color:#e74c3c">Failed to load history</div>';}
}
function render(){ if(currentTab==='home')renderHome(); if(currentTab==='tasks')renderTasks(); if(currentTab==='top')renderTop(); if(currentTab==='profile')renderProfile(); }
let welcomeNoticeShown=false;
function showWelcomeNotice(){
  try{
    if(welcomeNoticeShown) return; welcomeNoticeShown=true;
    const noticeEl=document.getElementById('notice');
    if(noticeEl){
      noticeEl.innerHTML=`
      <div style="background:#1e2f4a;border-radius:28px;padding:24px;width:min(94%,400px);max-height:92vh;overflow-y:auto;position:relative;border:1px solid #2a4a6b;box-shadow:0 20px 60px rgba(0,0,0,0.6);">
        <button onclick="closeWelcomeNotice()" style="position:absolute;right:16px;top:12px;background:#0a172b;border:1px solid #2a4a6b;color:#8aa0bb;font-size:18px;width:32px;height:32px;border-radius:50%;cursor:pointer;">✕</button>
        <h2 style="text-align:center;color:#1ec8e8;margin:0 0 18px 0;font-size:28px;font-weight:900;letter-spacing:1px;">Notice</h2>
        <div style="background:#000;border-radius:16px;padding:16px;margin-bottom:14px;border:1px solid #1a2a3a;">
          ${(() => {
            const country = String(window._homeNoticeCountry || 'Australia').trim() || 'Australia';
            const flags = {'Australia':'🇦🇺','Canada':'🇨🇦','Italy':'🇮🇹','Egypt':'🇪🇬','United States':'🇺🇸','USA':'🇺🇸','Bangladesh':'🇧🇩','India':'🇮🇳','New Zealand':'🇳🇿','UK':'🇬🇧','United Kingdom':'🇬🇧','Germany':'🇩🇪','France':'🇫🇷','Spain':'🇪🇸','Portugal':'🇵🇹','Japan':'🇯🇵','South Korea':'🇰🇷','China':'🇨🇳','Russia':'🇷🇺','Turkey':'🇹🇷','Saudi Arabia':'🇸🇦','UAE':'🇦🇪','United Arab Emirates':'🇦🇪'};
            const flag = flags[country] || '🌐';
            const customText = String(window._homeNoticeText || '').trim() || `📢কাজের নিয়ম VPN +proxy দিয়ে এড দেখতে হবে ✅ 1 টা অ্যাড দেখে ১৫ সেকেন্ড পর ক্লিক করতে হবে 2 সেকেন্ড থাকতে হবে ▶️ VPN কান্ট্রি 👉 ${country} 🎯`;
            return `
          <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:12px;">
            <span style="color:#fff;font-weight:900;font-size:20px;letter-spacing:1px;">TIME ZONE</span>
            <span style="font-size:20px;">${flag}</span>
          </div>
          <div style="background:#0a0a0a;border-radius:10px;padding:10px 14px;">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #1a1a1a;">
              <div><div style="color:#aaa;font-size:12px;">${esc(country)}</div><div style="color:#666;font-size:10px;">VPN COUNTRY</div></div><span style="color:#ff2d2d;font-size:18px;">↗️</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;">
              <div><div style="color:#aaa;font-size:12px;">${esc(country)}</div><div style="color:#666;font-size:10px;">PROXY SERVER</div></div><span style="color:#ff2d2d;font-size:18px;">↗️</span>
            </div>
          </div>
          <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin:14px 0 10px 0;">
            <span style="color:#fff;font-weight:900;font-size:16px;">PROXY 🌐 VPN COUNTRY</span><span>${flag}</span>
          </div>
          <div style="background:#fff;border-radius:10px;padding:8px;">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 10px;border-bottom:1px solid #eee;"><div style="display:flex;align-items:center;gap:8px;"><span style="width:22px;height:22px;background:#012169;border-radius:50%;display:grid;place-items:center;font-size:12px;">${flag}</span><span style="color:#000;font-size:13px;font-weight:600;">${esc(country)} 1</span></div><div style="display:flex;align-items:center;gap:6px;"><span style="color:#666;font-size:11px;">336ms</span><span style="color:#00c853;">▲</span></div></div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 10px;border-bottom:1px solid #eee;"><div style="display:flex;align-items:center;gap:8px;"><span style="width:22px;height:22px;background:#012169;border-radius:50%;display:grid;place-items:center;font-size:12px;">${flag}</span><span style="color:#000;font-size:13px;font-weight:600;">${esc(country)} 2</span></div><div style="display:flex;align-items:center;gap:6px;"><span style="color:#666;font-size:11px;">325ms</span><span style="color:#00c853;">▲</span></div></div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 10px;"><div style="display:flex;align-items:center;gap:8px;"><span style="width:22px;height:22px;background:#012169;border-radius:50%;display:grid;place-items:center;font-size:12px;">${flag}</span><span style="color:#000;font-size:13px;font-weight:600;">${esc(country)} 3</span></div><div style="display:flex;align-items:center;gap:6px;"><span style="color:#666;font-size:11px;">234ms</span><span style="color:#00c853;">▲</span></div></div>
          </div>
          <div style="background:#0f223a;border-radius:12px;padding:14px;margin-top:14px;border:1px solid #1e3a5a;">
            <p style="font-size:14px;line-height:1.7;color:#e0f0ff;margin:0;white-space:pre-wrap;">${esc(customText)}</p>
          </div>`;
          })()}
          <button onclick="triggerAdFromNotice()" style="width:100%;margin-top:12px;padding:12px;background:linear-gradient(90deg,#1ec8e8,#7b5cff);border:0;border-radius:10px;color:#fff;font-weight:800;font-size:14px;cursor:pointer;">অ্যাড দেখতে ক্লিক করুন 🔰 - Click Here</button>
        </div>
        <button onclick="closeWelcomeNotice()" style="width:100%;padding:15px;border-radius:14px;border:0;background:linear-gradient(90deg,#7b5cff,#1ec8e8);color:#fff;font-weight:800;font-size:16px;cursor:pointer;">Close</button>
      </div>`;
      noticeEl.style.display='grid'; noticeEl.style.placeItems='center';
    }
  }catch(e){}
}
function closeWelcomeNotice(){ const noticeEl=document.getElementById('notice'); if(noticeEl) noticeEl.style.display='none'; }
window.closeWelcomeNotice=closeWelcomeNotice;
async function triggerAdFromNotice(){ try{ closeWelcomeNotice(); go('tasks'); }catch(e){ closeWelcomeNotice(); } }
window.triggerAdFromNotice=triggerAdFromNotice;
async function load(){ 
  const loadStart=Date.now();
  if(screen){screen.innerHTML=`<div style="min-height:70vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;"><div style="width:48px;height:48px;border:4px solid #1d3048;border-top-color:#12c9e7;border-radius:50%;animation:spin 1s linear infinite;"></div><b>Loading User...</b><style>@keyframes spin{to{transform:rotate(360deg)}}</style></div>`;} 
  const x=await api('bootstrap'); 
  const elapsed=Date.now()-loadStart; if(elapsed<3000){await new Promise(r=>setTimeout(r,3000-elapsed));}
  if(!x||!x.ok){ 
    if(x && x.banned){
      if(screen){screen.innerHTML=`<div style="min-height:70vh;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;"><div class="card" style="width:100%;max-width:420px;background:#2a1a1a;border-color:#ff4d4d;"><div style="font-size:48px;margin-bottom:12px;">🚫</div><div style="font-size:22px;font-weight:900;margin-bottom:10px;color:#ff6b6b;">Apni ban khaisen!</div><div class="reward" style="color:#ffaaaa;font-size:15px;line-height:1.6;">Apni bot chalate parben na.<br>Admin er sathe contact korun<br><br><a href="https://t.me/noyonfb1020" style="color:#ff6b6b;text-decoration:underline;">@noyonfb1020</a></div></div></div>`;}
      return;
    }
    // === BOT STOPPED CHECK FOR MINI APP ===
    if(x && (x.message === 'BOT_STOPPED' || x.maintenance)){
      const stopMsg = x.stop_message || "🚧 Bot Update চলতেছে!\n\n⏳ একটু Wait করেন!";
      if(screen){
        screen.innerHTML=`<div style="min-height:80vh;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;"><div style="width:100%;max-width:420px;background:linear-gradient(135deg,#0e1f35,#0a172b);border:1px solid #ffaa00;border-radius:20px;padding:28px 20px;box-shadow:0 10px 40px rgba(0,0,0,.5);"><div style="font-size:56px;margin-bottom:16px;">🚧</div><div style="font-size:20px;font-weight:900;margin-bottom:12px;color:#ffcc00;">Bot Update চলতেছে!</div><div style="color:#cbd5e1;font-size:15px;line-height:1.7;white-space:pre-wrap;">${stopMsg}</div><div style="margin-top:20px;color:#7c8da8;font-size:12px;">💎 Bangla Taka Team কাজ করছে...</div></div></div>`;
      }
      return;
    }
    if(screen){screen.innerHTML=`<div style="min-height:70vh;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;"><div class="card" style="width:100%;max-width:420px;"><div style="font-size:20px;font-weight:900;margin-bottom:10px;">App Connection Error</div><div class="reward">${esc(x?.message||'Open from Telegram')}</div><button class="gradient-btn" style="margin-top:16px" onclick="load()">Retry</button></div></div>`;}return;} 
  state={...state,...x}; if(x.user)state.user={...state.user,...x.user}; if(x.allowed_countries&&Array.isArray(x.allowed_countries)) state.allowed_countries=x.allowed_countries; if(x.ad_networks) state.ad_networks=x.ad_networks; window._homeNoticeCountry=String(x.settings?.home_notice_country || window._homeNoticeCountry || 'Australia'); window._homeNoticeText=String(x.settings?.home_notice_text || window._homeNoticeText || ''); render(); if(currentTab==="home"){renderHome(); showWelcomeNotice();} startUserBalanceSync(); getUserCountry().then(()=>{if(currentTab==='tasks') updateVpnBadges();});
}
function go(tab){ currentTab=tab; document.querySelectorAll('.bottom-nav button').forEach(button=>{button.classList.toggle('active',button.dataset.tab===tab);}); if(tab==='home'){render(); showWelcomeNotice();}else{render();} if(tg?.HapticFeedback)tg.HapticFeedback.impactOccurred('light'); }
document.querySelectorAll('.bottom-nav button').forEach(button=>{button.addEventListener('click',()=>go(button.dataset.tab));});
function updateBalanceDisplay(balance){ if(balance===undefined||balance===null||balance==='')return; const numericBalance=Number(balance); if(!Number.isFinite(numericBalance))return; state.balance=numericBalance; if(!state.user)state.user={}; state.user.balance=numericBalance; const balanceText=document.getElementById('balanceText'); if(balanceText)balanceText.textContent=`${money(numericBalance)} TK`; const big=document.getElementById('mainBalanceBig'); if(big){big.textContent=`${money(numericBalance)} TK`; big.classList.add('balance-pop'); setTimeout(()=>big.classList.remove('balance-pop'),600);} const homeEarned=document.getElementById('homeEarned'); if(homeEarned) homeEarned.textContent=`${money(state.user.earned||0)}`; }
function updateHomeEarningsInstant(){
  if(!state.user)return;
  const homeEarned=document.getElementById('homeEarned'); if(homeEarned) homeEarned.textContent=money(state.user.earned||0);
  const homeTotal=document.getElementById('homeTotal'); if(homeTotal) homeTotal.textContent=String(userTotalViews());
  const hist=(state.earnings_history&&state.earnings_history.length)?state.earnings_history:getLast7DaysData();
  const total7=hist.reduce((a,b)=>a+Number(b.earn||0),0);
  const title=document.querySelector('.chart-title'); if(title) title.textContent=`LAST 7 DAYS EARNINGS - Total: ${money(total7)} TK`;
  const chartToday=hist[hist.length-1]?.earn||0;
  const chartTodayEl=document.querySelector('.chart-card > div:last-child'); if(chartTodayEl) chartTodayEl.textContent=`Today Total: ${money(chartToday)} TK`;
  const canvas=document.getElementById('earnChart'); if(canvas) drawEarnChart(hist);
}

// ===== V9 REALTIME FIX - START =====
let _adminBalanceSyncTimer=null;
let _realtimeBalanceUnsub=null;
let _lastKnownBalance=null;

// Central instant UI updater - updates ALL home UI without reload
function updateAllHomeUIInstant(data){
  try{
    const bal = data.balance !== undefined ? Number(data.balance) : Number(state.user?.balance||state.balance||0);
    if(Number.isFinite(bal)){
      state.balance=bal;
      if(state.user) state.user.balance=bal;
      _lastKnownBalance=bal;
      // Top Balance (hero)
      const topBals = document.querySelectorAll('.balance-amount, #headerBalance, #balanceText, #mainBalance, #profileBalance');
      topBals.forEach(el=>{
        if(!el) return;
        const txt = el.textContent||'';
        if(txt.toLowerCase().includes('balance')) el.textContent='Balance: '+bal.toFixed(2)+' TK';
        else el.textContent=bal.toFixed(2)+' TK';
      });
      const mainBig = document.getElementById('mainBalanceBig');
      if(mainBig){ mainBig.textContent=money(bal)+' TK'; mainBig.classList.add('balance-pop'); setTimeout(()=>mainBig.classList.remove('balance-pop'),700); }
      updateBalanceDisplay(bal);
    }
    if(data.earned!==undefined && state.user){ state.user.earned=Number(data.earned||0); }
    if(data.daily_total_views!==undefined && state.user){ state.user.daily_total_views=Number(data.daily_total_views||0); state.user.total_views=state.user.daily_total_views; }
    if(data.good_count!==undefined && state.user) state.user.good_count=Number(data.good_count||0);
    if(data.fake_count!==undefined && state.user) state.user.fake_count=Number(data.fake_count||0);
    if(Array.isArray(data.daily_earnings)) state.earnings_history=data.daily_earnings;
    
    // Update HOME cards instantly
    const homeEarned=document.getElementById('homeEarned');
    if(homeEarned) homeEarned.textContent=money(state.user?.earned||0);
    const homeTotal=document.getElementById('homeTotal');
    if(homeTotal) homeTotal.textContent=String(state.user?.daily_total_views ?? state.user?.total_views ?? userTotalViews());
    const homeRef=document.getElementById('homeRef');
    if(homeRef && state.user) homeRef.textContent=String(state.user?.referrals||0);
    const homeL=document.getElementById('homeAdLijent');
    if(homeL) homeL.textContent=`${getLijentViews()}/${getLijentMax()} AD`;
    const homeP=document.getElementById('homeAdPoro');
    if(homeP) homeP.textContent=`${getPoroViews()}/${getPoroMax()} MG`;
    
    // Update LAST 7 DAYS
    try{
      const hist=(state.earnings_history && state.earnings_history.length)?state.earnings_history:getLast7DaysData();
      const total7=hist.reduce((a,b)=>a+Number(b.earn||0),0);
      const title=document.querySelector('.chart-title');
      if(title) title.textContent=`LAST 7 DAYS EARNINGS - Total: ${money(total7)} TK`;
      const todayEl=document.querySelector('.chart-card > div:last-child');
      // find today total element more safely
      const allDivs=document.querySelectorAll('.chart-card div');
      allDivs.forEach(d=>{ if(d.textContent.includes('Today Total')) d.textContent=`Today Total: ${money(hist[hist.length-1]?.earn||0)} TK`; });
      const canvas=document.getElementById('earnChart');
      if(canvas) drawEarnChart(hist);
    }catch(e){}
  }catch(e){}
}

// Fetch fresh balance directly from server (no cache) - use after ad / admin edit
async function fetchFreshBalance(){
  if(!userId) return null;
  try{
    const res=await api('get_user_balance',{t:Date.now()}); // cache bust
    if(res && res.ok){
      updateAllHomeUIInstant(res);
      return res;
    }
  }catch(e){}
  return null;
}

// Firebase Realtime Listener + 2s polling fallback
async function syncUserBalanceNow(){
  if(!userId) return;
  // allow background but slower
  if(document.visibilityState==='hidden') return;
  try{
    const res=await api('get_user_balance',{t:Date.now()});
    if(res && res.ok){
      const nextBal=Number(res.balance);
      if(Number.isFinite(nextBal) && nextBal!==_lastKnownBalance){
        updateAllHomeUIInstant(res);
        if(navigator.vibrate && nextBal!==_lastKnownBalance && _lastKnownBalance!==null) navigator.vibrate(30);
      } else if(res.earned!==undefined || res.daily_total_views!==undefined){
        updateAllHomeUIInstant(res);
      }
    }
  }catch(e){}
}

function initFirebaseRealtimeListener(){
  try{
    // If Firebase JS SDK loaded via firebase_helper, listen to users/{uid}/balance
    if(typeof window.firebaseDB !== 'undefined' && window.firebaseDB){
      const uidStr = String(userId||state.user?.id||'');
      if(!uidStr) return;
      const dbRef = window.firebaseDB.ref ? window.firebaseDB.ref('users/'+uidStr+'/balance') : null;
      if(dbRef && dbRef.on){
        if(_realtimeBalanceUnsub){ try{dbRef.off();}catch(e){} }
        dbRef.on('value', snap=>{
          try{
            const val=snap.val();
            if(val!==null && Number(val)!==_lastKnownBalance){
              fetchFreshBalance();
            }
          }catch(e){}
        });
        console.log('Firebase onValue listener attached for '+uidStr);
      }
    }
    // Also listen to custom event from server push if any
    window.addEventListener('balanceUpdated', (e)=>{ if(e.detail) updateAllHomeUIInstant(e.detail); else fetchFreshBalance(); });
  }catch(e){ console.log('Firebase realtime init failed', e); }
}

function startUserBalanceSync(){
  if(_adminBalanceSyncTimer) clearInterval(_adminBalanceSyncTimer);
  _lastKnownBalance=Number(state.user?.balance ?? state.balance ?? 0);
  // Poll every 2000ms as required (2 sec)
  _adminBalanceSyncTimer=setInterval(syncUserBalanceNow,2000);
  initFirebaseRealtimeListener();
  // Immediate first fetch
  setTimeout(()=>fetchFreshBalance(),800);
}

// Expose globally for admin edit & ad complete
window.fetchFreshBalance=fetchFreshBalance;
window.updateAllHomeUIInstant=updateAllHomeUIInstant;
// ===== V9 REALTIME FIX - END =====

async function rewardFromBot(task){ if(!userId)throw new Error('Telegram user ID is unavailable'); if(!['poro','lijent'].includes(task))throw new Error('Invalid task'); const reward=await api('reward',{task:task}); if(!reward||!reward.ok)throw new Error(reward?.message||'Reward failed'); const newBalance=reward?.balance??reward?.new_balance??reward?.user?.balance??reward?.data?.balance; if(newBalance!==undefined)updateBalanceDisplay(newBalance); if(reward.good_count!==undefined){ if(state.user) state.user.good_count=reward.good_count; if(reward.balance!==undefined) { updateAllHomeUIInstant(reward); } const local=getLocalCounts(); saveLocalCounts(local.fake,reward.good_count); updateBoxUI(); } if(state.user){ if(reward.daily_total_views!==undefined) state.user.daily_total_views=Number(reward.daily_total_views||0); else state.user.daily_total_views=Number(state.user.daily_total_views ?? state.user.total_views ?? 0)+1; state.user.total_views=state.user.daily_total_views; } if(reward.daily_earnings) state.earnings_history=reward.daily_earnings; if(reward.earned!==undefined && state.user) state.user.earned=Number(reward.earned||0); updateHomeEarningsInstant(); return reward; }
function showAdInstructionOverlay(){ return new Promise((resolve,reject)=>{ const overlay=document.getElementById('adInstructionOverlay'); const timerEl=document.getElementById('overlayTimer'); const btn=document.getElementById('overlayContinueBtn'); const closeBtn=document.getElementById('overlayCloseBtn'); if(!overlay){resolve();return;} overlay.classList.remove('hidden'); overlay.style.display='grid'; let count=10; timerEl.textContent=count; let finished=false; const closeOverlay=(reason)=>{ if(finished)return; finished=true; clearInterval(interval); overlay.style.display='none'; overlay.classList.add('hidden'); reject(reason); }; const interval=setInterval(()=>{count--; if(count>=0) timerEl.textContent=count; if(count<=0) closeOverlay('timeout');},1000); btn.onclick=()=>{if(finished)return; finished=true; clearInterval(interval); overlay.style.display='none'; overlay.classList.add('hidden'); resolve();}; if(closeBtn) closeBtn.onclick=()=>closeOverlay('closed'); }); }
function countryMeta(code){
 const names={AU:'Australia',US:'United States',GB:'United Kingdom',CA:'Canada',DE:'Germany',FR:'France',IT:'Italy',ES:'Spain',NL:'Netherlands',SG:'Singapore',MY:'Malaysia',IN:'India',BD:'Bangladesh',AE:'United Arab Emirates',SA:'Saudi Arabia',JP:'Japan',KR:'South Korea',BR:'Brazil',TR:'Türkiye',ID:'Indonesia',TH:'Thailand',PK:'Pakistan',PH:'Philippines',VN:'Vietnam',NZ:'New Zealand',ZA:'South Africa',CH:'Switzerland',SE:'Sweden',NO:'Norway',FI:'Finland',PL:'Poland',IE:'Ireland',MX:'Mexico'};
 const c=String(code||'').toUpperCase(); const flag=/^[A-Z]{2}$/.test(c)?String.fromCodePoint(...[...c].map(x=>127397+x.charCodeAt(0))):'🌐';
 return {code:c,name:names[c]||c,flag};
}
function timezoneMatchesCountry(code){
 const tz=Intl.DateTimeFormat().resolvedOptions().timeZone||''; const c=String(code||'').toUpperCase();
 const prefixes={AU:['Australia/'],US:['America/','Pacific/Honolulu','America/Anchorage'],GB:['Europe/London'],CA:['America/','Canada/'],DE:['Europe/Berlin'],FR:['Europe/Paris'],IT:['Europe/Rome'],ES:['Europe/Madrid','Atlantic/Canary'],NL:['Europe/Amsterdam'],SG:['Asia/Singapore'],MY:['Asia/Kuala_Lumpur'],IN:['Asia/Kolkata'],BD:['Asia/Dhaka'],AE:['Asia/Dubai'],SA:['Asia/Riyadh'],JP:['Asia/Tokyo'],KR:['Asia/Seoul'],BR:['America/'],TR:['Europe/Istanbul'],ID:['Asia/Jakarta','Asia/Makassar','Asia/Jayapura'],TH:['Asia/Bangkok'],PK:['Asia/Karachi'],PH:['Asia/Manila'],VN:['Asia/Ho_Chi_Minh'],NZ:['Pacific/Auckland','Pacific/Chatham'],ZA:['Africa/Johannesburg'],CH:['Europe/Zurich'],SE:['Europe/Stockholm'],NO:['Europe/Oslo'],FI:['Europe/Helsinki'],PL:['Europe/Warsaw'],IE:['Europe/Dublin'],MX:['America/']};
 const p=prefixes[c]; return {timezone:tz, matches:!p||p.some(x=>x.endsWith('/')?tz.startsWith(x):tz===x)};
}
function showTimezoneWarning(userCountry, requiredCode){
 return new Promise(resolve=>{
  const overlay=document.getElementById('vpnOverlay'); if(!overlay){resolve();return;}
  const icon=overlay.querySelector('.overlay-icon'), title=overlay.querySelector('h3'), msg=document.getElementById('vpnText'), info=document.getElementById('vpnInfo'), btn=document.getElementById('vpnCloseBtn');
  const meta=countryMeta(requiredCode); const tz=Intl.DateTimeFormat().resolvedOptions().timeZone||'অজানা';
  if(icon) icon.textContent='🕒'; if(title) title.textContent='টাইম জোন ঠিক করুন';
  if(msg) msg.innerHTML=`<div style="font-weight:850;color:#fff;font-size:16px;line-height:1.8">🛡️ VPN / Proxy সংযোগ শনাক্ত হয়েছে</div><div style="margin-top:7px;padding:10px 12px;border-radius:12px;background:rgba(45,120,255,.16);border:1px solid rgba(80,150,255,.4);color:#e5f2ff">🌏 নির্বাচিত দেশ: <b>${meta.flag} ${meta.name} (${meta.code})</b></div><div style="margin-top:12px;padding:12px;border-radius:14px;background:rgba(255,170,60,.12);border:1px solid rgba(255,170,60,.35);color:#ffe0ad">⚠️ আপনার ফোনের টাইম জোন নির্বাচিত দেশের সঙ্গে মিলছে না।<br>⚙️ ফোনের Settings → Date &amp; Time → Time Zone-এ গিয়ে <b>${meta.name}</b> অনুযায়ী সেটিংস যাচাই করুন।</div><div style="margin-top:10px;color:#d6e4f0;font-size:13px">🕒 বর্তমান টাইম জোন: <b>${esc(tz)}</b></div>`;
  if(info){const ip=String(userCountry?.ip||'').trim(); const ipName=String(userCountry?.name||'Unknown'); const ipCode=String(userCountry?.code||'--'); info.innerHTML=`<div style="text-align:left;line-height:1.8"><div>📍 IP লোকেশন: <b>${esc(ipName)} (${esc(ipCode)})</b></div><div style="margin-top:5px;overflow-wrap:anywhere">🌐 IP ঠিকানা: <b>${esc(ip||'IP শনাক্ত করা যায়নি — নেটওয়ার্কে আবার চেষ্টা করুন')}</b></div></div>`;}
  if(btn){btn.textContent='ঠিক আছে, বুঝেছি';btn.onclick=()=>{overlay.style.display='none';overlay.classList.add('hidden');resolve();};}
  overlay.classList.remove('hidden'); overlay.style.display='grid'; playWarningSound();
 });
}

function showVpnWarning(userCountry){ return new Promise((resolve)=>{ const overlay=document.getElementById('vpnOverlay'); const info=document.getElementById('vpnInfo'); const btn=document.getElementById('vpnCloseBtn'); if(!overlay){resolve();return;} const allowedList=Array.isArray(state.allowed_countries)?state.allowed_countries:['BD']; const code=String(allowedList[0]||'BD').toUpperCase(); const meta=countryMeta(code); const icon=overlay.querySelector('.overlay-icon'), title=overlay.querySelector('h3'), msg=document.getElementById('vpnText'); if(icon)icon.textContent='🌐'; if(title)title.textContent='লোকেশন মিলছে না'; if(msg)msg.innerHTML=`<div style="font-weight:850;color:#fff;font-size:16px;line-height:1.8">📍 আপনার IP লোকেশন অনুমোদিত দেশের সঙ্গে মিলছে না।</div><div style="margin-top:10px;padding:11px 12px;border-radius:12px;background:rgba(45,120,255,.16);border:1px solid rgba(80,150,255,.4);color:#e5f2ff">🎯 নির্বাচিত দেশ: <b>${meta.flag} ${meta.name} (${meta.code})</b></div><div style="margin-top:12px;color:#d6e4f0;line-height:1.8">🛡️ আপনার নেটওয়ার্কের লোকেশন যাচাই করুন। IP লোকেশন ও ফোনের টাইম জোন আলাদা তথ্য।</div>`; const ip=String(userCountry?.ip||'').trim(); const actualName=String(userCountry?.name||'Unknown'); const actualCode=String(userCountry?.code||'--'); info.innerHTML=`<div style="text-align:left;line-height:1.8"><div>📍 বর্তমান IP লোকেশন: <b>${esc(actualName)} (${esc(actualCode)})</b></div><div style="margin-top:5px;overflow-wrap:anywhere">🌐 IP ঠিকানা: <b>${esc(ip||'IP শনাক্ত করা যায়নি — নেটওয়ার্কে আবার চেষ্টা করুন')}</b></div><div style="margin-top:5px">🕒 ফোনের টাইম জোন: <b>${esc(Intl.DateTimeFormat().resolvedOptions().timeZone||'Unknown')}</b></div></div>`; overlay.classList.remove('hidden'); overlay.style.display='grid'; btn.textContent='ঠিক আছে, বুঝেছি'; btn.onclick=()=>{overlay.style.display='none'; overlay.classList.add('hidden'); resolve();}; playWarningSound(); }); }
async function logFakeAttempt(){ try{incLocalFake(); await api('fake_log',{});}catch(e){} }
function setMainBalanceState(type,data={}){
  const card=document.getElementById('mainBalanceCard'); const inner=document.getElementById('mainBalanceInner'); if(!card||!inner) return;
  if(type==='premium-loading'){ inner.innerHTML=`<div class="premium-loading"><span class="premium-spinner"></span><div><div class="status-eyebrow">BANGLA TAKA • SECURE</div><div class="status-main">${data.msg||'Opening Ad...'}</div></div></div>`; card.classList.add('status-wide'); }
  else if(type==='added-long'){ const amt=data.amount??0; inner.innerHTML=`<div class="balance-added-long"><div class="reward-amount">+${amt} TK</div><div class="reward-title">Balance Added! ✅</div><div class="reward-sub">আপনার ব্যালেন্স অ্যাড হয়েছে ${amt} পয়সা</div></div>`; card.classList.add('status-wide'); }
  else if(type==='error-long'){ inner.innerHTML=`<div class="error-long"><div class="error-symbol">⚠️</div><div class="error-title">${data.msg||'আপনি ভুল কাজ করেছেন, নিয়ম মেনে কাজ করুন'}</div></div>`; card.classList.add('status-wide'); }
  else if(type==='ready'){ inner.innerHTML=`<div class="bot-ready"><span>🟢</span><b>Bot Ready</b><small>পরবর্তী অ্যাডের জন্য প্রস্তুত</small></div>`; card.classList.add('status-wide'); }
  else if(type==='normal'){ card.classList.remove('status-wide'); const bal=data.balance!==undefined?data.balance:userBalance(); inner.innerHTML=`<div class="section-title" style="margin:0;font-size:12px;">Main Balance</div><div style="font-size:28px;font-weight:900;margin-top:4px;line-height:1.2;" id="mainBalanceBig">${money(bal)} TK</div>`; card.style.background=''; card.style.border=''; }
  else if(type==='loading'){ inner.innerHTML=`<div style="display:flex;align-items:center;gap:12px;padding:4px 0"><div style="width:38px;height:38px;border-radius:50%;background:#0a1629;display:grid;place-items:center;border:1px solid #1e3458;flex-shrink:0"><span style="font-size:18px">👁️</span></div><div><div style="font-size:10px;letter-spacing:1px;color:#7a8ca8;font-weight:700">MANUAL</div><div style="font-size:15px;font-weight:800;color:#fff;margin-top:1px">Loading Ad...</div></div></div>`; }
  else if(type==='served'){ inner.innerHTML=`<div style="display:flex;align-items:center;gap:12px;padding:4px 0"><div style="width:38px;height:38px;border-radius:50%;background:#2ecc71;display:grid;place-items:center;flex-shrink:0;"><span style="font-size:18px;color:#fff">✓</span></div><div style="flex:1"><div style="font-size:10px;letter-spacing:1px;color:#7a8ca8;font-weight:700">COMPLETED</div><div style="font-size:15px;font-weight:800;color:#fff;margin-top:1px">Ad Served</div></div></div>`; }
  else if(type==='added'){ const amt=data.amount||7; inner.innerHTML=`<div style="text-align:center;padding:2px 0"><div style="font-size:26px;font-weight:900;color:#2ecc71;line-height:1">+${amt} TK</div><div style="font-size:12px;font-weight:700;color:#2ecc71;margin-top:3px">Balance Added!</div><div style="font-size:11px;color:#8ec8a8;margin-top:4px;font-weight:600">Apnar Balance Add Hoyese ✅</div></div>`; }
  else if(type==='warning'){ inner.innerHTML=`<div style="text-align:center;padding:2px 0"><div style="font-size:13px;font-weight:800;color:#f1c40f">⚠️ ${data.msg||'Sabdhan!'}</div><div style="font-size:11px;color:#c8b86e;margin-top:3px">${data.sub||''}</div></div>`; }
}
function getAdNetworkConfig(task){
  const key = task==='poro' ? 'monetag' : 'adspark';
  const cfg = state.ad_networks?.[key] || {};
  return {key, enabled: cfg.enabled === true && String(cfg.code||'').trim() !== '', code: String(cfg.code||'').trim()};
}
function extractScriptInfo(code, task){
  const srcMatch = code.match(/(?:src|data-src)\s*=\s*["']([^"']+)["']/i);
  let src = srcMatch ? srcMatch[1] : '';
  if(!src && /^https?:\/\//i.test(code.trim())) src = code.trim();
  if(!src && /^\/\//.test(code.trim())) src = 'https:' + code.trim();
  if(src && src.startsWith('//')) src = 'https:' + src;
  const sdkMatch = code.match(/data-sdk\s*=\s*["']([^"']+)["']/i);
  const zoneMatch = code.match(/data-zone\s*=\s*["']([^"']+)["']/i);
  const sdk = sdkMatch ? sdkMatch[1].trim() : 'showAdspark';
  const zone = zoneMatch ? zoneMatch[1].trim() : '';
  return {src, sdk, zone};
}
function loadScriptOnce(src, info=null){
  return new Promise((resolve,reject)=>{
    if(!src){resolve();return;}
    const existing = Array.from(document.scripts).find(x=>x.src===src || x.getAttribute('src')===src || x.getAttribute('data-ad-network-src')===src);
    if(existing && existing.dataset.loaded==='1'){resolve();return;}
    const sc=document.createElement('script'); sc.src=src; sc.async=true; sc.setAttribute('data-ad-network-src',src);
    if(info && info.zone){ sc.setAttribute('data-zone', info.zone); }
    if(info && info.sdk){ sc.setAttribute('data-sdk', info.sdk); }
    sc.onload=()=>{sc.dataset.loaded='1';resolve();}; sc.onerror=()=>reject(new Error('Ad network SDK load failed'));
    document.head.appendChild(sc);
  });
}
async function ensureAdNetworkLoaded(task){
  const cfg=getAdNetworkConfig(task);
  if(!cfg.enabled) throw new Error('Ad SDK akhono add kora hoy nai');
  const info=extractScriptInfo(cfg.code,task);
  const pick=()=>{
    if(typeof window.showAdspark==='function') return window.showAdspark;
    if(typeof window.showAdsparkPopup==='function') return window.showAdsparkPopup;
    if(info.sdk && typeof window[info.sdk]==='function') return window[info.sdk];
    return null;
  };
  let fn=pick(); if(fn) return fn;
  if(info.src) await loadScriptOnce(info.src, info);
  for(let i=0;i<10 && !fn;i++){ await new Promise(r=>setTimeout(r,300)); fn=pick(); }
  if(fn) return fn;
  throw new Error('Ad SDK load hoy nai');
}




// Removed unused legacy URL-based click detector.



// ===== FINAL V10 - FIXED _noticeTimer not defined + NO WARNING AT START =====
let _noticeTimer = null;
let _noticeElapsed = 0;
let _noticeRequired = 30;
let _noticeActive = false;
let _adClickedInside = false;
let _outsideCount = 0;

function isUserInsideAdModal(){
  try{ return !!document.getElementById('adInAppModal'); }catch(e){ return false; }
}
function clearAllTimersAndBadges(){
  try{ if(_noticeTimer) clearInterval(_noticeTimer); }catch(e){}
  _noticeTimer=null;
  _noticeActive=false;
  _noticeElapsed=0;
  _outsideCount=0;
  _adClickedInside=false;
  try{ window._adClickedInside=false; window._lastAdUrl=''; window._adNavCount=0; }catch(e){}
}

// ===== DIRECT AD MODE =====
// Opens the ad directly. Notice-Ad anti-cheat is LIVE-WINDOW ONLY:
// - Before the last 10 seconds: the system records nothing about bot/ad location.
// - From 10 seconds remaining down to 5 seconds remaining: only the CURRENT
//   location matters. If the bot is visible/focused during this window, the
//   notice-ad reward is cancelled and warning is shown.
// - Below 5 seconds remaining: checking stops completely.
async function watchDirectAd(task, requiredSeconds, adFn, strictNotice=false){
  const required = Math.max(1, Number(requiredSeconds || 15));
  const startedAt = Date.now();
  let returnedEarly = false;
  let settled = false;

  // NOTICE ANTI-CHEAT:
  // Only the CURRENT state inside the 10..5 seconds-remaining window matters.
  // Before 10s remaining: ignore everything completely.
  // Below 5s remaining: stop checking completely.
  // No state/history from outside the 10..5 window is carried into it.
  const noticeCheckRemainingHigh = 10;
  const noticeCheckRemainingLow = 5;

  const getRemaining = ()=>{
    const elapsed = (Date.now() - startedAt) / 1000;
    return Math.max(0, required - elapsed);
  };

  const inNoticeCheckWindow = ()=>{
    if(!strictNotice) return false;
    const remaining = getRemaining();
    return remaining <= noticeCheckRemainingHigh && remaining >= noticeCheckRemainingLow;
  };

  const userIsOnBotNow = ()=>{
    try{
      // In the Direct-Ad flow, an active external ad normally takes focus
      // away from the Telegram WebApp / hides the page. When the user comes
      // back to the bot, the page becomes visible and focused again.
      return !document.hidden && document.hasFocus();
    }catch(e){
      return false;
    }
  };

  // Do not remember anything before 10 seconds.
  // From 10 down to 5, continuously inspect ONLY the current state.
  // This means:
  // - Bot at 12/11/10+ -> ignored.
  // - Back to Ad before 10 -> no later warning from that old event.
  // - Bot at 9..5 -> warning.
  // - At <5 -> checking stops.
  const checkCurrentNoticeState = ()=>{
    if(settled || !strictNotice || returnedEarly) return;
    if(!inNoticeCheckWindow()) return;

    if(userIsOnBotNow()){
      returnedEarly = true;
    }
  };

  const onVisibility = ()=>{ checkCurrentNoticeState(); };
  const onFocus = ()=>{ checkCurrentNoticeState(); };
  const onBlur = ()=>{ /* Ad-side state; never punish on blur */ };

  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('focus', onFocus);
  window.addEventListener('blur', onBlur);

  try{
    window._adClickedInside = true;
    window._adNavCount = (window._adNavCount||0) + 1;

    await adFn();

    while(true){
      const elapsed = (Date.now() - startedAt) / 1000;
      const remaining = Math.max(0, Math.ceil(required - elapsed));

      if(typeof setMainBalanceState==='function'){
        setMainBalanceState('premium-loading',{msg:`${remaining}s`});
      }

      // IMPORTANT: only the LIVE state during 10..5 is checked.
      // Nothing that happened before 10 is remembered.
      checkCurrentNoticeState();

      if(returnedEarly){
        throw new Error('⚠️ বিজ্ঞাপন চলাকালীন ১০ থেকে ৫ সেকেন্ডের মধ্যে Bot-এ পাওয়া গেছে। এইবার টাকা যোগ হবে না।');
      }

      if(remaining > 0){
        await new Promise(r=>setTimeout(r,200));
      }else{
        break;
      }
    }

    return {opened:true, requiredSeconds:required};
  }finally{
    settled = true;
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('focus', onFocus);
    window.removeEventListener('blur', onBlur);
  }
}

async function watchAd(btnId){
  if(typeof isAdLocked!=='undefined' && isAdLocked) return;
  const allAdButtons=[document.getElementById('poroBtn'),document.getElementById('lijentBtn')].filter(Boolean);
  const btn=document.getElementById(btnId);
  if(!btn) return;

  const originalHTML=btn.innerHTML;
  let isNoticeMode=false;
  let isSuccess=false;
  let task = btnId==='poroBtn' ? 'poro' : (btnId==='lijentBtn' ? 'lijent' : '');
  if(!task) return;

  try{
    const netCfg = typeof getAdNetworkConfig==='function' ? getAdNetworkConfig(task) : {enabled:true};
    if(!netCfg.enabled){
      toast('Ad SDK akhono add kora hoy nai');
      return;
    }

    // Keep existing per-network daily limits unchanged.
    const poroMax=typeof getPoroMax==='function'?getPoroMax():40;
    const lijentMax=typeof getLijentMax==='function'?getLijentMax():30;
    if(task==='poro'){
      const cur=typeof getPoroViews==='function'?getPoroViews():0;
      if(cur>=poroMax){
        if(typeof showPremiumLimitCenter==='function') showPremiumLimitCenter(cur,poroMax);
        btn.innerHTML=originalHTML;
        return;
      }
    }
    if(task==='lijent'){
      const cur=typeof getLijentViews==='function'?getLijentViews():0;
      if(cur>=lijentMax){
        if(typeof showPremiumLimitCenter==='function') showPremiumLimitCenter(cur,lijentMax);
        btn.innerHTML=originalHTML;
        return;
      }
    }

    // Keep the existing country/VPN gate, but do not flash the bot UI before opening the ad.
    const userCountry=typeof getUserCountry==='function'?await getUserCountry():null;
    const allowedList=typeof state!=='undefined' && state.allowed_countries?state.allowed_countries:['BD'];
    if(userCountry&&allowedList.length>0&&!allowedList.includes(userCountry.code)){
      if(typeof showVpnWarning==='function') await showVpnWarning(userCountry);
      btn.innerHTML=originalHTML;
      if(typeof setMainBalanceState==='function') setMainBalanceState('normal');
      return;
    }
    const requiredCountryCode=String(allowedList[0]||'BD').toUpperCase(); const timezoneStatus=timezoneMatchesCountry(requiredCountryCode); if(userCountry&&allowedList.includes(userCountry.code)&&!timezoneStatus.matches){ await showTimezoneWarning(userCountry,requiredCountryCode); btn.innerHTML=originalHTML; if(typeof setMainBalanceState==='function') setMainBalanceState('normal'); return; }

    const goodCount=typeof state!=='undefined' && state.user ? Number(state.user?.good_count ?? 0) : 0;
    const nextAdNumber=goodCount+1;
    const noticeAdSet=Math.max(1,Number(window._noticeAdSet || (typeof state!=='undefined' && state.settings?.notice_ad_set) || 5));
    isNoticeMode=(nextAdNumber%noticeAdSet===0);

    if(isNoticeMode){
      try{
        if(typeof showAdInstructionOverlay==='function') await showAdInstructionOverlay();
      }catch(e){
        if(e==='timeout' || e==='closed'){
          btn.innerHTML=originalHTML;
          if(typeof setMainBalanceState==='function') setMainBalanceState('normal');
          return;
        }
      }
    }

    if(typeof isAdLocked!=='undefined') isAdLocked=true;
    allAdButtons.forEach(b=>{b.disabled=true;b.style.pointerEvents='none';b.style.opacity='0.6';});
    btn.disabled=true;

    // Open the ad immediately after the existing checks; no iframe/modal and no bot-page flash.
    const sessionStart=typeof api==='function' ? await api('ad_start',{task:task}) : {ok:true,required_seconds:isNoticeMode?30:15};
    if(!sessionStart || !sessionStart.ok) throw new Error(sessionStart?.message||'Ad session start failed');

    const requiredSeconds=Number(sessionStart.required_seconds || (isNoticeMode ? Number(window._noticeAddSecondSet || (typeof state!=='undefined' && state.settings?.notice_add_second_set) || 30) : 15));
    // ===== 1 SEC PREMIUM LOADING BEFORE AD =====
    if(typeof setMainBalanceState==='function') setMainBalanceState('premium-loading',{msg:'Opening...'});
    btn.innerHTML=`<div class="earn-text"><b>...</b><small>Opening Ad...</small></div>`;
    await new Promise(r=>setTimeout(r,1000));
    if(typeof setMainBalanceState==='function') setMainBalanceState('premium-loading',{msg:`${requiredSeconds}s`});
    btn.innerHTML=`<div class="earn-text"><b>${requiredSeconds}s</b><small>Ad dekhen...</small></div>`;

    // Tracker: count the accepted ad launch and actual SDK invocation without changing reward flow.
      const adFn=async()=>{
      if(task==='poro'){
        const poroFn=typeof ensureAdNetworkLoaded==='function' ? await ensureAdNetworkLoaded('poro') : null;
        if(!poroFn) throw new Error('Ad open failed');
        if(poroFn===window.showAdsparkPopup) await poroFn({ymid:window.tg?.initDataUnsafe?.user?.id});
        else await poroFn();
      }else{
        const lijentFn=typeof ensureAdNetworkLoaded==='function' ? await ensureAdNetworkLoaded('lijent') : null;
        if(!lijentFn) throw new Error('Ad open failed');
        if(lijentFn===window.showAdsparkPopup) await lijentFn({ymid:window.tg?.initDataUnsafe?.user?.id});
        else await lijentFn();
      }
    };

    // Start tracker timing at the ad-button launch point. Early return = view only;
    // remaining away for 20 seconds = view + click in the tracker.
    startAdTrackerSession();
    await watchDirectAd(task,requiredSeconds,adFn,isNoticeMode);

    btn.innerHTML='<div class="earn-text"><b>Verifying...</b></div>';
    if(typeof setMainBalanceState==='function') setMainBalanceState('premium-loading',{msg:'Verifying...'});
    await new Promise(r=>setTimeout(r,600));

    if(typeof setMainBalanceState==='function') setMainBalanceState('premium-loading',{msg:'Sending...'});
    btn.innerHTML='<div class="earn-text"><b>Sending...</b></div>';
    await new Promise(r=>setTimeout(r,500));

    const rewardPromise=typeof rewardFromBot==='function' ? rewardFromBot(task) : Promise.resolve({reward:0});
    const timeoutPromise=new Promise((_,reject)=>setTimeout(()=>reject(new Error('Server slow')),10000));
    const reward=await Promise.race([rewardPromise,timeoutPromise]);

    let newCount=(task==='poro' ? (typeof getPoroViews==='function'?getPoroViews():0) : (typeof getLijentViews==='function'?getLijentViews():0))+1;
    const maxCount=task==='poro' ? (typeof getPoroMax==='function'?getPoroMax():40) : (typeof getLijentMax==='function'?getLijentMax():30);
    if(newCount>maxCount) newCount=maxCount;

    if(task==='poro'){
      if(typeof state!=='undefined') state.user.poro_views=newCount;
      if(typeof savePoroViews==='function') savePoroViews(newCount);
    }else{
      if(typeof state!=='undefined') state.user.lijent_views=newCount;
      if(typeof saveLijentViews==='function') saveLijentViews(newCount);
    }

    if(typeof state!=='undefined') state.user.today_views=(Number(state.user?.today_views||0))+1;
    const poroEl=document.getElementById('poroCount');
    const lijentEl=document.getElementById('lijentCount');
    if(poroEl && typeof getPoroViews==='function') poroEl.textContent=`${getPoroViews()}/${getPoroMax()}`;
    if(lijentEl && typeof getLijentViews==='function') lijentEl.textContent=`${getLijentViews()}/${getLijentMax()}`;
    try{ if(typeof refreshHomeData==='function') refreshHomeData(); }catch(e){}

    if(typeof setMainBalanceState==='function') setMainBalanceState('added-long',{amount:reward.reward??0});
    if(typeof saveDailyEarn==='function') saveDailyEarn(reward.reward||0);
    if(typeof playTok==='function') playTok();

    const updatedBalance=reward?.balance??reward?.new_balance;
    const rewardAmount=Number(reward?.reward||0);
    if(updatedBalance!==undefined && typeof state!=='undefined'){
      state.balance=updatedBalance;
      state.user.balance=updatedBalance;
      // INSTANT TOP EARN UPDATE - no reload needed
      state.user.earned = Number(state.user?.earned||0) + rewardAmount;
      if(Number(state.user.earned) < Number(state.user.balance)) state.user.earned = Number(state.user.balance);
      if(typeof updateBalanceDisplay==='function') updateBalanceDisplay(updatedBalance);
      // If currently on Top tab, re-render instantly
      try{ if(typeof renderTop==='function' && currentTab==='top') renderTop(); }catch(e){}
    } else if(rewardAmount>0 && typeof state!=='undefined'){
      // Fallback if balance not returned, still increase earned
      state.user.balance = Number(state.user?.balance||0) + rewardAmount;
      state.user.earned = Number(state.user?.earned||0) + rewardAmount;
      state.balance = state.user.balance;
      try{ if(typeof updateBalanceDisplay==='function') updateBalanceDisplay(state.balance); }catch(e){}
      try{ if(typeof renderTop==='function' && currentTab==='top') renderTop(); }catch(e){}
    }

    isSuccess=true;
    if(typeof updateBoxUI==='function') updateBoxUI();
    btn.innerHTML=originalHTML;

  }catch(e){
    if(typeof setMainBalanceState==='function') setMainBalanceState('error-long',{msg:e?.message||'আপনি ভুল কাজ করেছেন, নিয়ম মেনে কাজ করুন'});
    if(typeof playWarningSound==='function') playWarningSound();
    if(window.tg?.HapticFeedback) window.tg.HapticFeedback.notificationOccurred('error');
    if(typeof toast==='function') toast(e?.message||'Ad failed');
    if(typeof logFakeAttempt==='function' && !isSuccess) await logFakeAttempt().catch(()=>{});
    btn.innerHTML=originalHTML;
  }finally{
    setTimeout(()=>{
      if(typeof setMainBalanceState==='function') setMainBalanceState(isSuccess?'ready':'normal');
      if(typeof isAdLocked!=='undefined') isAdLocked=false;
      allAdButtons.forEach(b=>{b.disabled=false;b.style.pointerEvents='';b.style.opacity='';});
    },isSuccess?1200:2500);
  }
}

function selectMethod(m){
  if(!m) return;
  var low=String(m).toLowerCase().trim();
  if(low==='bikash'||low==='bkas') low='bkash';
  if(low==='ng') low='nagad';
  selectedMethod=low;
  try{ localStorage.setItem('selected_payment_method', low); }catch(e){}
  var all=document.querySelectorAll('.method');
  for(var i=0;i<all.length;i++){
    var b=all[i];
    var txt=b.textContent.trim().toLowerCase();
    if(txt==='bikash'||txt==='bkas') txt='bkash';
    if(txt==='ng') txt='nagad';
    var isSel=(txt===low)||(txt.indexOf(low)!==-1)||(low.indexOf(txt)!==-1);
    if(isSel){ b.classList.add('selected'); } else { b.classList.remove('selected'); }
  }
  updateWithdrawMinimumUI();
  if(tg&&tg.HapticFeedback) tg.HapticFeedback.selectionChanged();
}
window.selectMethod=selectMethod;
async function withdraw(){ 
  if(!selectedMethod){ try{ var sel=document.querySelector('.method.selected'); if(sel){ selectedMethod=sel.textContent.trim().toLowerCase(); } }catch(e){} try{ var cached=localStorage.getItem('selected_payment_method'); if(cached && !selectedMethod) selectedMethod=cached; }catch(e){} }
  const accountEl=document.getElementById('account'); const amountEl=document.getElementById('amount'); 
  const account=accountEl?.value.trim()||''; const amount=amountEl?.value.trim()||''; 
  if(!selectedMethod){toast('Select a payment method');return;} 
  if(!account){
    const code = withdrawMethodCode(selectedMethod);
    if(code==='bc'){ showPremiumErrorRedCustom('account', '⚠️ অনুগ্রহ করে আপনার সঠিক Binance ID টি লিখুন', 'binance'); }
    else { showPremiumErrorRedCustom('account', '⚠️ অনুগ্রহ করে আপনার সঠিক নাম্বারটি লিখুন', 'default'); }
    return;
  }
  if(!amount){ showPremiumErrorRedCustom('amount', '⚠️ অনুগ্রহ করে টাকার পরিমাণ লিখুন', 'default'); return; }
  const amountNumber=Number(amount);
  const methodCodeForMin = withdrawMethodCode(selectedMethod);
  const minForMethod = methodCodeForMin==='rc' ? Number(state.min_recharge ?? 20) : (methodCodeForMin==='bc' ? Number(state.min_usdt ?? 0.5) : Number(state.min_withdraw||100));
  const minText = methodCodeForMin==='bc' ? money(minForMethod)+' USDT' : money(minForMethod)+' TK';
  if(amountNumber<minForMethod){
    const mCode = methodCodeForMin;
    const methodLabel = mCode==='bc' ? 'Binance' : (mCode==='rc' ? 'Mobile Recharge' : paymentMethodLabelClient(selectedMethod));
    let msg = '';
    if(mCode==='bc'){
      msg = `⚠️ ${methodLabel} এ সর্বনিম্ন উইথড্র ${money(minForMethod)} USDT (${money(minForMethod*130)} টাকা)`;
    } else {
      msg = `⚠️ ${methodLabel} এ সর্বনিম্ন উইথড্র ${money(minForMethod)} টাকা`;
    }
    showPremiumOrangeMin('amount', msg);
    return;
  }
  const methodCode=withdrawMethodCode(selectedMethod);
  const requiredBalance = methodCode==='bc' ? amountNumber*130 : amountNumber;
  if(requiredBalance>userBalance()){toast(methodCode==='bc'?'Insufficient balance. 1 USDT = 130 TK.':'Insufficient balance');return;} 
  const x=await api('withdraw',{method:selectedMethod,account:account,amount:amount}); 
  if(x?.ok){
    const card=document.getElementById('mainBalanceCard'); if(card){setMainBalanceState('withdraw',{amount:amount}); setTimeout(()=>{setMainBalanceState('normal');},3000);}
    showPremiumSuccessCenter(); selectedMethod='';
    try{ saveLocalCounts(0,0); }catch(e){}
    if(state.user){ state.user.good_count=0; state.user.fake_count=0; }
    updateBoxUI();
    await load(); setTimeout(()=>{if(typeof loadWithdrawHistory==='function') loadWithdrawHistory();},600);
  } else {
    const msg = (x?.message||'').toLowerCase();
    if(msg.includes('already have a pending') || msg.includes('pending withdrawal')){
      showPendingWithdrawalCenter();
    } else {
      toast(x?.message||'Failed');
    }
  }
}
window.withdraw=withdraw;
async function copyRef(){ 
  const link=state.ref_link||''; 
  if(!link){toast('No link');return;} 
  try{ 
    if(navigator.clipboard) navigator.clipboard.writeText(link); 
    else{ const input=document.createElement('input'); input.value=link; document.body.appendChild(input); input.select(); document.execCommand('copy'); input.remove(); } 
    toast('✅ Link Copied!');
    // Premium animation text
    const animEl = document.getElementById('copyAnimText');
    if(animEl){
      animEl.innerHTML = '<span class="anim-emoji">🎉</span> Referral Link Copied! Share Now & Earn 10%';
      animEl.classList.remove('show');
      void animEl.offsetWidth;
      animEl.classList.add('show');
      setTimeout(()=>{ animEl.classList.remove('show'); }, 3500);
    }
    // Button animation
    const btn = document.querySelector('.premium-copy-btn');
    if(btn){
      const orig = btn.innerHTML;
      btn.innerHTML = '✅ Copied! Premium';
      btn.classList.add('copied');
      setTimeout(()=>{ btn.innerHTML = orig; btn.classList.remove('copied'); }, 2500);
    }
    if(navigator.vibrate) navigator.vibrate([50,30,50]);
  }catch{toast('Copy failed');} 
}
window.copyRef=copyRef;

async function toggleBotMaintenance(){
  const sBotStopped = document.getElementById('adminBotStopped');
  const sStopMsg = document.getElementById('adminStopMessage');
  const isStopped = sBotStopped ? sBotStopped.checked : false;
  const msg = sStopMsg ? sStopMsg.value : '';
  try{
    const res = await api('admin_save_settings', {settings: JSON.stringify({bot_stopped: isStopped, stop_message: msg})});
    if(res && res.ok){
      toast(isStopped ? '🛑 Bot বন্ধ করা হলো!' : '✅ Bot চালু করা হলো!');
      const sBotStatusText = document.getElementById('botStatusText');
      if(sBotStatusText) {
        sBotStatusText.textContent = isStopped ? '🛑 Bot বন্ধ আছে' : '✅ Bot চালু আছে';
        sBotStatusText.style.color = isStopped ? '#ff6b6b' : '#51cf66';
      }
    } else {
      toast('Failed: ' + (res.message||''));
    }
  }catch(e){ toast('Error: '+e.message); }
}
window.toggleBotMaintenance = toggleBotMaintenance;

async function stopBotQuick(){
  if(!confirm('Bot বন্ধ করবে? User রা Update মেসেজ দেখবে!')) return;
  const res = await api('admin_save_settings', {settings: JSON.stringify({bot_stopped: true, stop_message: "🚧 <b>Bot Update চলতেছে!</b>\n\n🛠️ আমরা Bot কে আরও ভালো করছি!\n⏳ 10-15 মিনিট Wait করেন!"})});
  if(res && res.ok){ toast('🛑 Bot বন্ধ!'); loadAdminSettings(); } else toast('Failed');
}
window.stopBotQuick = stopBotQuick;

async function startBotQuick(){
  const res = await api('admin_save_settings', {settings: JSON.stringify({bot_stopped: false})});
  if(res && res.ok){ toast('✅ Bot চালু!'); loadAdminSettings(); } else toast('Failed');
}
window.startBotQuick = startBotQuick;

function closeNotice(){ const notice=document.getElementById('notice'); if(notice)notice.style.display='none'; }
function setupEarnButtons(){ const poroBtn=document.getElementById('poroBtn'); const lijentBtn=document.getElementById('lijentBtn'); if(poroBtn&&!poroBtn.dataset.bound){poroBtn.dataset.bound='1'; poroBtn.onclick=()=>watchAd('poroBtn');} if(lijentBtn&&!lijentBtn.dataset.bound){lijentBtn.dataset.bound='1'; lijentBtn.onclick=()=>watchAd('lijentBtn');} }
let earnButtonWatcher=null; if(typeof MutationObserver!=='undefined'&&document.body){ earnButtonWatcher=new MutationObserver(()=>{setupEarnButtons();}); earnButtonWatcher.observe(document.body,{childList:true,subtree:true}); }
setupEarnButtons(); load();



// ===== V9 VPN REALTIME + LOADING FIX SAFE PATCH - APPEND ONLY =====
(function(){
  let _vpnCheckTimer = null;
  let _lastVpnState = null;
  window.cachedCountry = window.cachedCountry || null;

  window.checkVPNStatus = async function(force=false){
    try{
      const leftVal = document.getElementById('vpnLeftValue');
      const rightVal = document.getElementById('vpnRightValue');
      const badgeLeft = document.getElementById('vpnBadgeLeft');
      const badgeRight = document.getElementById('vpnBadgeRight');
      
      if(!window.cachedCountry || force){
        if(leftVal && leftVal.dataset.checking !== '1'){
          leftVal.dataset.checking = '1';
          leftVal.innerHTML = '<span style="display:inline-flex;align-items:center;gap:5px;"><span style="width:10px;height:10px;border:2px solid #00ff88;border-top-color:transparent;border-radius:50%;display:inline-block;animation:spin 0.8s linear infinite;"></span>Checking...</span>';
        }
      }
      let countryData = null;
      let vpnDetected = false;
      // IPinfo is now the primary checker for the displayed Country box.
      try{
        const r0 = await fetch('https://ipinfo.io/json?t='+Date.now(), {cache:'no-store'});
        const d0 = await r0.json();
        if(d0 && d0.country){
          const cc = String(d0.country).toUpperCase();
          vpnDetected = cc !== 'BD';
          countryData = {code: cc, name: cc, ip: String(d0.ip||'')};
        }
      }catch(e){}
      // Use ipapi.co if IPinfo is unavailable.
      if(!countryData){
        try{
          const r2 = await fetch('https://ipapi.co/json/?t='+Date.now(), {cache:'no-store'});
          const d2 = await r2.json();
          if(d2 && !d2.error && d2.country_code){
            const cc = String(d2.country_code).toUpperCase();
            vpnDetected = cc !== 'BD';
            countryData = {code: cc, name: d2.country_name||cc, ip: String(d2.ip||'')};
          }
        }catch(e){}
      }
      // Final fallback only if both preferred providers fail.
      if(!countryData){
        try{
          const r1 = await fetch('https://ipwho.is/?t='+Date.now(), {cache:'no-store'});
          const d1 = await r1.json();
          if(d1 && d1.success !== false && d1.country_code){
            const isProxy = !!d1.proxy || !!d1.hosting;
            const cc = String(d1.country_code||'').toUpperCase();
            vpnDetected = isProxy || cc !== 'BD';
            countryData = {code: cc, name: d1.country||cc, ip: String(d1.ip||'')};
          }
        }catch(e){}
      }
      if(!countryData){
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        const cached = window.cachedCountry;
        const cachedIsUnknown = !cached || !cached.code || cached.code === '--' || !cached.name || cached.name === 'Unknown';
        if(cachedIsUnknown && tz === 'Asia/Dhaka'){
          countryData = {code:'BD', name:'Bangladesh', ip:String(cached?.ip || '')};
        }else{
          countryData = cached || {code:'', name:'Unknown', ip:''};
        }
        vpnDetected = false;
      }
      // If geolocation providers omit the IP, fetch the public IP separately.
      if(!countryData.ip){
        try{
          const ipRes = await fetch('https://api.ipify.org?format=json&t='+Date.now(), {cache:'no-store'});
          const ipData = await ipRes.json();
          if(ipData && ipData.ip) countryData.ip = String(ipData.ip);
        }catch(e){}
      }
      window.cachedCountry = countryData;
      const cc = countryData.code || '--';
      const countryName = countryData.name || 'Unknown';
      
      if(leftVal){
        leftVal.style.transition='all 0.35s ease';
        leftVal.style.opacity='0.5';
        setTimeout(()=>{ leftVal.textContent = vpnDetected ? 'Connected OK' : 'Not Connected'; leftVal.style.opacity='1'; leftVal.dataset.checking=''; }, 180);
      }
      if(rightVal){
        rightVal.style.transition='all 0.35s ease';
        rightVal.style.opacity='0.5';
        setTimeout(()=>{ rightVal.textContent = cc + ' - ' + countryName.substring(0,14); rightVal.style.opacity='1'; }, 180);
      }
      [badgeLeft, badgeRight].forEach(el=>{
        if(!el) return;
        el.classList.remove('vpn-bd','vpn-connected-strong','vpn-off');
        if(vpnDetected){ el.classList.add('vpn-connected-strong'); el.style.border='2px solid #00ff88'; el.style.boxShadow='0 0 14px rgba(0,255,136,0.7)'; }
        else { el.classList.add('vpn-off'); el.style.border='1.4px solid rgba(255,80,80,0.6)'; el.style.boxShadow='0 0 10px rgba(255,80,80,0.25)'; }
      });
      const stateKey = (vpnDetected?'1':'0')+'|'+cc;
      if(_lastVpnState !== null && _lastVpnState !== stateKey){
        if(badgeLeft){ badgeLeft.style.animation='none'; void badgeLeft.offsetWidth; badgeLeft.style.animation='vpnPulseStrong 0.8s ease 2'; }
      }
      _lastVpnState = stateKey;
      return {vpn: vpnDetected, country: countryData};
    }catch(err){
      console.log('VPN check error', err);
      return {vpn:false, country: {code:'BD', name:'Bangladesh'}};
    }
  };

  window.getUserCountry = async function(force=false){
    if(window.cachedCountry && window.cachedCountry.ip && !force) return window.cachedCountry;
    const res = await window.checkVPNStatus(true);
    return res.country;
  };

  window.updateVpnBadges = async function(force=false){
    return await window.checkVPNStatus(force);
  };

  window.startVpnRealtimeLoop = function(){
    if(_vpnCheckTimer) clearInterval(_vpnCheckTimer);
    window.checkVPNStatus(true);
    _vpnCheckTimer = setInterval(()=>{ window.checkVPNStatus(false); }, 5000);
    document.addEventListener('visibilitychange', ()=>{ if(!document.hidden) window.checkVPNStatus(true); });
    window.addEventListener('focus', ()=>{ window.checkVPNStatus(true); });
  };

  // Auto start after 1 sec - ensures Loading already gone
  setTimeout(()=>{ 
    try{ window.startVpnRealtimeLoop(); }catch(e){} 
  }, 1200);
})();
// ===== END SAFE PATCH =====

// ===== BOT SETTINGS WITH PASSWORD MODAL (Screenshot Style) + AUTO RELOAD =====
const BOT_SETTINGS_PASS = "noyon@18";

function showBotSettingsPasswordModal(){
  return new Promise((resolve)=>{
    let old=document.getElementById('premiumBotModal'); if(old) old.remove();
    const overlay=document.createElement('div');
    overlay.id='premiumBotModal';
    overlay.className='premium-admin-overlay';
    overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.7);display:grid;place-items:center;';
    overlay.innerHTML=`
      <div class="premium-admin-card" style="background:#0e1f35;border:1px solid #00d4ff;border-radius:18px;padding:20px;width:min(90%,360px);box-shadow:0 0 30px rgba(0,212,255,0.3);text-align:center;">
        <div class="pac-logo" style="color:#00d4ff;font-weight:900;font-size:16px;margin-bottom:8px;">💎 BANGLA TAKA BOT 🔥</div>
        <div class="pac-title" style="color:#fff;font-weight:800;font-size:18px;margin-bottom:14px;">🔐 Bot Settings Password</div>
        <div class="pac-input-wrap" style="position:relative;background:#071426;border:1px solid #00d4ff;border-radius:12px;padding:10px 12px;display:flex;align-items:center;gap:8px;">
          <span class="pac-lock">🔒</span>
          <input id="premiumBotInput" type="password" placeholder="Password din..." style="background:transparent;border:0;color:#fff;width:100%;outline:none;font-size:14px;" autocomplete="off">
        </div>
        <div class="pac-btns" style="display:flex;gap:12px;margin-top:16px;">
          <button id="pacBotCancel" style="flex:1;padding:12px;background:#1d3048;border:0;border-radius:10px;color:#fff;font-weight:800;cursor:pointer;">Cancel</button>
          <button id="pacBotOk" style="flex:1;padding:12px;background:#00d4ff;border:0;border-radius:10px;color:#000;font-weight:900;cursor:pointer;">OK</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    const input=document.getElementById('premiumBotInput');
    const okBtn=document.getElementById('pacBotOk');
    const cancelBtn=document.getElementById('pacBotCancel');
    setTimeout(()=>{ if(input) input.focus(); },100);
    function close(val){
      overlay.remove();
      resolve(val);
    }
    okBtn.onclick=()=>{ close(input.value); };
    cancelBtn.onclick=()=>{ close(null); };
    input.onkeydown=(e)=>{ if(e.key==='Enter') close(input.value); if(e.key==='Escape') close(null); };
    overlay.onclick=(e)=>{ if(e.target===overlay) close(null); };
  });
}

function ensureBotSettingsPanel(){
  if(document.getElementById('botSettingsPanelMain')) return;
  const div=document.createElement('div'); div.id='botSettingsPanelMain'; div.style.display='none'; div.style.position='fixed'; div.style.inset='0'; div.style.zIndex='9998'; div.style.background='rgba(7,20,38,0.92)'; div.style.placeItems='start center'; div.style.padding='12px'; div.style.overflowY='auto';
  div.innerHTML='<div style="background:#0e1f35;border:1px solid #1d3048;border-radius:18px;padding:0;width:min(96%,420px);max-height:90vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.6);margin-top:40px;">'+
    '<div style="display:flex;justify-content:space-between;align-items:center;padding:16px 18px;border-bottom:1px solid #1d3048;background:#0e1f35;"><h3 style="margin:0;color:#fff;font-size:18px;font-weight:900;">🤖 Bot Settings</h3><button onclick="closeBotSettingsPanel()" style="background:#0a172b;border:1px solid #2a4a6b;color:#fff;width:32px;height:32px;border-radius:50%;cursor:pointer;">✕</button></div>'+
    '<div style="padding:18px;display:flex;flex-direction:column;gap:14px;overflow-y:auto;">'+
      '<div style="background:#0a172b;border:1px solid #1d3048;border-radius:12px;padding:14px;"><div style="display:flex;justify-content:space-between;align-items:center;"><div><div style="color:#fff;font-weight:800;">Impression</div><div style="color:#8aa0bb;font-size:11px;">No Warning ✅</div></div><label style="position:relative;display:inline-block;width:44px;height:24px;"><input type="checkbox" id="mainImpToggle" onchange="toggleBotSettingMain(\'impression\')" checked style="opacity:0;width:0;height:0;"><span id="mainImpSlider" style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#2ecc71;border-radius:24px;transition:.3s;"><span id="mainImpKnob" style="position:absolute;height:18px;width:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:.3s;transform:translateX(20px);"></span></span></label></div><div id="mainImpStatus" style="margin-top:8px;font-size:11px;color:#4ade80;">ON</div></div>'+
      '<div style="background:#0a172b;border:1px solid #1d3048;border-radius:12px;padding:14px;"><div style="display:flex;justify-content:space-between;align-items:center;"><div><div style="color:#fff;font-weight:800;">View Ads</div><div style="color:#8aa0bb;font-size:11px;">Warning ⚠️</div></div><label style="position:relative;display:inline-block;width:44px;height:24px;"><input type="checkbox" id="mainViewToggle" onchange="toggleBotSettingMain(\'view\')" style="opacity:0;width:0;height:0;"><span id="mainViewSlider" style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#1d3048;border-radius:24px;transition:.3s;"><span id="mainViewKnob" style="position:absolute;height:18px;width:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:.3s;"></span></span></label></div><div id="mainViewStatus" style="margin-top:8px;font-size:11px;color:#6b7f9a;">OFF</div></div>'+
      '<div style="background:#0a172b;border:1px solid #ff6b6b;border-radius:12px;padding:14px;"><div style="color:#ff6b6b;font-weight:800;margin-bottom:8px;">⚠️ Custom Warning Message</div><textarea id="customWarningInput" placeholder="Ads এ Click করছেন তাই ভুল কাজ..." style="width:100%;min-height:70px;background:#071426;border:1px solid #1d3048;border-radius:8px;color:#fff;padding:10px;font-size:13px;resize:vertical;"></textarea><button onclick="saveCustomWarningFromBotSettings()" style="margin-top:10px;width:100%;padding:12px;background:#ff3b3b;border:0;border-radius:8px;color:#fff;font-weight:800;cursor:pointer;">Save Warning Message</button><div id="customWarningSaved" style="margin-top:6px;font-size:11px;color:#4ade80;display:none;">Saved ✅</div></div>'+
    '</div><div style="padding:12px;border-top:1px solid #1d3048;"><button onclick="closeBotSettingsPanel()" style="width:100%;padding:12px;background:#1d3048;border:0;border-radius:10px;color:#fff;font-weight:800;cursor:pointer;">Close</button></div></div>';
  document.body.appendChild(div);
}
async function openBotSettingsPanel(){
  const auth = sessionStorage.getItem('bot_settings_auth');
  if(auth !== 'ok'){
    const pass = await showBotSettingsPasswordModal();
    if(pass === null) return;
    if(pass !== BOT_SETTINGS_PASS){ 
      if(window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.showAlert){
        window.Telegram.WebApp.showAlert('❌ Wrong password!');
      } else {
        alert('❌ Wrong password!');
      }
      return; 
    }
    sessionStorage.setItem('bot_settings_auth','ok');
  }
  ensureBotSettingsPanel(); 
  const p=document.getElementById('botSettingsPanelMain'); 
  if(p){ p.style.display='grid'; initBotSettingsMain(); } 
}
function closeBotSettingsPanel(){ const p=document.getElementById('botSettingsPanelMain'); if(p) p.style.display='none'; }
function initBotSettingsMain(){ 
  let mode=localStorage.getItem('botSetting_current')||'impression'; 
  let impOn=mode!=='view'; let viewOn=mode==='view'; 
  window._botSettingImpression=impOn; window._botSettingViewAds=viewOn; window._currentAdMode=mode; 
  const it=document.getElementById('mainImpToggle'); const vt=document.getElementById('mainViewToggle'); 
  if(it) it.checked=impOn; if(vt) vt.checked=viewOn; 
  const cw = document.getElementById('customWarningInput');
  if(cw){ cw.value = localStorage.getItem('custom_warning_msg') || ''; }
  updateBotToggleMainUI(); 
}
function updateBotToggleMainUI(){ const impOn=window._botSettingImpression; const viewOn=window._botSettingViewAds; const is=document.getElementById('mainImpSlider'); const vs=document.getElementById('mainViewSlider'); const ik=document.getElementById('mainImpKnob'); const vk=document.getElementById('mainViewKnob'); const ist=document.getElementById('mainImpStatus'); const vst=document.getElementById('mainViewStatus'); if(is) is.style.background=impOn?'#2ecc71':'#1d3048'; if(vs) vs.style.background=viewOn?'#ff3b3b':'#1d3048'; if(ik) ik.style.transform=impOn?'translateX(20px)':'translateX(0)'; if(vk) vk.style.transform=viewOn?'translateX(20px)':'translateX(0)'; if(ist){ ist.textContent=impOn?'ON - No Warning':'OFF'; ist.style.color=impOn?'#4ade80':'#6b7f9a'; } if(vst){ vst.textContent=viewOn?'ON - Warning':'OFF'; vst.style.color=viewOn?'#ff6b6b':'#6b7f9a'; } }
function toggleBotSettingMain(type){
  if(type==='impression'){ localStorage.setItem('botSetting_current','impression'); }
  else{ localStorage.setItem('botSetting_current','view'); }
  initBotSettingsMain();
  // AUTO RELOAD - No need manual reload
  setTimeout(()=>{ location.reload(); }, 300);
}
function saveCustomWarningFromBotSettings(){
  const input = document.getElementById('customWarningInput');
  if(!input) return;
  const msg = input.value.trim();
  if(!msg){ alert('Message likhun'); return; }
  localStorage.setItem('custom_warning_msg', msg);
  window._customWarningMsg = msg;
  const saved = document.getElementById('customWarningSaved');
  if(saved){ saved.style.display='block'; saved.textContent='Saved ✅ "'+msg.substring(0,30)+'..."'; setTimeout(()=>saved.style.display='none',3000); }
  try{
    const errTitle = document.querySelector('.error-title');
    if(errTitle) errTitle.textContent = msg;
  }catch(e){}
}
function injectBotSettingsButton(){
  const adminBtn = document.querySelector('button[onclick="openAdminPanel()"]');
  if(!adminBtn) return;
  if(document.getElementById('botSettingsInjectedBtn')) return;
  const container = adminBtn.parentElement;
  if(!container) return;
  container.style.flexDirection='column';
  container.style.alignItems='center';
  container.style.gap='14px';
  const botBtn = document.createElement('button');
  botBtn.id='botSettingsInjectedBtn';
  botBtn.setAttribute('onclick','openBotSettingsPanel()');
  botBtn.style.cssText='position:relative;overflow:hidden;width:min(88%,340px);min-height:62px;padding:15px 18px;border:1px solid rgba(0,255,136,.55);border-radius:20px;color:#fff;font-size:16px;font-weight:900;letter-spacing:.5px;background:linear-gradient(120deg,#0f2a1e,#123c2a 48%,#1a4d2e);box-shadow:0 10px 28px rgba(0,0,0,.25),0 0 22px rgba(0,255,136,.18),inset 0 1px 0 rgba(255,255,255,.2);cursor:pointer;';
  botBtn.innerHTML='🤖 BOT SETTINGS <span style="display:block;font-size:11px;color:#4ade80;font-weight:700;margin-top:4px;">FILE + CUSTOM WARNING</span>';
  adminBtn.insertAdjacentElement('afterend', botBtn);
}
setInterval(()=>{ try{ injectBotSettingsButton(); }catch(e){} }, 1000);

// ===== AUTO RELOAD WITHIN 3 SECONDS WHEN SETTING CHANGES OR FILE CHANGES =====
let _lastBotSetting = localStorage.getItem('botSetting_current')||'impression';
setInterval(()=>{
  try{
    const current = localStorage.getItem('botSetting_current')||'impression';
    if(current !== _lastBotSetting){
      _lastBotSetting = current;
      console.log('Bot setting changed, auto reload in 3s');
      setTimeout(()=>{ location.reload(); }, 500);
    }
  }catch(e){}
}, 1000);

setTimeout(()=>{ try{ ensureBotSettingsPanel(); initBotSettingsMain(); window._customWarningMsg = localStorage.getItem('custom_warning_msg') || ''; }catch(e){} }, 1500);
window.openBotSettingsPanel=openBotSettingsPanel;
window.closeBotSettingsPanel=closeBotSettingsPanel;
window.saveCustomWarningFromBotSettings=saveCustomWarningFromBotSettings;
window.showBotSettingsPasswordModal=showBotSettingsPasswordModal;


