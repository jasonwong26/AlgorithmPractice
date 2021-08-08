import { HashMap } from "./hashMap";

describe.skip("HashMap", () => {
  it("stores key value pairs correctly", () => {
    const input = {
      "abc": 1,
      "bcd": 2,
      "cde": 3,
      "def": 4,
      "efg": 5
    };
    const map = new HashMap();

    const keys = Object.keys(input);
    for(let k of keys) {
      map.set(k, input[k]);
    }

    const output = {};
    for(let k of keys) {
      const val = map.get(k);
      output[k] = val;
    }

    expect(output).toEqual(input);
    expect(map.get("invalid key")).toBeNull();
  });
  it("updates an existing value properly", () => {
    const input = {
      "abc": 1,
      "bcd": 2,
      "cde": 3,
      "def": 4,
      "efg": 5
    };
    const map = new HashMap();

    const keys = Object.keys(input);
    for(let k of keys) {
      map.set(k, input[k]);
    }
    map.set("def", "updated value");

    expect(map.get("abc")).toEqual(input["abc"]);
    expect(map.get("bcd")).toEqual(input["bcd"]);
    expect(map.get("cde")).toEqual(input["cde"]);
    expect(map.get("def")).toEqual("updated value");
    expect(map.get("efg")).toEqual(input["efg"]);
    expect(map.get("invalid key")).toBeNull();
  });
  it("supports differnt key types", () => {
    const map = new HashMap();

    const inputs = [
      ["def", "string key value"],
      [1, "number key value"],
      [[1,2,3], "array key value"],
      [undefined, "undefined key value"],
      [{key: "value"}, "object key value"]
    ]

    for (let i of inputs) {
      const [key, val] = i;
      map.set(key, val);
    }


    for (let i of inputs) {
      const [key, val] = i;
      const retrieved = map.get(key);
      expect(retrieved).toEqual(val);
    }
  });
});