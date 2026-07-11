const fs = require('fs');
let file = fs.readFileSync('src/scenes/BootScene.js', 'utf8');

if (!file.includes("port_grad_cap")) {
  file = file.replace(/(this\.load\.image\('port_mc_eyes_closed', 'assets\/sprites\/protagonist\/mc_eyes_closed\.png'\);)/, 
    "$1\n    this.load.image('port_grad_cap', 'assets/gradCap.png');");
}

if (!file.includes("sprite_grad_cap")) {
  file = file.replace(/(this\.load\.image\('spr_mc_tired', 'assets\/sprites\/protagonist\/mc_tired\.png'\);)/, 
    "$1\n    this.load.image('sprite_grad_cap', 'assets/gradCap.png');");
}

fs.writeFileSync('src/scenes/BootScene.js', file);
console.log('BootScene updated for grad cap.');
