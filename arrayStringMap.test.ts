import { assert } from "chai"
import ArrayStringMap from "./arrayStringMap.js"

const sampleArray1 = [1, 2]
const sampleArray2 = [1, 2]
const sampleArray3 = [1, 3]
const sampleValue1 = 1
const sampleValue2 = 2

describe("Empty map", () => {
    const arrayStringMap = new ArrayStringMap();
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