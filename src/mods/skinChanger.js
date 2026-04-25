const SkinChanger = {
  isSkinUnlocked: false,
  findMatchingLine(lines, searchName) {
    const cleanSearchName = searchName.replace(/"/g, '');
    for (let i = 0; i < cleanSearchName.length; i++) {
      const prefix = cleanSearchName.substring(0, i + 1) + 'default';
      const index = lines.findIndex((line) => {
        const lineName = line.split(',')[0].replace(/"/g, '').toLowerCase();
        return lineName.startsWith(prefix);
      });
      if (index !== -1) {
        return index;
      }
    }
    return null;
  },
  findClosestMatch(searchStr, lookupTable) {
    const upperSearch = searchStr.toUpperCase();
    const matchKey = Object.keys(lookupTable).find((key) => key.startsWith(upperSearch));
    return matchKey ? lookupTable[matchKey] : null;
  },
  writeCsv(sourcePath, destPath, brawlerName, skinName) {
    try {
      const csvContent = TaleUtils.File.read(sourcePath).replace(/\r\n/g, '\n').split('\n');
      const brawlerIndex = SkinChanger.findMatchingLine(csvContent, brawlerName);
      const skinLine = csvContent.find((line) => line.startsWith('"' + skinName + '"'));

      if (brawlerIndex === -1 || !skinLine) {
        return;
      }

      const brawlerData = csvContent[brawlerIndex].split(',').slice(0, 2);
      const skinData = skinLine.split(',').slice(2);
      csvContent[brawlerIndex] = brawlerData.concat(skinData).join(',');

      TaleUtils.File.write(destPath, csvContent.join('\n'), 'w+');
    } catch (_) {
      Logger.clog('');
    }
  }
};

module.exports = { SkinChanger };
