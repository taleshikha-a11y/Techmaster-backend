const fs = require('fs');

function replaceFile(file, oldStr, newStr) {
  const path = 'C:/Users/tales/Downloads/3D_API-main (1)/3D_API-main/' + file;
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(oldStr, newStr);
  fs.writeFileSync(path, content);
}

replaceFile('src/modules/about/about.model.js', '//     fs.promises.writeFile(, ));', 'fs.promises.writeFile(targetPath, JSON.stringify(data, null, 2), "utf8");');

replaceFile('src/modules/blogs/blog.model.js', '//       fs.promises.writeFile(, ), JSON.stringify(mappedBlogs, null, 2));', 'fs.promises.writeFile(path.join(dataDir, "blogs.json"), JSON.stringify(mappedBlogs, null, 2), "utf8");');

replaceFile('src/modules/blogs/blog.model.js', '//       fs.promises.writeFile(, ), JSON.stringify(settings, null, 2));', 'fs.promises.writeFile(path.join(dataDir, "blogSettings.json"), JSON.stringify(settings, null, 2), "utf8");');

replaceFile('src/modules/career/job.model.js', '//       fs.promises.writeFile(, ), JSON.stringify(mappedItems, null, 2));', 'fs.promises.writeFile(path.join(dataDir, "career.json"), JSON.stringify(mappedItems, null, 2), "utf8");');

replaceFile('src/modules/career/job.model.js', '//         fs.promises.writeFile(, ), JSON.stringify(mappedSettings, null, 2));', 'fs.promises.writeFile(path.join(dataDir, "careerSettings.json"), JSON.stringify(mappedSettings, null, 2), "utf8");');

replaceFile('src/modules/portfolio/portfolio.model.js', '//       fs.promises.writeFile(, ), JSON.stringify(mappedItems, null, 2));', 'fs.promises.writeFile(path.join(dataDir, "portfolio.json"), JSON.stringify(mappedItems, null, 2), "utf8");');

replaceFile('src/modules/portfolio/portfolio.model.js', '//         fs.promises.writeFile(, ), JSON.stringify(mappedSettings, null, 2));', 'fs.promises.writeFile(path.join(dataDir, "portfolioSettings.json"), JSON.stringify(mappedSettings, null, 2), "utf8");');

replaceFile('src/modules/service/service.model.js', '//       fs.promises.writeFile(, ), "utf8");', 'fs.promises.writeFile(mainServicesPath, JSON.stringify(mainServices, null, 2), "utf8");');

replaceFile('src/modules/service/service.model.js', '//       fs.promises.writeFile(, ), "utf8");', 'fs.promises.writeFile(settingsPath, JSON.stringify(settingsData, null, 2), "utf8");');
