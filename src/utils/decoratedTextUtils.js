const DecoratedTextUtils = {
  createGradientFromName(name) {
    return Offsets.libg.LogicDataTables.getColorGradientByName(
      StringUtils.getScPtr(name),
      ptr(0)
    );
  },

  createGradientFromColors(colors, startPct, endPct) {
    const count = colors.length;
    const ptrSize = Process.pointerSize;
    const startScaled = Math.floor(startPct * 100);
    const endScaled = Math.floor(endPct * 100);

    const colorBuf = malloc(count * 4 + 4);
    for (let i = 0; i < count; i++) {
      colorBuf.add(i * 4).writeU32(colors[i] >>> 0);
    }

    const gradientObj = malloc(80);
    gradientObj.writePointer(colorBuf);
    gradientObj.add(12).writeS32(count);

    const startVal = malloc(4);
    startVal.writeS32(endScaled);
    const endVal = malloc(4);
    endVal.writeS32(startScaled);

    const node1 = malloc(32);
    node1.add(24).writePointer(startVal);
    const node2 = malloc(32);
    node2.add(24).writePointer(endVal);

    const nodeArray = malloc(ptrSize * 4);
    nodeArray.add(ptrSize * 2).writePointer(node1);
    nodeArray.add(ptrSize * 3).writePointer(node2);

    const keyObj = malloc(64);
    keyObj.add(56).writePointer(nodeArray);

    const keyPtr = malloc(16);
    keyPtr.writePointer(keyObj);
    keyPtr.add(ptrSize).writeU32(0);

    const result = malloc(96);
    result.add(8).writePointer(keyPtr);
    result.add(88).writePointer(gradientObj);
    return result;
  }
};
Global.DecoratedTextUtils = DecoratedTextUtils;

module.exports = { DecoratedTextUtils };
