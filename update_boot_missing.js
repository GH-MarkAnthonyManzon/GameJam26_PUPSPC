const fs = require('fs');
let file = fs.readFileSync('src/scenes/BootScene.js', 'utf8');

if (!file.includes("port_missing_poster")) {
  file = file.replace(/(this\.load\.image\('port_grad_cap', 'assets\/gradCap\.png'\);)/, 
    "$1\n    this.load.image('port_missing_poster', 'assets/MISSINGPOSTER.png');");
}

if (!file.includes("sprite_missing_poster")) {
  file = file.replace(/(this\.load\.image\('sprite_grad_cap', 'assets\/gradCap\.png'\);)/, 
    "$1\n    this.load.image('sprite_missing_poster', 'assets/MISSINGPOSTER.png');");
}

fs.writeFileSync('src/scenes/BootScene.js', file);
console.log('BootScene updated for missing poster.');
