const fs = require('fs');
let c = fs.readFileSync('src/config/dialogues/quadrangle.js', 'utf8');
c = c.replace(/portrait: 'portrait_protagonist'/g, "portrait: 'port_mc_default'");
fs.writeFileSync('src/config/dialogues/quadrangle.js', c);
