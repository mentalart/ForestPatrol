/* ============================== ЛУКОМОРЬЕ: пустой дуб, Кот Учёный, карта-рушник ============================== */
// картинки сказок-лубков: плоские фигуры, чёрный контур, красный-жёлтый-зелёный на сливочном
const LB=(body)=>'<svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" stroke="#2a1a10" stroke-width="3" stroke-linejoin="round">'+body+'</svg>';
const LUBOK={
 yaga:LB('<rect x="0" y="118" width="300" height="32" fill="#8ab04a"/><polygon points="20,118 40,60 60,118" fill="#2f7a3a"/><polygon points="250,118 270,55 290,118" fill="#2f7a3a"/>'+
   '<rect x="110" y="40" width="80" height="50" fill="#c8843a"/><polygon points="100,42 150,10 200,42" fill="#c0302a"/><rect x="140" y="58" width="20" height="32" fill="#5a3218"/>'+
   '<path d="M130 90 L120 118 M130 90 L140 118 M170 90 L160 118 M170 90 L180 118" stroke="#f0a020" stroke-width="6" fill="none"/>'+
   '<polygon points="215,118 230,78 245,118" fill="#6e3f82"/><circle cx="230" cy="70" r="10" fill="#f0d0b0"/><path d="M219 66 Q230 52 241 66 Z" fill="#c0302a"/><line x1="245" y1="95" x2="262" y2="60" stroke="#7a5634" stroke-width="4"/>'+
   '<circle cx="75" cy="108" r="9" fill="#ffc93c"/><path d="M84 108 Q110 104 125 112" stroke="#ffc93c" stroke-width="3" fill="none"/>'),
 kolobok:LB('<rect x="0" y="112" width="300" height="38" fill="#b0905a"/><rect x="0" y="100" width="300" height="12" fill="#8ab04a"/>'+
   '<polygon points="15,112 35,40 55,112" fill="#2f7a3a"/><polygon points="240,112 262,35 284,112" fill="#2f7a3a"/><circle cx="120" cy="88" r="24" fill="#f0c050"/><circle cx="112" cy="82" r="3" fill="#2a1a10"/><circle cx="128" cy="82" r="3" fill="#2a1a10"/>'+
   '<path d="M110 94 Q120 102 130 94" fill="none"/><path d="M92 100 C80 96 72 100 66 106" fill="none" stroke-dasharray="4 5"/>'+
   '<polygon points="178,112 186,78 212,76 224,112" fill="#e06a2a"/><polygon points="206,78 214,56 222,78" fill="#e06a2a"/><circle cx="202" cy="72" r="12" fill="#e06a2a"/><polygon points="192,64 196,50 202,62" fill="#e06a2a"/><polygon points="206,62 212,50 214,64" fill="#e06a2a"/>'+
   '<path d="M224 104 C246 98 250 80 238 72" stroke="#e06a2a" stroke-width="8" fill="none"/><text x="140" y="40" font-size="22" fill="#c0302a" stroke="none" font-family="Georgia">♪ ♫</text>'),
 leshy:LB('<rect x="0" y="118" width="300" height="32" fill="#5a8a4a"/>'+[20,60,215,255].map(x=>'<polygon points="'+x+',118 '+(x+20)+',45 '+(x+40)+',118" fill="#2f6a3a"/>').join('')+
   '<rect x="128" y="50" width="44" height="68" rx="12" fill="#3d5a2a"/><circle cx="150" cy="40" r="18" fill="#5a4028"/><circle cx="143" cy="38" r="4" fill="#d8ff6a"/><circle cx="157" cy="38" r="4" fill="#d8ff6a"/>'+
   '<path d="M138 26 L126 6 M126 6 L118 12 M162 26 L174 6 M174 6 L182 12" stroke="#5a4028" stroke-width="5" fill="none"/><polygon points="140,52 150,80 160,52" fill="#2e4420"/>'+
   '<polygon points="84,118 92,96 108,96 116,118" fill="#c8643b"/><polygon points="90,98 100,84 110,98" fill="#9ac27a"/><circle cx="100" cy="100" r="3" fill="#fff08a"/><path d="M103 100 L128 80" stroke="#fff08a" stroke-dasharray="3 4"/>'),
 kiki:LB('<rect x="0" y="118" width="300" height="32" fill="#9a7a50"/><rect x="0" y="0" width="300" height="118" fill="#e8d8b8"/><circle cx="190" cy="62" r="46" fill="none" stroke-width="6"/>'+
   [0,1,2,3].map(i=>'<line x1="190" y1="62" x2="'+(190+Math.cos(i*0.785)*46).toFixed(0)+'" y2="'+(62+Math.sin(i*0.785)*46).toFixed(0)+'" stroke-width="3"/><line x1="190" y1="62" x2="'+(190-Math.cos(i*0.785)*46).toFixed(0)+'" y2="'+(62-Math.sin(i*0.785)*46).toFixed(0)+'" stroke-width="3"/>').join('')+
   '<polygon points="80,118 100,54 120,118" fill="#6a7a5a"/><circle cx="100" cy="48" r="14" fill="#9aa88a"/>'+[0,1,2,3,4,5].map(i=>'<line x1="'+(88+i*5)+'" y1="52" x2="'+(84+i*6)+'" y2="80" stroke="#3a4a2a" stroke-width="3"/>').join('')+
   '<circle cx="95" cy="46" r="2.5" fill="#fff3a0"/><circle cx="105" cy="46" r="2.5" fill="#fff3a0"/><polygon points="128,80 134,70 140,80 134,90" fill="#d8c8a0"/><path d="M140 80 L190 62" stroke="#d8d8e4" stroke-width="2"/>'+
   '<path d="M134 92 Q150 118 170 124" stroke="#101010" stroke-width="2" fill="none"/><circle cx="172" cy="126" r="4" fill="none" stroke-width="2"/>'),
 sadko:LB('<rect x="0" y="0" width="300" height="150" fill="#2f7a90"/><rect x="0" y="120" width="300" height="30" fill="#c8b080"/>'+[40,250].map(x=>'<rect x="'+(x-18)+'" y="60" width="36" height="60" fill="#f4ecd8"/><ellipse cx="'+x+'" cy="52" rx="16" ry="18" fill="#ffc93c"/><line x1="'+x+'" y1="34" x2="'+x+'" y2="20"/>').join('')+
   '<polygon points="120,120 130,70 170,70 180,120" fill="#c0302a"/><circle cx="150" cy="58" r="14" fill="#f0d0b0"/><polygon points="140,64 150,90 160,64" fill="#9a6a3a"/><rect x="136" y="38" width="28" height="12" fill="#c0302a"/>'+
   '<polygon points="118,96 182,96 172,112 128,112" fill="#e0a040"/>'+[0,1,2,3].map(i=>'<line x1="'+(128+i*14)+'" y1="98" x2="'+(132+i*12)+'" y2="110" stroke="#fff4c8" stroke-width="1.5"/>').join('')+'<text x="200" y="40" font-size="22" fill="#fff4c8" stroke="none" font-family="Georgia">♪ ♫</text>'),
 kit:LB('<rect x="0" y="0" width="300" height="150" fill="#bfe4f4"/><rect x="0" y="100" width="300" height="50" fill="#3a90c0"/><ellipse cx="150" cy="100" rx="120" ry="34" fill="#5a6a86"/>'+
   '<circle cx="60" cy="96" r="5" fill="#fff"/><path d="M40 108 Q60 118 80 108" fill="none"/>'+[110,150,190].map(x=>'<rect x="'+(x-12)+'" y="56" width="24" height="18" fill="#c8843a"/><polygon points="'+(x-16)+',56 '+x+',42 '+(x+16)+',56" fill="#c0302a"/>').join('')+
   '<path d="M232 70 C228 40 236 20 244 10 M232 70 C238 40 250 24 262 18" stroke="#e8f8ff" stroke-width="4" fill="none"/><ellipse cx="250" cy="16" rx="26" ry="10" fill="#fff"/>'),
 rybka:LB('<rect x="0" y="0" width="300" height="150" fill="#e8d8b8"/><rect x="0" y="92" width="300" height="58" fill="#3a90c0"/>'+[0,1,2,3,4,5].map(i=>'<line x1="'+(90+i*24)+'" y1="96" x2="'+(90+i*24)+'" y2="140" stroke="#ffc93c" stroke-width="2.5"/><line x1="86" y1="'+(100+i*8)+'" x2="214" y2="'+(100+i*8)+'" stroke="#ffc93c" stroke-width="2.5"/>').join('')+
   '<ellipse cx="150" cy="118" rx="18" ry="9" fill="#ffc930"/><polygon points="132,118 118,110 118,126" fill="#ffc930"/><polygon points="146,108 150,100 154,108" fill="#ffd23a"/>'+
   [[70,92],[230,92]].map(([x,y])=>'<circle cx="'+x+'" cy="'+(y-10)+'" r="10" fill="#ffc93c"/>').join('')+'<polygon points="20,92 36,56 52,92" fill="#5a7ab0"/><circle cx="36" cy="48" r="9" fill="#f0d0b0"/><polygon points="30,52 36,70 42,52" fill="#f4f0e8"/>'),
 kitezh:LB('<rect x="0" y="0" width="300" height="150" fill="#bfe4f4"/><rect x="0" y="110" width="300" height="40" fill="#5ab0c8"/>'+[50,110,190,250].map((x,i)=>'<rect x="'+(x-16)+'" y="'+(60+i%2*10)+'" width="32" height="'+(50-i%2*10)+'" fill="#f4ecd8"/><ellipse cx="'+x+'" cy="'+(52+i%2*10)+'" rx="15" ry="17" fill="#ffc93c"/><line x1="'+x+'" y1="'+(35+i%2*10)+'" x2="'+x+'" y2="'+(22+i%2*10)+'"/>').join('')+
   '<path d="M130 40 Q150 20 170 40 L176 70 L124 70 Z" fill="#c89a40"/><circle cx="150" cy="74" r="5" fill="#4a4a50"/><path d="M110 30 Q100 20 108 12 M190 30 Q200 20 192 12" fill="none" stroke="#ffc93c" stroke-width="3"/><text x="138" y="100" font-size="20" fill="#6e3f82" stroke="none" font-family="Georgia" font-style="italic">бом</text>'),
 pero:LB('<rect x="0" y="0" width="300" height="150" fill="#4a4488"/><rect x="0" y="118" width="300" height="32" fill="#e8e4f8"/><rect x="60" y="108" width="180" height="8" fill="#ffd76a"/>'+[40,250].map(x=>'<rect x="'+(x-5)+'" y="70" width="10" height="48" fill="#6b4a2b"/><circle cx="'+x+'" cy="62" r="24" fill="#4f9a3a"/><circle cx="'+(x-8)+'" cy="58" r="4" fill="#ffc840"/><circle cx="'+(x+9)+'" cy="66" r="4" fill="#ffc840"/>').join('')+
   '<ellipse cx="150" cy="62" rx="22" ry="16" fill="#ffb030"/><circle cx="170" cy="46" r="9" fill="#ffb030"/><polygon points="178,46 190,48 178,50" fill="#ffe070"/>'+[0,1,2,3,4].map(i=>'<path d="M132 66 Q'+(100-i*6)+' '+(40+i*14)+' '+(70-i*4)+' '+(30+i*18)+'" stroke="#ff5a20" stroke-width="5" fill="none"/>').join('')+'<circle cx="150" cy="62" r="46" fill="none" stroke="#ffd76a" stroke-width="2" stroke-dasharray="4 5"/>'),
 barashki:LB('<rect x="0" y="0" width="300" height="150" fill="#7a78c0"/><ellipse cx="40" cy="120" rx="60" ry="26" fill="#e8e4f8"/><ellipse cx="262" cy="120" rx="60" ry="26" fill="#e8e4f8"/>'+[0,1,2,3,4,5].map(i=>'<ellipse cx="'+(92+i*23)+'" cy="104" rx="13" ry="10" fill="#faf8ff"/><circle cx="'+(102+i*23)+'" cy="100" r="5" fill="#3a3448"/>').join('')+
   '<circle cx="36" cy="80" r="10" fill="#ffd23a"/>'+[0,1,2,3,4,5,6,7].map(i=>'<line x1="'+(36+Math.cos(i*0.785)*14)+'" y1="'+(80+Math.sin(i*0.785)*14)+'" x2="'+(36+Math.cos(i*0.785)*20)+'" y2="'+(80+Math.sin(i*0.785)*20)+'" stroke="#ffd23a" stroke-width="3"/>').join('')+'<ellipse cx="150" cy="40" rx="30" ry="12" fill="#faf8ff"/>'),
 korabl:LB('<rect x="0" y="0" width="300" height="150" fill="#141838"/><circle cx="252" cy="30" r="14" fill="#fff4d8"/>'+[20,60,110,180,220,280].map((x,i)=>'<circle cx="'+x+'" cy="'+(12+i%3*9)+'" r="1.8" fill="#fff" stroke="none"/>').join('')+
   '<path d="M80 100 L220 100 L200 124 L100 124 Z" fill="#9a6a3a"/><line x1="150" y1="100" x2="150" y2="36"/><rect x="118" y="44" width="64" height="44" fill="#fff0c0" stroke="#ffb040"/><rect x="144" y="86" width="12" height="12" fill="#ffd76a"/>'+[0,1,2].map(i=>'<path d="M'+(100+i*30)+' 112 L'+(76+i*30)+' 132 L'+(112+i*30)+' 118 Z" fill="#e8e4f8"/>').join('')),
 gusi:LB('<rect x="0" y="0" width="300" height="150" fill="#3a3474"/><rect x="0" y="120" width="300" height="30" fill="#e8e4f8"/>'+[[70,34],[150,24],[230,36]].map(([x,y])=>'<polygon points="'+(x-18)+','+(y+80)+' '+(x+18)+','+(y+80)+' '+x+','+(y+6)+'" fill="#e8f4ff" opacity=".35" stroke="none"/><ellipse cx="'+x+'" cy="'+y+'" rx="14" ry="6" fill="#fff"/><path d="M'+(x+10)+' '+(y-2)+' q10 -10 14 -2" fill="none" stroke="#fff" stroke-width="4"/>').join('')+
   '<rect x="20" y="92" width="36" height="28" fill="#f4efe4"/><rect x="30" y="102" width="16" height="10" fill="#2a1a14"/><circle cx="262" cy="96" r="16" fill="#4f8a3a"/><rect x="259" y="104" width="6" height="16" fill="#6b4a2b"/><rect x="110" y="124" width="80" height="6" fill="#faf6ff" stroke="#e07aa0"/>'),
 kuznya:LB('<rect x="0" y="0" width="300" height="150" fill="#3a1a18"/><rect x="0" y="118" width="300" height="32" fill="#5a3a2a"/><rect x="30" y="70" width="70" height="48" fill="#6a5a52"/><rect x="48" y="30" width="26" height="40" fill="#6a5a52"/>'+[0,1,2,3,4].map(i=>'<circle cx="'+(42+i*10)+'" cy="72" r="5" fill="#ff7a20" stroke="none"/>').join('')+
   '<rect x="150" y="96" width="50" height="22" fill="#3a3a44"/><rect x="165" y="118" width="20" height="10" fill="#5a3a1a"/><rect x="214" y="70" width="22" height="48" fill="#5a6a8a"/><circle cx="225" cy="60" r="12" fill="#e0b890"/><line x1="236" y1="80" x2="196" y2="92" stroke="#7a5634" stroke-width="6"/><rect x="186" y="86" width="16" height="12" fill="#55555e"/>'+[0,1,2].map(i=>'<circle cx="'+(176+i*8)+'" cy="'+(88-i*6)+'" r="3" fill="#ffe060" stroke="none"/>').join('')),
 smorodina:LB('<rect x="0" y="0" width="300" height="150" fill="#3a1a18"/><rect x="0" y="60" width="300" height="90" fill="#ff6a20"/>'+[0,1,2,3].map(i=>'<rect x="'+(40+i*55)+'" y="'+(92-i*6)+'" width="46" height="14" fill="#2a2226"/>').join('')+
   '<circle cx="55" cy="80" r="11" fill="#2f7a6a"/>'+[0,1,2,3,4].map(i=>'<line x1="'+(48+i*4)+'" y1="72" x2="'+(44+i*5)+'" y2="64" stroke="#2f5a4a"/>').join('')+'<path d="M70 76 q20 -20 40 0" fill="none" stroke="#7ad8ff" stroke-width="4"/><circle cx="250" cy="44" r="16" fill="#9a6a3a"/><circle cx="240" cy="30" r="5" fill="#9a6a3a"/><circle cx="260" cy="30" r="5" fill="#9a6a3a"/>'),
 valy:LB('<rect x="0" y="0" width="300" height="150" fill="#6a5034"/>'+[0,1,2].map(i=>'<path d="M0 '+(40+i*36)+' Q150 '+(20+i*36)+' 300 '+(40+i*36)+'" stroke="#4a3a24" stroke-width="10" fill="none"/>').join('')+
   '<path d="M40 130 Q120 90 170 110 T270 70" stroke="#ff6a20" stroke-width="8" fill="none"/><rect x="176" y="96" width="60" height="12" fill="#4a4850"/><polygon points="236,96 256,104 236,112" fill="#ff6a20"/><circle cx="160" cy="92" r="10" fill="#e05a2a"/>'+[0,1,2,3,4,5].map(i=>'<circle cx="'+(150+i*16)+'" cy="'+(40+Math.sin(i)*8)+'" r="3" fill="#d8ff8a" stroke="none"/>').join('')),
 most:LB('<rect x="0" y="0" width="300" height="150" fill="#3a1a18"/><rect x="0" y="100" width="300" height="50" fill="#ff6a20"/><line x1="0" y1="70" x2="300" y2="70" stroke="#4a4a52" stroke-width="4"/>'+[0,1,2,3,4,5,6,7,8].map(i=>'<rect x="'+(8+i*32)+'" y="70" width="26" height="8" fill="#8a5a30"/>').join('')+
   '<rect x="130" y="78" width="40" height="40" fill="#6a625c"/><circle cx="150" cy="52" r="16" fill="#9a6a3a"/><path d="M128 40 q22 -20 44 0" fill="none" stroke="#cfe8ff" stroke-width="5"/>'+[0,1,2].map(i=>'<circle cx="'+(110+i*40)+'" cy="'+(18+i*4)+'" r="6" fill="#5ab0ff" stroke="none"/>').join('')+'<ellipse cx="70" cy="30" rx="40" ry="14" fill="#2a2224" stroke="none" opacity=".7"/>'),
 u1:LB('<rect x="0" y="0" width="300" height="150" fill="#e8d8b0"/><ellipse cx="100" cy="100" rx="42" ry="44" fill="#8e8478"/><circle cx="100" cy="46" r="30" fill="#8e8478"/><polygon points="76,26 82,6 92,22" fill="#8e8478"/><polygon points="124,26 118,6 108,22" fill="#8e8478"/><circle cx="90" cy="44" r="6" fill="#ffc93c"/><circle cx="110" cy="44" r="6" fill="#ffc93c"/>'+
   '<rect x="206" y="70" width="20" height="60" fill="#6a7a8a"/><circle cx="216" cy="58" r="14" fill="#e0c0a0"/><line x1="226" y1="80" x2="258" y2="56" stroke="#7a5634" stroke-width="6"/><rect x="248" y="44" width="22" height="16" fill="#55555e"/>'),
 u2:LB('<rect x="0" y="0" width="300" height="150" fill="#e8d8b0"/><ellipse cx="80" cy="100" rx="40" ry="42" fill="#8e8478"/><circle cx="80" cy="48" r="28" fill="#8e8478"/><circle cx="72" cy="46" r="5" fill="#ffc93c"/><circle cx="90" cy="46" r="5" fill="#ffc93c"/><rect x="120" y="60" width="90" height="70" fill="#f4ecd8"/>'+[0,1,2,3].map(i=>'<line x1="128" y1="'+(72+i*14)+'" x2="'+(196-i*8)+'" y2="'+(72+i*14)+'" stroke="#6a5a4a" stroke-width="2"/>').join('')+
   '<line x1="112" y1="80" x2="138" y2="112" stroke="#2a1a10" stroke-width="3"/><rect x="236" y="84" width="16" height="46" fill="#6a7a8a"/><circle cx="244" cy="74" r="11" fill="#e0c0a0"/>'),
 u3:LB('<rect x="0" y="0" width="300" height="150" fill="#e8d8b0"/>'+[0,1,2,3].map(i=>'<rect x="'+(10+i*72)+'" y="20" width="64" height="80" fill="#f4ecd8"/>'+(i<3?'<circle cx="'+(42+i*72)+'" cy="60" r="16" fill="#8e8478"/>':'<rect x="'+(226)+'" y="78" width="30" height="10" fill="#6a7a8a"/><circle cx="220" cy="82" r="7" fill="#e0c0a0"/>')).join('')+
   [0,1,2,3,4].map(i=>'<path d="M'+(30+i*56)+' 128 q10 10 20 0" fill="none" stroke="#2a1a10"/><circle cx="'+(40+i*56)+'" cy="118" r="8" fill="none" stroke="#2a1a10"/>').join('')),
 u4:LB('<rect x="0" y="0" width="300" height="150" fill="#e8d8b0"/><ellipse cx="90" cy="100" rx="40" ry="42" fill="#8e8478"/><circle cx="84" cy="50" r="28" fill="#8e8478"/><path d="M130 110 q30 -40 10 -70" fill="none" stroke="#8e8478" stroke-width="10"/>'+
   '<rect x="200" y="74" width="18" height="56" fill="#6a7a8a"/><circle cx="209" cy="62" r="13" fill="#e0c0a0"/><rect x="160" y="52" width="40" height="30" fill="#f4ecd8"/><line x1="200" y1="82" x2="186" y2="70" stroke="#6a7a8a" stroke-width="6"/>'),
 u5:LB('<rect x="0" y="0" width="300" height="150" fill="#1a1418"/><rect x="138" y="30" width="24" height="110" fill="#2a2228"/><circle cx="150" cy="22" r="14" fill="#d8d4c8"/><polygon points="136,12 142,0 150,10 158,0 164,12" fill="#c8a040"/>'+
   [0,1,2,3,4,5].map(i=>'<circle cx="'+(176+Math.cos(i)*14)+'" cy="'+(80+Math.sin(i)*14)+'" r="4" fill="none" stroke="#c8c8d0" stroke-width="2"/>').join('')+'<line x1="162" y1="60" x2="178" y2="76" stroke="#2a2228" stroke-width="6"/><circle cx="60" cy="110" r="10" fill="#8e8478" opacity=".6"/>')};
Object.assign(LUBOK,{
 sunduk:LB('<rect x="0" y="0" width="300" height="150" fill="#f4e4c0"/><rect x="0" y="120" width="300" height="30" fill="#8ab04a"/><rect x="120" y="30" width="30" height="92" fill="#6a5a4a"/><path d="M135 34 L90 12 M135 40 L190 14" fill="none" stroke-width="6"/><rect x="118" y="10" width="34" height="22" fill="#8a5a2a"/><path d="M122 32 L100 118 M148 32 L170 118" fill="none" stroke="#e0b040" stroke-dasharray="3 3"/><path d="M230 120 Q232 64 256 62 Q280 64 282 120 Z" fill="#6a5a48"/><circle cx="256" cy="78" r="9" fill="#fff"/><circle cx="256" cy="78" r="4" fill="#d8401a"/><circle cx="40" cy="112" r="10" fill="#fff"/><circle cx="62" cy="110" r="11" fill="#fff"/>'),
 zayac:LB('<rect x="0" y="0" width="300" height="150" fill="#f0f4d8"/><rect x="0" y="110" width="300" height="40" fill="#8ab04a"/><ellipse cx="150" cy="104" rx="20" ry="13" fill="#c8b8a0"/><path d="M144 92 L140 66 M156 92 L160 66" fill="none" stroke-width="5"/><circle cx="70" cy="96" r="12" fill="#ff9a66"/><circle cx="230" cy="94" r="14" fill="#e0b27a"/><circle cx="110" cy="70" r="10" fill="#d7a6ec"/><circle cx="196" cy="68" r="9" fill="#8fe0d4"/><path d="M70 96 L110 70 L196 68 L230 94 L150 128 Z" fill="none" stroke="#e0b040" stroke-width="2"/>'),
 yajco:LB('<rect x="0" y="0" width="300" height="150" fill="#3a2408"/><rect x="0" y="0" width="300" height="20" fill="#d8a840"/><rect x="0" y="130" width="300" height="20" fill="#d8a840"/><ellipse cx="150" cy="118" rx="44" ry="10" fill="#a02028"/><rect x="148" y="84" width="4" height="30" fill="#e8f0ff"/><rect x="220" y="80" width="30" height="40" fill="none" stroke="#141018" stroke-width="3"/><circle cx="235" cy="100" r="7" fill="#ffd23a"/><circle cx="60" cy="96" r="12" fill="#8fe0d4"/><path d="M72 96 Q140 90 222 98" fill="none" stroke="#7ad8ff" stroke-dasharray="4 4"/>')});
