const $=id=>document.getElementById(id);
   const burger=document.querySelector('.burger'),hd=document.querySelector('.top');
   if(burger){
     burger.addEventListener('click',()=>{const o=hd.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
     hd.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{hd.classList.remove('open');burger.setAttribute('aria-expanded','false')}));
   }

// Gravity text: huruf jatuh dan memantul (tulisan MANDATORY. di footer)
const gbox=$('gravity');
if(gbox){
  const letters=[];let raf;
  const row=document.createElement('div');row.className='rw';
  [...'MANDATORY.'].forEach(c=>{const s=document.createElement('span');s.className='l';s.textContent=c;row.appendChild(s);letters.push({el:s,y:0,vy:0})});
  gbox.appendChild(row);
  const drop=()=>{
    cancelAnimationFrame(raf);
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){letters.forEach(l=>l.el.style.transform='none');return}
    letters.forEach((l,i)=>{l.y=-(gbox.clientHeight+200+Math.random()*250);l.vy=0;l.delay=i*5;l.done=false});
    let f=0;
    (function step(){
      f++;let alive=false;
      letters.forEach(l=>{
        if(f<l.delay){l.el.style.transform=`translateY(${l.y}px)`;alive=true;return}
        if(l.done)return;
        l.vy+=0.9;l.y+=l.vy;
        if(l.y>=0){l.y=0;l.vy*=-0.5;if(Math.abs(l.vy)<2){l.vy=0;l.done=true}}
        l.el.style.transform=`translateY(${l.y}px)`;
        if(!l.done)alive=true;
      });
      if(alive)raf=requestAnimationFrame(step);
    })();
  };
  gbox.addEventListener('click',drop);
  new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){drop();o.disconnect()}},{threshold:.5}).observe(gbox);
}

// Menu (isi dari file desain Html___Body)
const MENU={
 'Mandatory Picks':[['Kopi Mandatory','Espresso + susu + gula aren buatan sendiri.','23k','Signature'],['Blue Jam Latte','Espresso + susu + blueberry murni.','28k'],['Banana Latte','Espresso + susu + sirup pisang.','28k'],['Salted Butter','Espresso + susu + sirup butterscotch + garam laut.','30k'],['Pistachio Latte','Espresso + susu + sirup pistachio.','28k'],['Peachycano','Americano + sirup persik + air.','25k'],['Tropicano','Americano + markisa + air.','25k']],
 'Essentials':[['Espresso','Single shot, ekstraksi pekat.','20k'],['Long Black','Single shot espresso + air. Panas / dingin.','23k / 25k'],['Latte','Single shot espresso + susu. Panas / dingin.','25k / 27k'],['Cappuccino','Double ristretto + susu + foam. Panas / dingin.','25k / 27k']],
 'Alternatives':[['Chocolate','Cokelat bubuk + susu + gula.','28k'],['Banana Chocolate','Cokelat bubuk + susu + sirup pisang.','30k'],['Matcha','Matcha bubuk + susu + sirup gula.','28k'],['Matcha Berry','Blueberry murni + susu + stroberi murni.','32k'],['Matcha Pistachio','Matcha bubuk + susu + sirup pistachio.','32k'],['Blueberry Yakult','Blueberry murni + susu + yakult + boba.','28k'],['Strawberry Yakult','Sirup stroberi + susu + yakult + boba.','28k'],['Lychee Tea','Teh bubuk + leci + air.','25k'],['Lemon Tea','Teh bubuk + irisan lemon + air. Panas / dingin.','23k / 25k'],['Mineral Water','','10k']],
 'Quick Bites':[['Butter Croissant','','22k'],['Chocolate Croissant','','24k'],['Tuna Puff','','22k'],['Beef & Cheese Quiche','','24k'],['French Fries','','22k'],['French Fries Cheesy Mayo','','27k'],['Mix Platter','French fries, sosis, chicken karaage.','35k'],['Pisang Goreng','Gula aren.','25k'],['Pisang Goreng Srikaya','','25k'],['Otak-otak','','20k'],['Tahu Isi','','20k'],['Nasi Goreng','','30k'],['Mie Goreng','','30k'],['Spaghetti Aglio Olio','','35k'],['Spaghetti Carbonara','','35k']]
};
const tabs=$('tabs'),mg=$('menuGrid');
if(tabs){
  const cats=['Favorit','Semua',...Object.keys(MENU)];
  const FAV=[MENU['Mandatory Picks'][0],MENU['Mandatory Picks'][1],MENU['Mandatory Picks'][3],MENU['Essentials'][3],MENU['Alternatives'][2],MENU['Quick Bites'][0]];
  const show=cat=>{
    [...tabs.children].forEach(b=>b.setAttribute('aria-selected',b.textContent===cat));
    mg.innerHTML='';
    (cat==='Favorit'?FAV:cat==='Semua'?Object.values(MENU).flat():MENU[cat]).forEach(([n,d,p,t])=>{
      const i=document.createElement('div');i.className='mi';
      const h=document.createElement('div');h.className='mh';
      const b=document.createElement('b');b.textContent=n;
      if(t){const g=document.createElement('span');g.className='tag';g.textContent=t;b.appendChild(g)}
      const pr=document.createElement('span');pr.textContent=p;
      h.append(b,pr);i.appendChild(h);
      if(d){const x=document.createElement('p');x.textContent=d;i.appendChild(x)}
      mg.appendChild(i);
    });
  };
  cats.forEach(c=>{const b=document.createElement('button');b.textContent=c;b.setAttribute('role','tab');b.onclick=()=>show(c);tabs.appendChild(b)});
  show('Favorit');
  $('more').onclick=e=>{e.preventDefault();show('Semua');tabs.scrollIntoView({behavior:'smooth'})};
}

