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
