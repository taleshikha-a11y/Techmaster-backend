import fs from 'fs';
['src/modules/media coverage/media.model.js', 'src/modules/gallery/gallery.model.js'].forEach(f => {
  try {
    const path = 'C:/Users/tales/Downloads/3D_API-main (1)/3D_API-main/' + f;
    let content = fs.readFileSync(path, 'utf8');
    content = content.replace(/\/\/\s*fs\.promises\.writeFile\(, \)/g, 'fs.promises.writeFile(targetPath, JSON.stringify(doc, null, 2), "utf8")');
    content = content.replace(/const fs = require\('fs'\);/g, '');
    fs.writeFileSync(path, content);
    console.log('Fixed', f);
  } catch(e) { console.log(e.message) }
});
