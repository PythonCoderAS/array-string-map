import { assert } from "chai"
import ArrayStringMap from "./arrayStringMap"

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
    it ("Empty map forEach", () => {
        arrayStringMap.forEach(() => {
            assert(false, "forEach should not be called");
        });
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
        assert([...arrayStringMap.entries()].length === 1, "Array length is 1");
        assert([...arrayStringMap.entries()][0][0] === sampleArray1, "Array is sampleArray1");
        assert([...arrayStringMap.entries()][0][1] === sampleValue1, "Value is sampleValue1");
    })
    it ("Map keys returns array with one object", () => {
        assert([...arrayStringMap.keys()].length === 1, "Array length is 1");
        assert([...arrayStringMap.keys()][0] === sampleArray1, "Array is sampleArray1");
    })
    it ("Map values returns array with one value", () => {
        assert([...arrayStringMap.values()].length === 1, "Array length is 1");
        assert([...arrayStringMap.values()][0] === sampleValue1, "Value is sampleValue1");
    })
    it("Map uses proper separator underneath", () => {
        // @ts-ignore - this is a test, and we need to make sure the underlying map
        // works as expected
        assert([...arrayStringMap._map.keys()][0].includes("\u200b"), "Separator is present");
        // @ts-ignore - this is a test, and we need to make sure the underlying encoding map
        // works as expected
        assert([...arrayStringMap._converterInfo.values()][0] === sampleArray1, "Converter info is sampleArray1");
    })
    it ("Clearing map removes object", () => {
        const copiedMap = copyArrayStringMap(arrayStringMap);
        copiedMap.clear();
        assert(copiedMap.size === 0, "Map size is 0");
        assert(copiedMap.get(sampleArray1) === undefined, "Map get returns undefined");
        assert(!copiedMap.has(sampleArray1), "Map has returns false");
        assert([...copiedMap.entries()].length === 0, "Map entries returns empty array");
        // @ts-ignore - this is a test, and we need to make sure the underlying map
        // works as expected
        assert(copiedMap._map.size === 0, "Data map size is 0");
        // @ts-ignore - this is a test, and we need to make sure the underlying encoding map
        // works as expected
        assert(copiedMap._converterInfo.size === 0, "Converter map size is 0");
    })
    it ("Deleting entry from map removes object", () => {
        const copiedMap = copyArrayStringMap(arrayStringMap);
        copiedMap.delete(sampleArray1);
        assert(copiedMap.size === 0, "Map size is 0");
        assert(copiedMap.get(sampleArray1) === undefined, "Map get returns undefined");
        assert(!copiedMap.has(sampleArray1), "Map has returns false");
        assert([...copiedMap.entries()].length === 0, "Map entries returns empty array");
        // @ts-ignore - this is a test, and we need to make sure the underlying map
        // works as expected
        assert(copiedMap._map.size === 0, "Data map size is 0");
        // @ts-ignore - this is a test, and we need to make sure the underlying encoding map
        // works as expected
        assert(copiedMap._converterInfo.size === 0, "Converter map size is 0");
    })
    it ("Map forEach is called once", () => {
        let count = 0;
        arrayStringMap.forEach((value, key, map) => {
            count++;
            assert(value === sampleValue1, "Value is sampleValue1");
            assert(key === sampleArray1, "Key is sampleArray1");
            assert(map === arrayStringMap, "Map is arrayStringMap");
        });
        assert(count === 1, "ForEach is called once");
    })
})

