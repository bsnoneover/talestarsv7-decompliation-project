const StringUtils = {
  readStringFromStringObject(ptr) {
    const byteLen = ptr.add(4).readInt();
    if (byteLen > 7) {
      return ptr.add(8).readPointer().readUtf8String(byteLen);
    }
    return ptr.add(8).readUtf8String(byteLen);
  },

  getUtf8ByteLength(str) {
    const ptr = Memory.allocUtf8String(str);
    let len = 0;
    while (ptr.add(len).readU8() !== 0) len++;
    return len;
  },

  writeStringObject(objPtr, str) {
    try {
      const byteLen = this.getUtf8ByteLength(str);
      objPtr.writeU32(str.length);
      objPtr.add(4).writeInt(byteLen);
      if (byteLen > 7) {
        const heapPtr = malloc(byteLen + 1);
        heapPtr.writeUtf8String(str);
        objPtr.add(8).writePointer(heapPtr);
      } else {
        objPtr.add(8).writeUtf8String(str);
      }
    } catch { }
  },

  writeStringObjectByteArray(objPtr, data) {
    if (objPtr === undefined) objPtr = new NativePointer();
    if (data === undefined) data = new Uint8Array();
    data = new Uint8Array(data);
    const len = data.length;
    objPtr.add(4).writeInt(len);
    if (len > 7) {
      const heapPtr = malloc(len + 1);
      heapPtr.writeByteArray(data);
      objPtr.add(8).writePointer(heapPtr);
      return;
    }
    objPtr.add(8).writeByteArray(data);
  },

  createNewStringObject(str, preAllocPtr = 0) {
    const charLen = str.length;
    const byteLen = Buffer.byteLength(str, 'utf-8');
    if (!preAllocPtr) return;
    const objPtr = preAllocPtr || malloc(16);
    objPtr.writeU32(charLen);
    objPtr.add(4).writeU32(byteLen);
    if (byteLen > 7) {
      const strPtr = malloc(byteLen + 1);
      strPtr.writeUtf8String(str);
      objPtr.add(8).writePointer(strPtr);
    } else {
      objPtr.add(8).writeUtf8String(str);
    }
    return objPtr;
  },

  getStrPtr(str) {
    return Memory.allocUtf8String(str);
  },

  getScPtr(str) {
    const ptr = malloc(40);
    Offsets.libg.String.ctor(ptr, this.getStrPtr(str));
    return ptr;
  },

  getTID(str) {
    return this.readStringFromStringObject(
      Offsets.libg.StringTable.getString(this.getStrPtr(str))
    );
  },

  clearStringObject(ptr) {
    if (!ptr) return;
    ptr.writeInt(0);
    ptr.add(4).writeInt(0);
    ptr.add(8).writeInt(0);
  },

  clearStringObjects(...ptrs) {
    for (const ptr of ptrs) {
      if (!ptr) continue;
      ptr.writeInt(0);
      ptr.add(4).writeInt(0);
      ptr.add(8).writeInt(0);
      Offsets.native.free(ptr);
    }
  },

  stringToByteArray(str, extraBytes = 0) {
    const ptr = Memory.allocUtf8String(str);
    let len = 0;
    while (ptr.add(len).readU8() !== 0) len++;
    return new Uint8Array(ptr.readByteArray(len + extraBytes));
  }
};

Global.StringUtils = StringUtils;
module.exports = { StringUtils };
