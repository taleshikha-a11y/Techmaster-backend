const fs = require('fs');

function replaceFile(file, oldStr, newStr) {
  const path = 'C:/Users/tales/Downloads/3D_API-main (1)/3D_API-main/' + file;
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(oldStr, newStr);
  fs.writeFileSync(path, content);
}

replaceFile('src/modules/collabration/collaboration.model.js', '//     fs.promises.writeFile(, ), null, 2), "utf8");', 'fs.promises.writeFile(dataFilePath, JSON.stringify(dataToWrite, null, 2), "utf8");');

replaceFile('src/modules/founderJourney/founderJourney.model.js', '//           fs.promises.writeFile(, ), "utf8");', 'fs.promises.writeFile(targetPath, JSON.stringify(journeyData, null, 2), "utf8");');

replaceFile('src/modules/founderJourney/founderJourney.model.js', '//       fs.promises.writeFile(, ), "utf8");', 'fs.promises.writeFile(targetPath, JSON.stringify(journeySettings, null, 2), "utf8");');

replaceFile('src/modules/missionvision/missionvision.model.js', '//     fs.promises.writeFile(, ), null, 2));', 'fs.promises.writeFile(targetPath, JSON.stringify(visitorData, null, 2), "utf8");');

replaceFile('src/modules/testimonials/testimonial.model.js', '//     fs.promises.writeFile(, ));', 'fs.promises.writeFile(targetPath, JSON.stringify(dataToWrite, null, 2), "utf8");');

replaceFile('src/modules/whatWeDo/whatWeDo.model.js', '//     fs.promises.writeFile(, ), null, 2));', 'fs.promises.writeFile(targetPath, JSON.stringify(whatWeDoVisitorData, null, 2), "utf8");');