function buildLukomorye(){
  setTheme('sunset');sky('sunset');W.name='Лукоморье';W.sub='у лукоморья дуб зелёный…';W.camX=12;const F=W.flags;
  const mode=G.done['1-B']&&!G.flags.voiceDone?'festival':G.done['2-B']&&!G.flags.w2done?'festival2':G.done['3-B']&&!G.flags.w3done?'festival3':G.done['4-B']&&!G.flags.w4done?'festival4':G.done['5-B1']&&!G.flags.bezImen?'bezimen':G.hub?'hub':'first';F.mode=mode;F.stage=mode==='first'?'fall':'free';
  ground(-20,20,-19.5,12);ground(-20,20,-24,-19.5,0,MAT.sand,M(0xb89a6a));
  wall(-20.2,-20,-24,12);wall(20,20.2,-24,12);wall(-20.2,20.2,12,12.2);wall(-20.2,20.2,-24.2,-24);
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(700,320),M(0x3a7fb0));sea.rotation.x=-Math.PI/2;sea.position.set(0,-0.45,-184);W.group.add(sea);
  const foam=[];for(let i=0;i<4;i++){const f=addMesh(new THREE.BoxGeometry(44,0.05,0.25),MB(0xf4f8ff,{transparent:true,opacity:0.8}),0,-0.38,-25-i*1.6);f.castShadow=false;foam.push(f);}
  const oak=makeOak(0,-7);
  // витки цепи на дубе: каждый скованный — золотой виток
  const coils=new THREE.Group();coils.position.set(0,0,-7);W.group.add(coils);
  const addCoil=(i,vis)=>{const g=new THREE.Group();for(let k=0;k<14;k++){const a=k/14*Math.PI*2;const r=new THREE.Mesh(new THREE.TorusGeometry(0.12,0.04,6,12),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.5}));
      r.position.set(Math.cos(a)*1.58,1.1+i*0.62+k*0.045,Math.sin(a)*1.58);r.rotation.set(Math.PI/2,a,k%2?Math.PI/2:0);g.add(r);}g.visible=vis!==false;coils.add(g);return g;};
  if(!G.flags.w3done)for(let i=0;i<(G.flags.coils||0);i++)addCoil(i);
  else for(let i=0;i<(G.flags.w5done?5:G.flags.w4done?4:(G.flags.w4c||0));i++)addCoil(i);
  const kot=makeKot();kot.g.position.set(2.3,0,-4.6);kot.g.rotation.y=-0.35;W.cyls.push({x:2.3,z:-4.6,r:0.75,miny:-1,maxy:2.2,on:true});
  // хаб — силуэты: изба Кота, кузня Кузьмы, лавка Векши, пять свёрнутых рушников-карт у моря
  const hut=(x,z,w,d,roof,chim)=>{const hm=W.group.children.length;box(x-w/2,x+w/2,0,2.4,z-d/2,z+d/2,M(0x9a6a3c));const rg=new THREE.ConeGeometry(Math.max(w,d)*0.8,1.8,4);rg.rotateY(Math.PI/4);addMesh(rg,M(roof),x,3.3,z);
    if(chim)addMesh(new THREE.BoxGeometry(0.5,1.6,0.5),MAT.stone,x+w*0.25,3.8,z);addMesh(new THREE.BoxGeometry(0.9,1.5,0.1),M(0x4a2a14),x,0.75,z+d/2+0.05);fadeable(since(hm));};
  hut(-12,-4,4,3.6,0x6b3f22,false);hut(12.5,-3,3.6,3.4,0x5a4a44,true);hut(11,6,3,2.8,0x9a4a6a,false);
  const kuz=makeKuzma();kuz.g.position.set(10.2,0,-0.6);kuz.g.rotation.y=-0.6;W.cyls.push({x:10.2,z:-0.6,r:0.6,miny:-1,maxy:2,on:true});
  const anvil=new THREE.Group();anvil.position.set(8.6,0,0.6);W.group.add(anvil);addMesh(new THREE.BoxGeometry(0.5,0.6,0.5),M(0x5a3a1a),0,0.3,0,anvil);addMesh(new THREE.BoxGeometry(0.9,0.28,0.42),M(0x3a3a44),0,0.74,0,anvil);
  const blank=addMesh(new THREE.BoxGeometry(0.34,0.08,0.14),M(0xff8a3a,{emissive:0xff5010,emissiveIntensity:0.9}),0,0.92,0,anvil);W.cyls.push({x:8.6,z:0.6,r:0.5,miny:-1,maxy:0.9,on:true});
  // у самого моря — волшебный стан: резная арка под хохлому, жар-птица на макушке, золотое веретено с вышитым рушником; из него раскатывается карта
  const loom=new THREE.Group();loom.position.set(0,0,-22.6);W.group.add(loom);const LM={stone:M(0xc8bea8),red:M(0xb8201a,{emissive:0x400800,emissiveIntensity:0.35}),gold:M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.7}),blk:M(0x1a1410)};
  addMesh(new THREE.CylinderGeometry(2.3,2.5,0.3,36),LM.stone,0,0.15,0,loom);addMesh(new THREE.CylinderGeometry(1.75,1.95,0.3,36),LM.stone,0,0.45,0,loom);
  {const rim=addMesh(new THREE.TorusGeometry(1.85,0.05,6,44),LM.gold,0,0.61,0,loom);rim.rotation.x=Math.PI/2;const rim2=addMesh(new THREE.TorusGeometry(2.4,0.04,6,44),LM.gold,0,0.31,0,loom);rim2.rotation.x=Math.PI/2;}
  W.cyls.push({x:0,z:-22.6,r:2.35,miny:-1,maxy:0.3,on:true});W.cyls.push({x:0,z:-22.6,r:1.8,miny:-1,maxy:0.6,on:true});
  for(const s of[-1,1]){addMesh(new THREE.CylinderGeometry(0.2,0.26,3.4,12),LM.red,s*1.55,2.3,-0.2,loom);for(let k=0;k<4;k++){const t=addMesh(new THREE.TorusGeometry(0.24,0.05,6,16),LM.gold,s*1.55,1.1+k*0.82,-0.2,loom);t.rotation.x=Math.PI/2;}
    for(let k=0;k<3;k++)addMesh(new THREE.SphereGeometry(0.07,8,6),LM.blk,s*1.55+s*0.2,1.5+k*0.82,0.0,loom);W.cyls.push({x:s*1.55,z:-22.8,r:0.3,miny:-1,maxy:4,on:true});}
  addMesh(new THREE.TorusGeometry(1.55,0.14,10,28,Math.PI),LM.red,0,4.0,-0.2,loom);
  for(let i=0;i<11;i++){const a=i/10*Math.PI;const lf=addMesh(new THREE.SphereGeometry(0.12,8,6),i%2?LM.gold:LM.blk,Math.cos(a)*1.55,4.0+Math.sin(a)*1.55,-0.05,loom);lf.scale.set(1,1.9,0.5);lf.rotation.z=a;}
  const bird=new THREE.Group();bird.position.set(0,5.75,-0.2);loom.add(bird);{const bm=M(0xffb030,{emissive:0xff6a00,emissiveIntensity:0.8});part(bird,new THREE.SphereGeometry(0.3,12,10),bm,0,0,0).scale.set(1,0.85,1.3);part(bird,new THREE.SphereGeometry(0.17,10,8),bm,0,0.28,0.3);
    const bk=new THREE.ConeGeometry(0.05,0.18,6);bk.rotateX(Math.PI/2);part(bird,bk,LM.gold,0,0.26,0.5);for(let i=0;i<5;i++){const f=new THREE.ConeGeometry(0.08,0.9,6);f.translate(0,0.45,0);const m=part(bird,f,i%2?LM.gold:bm,0,0,-0.3);m.rotation.x=-2.2;m.rotation.z=(i-2)*0.32;}}
  const spindle=new THREE.Group();spindle.position.set(0,2.35,-0.2);loom.add(spindle);
  {const rod=new THREE.CylinderGeometry(0.06,0.06,3.1,8);rod.rotateZ(Math.PI/2);addMesh(rod,LM.gold,0,0,0,spindle);const roll=new THREE.CylinderGeometry(0.44,0.44,2.2,22);roll.rotateZ(Math.PI/2);addMesh(roll,M(0xf4ecd8),0,0,0,spindle);
    for(const x of[-0.9,-0.3,0.3,0.9]){const t=addMesh(new THREE.TorusGeometry(0.45,0.05,6,18),LM.red,x,0,0,spindle);t.rotation.y=Math.PI/2;}for(const s of[-1,1]){const c=new THREE.ConeGeometry(0.12,0.5,10);c.rotateZ(-s*Math.PI/2);addMesh(c,LM.gold,s*1.75,0,0,spindle);}}
  const flap=new THREE.Mesh(new THREE.PlaneGeometry(2.0,1.7),new THREE.MeshLambertMaterial({map:rushnikTex(0,256,220,'flap'),side:THREE.DoubleSide}));flap.position.set(0,1.45,0.26);loom.add(flap);
  const WCOL=[0x3ac04a,0x3a8aff,0xd0a0ff,0xff6a2a,0xffd23a],gems=[];
  for(let i=0;i<5;i++){const a=Math.PI*(0.14+i*0.18),x=Math.cos(a)*2.1,z=Math.sin(a)*2.1;const open=i===0||(i===1&&!!G.flags.voiceDone)||(i===2&&!!G.flags.w2done)||(i===3&&!!G.flags.w3done)||(i===4&&!!G.flags.w4done);
    addMesh(new THREE.CylinderGeometry(0.11,0.15,0.34,8),LM.stone,x,0.47,z,loom);const gm=M(open?WCOL[i]:0x6a6a70,{emissive:open?WCOL[i]:0x000000,emissiveIntensity:open?0.8:0});gems.push({m:addMesh(new THREE.OctahedronGeometry(0.2),gm,x,0.95,z,loom),open,i});}
  const motes=[];for(let i=0;i<18;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(0.05,6,5),MB(i%3?0xffe08a:0xfff8e0,{transparent:true,opacity:0.9}));W.group.add(m);motes.push({m,a:rand(0,6.3),r:rand(1.2,2.8),y:rand(0.8,4.6),s:rand(0.4,1)});}
  // каменная тропка от дуба к стану, ракушки и фонари-огоньки на берегу
  for(let z=-11.5;z>-19.8;z-=0.95)addMesh(new THREE.CylinderGeometry(rand(0.34,0.44),rand(0.36,0.46),0.06,9),M(0xb0a898),rand(-0.25,0.25),0.03,z).castShadow=false;
  for(let i=0;i<14;i++){const x=rand(-18,18),z=rand(-23.6,-19.8);if(Math.abs(x)<3)continue;const sh=addMesh(new THREE.SphereGeometry(rand(0.1,0.17),8,6,0,Math.PI*2,0,Math.PI/2),M([0xf4d8c8,0xffc0b0,0xf0e8d8][i%3]),x,0.02,z);sh.scale.set(1,0.5,1.3);sh.rotation.y=rand(0,3);}
  const lamps=[];for(const s of[-1,1]){addMesh(new THREE.CylinderGeometry(0.07,0.09,2.4,8),LM.red,s*3.3,1.2,-21.4);addMesh(new THREE.SphereGeometry(0.12,8,6),LM.gold,s*3.3,2.45,-21.4);const o=addMesh(new THREE.SphereGeometry(0.22,12,10),MB(0xffe08a,{transparent:true,opacity:0.95}),s*3.3,2.85,-21.4);lamps.push(o);W.cyls.push({x:s*3.3,z:-21.4,r:0.2,miny:-1,maxy:2.6,on:true});}
  {const gl=new THREE.PointLight(0xffc860,0.9,10,2);gl.position.set(0,3,-21.6);W.group.add(gl);}
  const rush=[loom];let loomSpin=0;
  W.updates.push(dt=>{const unroll=map.visible&&map.scale.z<0.985;if(unroll)loomSpin=Math.max(loomSpin,5);loomSpin=damp(loomSpin,0.35,1.2,dt);spindle.rotation.x-=dt*loomSpin;
    flap.visible=!map.visible||map.scale.z<0.2;bird.position.y=5.75+Math.sin(G.time*1.6)*0.06;bird.rotation.y=Math.sin(G.time*0.7)*0.4;
    gems.forEach(g=>{if(g.open){g.m.material.emissiveIntensity=0.6+0.35*Math.sin(G.time*3+g.i);g.m.rotation.y+=dt*1.5;g.m.position.y=0.95+Math.sin(G.time*2+g.i)*0.06;}});
    lamps.forEach((o,i)=>{o.scale.setScalar(1+0.08*Math.sin(G.time*4+i*2));});
    motes.forEach(q=>{q.a+=dt*q.s*(1+loomSpin*0.4);q.m.position.set(Math.cos(q.a)*q.r,q.y+Math.sin(G.time*2+q.a)*0.2,-22.6+Math.sin(q.a)*q.r*0.6);q.m.material.opacity=0.5+0.4*Math.sin(G.time*5+q.a*3);});
    if(unroll&&Math.random()<0.5)burst(new V3(rand(-1,1),2.3,-22.2),0xffd76a,2,2.2);});
  edgeTrees(-14,12,-20,20);
  const Z=makeZven();W.zven=Z;Z.mode='script';Z.vis=true;Z.pos.set(0,9,3);
  W.zvenFree=true;W.zvenGoal=()=>{const a=active(0),b=active(1);return new V3((a.pos.x+b.pos.x)/2,2.4,(a.pos.z+b.pos.z)/2-2.4);};
  /* ---------- карта-рушник: пять миров вышиты картинками ---------- */
  const map=new THREE.Group();map.position.set(0,0.03,-20.4);W.group.add(map);const icons=[];
  {const cl=new THREE.BoxGeometry(11,0.04,5);cl.translate(0,0,2.5);addMesh(cl,M(0xf4ecd8),0,0,0,map).castShadow=false;
    for(const z of[0.3,4.7]){const s=new THREE.BoxGeometry(11,0.05,0.25);s.translate(0,0,z);addMesh(s,M(0xc0302a),0,0.01,0,map);}
    const vign=(x,build,on)=>{const g=new THREE.Group();g.position.set(x,0.05,2.5);map.add(g);build(g);if(!on)g.traverse(o=>{if(o.isMesh)o.material=M(0x9a948a);});g.scale.set(1,0.08,1);icons.push(g);return g;};
    vign(-4.2,g=>{for(const[x,z,s]of[[-0.35,0.2,1],[0.3,-0.2,1.2],[0.45,0.45,0.8]]){addMesh(new THREE.ConeGeometry(0.34*s,0.9*s,6),M(0x2f7a3a,{emissive:0x1a5020,emissiveIntensity:0.4}),x,0.45*s,z,g);}},true);   // 1 Дремучий лес
    vign(-2.1,g=>{addMesh(new THREE.CylinderGeometry(0.7,0.7,0.04,16),M(0x3a6ad0),0,0.02,0,g);for(const x of[-0.2,0.25]){addMesh(new THREE.CylinderGeometry(0.1,0.12,0.4,8),M(0xf4f0e8),x,0.22,0,g);addMesh(new THREE.SphereGeometry(0.14,10,8),M(COL.gold),x,0.5,0,g);}},!!G.flags.voiceDone);   // 2 Подводный Китеж
    vign(0,g=>{for(const dx of[-0.3,0.05,0.35])addMesh(new THREE.SphereGeometry(0.26,8,6),M(0xf0f4ff),dx,0.35,0,g);addMesh(new THREE.CylinderGeometry(0.08,0.1,0.6,6),M(0xd0a0ff),0,0.7,-0.1,g);},!!G.flags.w2done);      // 3 Небесное царство
    vign(2.1,g=>{const r=addMesh(new THREE.BoxGeometry(1.3,0.05,0.34),M(0xff6a2a,{emissive:0xff3000,emissiveIntensity:0.5}),0,0.03,0,g);r.rotation.y=0.3;addMesh(new THREE.BoxGeometry(0.2,0.12,0.9),M(0x6b4a2b),0,0.1,0,g);},!!G.flags.w3done);   // 4 Огненная Смородина
    vign(4.2,g=>{addMesh(new THREE.CylinderGeometry(0.6,0.7,0.12,12),M(0xd9b060),0,0.06,0,g);addMesh(new THREE.CylinderGeometry(0.06,0.08,0.4,6),M(0x6b4a2b),0,0.3,0,g);addMesh(new THREE.SphereGeometry(0.26,8,6),M(0x4f7a2c),0,0.6,0,g);},!!G.flags.w4done);   // 5 Остров Буян
  }
  map.scale.set(1,1,0.01);map.visible=false;
  W.kot=kot;W.oak=oak;
  const mute=!!G.flags.voiceDone;
  W.linkLabel=()=>{if(mode==='first')return null;const w=curWorld(),gate=(w===1?G.flags.forged:w===2?G.flags.forged2:w===3?G.flags.forged3:w===4?G.flags.forged4:G.flags.forged5),pl=pendingLinks();return 'Мир '+w+' · выковано '+(G.forgedW[w]||0)+(gate?'':' / '+GATE(w))+(pl>0?' · к ковке +'+pl:'')+'  ·  '+ICO_NUT+' '+nutsAvail()+'  ·  '+ICO_GEM+' '+gemsAvail();};
  W.updates.push(dt=>{
    foam.forEach((f,i)=>{f.position.z=-24.6-((G.time*0.5+i*0.4)%1.6);f.material.opacity=0.8*Math.sin(((G.time*0.5+i*0.4)%1.6)/1.6*Math.PI);});
    kot.tail.forEach((t,i)=>{const a=0.4+i*0.33+Math.sin(G.time*1.4-i*0.4)*0.12*(i/6);t.position.set(Math.sin(a)*0.62,0.12+i*0.02,-Math.cos(a)*0.62+0.1);});
    if(F.stage==='free'){F.blink=(F.blink||0)-dt;if(F.blink<0){F.blink=rand(2.5,5);kot.lids.forEach(l=>anim(0.18,k=>{l.rotation.x=lerp(-0.5,1.3,Math.sin(k*Math.PI));}));}
      if(G.flags.kotVoice){F.meow=(F.meow||5)-dt;if(F.meow<0&&HEROES.some(h=>hd(h.pos,kot.g.position)<5)){F.meow=rand(6,9);bark(kot,'kot',['…у лукоморья дуб зелёный…','Садитесь в круг — начну рассказ!','А вот ещё: про ёжика-храбреца,<br>Что по облаку гулял без конца…','Идёт направо — песнь заводит,<br>Налево — сказку говорит!','…А третья, коротка, как миг, —<br>Про три головы, про их спор и крик…'][Math.floor(rand(0,5))],2.4);}}
      else if(G.flags.w3done&&(G.flags.w4c||G.flags.w4done)){F.meow=(F.meow||6)-dt;if(F.meow<0&&HEROES.some(h=>hd(h.pos,kot.g.position)<4)){F.meow=rand(8,12);const L=['<i>(шёпотом)</i> …у лукоморья…','<i>(шёпотом)</i> …дуб зелёный…','<i>(шёпотом)</i> …златая цепь…','<i>(шёпотом)</i> …и днём и ночью…'];bark(kot,'kot',L[Math.floor(rand(0,Math.min(4,(G.flags.w4done?4:G.flags.w4c)+1)))],1.8);}}
      if(mute&&!G.flags.w3done){F.meow=(F.meow||6)-dt;if(F.meow<0&&HEROES.some(h=>hd(h.pos,kot.g.position)<4)){F.meow=rand(8,12);if(G.flags.w2done)bark(kot,'kot',['<i>(шёпотом)</i> …в некотором…','<i>(шёпотом)</i> …жар-птица…','<i>(шёпотом)</i> …перо…','<i>(шёпотом)</i> …соловей…'][Math.floor(rand(0,4))],1.8);else bark(kot,'kot','Мяу.',1.4);}}}
    kuz.arm.rotation.x=F.forging?0:Math.sin(G.time*1.2)*0.1;
    // у моря — карта-рушник (A)
    if(F.stage==='free'&&!G.ui&&!F.rushnik){for(const pi of[0,1]){const h=active(pi);if(h.pos.z<-17.2&&tap(pi,'jump')){
        if(mode==='first'){F.rushnik=true;SFX.whoosh();map.visible=true;anim(1.4,k=>{map.scale.z=Math.max(0.01,smooth(k));});later(1.5,mapScene);}
        else if(G.flags.voiceDone&&!G.flags.w2intro&&!G.flags.w2done){F.rushnik=true;w2Intro();}
        else if(G.flags.w2done&&!G.flags.w3intro&&!G.flags.w3done){F.rushnik=true;w3Intro();}
        else if(G.flags.w3done&&!G.flags.w4intro&&!G.flags.w4done){F.rushnik=true;w4Intro();}
        else if(G.flags.w4done&&!G.flags.w5intro&&!G.flags.w5done){F.rushnik=true;w5Intro();}
        else{SFX.whoosh();openMap(pi);}break;}}}
    // кузня: Прошка у наковальни — удар (X)
    const pr=HERO.proshka;if(F.stage==='free'&&!G.ui&&!F.forging&&pr.active&&hd(pr.pos,anvil.position)<2.2&&tap(0,'attack')){
      if(coilPending())coilGame();
      else if(pendingLinks()>0)forgeGame();
      else if(G.flags.w3done&&!G.done['4-1']){bark(kuz,'kuzma','Цепь порвана — не срастить никак<br>Без Демьяновых клещей, вот так.',2.6);}
      else if(G.flags.w5done){bark(kuz,'kuzma','Цепь цела. Ступай, мастер, на покой.',2.2);}
      else if(G.flags.w4done&&G.flags.forged5){bark(kuz,'kuzma','Ворота терема открыты — ступай.',2);}
      else if(G.flags.w4done&&worldLinks(5)===0){bark(kuz,'kuzma','Полцепи сковано. Путь — на Буян.',2.2);}
      else if(curWorld()===1?G.flags.forged:curWorld()===2?G.flags.forged2:curWorld()===3?G.flags.forged3:curWorld()===4?G.flags.forged4:G.flags.forged5){bark(kuz,'kuzma',curWorld()===4?'Узда при вас — клещами её берите.':'Ворота настежь — в путь ступай.',1.8);}
      else{bark(kuz,'kuzma','Руки есть. А голова? Поглядим сперва.',2.4);tip(0,'Нечего пока ковать. '+(curWorld()===1?'К Лешему':curWorld()===2?'К Водяному':curWorld()===3?'К Соловью':curWorld()===4?'К Горынычу':'В терем')+' ворота открыть —<br>'+GATE(curWorld())+' звеньев мира надобно скрепить. Сейчас '+(G.forgedW[curWorld()]||0)+' / '+GATE(curWorld()),3);}}
    else if(F.stage==='free'&&!G.ui&&tap(1,'attack')&&hd(active(1).pos,anvil.position)<2.6)tip(1,'Ковать будет Прошка — ему молот под стать:<br>Это дело его — ему и ковать.',2);});
  for(const pi of[0,1]){prompt(pi,'jump',()=>headOf(active(pi)),()=>F.stage==='free'&&!G.ui&&!F.rushnik&&active(pi).pos.z<-17.2,'карта');}
  prompt(0,'attack',()=>headOf(HERO.proshka),()=>F.stage==='free'&&!G.ui&&!F.forging&&HERO.proshka.active&&hd(HERO.proshka.pos,anvil.position)<2.2&&(pendingLinks()>0||coilPending()),()=>coilPending()?'чинить цепь':'ковать звенья');
  prompt(0,'attack',()=>new V3(8.6,2.2,0.6),()=>F.forging&&G.ui==='forge','в такт');
  const mapObj=pi=>O(()=>mode==='first'?'Лукоморье! Погуляйте на просторе.<br>Стан с рушником стоит у самого моря — подойди и нажми '+K(pi,'jump')+'.':'Стан у моря — '+K(pi,'jump')+(pendingLinks()>0?' · Прошку ждёт Кузьма со звеньями — '+K(0,'attack')+'<br>':' ·<br>')+'Векша, Кот, огород да Ряба — подойди и жми '+K(pi,'attack')+'.',()=>F.rushnik,()=>[rush[0]]);
  for(const pi of[0,1])W.objectives[pi]=[mapObj(pi),O('Рушник раскатывается…',()=>false,()=>[])];
  if(mode==='first'){W.spawns=[[new V3(-4.4,0,4.4),new V3(-2.2,0,5.4)],[new V3(2.2,0,5.4),new V3(4.4,0,4.4)]];}
  else{W.spawns=[[new V3(-2.4,0,-14.5),new V3(-4.2,0,-13.8)],[new V3(2.4,0,-14.5),new V3(4.2,0,-13.8)]];W.spawnFace=[[Math.PI,Math.PI],[Math.PI,Math.PI]];}
  W.startAct=[players[0].act,players[1].act];
  W.pauseLine=mode==='first'?'У лукоморья мы стоим:<br>Дуб пуст — цепь сорвана над ним.<br>Кот присказку сказал с утра,<br>Да не поняла её детвора.'
    :'Рушник-карта у моря — выбирай и мир, и путь.<br>Кузьма звенья куёт: двенадцать — чтоб к хозяину мира ворота распахнуть.<br>Орешки — Векше за наряды несём,<br>Самоцветы — Коту за сказки да Заставе потом.';
  if(mode!=='first'){Z.pos.set(1.0,3.0,-5.5);}
  if(G.flags.w3done&&!G.flags.zvenBack){Z.vis=false;Z.pos.set(0,-40,0);W.zvenAway=false;W.zvenGoal=()=>new V3(0,-40,0);}   // в хабе Звенышко отдыхает на ветке дуба, рядом с Котом
  W.onStart=()=>{if(mode==='first')lukoScene();else if(mode==='festival')festival();else if(mode==='festival2')festival2();else if(mode==='festival3')festival3();else if(mode==='festival4')festival4();else if(mode==='bezimen')bezImen();else hubHello();};
  /* ---------- первый раз: ролик карты — пять миров, Звенышко ныряет в Мир 1 ---------- */
  function mapScene(){const T=HERO;F.stage='map';
    play({dur:12.5,fov:46,shots:[shot(0,[0,6.5,-12.5],[0,0,-18.5],[0,4.2,-15.2],[0,0,-18.6],3.2),shot(4.4,[-3.6,2.6,-15.6],[-4.2,0.2,-18.5]),shot(7.8,[0,5,-13],[-4.2,0,-18.5])],
      says:[[0.4,3.8,null,'<i>Пять миров на рушнике расшиты:</i><br><i>Лес, Китеж, Небо, Смородина, Буян — все честь по чести.</i>',true],
        [4.6,3,'zven','Первым — лес! За нити крепче держись!'],[8.2,3.2,null,'<i>Звенышко — нырь! — в вышитый лес,</i><br><i>И четверых утянуло с ним в край чудес.</i>',true]],
      events:[{t:0.2,fn:()=>{icons.forEach((g,i)=>anim(0.9,k=>{g.scale.y=lerp(0.08,1,smooth(k));}),0);SFX.grow();}},
        {t:1.2,fn:()=>{icons.forEach((g,i)=>later(i*0.35,()=>{burst(new V3(-4.2+i*2.1,0.6,-18.5),i?0xd8d0c0:0x7ee08a,8,2);SFX.flower();}));}},
        {t:4.4,fn:()=>{Z.mode='script';}},
        {t:7.6,fn:()=>{const from=Z.pos.clone(),to=new V3(-4.2,0.4,-18.5);anim(1.1,k=>{Z.pos.lerpVectors(from,to,k*k);Z.pos.y+=Math.sin(k*Math.PI)*1.6;});later(1.1,()=>{zvenRing();ringFx(to,COL.gold,3);burst(to,COL.gold,20,5);Z.vis=false;SFX.whoosh();});}},
        {t:9.0,fn:()=>{HEROES.forEach((h,i)=>{const from=h.pos.clone(),to=new V3(-4.2,0.3,-18.5);anim(1.6,k=>{const q=smooth(k);h.pos.lerpVectors(from,to,q);h.pos.y+=Math.sin(q*Math.PI)*1.2;h.g.scale.setScalar(Math.max(0.05,1-q*0.95));h.face+=0.25;});});
          for(let i=0;i<6;i++)later(i*0.2,()=>ringFx(new V3(-4.2,0.3,-18.5),[COL.gold,0x7ee08a][i%2],1.5+i*0.4));}},
        {t:10.8,fn:()=>{$('flash').style.transition='opacity .6s';$('flash').style.opacity=1;}}],
      tick:(t)=>{if(t>=4.4&&t<7.6)Z.pos.set(-4.2+Math.sin(t*2)*0.8,2.2+Math.sin(t*3)*0.2,-17.2);},
      end:()=>{G.flags.map1=true;G.hub=true;HEROES.forEach(h=>h.g.scale.setScalar(1));goLevel('1-1');setTimeout(()=>{$('flash').style.opacity=0;},700);}});}
  function hubHello(){const w=curWorld(),n=(WL[w]||W1).filter(id=>G.done[id]).length;
    if(G.flags.showFinal){G.flags.showFinal=false;later(1.2,()=>showMenu('end'));return;}
    if(G.flags.w5done){later(0.8,()=>bark(kot,'kot','Садитесь — начну рассказ! Всё могу я вам поведать —<br>Всё-всё, что было и что будет…',3));return;}
    if(G.done['5-3']&&!G.flags.sand){sandScene();return;}
    if(G.flags.w4done){if(pendingLinks()>0)later(0.8,()=>bark(kuz,'kuzma','Прошка! Звенья Буяна — к наковальне, куём!',2.4));else if(G.flags.bezImen)later(0.8,()=>say('pelageya','Я сама ему расскажу. А карта — у моря, там, где волна.',2.6));
      else if(G.flags.zvenBack)later(0.8,()=>say('zven',G.flags.forged5?'Дзинь! Терема ворота настежь — карта ждёт у моря!':'Дзинь! Я снова с вами — вот и чудо!<br>Кузьме девять звеньев Буяна — на терем, покуда!',3,true));
      else if(G.flags.w5intro)later(0.8,()=>say('pelageya','…дальше — по сказке путь, а карта у моря — не забудь.',2.6));else later(0.8,()=>say('pelageya','Горыныч проснулся — вот так весть!<br>Карта у моря — на Буян, в путь, как есть!',2.6));return;}
    if(pendingLinks()>0)later(0.8,()=>{bark(kuz,'kuzma','Прошка! Неси звенья — куём, пока горячо!',2.4);});
    else if(G.flags.w4done)later(0.8,()=>say('pelageya','Горыныч у моря дремлет сладко.<br>Дальше — Остров Буян. Скоро, ребятки.',3));
    else if(coilPending())later(0.8,()=>{bark(kuz,'kuzma','Прошка! Демьяновы клещи — цепь чинить пора!',2.6);});
    else if(G.flags.w3done&&!G.flags.w4intro)later(0.8,()=>say('pelageya','Звенышка нет… Тетрадка — при мне одна.<br>Карта у моря — туда и дорога нам.',3.2));
    else if(G.flags.w3done)later(0.8,()=>say('pelageya',n<5?'…дальше — Смородина-река огневая.<br>Карта у моря — дорога прямая.':'…Горыныч живёт за Калиновым мостом.',3));
    else if(w===2&&!G.flags.w2intro)later(0.8,()=>say('zven','Карта ждёт у моря! Второй мир — Китеж подводный, чудный!',2.6,true));
    else if(w===3&&!G.flags.w3intro)later(0.8,()=>say('zven','Карта ждёт у моря! Третий мир — Небесное царство, облачное!',2.6,true));
    else if(w===3)later(0.8,()=>say('zven',n<5?'Карта ждёт у моря — в Небесное царство путь лежит!':'Небо снова светлое — теперь к Соловью, скорей!',2.4,true));
    else later(0.8,()=>say('zven',w===1?(n<5?'Карта ждёт у моря — дальше в лес дремучий!':'Все тропы лесные пройдены — к Лешему, к нему!'):(n<5?'Карта ждёт у моря — дальше в Китеж-град!':'Китежа колокола звонят — теперь к Водяному, вниз!'),2.4,true));}
  /* ---------- кузня перед боссом: «Не лупи. Слушай металл.» ---------- */
  function forgeScene(){F.forging=true;const T=HERO,pr=T.proshka;placeOnGround(pr,7.9,1.5,0);pr.face=Math.atan2(8.6-7.9,0.6-1.5);
    const strike=(who,ok)=>{anim(0.3,k=>{(who===kuz?kuz.arm:kuz.arm).rotation.x=who===kuz?-Math.sin(k*Math.PI)*1.3:0;});if(who===pr){pr.atkT=0.28;}
      later(0.15,()=>{if(ok){SFX.hammer();burst(new V3(8.6,1.0,0.6),0xffb040,12,4);blank.material.emissiveIntensity=1.4;}else{SFX.clink();floatText(new V3(8.6,1.6,0.6),'мимо','#dddddd');}});};
    play({dur:15,fov:46,shots:[shot(0,[6.2,2.4,4.2],[8.8,0.9,0.4]),shot(6.8,[7.6,1.6,2.8],[8.4,1.1,0.8]),shot(11,[5,3,5],[9,1,-0.6])],
      says:[[0.3,3,null,'<i>Прошка держит заготовку сам</i><br><i>И стучит — раз, два, три — в лад с Кузьмой, по часам.</i>',true],[4.4,1.2,'proshka','Хэк!'],
        [5.6,3.4,null,'<i>Первый удар — мимо. Кузьма тут как тут:</i><br><i>Лапу поправил — вот так и куют.</i>',true],[7.2,2.8,'kuzma','Не лупи сплеча. Послушай, как поёт металл.'],[11.2,3,null,'<i>С ворот к Лешему цепь — долой, упала вниз.</i>',true]],
      events:[{t:3.0,fn:()=>strike(kuz,true)},{t:4.4,fn:()=>strike(pr,false)},{t:7.2,fn:()=>strike(kuz,true)},{t:8.4,fn:()=>strike(pr,true)},{t:9.4,fn:()=>strike(kuz,true)},{t:10.4,fn:()=>strike(pr,true)},
        {t:11.2,fn:()=>{SFX.gate();SFX.ok();G.flags.forged=true;banner('Отворились ворота 1-Б!','#ffd76a',2.6,'на рушнике-карте — Леший-Путаник, гляди!');}}],
      end:()=>{F.forging=false;kuz.arm.rotation.x=0;}});}
  /* ---------- Мир 2: вступление Пелагеи по тетрадке, пантомима Кота, ролик рушника — Звенышко ныряет в Китеж ---------- */
  function w2Intro(){F.stage='w2intro';const T=HERO,pe=T.pelageya,yo=T.yosha;HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,-14.6,0);h.face=Math.atan2(2.3-h.pos.x,-4.6-h.pos.z);});
    const nb=makeNotebook();nb.g.scale.setScalar(0.9);nb.g.position.set(pe.pos.x+Math.sin(pe.face)*0.55,0.7,pe.pos.z+Math.cos(pe.face)*0.55);nb.g.rotation.y=pe.face;
    play({dur:17.4,fov:46,shots:[shot(0,[pe.pos.x+2.2,1.5,pe.pos.z+1.8],[pe.pos.x,0.9,pe.pos.z]),shot(7.2,[5.8,2.4,-1.2],[2.3,1.6,-4.6]),shot(10.8,[1,3.6,-9],[yo.pos.x,0.3,-20])],
      says:[[0.3,3.2,null,'<i>Пелагея тетрадку открывает</i><br><i>И шёпотом тихонько читает.</i>',true],[3.6,3.6,'pelageya','<i>(шёпотом)</i> …Кот говорил: под водой, в глубине,<br>Есть город, что звонить забыл во сне.'],
        [7.4,3.4,null,'<i>Кот лапой машет к морю, показывает путь:</i><br><i>Мол, поплывём — изображает как-нибудь.</i>',true],[11,1.8,'yosha','Купаться! Ура-а! Вот так чудеса!'],[13,3.4,null,'<i>Йоша понял по-своему — и к морю бегом, вприпрыжку!</i>',true]],
      events:[{t:7.4,fn:()=>{anim(3.2,k=>{kot.body.rotation.z=Math.sin(k*Math.PI*6)*0.3;kot.head.rotation.y=Math.sin(k*Math.PI*3)*0.6-0.4;});bark(kot,'kot','Мяу-мяу!',1.4);}},
        {t:11,fn:()=>{const from=yo.pos.clone();yo.face=Math.PI;anim(4,k=>{yo.pos.set(from.x,0,lerp(from.z,-23.2,smooth(k)));});later(3.6,()=>{SFX.splash();burst(new V3(yo.pos.x,0,-23.4),0xcff8ff,16,4);});}}],
      tick:(t)=>{pe.body.position.y=t>3.6&&t<7.2?Math.abs(Math.sin(t*9))*0.03:0;},
      end:()=>{W.anims.length=0;W.group.remove(nb.g);kot.body.rotation.z=0;kot.head.rotation.y=0;pe.body.position.y=0;G.flags.w2intro=true;later(0.2,mapScene2);}});}
  function mapScene2(){const Zv=W.zven;F.stage='map';F.rushnik=true;map.visible=true;map.scale.z=0.01;anim(1.2,k=>{map.scale.z=Math.max(0.01,smooth(k));});
    icons.forEach(g=>{g.scale.y=1;});HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-16.2,0);h.face=Math.PI;});Zv.mode='script';Zv.vis=true;Zv.pos.set(0,3,-15);
    play({dur:11.4,fov:46,shots:[shot(0,[0,6.5,-12.5],[0,0,-18.5]),shot(4,[-1.4,2.6,-15.6],[-2.1,0.2,-18.5])],
      says:[[0.4,3.4,null,'<i>Зелёный лес на рушнике пройден уж давно,</i><br><i>А рядом Китеж голубеет — вышит полотном.</i>',true],[4,3,'zven','Второй — Китеж! Там молчать нельзя, запомни!'],[7.6,3,null,'<i>Звенышко в вышитую воду — нырь!</i><br><i>И четверых за ним утянуло вглубь.</i>',true]],
      events:[{t:6.9,fn:()=>{const from=Zv.pos.clone(),to=new V3(-2.1,0.4,-18.5);anim(1.1,k=>{Zv.pos.lerpVectors(from,to,k*k);Zv.pos.y+=Math.sin(k*Math.PI)*1.6;});later(1.1,()=>{zvenRing();ringFx(to,0x7ad8ff,3);burst(to,0x9ae0ff,20,5);Zv.vis=false;SFX.splash();});}},
        {t:8.1,fn:()=>{HEROES.forEach(h=>{const from=h.pos.clone(),to=new V3(-2.1,0.3,-18.5);anim(1.6,k=>{const q=smooth(k);h.pos.lerpVectors(from,to,q);h.pos.y+=Math.sin(q*Math.PI)*1.2;h.g.scale.setScalar(Math.max(0.05,1-q*0.95));h.face+=0.25;});});
          for(let i=0;i<6;i++)later(i*0.2,()=>ringFx(new V3(-2.1,0.3,-18.5),[0x7ad8ff,COL.gold][i%2],1.5+i*0.4));}},{t:10,fn:()=>{$('flash').style.transition='opacity .6s';$('flash').style.opacity=1;}}],
      tick:(t)=>{if(t>=4&&t<6.9)Zv.pos.set(-2.1+Math.sin(t*2)*0.8,2.2+Math.sin(t*3)*0.2,-17.2);},
      end:()=>{G.flags.map2=true;HEROES.forEach(h=>h.g.scale.setScalar(1));goLevel('2-1');setTimeout(()=>{$('flash').style.opacity=0;},700);}});}
  /* ---------- кузня перед Водяным: Прошка держит молот сам, Кузьма поправляет только последний удар; пантомима Кота — 2 из 3 ---------- */
  function forgeScene2(){F.forging=true;const T=HERO,pr=T.proshka;placeOnGround(pr,7.9,1.5,0);pr.face=Math.atan2(8.6-7.9,0.6-1.5);placeOnGround(T.yosha,4.8,0.2,0);T.yosha.face=Math.PI*0.3;
    const strike=(ok,fix)=>{pr.atkT=0.28;if(fix)anim(0.5,q=>{kuz.arm.rotation.z=Math.sin(q*Math.PI)*0.5;});later(0.15,()=>{if(ok){SFX.hammer();tone(2400,0.5,'triangle',0.2);burst(new V3(8.6,1.0,0.6),0xffb040,12,4);blank.material.emissiveIntensity=1.4;}});};
    play({dur:18.6,fov:46,shots:[shot(0,[6.2,2.4,4.2],[8.8,0.9,0.4]),shot(6.4,[7.6,1.6,2.8],[8.4,1.1,0.8]),shot(10.6,[5.4,2.2,2.4],[2.3,1.7,-4.4]),shot(14.4,[4.2,2.6,3],[-6,1,-24])],
      says:[[0.3,3.2,null,'<i>Прошка второй раз куёт —</i><br><i>Молот сам уже берёт.</i>',true],[3.4,1,'proshka','Хэк!'],[4.6,1,'proshka','Хэк!'],[6.4,3,null,'<i>Кузьма поправит лишь последний удар.</i>',true],[8.6,2,'kuzma','Вот. Слышишь, как звенит?'],
        [10.8,3,null,'<i>Кот мяукнул и лапой на скалу у омута кажет.</i>',true],[13.8,1.2,'kot','Мяу!'],[14.9,2.4,'yosha','Там рыбалка! Ура! Удочку бы мне!'],[17.3,1.3,null,'<i>Ворота к Водяному открыты настежь.</i>',true]],
      events:[{t:3.4,fn:()=>strike(true)},{t:4.6,fn:()=>strike(true)},{t:7.4,fn:()=>strike(true,true)},
        {t:10.8,fn:()=>{anim(3,k=>{kot.body.rotation.y=-0.8*Math.sin(Math.min(1,k*2)*Math.PI/2);kot.head.rotation.y=-0.6;});}},
        {t:14.9,fn:()=>{anim(1.2,k=>{T.yosha.extraY=Math.abs(Math.sin(k*Math.PI*4))*0.3;});}},
        {t:17.3,fn:()=>{SFX.gate();SFX.ok();G.flags.forged2=true;banner('Отворились ворота 2-Б!','#ffd76a',2.6,'на рушнике-карте — Водяной, гляди!');}}],
      end:()=>{F.forging=false;kuz.arm.rotation.x=0;kuz.arm.rotation.z=0;kot.body.rotation.y=0;kot.head.rotation.y=0;T.yosha.extraY=0;G.flags.forged2=true;}});}
  /* ---------- Сказ 2 «Колокола Китежа»: Кот без голоса — Пелагея рассказывает сама, шёпотом ---------- */
  function festival2(){F.stage='fest';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-1.6,0);h.face=Math.PI;});snapCams();
    play({dur:7.6,fov:48,shots:[shot(0,[0,3,5],[0,1.2,-3])],says:[[0.4,3.6,null,'<i>Второй Сказ. Кот без голоса — сказывать некому.</i><br><i>Пелагея над тетрадкой сидит, думу думает…</i>',true],[4.1,3.2,'zven','Выбирайте: начало, помощник, конец!']],end:()=>skaz2()});}
  function skaz2(){G.ui='skaz';const el=$('skaz');el.style.display='flex';
    const steps=[{who:0,title:'Начало выбирает Игрок первый.',opts:['В граде, где все крепко спали','Под водой, во граде Китеже златом','Жил-был кит, корабли глотавший']},
      {who:1,title:'Помощника выбирает Игрок второй.',opts:['Садко с гуслями звончатыми — в лад','Рыба-кит, что издалёка подшивает','Золотая рыбка — показ призрачный']},
      {who:2,title:'Конец — вместе: оба на одной строке, и оба жмите разом.',opts:['И кит корабли глотать не стал: зуб у него болеть перестал','И Китеж снова звонит поутру','И Водяной под колокола засыпает']}];
    let st=0;const sel=[0,0,0],both=[0,0],ok=[false,false];
    const draw=()=>{const s2=steps[st];el.innerHTML='<div class="tet"><h2>Сказ · «Колокола Китежа»</h2><div class="step">'+s2.title+'</div>'+
      s2.opts.map((o,i)=>'<div class="opt'+((s2.who<2?sel[st]===i:false)?' sel':'')+'">'+(s2.who===2?[0,1].map(q=>both[q]===i?'<b style="color:'+PCSS[q]+'">'+(ok[q]?'●':'○')+'</b>':'<b></b>').join(''):'')+o+'</div>').join('')+
      '<div class="hint">'+(s2.who===2?'оба: '+K(0,'left')+K(0,'right')+' / '+K(1,'left')+K(1,'right')+' · '+K(0,'jump')+' + '+K(1,'jump'):K(s2.who,'up')+K(s2.who,'down')+' · '+K(s2.who,'jump'))+'</div>'+
      '<div class="tale">'+[steps[0].opts[sel[0]],st>0?'помощник — '+steps[1].opts[sel[1]]:''].filter(x=>x).join(' · ')+'</div></div>';};
    draw();
    G.uiTick=()=>{const s2=steps[st];
      if(s2.who<2){const n=uiNav(UW(s2.who));if(n.dy||n.dx){sel[st]=(sel[st]+(n.dy||n.dx)+3)%3;SFX.swap();draw();}if(tap(UW(s2.who),'jump')){SFX.ok();st++;draw();}}
      else{for(const q of[0,1]){const n=uiNav(q);if(n.dy||n.dx){both[q]=(both[q]+(n.dy||n.dx)+3)%3;ok[q]=false;SFX.swap();draw();}if(tap(q,'jump')){ok[q]=true;if(G.solo){ok[1-q]=true;both[1-q]=both[q];}SFX.plate();draw();}}
        if(ok[0]&&ok[1]){if(both[0]===both[1]){sel[2]=both[0];SFX.ok();G.ui=null;G.uiTick=null;el.style.display='none';tell2(steps.map((x,i)=>x.opts[sel[i]]));}
          else{ok[0]=ok[1]=false;SFX.miss();banner('Конец — одной строкой!','#ffd0d0',1.4,'договоритесь — и нажмите вдвоём');draw();}}}};}
  function tell2(t){const T=HERO,pe=T.pelageya;G.flags.skaz2=t;
    play({dur:17.4,fov:46,shots:[shot(0,[pe.pos.x+1.8,1.3,pe.pos.z+1.5],[pe.pos.x,0.9,pe.pos.z]),shot(8.4,[3.8,2,-1.2],[2.3,1.7,-4.6]),shot(12.6,[0,4,6],[0,3.4,-7])],
      says:[[0.3,3.6,'pelageya','<i>(шёпотом — еле слышно, но сама)</i> '+t[0]+'…'],[4.1,3.6,'pelageya','<i>(шёпотом)</i> И помог им в том '+t[1].replace(/^./,c=>c.toLowerCase())+'.'],[7.9,4.2,'pelageya','<i>(шёпотом)</i> '+t[2]+'.'],
        [12.3,2.4,null,'<i>Кот, зажмурясь, слушает и мурлычет.</i>',true],[14.9,2.4,null,'<i>Кузьма цепь на дубе выше подымает.</i>',true]],
      events:[{t:12.3,fn:()=>{kot.lids.forEach(l=>{l.rotation.x=1.3;});for(let i=0;i<6;i++)tone(70+(i%2)*6,0.4,'sawtooth',0.05,null,i*0.35);}},
        {t:14.9,fn:()=>{const c=addCoil(Math.max(1,G.flags.coils||1),true);c.scale.setScalar(0.01);anim(1.4,k=>c.scale.setScalar(Math.max(0.01,smooth(k))));SFX.link();G.flags.coils=Math.max(2,G.flags.coils||0);}}],
      tick:(tt)=>{pe.body.position.y=tt>0.3&&tt<12?Math.abs(Math.sin(tt*7))*0.02:0;},
      end:()=>{kot.lids.forEach(l=>{l.rotation.x=-0.5;});pe.body.position.y=0;G.flags.w2done=true;F.stage='free';banner('Сказ «Колокола Китежа»','#ffd76a',2.4,'цепь на дубе длиннее стала · весточка: '+t[1]);later(2.6,()=>showMenu('end'));}});}

  const T=HERO;
  /* ---------- Мир 3: Пелагея читает по тетрадке, пантомима Кота (3 из 3), ролик рушника — Звенышко взлетает в вышитые облака ---------- */
  function w3Intro(){F.stage='w3intro';const pe=T.pelageya;HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,-14.6,0);h.face=Math.atan2(2.3-h.pos.x,-4.6-h.pos.z);});
    const nb=makeNotebook();nb.g.scale.setScalar(0.9);nb.g.position.set(pe.pos.x+0.1,0.95,pe.pos.z+0.3);
    play({dur:16.4,fov:46,shots:[shot(0,[pe.pos.x+2.2,1.5,pe.pos.z+1.8],[pe.pos.x,0.9,pe.pos.z]),shot(7.4,[5.8,2.4,-1.2],[2.3,1.8,-4.6]),shot(12,[0,2.4,-10],[0,9,-26])],
      says:[[0.3,3.2,null,'<i>Пелагея тетрадку раскрывает —</i><br><i>Уж не шёпотом, а тихо читает.</i>',true],[3.6,3.6,'pelageya','…Кот говорил: над облаками — сад,<br>Где темно, как ночью, стало, говорят.'],
        [7.6,3.6,null,'<i>Кот лапами машет, будто крылами, и в небо кажет,</i><br><i>Шепчет хрипло, еле-еле, — слово скажет.</i>',true],[11.2,1.6,'kot','<i>(шёпотом)</i> …перо…'],[12.8,2.6,'potap','Птица? Большая ли, скажи?'],[15,1.4,'zven','Жар-птица, жар-птица!']],
      events:[{t:7.6,fn:()=>{anim(3.2,k=>{kot.body.rotation.z=Math.sin(k*Math.PI*6)*0.25;kot.head.rotation.x=-0.4*Math.sin(k*Math.PI);});}}],
      tick:(t)=>{pe.body.position.y=t>3.6&&t<7.2?Math.abs(Math.sin(t*9))*0.03:0;},
      end:()=>{W.anims.length=0;W.group.remove(nb.g);kot.body.rotation.z=0;kot.head.rotation.x=0;pe.body.position.y=0;G.flags.w3intro=true;later(0.2,mapScene3);}});}
  function mapScene3(){const Zv=W.zven;F.stage='map';F.rushnik=true;map.visible=true;map.scale.z=0.01;anim(1.2,k=>{map.scale.z=Math.max(0.01,smooth(k));});
    icons.forEach(g=>{g.scale.y=1;});HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-16.2,0);h.face=Math.PI;});Zv.mode='script';Zv.vis=true;Zv.pos.set(0,3,-15);
    play({dur:11.4,fov:46,shots:[shot(0,[0,6.5,-12.5],[0,0,-18.5]),shot(4,[1.4,2.4,-15.6],[0,0.4,-18.5]),shot(7.8,[0,2,-14],[0,9,-24])],
      says:[[0.4,3.4,null,'<i>Лес да Китеж на рушнике цветные,</i><br><i>А рядом облака белеют расписные.</i>',true],[4,3,'zven','Третье — Небесное царство! Держите перья крепко!'],[7.6,3,null,'<i>Звенышко взлетает ввысь —</i><br><i>Четверых за ним по облачным ступеням понесло.</i>',true]],
      events:[{t:6.9,fn:()=>{const from=Zv.pos.clone(),to=new V3(0,0.5,-18.5);anim(1.1,k=>{Zv.pos.lerpVectors(from,to,k*k);});later(1.1,()=>{zvenRing();ringFx(to,0xffe0f0,3);burst(to,0xffffff,20,5);anim(1.4,k=>{Zv.pos.set(0,0.5+k*12,-18.5);});SFX.whoosh();});}},
        {t:8.1,fn:()=>{HEROES.forEach(h=>{const from=h.pos.clone(),to=new V3(0,0.3,-18.5);anim(1.6,k=>{const q=smooth(k);h.pos.lerpVectors(from,to,q);h.pos.y+=Math.sin(q*Math.PI)*1.2+q*2;h.g.scale.setScalar(Math.max(0.05,1-q*0.95));h.face+=0.25;});});
          for(let i=0;i<6;i++)later(i*0.2,()=>ringFx(new V3(0,0.3+i*0.5,-18.5),[0xffffff,COL.gold][i%2],1.5+i*0.4));}},{t:10,fn:()=>{$('flash').style.transition='opacity .6s';$('flash').style.opacity=1;}}],
      tick:(t)=>{if(t>=4&&t<6.9)Zv.pos.set(Math.sin(t*2)*0.8,2.2+Math.sin(t*3)*0.2,-17.2);},
      end:()=>{G.flags.map3=true;HEROES.forEach(h=>h.g.scale.setScalar(1));goLevel('3-1');setTimeout(()=>{$('flash').style.opacity=0;},700);}});}
  /* ---------- кузня перед Соловьём: Прошка куёт сам, Кузьма только держит заготовку ---------- */
  function forgeScene3(){F.forging=true;const pr=T.proshka;placeOnGround(pr,7.9,1.5,0);pr.face=Math.atan2(8.6-7.9,0.6-1.5);
    const strike=()=>{pr.atkT=0.28;later(0.15,()=>{SFX.hammer();tone(2400,0.5,'triangle',0.2);burst(new V3(8.6,1.0,0.6),0xffb040,12,4);blank.material.emissiveIntensity=1.4;});};
    play({dur:17,fov:46,shots:[shot(0,[6.2,2.4,4.2],[8.8,0.9,0.4]),shot(6.6,[9.4,1.8,2.6],[10.2,1.5,-0.6]),shot(10.4,[4.6,2.2,-0.6],[2.3,1.8,-4.8])],
      says:[[0.3,3.2,null,'<i>Прошка звенья сам куёт,</i><br><i>Кузьма заготовку лишь держит, не встаёт.</i>',true],[3.2,1,'proshka','Хэк!'],[4.3,1,'proshka','Хэк!'],[5.4,1,'proshka','Хэк!'],
        [6.8,3,'kuzma','<i>(хмыкает)</i> Руки есть. А голова? Поглядим сперва.'],[10.6,3,null,'<i>Кот звон послушал — и шепчет словами,</i><br><i>Хрипло, но внятно, между делами.</i>',true],[13.4,2.2,'kot','<i>(шёпотом)</i> …к Соловью ступайте…'],[15.7,1.3,null,'<i>Ворота к Соловью отворились.</i>',true]],
      events:[{t:3.2,fn:strike},{t:4.3,fn:strike},{t:5.4,fn:strike},{t:6.8,fn:()=>{anim(0.6,k=>{kuz.head.rotation.y=Math.sin(k*Math.PI)*0.4;});}},
        {t:15.7,fn:()=>{SFX.gate();SFX.ok();G.flags.forged3=true;banner('Отворились ворота 3-Б!','#ffd76a',2.6,'на рушнике-карте — Соловей-Разбойник, гляди!');}}],
      end:()=>{F.forging=false;kuz.head.rotation.y=0;G.flags.forged3=true;}});}
  /* ---------- Сказ 3 «Соловьиная песня»: Пелагея рассказывает вполголоса; Варя — начало, я — помощника ---------- */
  function festival3(){F.stage='fest';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-1.6,0);h.face=Math.PI;});snapCams();
    play({dur:7.6,fov:48,shots:[shot(0,[0,3,5],[0,1.2,-3])],says:[[0.4,3.6,null,'<i>Третий Сказ. Пелагея тетрадку раскрыла —</i><br><i>Вполголоса сказывать будет, набравшись силы.</i>',true],[4.1,3.2,'zven','Выбирайте: начало, помощник, конец!']],end:()=>skaz3()});}
  function skaz3(){G.ui='skaz';const el=$('skaz');el.style.display='flex';
    const steps=[{who:1,title:'Начало выбирает Игрок второй.',opts:['Над облаками темень легла','В саду, где яблочки молодильные','Жил-был Соловей, что петь разучился']},
      {who:0,title:'Помощника выбирает Игрок первый.',opts:['Жар-птица с пёрышком тёплым','Сирин и Алконост — песня складная','Баба Яга на ступе — долг платежом красен, дело ясно']},
      {who:2,title:'Конец — вместе: оба на одной строке, и оба жмите разом.',opts:['И Соловей запел опять: с ним первым кто-то стал подпевать','И в саду снова светло стало','И гуси-лебеди домой воротились']}];
    let st=0;const sel=[0,0,0],both=[0,0],ok=[false,false];
    const draw=()=>{const s2=steps[st];el.innerHTML='<div class="tet"><h2>Сказ · «Соловьиная песня»</h2><div class="step">'+s2.title+'</div>'+
      s2.opts.map((o,i)=>'<div class="opt'+((s2.who<2?sel[st]===i:false)?' sel':'')+'">'+(s2.who===2?[0,1].map(q=>both[q]===i?'<b style="color:'+PCSS[q]+'">'+(ok[q]?'●':'○')+'</b>':'<b></b>').join(''):'')+o+'</div>').join('')+
      '<div class="hint">'+(s2.who===2?'оба: '+K(0,'left')+K(0,'right')+' / '+K(1,'left')+K(1,'right')+' · '+K(0,'jump')+' + '+K(1,'jump'):K(s2.who,'up')+K(s2.who,'down')+' · '+K(s2.who,'jump'))+'</div>'+
      '<div class="tale">'+[steps[0].opts[sel[0]],st>0?'помощник — '+steps[1].opts[sel[1]]:''].filter(x=>x).join(' · ')+'</div></div>';};
    draw();
    G.uiTick=()=>{const s2=steps[st];
      if(s2.who<2){const n=uiNav(UW(s2.who));if(n.dy||n.dx){sel[st]=(sel[st]+(n.dy||n.dx)+3)%3;SFX.swap();draw();}if(tap(UW(s2.who),'jump')){SFX.ok();st++;draw();}}
      else{for(const q of[0,1]){const n=uiNav(q);if(n.dy||n.dx){both[q]=(both[q]+(n.dy||n.dx)+3)%3;ok[q]=false;SFX.swap();draw();}if(tap(q,'jump')){ok[q]=true;if(G.solo){ok[1-q]=true;both[1-q]=both[q];}SFX.plate();draw();}}
        if(ok[0]&&ok[1]){if(both[0]===both[1]){sel[2]=both[0];SFX.ok();G.ui=null;G.uiTick=null;el.style.display='none';tell3(steps.map((x,i)=>x.opts[sel[i]]));}
          else{ok[0]=ok[1]=false;SFX.miss();banner('Конец — одной строкой!','#ffd0d0',1.4,'договоритесь — и нажмите вдвоём');draw();}}}};}
  function tell3(t){const pe=T.pelageya,pr=T.proshka;G.flags.skaz3=t;
    play({dur:16.6,fov:46,shots:[shot(0,[pe.pos.x+1.8,1.3,pe.pos.z+1.5],[pe.pos.x,0.9,pe.pos.z]),shot(8.4,[pr.pos.x-1.6,1.3,pr.pos.z+1.6],[pr.pos.x,0.9,pr.pos.z]),shot(12.4,[0,3,4],[0,2.6,-6])],
      says:[[0.3,3.6,'pelageya','<i>(вполголоса)</i> '+t[0]+'…'],[4.1,3.6,'pelageya','<i>(вполголоса)</i> И помог им в том '+t[1].replace(/^./,c=>c.toLowerCase())+'.'],[7.9,4.2,'pelageya','<i>(вполголоса)</i> '+t[2]+'.'],
        [12.3,4,null,'<i>Прошка рядом сидит — и впервые не скучает,</i><br><i>Не зевает, а сказку слушает, внимает.</i>',true]],
      tick:(tt)=>{pe.body.position.y=tt>0.3&&tt<12?Math.abs(Math.sin(tt*7))*0.02:0;},
      end:()=>{pe.body.position.y=0;later(0.3,feast3);}});}
  /* ---------- мнимая победа: настоящий праздник, третий виток, Кот шепчет вслух ---------- */
  let fb3=null,sv3=null,st3=null,nb3=null;
  function feast3(){F.stage='feast';const po=T.potap;fb3=makeFirebird();fb3.bloom(1);fb3.g.position.set(-22,14,-24);sv3=makeSolovei();sv3.g.position.set(-14,0,-10);st3=makeStupa();st3.g.position.set(16,6,-12);
    play({dur:26,fov:48,camK:2.4,shots:[shot(0,[0,4,7],[0,4,-7]),shot(5.4,[3.8,2.4,-0.6],[0,4,-7]),shot(10.4,[4.4,3.6,-2],[1.7,3.8,-5.6]),shot(15.6,[-5,2.6,1],[-3,1.8,-3.4]),shot(20,[0,3.4,6.4],[0,2.4,-4])],
      says:[[0.3,3.6,null,'<i>На Лукоморье пир горой — веселье!</i>',true],[3.9,3.4,null,'<i>Кузьма цепь на дубе выше вздымает —</i><br><i>Наполовину готова, сияет.</i>',true],
        [7.6,2.6,null,'<i>Жар-птица с Соловьём прилетают,</i><br><i>Яга в ступе поближе подплывает.</i>',true],[10.6,3,null,'<i>Кот на середину ствола взобрался —</i><br><i>И вслух зашептал, хрипло, но словами отозвался:</i>',true],[13.6,2.4,'kot','В некотором царстве, в некотором государстве…'],
        [16,3.4,'potap','Как во славном… во граде… э-э… жил-был богатырь удалой…'],[19.6,1.6,'potap','…почти вспомнил, ей-ей!'],[21.4,2.4,null,'<i>Все смеются — звонко, от души.</i>',true]],
      events:[{t:0.3,fn:()=>{SFX.ok();for(let i=0;i<6;i++)later(i*0.5,()=>burst(new V3(rand(-6,6),3,rand(-6,2)),[0xff9ad0,0xfff08a,0x9ad0ff][i%3],10,3));}},
        {t:4,fn:()=>{const c=addCoil(Math.max(2,G.flags.coils||2),true);c.scale.setScalar(0.01);anim(1.4,k=>c.scale.setScalar(Math.max(0.01,smooth(k))));SFX.link();G.flags.coils=Math.max(3,G.flags.coils||0);}},
        {t:7.6,fn:()=>{const f0=fb3.g.position.clone();anim(3,k=>{fb3.g.position.lerpVectors(f0,new V3(-2.9,7.4,-6.4),smooth(k));fb3.g.position.y+=Math.sin(k*Math.PI)*2;fb3.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(k*30)*0.6;});});
          const s0=sv3.g.position.clone();anim(2.4,k=>{sv3.g.position.lerpVectors(s0,new V3(-4.6,0,-3.2),smooth(k));sv3.g.position.y=Math.abs(Math.sin(k*Math.PI*4))*0.4;});sv3.g.rotation.y=0.9;
          const y0=st3.g.position.clone();anim(2.8,k=>{st3.g.position.lerpVectors(y0,new V3(5.4,0.9,-8.6),smooth(k));});st3.g.rotation.y=-0.9;}},
        {t:10.6,fn:()=>{const from=kot.g.position.clone();anim(2,k=>{kot.g.position.set(lerp(from.x,1.7,k),lerp(from.y,3.1,k)+Math.sin(k*Math.PI)*0.3,lerp(from.z,-5.4,k));});kot.lids.forEach(l=>{l.rotation.x=-0.5;});}},
        {t:13.6,fn:()=>{kot.head.rotation.x=-0.3;lullaby([67,71,74,72],0.4,0,0.1);}},
        {t:16,fn:()=>{anim(3.4,k=>{po.body.rotation.z=Math.sin(k*Math.PI*3)*0.1;});}},
        {t:21.4,fn:()=>{HEROES.forEach(h=>{floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Ха-ха!','#ffe36b');anim(1.2,k=>{h.extraY=Math.abs(Math.sin(k*Math.PI*4))*0.2;});});bark(sv3,'solovei','Фью-ить!',1.2);}}],
      tick:(t)=>{if(t>10)fb3.wings.forEach(w=>{w.wp.rotation.z=w.s*0.25;});},
      end:()=>{HEROES.forEach(h=>{h.extraY=0;});po.body.rotation.z=0;later(0.2,koscheiScene);}});}
  /* ---------- «Сказок не будет»: Кощей рвёт цепь и забирает Звенышко ---------- */
  function koscheiScene(){F.stage='lost';const pe=T.pelageya,pr=T.proshka,po=T.potap,Zv=W.zven;const ko=makeKoschei();ko.g.position.set(-8,-0.2,-28);ko.g.visible=false;
    if(players[0].act!==1)doSwap(0);HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,-0.6,0);h.face=Math.PI;});
    nb3=makeNotebook();nb3.g.scale.setScalar(0.9);nb3.g.position.set(pe.pos.x+0.1,0.95,pe.pos.z+0.4);Zv.mode='script';Zv.vis=true;Zv.pos.set(pe.pos.x+0.1,1.35,pe.pos.z+0.4);
    const fly=[];const scat=()=>{const all=[];coils.children.forEach(c=>c.children.forEach(r=>all.push(r)));linkRing.forEach(r=>all.push(r));
      all.forEach((r,i)=>{const wp=new V3();r.getWorldPosition(wp);r.parent.remove(r);W.group.add(r);r.position.copy(wp);const to=new V3(rand(-5,5),0.08,-7+rand(-1,5.5));fly.push({r,from:wp,to,d:rand(0.8,1.6),ph:rand(0,6)});});};
    const pullRings=()=>{for(let i=0;i<7;i++)later(i*0.13,()=>{tone(1400-i*120,0.35,'sawtooth',0.1,300);tone(2600-i*200,0.2,'triangle',0.08,900);});};
    play({dur:58,fov:46,camK:2.2,
      shots:[shot(0,[0,4.4,8],[0,2.4,-8]),shot(4.4,[-4,3,-4],[-7,1.4,-22],[-3,2.6,-2],[-3,1.6,-10],6),shot(12,[4.2,3,-1.4],[0.2,3,-5]),shot(17.4,[3.6,2.6,1.2],[0,2.6,-6]),
        shot(22,[2.8,1.6,-2.6],[1.8,0.6,-5.2]),shot(25,[-3.6,1.8,1.2],[po.pos.x,1.2,po.pos.z]),shot(29,[pe.pos.x+2.4,1.8,pe.pos.z+2.2],[pe.pos.x,1.2,pe.pos.z-0.4]),shot(35.4,[1.4,2.8,-1.2],[0.2,3.2,-4.2]),
        shot(40,[7,3.2,-1],[-4,1.2,-40],[8,4.4,1],[-6,1,-60],6),shot(47.4,[0,3.6,5],[0,5,-7]),shot(51.6,[pr.pos.x+1.6,1.2,pr.pos.z+1.8],[pr.pos.x,0.6,pr.pos.z-0.4])],
      says:[[0.4,3.2,null,'<i>Звон ключей несётся издалёка.</i>',true],[4.4,4.4,null,'<i>Не таится Кощей на сей раз:</i><br><i>Через пир идёт он медленно — все расступились тотчас.</i>',true],
        [12.2,3.6,null,'<i>Цепь на дубе он хватает обеими руками — и тянет.</i>',true],[17.6,3.8,null,'<i>Рвутся витки — будто струны лопнули звеня,</i><br><i>Сыплются звенья в траву, блестя.</i>',true],
        [22,2.8,null,'<i>Кот к корням упал — и вновь молчит.</i>',true],[25.2,3.6,null,'<i>Потап всех щитом закрыл — да что ему щит?</i><br><i>Кощей на щит и не глядит.</i>',true],
        [29,3.8,null,'<i>Он глядит на тетрадку, где Звенышко светится ярко,</i><br><i>И руку тянет — жадно, жарко.</i>',true],[33,2.4,null,'<i>Звенышко само из тетрадки рвётся прочь —</i><br><i>Чтоб тетрадку Кощей не унёс в ночь…</i>',true],
        [35.6,2.6,null,'<i>…и в кулаке у него повисает, дрожит.</i>',true],[38.4,2.4,'koschei','Сказок больше не бывать.'],[40.8,4.4,null,'<i>И уходит в море — со Звенышком вместе.</i>',true],
        [47.6,3.4,null,'<i>Дуб стоит нагой.</i>',true],[51.4,3,null,'<i>Прошка звенья в горсть собирает,</i><br><i>Не обернувшись, молвит — и зубы сжимает:</i>',true],[54.6,2.8,'proshka','Скуём заново. Не беда.']],
      events:[{t:0.4,fn:()=>{SFX.keys();later(1.4,()=>SFX.keys());later(2.8,()=>SFX.keys());}},
        {t:4.4,fn:()=>{ko.g.visible=true;ko.g.rotation.y=0.35;anim(7.4,k=>{ko.g.position.set(lerp(-8,0.1,k),-0.2+Math.min(1,k*3)*0.2,lerp(-28,-4.1,k));ko.body.rotation.z=Math.sin(k*24)*0.03;});
          later(2.6,()=>{if(fb3){const f=fb3.g.position.clone();anim(2,k=>{fb3.g.position.set(f.x-k*3,f.y+k*5,f.z-k*2);});}if(sv3){const s=sv3.g.position.clone();anim(1.2,k=>{sv3.g.position.set(s.x-k*3,Math.abs(Math.sin(k*Math.PI*3))*0.4,s.z+k*1.5);});}
            if(st3){const y=st3.g.position.clone();anim(1.6,k=>{st3.g.position.set(y.x+k*3,y.y+k*1.2,y.z+k*1.5);});}HEROES.forEach(h=>{h.face=Math.atan2(ko.g.position.x-h.pos.x,ko.g.position.z-h.pos.z);});});}},
        {t:12.2,fn:()=>{ko.g.rotation.y=Math.PI;anim(1.2,k=>{ko.armR.rotation.x=-2.2*smooth(k);});SFX.keys();}},
        {t:15.2,fn:()=>{anim(2.2,k=>{ko.body.rotation.x=0.2*Math.sin(k*Math.PI);});}},
        {t:17.6,fn:()=>{pullRings();scat();shakeAll(0.05,0.8);SFX.crash();}},
        {t:22,fn:()=>{const from=kot.g.position.clone();anim(1,k=>{kot.g.position.set(lerp(from.x,1.9,k),from.y*(1-k*k),lerp(from.z,-4.9,k));kot.body.rotation.z=k*1.2;});later(1,()=>{SFX.thud();kot.lids.forEach(l=>{l.rotation.x=1.3;});});}},
        {t:25.2,fn:()=>{po.guard=true;anim(0.6,k=>{ko.armR.rotation.x=-2.2*(1-smooth(k));});}},
        {t:29,fn:()=>{ko.g.rotation.y=Math.atan2(pe.pos.x-ko.g.position.x,pe.pos.z-ko.g.position.z);anim(1.4,k=>{ko.armR.rotation.x=-1.2*smooth(k);});nb3.g.children.forEach(c=>{if(c.material&&c.material.emissive)c.material.emissiveIntensity=0.6;});}},
        {t:33,fn:()=>{const from=Zv.pos.clone();SFX.dzin();anim(2.2,k=>{const hp=new V3();ko.hand.getWorldPosition(hp);Zv.pos.lerpVectors(from,hp,smooth(k));Zv.pos.y+=Math.sin(k*Math.PI)*0.8;});}},
        {t:35.6,fn:()=>{F.zvenCaught=true;tone(1560,0.6,'triangle',0.1,780);}},
        {t:38.4,fn:()=>{tone(95,1.4,'sine',0.2);}},
        {t:40.8,fn:()=>{po.guard=false;ko.g.rotation.y=Math.PI*0.95;SFX.keys();anim(9,k=>{ko.g.position.set(lerp(0.1,-6,k),0,lerp(-4.1,-60,k));});}},
        {t:47.4,fn:()=>{ko.g.visible=false;Zv.vis=false;oak.traverse(o=>{if(o.isMesh&&o.geometry.type==='SphereGeometry'){const s0=o.scale.x;anim(2.6,k=>{o.scale.setScalar(Math.max(0.01,s0*(1-smooth(k))));if(k>=1)o.visible=false;});}});for(let i=0;i<30;i++)later(i*0.08,()=>burst(new V3(rand(-3,3),rand(7,10),-7+rand(-3,3)),0x6a8a3a,2,1.5));}},
        {t:51.4,fn:()=>{const near=fly.slice(0,6);pr.face=Math.PI*0.2;near.forEach((f,i)=>later(i*0.3,()=>{const s=f.r.position.clone();anim(0.5,k=>{f.r.position.lerpVectors(s,pr.pos.clone().add(new V3(0,0.8,0)),k);if(k>=1)f.r.visible=false;});tone(1300+i*60,0.12,'triangle',0.08);}));}}],
      tick:(t,dt)=>{for(const f of fly){const k=clamp((t-17.6)/f.d,0,1);f.r.position.lerpVectors(f.from,f.to,smooth(k));f.r.position.y=lerp(f.from.y,0.08,k*k)+Math.sin(k*Math.PI)*0.6;f.r.rotation.x+=k<1?0.2:0;}
        if(F.zvenCaught&&t<47.4){const hp=new V3();ko.hand.getWorldPosition(hp);Zv.pos.copy(hp);}},
      end:()=>{G.flags.w3done=true;F.stage='free';ko.g.visible=false;Zv.vis=false;if(nb3)W.group.remove(nb3.g);po.guard=false;
        banner('Сказ «Соловьиная песня»','#ffd76a',2.6,'звенья мира при вас остаются · весточка: '+(G.flags.skaz3?G.flags.skaz3[1]:'Жар-птица'));later(3,()=>showMenu('end'));}});}

  /* ---------- Мир 4: без Звенышка — подсказки читает Пелагея; витки сращивают Демьяновыми клещами ---------- */
  const W4COIL=['4-1','4-2','4-4'];
  const coilPending=()=>G.flags.w3done&&!G.flags.w4done&&W4COIL.filter(id=>G.done[id]).length>(G.flags.w4c||0);
  // листва дуба возвращается с каждым витком
  function leafShow(n,anim1){const sp=[];oak.traverse(o=>{if(o.isMesh&&o.geometry.type==='SphereGeometry')sp.push(o);});const frac=[0,0.35,0.6,0.8,1][Math.min(4,n)],on=Math.round(sp.length*frac);
    sp.forEach((o,i)=>{const vis=i<on;o.material=M(new THREE.Color(0x7d8a6a).lerp(new THREE.Color(0x3f9a2c),0.35+0.15*n).getHex());if(vis&&!o.visible&&anim1){const s0=o.userData.s0||(o.userData.s0=o.scale.x||1);o.visible=true;o.scale.setScalar(0.01);anim(1.6,k=>{o.scale.setScalar(Math.max(0.01,s0*smooth(k)));});}else{if(!o.userData.s0)o.userData.s0=o.scale.x;o.visible=vis;}});}
  /* ---------- вступление к миру 4: пантомима Кота (молот), ложка Йоши, «Без Демьяновых клещей не срастить» ---------- */
  function w4Intro(){F.stage='w4intro';const pe=T.pelageya,yo=T.yosha,pr=T.proshka;HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,-12.6,0);h.face=Math.atan2(1.9-h.pos.x,-4.9-h.pos.z);});
    const spoon=new THREE.Group();addMesh(new THREE.CylinderGeometry(0.03,0.03,0.5,6),M(0x9a6a3a),0,0.25,0,spoon);addMesh(new THREE.SphereGeometry(0.09,8,6),M(0x9a6a3a),0,0.52,0,spoon);spoon.visible=false;W.group.add(spoon);
    const nb=makeNotebook();nb.g.scale.setScalar(0.9);nb.g.position.set(pe.pos.x+0.1,0.95,pe.pos.z+0.3);
    play({dur:25,fov:46,camK:2.4,shots:[shot(0,[4.6,2.4,-9],[1.9,0.6,-4.9]),shot(5,[5.4,2.2,-8],[2,1.2,-5]),shot(10.4,[5.6,1.8,-9.8],[1.6,0.8,-5.2]),shot(15,[7.6,2.4,-4],[10.2,1.6,-0.6]),shot(20,[pe.pos.x+2,1.5,pe.pos.z+1.6],[pe.pos.x,0.9,pe.pos.z])],
      says:[[0.3,4.4,null,'<i>Дуб стоит нагой. Кот от корней подымается — молча.</i>',true],[5,4.4,null,'<i>Кот на кузню лапой кажет и молот изображает:</i><br><i>Тук-тук-тук — по воздуху ударяет.</i>',true],
        [10.4,2.2,'yosha','Понял, понял — вот так раз!'],[12.4,2.6,null,'<i>Йоша ложку ему приносит — угодил!</i>',true],[15,4.2,null,'<i>Кузьма на рваную цепь у корней глядит.</i>',true],[17.4,2.6,'kuzma','Без Демьяновых клещей её не срастить.'],
        [20,4.6,'pelageya','<i>(по тетрадке)</i> …кузня Кузьмы и Демьяна<br>У огненной реки стоит — жарко там и рано.']],
      events:[{t:0.3,fn:()=>{anim(1.6,k=>{kot.body.rotation.z=1.2*(1-smooth(k));});kot.lids.forEach(l=>{l.rotation.x=-0.5;});}},
        {t:5,fn:()=>{kot.g.rotation.y=Math.atan2(10.2-kot.g.position.x,-0.6-kot.g.position.z);anim(4,k=>{kot.body.rotation.x=Math.abs(Math.sin(k*Math.PI*6))*0.3;});for(let i=0;i<3;i++)later(1+i*1.2,()=>tone(700,0.12,'triangle',0.08));}},
        {t:10.4,fn:()=>{kot.body.rotation.x=0;spoon.visible=true;const f=yo.pos.clone();anim(1.8,k=>{yo.pos.lerpVectors(f,new V3(1.2,0,-4.2),smooth(k));yo.face=Math.atan2(1.9-yo.pos.x,-4.9-yo.pos.z);spoon.position.set(yo.pos.x+0.3,0.6,yo.pos.z-0.2);});}},
        {t:13.6,fn:()=>{spoon.position.set(1.6,0.5,-4.6);anim(0.8,k=>{kot.head.rotation.x=0.4*Math.sin(k*Math.PI);});}},
        {t:15,fn:()=>{anim(0.8,k=>{kuz.head.rotation.x=0.4*smooth(k);});}}],
      end:()=>{W.anims.length=0;W.group.remove(nb.g);W.group.remove(spoon);kot.body.rotation.z=0;kot.body.rotation.x=0;kot.head.rotation.x=0;kuz.head.rotation.x=0;G.flags.w4intro=true;later(0.2,mapScene4);}});}
  function mapScene4(){F.stage='map';F.rushnik=true;map.visible=true;map.scale.z=0.01;anim(1.2,k=>{map.scale.z=Math.max(0.01,smooth(k));});icons.forEach(g=>{g.scale.y=1;});
    HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-16.2,0);h.face=Math.PI;});const vz=makeVestZ(helperOf(3));vz.pos.set(0,3,-15);
    play({dur:11.4,fov:46,shots:[shot(0,[0,6.5,-12.5],[0,0,-18.5]),shot(4,[3.4,2.4,-15.6],[2.1,0.4,-18.5]),shot(7.8,[2,2,-14],[2.1,6,-24])],
      says:[[0.4,3.4,null,'<i>На рушнике — огненная река,</i><br><i>Нитками цвета жара вышита слегка.</i>',true],[4,3.2,'pelageya','…четвёртый мир — Смородина огневая.'],[7.6,3,null,'<i>Весточка помощника — нырь в вышитый огонь,</i><br><i>И четверых за ней утянуло — только тронь.</i>',true]],
      events:[{t:6.9,fn:()=>{const from=vz.pos.clone(),to=new V3(2.1,0.5,-18.5);anim(1.1,k=>{vz.pos.lerpVectors(from,to,k*k);});later(1.1,()=>{ringFx(to,0xff8a3a,3);burst(to,0xffb040,20,5);vz.g.visible=false;SFX.whoosh();});}},
        {t:8.1,fn:()=>{HEROES.forEach(h=>{const from=h.pos.clone(),to=new V3(2.1,0.3,-18.5);anim(1.6,k=>{const q=smooth(k);h.pos.lerpVectors(from,to,q);h.pos.y+=Math.sin(q*Math.PI)*1.2;h.g.scale.setScalar(Math.max(0.05,1-q*0.95));h.face+=0.25;});});
          for(let i=0;i<6;i++)later(i*0.2,()=>ringFx(new V3(2.1,0.3+i*0.4,-18.5),[0xff8a3a,COL.gold][i%2],1.5+i*0.4));}},{t:10,fn:()=>{$('flash').style.transition='opacity .6s';$('flash').style.opacity=1;}}],
      tick:(t)=>{if(t>=4&&t<6.9)vz.pos.set(2.1+Math.sin(t*2)*0.8,2.2+Math.sin(t*3)*0.2,-17.2);},
      end:()=>{G.flags.map4=true;HEROES.forEach(h=>h.g.scale.setScalar(1));goLevel('4-1');setTimeout(()=>{$('flash').style.opacity=0;},700);}});}
  /* ---------- сращиваем виток: 20 секунд ковки Демьяновыми клещами; дуб зеленеет, Кот снова шепчет ---------- */
  const CG={on:false};
  function coilGame(){const n=G.flags.w4c||0;G.ui='forge';F.forging=true;const pr=T.proshka;placeOnGround(pr,7.9,1.5,0);pr.face=Math.atan2(8.6-7.9,0.6-1.5);
    Object.assign(CG,{on:true,t:-1.5,k:-3,B:0.75,good:0,n,done:{}});
    if(!CG.ring){CG.ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.05,6,28),MB(COL.gold,{transparent:true,opacity:0.9}));CG.ring.rotation.x=Math.PI/2;W.group.add(CG.ring);
      CG.tongs=new THREE.Group();const tm=M(0x3a3a44);for(const s of[-1,1]){const a=addMesh(new THREE.BoxGeometry(0.06,0.05,0.9),tm,s*0.05,0,0.4,CG.tongs);a.rotation.y=-s*0.12;}CG.tongs.position.set(0,-0.8,0.2);kuz.arm.add(CG.tongs);}
    CG.ring.visible=true;CG.tongs.visible=true;banner('Чиним цепь: '+(n+1)+' из 3','#ffd76a',2.6,'Кузьма держит Демьяновы клещи · Прошка, бей '+K(0,'attack')+' в такт двадцать секунд подряд');G.uiTick=coilTick;}
  function coilTick(){const dt=1/60;CG.t+=dt;const k=Math.floor(CG.t/CG.B+1e-6);while(CG.k<k){CG.k++;if(CG.k<0)tone(1760,0.05,'square',0.05);else tone(880,0.04,'square',0.03);}
    const u=((CG.t%CG.B)+CG.B)%CG.B/CG.B;CG.ring.position.set(8.6,1.0,0.6);CG.ring.scale.setScalar(lerp(1.4,0.3,u));CG.ring.material.color.setHex(u>0.8?0xffffff:COL.gold);kuz.arm.rotation.x=-0.6;
    if(tap(0,'attack')&&CG.t>0){const kk=Math.round(CG.t/CG.B);if(!CG.done[kk]){CG.done[kk]=1;const d=Math.abs(CG.t-kk*CG.B);const ok=d<=0.2+(W.ladBonus||0);const pr=T.proshka;pr.atkT=0.28;
        later(0.06,()=>{SFX.hammer();tone(ok?2600:1700,ok?0.45:0.2,'triangle',ok?0.22:0.1);burst(new V3(8.6,1.0,0.6),ok?0xffe060:0xffa040,ok?16:6,ok?5:2);blank.material.emissiveIntensity=1.6;floatText(new V3(8.6,1.9,0.6),ok?'Дзинь!':'тук',ok?'#ffe36b':'#e0c0a0');});if(ok)CG.good++;}}
    blank.material.emissiveIntensity=damp(blank.material.emissiveIntensity,0.9,4,dt);
    if(CG.t>20)coilEnd();}
  const KOTW=['<i>(шёпотом)</i> …у лукоморья…','<i>(шёпотом)</i> …дуб зелёный…','<i>(шёпотом)</i> …златая цепь…','<i>(шёпотом)</i> …на дубе том…'];
  function coilEnd(){CG.on=false;CG.ring.visible=false;CG.tongs.visible=false;G.ui=null;G.uiTick=null;F.forging=false;kuz.arm.rotation.x=0;const n=CG.n;G.flags.w4c=n+1;const good=CG.good;
    play({dur:11,fov:46,camK:2.4,shots:[shot(0,[6,2.6,4],[8.6,1,0.6]),shot(3,[4,3.4,-1],[0,3,-7]),shot(7.4,[4.4,1.8,-2.4],[1.9,0.8,-4.9])],
      says:[[0.3,2.6,'kuzma',good>=12?'Славно сращено. Демьян бы похвалил.':'Держится. Срослось, как было.'],[3,4,null,'<i>Виток на дуб подымается — и дуб зеленеет на глазах.</i>',true],[7.4,3.2,'kot',KOTW[n]]],
      events:[{t:3,fn:()=>{const c=addCoil(n,true);c.scale.setScalar(0.01);anim(1.4,k=>c.scale.setScalar(Math.max(0.01,smooth(k))));SFX.link();leafShow(n+1,true);
        (W.scat||[]).splice(0,7).forEach((r,i)=>{const f=r.position.clone();anim(1+i*0.1,k=>{r.position.lerpVectors(f,new V3(0,1.2+n*0.62,-7),smooth(k));if(k>=1)r.visible=false;});});}},
        {t:7.4,fn:()=>{kot.body.rotation.z=0;kot.lids.forEach(l=>{l.rotation.x=-0.5;});anim(0.8,k=>{kot.head.rotation.x=-0.3*Math.sin(k*Math.PI);});}}],
      end:()=>{W.anims.length=0;banner('Виток '+(n+1)+' из 3 — на дубе','#ffd76a',2.4,n+1<3?'Кот снова шепчет, шепчет':'дуб почти зелёный, почти живой');}});}
  /* ---------- кузня перед Горынычем: на равных; узду Кузьма куёт сам — «Клещами возьмёте» ---------- */
  function forgeScene4(){F.forging=true;const pr=T.proshka,po=T.potap,pe=T.pelageya,yo=T.yosha;placeOnGround(pr,7.6,1.8,0);placeOnGround(po,6.2,2.6,0);placeOnGround(pe,6.6,0.4,0);placeOnGround(yo,7.2,3.4,0);HEROES.forEach(h=>{h.face=Math.atan2(8.6-h.pos.x,0.6-h.pos.z);});
    const uz=new THREE.Group();uz.visible=false;W.group.add(uz);const UL=hotLook('uzda',uz);
    play({dur:22,fov:46,camK:2.4,shots:[shot(0,[5,2.4,4.4],[7.4,1,1.8]),shot(8.4,[9.6,2,2.6],[9.8,1.4,-0.2]),shot(14,[7.6,1.6,3.6],[8.6,1,0.6]),shot(18,[pr.pos.x-1.4,1.3,pr.pos.z+1.6],[8.6,1,0.6])],
      says:[[0.3,3,null,'<i>Прошка с Кузьмой куёт наравне.</i><br><i>А из чего узду Горынычу делать — спорят все.</i>',true],[3.4,1.6,'proshka','Из железа, ей-же-ей!'],[5,1.6,'potap','Из верёвки, из пеньки!'],[6.6,1.8,'pelageya','Из ниточек…'],[8.4,1.2,'yosha','Из… из…'],
        [9.8,3.6,null,'<i>Пока спорят — Кузьма узду куёт молча, сам.</i>',true],[14,2.2,null,'<i>И отдаёт — горячую, пылающую.</i>',true],[16.4,2.4,'kuzma','Клещами возьмёте — не рукой.'],[19,2.6,null,'<i>Ворота к Горынычу отворились.</i>',true]],
      events:[{t:9.8,fn:()=>{for(let i=0;i<5;i++)later(i*0.7,()=>{anim(0.3,q=>{kuz.arm.rotation.x=-Math.sin(q*Math.PI)*1.3;});later(0.15,()=>{SFX.hammer();burst(new V3(8.6,1.0,0.6),0xffb040,10,3);});});}},
        {t:14,fn:()=>{uz.visible=true;uz.position.set(8.6,1.0,0.6);UL.m.emissiveIntensity=1;anim(1.4,k=>{uz.position.set(lerp(8.6,pr.pos.x+0.6,k),1.0+Math.sin(k*Math.PI)*0.6,lerp(0.6,pr.pos.z-0.4,k));});}},
        {t:19,fn:()=>{SFX.gate();SFX.ok();G.flags.forged4=true;banner('Отворились ворота 4-Б!','#ffd76a',2.6,'на рушнике-карте — Змей Горыныч, гляди!');}}],
      end:()=>{W.anims.length=0;W.group.remove(uz);F.forging=false;kuz.arm.rotation.x=0;G.flags.forged4=true;}});}
  /* ---------- праздник мира 4: Горыныч в узде возит нас; ролик «Ученик»; Сказ 4 «Одно сердце»; «Жил-был мальчишка…» ---------- */
  let gor4=null;
  function festival4(){F.stage='fest';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-14,0);h.face=Math.PI;});snapCams();gor4=makeGorynych();gor4.g.scale.setScalar(0.75);gor4.g.position.set(-30,12,-60);gor4.g.rotation.y=0.6;
    const uz=new THREE.Group();gor4.g.add(uz);uz.position.set(0,5.2,1.8);hotLook('uzda',uz).m.emissiveIntensity=0.3;
    play({dur:10,fov:48,camK:2.4,shots:[shot(0,[0,3,-6],[-10,8,-40],[0,3,-8],[0,2,-22],8)],
      says:[[0.3,3.6,null,'<i>По уговору Горыныч на Лукоморье прилетает —</i><br><i>В Кузьминой узде, смирно, не пылает.</i>',true],[4.6,2.8,'gorM','Садитесь. Уговор дороже злата.'],[7.6,2.2,'gorL','Только не пинайтесь, ребята…']],
      events:[{t:0.2,fn:()=>{const f=gor4.g.position.clone();anim(6,k=>{gor4.g.position.lerpVectors(f,new V3(0,0.4,-24),smooth(k));gor4.g.position.y+=Math.sin(k*Math.PI)*4;gor4.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(k*26)*0.5;});});}}],
      end:()=>{W.anims.length=0;gor4.g.position.set(0,0.4,-24);ride4();}});}
  const onBack=[[-0.9,6.2,0.4],[0.9,6.2,0.4],[-0.8,6.1,-1.2],[0.8,6.1,-1.2]];
  function ride4(){F.stage='ride';const g=gor4.g;
    const seat=()=>{HEROES.forEach((h,i)=>{const o=new V3(...onBack[i]).multiplyScalar(0.75).applyEuler(g.rotation);h.pos.set(g.position.x+o.x,g.position.y+o.y,g.position.z+o.z);h.vel.set(0,0,0);h.face=g.rotation.y;});};
    play({dur:16,fov:50,camK:2,shots:[shot(0,[0,15,3],[0,8.5,-30]),shot(8,[-19,13,-12],[0,9,-30],[-17,15,-6],[0,9,-32],8)],
      says:[[0.4,3.6,null,'<i>Над морем Горыныч нас несёт.</i><br><i>Головы сказывают, перебивая, — кто кого перебьёт.</i>',true],[4.4,3,'gorL','Тыщу лет тому назад…'],[7.6,2.6,'gorR','Не тыщу! Девятьсот девяносто, говорят!'],[10.4,2.6,'gorM','Тихо. Про ученика сказывайте ладом.'],[13.2,2.4,'gorL','Ну вот. Был у Кота ученик — с молотком…']],
      tick:(t)=>{const a=t/16*Math.PI*1.2;g.position.set(Math.sin(a)*12,9+Math.sin(t*1.3)*0.6,-30-Math.cos(a)*10);g.rotation.y=a+Math.PI/2;gor4.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(t*6)*0.5;});seat();},
      end:()=>{W.anims.length=0;uchenik();}});}
  // ролик «Ученик»: лубки, головы рассказывают по очереди
  const UCH=[{pic:'u1',lines:[['gorL','Тыщу лет тому назад<br>Был у Кота ученик, говорят.'],['gorR','Тощий мальчик, с молотком.'],['gorM','Сказки сам сложить мечтал тайком.']]},
    {pic:'u2',lines:[['gorR','Кот любил его сердечно.'],['gorL','Но в сказках проигравшим записал навечно.'],['gorM','Ведь кому-то проигрывать надо — таков закон.']]},
    {pic:'u3',lines:[['gorL','На последней картинке лубка — всегда он.'],['gorR','И все над ним смеются хором.']]},
    {pic:'u4',lines:[['gorM','Просил мальчишка переписать — с укором.'],['gorL','Кот же не переписал ни строчки.']]},
    {pic:'u5',lines:[['gorL','А потом он вырос — время шло…'],['gorL','…и стал костью да ключами — всё ушло.'],['gorR','Мы-то думали — злодей какой,<br>А он в сказке быть не хотел такой.']]}];
  function uchenik(){G.ui='lubok';const el=$('mapui');el.style.display='flex';let pi=0,li=0,tt=0;const g=gor4.g;
    const draw=()=>{const P=UCH[pi],L=P.lines[li],w=WHO[L[0]];el.innerHTML='<div class="lubok"><div style="font:900 22px Georgia,serif;color:#8a1a14;margin-bottom:8px">«Ученик»</div>'+(LUBOK[P.pic]||'')+
      '<div class="cap"><b style="color:'+w[1]+'">'+w[0]+':</b> '+L[1]+'</div><div class="hint" style="font:600 13px system-ui;opacity:.7">'+(pi+1)+' / '+UCH.length+' · '+K(0,'jump')+' дальше</div></div>';babble(L[0],L[1]);};
    draw();
    G.uiTick=()=>{tt+=1/60;const a=G.time*0.3;g.position.set(Math.sin(a)*12,9,-30-Math.cos(a)*10);g.rotation.y=a+Math.PI/2;HEROES.forEach((h,i)=>{const o=new V3(...onBack[i]).multiplyScalar(0.75).applyEuler(g.rotation);h.pos.set(g.position.x+o.x,g.position.y+o.y,g.position.z+o.z);h.vel.set(0,0,0);});
      if(tt>4.6||tap(0,'jump')||tap(1,'jump')){tt=0;li++;if(li>=UCH[pi].lines.length){li=0;pi++;}if(pi>=UCH.length){G.ui=null;G.uiTick=null;el.style.display='none';landing4();return;}draw();SFX.flower();}};}
  function landing4(){const pe=T.pelageya,g=gor4.g;
    play({dur:15,fov:46,camK:2.2,shots:[shot(0,[6,4,-14],[0,2,-24]),shot(5.4,[pe.pos.x+1.8,1.4,-14.6],[pe.pos.x,0.9,-16]),shot(10.4,[0,3,-8],[0,1.4,-16])],
      says:[[0.3,4.4,null,'<i>Горыныч у моря садится —</i><br><i>Пелагея всю дорогу молчала, как птица.</i>',true],[5.4,4.6,null,'<i>Потом тихонько молвит, ни на кого не глядя:</i>',true],[9.2,3,'pelageya','Он ведь тоже сочинял…']],
      events:[{t:0.2,fn:()=>{const f=g.position.clone();anim(3,k=>{g.position.lerpVectors(f,new V3(-10,0.4,-21),smooth(k));g.rotation.y=lerp(g.rotation.y,0.9,k);});
        later(3,()=>{F.landed=true;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-16,0);h.face=Math.PI*0.8;});});}}],
      tick:(t)=>{if(!F.landed&&t<3){HEROES.forEach((h,i)=>{const o=new V3(...onBack[i]).multiplyScalar(0.75).applyEuler(g.rotation);h.pos.set(g.position.x+o.x,g.position.y+o.y,g.position.z+o.z);h.vel.set(0,0,0);});}},
      end:()=>{W.anims.length=0;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-1.6,0);h.face=Math.PI;});g.position.set(-10,0.4,-21);snapCams();skaz4();}});}
  function skaz4(){G.ui='skaz';const el=$('skaz');el.style.display='flex';
    const steps=[{who:0,title:'Начало выбирает Игрок первый.',opts:['Три головы всё спорили — не сговорились','У огненной реки кузня стояла','Жил-был медведь, что мост держал']},
      {who:1,title:'Помощника выбирает Игрок второй.',opts:['Демьян с молотом тяжёлым','Кикимора с куделью крепкою','Леший со светлячками-огоньками']},
      {who:2,title:'Конец — вместе: оба на одной строке, и оба жмите разом.',opts:['И понял Змей: у трёх голов — одно сердце','И по Калинову мосту опять ходят','И кузнецы от жара пробудились']}];
    let st=0;const sel=[0,0,0],both=[0,0],ok=[false,false];
    const draw=()=>{const s2=steps[st];el.innerHTML='<div class="tet"><h2>Сказ · «Одно сердце»</h2><div class="step">'+s2.title+'</div>'+
      s2.opts.map((o,i)=>'<div class="opt'+((s2.who<2?sel[st]===i:false)?' sel':'')+'">'+(s2.who===2?[0,1].map(q=>both[q]===i?'<b style="color:'+PCSS[q]+'">'+(ok[q]?'●':'○')+'</b>':'<b></b>').join(''):'')+o+'</div>').join('')+
      '<div class="hint">'+(s2.who===2?'оба: '+K(0,'left')+K(0,'right')+' / '+K(1,'left')+K(1,'right')+' · '+K(0,'jump')+' + '+K(1,'jump'):K(s2.who,'up')+K(s2.who,'down')+' · '+K(s2.who,'jump'))+'</div>'+
      '<div class="tale">'+[steps[0].opts[sel[0]],st>0?'помощник — '+steps[1].opts[sel[1]]:''].filter(x=>x).join(' · ')+'</div></div>';};
    draw();
    G.uiTick=()=>{const s2=steps[st];
      if(s2.who<2){const n=uiNav(UW(s2.who));if(n.dy||n.dx){sel[st]=(sel[st]+(n.dy||n.dx)+3)%3;SFX.swap();draw();}if(tap(UW(s2.who),'jump')){SFX.ok();st++;draw();}}
      else{for(const q of[0,1]){const n=uiNav(q);if(n.dy||n.dx){both[q]=(both[q]+(n.dy||n.dx)+3)%3;ok[q]=false;SFX.swap();draw();}if(tap(q,'jump')){ok[q]=true;if(G.solo){ok[1-q]=true;both[1-q]=both[q];}SFX.plate();draw();}}
        if(ok[0]&&ok[1]){if(both[0]===both[1]){sel[2]=both[0];SFX.ok();G.ui=null;G.uiTick=null;el.style.display='none';tell4(steps.map((x,i)=>x.opts[sel[i]]));}
          else{ok[0]=ok[1]=false;SFX.miss();banner('Конец — одной строкой!','#ffd0d0',1.4,'договоритесь — и нажмите вдвоём');draw();}}}};}
  let nb4=null;
  function tell4(t){const pe=T.pelageya,pr=T.proshka;G.flags.skaz4=t;nb4=makeNotebook();nb4.g.scale.setScalar(0.9);nb4.g.position.set(pe.pos.x+0.1,0.95,pe.pos.z+0.3);
    play({dur:15.6,fov:46,shots:[shot(0,[pe.pos.x+1.8,1.3,pe.pos.z+1.5],[pe.pos.x,0.9,pe.pos.z]),shot(8.4,[pr.pos.x-1.6,1.3,pr.pos.z+1.6],[pr.pos.x,0.9,pr.pos.z])],
      says:[[0.3,3.6,'pelageya',t[0]+'…'],[4.1,3.6,'pelageya','И помог им в том '+t[1]+'.'],[7.9,4.2,'pelageya',t[2]+'.'],[12.2,3.2,null,'<i>Пелагея сказывает ровно, гладко —</i><br><i>Но глаз не отрывает от тетрадки.</i>',true]],
      end:()=>{later(0.2,writeScene);}});}
  // «Жил-был мальчишка, который хотел сочинять сказки…» — ручка останавливается
  function writeScene(){G.ui='write';const el=$('skaz');el.style.display='flex';const txt='Жил-был мальчик — сказки сам сложить мечтал…';let n=0,tt=0,stopT=0;
    const draw=()=>{el.innerHTML='<div class="tet" style="min-width:min(560px,92vw)"><div class="step" style="opacity:.7">Пелагея переворачивает страницу и пишет:</div><div style="font:italic 700 24px Georgia,serif;color:#2a1a10;min-height:70px;padding:12px 4px">'+txt.slice(0,n)+(n<txt.length?'<span style="opacity:.5">|</span>':'')+'</div>'+
      (stopT>0?'<div class="hint" style="opacity:.8">Ручка останавливается. Дальше она не знает.</div>':'')+'</div>';};
    draw();
    G.uiTick=()=>{tt+=1/60;if(n<txt.length){if(tt>0.09){tt=0;n++;draw();if(n%3===0)tone(2200+Math.random()*400,0.02,'square',0.015);}}else{stopT+=1/60;if(stopT<0.02)draw();if(stopT>3.8||(stopT>1.2&&(tap(0,'jump')||tap(1,'jump')))){G.ui=null;G.uiTick=null;el.style.display='none';finale4();}}};}
  function finale4(){const pe=T.pelageya;if(nb4){W.group.remove(nb4.g);nb4=null;}
    play({dur:12,fov:48,camK:2.4,shots:[shot(0,[0,4,4],[0,4,-7]),shot(6,[4.4,2.6,-1.4],[1.9,1.4,-5])],
      says:[[0.3,3.6,null,'<i>Кузьма цепь на дуб подымает —</i><br><i>Снова наполовину она сияет.</i>',true],[4.2,2.4,null,'<i>Дуб зелёный. Горыныч у моря дремлет.</i>',true],[6.4,3.4,'kot','<i>(шёпотом, но словами)</i> …и днём и ночью кот учёный…'],[9.8,2,'proshka','Ну… почти что, почти.']],
      events:[{t:0.4,fn:()=>{const c=addCoil(3,true);c.scale.setScalar(0.01);anim(1.4,k=>c.scale.setScalar(Math.max(0.01,smooth(k))));SFX.link();leafShow(4,true);(W.scat||[]).splice(0).forEach(r=>{r.visible=false;});G.flags.coils=Math.max(4,G.flags.coils||0);}},
        {t:6.4,fn:()=>{kot.body.rotation.z=0;kot.lids.forEach(l=>{l.rotation.x=-0.5;});lullaby([67,71,74,72],0.4,0,0.1);}}],
      end:()=>{W.anims.length=0;G.flags.w4done=true;G.flags.coils=4;F.stage='free';banner('Сказ «Одно сердце»','#ffd76a',2.6,'цепь на дубе вновь растёт · Горыныч в узде смирён');later(3,()=>showMenu('end'));}});}
  // после мира 4 Горыныч дремлет у моря
  let gorH=null;if(G.flags.w4done){gorH=makeGorynych5(0.7);gorH.g.position.set(-10,0.4,-21);gorH.g.rotation.y=0.9;W.cyls.push({x:-10,z:-21,r:2.4,miny:-1,maxy:3,on:true});}

  /* ---------- Мир 5: Горыныч везёт на Буян · надпись на песке · Звенышко вернулось · девять звеньев на терем · «Без имён» · Лукоморье после финала ---------- */
  function sandWriting(text,sword,x,z){const cv=document.createElement('canvas');cv.width=512;cv.height=160;const c=cv.getContext('2d');c.fillStyle='rgba(0,0,0,0)';c.fillRect(0,0,512,160);
    c.strokeStyle='rgba(90,60,30,0.85)';c.fillStyle='rgba(90,60,30,0.8)';c.font='bold 54px Georgia, serif';c.textAlign='center';c.fillText(text,sword?220:256,98);
    if(sword){c.lineWidth=7;c.beginPath();c.moveTo(430,30);c.lineTo(470,130);c.moveTo(418,60);c.lineTo(462,52);c.stroke();c.beginPath();c.moveTo(405,40);c.lineTo(495,120);c.moveTo(495,40);c.lineTo(405,120);c.lineWidth=5;c.stroke();}
    const tx=new THREE.CanvasTexture(cv);const m=new THREE.Mesh(new THREE.PlaneGeometry(6,1.9),new THREE.MeshBasicMaterial({map:tx,transparent:true,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(x,0.04,z);W.group.add(m);return m;}
  function w5Intro(){F.stage='w5intro';const pe=T.pelageya,pr=T.proshka;HEROES.forEach((h,i)=>{placeOnGround(h,-5.6+i*1.4,-15.6,0);h.face=Math.atan2(-10-h.pos.x,-21-h.pos.z);});
    const H=gorH?gorH.heads:null;
    play({dur:20,fov:46,camK:2.4,shots:[shot(0,[-3,3,-12],[-10,2,-21]),shot(6.6,[-6,4,-14],[-10,5.4,-19]),shot(13.6,[pe.pos.x+2,1.5,pe.pos.z+1.8],[pe.pos.x,0.9,pe.pos.z])],
      says:[[0.3,3.6,null,'<i>Горыныч у моря потягивается —</i><br><i>Тремя головами разом позёвывается.</i>',true],[4,2,'gorL','Уговор есть уговор.'],[6,1.8,'gorR','Возим, возим!'],[7.8,4.2,'gorM','Садитесь — на Буян! На острове — дуб,<br>А на дубе — сундук…'],
        [12.2,4,'pelageya','…в сундуке — заяц, в зайце — утка,<br>В утке — яйцо, в яйце — игла, не шутка.'],[16.4,2.8,'proshka','Матрёшка, право, какая-то!']],
      events:[{t:0.3,fn:()=>{if(gorH)anim(2,k=>{gorH.g.position.y=0.4+Math.sin(k*Math.PI)*0.6;gorH.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(k*Math.PI*3)*0.5;});});}},
        {t:4,fn:()=>{if(H)anim(0.5,k=>{H[2].jaw.rotation.x=Math.sin(k*Math.PI)*0.5;});}},{t:6,fn:()=>{if(H)anim(0.5,k=>{H[0].jaw.rotation.x=Math.sin(k*Math.PI)*0.5;});}},{t:7.8,fn:()=>{if(H)anim(3.4,k=>{H[1].jaw.rotation.x=Math.abs(Math.sin(k*Math.PI*5))*0.4;});}}],
      end:()=>{W.anims.length=0;G.flags.w5intro=true;later(0.2,mapScene5);}});}
  function mapScene5(){F.stage='map';F.rushnik=true;map.visible=true;map.scale.z=0.01;anim(1.2,k=>{map.scale.z=Math.max(0.01,smooth(k));});icons.forEach(g=>{g.scale.y=1;});
    HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-16.2,0);h.face=Math.PI;});const vz=makeVestZ(helperOf(4));vz.pos.set(0,3,-15);
    play({dur:11.4,fov:46,shots:[shot(0,[0,6.5,-12.5],[0,0,-18.5]),shot(4,[5.4,2.4,-15.6],[4.2,0.4,-18.5]),shot(7.8,[4,2,-14],[4.2,6,-24])],
      says:[[0.4,3.4,null,'<i>Вышит остров: на нём — дуб стоит,</i><br><i>На дубе сундук на четырёх цепях висит.</i>',true],[4,3.2,'pelageya','…пятый мир — остров Буян, за морем-окияном.'],[7.6,3,null,'<i>Весточка — нырь в вышитое море,</i><br><i>И четверых за ней утянуло вскоре.</i>',true]],
      events:[{t:6.9,fn:()=>{const from=vz.pos.clone(),to=new V3(4.2,0.5,-18.5);anim(1.1,k=>{vz.pos.lerpVectors(from,to,k*k);});later(1.1,()=>{ringFx(to,0x7ad8ff,3);burst(to,0xffe0a0,20,5);vz.g.visible=false;SFX.whoosh();});}},
        {t:8.1,fn:()=>{HEROES.forEach(h=>{const from=h.pos.clone(),to=new V3(4.2,0.3,-18.5);anim(1.6,k=>{const q=smooth(k);h.pos.lerpVectors(from,to,q);h.pos.y+=Math.sin(q*Math.PI)*1.2;h.g.scale.setScalar(Math.max(0.05,1-q*0.95));h.face+=0.25;});});}},{t:10,fn:()=>{$('flash').style.transition='opacity .6s';$('flash').style.opacity=1;}}],
      tick:(t)=>{if(t>=4&&t<6.9)vz.pos.set(4.2+Math.sin(t*2)*0.8,2.2+Math.sin(t*3)*0.2,-17.2);},
      end:()=>{G.flags.map5=true;HEROES.forEach(h=>h.g.scale.setScalar(1));goLevel('5-1');setTimeout(()=>{$('flash').style.opacity=0;},700);}});}
  // перед яйцом: Кот пишет на мокром песке «В тереме — не победить» и рисует перечёркнутый меч
  function sandScene(){F.stage='sand';const kz=kuz;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-15.2,0);h.face=Math.PI;});let wr=null;
    play({dur:19,fov:44,camK:2.4,shots:[shot(0,[3,2.6,-13],[1,0.4,-19]),shot(6,[1,5,-15],[0.6,0,-19.6]),shot(11,[6,2,-13],[kz.g.position.x,1.4,kz.g.position.z]),shot(14.6,[2,2.2,-14],[0.4,1,-18.8])],
      says:[[0.3,4.6,null,'<i>Перед яйцом — Лукоморье. Кот подходит к воде и пишет лапой на мокром песке три слова, а рядом рисует перечёркнутый меч.</i>',true],[11,2.6,'kuzma','«В тереме — не победить». Так тому и быть.'],
        [14,4,null,'<i>Кот кивает: мол, щит держать —</i><br><i>И смотреть, и выжидать.</i>',true]],
      events:[{t:0.3,fn:()=>{const f=kot.g.position.clone();kot.g.rotation.y=Math.PI;anim(2,k=>{kot.g.position.lerpVectors(f,new V3(-3.6,0,-18.6),smooth(k));});}},{t:2.6,fn:()=>{kot.g.rotation.y=Math.PI*0.6;wr=sandWriting('В ТЕРЕМЕ — НЕ ПОБЕДИТЬ',true,0.8,-19.6);wr.material.opacity=0;anim(3,k=>{wr.material.opacity=k;});}},
        {t:14,fn:()=>{kot.g.rotation.y=0;anim(2,k=>{kot.body.rotation.x=-Math.sin(k*Math.PI)*0.3;});}}],
      end:()=>{W.anims.length=0;G.flags.sand=true;F.stage='free';kot.body.rotation.x=0;kot.g.position.set(1.9,0,-4.9);kot.g.rotation.y=-0.35;snapCams();}});}
  // девять звеньев Буяна — ворота терема
  function forgeScene5(){F.forging=true;const pr=T.proshka;placeOnGround(pr,7.6,1.8,0);pr.face=Math.atan2(8.6-7.6,0.6-1.8);
    play({dur:14,fov:46,camK:2.4,shots:[shot(0,[5,2.4,4.4],[7.4,1,1.8]),shot(7,[pr.pos.x-1.4,1.3,pr.pos.z+1.6],[8.6,1,0.6])],
      says:[[0.3,2.8,'kuzma','Девять. На терем хватит.'],[3.4,1.8,'proshka','А на цепь-то как?'],[5.4,3.4,'kuzma','Цепь — потом. Сперва — выстоять, устоять.'],[9.4,3.4,null,'<i>Отворились терема ворота.</i>',true]],
      events:[{t:9.4,fn:()=>{SFX.gate();SFX.ok();G.flags.forged5=true;banner('Терема ворота отворились!','#a0ffb8',2.6,'на рушнике-карте — 5-Б1 «Кощей в тереме», гляди!');}}],
      end:()=>{W.anims.length=0;F.forging=false;kuz.arm.rotation.x=0;G.flags.forged5=true;}});}
  // «Без имён»: пустые рамки, «ПРОЩЕНИЯ» на песке, «Я расскажу ему сказку»
  function bezImen(){F.stage='bez';G.flags.nameless=true;G.flags.names=G.flags.names||{};const pe=T.pelageya,pr=T.proshka,po=T.potap,yo=T.yosha;
    placeOnGround(po,-2.6,-14.4,0);placeOnGround(yo,-1,-14.8,0);placeOnGround(pr,1.2,-14.6,0);placeOnGround(pe,2.8,-14.2,0);HEROES.forEach(h=>{h.face=Math.PI;});let wr=null;
    if(W.zven){Z.vis=true;Z.mode='script';Z.pos.set(0.4,2.4,-16);}
    play({dur:52,fov:44,camK:2.2,shots:[shot(0,[0,3,-9],[0,1,-15]),shot(5,[po.pos.x+1.6,1.4,po.pos.z+2],[po.pos.x,1,po.pos.z]),shot(9.4,[yo.pos.x+1.6,1.2,yo.pos.z+2],[po.pos.x,1,po.pos.z]),shot(13.6,[pr.pos.x+1.4,1.2,pr.pos.z+1.8],[pr.pos.x,0.6,pr.pos.z]),
        shot(17,[3,2.6,-14],[0.6,0.2,-19.4]),shot(26,[-1,2,-15],[1,1,-18]),shot(30,[pr.pos.x-1.4,1.3,pr.pos.z+1.8],[pr.pos.x,1,pr.pos.z]),shot(34,[pe.pos.x+2,1.5,pe.pos.z+2],[pe.pos.x,1,pe.pos.z]),shot(47,[pr.pos.x-1.2,1.3,pr.pos.z+1.6],[pr.pos.x,1,pr.pos.z])],
      says:[[0.3,4.4,null,'<i>Мы приходим в себя на Лукоморье, и что-то не так. Над портретами героев — пустые рамки.</i>',true],[5,4.2,null,'<i>Я зову медвежонка — и не помню, как его зовут.</i>',true],
        [9.4,3.6,'yosha','Эй… ты… ну, тот, что мост держал…'],[13.6,3.2,null,'<i>Прошка молчит, на лапы свои глядит.</i>',true],
        [17,5,null,'<i>Кот к воде подходит, слово пишет на песке.</i><br><i>Волна сотрёт — он снова пишет, в тоске.</i>',true],[22.4,3.4,'zven','Про… ще… ни… я.'],
        [26,4,null,'<i>Кот лапой на себя, потом на море кажет —</i><br><i>И голову склоняет, ничего не скажет.</i>',true],[30,3.8,'proshka','Он прощенья хочет попросить. У него — у Кощея.'],
        [34,4.6,null,'<i>Пелагея стоит без тетрадки. У неё больше ничего не написано — не подсмотреть, не спрятаться за крыло.</i>',true],
        [38.8,5.6,'pelageya','Я расскажу ему сказку — сама её сложила,<br>Помню всю — и чем кончится, не позабыла.'],[44.8,2,null,'<i>Говорит она громко, при всех, не читая —</i><br><i>Своими словами, сама, не робея.</i>',true],[47,3.6,'proshka','Расскажи. А я скую — не подведу.']],
      events:[{t:5,fn:()=>{floatText(po.pos.clone().add(new V3(0,2.4,0)),'…?','#e0b27a');}},{t:13.6,fn:()=>{anim(1,k=>{pr.body.rotation.x=0.25*k;});}},
        {t:17,fn:()=>{const f=kot.g.position.clone();kot.g.rotation.y=Math.PI;anim(2,k=>{kot.g.position.lerpVectors(f,new V3(-3.2,0,-18.4),smooth(k));});}},
        {t:19,fn:()=>{kot.g.rotation.y=Math.PI*0.6;wr=sandWriting('ПРОЩЕНИЯ',false,0.8,-19.6);wr.material.opacity=0;anim(1.2,k=>{wr.material.opacity=k;});later(1.6,()=>{anim(0.8,k=>{wr.material.opacity=1-k;});SFX.wave&&SFX.wave();});later(2.8,()=>{anim(1.2,k=>{wr.material.opacity=k;});});}},
        {t:26,fn:()=>{kot.g.rotation.y=0;anim(3,k=>{kot.head.rotation.x=k*0.5;});}},{t:30,fn:()=>{pr.body.rotation.x=0;}}],
      end:()=>{W.anims.length=0;G.flags.bezImen=true;F.stage='free';kot.head.rotation.x=0;kot.g.position.set(1.9,0,-4.9);kot.g.rotation.y=-0.35;if(W.zven)Z.mode='lead';snapCams();
        banner('Открылся финал','#ffd76a',3,'на рушнике-карте — 5-Б2 «Кощей Бессмертный и Златая цепь», гляди!');}});}
  /* ---------- после финала: Кощей там, где его оставила сказка; тетрадка у Кота в избе — Сказ можно рассказать заново ---------- */
  let koschH=null;
  if(G.flags.w5done){const E=(G.flags.ending||['slushat'])[0];
    if(E==='ushel'){addMesh(new THREE.TorusGeometry(0.12,0.035,6,12),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.9}),1.6,5.4,-6.2);const b=new THREE.Group();b.position.set(-1.4,5.2,-6.4);W.group.add(b);addMesh(new THREE.ConeGeometry(0.16,0.26,10),M(0xb89a50,{emissive:0xffc040,emissiveIntensity:0.3}),0,0,0,b);W.updates.push(()=>{b.rotation.z=Math.sin(G.time*2)*0.3;});}
    else if(E==='proshen'){const isl=addMesh(new THREE.CylinderGeometry(6,8,2,14),M(0x7a9a58),-36,-0.4,-70);isl.castShadow=false;box(-37.5,-34.5,0.6,3,-71.5,-68.5,M(0x8a5a36),{solid:false});const rg=new THREE.ConeGeometry(2.6,1.6,4);rg.rotateY(Math.PI/4);addMesh(rg,M(0x6b3f22),-36,3.8,-70);
      koschH=makeKoschei();koschH.g.position.set(-33.4,0.6,-67.6);koschH.g.scale.setScalar(0.9);addMesh(new THREE.TorusGeometry(0.06,0.02,6,10),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.9}),0.18,0.42,0.35,kot.body);koschH=null;}
    else{koschH=makeKoschei();koschH.g.position.set(3.6,0,-5.6);koschH.g.rotation.y=-0.9;koschH.body.position.y=-0.9;W.cyls.push({x:3.6,z:-5.6,r:0.7,miny:-1,maxy:3,on:true});const ham=new THREE.Group();koschH.hand.add(ham);addMesh(new THREE.CylinderGeometry(0.02,0.02,0.3,5),M(0xc89a5a),0,-0.1,0.05,ham);addMesh(new THREE.BoxGeometry(0.08,0.08,0.12),M(0x6a4a2a),0,-0.24,0.05,ham);}
    const tish=makeTishka();tish.g.position.set(-2.4,0,-4.2);tish.g.rotation.y=0.6;W.cyls.push({x:-2.4,z:-4.2,r:0.4,miny:-1,maxy:1,on:true});
    const nb=makeNotebook();nb.g.scale.setScalar(0.8);nb.g.position.set(-12,1.0,-1.6);addMesh(new THREE.BoxGeometry(0.9,0.9,0.6),M(0x6b4424),-12,0.45,-1.6);W.cyls.push({x:-12,z:-1.6,r:0.6,miny:-1,maxy:1,on:true});
    for(const pi of[0,1]){prompt(pi,'attack',()=>headOf(active(pi)),()=>F.stage==='free'&&!G.ui&&hd(active(pi).pos,{x:-12,z:-1.6})<2.2,'пересказать Сказ');
      if(koschH)prompt(pi,'attack',()=>headOf(active(pi)),()=>F.stage==='free'&&!G.ui&&hd(active(pi).pos,koschH.g.position)<2.4,'поговорить');}}
  function retellSkaz5(pi){const B=['Жил-был мальчик — сказки сам сложить мечтал','Жил у Кота Учёного ученик','Жил-был мальчишка с молоточком деревянным'],HK=helpers5().map(k=>(HELPER5[k]||HELPER5.leshy)[0]),EN=['И ушёл он — и был таков','И простили его — и прощенья он просил','И позвали его слушать — сел он в круг'];
    skazClouds({who:1,title:'Тетрадка Пелагеи · пятый Сказ',sub:'тот, что Кощей услыхал · сказывайте заново · начало — Игрок второй',opts:B},a=>{skazClouds({who:0,title:'Пятый Сказ · помощник',sub:'выбирает Игрок 1',opts:HK},b=>{
      skazClouds({who:2,title:'Пятый Сказ · конец',sub:'вместе · у сказки правда не одна бывает',opts:EN},c=>{G.flags.skaz5=[B[a],HK[b],c.map(i=>EN[i]).join(' — а иные сказывают: ')];G.flags.ending=c.map(i=>['ushel','proshen','slushat'][i]);
        bark(kot,'kot',B[a]+'… '+EN[c[0]]+'.',3.4);banner('Сказ пересказан','#ffd76a',2.6,'Где сказка Кощея оставит — там он и встанет, как на Лукоморье вернётесь');});});});}
  /* ---------- Застава трёх богатырей: испытания на время; успели в богатырское время — доспех богатыря в примерочную ---------- */
  const ZAST=[{id:'z-i',b:'Илья Муромец',t:'крен Калинова моста',hero:'Потапу',arm:'armI'},{id:'z-d',b:'Добрыня Никитич',t:'семерых одним махом',hero:'Прошке',arm:'armD'},{id:'z-a',b:'Алёша Попович',t:'колокольная перекличка',hero:'Пелагее',arm:'armA'}];
  const zfmt=t=>{const m=Math.floor(t/60),s=Math.floor(t%60);return (m?m+':':'')+(s<10&&m?'0':'')+s+' с';};
  function openZastava(pi){G.ui='zast';let sel=0;const el=$('mapui');el.style.display='flex';G.zbest=G.zbest||{};
    const draw=()=>{el.innerHTML='<div class="tet"><h2>Застава трёх богатырей</h2><div class="step">'+ICO_GEM+' Самоцветы: '+gemsAvail()+' · испытание открывается за 2 самоцвета · успеете в богатырское время — доспех в примерочную</div>'+
      ZAST.map((z,i)=>{const b=G.zbest[z.id];return '<div class="opt'+(i===sel?' sel':'')+'" style="justify-content:space-between">'+z.b+' · «'+z.t+'»<small>'+(b?'лучшее время '+zfmt(b):G.owned[z.id]?'открыто':'2 самоцвета')+(own(z.arm)?' · доспех получен':'')+'</small></div>';}).join('')+
      '<div class="tale">Навь-изнанка — пять вывернутых уровней — выйдет обновлением</div><div class="hint">'+K(pi,'up')+K(pi,'down')+' · '+K(pi,'jump')+' в путь · '+K(pi,'guard')+' уйти</div></div>';};
    draw();bark(kuz,'kuzma','Богатыри заждались. Самоцветы — вперёд давай.',2);
    G.uiTick=()=>{for(const q of[0,1]){const n=uiNav(q);if(n.dy){sel=(sel+n.dy+ZAST.length)%ZAST.length;SFX.swap();draw();}
      if(tap(q,'guard')||pressed.has('Escape')){closePanel();return;}
      if(tap(q,'jump')){const z=ZAST[sel];if(!G.owned[z.id]){if(gemsAvail()<2){SFX.miss();tip(q,'Два самоцвета надобно — вот уговор:<br>Все звенья уровня собери — и самоцвет твой с тех пор.',2.6);return;}G.gemsSpent+=2;G.owned[z.id]=true;SFX.bell();}
        closePanel();SFX.ok();goLevel(z.id);return;}}};}

  /* ---------- Лукоморье и награды: дуб-градусник, кузня, лавка Векши, сказки Кота, украшения ---------- */
  const hubMode=mode!=='first';
  // дуб зеленеет с каждым скованным звеном; после кражи голоса сереет
  {const green=Math.min(1,G.forgedLinks/59),grey=G.flags.voiceDone?(G.flags.w2done?0.2:0.45):0;oak.traverse(o=>{if(o.isMesh&&o.geometry.type==='SphereGeometry'){const c=new THREE.Color(0x7d8a6a).lerp(new THREE.Color(0x3f9a2c),green).lerp(new THREE.Color(0x8a8a80),grey);o.material=M(c.getHex());}});}
  // скованные звенья — витком по стволу; Кот сидит на цепи ровно там, докуда она скована
  const linkRing=[];const chainPos=k=>{const a=k*0.72+0.6;return new V3(Math.cos(a)*1.62,1.0+k*0.16,-7+Math.sin(a)*1.62);};
  const addLinkRing=k=>{const p=chainPos(k);const r=new THREE.Mesh(new THREE.TorusGeometry(0.14,0.045,6,14),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.6}));r.position.copy(p);r.rotation.set(Math.PI/2,k*0.72,k%2?Math.PI/2:0);W.group.add(r);linkRing.push(r);return r;};
  if(!G.flags.w3done)for(let k=0;k<G.forgedLinks;k++)addLinkRing(k);
  else{const w4c=G.flags.w4done?4:(G.flags.w4c||0);W.scat=[];for(let k=0;k<Math.max(0,26-w4c*7);k++){const r=new THREE.Mesh(new THREE.TorusGeometry(0.14,0.045,6,14),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.4}));r.position.set(rand(-4.5,4.5),0.06,-7+rand(-1,5));r.rotation.set(Math.PI/2+rand(-0.3,0.3),rand(0,3),0);W.group.add(r);W.scat.push(r);}
    leafShow(w4c);kot.g.position.set(1.9,0,-4.9);if(w4c===0&&!G.flags.w4intro){kot.body.rotation.z=1.2;kot.lids.forEach(l=>{l.rotation.x=1.3;});}}
  const perchKot=()=>{if(!hubMode||G.forgedLinks<=0||G.flags.w3done)return;const p=chainPos(G.forgedLinks-1);kot.g.position.set(p.x*1.25,p.y-0.6,p.z+ (p.z+7)*0.25);kot.g.rotation.y=Math.atan2(p.x,p.z+7);kot.g.scale.setScalar(0.8);};
  perchKot();
  const bellsAvail=gemsAvail;   // самоцветы вместо звоночков
  const nutsAvail=()=>worldNuts(1)+worldNuts(2)+worldNuts(3)+worldNuts(4)+worldNuts(5)+(G.nutsHub||0)-G.nutsSpent;
  // Векша — белка-лавочница; тропа на Заставу
  const vek=new THREE.Group();vek.position.set(7.9,0,5.4);vek.rotation.y=-Math.PI/2;W.group.add(vek);
  {const c=M(0xd8743a),w=M(0xf4e0c0);const b=addMesh(new THREE.SphereGeometry(0.34,12,10),c,0,0.5,0,vek);b.scale.set(1,1.3,0.9);addMesh(new THREE.SphereGeometry(0.22,10,8),w,0,0.48,0.2,vek).scale.set(1,1.3,0.6);
    addMesh(new THREE.SphereGeometry(0.24,12,10),c,0,1.02,0.02,vek);for(const s of[-1,1]){addMesh(new THREE.ConeGeometry(0.07,0.22,4),c,s*0.13,1.28,0,vek);addMesh(new THREE.SphereGeometry(0.035,6,5),MAT.dark,s*0.08,1.06,0.21,vek);}
    for(let i=0;i<5;i++)addMesh(new THREE.SphereGeometry(0.22-i*0.02,10,8),M(0xc8642a),0,0.4+i*0.22,-0.35-Math.sin(i*0.6)*0.25,vek);
    addMesh(new THREE.BoxGeometry(1.4,0.8,0.6),M(0x8a5a32),0.9,0.4,0.5,vek);for(let i=0;i<5;i++)addMesh(new THREE.SphereGeometry(0.08,6,5),M(0xffc93c,{emissive:0xb07a10,emissiveIntensity:0.5}),0.4+i*0.25,0.86,0.5,vek);}
  W.cyls.push({x:7.9,z:5.4,r:0.6,miny:-1,maxy:1.6,on:true});
  {const sg=new THREE.Group();sg.position.set(-17.5,0,7);W.group.add(sg);addMesh(new THREE.CylinderGeometry(0.08,0.1,2,6),M(0x6b4a2b),0,1,0,sg);const b=addMesh(new THREE.BoxGeometry(1.6,0.4,0.08),M(0x9a7a50),0.4,1.7,0,sg);b.rotation.z=0.08;
    for(let i=0;i<6;i++)addMesh(new THREE.BoxGeometry(0.6,0.03,0.4),M(0xc8b080),-17.5-i*0.5,0.02,7.8+i*0.7);}
  const ZASTAVA=new V3(-17.5,0,7);
  // украшения из лавки
  const decorBuilt={};
  function buildDecor(id){if(decorBuilt[id])return;decorBuilt[id]=true;
    if(id==='lamps'){for(let i=0;i<9;i++){const a=i/9*Math.PI*2;const x=Math.cos(a)*3.2,z=-7+Math.sin(a)*3.2;addMesh(new THREE.CylinderGeometry(0.01,0.01,1.2,4),MAT.dark,x,6.8,z);addMesh(new THREE.SphereGeometry(0.16,8,6),M([0xff6a4a,0xffd23a,0x7ad8ff][i%3],{emissive:[0xff3000,0xffa000,0x3a90ff][i%3],emissiveIntensity:1.2}),x,6.1,z).castShadow=false;}}
    if(id==='flowers'){for(let i=0;i<14;i++){const x=-14+i*0.32,z=-1.4+Math.sin(i)*0.2;const pc=[0xff9ad0,0xfff08a,0x9ad0ff,0xffffff][i%4];addMesh(new THREE.CylinderGeometry(0.02,0.02,0.3,4),M(0x3f8a3a),x,0.15,z);addMesh(new THREE.SphereGeometry(0.09,6,5),M(pc),x,0.32,z);}
      addMesh(new THREE.BoxGeometry(4.8,0.12,0.7),M(0x6a4a2a),-11.8,0.06,-1.4);}
    if(id==='swing'){for(const dx of[-0.45,0.45])addMesh(new THREE.CylinderGeometry(0.02,0.02,4.6,4),M(0xc8b080),1.9+dx,3.7,-5.2);addMesh(new THREE.BoxGeometry(1.1,0.08,0.4),M(0x8a5a32),1.9,1.4,-5.2);}
    if(id==='flags'){for(const[x1,z1]of[[-12,-4],[12.5,-3],[11,6],[-14.2,9.2]]){for(let i=1;i<14;i++){const u=i/14,x=lerp(0,x1,u),z=lerp(-7,z1,u),y=lerp(5.4,2.9,u)-Math.sin(u*Math.PI)*0.7;
        const f=addMesh(new THREE.ConeGeometry(0.18,0.32,3),M([0xc0302a,0xffd23a,0x3a6ad0,0x3f8a45][i%4]),x,y,z);f.rotation.x=Math.PI;f.castShadow=false;}}}
    if(id==='stupa'){const st=new THREE.Group();st.position.set(-15.6,0,5.2);st.rotation.y=0.6;W.group.add(st);addMesh(new THREE.CylinderGeometry(0.5,0.36,0.8,12),M(0x8a6a44),0,0.4,0,st);addMesh(new THREE.TorusGeometry(0.5,0.04,6,16),M(0x5a4028),0,0.8,0,st).rotation.x=Math.PI/2;
      const br=addMesh(new THREE.CylinderGeometry(0.03,0.03,1.6,5),M(0x6b4a2b),0.3,1.0,0,st);br.rotation.z=-0.4;const bw=addMesh(new THREE.ConeGeometry(0.16,0.4,6),M(0xd8b86a),0.62,0.28,0,st);bw.rotation.z=-0.4;for(let i=0;i<2;i++)addMesh(new THREE.BoxGeometry(0.08,0.06,1.4),M(0x6b4a2b),(i?0.25:-0.25),0.03,0,st);}
    if(id==='samovar'){const sv=new THREE.Group();sv.position.set(4.2,0,-3.2);W.group.add(sv);addMesh(new THREE.BoxGeometry(1.1,0.7,0.8),M(0x8a5a32),0,0.35,0,sv);addMesh(new THREE.CylinderGeometry(0.28,0.22,0.55,12),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),0,0.98,0,sv);
      addMesh(new THREE.CylinderGeometry(0.05,0.05,0.4,6),M(0x5a5a60),0,1.45,0,sv);addMesh(new THREE.SphereGeometry(0.1,8,6),M(COL.gold),0.26,0.9,0.1,sv);for(let i=0;i<3;i++)addMesh(new THREE.CylinderGeometry(0.07,0.07,0.1,8),M(0xf4f0e8),-0.3+i*0.3,0.75,0.25,sv);}}
  for(const id of['lamps','flowers','swing','flags','samovar','stupa'])if(own(id))buildDecor(id);
  /* кузня: сдать звенья — три удара в такт с Кузьмой; в мире 1 он поправляет каждый удар */
  const FG={on:false};
  function forgeGame(){const fw=(G.flags.w4done?[5]:G.flags.w3done?[4]:[1,2,3]).find(x=>worldLinks(x)>(G.forgedW[x]||0));if(!fw)return;const pending=worldLinks(fw)-(G.forgedW[fw]||0);FG.w=fw;G.ui='forge';F.forging=true;const pr=HERO.proshka;placeOnGround(pr,7.9,1.5,0);pr.face=Math.atan2(8.6-7.9,0.6-1.5);
    FG.on=true;FG.t=-2*0.75;FG.k=-3;FG.pending=pending;FG.res=[];FG.pressed={};
    if(!FG.ring){FG.ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.05,6,28),MB(COL.gold,{transparent:true,opacity:0.9}));FG.ring.rotation.x=Math.PI/2;W.group.add(FG.ring);}
    FG.ring.visible=true;banner('Кузня · звеньев мира '+fw+' к ковке: '+pending,'#ffd76a',2.2,fw===5?'звенья Буяна: бей '+K(0,'attack')+' в такт — девять звеньев терем отворят':fw===4?'на равных: Кузьма ударил — ты вослед, '+K(0,'attack')+' в такт':fw===3?'сам куёшь, Кузьма лишь держит: бей '+K(0,'attack')+' в лад':fw===2?'молот твой: бей '+K(0,'attack')+' в такт — Кузьма лишь последний удар поправит':'Кузьма ударил — ты вослед: бей '+K(0,'attack')+' в такт трижды');}
  function forgeTick(dt){const B=0.75;FG.t+=dt;const k=Math.floor(FG.t/B+1e-6);
    while(FG.k<k){FG.k++;const n=FG.k;if(n<0){tone(1760,0.05,'square',0.05);}else if(n%2===0&&n<6&&FG.w!==3){anim(0.3,q=>{kuz.arm.rotation.x=-Math.sin(q*Math.PI)*1.3;});later(0.12,()=>{SFX.hammer();burst(new V3(8.6,1.0,0.6),0xffb040,8,3);blank.material.emissiveIntensity=1.3;});}}
    const pr=HERO.proshka;const next=[1,3,5].find(b=>!FG.pressed[b]&&FG.t<b*B+0.3);
    if(next!==undefined){const u=clamp((next*B-FG.t)/B,0,1);FG.ring.position.set(8.6,0.95,0.6);FG.ring.scale.setScalar(lerp(0.3,1.6,u));FG.ring.material.color.setHex(u<0.15?0xffffff:COL.gold);}
    if(tap(0,'attack')){const b=[1,3,5].find(x=>!FG.pressed[x]&&Math.abs(FG.t-x*B)<0.45);if(b!==undefined){const ok=Math.abs(FG.t-b*B)<=0.18;FG.pressed[b]=true;const fx=FG.w===2&&b===5&&!ok;FG.res.push(ok||fx);strikeP(ok||fx,fx);}}
    for(const b of[1,3,5])if(!FG.pressed[b]&&FG.t>b*B+0.3){FG.pressed[b]=true;const fx=FG.w===2&&b===5;FG.res.push(fx);strikeP(fx,fx);}
    if(FG.t>5*B+0.9){FG.on=false;FG.ring.visible=false;G.ui=null;F.forging=false;kuz.arm.rotation.x=0;
      const before=G.forgedLinks,bw=G.forgedW[FG.w]||0;G.forgedW[FG.w]=bw+FG.pending;G.forgedLinks=(G.forgedW[1]||0)+(G.forgedW[2]||0)+(G.forgedW[3]||0)+(G.forgedW[4]||0)+(G.forgedW[5]||0);const good=FG.res.filter(x=>x).length;
      for(let i=before;i<G.forgedLinks;i++){const r=addLinkRing(i);r.scale.setScalar(0.01);later((i-before)*0.18,()=>{anim(0.4,q=>r.scale.setScalar(Math.max(0.01,q)));SFX.link();});}
      later((G.forgedLinks-before)*0.18+0.3,perchKot);
      const extra=Math.max(0,G.forgedW[FG.w]-GATE(FG.w))-Math.max(0,bw-GATE(FG.w));
      banner('Выковано звеньев: '+FG.pending,'#ffd76a',2.4,(good===3?'все три удара — звон на всю округу!':'звонких ударов: '+good+' из 3'));
      if(FG.w===1&&bw<12&&G.forgedW[1]>=12&&!G.flags.forged)later(2.6,forgeScene);else if(FG.w===2&&bw<12&&G.forgedW[2]>=12&&!G.flags.forged2)later(2.6,forgeScene2);else if(FG.w===3&&bw<12&&G.forgedW[3]>=12&&!G.flags.forged3)later(2.6,forgeScene3);else if(FG.w===4&&bw<12&&G.forgedW[4]>=12&&!G.flags.forged4)later(2.6,forgeScene4);else if(FG.w===5&&bw<9&&G.forgedW[5]>=9&&!G.flags.forged5)later(2.6,forgeScene5);
      else later(1.4,()=>bark(kuz,'kuzma',FG.w===5?(good===3?'Звенит. Как у Демьяна.':'Ровнее, мастер.'):FG.w===4?(good===3?'На равных.':'Ещё раз. Вместе.'):FG.w===3?(good===3?'Руки есть. А голова? Поглядим сперва.':'Хм.'):FG.w===2?(good===3?'Вот. Слышишь? Сам.':'Почти. Слушай металл.'):(good===3?'Руки есть. А голова? Поглядим сперва.':'Слушай металл, Прошка.'),2.2));}}
  function strikeP(ok,fixed){const pr=HERO.proshka;pr.atkT=0.28;later(0.08,()=>{if(ok){tone(2400,0.5,'triangle',0.22);SFX.hammer();burst(new V3(8.6,1.0,0.6),0xffe060,16,5);floatText(new V3(8.6,1.9,0.6),fixed?'Кузьма поправил — и звенит!':'Звон!','#ffe36b');if(fixed)anim(0.4,q=>{kuz.arm.rotation.z=Math.sin(q*Math.PI)*0.4;});}
    else{SFX.clink();floatText(new V3(8.6,1.9,0.6),'Тук…','#dddddd');if(FG.w===1){later(0.3,()=>bark(kuz,'kuzma',FG.corrected?'Послушай, как поёт металл.':'Не лупи сплеча — послушай металл.',1.6));FG.corrected=true;anim(0.4,q=>{kuz.arm.rotation.z=Math.sin(q*Math.PI)*0.4;});}}});}
  /* лавка Векши — большая витрина с примеркой: см. ниже («ЛУКОМОРЬЕ: лавка Векши с примеркой…») */
  /* сказки-лубки Кота (до финала — картинками и пантомимой) и пляска Кота на цепи — за самоцветы */
  const TALES=[{id:'yaga',lv:'1-1',name:'«Баба Яга и клубок»',lines:['В лесу дремучем Яга жила,<br>Изба на курьих ножках у ней была.','Пришли к ней четверо гостей:<br>«Повернись, избушка, к нам передом скорей!»','Потрудились — Яга клубок дала:<br>Катится, куда брошен, — нить-тропу вела.']},
    {id:'kolobok',lv:'1-3',name:'«Колобок с пружиной»',lines:['Колобок по лесу катился,<br>Песней звонкой заливался.','Встретил лису — да лиса была не та:<br>Есть не стала — вот так доброта!','«В тебе пружинка», — молвила она.<br>С тех пор Колобок катится — жизнь весела!']},
    {id:'leshy',lv:'1-4',name:'«Шапка наизнанку»',lines:['Леший путников в лесу водил,<br>Ёлками тропинки путал-кружил.','Шапку наизнанку кто наденет —<br>Того и Леший не закружит, не заденет.','Нашли его четверо друзей —<br>И стал Леший проводником путей.']},
    {id:'kiki',lv:'1-5',name:'«Кикиморина прялка»',lines:['В старом овине Кикимора пряла,<br>Чужим голосом песни вела.','Веретено звенело у ней,<br>Словно связка чёрных ключей.','Веретено отняли — и голос свой<br>Вернулся к ней. Должницей стала — вот какой!']},
    {id:'sadko',lv:'2-1',name:'«Гусли Садко»',lines:['Садко во Китеже на дне сидел,<br>Струна порвалась — он не пел.','Срастил струну ёжик мёртвою водой —<br>И гусли запели звонкой чередой.','Молвил Садко: «Вода разговоры любит —<br>Лишь в Китеже не молчите: молчанье губит».']},
    {id:'kit',lv:'2-2',name:'«Чудо-юдо Рыба-кит»',lines:['Чудо-юдо Рыба-кит<br>Поперёк моря лежит,<br>На спине — деревня с огородами,<br>С избами да хороводами.','Вода у кита на спине — одна на всех:<br>Кто прилив, кто отлив — договоритесь без помех.','А в прилив фонтан китовый бьёт —<br>До облаков тебя подбросит, вознесёт.']},
    {id:'rybka',lv:'2-3',name:'«Невод из клубков»',lines:['Жил старик у самого моря,<br>Сорок лет чинил невод — да всё в дырах, вот горе.','Четверо невод из клубков сплели,<br>Углы держали — прилив подняли.','Вытащили рыбку золотую — звено она дала,<br>А старику чинить невод не надо — вот дела!']},
    {id:'kitezh',lv:'2-5',name:'«Китеж звонит»',lines:['Колокола Китежа молчали,<br>Каждый — на своей глубине, в печали.','Звонили лишь тогда они,<br>Когда вода вставала вровень, как в былые дни.','А главный колокол от шёпота проснулся:<br>«Бом», — тихонько отозвался.']},
    {id:'pero',lv:'3-1',name:'«Перо Жар-птицы»',lines:['В саду у Жар-птицы тьма легла —<br>Перья все она растеряла.','Последние перья четверым дала:<br>Зажжёшь — светло, погасишь — мгла,<br>И у каждой темноты — свои мостки.','Постояли у серых яблонь со светом —<br>И сад ожил, как летом.']},
    {id:'barashki',lv:'3-2',name:'«Облачные барашки»',lines:['Над облаками барашки пасутся,<br>А пастуха нет — вот и не соберутся.','Облака тепло любят: под пером горящим<br>Подымаются, как пирог в печи пыхтящей.','А барашки к свету бегут гурьбой —<br>И мостком через пропасть встают собой.']},
    {id:'korabl',lv:'3-4',name:'«Летучий корабль»',lines:['У облачной пристани корабль стоял,<br>Крылья вместо вёсел он расправлял.','Перо в фонарь повесили — и вот:<br>Паруса налились светом — в полёт!','Кренился он туда, где вес тяжелей,<br>А медведь — за троих, всех грузней.']},
    {id:'gusi',lv:'3-5',name:'«Гуси-лебеди»',lines:['Гуси-лебеди бельчонка унесли —<br>Того, что колыбельную забыл вдали.','Прятали четверых печка, яблонька да речка —<br>Тех, кто угощенья не отверг, сердечно.','А Яга долг вернула сполна —<br>И снова осталась должна.']},
    {id:'kuznya',lv:'4-1',name:'«Кузня Кузьмы и Демьяна»',lines:['У огненной реки кузня стояла,<br>Кузнецов в ней каменная дрёма сковала.','Прошка клещи сковал в такт, как бил мороков,<br>А Пелагея мехи качала без лишних слов.','Горн вспыхнул — кузнецы проснулись вдруг.<br>«Сам?» — Демьян спросил, окинув круг.']},
    {id:'smorodina',lv:'4-2',name:'«Река Смородина»',lines:['Текла Смородина-река огнём —<br>Ни перепрыгнуть, ни перелететь её днём.','Йоша живую воду лил — огонь коркой застывал,<br>А клещами корку дальше каждый нёс-подавал.','У лавопада Потап промолвил вдруг:<br>«Ладно. Не „сиди тут“, мой друг».']},
    {id:'valy',lv:'4-4',name:'«Змиевы валы»',lines:['Встарь кузнецы запрягли Змея в плуг —<br>Пропахали Змиевы валы вокруг.','Четверо плуг клещами за лемех взяли —<br>И лаву бороздою повели-погнали.','Лаву не бьют — её ведут.']},
    {id:'most',lv:'4-5',name:'«Калинов мост»',lines:['Над Смородиной — мост Калинов,<br>Из калёных досок, крепок и длинен.','Мост Потап держал, пока друзья прошли,<br>И не обернулся — будто врос в земли.','«Ты держал». — «А ты чинил, не жалея сил».']},
    {id:'dance',name:'Пляска Кота на цепи',cost:1},{id:'sunduk',lv:'5-1',name:'«Сундук на дубе»',lines:['У Буяна бел-горюч камень Алатырь лежит,<br>Четыре знака по нему бегут-бежит.','На дубе — сундук на пяти цепях: четыре с замками, а пятую держит Лихо Одноглазое.','Лихо не бьют — Лихо усыпляют. Не буди лихо, пока оно тихо!']},
    {id:'zayac',lv:'5-2',name:'«Заяц»',lines:['Зайца не догнать — зайца загоняют.','Встали четверо столбами в ряд,<br>А меж ними нити клубков летят.','А придумал, как быть, — самый малый, ёж.']},
    {id:'yajco',lv:'5-4',name:'«Яйцо»',lines:['В яйце — Кощеев бальный зал,<br>Золотой, вверх дном он стал.','«Калинка» играла, и в такт, в долю,<br>Пол переворачивался поневоле.','А в клетке из чёрных ниток Звенышко сидело —<br>И Йоша успел — вот какое дело!']},
    {id:'zastava',name:'Испытанья Заставы — у знака Заставы ждут.',cost:2,locked:true}];
  function openTales(pi){G.ui='tales';let sel=0;const el=$('mapui');el.style.display='flex';const list=TALES.filter(t=>!t.lv||G.done[t.lv]);
    const draw=()=>{el.innerHTML='<div class="tet"><h2>Кот Учёный · сказки-лубки</h2><div class="step">'+ICO_GEM+' Самоцветы: '+gemsAvail()+' <small style="opacity:.7">(самоцвет — за уровень, где собраны все звенья, и за каждого босса)</small></div>'+
      list.map((t,i)=>'<div class="opt'+(i===sel?' sel':'')+'" style="justify-content:space-between'+(t.locked?';opacity:.5':'')+'">'+(t.lv?'Сказка '+t.name:t.name)+'<small>'+(t.lv?(G.tales[t.id]?'смотреть снова':'1 самоцвет'):t.locked?'скоро':(t.cost+' самоцвет'))+'</small></div>').join('')+
      (list.length<3?'<div class="tale">новые сказки — за пройденные уровни мира</div>':'')+'<div class="hint">'+K(pi,'up')+K(pi,'down')+' · '+K(pi,'jump')+' · '+K(pi,'guard')+' уйти</div></div>';};
    draw();if(G.flags.kotVoice)bark(kot,'kot','Садитесь! Расскажу — словами, своими, живыми!',2);else if(!G.flags.voiceDone)bark(kot,'kot','Садитесь. Лапами расскажу — как смогу.',1.8);else bark(kot,'kot','Мяу.',1.2);
    G.uiTick=()=>{for(const q of[0,1]){const n=uiNav(q);if(n.dy){sel=(sel+n.dy+list.length)%list.length;SFX.swap();draw();}
      if(tap(q,'guard')||pressed.has('Escape')){closePanel();return;}
      if(tap(q,'jump')){const t=list[sel];if(t.locked){SFX.miss();return;}const cost=t.lv?(G.tales[t.id]?0:1):t.cost;if(gemsAvail()<cost){SFX.miss();tip(q,'Нужен самоцвет. А самоцвет дают тому,<br>Кто все звенья в уровне собрал — по одному.',2.6);return;}
        G.gemsSpent+=cost;SFX.bell();if(t.lv){G.tales[t.id]=true;showLubok(t);}else{closePanel();kotDance();}}}};}
  function showLubok(t){G.ui='lubok';const el=$('mapui');let i=0,tt=0;const svg=LUBOK[t.id]||'';
    const draw=()=>{el.innerHTML='<div class="lubok"><div style="font:900 22px Georgia,serif;color:#8a1a14;margin-bottom:8px">Сказка-лубок '+t.name+'</div>'+svg+'<div class="cap">'+t.lines[i]+'</div><div class="hint" style="font:600 13px system-ui;opacity:.7">'+(i+1)+' / '+t.lines.length+' · '+K(0,'jump')+' дальше</div></div>';};
    draw();babble('kot',t.lines[0]);
    G.uiTick=()=>{tt+=1/60;kot.body.rotation.z=Math.sin(G.time*3)*0.12;kot.head.rotation.y=Math.sin(G.time*2)*0.4;
      if(tt>4.2||tap(0,'jump')||tap(1,'jump')){tt=0;i++;if(i>=t.lines.length||pressed.has('Escape')){closePanel();SFX.ok();return;}draw();SFX.flower();}
      if(tap(0,'guard')||tap(1,'guard')||pressed.has('Escape'))closePanel();};}
  function kotDance(){SFX.ok();F.kotDance=4;banner('Кот на цепи пустился в пляс!','#ffd76a',2,'весь дуб звенит-поёт');SONG_C.forEach((l,i)=>later(i*0.26,()=>{gusli(l[0],0,0.14);}));}
  function closePanel(){G.ui=null;G.uiTick=null;$('mapui').style.display='none';}
  const nearNpc=(h,p,r)=>hd(h.pos,p)<(r||2.6)&&h.pos.y<1.5;
  if(hubMode){
    W.updates.push(dt=>{
      if(FG.on)forgeTick(dt);
      if(F.kotDance>0){F.kotDance-=dt;kot.body.rotation.y=Math.sin(G.time*10)*0.5;kot.body.position.y=Math.abs(Math.sin(G.time*8))*0.3;if(F.kotDance<=0){kot.body.rotation.y=0;kot.body.position.y=0;}}
      if(F.stage!=='free'||G.ui||G.cine)return;
      for(const pi of[0,1]){const h=active(pi);
        if(helperOf(1)==='yaga'&&((G.flags.w2intro&&!G.flags.w2done)||(G.flags.w3intro&&!G.flags.w3done))&&tap(pi,'call')&&!danceOwned()){SFX.whoosh();floatText(h.pos.clone().add(new V3(0,2,0)),'Ступа Яги!','#e08a8a');openMap(pi);break;}
        if(tap(pi,'call')&&danceOwned()&&hubDance(pi))break;
        if(!tap(pi,'attack'))continue;
        if(nearNpc(h,vek.position)){dressOpen(pi,'shop');break;}
        if(nearNpc(h,kot.g.position,3.2)){openTales(pi);break;}
        if(nearNpc(h,ZASTAVA,2.4)){openZastava(pi);break;}
        if(G.flags.w5done&&nearNpc(h,new V3(-12,0,-1.6),2.2)){retellSkaz5(pi);break;}
        if(koschH&&nearNpc(h,koschH.g.position,2.4)){bark(koschH,'koschei',['Расскажи ещё — прошу.','Молоточек почти готов — ещё чуток.','Я слушаю. Сказывай.'][Math.floor(rand(0,3))],2);break;}}});
    const lab=(pi,pos,dist,text,cond)=>prompt(pi,'label',()=>pos(),()=>F.stage==='free'&&!G.ui&&hd(active(pi).pos,pos())<dist&&(!cond||cond()),text);
    for(const pi of[0,1]){
      lab(pi,()=>new V3(10.2,3.2,-0.6),9,'Кузьма · кузня',()=>!(hd(active(pi).pos,anvil.position)<2.2));
      lab(pi,()=>new V3(7.9,2.4,5.4),9,'Векша · лавка',()=>!nearNpc(active(pi),vek.position));
      lab(pi,()=>kot.g.position.clone().add(new V3(0,2.6,0)),9,'Кот Учёный · сказки',()=>!nearNpc(active(pi),kot.g.position,3.2));
      lab(pi,()=>new V3(-17.5,2.6,7),8,'Застава · испытания богатырей');
      prompt(pi,'attack',()=>headOf(active(pi)),()=>F.stage==='free'&&!G.ui&&nearNpc(active(pi),ZASTAVA,2.4),'испытания');
      prompt(pi,'attack',()=>headOf(active(pi)),()=>F.stage==='free'&&!G.ui&&nearNpc(active(pi),vek.position),'лавка Векши');
      prompt(pi,'attack',()=>headOf(active(pi)),()=>F.stage==='free'&&!G.ui&&nearNpc(active(pi),kot.g.position,3.2),'сказки Кота');}
  }
  /* ---------- карта-рушник: выбор уровня ---------- */
  function openMap(pi){G.ui='map';let wsel=curWorld(),list=[],sel=0;const el=$('mapui');el.style.display='flex';
    const wOpen=w=>w===1||(w===2&&!!G.flags.voiceDone)||(w===3&&!!G.flags.w2done)||(w===4&&!!G.flags.w3done)||(w===5&&!!G.flags.w4done);
    // эпилог — в списке Острова Буяна последним, после финала (у него нет своего мира); открыт, как одолели Кощея
    // пролог — в списке Дремучего леса первым: открыт всегда, проходится заново, после него — снова в Лукоморье
    const isEpi=l=>l.id==='epi',isPro=l=>l.id==='p',doneL=l=>!!G.done[l.id]||(isEpi(l)&&!!G.flags.epiDone)||(isPro(l)&&!!G.flags.proDone);
    const setW=w=>{wsel=w;list=LEVELS.filter(l=>l.world===w||(w===5&&isEpi(l))||(w===1&&isPro(l)));sel=list.findIndex(l=>!isPro(l)&&!doneL(l));if(sel<0)sel=list.findIndex(l=>!isPro(l));};setW(wsel);
    const gateOK=l=>l.world===1?G.flags.forged:l.world===2?G.flags.forged2:l.world===3?G.flags.forged3:l.world===4?G.flags.forged4:l.id==='5-B2'?(!!G.done['5-B1']&&!!G.flags.bezImen):G.flags.forged5;const bossTo=w=>w===1?'к Лешему':w===2?'к Водяному':w===3?'к Соловью':w===4?'к Горынычу':'в терем';
    const open=l=>isPro(l)?true:isEpi(l)?(!!G.done['5-B2']||doneL(l)):l.boss?gateOK(l):(l===list.find(x=>!isPro(x))?wOpen(l.world):(G.done[LEVELS[LEVELS.indexOf(l)-1].id]||G.done[l.id]));
    const TAGS={'1-3':'♪ гусельный · ','2-3':'на четверых · ','2-4':'экран разделён · ','3-3':'♪ гусельный · ','3-4':'летучий корабль · ','3-5':'погоня · ','4-2':'лавопад · ','4-3':'на четверых · ','4-5':'путь Потапа · ','5-1':'Лихо · ','5-2':'на четверых · ','5-3':'полёт · ','5-4':'♪ гусельный · '};
    const draw=()=>{el.innerHTML='<div class="rush"><h2>Карта-рушник</h2><div class="worlds">'+WORLDN.map((w,i)=>'<span class="'+(i+1===wsel?'on':wOpen(i+1)?'':'off')+'">'+(i+1)+' · '+w+(wOpen(i+1)?'':' <small>скоро</small>')+'</span>').join('')+'</div>'+
      list.map((l,i)=>{const ok=open(l),got=G.got[l.id]||0,nut=(G.nutsGot&&G.nutsGot[l.id])||0;
        const tag=isPro(l)?'начало сказки · Звенышко и тетрадка Пелагеи':isEpi(l)?(ok?'вечер в штабе-сосне · театр теней · колыбельная · титры':'откроется после финала'):l.boss?(gateOK(l)?(l.id==='5-B2'?'финал':'ворота открыты'):l.id==='5-B2'?'сначала — терем':'🔗 '+(G.forgedW[l.world]||0)+' / '+GATE(l.world)+' — кузня Кузьмы'):(TAGS[l.id]||'')+'звенья '+got+' / '+l.links+(G.gems[l.id]?' '+ICO_GEM:'')+(l.nuts?' · '+ICO_NUT+' '+nut+' / '+l.nuts:'')+(G.secrets[l.id]?' · карта тайников':'');
        return '<div class="lv'+(i===sel?' sel':'')+(ok?'':' lock')+'">'+(doneL(l)?'✓ ':ok?'• ':'🔒 ')+l.name+'<small>'+tag+(l.boss&&G.gems[l.id]?' '+ICO_GEM:'')+'</small></div>';}).join('')+
      '<div class="hint">'+K(pi,'left')+K(pi,'right')+' мир · '+K(pi,'up')+K(pi,'down')+' уровень · '+K(pi,'jump')+' в путь · '+K(pi,'attack')+' вышить карту тайников (1 самоцвет) · '+K(pi,'guard')+' свернуть</div></div>';};
    draw();
    G.uiTick=()=>{for(const q of[0,1]){const n=uiNav(q);if(n.dy){sel=(sel+n.dy+list.length)%list.length;SFX.swap();draw();}
        if(n.dx){const nw=wsel+n.dx;if(nw>=1&&nw<=5&&wOpen(nw)){setW(nw);SFX.swap();draw();}else SFX.miss();}
        if(tap(q,'guard')||pressed.has('Escape')){closeMap();return;}
        if(tap(q,'attack')){const l=list[sel];const nb=gemsAvail();if(l.boss||isEpi(l)||isPro(l)||G.secrets[l.id]){SFX.miss();return;}if(nb<1){SFX.miss();tip(q,'Нужен самоцвет. А самоцвет дают тому,<br>Кто все звенья в уровне собрал — по одному.',2.6);return;}
          G.gemsSpent++;G.secrets[l.id]=true;SFX.bell();banner('Карта тайников на рушнике расшита!','#ffd76a',2,l.name+': над орешками — света столбы до небес');draw();}
        if(tap(q,'jump')){const l=list[sel];if(!open(l)){SFX.miss();tip(q,isEpi(l)?'Эпилог откроется, как Кощея одолеете.':l.boss?(l.id==='5-B2'?'Финал откроется, как терем пройдёте.':'Ворота '+bossTo(l.world)+' Кузьма откроет, как скуёте<br>'+GATE(l.world)+' звеньев этого мира — тогда и пойдёте.'):'Сперва пройдите тот уровень, что прежде.',2.4);return;}
          SFX.ok();closeMap();travelTo(l);return;}}};}
  function travelTo(l){const w=l.world||(l.id==='epi'?5:1),ic=new V3(-4.2+(w-1)*2.1,0.3,map.position.z+2.5),col=[COL.gold,0x7ad8ff,0xffe0f0,0xff8a3a,0xffd23a][w-1];
    F.rushnik=true;map.visible=true;loomSpin=7;anim(0.9,k=>{map.scale.z=Math.max(0.01,smooth(k));});const icg=icons[w-1];
    later(0.6,()=>{SFX.bell();tone(mf(74),0.6,'sine',0.14);tone(mf(79),0.6,'sine',0.1,null,0.12);anim(0.9,k=>{icg.scale.set(1+k*0.6,0.08+smooth(k)*1.6,1+k*0.6);});for(let i=0;i<5;i++)later(i*0.14,()=>ringFx(ic.clone(),col,1+i*0.6));});
    play({dur:3.0,fov:46,shots:[shot(0,[0,6.5,-11.2],[0,0,ic.z]),shot(0.8,[ic.x*0.5,3.6,ic.z+4.2],[ic.x,0.5,ic.z]),shot(1.8,[ic.x,1.4,ic.z+1.3],[ic.x,0.7,ic.z])],says:[],events:[],end:()=>{}});
    HEROES.forEach((h,i)=>{const from=h.pos.clone();later(0.35+i*0.12,()=>{anim(1.2,k=>{const s2=smooth(k),a=k*7+i*1.6,rr=(1-s2)*1.3;h.pos.set(lerp(from.x,ic.x,s2)+Math.cos(a)*rr,from.y+Math.sin(k*Math.PI)*1.8,lerp(from.z,ic.z,s2)+Math.sin(a)*rr);h.g.scale.setScalar(Math.max(0.05,1-s2*0.95));
      if(Math.random()<0.5)burst(h.pos.clone().add(new V3(0,0.5,0)),col,2,1.4);});});});
    later(2.0,()=>{ringFx(ic,col,3.4);goLevel(l.id);});}
  function closeMap(){G.ui=null;G.uiTick=null;$('mapui').style.display='none';}
  W.onLeave=()=>{closeMap();$('skaz').style.display='none';};
  /* ============ ЛУКОМОРЬЕ: лавка Векши с примеркой, примерочная, огород Дедки, курятник Рябы, пляски ============ */
  // пляски: мелодия гуслей и своё движение; выбранная пляска — на «Ко мне!» в Лукоморье
  const DANCES={barynya:{name:'Пляска «Барыня»',cost:10,notes:[74,76,78,79,78,76,74,71],st:'spin',desc:'Кружится вся честная компания!'},
    berezka:{name:'Хоровод «Берёзка»',cost:10,lv:'3-3',notes:[67,71,74,72,71,69,67,69],st:'sway',desc:'Плавно, как берёзки поутру на ветру.'},
    burlak:{name:'Пляска «Бурлацкая»',cost:12,lv:'4-3',notes:[57,60,62,60,57,55,57,62],st:'lean',desc:'Эх, ухнем! Баржу тянем — не устанем!'},
    zmeyka:{name:'Пляска «Змейка»',cost:12,lv:'5-3',notes:[72,74,76,79,76,74,72,67],st:'wave',desc:'Волной, змейкой — друг за дружкой.'},
    kalinka:{name:'Пляска «Калинка»',cost:14,lv:'5-4',notes:[76,74,72,71,69,71,72,74],st:'squat',desc:'Вприсядку! Живей, живей, веселей!'}};
  const DANCE_IC=SV('<circle cx="22" cy="18" r="7" fill="#e0784a"/><path d="M22 25 L14 44 M22 25 L32 42 M16 32 L6 26 M28 32 L40 24" stroke-width="4"/><path d="M44 12 v18 a5 5 0 1 1 -3 -4" fill="none" stroke="#c0302a" stroke-width="3"/>');
  const LUKO_GOODS=[
    {id:'lamps',name:'Фонарики на дубе',cost:8,desc:'На ветках огоньки — что звёзды-светлячки.',icon:SV('<path d="M8 12 Q32 30 56 12" fill="none"/><circle cx="16" cy="22" r="6" fill="#ff6a4a"/><circle cx="32" cy="28" r="6" fill="#ffd23a"/><circle cx="48" cy="22" r="6" fill="#7ad8ff"/>')},
    {id:'flowers',name:'Клумба у избы',cost:10,desc:'Ромашки, колокольчики, васильки — цветут у избы, у реки.',icon:SV('<rect x="6" y="46" width="52" height="10" rx="3" fill="#6a4a2a"/><circle cx="18" cy="34" r="7" fill="#ff9ad0"/><circle cx="32" cy="28" r="7" fill="#fff08a"/><circle cx="46" cy="34" r="7" fill="#9ad0ff"/>')},
    {id:'swing',name:'Качели на ветке дуба',cost:12,desc:'Качайтесь вволю — до самой зорьки!',icon:SV('<path d="M16 4 V44 M48 4 V44" stroke-width="3"/><rect x="10" y="42" width="44" height="7" rx="3" fill="#8a5a32"/>')},
    {id:'flags',name:'Флажки-ленты между избами',cost:15,desc:'Каждый день у нас — праздник!',icon:SV('<path d="M4 10 Q32 26 60 10" fill="none"/><path d="M12 14 l4 12 l4 -10Z" fill="#c0302a"/><path d="M26 19 l4 12 l4 -11Z" fill="#ffd23a"/><path d="M40 19 l4 12 l4 -12Z" fill="#3a6ad0"/>')},
    {id:'samovar',name:'Самовар у Кота',cost:20,desc:'Чай с баранками — после похода, в любую погоду.',icon:SV('<path d="M20 20 H44 L48 46 H16Z" fill="#ffd23a"/><rect x="28" y="8" width="8" height="12" fill="#6a6a70"/><rect x="14" y="46" width="36" height="8" rx="2" fill="#8a5a32"/>')},
    {id:'stupa',name:'Ступа-санки у Заставы',cost:14,lv:'3-5',desc:'Ступа Яги — кататься да смеяться.',icon:SV('<path d="M16 24 H48 L42 54 H22Z" fill="#8a6a44"/><path d="M40 6 L30 40" stroke-width="3"/><path d="M26 38 l-8 14 h12Z" fill="#d8b86a"/>')},
    {id:'lubok',name:'Фоторежим «Лубок»',cost:20,desc:'Кадр-картинка: клавиша P или Back.',icon:SV('<rect x="6" y="12" width="52" height="40" rx="4" fill="#f4ecd8"/><rect x="12" y="18" width="40" height="28" fill="#e0c89a"/><circle cx="24" cy="28" r="5" fill="#c0302a"/><path d="M12 46 L28 32 L40 42 L52 30 V46Z" fill="#3f8a45"/>')}];
  const TABS=[{id:'hat',name:'Шапки',icon:WEAR.kolpak.icon},{id:'neck',name:'На шею',icon:WEAR.bant.icon},{id:'back',name:'За спину',icon:WEAR.plashch.icon},{id:'body',name:'Наряды',icon:WEAR.pchelka.icon},{id:'dance',name:'Пляски',icon:DANCE_IC},{id:'luko',name:'Лукоморье',icon:LUKO_GOODS[0].icon}];
  const goods=tab=>tab==='dance'?Object.keys(DANCES).map(id=>Object.assign({id,kind:'dance',icon:DANCE_IC},DANCES[id])):tab==='luko'?LUKO_GOODS.map(o=>Object.assign({kind:o.id==='lubok'?'photo':'decor'},o))
    :Object.keys(WEAR).filter(id=>WEAR[id].slot===tab&&!WEAR[id].earn).map(id=>Object.assign({id,kind:'wear'},WEAR[id]));
  const lvOpen=g=>!g.lv||!!G.done[g.lv];const lvName=id=>{const l=LEVELS.find(q=>q.id===id);return l?l.name.replace(/^[^«]*/,''):id;};
  const HNAME={proshka:'Прошка',potap:'Потап',pelageya:'Пелагея',yosha:'Йоша'},HACC={proshka:'Прошку',potap:'Потапа',pelageya:'Пелагею',yosha:'Йошу'};
  /* ---------- примерочная у лавки: подиум, ширма, зеркало ---------- */
  const PODIUM=new V3(15.6,0,7.4);
  {const g=new THREE.Group();g.position.copy(PODIUM);W.group.add(g);addMesh(new THREE.CylinderGeometry(1.05,1.15,0.22,24),M(0x8a5a32),0,0.11,0,g);addMesh(new THREE.CylinderGeometry(0.95,0.95,0.02,24),M(0xc0302a),0,0.23,0,g);
    const rr=addMesh(new THREE.TorusGeometry(0.95,0.04,6,32),M(0xffd23a,{emissive:0x806010,emissiveIntensity:0.5}),0,0.24,0,g);rr.rotation.x=Math.PI/2;W.cyls.push({x:PODIUM.x,z:PODIUM.z,r:1.05,miny:-1,maxy:0.23,on:true});
    for(let i=-1;i<=1;i++){const p=new THREE.Group();p.position.set(i*1.5,0,-1.6+Math.abs(i)*0.4);p.rotation.y=-i*0.4;g.add(p);addMesh(new THREE.BoxGeometry(1.5,3.1,0.08),M(0xf4ecd8),0,1.55,0,p);
      for(const y of[0.12,3.05])addMesh(new THREE.BoxGeometry(1.52,0.14,0.1),M(0xc0302a),0,y,0,p);for(let k=0;k<3;k++){const d=addMesh(new THREE.CircleGeometry(0.2,4),M([0xc0302a,0x3f8a45,0xffd23a][(k+i+3)%3]),0,0.75+k*0.75,0.05,p);d.rotation.z=Math.PI/4;}}
    colBox(PODIUM.x-2.3,PODIUM.x+2.3,0,3,PODIUM.z-1.75,PODIUM.z-1.2,false);
    const mr=new THREE.Group();mr.position.set(-2.1,0,0.3);mr.rotation.y=0.7;g.add(mr);addMesh(new THREE.BoxGeometry(0.1,1.6,0.1),M(0x6b3f22),0,0.8,0,mr);const fr=addMesh(new THREE.TorusGeometry(0.42,0.06,8,24),M(0xffd23a,{emissive:0x806010,emissiveIntensity:0.4}),0,1.9,0,mr);
    addMesh(new THREE.CircleGeometry(0.4,24),MB(0xcfe8ff),0,1.9,0.01,mr);}
  const DZ={on:false,mode:'shop',kind:'proshka',tab:0,sel:0,row:0,saved:null,prevCam:null,preview:null,dance:0};
  let dz=document.getElementById('dress');if(!dz){dz=document.createElement('div');dz.id='dress';$('mapui').parentNode.appendChild(dz);}
  function dressOpen(pi,mode){if(G.ui)return;G.ui='dress';DZ.on=true;DZ.mode=mode;DZ.pi=pi;DZ.kind=active(pi).kind;DZ.tab=0;DZ.sel=0;DZ.row=0;
    DZ.saved=HEROES.map(h=>({h,p:h.pos.clone(),f:h.face,fo:h.following}));document.body.classList.add('dressing');dz.style.display='block';placeDress();
    W.camFn=()=>{const hh=HERO[DZ.kind].d.height,D=Math.max(2.3,hh*2.6),ox=0.46*D;return {pos:new V3(PODIUM.x+ox,0.23+hh*0.7+0.35,PODIUM.z+D),look:new V3(PODIUM.x+ox,0.23+hh*0.5,PODIUM.z),k:5};};
    bark({g:vek},'vek',mode==='shop'?['Орешки есть? Милости просим, гости дорогие!','Примерь, не робей — будешь всех милей!','Всё лучшее — героям, как в сказке положено!'][Math.floor(rand(0,3))]:'Покрутись-ка, свет мой, перед зеркальцем!',2);dressDraw();G.uiTick=dressTick;}
  function placeDress(){let i=0;for(const s of DZ.saved){const h=s.h;if(h.kind===DZ.kind){placeOnGround(h,PODIUM.x,PODIUM.z,0.3);h.face=0.35;}else{placeOnGround(h,PODIUM.x-4.6+i*0.9,PODIUM.z+1.6,0);i++;}h.following=false;h.vel.set(0,0,0);}}
  function dressClose(){WEAR_PREVIEW=null;applyWear();DZ.on=false;G.ui=null;G.uiTick=null;W.camFn=null;dz.style.display='none';document.body.classList.remove('dressing');
    if(DZ.saved)for(const s of DZ.saved){placeOnGround(s.h,s.p.x,s.p.z,s.p.y);s.h.face=s.f;s.h.following=s.fo;}DZ.saved=null;F.danceT=0;HEROES.forEach(h=>{h.extraY=0;});SFX.plate();}
  const curGoods=()=>goods(TABS[DZ.tab].id);
  function setPreview(){const g=curGoods()[DZ.sel];WEAR_PREVIEW=(DZ.mode==='shop'&&g&&g.kind==='wear')?{kind:DZ.kind,slot:g.slot,id:g.id}:null;applyWear();}
  const wearOpts=(slot)=>[null].concat(Object.keys(WEAR).filter(id=>WEAR[id].slot===slot&&own(id)));
  const danceOpts=()=>[null].concat(Object.keys(DANCES).filter(own));
  function dressDraw(){const kind=DZ.kind,head='<div class="dz-top">'+WEAR_KINDS.map(k=>'<div class="dav'+(k===kind?' on':'')+'" style="border-color:'+HERO[k].d.css+'">'+sil(k,HERO[k].d.css)+'</div>').join('')+'</div>'+
      '<div class="dz-name">'+HNAME[kind]+'<small>'+K(0,'swap')+' / '+K(1,'swap')+' — другой герой</small></div>';
    const mt='<div class="mtabs"><span class="'+(DZ.mode==='shop'?'on':'')+'">Лавка Векши</span><span class="'+(DZ.mode==='ward'?'on':'')+'">Примерочная</span><small>'+K(DZ.pi,'item')+' переключить</small></div>';
    let body='';
    if(DZ.mode==='shop'){const list=curGoods();DZ.sel=clamp(DZ.sel,0,list.length-1);const g=list[DZ.sel];
      body='<div class="dtabs">'+TABS.map((t,i)=>'<div class="dtab'+(i===DZ.tab?' on':'')+'">'+t.icon+t.name+'</div>').join('')+'</div><div class="dlist">'+
        list.map((it,i)=>{const open=lvOpen(it),has=own(it.id),worn=it.kind==='wear'&&WARD.wear[kind][it.slot]===it.id,sel=WARD.dance===it.id&&it.kind==='dance';
          const pr=!open?'<span class="dprice lock">после '+lvName(it.lv)+'</span>':worn||sel?'<span class="dprice wear">надето</span>':has?'<span class="dprice own">есть</span>':'<span class="dprice'+(nutsAvail()<it.cost?' poor':'')+'">'+it.cost+' '+ICO_NUT+'</span>';
          return '<div class="dcard'+(i===DZ.sel?' sel':'')+(open?'':' lock')+'"><div class="dic">'+it.icon+'</div><div class="dnm">'+it.name+'</div>'+pr+'</div>';}).join('')+'</div>';
        const has=g&&own(g.id),open=g&&lvOpen(g);let act='';
        if(g){if(!open)act='Появится в лавке после уровня '+lvName(g.lv);
          else if(!has)act=(nutsAvail()>=g.cost?K(DZ.pi,'jump')+' купить за '+g.cost+' '+ICO_NUT:'Не хватает '+(g.cost-nutsAvail())+' '+ICO_NUT+' — собирайте орешки в походах, в огороде и у Рябы');
          else if(g.kind==='wear')act=K(DZ.pi,'jump')+(WARD.wear[kind][g.slot]===g.id?' снять':' надеть на '+HACC[kind]);
          else if(g.kind==='dance')act=K(DZ.pi,'jump')+(WARD.dance===g.id?' пляска выбрана — «Ко мне!» в Лукоморье':' выбрать для «Ко мне!»');
          else act='Уже в Лукоморье';}
        body+='<div class="ddetail">'+(g?'<b>'+g.name+'</b><div>'+g.desc+(g.kind==='wear'?' <i>Идёт всем четверым.</i>':'')+'</div><div class="dact">'+act+'</div>':'')+'</div>'+
          '<div class="dhint">'+K(DZ.pi,'left')+K(DZ.pi,'right')+' полка · '+K(DZ.pi,'up')+K(DZ.pi,'down')+' товар · '+K(DZ.pi,'guard')+' уйти</div>';}
    else{const rows=WEAR_SLOTS.map(sl=>{const o=wearOpts(sl),cur=WARD.wear[kind][sl]&&own(WARD.wear[kind][sl])?WARD.wear[kind][sl]:null,it=cur&&WEAR[cur];return {sl,name:SLOT_NAME[sl],n:o.length-1,i:o.indexOf(cur),label:it?it.name:'— без —',icon:it?it.icon:''};});
      const dO=danceOpts(),dc=WARD.dance&&own(WARD.dance)?WARD.dance:null;rows.push({sl:'dance',name:'Пляска',n:dO.length-1,i:dO.indexOf(dc),label:dc?DANCES[dc].name:'— без пляски —',icon:dc?DANCE_IC:''});
      DZ.row=clamp(DZ.row,0,rows.length-1);
      body='<div class="dlist">'+rows.map((r,i)=>'<div class="drow'+(i===DZ.row?' sel':'')+'"><div class="dsl">'+r.name+'</div><div class="dval"><span class="darr">◀</span><span class="dic">'+r.icon+'</span><span class="dlbl">'+r.label+'</span><span class="darr">▶</span></div><div class="dcnt">'+(r.n?Math.max(0,r.i)+' / '+r.n:'нет вещей')+'</div></div>').join('')+'</div>'+
        '<div class="ddetail"><b>'+(rows[DZ.row].sl==='dance'?'Пляшут все вместе':'Надето на '+HACC[kind])+'</b><div>Всё купленное у Векши — навсегда: надевай, снимай, меняй сколько хочешь.'+(rows.every(r=>!r.n)?' <i>Пока пусто — загляни в лавку.</i>':'')+'</div></div>'+
        '<div class="dhint">'+K(DZ.pi,'up')+K(DZ.pi,'down')+' что · '+K(DZ.pi,'left')+K(DZ.pi,'right')+' вещь · '+K(DZ.pi,'skill')+' сюрприз! · '+K(DZ.pi,'guard')+' готово</div>';}
    dz.innerHTML=head+'<div class="dz-panel"><div class="dz-head"><h2>'+(DZ.mode==='shop'?'Лавка Векши':'Примерочная')+'</h2><span class="dnuts">'+ICO_NUT+' '+nutsAvail()+'</span></div>'+mt+body+'</div>';
    setPreview();}
  function dressTick(){const h=HERO[DZ.kind];h.face+=1/60*0.8;h.vel.set(0,0,0);if(hd(h.pos,PODIUM)>0.3)placeOnGround(h,PODIUM.x,PODIUM.z,0.3);
    for(const q of[0,1]){const n=uiNav(q);
      if(tap(q,'guard')||pressed.has('Escape')){dressClose();return;}
      if(tap(q,'item')){DZ.mode=DZ.mode==='shop'?'ward':'shop';SFX.swap();dressDraw();return;}
      if(tap(q,'swap')){const i=WEAR_KINDS.indexOf(DZ.kind);DZ.kind=WEAR_KINDS[(i+1)%4];placeDress();SFX.swap();dressDraw();return;}
      if(DZ.mode==='shop'){if(n.dx){DZ.tab=(DZ.tab+n.dx+TABS.length)%TABS.length;DZ.sel=0;SFX.swap();dressDraw();}
        if(n.dy){const L=curGoods().length;DZ.sel=(DZ.sel+n.dy+L)%L;SFX.swap();dressDraw();const g=curGoods()[DZ.sel];if(g&&g.kind==='dance'&&lvOpen(g))danceStart(g.id,true);}
        if(tap(q,'jump')){const g=curGoods()[DZ.sel];if(!g)return;if(!lvOpen(g)){SFX.miss();return;}
          if(!own(g.id)){if(nutsAvail()<g.cost){SFX.miss();return;}G.nutsSpent+=g.cost;buyWard(g.id);SFX.ok();burst(PODIUM.clone().add(new V3(0,1.2,0)),0xffd76a,20,3);
            if(g.kind==='wear')putOn(DZ.kind,g.id);else if(g.kind==='decor')buildDecor(g.id);else if(g.kind==='dance'&&!WARD.dance){WARD.dance=g.id;saveWard();}
            floatText(PODIUM.clone().add(new V3(0,HERO[DZ.kind].d.height+0.9,0)),g.kind==='wear'?'Обновка!':'Куплено!','#ffd76a');}
          else if(g.kind==='wear'){if(WARD.wear[DZ.kind][g.slot]===g.id){WARD.wear[DZ.kind][g.slot]=null;saveWard();}else putOn(DZ.kind,g.id);SFX.plate();}
          else if(g.kind==='dance'){WARD.dance=g.id;saveWard();SFX.plate();}else SFX.miss();
          dressDraw();}}
      else{if(n.dy){DZ.row=(DZ.row+n.dy+5)%5;SFX.swap();dressDraw();}
        if(n.dx){if(DZ.row<4){const sl=WEAR_SLOTS[DZ.row],o=wearOpts(sl);const cur=WARD.wear[DZ.kind][sl]&&own(WARD.wear[DZ.kind][sl])?WARD.wear[DZ.kind][sl]:null;const ni=(o.indexOf(cur)+n.dx+o.length)%o.length;WARD.wear[DZ.kind][sl]=o[ni];saveWard();applyWear();}
          else{const o=danceOpts(),cur=WARD.dance&&own(WARD.dance)?WARD.dance:null;WARD.dance=o[(o.indexOf(cur)+n.dx+o.length)%o.length];saveWard();if(WARD.dance)danceStart(WARD.dance,true);}
          SFX.plate();burst(PODIUM.clone().add(new V3(0,0.9,0)),0xfff2b0,8,2);dressDraw();}
        if(tap(q,'skill')){for(const sl of WEAR_SLOTS){const o=wearOpts(sl);WARD.wear[DZ.kind][sl]=o.length>1&&Math.random()<0.85?o[1+Math.floor(Math.random()*(o.length-1))]:null;}saveWard();applyWear();SFX.ok();burst(PODIUM.clone().add(new V3(0,1,0)),0xff9ad0,18,3);
          floatText(PODIUM.clone().add(new V3(0,HERO[DZ.kind].d.height+0.9,0)),'Сюрприз!','#ff9ad0');dressDraw();}
        if(tap(q,'jump')){dressClose();return;}}}}
  /* ---------- пляски ---------- */
  function danceStart(id,preview){const d=DANCES[id];if(!d)return;F.danceT=3.4;F.danceKind=id;F.dancePrev=!!preview;d.notes.forEach((m,i)=>later(i*0.22,()=>gusli(m,0,0.16)));}
  function danceTick(dt){if(!(F.danceT>0))return;F.danceT-=dt;const st=(DANCES[F.danceKind]||DANCES.barynya).st,t=G.time;
    const hs=F.dancePrev&&DZ.on?[HERO[DZ.kind]]:HEROES;
    hs.forEach((h,i)=>{if(st==='spin'){h.face+=dt*7;h.extraY=Math.abs(Math.sin(t*9+h.player))*0.35;}
      else if(st==='sway'){h.face+=Math.sin(t*3+i)*dt*2;h.extraY=Math.abs(Math.sin(t*3+i))*0.12;h.body.rotation.z=Math.sin(t*3+i)*0.3;}
      else if(st==='lean'){h.extraY=Math.abs(Math.sin(t*4+i*0.5))*0.2;h.body.rotation.x=0.35+Math.sin(t*4+i*0.5)*0.2;}
      else if(st==='wave'){h.extraY=Math.max(0,Math.sin(t*6-i*1.2))*0.45;h.face+=dt*2;}
      else{h.extraY=Math.abs(Math.sin(t*12+i))*0.28-0.12;h.face+=Math.sin(t*6)*dt*4;}});
    if(F.danceT<=0)HEROES.forEach(h=>{h.extraY=0;});}
  const danceSel=()=>WARD.dance&&own(WARD.dance)?WARD.dance:(Object.keys(DANCES).find(own)||null);   // не выбрана — первая купленная
  function hubDance(pi){const id=danceSel();if(!id||F.danceT>0)return false;danceStart(id,false);floatText(active(pi).pos.clone().add(new V3(0,2,0)),DANCES[id].name.replace(/^[^«]*/,'')+'!','#ffd76a');SFX.ok();return true;}
  const danceOwned=()=>!!danceSel();
  /* ---------- огород Дедки у избы: посадить, полить, подрастёт, пока вы в походе, собрать; репку тянут вместе ---------- */
  const CROPS={morkov:{name:'Морковка',nuts:2,icon:SV('<path d="M32 58 L22 20 H42Z" fill="#ff8a2a"/><path d="M26 22 L20 6 M32 20 L32 4 M38 22 L44 6" stroke="#3f8a3a" stroke-width="4"/>')},
    goroh:{name:'Горох',nuts:2,icon:SV('<path d="M10 40 Q32 10 54 40 Q32 54 10 40Z" fill="#6ac04a"/><circle cx="22" cy="36" r="5" fill="#9ae07a"/><circle cx="32" cy="34" r="5" fill="#9ae07a"/><circle cx="42" cy="36" r="5" fill="#9ae07a"/>')},
    podsolnuh:{name:'Подсолнух',nuts:3,icon:SV('<path d="M32 40 V60" stroke="#3f8a3a" stroke-width="4"/><circle cx="32" cy="26" r="18" fill="#ffd23a"/><circle cx="32" cy="26" r="9" fill="#7a4a1a"/>')},
    repka:{name:'Репка',nuts:8,icon:SV('<path d="M32 60 Q8 50 12 32 Q18 18 32 18 Q46 18 52 32 Q56 50 32 60Z" fill="#f4ecf4"/><path d="M14 30 Q32 22 50 30 Q46 18 32 18 Q18 18 14 30Z" fill="#b06ab0"/><path d="M28 18 L20 2 M32 18 V2 M36 18 L44 2" stroke="#3f8a3a" stroke-width="4"/>')}};
  if(!G.garden)G.garden={beds:[0,1,2,3].map(()=>({crop:null,stage:0,wet:false})),trip:G.trips||0};
  if((G.trips||0)>G.garden.trip){for(const b of G.garden.beds)if(b.crop&&b.wet&&b.stage<3){b.stage++;b.wet=false;b.grew=true;}G.garden.trip=G.trips;}
  const BEDC=[-17,-14.8,-12.6,-10.4].map(x=>new V3(x,0,1.7));const beds=G.garden.beds;
  const BARREL=new V3(-8.3,0,3.3),DEDKA=new V3(-8.2,0,0.9);
  const bedG=BEDC.map((c,i)=>{const g=new THREE.Group();g.position.copy(c);W.group.add(g);addMesh(new THREE.BoxGeometry(1.8,0.16,1.4),M(0x4a2e18),0,0.08,0,g);
    for(const[x,z,w,d]of[[0,0.72,1.9,0.1],[0,-0.72,1.9,0.1],[0.93,0,0.1,1.4],[-0.93,0,0.1,1.4]])addMesh(new THREE.BoxGeometry(w,0.22,d),M(0x8a5a32),x,0.11,z,g);
    for(let k=-1;k<=1;k++)addMesh(new THREE.BoxGeometry(1.6,0.05,0.16),M(0x3a2410),0,0.17,k*0.4,g);const pl=new THREE.Group();g.add(pl);const drop=dropMesh(0x4aa8ff);drop.scale.setScalar(0.38);g.add(drop);
    const star=new THREE.Mesh(new THREE.OctahedronGeometry(0.12),MB(0xfff2b0));g.add(star);return {g,pl,drop,star};});
  function plantDraw(i){const b=beds[i],P=bedG[i].pl;while(P.children.length)P.remove(P.children[0]);const gr=M(0x3f8a3a),lg=M(0x6ac04a);if(!b.crop)return;const c=b.crop,s=b.stage;
    if(s===0){for(let k=0;k<3;k++)part(P,new THREE.SphereGeometry(0.05,6,4),M(0xd8c08a),(k-1)*0.3,0.2,0);return;}
    if(s===1){for(let k=-1;k<=1;k+=2){const l=part(P,new THREE.SphereGeometry(0.08,6,4),lg,k*0.06,0.3,0);l.scale.set(1.4,0.4,0.8);}part(P,new THREE.CylinderGeometry(0.015,0.015,0.14,4),gr,0,0.24,0);return;}
    if(c==='morkov'){for(let k=0;k<3;k++){const x=(k-1)*0.45;for(let j=0;j<4;j++){const l=part(P,new THREE.ConeGeometry(0.04,s===3?0.5:0.34,4),gr,x+rand(-0.05,0.05),s===3?0.42:0.34,rand(-0.05,0.05));l.rotation.z=rand(-0.4,0.4);}
      if(s===3){const cr=part(P,new THREE.ConeGeometry(0.08,0.3,8),M(0xff8a2a),x,0.2,0);cr.rotation.x=Math.PI;}}}
    else if(c==='goroh'){part(P,new THREE.CylinderGeometry(0.02,0.02,s===3?1.1:0.7,4),M(0x8a6a44),0,s===3?0.7:0.5,0);for(let k=0;k<(s===3?5:3);k++){const l=part(P,new THREE.SphereGeometry(0.09,6,4),lg,Math.sin(k*2)*0.1,0.35+k*0.15,Math.cos(k*2)*0.1);l.scale.set(1.3,0.5,1);}
      if(s===3)for(let k=0;k<4;k++){const p=part(P,new THREE.SphereGeometry(0.07,8,6),M(0x9ae07a),Math.sin(k*1.7)*0.16,0.5+k*0.14,Math.cos(k*1.7)*0.16);p.scale.set(0.8,1.9,0.8);}}
    else if(c==='podsolnuh'){const h2=s===3?1.3:0.75;part(P,new THREE.CylinderGeometry(0.035,0.045,h2,6),gr,0,0.18+h2/2,0);for(let k=-1;k<=1;k+=2){const l=part(P,new THREE.SphereGeometry(0.12,6,4),lg,k*0.13,0.2+h2*0.45,0);l.scale.set(1.4,0.3,0.8);}
      if(s===3){const fl=new THREE.Group();fl.position.set(0,0.2+h2,0.05);fl.rotation.x=-0.3;P.add(fl);for(let k=0;k<12;k++){const a=k/12*Math.PI*2;const pt=part(fl,new THREE.SphereGeometry(0.09,6,4),M(0xffd23a),Math.cos(a)*0.24,Math.sin(a)*0.24,0);pt.scale.set(1.5,0.6,0.3);pt.rotation.z=a;}
        part(fl,new THREE.CylinderGeometry(0.17,0.17,0.06,14),M(0x7a4a1a),0,0,0.02).rotation.x=Math.PI/2;}else part(P,new THREE.SphereGeometry(0.1,8,6),lg,0,0.25+h2,0);}
    else{const r=s===3?0.5:0.24;const tb=part(P,new THREE.SphereGeometry(r,14,10),M(0xf4ecf4),0,0.14+r*0.55,0);tb.scale.y=0.9;const tp=part(P,new THREE.SphereGeometry(r*0.98,14,8,0,Math.PI*2,0,Math.PI/2.4),M(0xb06ab0),0,0.14+r*0.62,0);
      for(let k=0;k<5;k++){const a=k/5*Math.PI*2;const l=part(P,new THREE.SphereGeometry(0.16*(s===3?1.6:1),6,4),gr,Math.cos(a)*0.12,0.18+r*1.4+0.12,Math.sin(a)*0.12);l.scale.set(0.5,1.6,0.3);l.rotation.z=Math.cos(a)*0.5;l.rotation.x=Math.sin(a)*0.5;}}}
  beds.forEach((b,i)=>plantDraw(i));
  // Дедка, кадка с лейкой
  const ded=new THREE.Group();ded.position.copy(DEDKA);ded.rotation.y=-Math.PI/2;W.group.add(ded);
  {const sh=M(0xe8e0d0),bl=M(0x5a6a9a),sk=M(0xe8c0a0),wh=M(0xf8f8f8);part(ded,new THREE.CylinderGeometry(0.3,0.36,0.9,10),bl,0,0.45,0);part(ded,new THREE.CylinderGeometry(0.32,0.3,0.55,10),sh,0,1.15,0);part(ded,new THREE.SphereGeometry(0.24,10,8),sk,0,1.62,0);
    const bd=new THREE.ConeGeometry(0.2,0.5,8);bd.rotateX(Math.PI);part(ded,bd,wh,0,1.34,0.14);part(ded,new THREE.CylinderGeometry(0.27,0.27,0.08,12),M(0x3a3a4a),0,1.82,0);part(ded,new THREE.CylinderGeometry(0.2,0.22,0.16,12),M(0x3a3a4a),0,1.92,0);
    part(ded,new THREE.CylinderGeometry(0.025,0.025,1.4,5),M(0x6b4a2b),0.38,0.7,0.1);for(const s of[-1,1])part(ded,new THREE.SphereGeometry(0.03,6,5),MAT.dark,s*0.08,1.67,0.21);}
  W.cyls.push({x:DEDKA.x,z:DEDKA.z,r:0.4,miny:-1,maxy:2,on:true});
  {const bg=new THREE.Group();bg.position.copy(BARREL);W.group.add(bg);addMesh(new THREE.CylinderGeometry(0.42,0.36,0.7,12),M(0x8a5a32),0,0.35,0,bg);for(const y of[0.15,0.55])addMesh(new THREE.TorusGeometry(0.4,0.025,5,16),M(0x4a4a50),0,y,0,bg).rotation.x=Math.PI/2;
    addMesh(new THREE.CylinderGeometry(0.37,0.37,0.02,14),MB(0x4aa8ff),0,0.66,0,bg);W.cyls.push({x:BARREL.x,z:BARREL.z,r:0.45,miny:-1,maxy:0.7,on:true});}
  const can=new THREE.Group();W.group.add(can);{const cm=M(0x5a9ac0);part(can,new THREE.CylinderGeometry(0.13,0.15,0.26,10),cm,0,0,0);const sp=part(can,new THREE.CylinderGeometry(0.02,0.035,0.3,6),cm,0.17,0.04,0);sp.rotation.z=-1.0;
    part(can,new THREE.TorusGeometry(0.1,0.02,5,10,Math.PI),cm,-0.02,0.14,0).rotation.y=Math.PI/2;}
  const CAN={h:null,water:0};const canHome=()=>{can.position.set(BARREL.x+0.12,0.84,BARREL.z);can.rotation.set(0,0,0);};canHome();
  /* ---------- курятник Курочки Рябы: покормить, погладить, яички в гнезде; цыплята растут, пока вы в походе ---------- */
  hut(-14.2,9.2,3.0,2.6,0xa03a2a,false);
  const YARD={x0:-12.2,x1:-6.6,z0:6.8,z1:11.4},YC=new V3(-9.4,0,9.1),NEST=new V3(-12.1,0,10.6),SACK=new V3(-12.1,0,7.4);
  {const fm=M(0x9a7a4a);for(const[a,b,c,d]of[[YARD.x0-0.2,YARD.x1+0.2,YARD.z1+0.1,YARD.z1+0.25],[YARD.x1+0.1,YARD.x1+0.25,YARD.z0-0.2,YARD.z1+0.2],[YARD.x0-0.2,-10.4,YARD.z0-0.25,YARD.z0-0.1],[-8.4,YARD.x1+0.2,YARD.z0-0.25,YARD.z0-0.1]]){
      box(a,b,0,0.55,c,d,fm,{occ:false});}
    const ng=new THREE.Group();ng.position.copy(NEST);W.group.add(ng);addMesh(new THREE.BoxGeometry(0.8,0.3,0.7),M(0x8a5a32),0,0.15,0,ng);addMesh(new THREE.CylinderGeometry(0.3,0.22,0.12,12),M(0xe0c060),0,0.34,0,ng);
    const sg=new THREE.Group();sg.position.copy(SACK);W.group.add(sg);const sk=addMesh(new THREE.SphereGeometry(0.34,10,8),M(0xc8b080),0,0.32,0,sg);sk.scale.set(1,1.2,0.9);addMesh(new THREE.ConeGeometry(0.14,0.2,6),M(0xb09a6a),0,0.76,0,sg);
    for(let k=0;k<6;k++)addMesh(new THREE.SphereGeometry(0.03,5,4),M(0xffd23a),rand(-0.15,0.15),0.72,rand(-0.1,0.1),sg);W.cyls.push({x:SACK.x,z:SACK.z,r:0.36,miny:-1,maxy:0.9,on:true},{x:NEST.x,z:NEST.z,r:0.4,miny:-1,maxy:0.34,on:true});}
  if(!G.hen)G.hen={food:0.7,joy:0.6,eggs:1,gold:0,chicks:0,trip:G.trips||0,happy:0};const HN=G.hen;
  if((G.trips||0)>HN.trip){const n=Math.min(3,G.trips-HN.trip);for(let i=0;i<n;i++){if(HN.food>0.45&&HN.joy>0.45){HN.happy++;if(HN.happy%3===0)HN.gold++;else HN.eggs++;if(HN.happy%2===0&&HN.chicks<4){HN.chicks++;HN.newChick=true;}}HN.food=Math.max(0,HN.food-0.4);HN.joy=Math.max(0,HN.joy-0.35);}HN.trip=G.trips;}
  function makeHen(){const g=new THREE.Group();W.group.add(g);const wh=M(0xf4efe4),sp=M(0x8a7a6a),rd=M(0xd8302a),yl=M(0xf0b030);const body=new THREE.Group();g.add(body);
    const b=part(body,new THREE.SphereGeometry(0.32,12,10),wh,0,0.42,0);b.scale.set(0.9,0.85,1.15);for(let i=0;i<12;i++)part(body,new THREE.SphereGeometry(0.035,5,4),sp,rand(-0.26,0.26),rand(0.3,0.62),rand(-0.32,0.2));
    const head=new THREE.Group();head.position.set(0,0.72,0.26);body.add(head);part(head,new THREE.SphereGeometry(0.15,10,8),wh,0,0,0);const bk=part(head,new THREE.ConeGeometry(0.045,0.12,6),yl,0,-0.02,0.16);bk.rotation.x=Math.PI/2;
    for(let i=0;i<3;i++)part(head,new THREE.SphereGeometry(0.045,6,5),rd,0,0.14,0.06-i*0.05);part(head,new THREE.SphereGeometry(0.035,6,5),rd,0,-0.1,0.12);for(const s of[-1,1])part(head,new THREE.SphereGeometry(0.025,6,5),MAT.dark,s*0.08,0.03,0.1);
    const tl=part(body,new THREE.ConeGeometry(0.14,0.3,6),wh,0,0.62,-0.34);tl.rotation.x=-0.8;const wings=[];for(const s of[-1,1]){const w=part(body,new THREE.SphereGeometry(0.16,8,6),wh,s*0.27,0.45,-0.02);w.scale.set(0.35,0.8,1.1);wings.push(w);}
    for(const s of[-1,1])part(g,new THREE.CylinderGeometry(0.02,0.02,0.2,4),yl,s*0.09,0.1,0);return {g,body,head,wings};}
  function makeChick(){const g=new THREE.Group();W.group.add(g);part(g,new THREE.SphereGeometry(0.11,10,8),M(0xffe060),0,0.12,0);part(g,new THREE.SphereGeometry(0.075,8,6),M(0xffe060),0,0.25,0.05);const bk=part(g,new THREE.ConeGeometry(0.025,0.06,5),M(0xf09020),0,0.24,0.13);bk.rotation.x=Math.PI/2;
    for(const s of[-1,1])part(g,new THREE.SphereGeometry(0.015,5,4),MAT.dark,s*0.035,0.27,0.11);return g;}
  const hen=makeHen();hen.g.position.copy(YC);const HS={tgt:YC.clone(),mode:'walk',t:0,eat:null,flap:0,parade:null,paradeT:0};
  const chicks=[];for(let i=0;i<HN.chicks;i++){const c=makeChick();c.position.set(YC.x-0.5-i*0.35,0,YC.z+0.3);chicks.push(c);}
  const henIc={grain:new THREE.Group(),heart:new THREE.Group()};W.group.add(henIc.grain,henIc.heart);
  {for(let k=0;k<5;k++)part(henIc.grain,new THREE.SphereGeometry(0.05,6,5),MB(0xffd23a),Math.cos(k*1.3)*0.08,Math.sin(k*2)*0.04,Math.sin(k*1.3)*0.08);part(henIc.grain,new THREE.TorusGeometry(0.14,0.03,6,14),MB(0xc8a060),0,-0.03,0).rotation.x=Math.PI/2;
    const hm=MB(0xff6a9a);part(henIc.heart,new THREE.SphereGeometry(0.09,8,6),hm,-0.07,0.05,0);part(henIc.heart,new THREE.SphereGeometry(0.09,8,6),hm,0.07,0.05,0);const hc=part(henIc.heart,new THREE.ConeGeometry(0.125,0.17,8),hm,0,-0.07,0);hc.rotation.z=Math.PI;}
  const eggMeshes=[];function eggsDraw(){eggMeshes.forEach(m=>W.group.remove(m));eggMeshes.length=0;const n=HN.eggs+HN.gold;for(let i=0;i<Math.min(n,6);i++){const gold=i<HN.gold;const m=new THREE.Mesh(new THREE.SphereGeometry(0.085,10,8),gold?M(0xffd23a,{emissive:0xb07a10,emissiveIntensity:0.7}):M(0xf8f4ea));
      m.scale.y=1.3;m.position.set(NEST.x+Math.cos(i*2.1)*0.12,0.44,NEST.z+Math.sin(i*2.1)*0.12);W.group.add(m);eggMeshes.push(m);}}
  eggsDraw();
  let mouse=null;if(HN.gold>0&&hubMode){mouse=new THREE.Group();W.group.add(mouse);part(mouse,new THREE.SphereGeometry(0.1,8,6),M(0x8a8a90),0,0.08,0).scale.set(0.8,0.7,1.4);for(const s of[-1,1])part(mouse,new THREE.SphereGeometry(0.045,6,5),M(0xd8a0a8),s*0.06,0.15,0.08);
    const tl=part(mouse,new THREE.CylinderGeometry(0.008,0.008,0.3,4),M(0xd8a0a8),0,0.06,-0.26);tl.rotation.x=Math.PI/2;mouse.position.set(YARD.x0+0.3,0,YARD.z1-0.2);mouse.userData={t:0,done:false};}
  /* ---------- что рядом: одно действие на кнопку удара ---------- */
  const near=(h,p,r)=>hd(h.pos,p)<r&&h.pos.y<1.6;
  function hubAction(h,pi){if(!hubMode||F.stage!=='free'||G.ui||G.cine||F.danceT>0)return null;
    if(near(h,PODIUM,1.9))return {note:'примерочная',fn:()=>dressOpen(pi,'ward')};
    if(mouse&&!mouse.userData.done&&near(h,mouse.position,1.7))return {note:'кыш!',fn:()=>{mouse.userData.done=true;mouse.userData.run=1;G.nutsHub=(G.nutsHub||0)+1;SFX.whoosh();floatText(mouse.position.clone().add(new V3(0,0.8,0)),'Кыш! +1 орешек','#ffd060');}};
    if(near(h,NEST,1.5)&&HN.eggs+HN.gold>0)return {note:'собрать яички',fn:()=>takeEggs(h)};
    if(near(h,SACK,1.4)&&!h.grain)return {note:'взять зерно',fn:()=>{if(h.can9){tip(pi,'В лапах лейка у тебя — у бочки с водой её поставь.',2);return;}h.grain=true;SFX.plate();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Зерно!','#ffd060');}};
    if(near(h,hen.g.position,1.8))return h.grain?{note:'покормить',fn:()=>feedHen(h)}:{note:'погладить',fn:()=>petHen(h,pi)};
    if(near(h,BARREL,1.5))return CAN.h===h?{note:'поставить лейку',fn:()=>{CAN.h=null;h.can9=false;canHome();SFX.plate();}}:!CAN.h?{note:'взять лейку',fn:()=>{if(h.grain){tip(pi,'Сперва зерно Рябе отнеси.',2);return;}CAN.h=h;h.can9=true;CAN.water=4;SFX.water();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Лейка полна!','#9fd8ff');}}:null;
    for(let i=0;i<4;i++){if(!near(h,BEDC[i],1.45))continue;const b=beds[i];
      if(!b.crop)return {note:'посадить',fn:()=>seedPick(i,pi)};
      if(b.stage>=3)return {note:b.crop==='repka'?'тянем-потянем!':'собрать урожай',fn:()=>harvest(i,pi)};
      if(!b.wet)return {note:CAN.h===h?'полить':'нужна лейка',fn:()=>water(i,h,pi)};
      return {note:'полито',fn:()=>{floatText(BEDC[i].clone().add(new V3(0,1,0)),'Полито уж — подрастёт, пока вы в пути.','#9fd8ff');}};}
    if(near(h,DEDKA,1.8))return {note:'Дедка',fn:()=>bark({g:ded},'dedka',['Посадил дед репку… а тянуть-потянуть — всем миром!','Посадил — полей скорей. Сходишь в поход — подрастёт, ей-ей.','Урожай — Векше за орешки, а мне — репку, да покрепче!'][Math.floor(rand(0,3))],2.6)};
    return null;}
  function seedPick(i,pi){G.ui='seed';let sel=0;const ks=Object.keys(CROPS);const el=$('mapui');el.style.display='flex';
    const draw=()=>{el.innerHTML='<div class="tet seed"><h2>Что посадим?</h2><div class="seeds">'+ks.map((k,j)=>'<div class="sd'+(j===sel?' sel':'')+'">'+CROPS[k].icon+'<b>'+CROPS[k].name+'</b><small>'+CROPS[k].nuts+' '+ICO_NUT+'</small></div>').join('')+'</div>'+
      '<div class="tale">'+(ks[sel]==='repka'?'Репку вытянуть можно только вдвоём!':'Посади, полей — и подрастёт, пока вы в походе')+'</div><div class="hint">'+K(pi,'left')+K(pi,'right')+' · '+K(pi,'jump')+' посадить · '+K(pi,'guard')+' отмена</div></div>';};
    draw();G.uiTick=()=>{for(const q of[0,1]){const n=uiNav(q);if(n.dx){sel=(sel+n.dx+ks.length)%ks.length;SFX.swap();draw();}if(tap(q,'guard')||pressed.has('Escape')){closePanel();return;}
      if(tap(q,'jump')){beds[i]={crop:ks[sel],stage:0,wet:false};plantDraw(i);closePanel();SFX.grow();burst(BEDC[i].clone().add(new V3(0,0.4,0)),0x8a6a44,10,2);floatText(BEDC[i].clone().add(new V3(0,1,0)),CROPS[ks[sel]].name+' посажена! Полить бы теперь.','#b8f0a0');return;}}};}
  function water(i,h,pi){if(CAN.h!==h){tip(pi,'Лейка у бочки с водой стоит.',2.2);SFX.miss();return;}if(CAN.water<=0){tip(pi,'Лейка пуста — в бочке воды набери.',2);SFX.miss();return;}CAN.water--;const b=beds[i];b.wet=true;SFX.water();
    for(let k=0;k<6;k++)later(k*0.06,()=>burst(BEDC[i].clone().add(new V3(rand(-0.6,0.6),0.5,rand(-0.4,0.4))),0x7ac8ff,4,2,0.6));
    if(b.stage===0){b.stage=1;later(0.4,()=>{plantDraw(i);SFX.grow();floatText(BEDC[i].clone().add(new V3(0,1,0)),'Проклюнулся!','#b8f0a0');});}else floatText(BEDC[i].clone().add(new V3(0,1,0)),'Полито! Подрастёт, пока вы в пути.','#9fd8ff');}
  function harvest(i,pi){const b=beds[i];if(b.crop==='repka'){repkaGame(i,pi);return;}const C=CROPS[b.crop];G.nutsHub=(G.nutsHub||0)+C.nuts;SFX.ok();burst(BEDC[i].clone().add(new V3(0,0.6,0)),0xffd76a,16,3);
    floatText(BEDC[i].clone().add(new V3(0,1.2,0)),C.name+'! +'+C.nuts+' орешка','#ffd060');beds[i]={crop:null,stage:0,wet:false};plantDraw(i);if(Math.random()<0.5)later(0.5,()=>bark({g:ded},'dedka','Хороша! За такую Векша орешками платит сполна.',2.2));}
  // репка: всем миром — Дедка и четверо за ним; «тянем-потянем» в такт, удар обоих игроков вместе
  function repkaGame(i,pi){const a=[active(0),active(1)];if(a.some(h=>(!G.solo||ctrl(h))&&hd(h.pos,BEDC[i])>3.2)){tip(pi,'Одному репку не вытянуть — друга кличь!',2.6);tip(1-pi,'Друг тянет репку — беги подсоблять!',2.6);SFX.miss();return;}
    G.ui='repka';const c=BEDC[i],order=[HERO.proshka,HERO.pelageya,HERO.potap,HERO.yosha];const d0=ded.position.clone();ded.position.set(c.x+0.95,0,c.z);ded.rotation.y=-Math.PI/2;
    order.forEach((h,k)=>{placeOnGround(h,c.x+1.7+k*0.72,c.z,0);h.face=-Math.PI/2;h.following=false;});const R={t:-0.6,pulls:0,k:0,p:[null,null],miss:0,rise:0};
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.05,6,28),MB(0xffd76a,{transparent:true,opacity:0.9}));ring.rotation.x=Math.PI/2;ring.position.set(c.x,0.5,c.z);W.group.add(ring);const B=1.3;
    banner('Тянем-потянем!','#ffd76a',2,'жмите оба '+K(0,'attack')+' / '+K(1,'attack')+' разом, как сожмётся кольцо');
    G.uiTick=()=>{R.t+=1/60;const beat=(R.k+1)*B,u=clamp((beat-R.t)/B,0,1);ring.scale.setScalar(lerp(0.4,1.8,u));ring.material.color.setHex(u<0.18?0xffffff:0xffd76a);
      for(const q of[0,1])if(tap(q,'attack')&&R.p[q]===null&&Math.abs(R.t-beat)<0.45){R.p[q]=R.t;active(q).atkT=0.28;if(G.solo){R.p[1-q]=R.t;active(1-q).atkT=0.28;}}
      if(R.t>beat+0.45){const ok=R.p[0]!==null&&R.p[1]!==null;R.k++;R.p=[null,null];
        if(ok||R.miss>=6){R.pulls++;R.rise=R.pulls;SFX.hammer();shakeAll(0.03,0.2);floatText(c.clone().add(new V3(0,1.6,0)),['Тянут!','Потянут!','Вытянули!'][Math.min(2,R.pulls-1)],'#ffd76a');order.forEach(h=>{h.pos.x+=0.22;});ded.position.x+=0.22;
          anim(0.4,q=>{bedG[i].pl.position.y=(R.pulls/3)*0.35*q+((R.pulls-1)/3)*0.35*(1-q);});}
        else{R.miss++;SFX.miss();floatText(c.clone().add(new V3(0,1.6,0)),'Тянут-потянут — вытянуть не могут! Вместе!','#ffd0d0');}}
      if(R.pulls>=3){G.uiTick=null;W.group.remove(ring);const pl=bedG[i].pl,from=pl.position.clone();anim(0.9,q=>{pl.position.set(from.x+q*1.8,from.y+Math.sin(q*Math.PI)*2.2,from.z);pl.rotation.z=-q*2;});
        later(0.2,()=>{order.forEach((h,k)=>{h.vel.set(4+k,4,0);h.grounded=false;h.knockT=0.4;});});SFX.ok();SFX.horn();burst(c.clone().add(new V3(0,1,0)),0xffd76a,30,5);
        later(1.2,()=>{G.nutsHub=(G.nutsHub||0)+CROPS.repka.nuts;banner('Вытянули репку!','#ffd76a',2.6,'всем миром · +'+CROPS.repka.nuts+' орешков в лукошко');beds[i]={crop:null,stage:0,wet:false};pl.position.set(0,0,0);pl.rotation.set(0,0,0);plantDraw(i);ded.position.copy(d0);G.ui=null;
          bark({g:ded},'dedka','Тянут-потянут — вытянули репку!<br>Вот что значит — вместе, крепко!',3);});}};}
  function feedHen(h){h.grain=false;SFX.plate();const spot=hen.g.position.clone().add(new V3(rand(-0.4,0.4),0,rand(-0.4,0.4)));for(let k=0;k<10;k++){const m=new THREE.Mesh(new THREE.SphereGeometry(0.03,5,4),M(0xffd23a));m.position.set(spot.x+rand(-0.35,0.35),0.03,spot.z+rand(-0.35,0.35));W.group.add(m);later(4,()=>W.group.remove(m));}
    HS.mode='eat';HS.t=0;HS.tgt.copy(spot);HN.food=1;floatText(hen.g.position.clone().add(new V3(0,1.1,0)),'Ко-ко-ко! Сыта, довольна!','#ffd060');tone(700,0.12,'square',0.08,500);later(0.2,()=>tone(760,0.1,'square',0.08,520));}
  function petHen(h,pi){HN.joy=Math.min(1,HN.joy+0.35);HS.flap=0.9;SFX.flower();for(let k=0;k<4;k++)later(k*0.12,()=>burst(hen.g.position.clone().add(new V3(0,0.9,0)),0xff9ac0,3,1.5));
    floatText(hen.g.position.clone().add(new V3(0,1.1,0)),HN.joy>=1?'Ко-ко! Цыплятки — за тобой гурьбой!':'Ко-ко!','#ffb0d0');tone(880,0.1,'square',0.06,640);if(HN.joy>=1&&chicks.length){HS.parade=h;HS.paradeT=9;}}
  function takeEggs(h){const p=HN.eggs*2+HN.gold*6,gold=HN.gold>0;G.nutsHub=(G.nutsHub||0)+p;eggMeshes.forEach((m,k)=>{const from=m.position.clone();anim(0.5,q=>{m.position.lerpVectors(from,h.pos.clone().add(new V3(0,h.d.height,0)),q);});});
    later(0.55,()=>{HN.eggs=0;HN.gold=0;eggsDraw();});SFX.ok();if(gold){banner('Яичко не простое — золотое!','#ffd76a',2.6,'+'+p+' орешков · Векша так и ахнет');SFX.horn();}else floatText(NEST.clone().add(new V3(0,1,0)),'Яички! +'+p+' орешков','#ffd060');}
  /* ---------- жизнь огорода и двора ---------- */
  // крона дуба: камера рядом или внутри — листва становится прозрачной (герои у моря не прячутся за дубом)
  const leafMats=[],barkMats=[];oak.traverse(o=>{if(!o.isMesh)return;o.material=o.material.clone();o.material.transparent=true;(o.geometry.type==='SphereGeometry'?leafMats:barkMats).push(o.material);});const CROWN=new V3(0,8.8,-7);
  W.updates.push(dt=>{danceTick(dt);{const cp=G.split>0.5?cams[0].position:camS.position,d=Math.min(cp.distanceTo(CROWN),G.split>0.5?cams[1].position.distanceTo(CROWN):99),op=clamp((d-5.5)/4,0.18,1);leafMats.forEach(m=>{m.opacity=op;m.depthWrite=op>0.95;});const dh=Math.hypot(cp.x,cp.z+7),ob=cp.y<9?clamp((dh-2.4)/2.6,0.22,1):1;barkMats.forEach(m=>{m.opacity=ob;m.depthWrite=ob>0.95;});}
    // лейка и зерно в лапах
    can.visible=!DZ.on;if(CAN.h){const h=CAN.h,f=h.face;can.position.set(h.pos.x+Math.sin(f)*0.3+Math.cos(f)*0.28,h.pos.y+h.d.height*0.55,h.pos.z+Math.cos(f)*0.3-Math.sin(f)*0.28);can.rotation.set(0,f-Math.PI/2,h.atkT>0?-0.9:0);if(!h.active&&hd(h.pos,BARREL)>30){CAN.h=null;h.can9=false;canHome();}}
    for(const h of HEROES){if(!h.grain)continue;if(!h.grainM){h.grainM=new THREE.Group();part(h.grainM,new THREE.CylinderGeometry(0.14,0.1,0.08,10),M(0xc8a060),0,0,0);for(let k=0;k<5;k++)part(h.grainM,new THREE.SphereGeometry(0.03,5,4),M(0xffd23a),rand(-0.07,0.07),0.05,rand(-0.07,0.07));W.group.add(h.grainM);}
      h.grainM.visible=true;h.grainM.position.set(h.pos.x+Math.sin(h.face)*0.35,h.pos.y+h.d.height*0.6,h.pos.z+Math.cos(h.face)*0.35);}
    for(const h of HEROES)if(!h.grain&&h.grainM)h.grainM.visible=false;
    // грядки: капля — хочет пить, звёздочка — спело
    beds.forEach((b,i)=>{const B=bedG[i];B.drop.visible=!!b.crop&&!b.wet&&b.stage<3;B.drop.position.set(0,1.05+Math.sin(G.time*3+i)*0.08,0);B.star.visible=!!b.crop&&b.stage>=3;B.star.position.set(0,b.crop==='podsolnuh'?1.9:1.3,0);B.star.rotation.y+=dt*3;});
    // Ряба гуляет по двору, клюёт; поела — довольна; погладили — хлопает крыльями
    HS.t+=dt;const hp=hen.g.position;HS.flap=Math.max(0,HS.flap-dt);
    if(HS.mode==='walk'){const d=hd(hp,HS.tgt);if(d<0.15){HS.mode='peck';HS.t=0;}else{hp.x+=(HS.tgt.x-hp.x)/d*dt*0.9;hp.z+=(HS.tgt.z-hp.z)/d*dt*0.9;hen.g.rotation.y=angDamp(hen.g.rotation.y,Math.atan2(HS.tgt.x-hp.x,HS.tgt.z-hp.z),6,dt);}}
    else if(HS.mode==='eat'){const d=hd(hp,HS.tgt);if(d>0.2){hp.x+=(HS.tgt.x-hp.x)/d*dt*2.2;hp.z+=(HS.tgt.z-hp.z)/d*dt*2.2;hen.g.rotation.y=Math.atan2(HS.tgt.x-hp.x,HS.tgt.z-hp.z);}if(HS.t>4){HS.mode='peck';HS.t=0;}}
    else if(HS.t>1.6){HS.mode='walk';HS.tgt.set(rand(YARD.x0+0.5,YARD.x1-0.5),0,rand(YARD.z0+0.5,YARD.z1-0.5));}
    const peck=HS.mode==='peck'||(HS.mode==='eat'&&hd(hp,HS.tgt)<=0.2);hen.head.rotation.x=peck?(Math.sin(G.time*14)>0?0.9:0.2):0;hen.head.position.y=peck?0.62:0.72;
    hen.g.position.y=HS.flap>0?Math.abs(Math.sin(HS.flap*10))*0.3:0;hen.wings.forEach((w,k)=>{w.rotation.z=(k?-1:1)*(HS.flap>0?Math.sin(G.time*30)*0.9:0.05);});hen.body.rotation.z=HN.food<0.3&&HN.joy<0.3?0.25:0;
    henIc.grain.visible=HN.food<0.5;henIc.heart.visible=!henIc.grain.visible&&HN.joy>0.7;[henIc.grain,henIc.heart].forEach(m=>{m.position.set(hp.x,1.35+Math.sin(G.time*3)*0.06,hp.z);m.rotation.y+=dt*2;});
    // цыплята: за Рябой гуськом, а после ласки — за героем
    HS.paradeT=Math.max(0,HS.paradeT-dt);let lead=HS.paradeT>0&&HS.parade?HS.parade.pos:hp;chicks.forEach((c,k)=>{const tx=lead.x,tz=lead.z,d=Math.hypot(tx-c.position.x,tz-c.position.z);if(d>0.45){const sp2=Math.min(d*2.4,HS.paradeT>0?5:2.2);c.position.x+=(tx-c.position.x)/d*sp2*dt;c.position.z+=(tz-c.position.z)/d*sp2*dt;c.rotation.y=Math.atan2(tx-c.position.x,tz-c.position.z);}
      c.position.y=Math.abs(Math.sin(G.time*10+k))*0.05;lead=c.position;});
    // мышка бежит к золотому яичку
    if(mouse&&F.stage==='free'&&!G.cine){const M2=mouse.userData;if(M2.run){mouse.position.x-=dt*4;mouse.rotation.y=-Math.PI/2;if(mouse.position.x<YARD.x0-3){W.group.remove(mouse);mouse=null;}}
      else if(!M2.done){M2.t+=dt;const d=hd(mouse.position,NEST);if(d>0.4){mouse.position.x+=(NEST.x-mouse.position.x)/d*dt*0.35;mouse.position.z+=(NEST.z-mouse.position.z)/d*dt*0.35;mouse.rotation.y=Math.atan2(NEST.x-mouse.position.x,NEST.z-mouse.position.z);}
        else{M2.done=true;M2.run=1;SFX.miss();floatText(NEST.clone().add(new V3(0,1,0)),'Мышка бежала, хвостиком махнула… яичко не разбилось!','#e0e0ff');}
        if(M2.t>1.5&&!M2.told){M2.told=true;for(const q of[0,1])tip(q,'Мышка к яичку золотому бежит!<br>Прогони её '+K(q,'attack')+' — пусть прочь спешит!',3);}}}
    if(!hubMode||F.stage!=='free'||G.ui||G.cine)return;
    for(const pi of[0,1]){const h=active(pi);if(!tap(pi,'attack'))continue;const a=hubAction(h,pi);if(a){a.fn();break;}}});
  // рисунки кнопок и таблички
  for(const pi of[0,1]){prompt(pi,'attack',()=>headOf(active(pi)),()=>!!hubAction(active(pi),pi),()=>{const a=hubAction(active(pi),pi);return a?a.note:'';});
    prompt(pi,'attack',()=>headOf(active(pi)),()=>G.ui==='repka','тянем!');
    prompt(pi,'label',()=>new V3(-13.7,2.4,1.7),()=>F.stage==='free'&&!G.ui&&hd(active(pi).pos,new V3(-13.7,0,1.7))<9&&!beds.some((b,i)=>near(active(pi),BEDC[i],1.45)),()=>'Огород Дедки');
    prompt(pi,'label',()=>hen.g.position.clone().add(new V3(0,1.8,0)),()=>F.stage==='free'&&!G.ui&&hd(active(pi).pos,hen.g.position)<8&&!near(active(pi),hen.g.position,1.8),()=>'Курочка Ряба');
    prompt(pi,'label',()=>PODIUM.clone().add(new V3(0,3.4,0)),()=>F.stage==='free'&&!G.ui&&hd(active(pi).pos,PODIUM)<9&&!near(active(pi),PODIUM,1.9),()=>'Примерочная');}
  // вернулись из похода — что выросло, что снесла Ряба
  if(hubMode&&(beds.some(b=>b.grew)||HN.eggs+HN.gold>0||HN.newChick))later(2.2,()=>{const g=beds.filter(b=>b.grew).length;beds.forEach(b=>{delete b.grew;});
    if(g)floatText(new V3(-13.7,1.6,1.7),'Огород подрос!','#b8f0a0');if(HN.newChick){HN.newChick=false;floatText(YC.clone().add(new V3(0,1.4,0)),'Вылупился цыплёнок!','#ffe060');}
    else if(HN.eggs+HN.gold>0)floatText(NEST.clone().add(new V3(0,1.2,0)),'Ряба яичко снесла — вот дела!','#fff4d0');});
  { const leave=W.onLeave;W.onLeave=()=>{if(DZ.on)dressClose();CAN.h=null;HEROES.forEach(h=>{h.can9=false;h.grain=false;if(h.grainM){W.group.remove(h.grainM);h.grainM=null;}});if(leave)leave();};}
  /* ---------- праздник: Сказ 1, первый виток, ролик «Голос» ---------- */
  function festival(){F.stage='fest';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-1.6,0);h.face=Math.PI;});snapCams();
    play({dur:7,fov:48,shots:[shot(0,[0,3,5],[0,1.2,-3])],says:[[0.4,3,null,'<i>Пелагея открывает тетрадку. Первый Сказ — сказку рассказываем мы сами.</i>',true],[3.6,3,'zven','Выбирайте: начало, помощник, конец!']],
      end:()=>skaz()});}
  function skaz(){G.ui='skaz';const el=$('skaz');el.style.display='flex';
    const steps=[{who:1,title:'Начало выбирает Игрок второй.',opts:['Жили-были звери во лесу','В некотором царстве, во дремучем лесу','Раз четверо друзей в лесу заплутали']},
      {who:0,title:'Помощника выбирает Игрок первый.',opts:['Леший со светлячком-огоньком','Баба Яга с клубочком','Колобок с пружинкой волшебной']},
      {who:2,title:'Конец — вместе: оба на одной строке, и оба жмите разом.',opts:['И стал Леший дорогу казать','И все воротились домой — к самовару, к чаю','И лес с тех пор тропинок не путал']}];
    let st=0;const sel=[0,0,0],both=[0,0],ok=[false,false];
    const draw=()=>{const s=steps[st];el.innerHTML='<div class="tet"><h2>Сказ · «Леший-проводник»</h2><div class="step">'+s.title+'</div>'+
      s.opts.map((o,i)=>'<div class="opt'+((s.who<2?sel[st]===i:false)?' sel':'')+'">'+(s.who===2?[0,1].map(q=>both[q]===i?'<b style="color:'+PCSS[q]+'">'+(ok[q]?'●':'○')+'</b>':'<b></b>').join(''):'')+o+'</div>').join('')+
      '<div class="hint">'+(s.who===2?'оба: '+K(0,'left')+K(0,'right')+' / '+K(1,'left')+K(1,'right')+' · '+K(0,'jump')+' + '+K(1,'jump'):K(s.who,'up')+K(s.who,'down')+' · '+K(s.who,'jump'))+'</div>'+
      '<div class="tale">'+[steps[0].opts[sel[0]],st>0?'помощник — '+steps[1].opts[sel[1]]:''].filter(x=>x).join(' · ')+'</div></div>';};
    draw();
    G.uiTick=()=>{const s=steps[st];
      if(s.who<2){const n=uiNav(UW(s.who));if(n.dy||n.dx){sel[st]=(sel[st]+(n.dy||n.dx)+3)%3;SFX.swap();draw();}if(tap(UW(s.who),'jump')){SFX.ok();st++;draw();}}
      else{for(const q of[0,1]){const n=uiNav(q);if(n.dy||n.dx){both[q]=(both[q]+(n.dy||n.dx)+3)%3;ok[q]=false;SFX.swap();draw();}if(tap(q,'jump')){ok[q]=true;if(G.solo){ok[1-q]=true;both[1-q]=both[q];}SFX.plate();draw();}}
        if(ok[0]&&ok[1]){if(both[0]===both[1]){sel[2]=both[0];SFX.ok();G.ui=null;G.uiTick=null;el.style.display='none';tell(steps.map((x,i)=>x.opts[sel[i]]));}
          else{ok[0]=ok[1]=false;SFX.miss();banner('Конец — одной строкой!','#ffd0d0',1.4,'договоритесь — и нажмите вдвоём');draw();}}}};}
  function tell(t){const T=HERO,pe=T.pelageya;G.flags.skaz=t;
    play({dur:15,fov:46,shots:[shot(0,[3.4,1.9,-1.2],[2.3,1.6,-4.6]),shot(7.6,[-1.4,1.6,0.4],[pe.pos.x,0.9,pe.pos.z])],
      says:[[0.4,3.4,'kot',t[0]+'.'],[3.9,3.4,'kot','И помог им в том '+t[1].replace(/^./,c=>c.toLowerCase())+'.'],[7.6,3.6,'kot',t[2]+'.'],[11.4,3.4,null,'<i>Кот нашу сказку сказывает своим голосом,</i><br><i>А Пелагея клювом шевелит вслед — тихо, волосом.</i>',true]],
      tick:(tt)=>{pe.body.position.y=tt>0.4&&tt<11?Math.abs(Math.sin(tt*9))*0.04:0;kot.head.rotation.x=Math.sin(tt*2)*0.05;},
      end:()=>{banner('Сказ «Леший-проводник»','#ffd76a',2.4,'весточка: помощник с вами в новый мир пойдёт');later(2.6,voiceScene);}});}
  function voiceScene(){const T=HERO;const ko=makeKoschei();ko.g.position.set(-9,-0.2,-26);ko.g.visible=false;const coil=addCoil(0,false);
    const thread=new THREE.Mesh(new THREE.CylinderGeometry(0.025,0.025,1,6),MB(0xffd76a));thread.visible=false;W.group.add(thread);
    const kotHead=()=>{const v=new V3();kot.head.getWorldPosition(v);return v;};
    HEROES.forEach((h,i)=>{placeOnGround(h,-2.6+i*1.6,-1.2,0);h.face=Math.PI;});
    play({dur:50,fov:46,camK:2.2,
      shots:[shot(0,[0,4,6],[0,3,-7]),shot(3.2,[3.6,2.2,-1],[0,2.2,-7]),shot(9,[5,2.6,-2.4],[2.3,1.9,-5.6]),shot(14,[-2,3.2,2],[-7,1.4,-20],[-2,2.6,0.5],[-4,1.6,-10],5),
        shot(21,[4.6,2.4,-2],[2.3,2.0,-5.4]),shot(29,[3.8,2.1,-3],[2.3,2.1,-5]),shot(34,[-1,3,2],[-5,1,-18],[0,3.4,4],[-10,1,-40],7),shot(42,[3.4,1.8,-2.2],[2.3,1.9,-4.8]),shot(46,[0,2.2,3.6],[0,1.2,-1.2])],
      says:[[0.4,3,null,'<i>На Лукоморье — пир да праздник.</i>',true],[3.4,3.4,null,'<i>Кузьма на дуб первую цепь вешает.</i>',true],[9.2,3.6,null,'<i>Кот на первую ступень цепи восходит,</i><br><i>Рот открывает — песню заводит…</i>',true],
        [13.6,2.6,null,'<i>…и вдруг — тишина.</i>',true],[16.8,4.2,null,'<i>Как пришёл он — не видал никто:</i><br><i>Высок, сух, в кафтане чёрном, звенит, как ключей решето.</i>',true],
        [22,4.4,null,'<i>На нас Кощей не глядит. К Коту руку тянет — перстень тяжёл —</i><br><i>И голос снимает с него, золотую ниточку, как шапку, — и прочь пошёл.</i>',true],
        [30,3.2,null,'<i>Ниточку в карман кладёт —</i><br><i>И по воде уходит, не оглянётся вперёд.</i>',true],[42.4,1.6,'kot','Мяу.'],[44.4,2.4,null,'<i>Прошка впервые за всю игру — ни слова.</i>',true],[47,2.8,null,'<i>Варя берёт меня за рукав.</i>',true]],
      events:[{t:0.3,fn:()=>{SFX.ok();for(let i=0;i<5;i++)later(i*0.5,()=>burst(new V3(rand(-6,6),3,rand(-6,2)),[0xff9ad0,0xfff08a,0x9ad0ff][i%3],10,3));}},
        {t:3.6,fn:()=>{coil.visible=true;coil.scale.setScalar(0.01);anim(1.4,k=>coil.scale.setScalar(Math.max(0.01,smooth(k))));SFX.link();G.flags.coils=Math.max(1,G.flags.coils||0);}},
        {t:9.2,fn:()=>{const from=kot.g.position.clone();anim(2,k=>{kot.g.position.set(lerp(from.x,1.7,k),Math.sin(k*Math.PI)*0.3+k*0.9,lerp(from.z,-5.4,k));});kot.lids.forEach(l=>{l.rotation.x=-0.5;});}},
        {t:11.8,fn:()=>{kot.head.rotation.x=-0.35;lullaby([67,71,74],0.35,0,0.12);}},
        {t:16.4,fn:()=>{ko.g.visible=true;SFX.keys();anim(5,k=>{ko.g.position.set(lerp(-9,0.2,k),-0.2+Math.min(1,k*3)*0.2,lerp(-26,-3.6,k));ko.body.rotation.z=Math.sin(k*20)*0.03;});ko.g.rotation.y=0.4;}},
        {t:22.2,fn:()=>{ko.g.rotation.y=Math.atan2(2.3-0.2,-4.6+3.6)+0.2;anim(1.2,k=>{ko.armR.rotation.x=-1.3*smooth(k);});}},
        {t:24.4,fn:()=>{thread.visible=true;SFX.keys();}},
        {t:28.6,fn:()=>{anim(1.2,k=>{ko.armR.rotation.x=-1.3*(1-smooth(k));});}},{t:29.8,fn:()=>{thread.visible=false;}},
        {t:30.2,fn:()=>{ko.g.rotation.y=Math.PI*0.95;SFX.keys();anim(11,k=>{ko.g.position.set(lerp(0.2,-6,k),0,lerp(-3.6,-60,k));});}},
        {t:41.6,fn:()=>{ko.g.visible=false;kot.head.rotation.x=0;}},{t:42.4,fn:()=>{tone(700,0.4,'sine',0.3,520);}},
        {t:44.4,fn:()=>{T.proshka.face=Math.PI*0.5;}},{t:47,fn:()=>{T.pelageya.face=Math.atan2(T.proshka.pos.x-T.pelageya.pos.x,T.proshka.pos.z-T.pelageya.pos.z);}}],
      tick:(t)=>{if(thread.visible){const a=kotHead(),b=new V3();ko.hand.getWorldPosition(b);const k=clamp((t-24.4)/3,0,1);const end=a.clone().lerp(b,k);
          thread.position.copy(a).add(end).multiplyScalar(0.5);thread.scale.y=Math.max(0.01,a.distanceTo(end));thread.quaternion.setFromUnitVectors(new V3(0,1,0),end.clone().sub(a).normalize());}},
      end:()=>{G.flags.voiceDone=true;F.stage='free';ko.g.visible=false;later(1.2,()=>showMenu('end'));}});}}
