
const HASH_PRIME = 17;

export class HashMap {
  _array: Record<string, unknown>[][];
  _size: number;

  constructor(size = HASH_PRIME) {
    this._size = size;
    this._array = Array.from({length: size}, () => []);
  }

  set = (key: unknown, value: unknown) => {
    const hash = this._hashFunction(key);
    const bucket = hash % this._size;

    let updated = false;
    for (let record of this._array[bucket]) {
      if(record.key === key) record.value = value;
    }
    if(!updated) {
      this._array[bucket].push({key, value});
    }
  }

  get = (key: unknown) => {
    const hash = this._hashFunction(key);
    const bucket = hash % this._size;
    
    for (let record of this._array[bucket]) {
      if(record.key === key) return record.value;
    }

    return null;
  }

  _hashFunction = (key: unknown) => {
    if(key == null || key == undefined) return 0;
    const asString = key.toString();
    const internalKey = `${asString}_${typeof key}`;

    let hash = 0;
    for(let i = 0; i < internalKey.length; i++) {
      const code = internalKey.charCodeAt(i);
      hash += code << i;
    }
    hash = hash || 0;

    return hash;
  }
}