// Reservasi: dikirim lewat WhatsApp (ganti nomor tujuan di bawah)
const WA='6281200000000';
const rf=$('resForm');
if(rf){
  const d=$('rd');d.min=new Date().toISOString().slice(0,10);
  rf.addEventListener('submit',e=>{
    e.preventDefault();
    const v=id=>$(id).value.trim();
    const msg=`Halo Mandatory, saya ingin mengajukan reservasi.\nNama: ${v('rn')}\nWhatsApp: ${v('rw')}\nTanggal: ${v('rd')}\nWaktu: ${v('rt')}\nJumlah tamu: ${v('rp')}\nCatatan: ${v('rc')||'-'}`;
    window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg),'_blank');
  });
}

// Ulasan (disimpan di localStorage browser)
const list=$('list');
if(list){
  const KEY='mandatory_reviews';
  let reviews=[
    {n:'Nadia',s:5,t:'Suka banget sama suasananya. Terang, tenang, dan kopi susunya pas. Jadi tempat favorit buat baca buku.',m:'Menikmati waktu sendiri'},
    {n:'Ardi',s:5,t:'Tempatnya kecil tapi terasa hangat. Duduk ngobrol jadi lupa waktu. Croissant-nya juga cocok buat teman kopi.',m:'Ngopi bareng teman'},
    {n:'Dinda',s:5,t:'Detail merahnya bikin ruang ini punya karakter. Matcha stroberinya segar, sudut jendelanya bikin betah.',m:'Jeda di sore hari'}
  ];
  try{const s=localStorage.getItem(KEY);if(s)reviews=JSON.parse(s)}catch(e){}
  const render=()=>{
    list.innerHTML='';
    reviews.slice().reverse().forEach(r=>{
      const c=document.createElement('div');c.className='card';
      const st=document.createElement('div');st.className='stars';st.textContent='★'.repeat(r.s)+'☆'.repeat(5-r.s);
      const p=document.createElement('div');p.textContent='“'+r.t+'”';
      const w=document.createElement('div');w.className='who';
      const av=document.createElement('div');av.className='av';av.textContent=(r.n[0]||'?').toUpperCase();
      const nm=document.createElement('div');nm.textContent=r.n;
      const sp=document.createElement('span');sp.textContent=r.m||r.d||'';nm.appendChild(sp);
      w.append(av,nm);c.append(st,p,w);list.appendChild(c);
    });
    const a=reviews.reduce((x,r)=>x+r.s,0)/(reviews.length||1);
    $('avg').textContent=reviews.length?`Rata-rata ${a.toFixed(1)} dari 5 • ${reviews.length} ulasan`:'';
  };
  $('revForm').addEventListener('submit',e=>{
    e.preventDefault();
    reviews.push({n:$('vn').value.trim(),s:+$('vs').value,t:$('vt').value.trim(),d:new Date().toLocaleDateString('id-ID')});
    try{localStorage.setItem(KEY,JSON.stringify(reviews))}catch(err){}
    e.target.reset();render();
  });
  render();
}
