const fs = require('fs');
let file = fs.readFileSync('src/scenes/BootScene.js', 'utf8');

if (!file.includes("clue_BPI")) {
  file = file.replace(/(this\.load\.image\('clue_BTC', 'assets\/BTC\.png'\);)/, 
    "$1\n    this.load.image('clue_BPI', 'assets/BPI.png');\n    this.load.image('clue_PCS', 'assets/PCS.png');");
}

if (!file.includes("portrait_deprivation")) {
  file = file.replace(/(this\.load\.image\('portrait_despair', 'assets\/DESPAIR\.png'\);)/, 
    "$1\n    this.load.image('port_deprivation', 'assets/portraits/depravation.png');\n    this.load.image('portrait_deprivation', 'assets/portraits/depravation.png');");
}

if (!file.includes("sprite_deprivation")) {
  file = file.replace(/(this\.load\.image\('sprite_despair', 'assets\/DESPAIR\.png'\);)/, 
    "$1\n    this.load.image('spr_entity_deprivation', 'assets/sprites/entities/depravation.png');\n    this.load.image('sprite_deprivation', 'assets/sprites/entities/depravation.png');");
}

fs.writeFileSync('src/scenes/BootScene.js', file);
console.log('BootScene updated.');