describe("Map with one object and different separator", () => {
    const arrayStringMap = new ArrayStringMap<TwoNumberArray, number>(":");
    arrayStringMap.set(sampleArray1, sampleValue1);
    it("Map uses proper encoding underneath", () => {
        // @ts-ignore - this is a test, and we need to make sure the underlying item
        // works as expected
        assert([...arrayStringMap._map.keys()][0].includes(":"), "Separator is present");
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
        assert([...arrayStringMap.entries()].length === 1, "Array length is 1");
        assert([...arrayStringMap.entries()][0][0] === sampleArray2, "Array is sampleArray2");
        assert([...arrayStringMap.entries()][0][1] === sampleValue2, "Value is sampleValue2");
    })
    it ("Map keys returns array with one object", () => {
        assert([...arrayStringMap.keys()].length === 1, "Array length is 1");
        assert([...arrayStringMap.keys()][0] === sampleArray2, "Array is sampleArray2");
    })
    it ("Map values returns array with one value", () => {
        assert([...arrayStringMap.values()].length === 1, "Array length is 1");
        assert([...arrayStringMap.values()][0] === sampleValue2, "Value is sampleValue2");
    })
    it ("Map forEach is called once", () => {
        let count = 0;
        arrayStringMap.forEach((value, key, map) => {
            count++;
            assert(value === sampleValue2, "Value is sampleValue2");
            assert(key === sampleArray2, "Key is sampleArray2");
            assert(map === arrayStringMap, "Map is arrayStringMap");
        });
        assert(count === 1, "ForEach is called once");
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
        assert(arrayStringMap.get(sampleArray1) === sampleValue1, "Value is sampleValue1");
        assert(arrayStringMap.get(sampleArray3) === sampleValue2, "Value is sampleValue2");
    })
    it ("Alternate array with same values returns same value", () => {
        assert(arrayStringMap.get(sampleArray2) === sampleValue1, "Value is sampleValue1");
        assert(arrayStringMap.get(sampleArray3) !== sampleValue1, "Value is not sampleValue1");
    })
    it ("Map has returns true", () => {
        assert(arrayStringMap.has(sampleArray1), "Has for sampleArray1 returns true");
        assert(arrayStringMap.has(sampleArray2), "Has for sampleArray2 returns true");
    })
    it ("Map entries returns array with two objects", () => {
        assert([...arrayStringMap.entries()].length === 2, "Array length is 2");
        assert([...arrayStringMap.entries()][0][0] === sampleArray1, "Array is sampleArray1");
        assert([...arrayStringMap.entries()][0][1] === sampleValue1, "Value is sampleValue1");
        assert([...arrayStringMap.entries()][1][0] === sampleArray3, "Array is sampleArray3");
        assert([...arrayStringMap.entries()][1][1] === sampleValue2, "Value is sampleValue2");
    })
    it ("Map keys returns array with two objects", () => {
        assert([...arrayStringMap.keys()].length === 2, "Array length is 2");
        assert([...arrayStringMap.keys()][0] === sampleArray1, "Array is sampleArray1");
        assert([...arrayStringMap.keys()][1] === sampleArray3, "Array is sampleArray3");
    })
    it ("Map values returns array with two values", () => {
        assert([...arrayStringMap.values()].length === 2, "Array length is 2");
        assert([...arrayStringMap.values()][0] === sampleValue1, "Value is sampleValue1");
        assert([...arrayStringMap.values()][1] === sampleValue2, "Value is sampleValue2");
    })
    it("Map uses proper separator underneath", () => {
        // @ts-ignore - this is a test, and we need to make sure the underlying map
        // works as expected
        assert([...arrayStringMap._map.keys()][0].includes("\u200b"), "Separator is present in item 0");
        // @ts-ignore - this is a test, and we need to make sure the underlying map
        // works as expected
        assert([...arrayStringMap._map.keys()][1].includes("\u200b"), "Separator is present in item 1");
        // @ts-ignore - this is a test, and we need to make sure the underlying encoding map
        // works as expected
        assert([...arrayStringMap._converterInfo.values()][0] === sampleArray1, "Converter info is sampleArray1 for item 0");
        // @ts-ignore - this is a test, and we need to make sure the underlying map
        // works as expected
        assert([...arrayStringMap._converterInfo.values()][1] === sampleArray3, "Converter info is sampleArray3 for item 1");
    })
    it ("Clearing map removes all objects", () => {
        const copiedMap = copyArrayStringMap(arrayStringMap);
        copiedMap.clear();
        assert(copiedMap.size === 0, "Map size is 0");
        assert(copiedMap.get(sampleArray1) === undefined, "Map get returns undefined for sampleArray1");
        assert(copiedMap.get(sampleArray3) === undefined, "Map get returns undefined for sampleArray3");
        assert(!copiedMap.has(sampleArray1), "Map has returns false for sampleArray1");
        assert(!copiedMap.has(sampleArray3), "Map has returns false for sampleArray3");
        assert([...copiedMap.entries()].length === 0, "Map entries returns empty array");
        // @ts-ignore - this is a test, and we need to make sure the underlying map
        // works as expected
        assert(copiedMap._map.size === 0, "Data map size is 0");
        // @ts-ignore - this is a test, and we need to make sure the underlying encoding map
        // works as expected
        assert(copiedMap._converterInfo.size === 0, "Converter map size is 0");
    })
    it ("Deleting entry from map removes object but keeps other object", () => {
        const copiedMap = copyArrayStringMap(arrayStringMap);
        copiedMap.delete(sampleArray1);
        assert(copiedMap.size === 1, "Map size is 1");
        assert(copiedMap.get(sampleArray1) === undefined, "Map get returns undefined for sampleArray1");
        assert(copiedMap.get(sampleArray3) === sampleValue2, "Map get returns sampleValue2 for sampleArray3");
        assert(!copiedMap.has(sampleArray1), "Map has returns false for sampleArray1");
        assert(copiedMap.has(sampleArray3), "Map has returns true for sampleArray3");
        assert([...copiedMap.entries()].length === 1, "Map entries returns array with one object");
        // @ts-ignore - this is a test, and we need to make sure the underlying map
        // works as expected
        assert(copiedMap._map.size === 1, "Data map size is 1");
        // @ts-ignore - this is a test, and we need to make sure the underlying encoding map
        // works as expected
        assert(copiedMap._converterInfo.size === 1, "Converter map size is 1");
    })
    it("Map forEach is called twice", () => {
        let count = 0;
        arrayStringMap.forEach((value, key, map) => {
            assert(map === arrayStringMap, "Map is arrayStringMap");
            if (count === 0){
                assert(key === sampleArray1, "Key is sampleArray1");
                assert(value === sampleValue1, "Value is sampleValue1");
            }
            else if (count === 1){
                assert(key === sampleArray3, "Key is sampleArray3");
                assert(value === sampleValue2, "Value is sampleValue2");
            }
            count++;
        });
        assert(count === 2, "ForEach is called twice");
    })
})