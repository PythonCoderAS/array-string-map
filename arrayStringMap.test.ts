import { assert } from "chai"
import ArrayStringMap from "./arrayStringMap.js"

type TwoNumberArray = [number, number]

const sampleArray1: TwoNumberArray = [1, 2]
const sampleArray2: TwoNumberArray = [1, 2]
const sampleArray3: TwoNumberArray = [1, 3]
const sampleValue1 = 1
const sampleValue2 = 2

function copyArrayStringMap<K extends any[], V>(map: ArrayStringMap<K, V>): ArrayStringMap<K, V> {
  const newMap = new ArrayStringMap<K, V>()
  for (const [key, value] of map) {
    newMap.set(key, value)
  }
  return newMap
}

describe("Empty map", () => {
    const arrayStringMap = new ArrayStringMap<TwoNumberArray, number>();
    it("Empty map size is 0", () => {
        assert(arrayStringMap.size === 0);
    })
    it ("Empty map get returns undefined", () => {
        assert(arrayStringMap.get(sampleArray1) === undefined);
    })
    it ("Empty map has returns false", () => {
        assert(!arrayStringMap.has(sampleArray1));
    })
    it ("Empty map entries returns empty array", () => {
        assert([...arrayStringMap.entries()].length === 0);
    })
})

describe("Map with one object", () => {
    const arrayStringMap = new ArrayStringMap<TwoNumberArray, number>();
    arrayStringMap.set(sampleArray1, sampleValue1);
    it("Map size is 1", () => {
        assert(arrayStringMap.size === 1);
    })
    it ("Map get returns value", () => {
        assert(arrayStringMap.get(sampleArray1) === sampleValue1);
    })
    it ("Alternate array with same values returns same value", () => {
        assert(arrayStringMap.get(sampleArray2) === sampleValue1);
    })
    it ("Map has returns true", () => {
        assert(arrayStringMap.has(sampleArray1));
    })
    it ("Map entries returns array with one object", () => {
        assert([...arrayStringMap.entries()].length === 1);
        assert([...arrayStringMap.entries()][0][0] === sampleArray1);
        assert([...arrayStringMap.entries()][0][1] === sampleValue1);
    })
    it ("Map keys returns array with one object", () => {
        assert([...arrayStringMap.keys()].length === 1);
        assert([...arrayStringMap.keys()][0] === sampleArray1);
    })
    it ("Map values returns array with one value", () => {
        assert([...arrayStringMap.values()].length === 1);
        assert([...arrayStringMap.values()][0] === sampleValue1);
    })
    it("Map uses proper separator underneath", () => {
        // @ts-ignore - this is a test, and we need to make sure the underlying map
        // works as expected
        assert([...arrayStringMap._map.keys()][0].includes("\u200b"));
        // @ts-ignore - this is a test, and we need to make sure the underlying encoding map
        // works as expected
        assert([...arrayStringMap._converterInfo.values()][0] === sampleArray1);
    })
    it ("Clearing map removes object", () => {
        const copiedMap = copyArrayStringMap(arrayStringMap);
        copiedMap.clear();
        assert(copiedMap.size === 0);
        assert(copiedMap.get(sampleArray1) === undefined);
        assert(!copiedMap.has(sampleArray1));
        assert([...copiedMap.entries()].length === 0);
        // @ts-ignore - this is a test, and we need to make sure the underlying map
        // works as expected
        assert(copiedMap._map.size === 0);
        // @ts-ignore - this is a test, and we need to make sure the underlying encoding map
        // works as expected
        assert(copiedMap._converterInfo.size === 0);
    })
    it ("Deleting entry from map removes object", () => {
        const copiedMap = copyArrayStringMap(arrayStringMap);
        copiedMap.delete(sampleArray1);
        assert(copiedMap.size === 0);
        assert(copiedMap.get(sampleArray1) === undefined);
        assert(!copiedMap.has(sampleArray1));
        assert([...copiedMap.entries()].length === 0);
        // @ts-ignore - this is a test, and we need to make sure the underlying map
        // works as expected
        assert(copiedMap._map.size === 0);
        // @ts-ignore - this is a test, and we need to make sure the underlying encoding map
        // works as expected
        assert(copiedMap._converterInfo.size === 0);
    })
})

describe("Map with one object and different separator", () => {
    const arrayStringMap = new ArrayStringMap<TwoNumberArray, number>();
    arrayStringMap.set(sampleArray1, sampleValue1);
    it("Map uses proper encoding underneath", () => {
        // @ts-ignore - this is a test, and we need to make sure the underlying item
        // works as expected
        assert([...arrayStringMap._map.keys()][0].includes(":"));
    })
})

