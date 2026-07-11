const fs = require('fs');
const path = require('path');

const replaceInFile = (filePath, replacer) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = replacer(content);
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
};

const walkSync = (dir, callback) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      walkSync(filepath, callback);
    } else if (stats.isFile()) {
      callback(filepath);
    }
  });
};

const regex1 = /,?\s*UserRole\.SUPER_ADMIN\s*,?/g;
const regex2 = /,?\s*'SUPER_ADMIN'\s*,?/g;

walkSync('/Users/apple/Documents/CUHP PREVIOUS QUESTIONS/backend/src', (filepath) => {
  if (filepath.endsWith('.ts')) {
    replaceInFile(filepath, (content) => {
      let res = content.replace(regex1, (match) => {
        if (match.startsWith(',') && match.endsWith(',')) return ', ';
        return '';
      });
      res = res.replace(regex2, (match) => {
        if (match.startsWith(',') && match.endsWith(',')) return ', ';
        return '';
      });
      
      // Fix empty restrictTo()
      res = res.replace(/restrictTo\(\s*\)/g, "restrictTo(UserRole.ADMIN)");
      res = res.replace(/restrictTo\(\s*,/g, "restrictTo(");
      return res;
    });
  }
});
