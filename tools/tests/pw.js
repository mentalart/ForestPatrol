// Playwright ищется так: node_modules рядом или выше по дереву, NODE_PATH, затем глобальная установка npm.
const {execSync}=require('child_process'),path=require('path');
function load(){
  try{return require('playwright');}catch(e){}
  try{const g=execSync('npm root -g',{encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim();return require(path.join(g,'playwright'));}catch(e){}
  throw new Error('Не найден playwright. Поставьте: npm i -D playwright && npx playwright install chromium');}
module.exports=load();