function lukoScene(){const Z=W.zven,kot=W.kot,F=W.flags,T=HERO;const faceTo=(h,x,z)=>{h.face=Math.atan2(x-h.pos.x,z-h.pos.z);};
  play({dur:24.5,fov:50,
   shots:[shot(0,[0,5.2,17],[0,2.4,3]),shot(3.0,[-4.2,2.4,4.4],[0,7,-7],[-2.8,2.0,2.8],[0,3.4,-7],2.4),shot(5.4,[3.9,1.9,-1.3],[2.3,1.75,-4.6]),
     shot(11.6,[0.3,2.1,10.4],[0,1.0,4.6]),shot(16.2,[4.1,2.0,-1.0],[2.3,1.7,-4.6]),shot(20.2,[0,4.6,9.5],[0,3.6,-7])],
   says:[[7.0,4.6,'kot','Звено куют руками,<br>А держится оно словами.'],[12.2,2.4,'proshka','<i>(шёпотом)</i> Это он про что, скажи?'],[16.6,3.6,'kot','Присказка кузнечная, старая. Не берите в голову, право.']],
   events:[{t:0,fn:()=>{HEROES.forEach((h,i)=>{h.pos.y=6.5+i*0.7;h.vel.set(0,0,0);h.grounded=false;h.face=Math.PI;});kot.head.rotation.x=0.4;kot.lids.forEach(l=>{l.rotation.x=1.3;});}},
     {t:1.1,fn:()=>{SFX.thud();shakeAll(0.03,0.2);HEROES.forEach(h=>burst(new V3(h.pos.x,0.2,h.pos.z),0xd8c8a0,6,2));}},
     {t:3.0,fn:()=>HEROES.forEach(h=>faceTo(h,0,-7))},
     {t:5.4,fn:()=>{F.eyes=true;kot.lids.forEach(l=>anim(1.2,k=>{l.rotation.x=lerp(1.3,-0.5,smooth(k));}));}},
     {t:11.6,fn:()=>HEROES.forEach(h=>faceTo(h,2.3,-4.6))},
     {t:12.2,fn:()=>faceTo(T.proshka,T.potap.pos.x,T.potap.pos.z)},
     {t:14.6,fn:()=>{SFX.wave();faceTo(T.potap,T.proshka.pos.x,T.proshka.pos.z);faceTo(T.pelageya,T.yosha.pos.x,T.yosha.pos.z);faceTo(T.yosha,T.pelageya.pos.x,T.pelageya.pos.z);
       floatText(T.pelageya.pos.clone().add(new V3(0,1.7,0)),'?','#e7c3ff');floatText(T.potap.pos.clone().add(new V3(0,2.2,0)),'?','#e0b27a');floatText(T.yosha.pos.clone().add(new V3(0,1.3,0)),'?','#8fe0d4');}},
     {t:20.4,fn:()=>{zvenRing();G.links=1;banner('Звено 1 — Звенышко','#ffd76a',2.6,'первое звено цепи — самим Котом скованное');}}],
   tick:(t,dt)=>{kot.head.rotation.x=lerp(0.4,-0.05,smooth((t-5.4)/1.6));
     if(t<4)Z.pos.lerpVectors(new V3(0,9,3),new V3(0.8,2.4,1.6),smooth(t/4));
     else if(t<20.2)Z.pos.set(0.8+Math.sin(t*0.9)*0.3,2.4,1.6);
     else{const a=(t-20.2)*2.2;Z.pos.set(Math.sin(a)*2.6,3.2+Math.sin(a*0.5)*0.4,-7+Math.cos(a)*2.6);}},
   end:()=>{F.stage='free';Z.mode='lead';kot.head.rotation.x=-0.05;kot.lids.forEach(l=>{l.rotation.x=-0.5;});snapCams();}});}