describe("Map with one object and alternate array", () => {
    const arrayStringMap = new ArrayStringMap<TwoNumberArray, number>();
    arrayStringMap.set(sampleArray1, sampleValue1);
    arrayStringMap.set(sampleArray2, sampleValue2);
    it("Map size is 1", () => {
        assert(arrayStringMap.size === 1);
    })
    it ("Map get returns value", () => {
        assert(arrayStringMap.get(sampleArray2) === sampleValue2);
    })
    it ("Alternate array with same values returns same value", () => {
        assert(arrayStringMap.get(sampleArray1) === sampleValue2);
    })
    it ("Map has returns true", () => {
        assert(arrayStringMap.has(sampleArray2));
    })
    it ("Map entries returns array with one object", () => {
        assert([...arrayStringMap.entries()].length === 1);
        assert([...arrayStringMap.entries()][0][0] === sampleArray2);
        assert([...arrayStringMap.entries()][0][1] === sampleValue2);
    })
    it ("Map keys returns array with one object", () => {
        assert([...arrayStringMap.keys()].length === 1);
        assert([...arrayStringMap.keys()][0] === sampleArray2);
    })
    it ("Map values returns array with one value", () => {
        assert([...arrayStringMap.values()].length === 1);
        assert([...arrayStringMap.values()][0] === sampleValue2);
    })
})

describe("Map with two objects", () => {
    const arrayStringMap = new ArrayStringMap<TwoNumberArray, number>();
    arrayStringMap.set(sampleArray1, sampleValue1);
    arrayStringMap.set(sampleArray3, sampleValue2);
    it("Map size is 2", () => {
        assert(arrayStringMap.size === 2);
    })
    it ("Map get returns value", () => {
        assert(arrayStringMap.get(sampleArray1) === sampleValue1);
        assert(arrayStringMap.get(sampleArray3) === sampleValue2);
    })
    it ("Alternate array with same values returns same value", () => {
        assert(arrayStringMap.get(sampleArray2) === sampleValue1);
        assert(arrayStringMap.get(sampleArray3) !== sampleValue1);
    })
    it ("Map has returns true", () => {
        assert(arrayStringMap.has(sampleArray1));
        assert(arrayStringMap.has(sampleArray2));
    })
    it ("Map entries returns array with two objects", () => {
        assert([...arrayStringMap.entries()].length === 2);
        assert([...arrayStringMap.entries()][0][0] === sampleArray1);
        assert([...arrayStringMap.entries()][0][1] === sampleValue1);
        assert([...arrayStringMap.entries()][1][0] === sampleArray3);
        assert([...arrayStringMap.entries()][1][1] === sampleValue2);
    })
    it ("Map keys returns array with two objects", () => {
        assert([...arrayStringMap.keys()].length === 2);
        assert([...arrayStringMap.keys()][0] === sampleArray1);
        assert([...arrayStringMap.keys()][1] === sampleArray3);
    })
    it ("Map values returns array with two values", () => {
        assert([...arrayStringMap.values()].length === 1);
        assert([...arrayStringMap.values()][0] === sampleValue1);
    })
    it("Map uses proper separator underneath", () => {
        // @ts-ignore - this is a test, and we need to make sure the underlying map
        // works as expected
        assert([...arrayStringMap._map.keys()][0].includes("\u200b"));
        // @ts-ignore - this is a test, and we need to make sure the underlying map
        // works as expected
        assert([...arrayStringMap._map.keys()][1].includes("\u200b"));
        // @ts-ignore - this is a test, and we need to make sure the underlying encoding map
        // works as expected
        assert([...arrayStringMap._converterInfo.values()][0] === sampleArray1);
        // @ts-ignore - this is a test, and we need to make sure the underlying map
        // works as expected
        assert([...arrayStringMap._converterInfo.values()][1] === sampleArray3);
    })
    it ("Clearing map removes all objects", () => {
        const copiedMap = copyArrayStringMap(arrayStringMap);
        copiedMap.clear();
        assert(copiedMap.size === 0);
        assert(copiedMap.get(sampleArray1) === undefined);
        assert(!copiedMap.has(sampleArray1));
        assert([...copiedMap.entries()].length === 0);
        // @ts-ignore - this is a test, and we need to make sure the underlying map
        // works as expected
        assert(copiedMap._map.size === 0);
        // @ts-ignore - this is a test, and we need to make sure the underlying encoding map
        // works as expected
        assert(copiedMap._converterInfo.size === 0);
    })
    it ("Deleting entry from map removes object but keeps other object", () => {
        const copiedMap = copyArrayStringMap(arrayStringMap);
        copiedMap.delete(sampleArray1);
        assert(copiedMap.size === 1);
        assert(copiedMap.get(sampleArray1) === undefined);
        assert(copiedMap.get(sampleArray3) === sampleValue2);
        assert(!copiedMap.has(sampleArray1));
        assert(copiedMap.has(sampleArray3));
        assert([...copiedMap.entries()].length === 1);
        // @ts-ignore - this is a test, and we need to make sure the underlying map
        // works as expected
        assert(copiedMap._map.size === 1);
        // @ts-ignore - this is a test, and we need to make sure the underlying encoding map
        // works as expected
        assert(copiedMap._converterInfo.size === 1);
    })
})