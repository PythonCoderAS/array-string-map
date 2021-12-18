import { assert } from "chai"
import ArrayStringMap from "./arrayStringMap"

describe("arrayStringMap", () => {
    const sampleArray1 = [1, 2]
    const sampleArray2 = [1, 2]
    const sampleArray3 = [1, 3]
    const sampleValue1 = 1
    const sampleValue2 = 2
    it("Empty map", () => {
        const arrayStringMap = new ArrayStringMap();
        assert(arrayStringMap.size === 0, "Empty map size is 0");
        assert(arrayStringMap.get(sampleArray1) === undefined, "Empty map get returns undefined");
        assert(!arrayStringMap.has(sampleArray1), "Empty map has returns false");
        assert([...arrayStringMap.entries()].length === 0, "Empty map entries returns empty array");
    })
})