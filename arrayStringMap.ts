/**
 * A Map that uses arrays as keys by encoding them as strings.
 * 
 * This class implements the [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) interface. All methods that can be used on a normal Map are available on the ArrayStringMap.
 * @template K The type of the keys. Has to be an array type
 * @template V The type of the values.
 * @example
 * const map = new ArrayStringMap<string[], number>();
 * map.set(['a', 'b', 'c'], 123);
 * map.get(['a', 'b', 'c']); // 123
 * map.get(['a', 'b']); // undefined
 */
export default class ArrayStringMap<K extends any[], V> implements Map<K, V> {
    /**
     * The map that stores the string and values.
     */
    private readonly _map: Map<string, V> = new Map<string, V>();
    /**
     * A map storing the string versions and the original array versions.
     */
    private readonly _converterInfo: Map<string, K> = new Map<string, K>();
    /**
     * The seperator that is being used to seperate list items.
     */
    private readonly _sep: string;

    /**
     * Creates a new ArrayStringMap.
     * @param sep The seperator that is being used to seperate list items. By default, this is the zero-width space character, which is unlikely to be used in most trusted strings. However, if the data used can be arbritary strings that are provided as user input, it is recommended to validate given strings to remove the zero-width space character or set the seperator to another string that cannot be in the input due to validation checks.
     * @example
     * const map = new ArrayStringMap<string[], number>();
     **/
    public constructor(sep: string = '\u200b') {
        this._sep = sep;
    }

    /**
     * The seperator that is being used to seperate list items.
     * @example
     * const map = new ArrayStringMap<string[], number>();
     * map.sep; // '\u200b'
     */
    public get sep(): string {
        return this._sep;
    }

    /**
     * The name of the class.
     */
    public get [Symbol.toStringTag](): string {
        return "ArrayStringMap";
    }

    /**
     * The number of items in the map.
     */
    public get size(): number {
        return this._map.size;
    }
    
    /**
     * Encode an array into its string representation.
     * @param arr The array to encode
     * @returns The string representation of the array
     */
    private encodeArray(arr: K): string {
        return arr.map(x => x.toString()).join(this._sep)
    }

    /**
     * @returns An iterator over the entries in the map.
     * @see {ArrayStringMap.entries}
     */
    [Symbol.iterator](): IterableIterator<[K, V]> {
        return this.entries();
    }

    /**
     * Removes all entries from the map.
     */
    clear(): void {
        this._map.clear();
        this._converterInfo.clear();
    }

    /**
     * Deletes an entry from the map.
     * @param key The key to delete
     * @returns Whether the entry was deleted (true) or never existed (false)
     * @example
     * const map = new ArrayStringMap<string[], number>();
     * map.set(['a', 'b', 'c'], 123);
     * map.delete(['a', 'b', 'c']); // true
     * map.delete(['a', 'b', 'c']); // false
     */
    delete(key: K): boolean {
        const encoded = this.encodeArray(key)
        const retval  = this._map.delete(encoded)
        this._converterInfo.delete(encoded);
        return retval;
    }

    /**
     * @returns An iterator over the entries in the map.
     * @example
     * const map = new ArrayStringMap<string[], number>();
     * map.set(['a', 'b', 'c'], 123);
     * map.set(['a', 'b', 'd'], 456);
     * for (const [key, value] of map.entries()) {
     *    console.log(key, value);
     * }
     * // ['a', 'b', 'c'] 123
     * // ['a', 'b', 'd'] 456
     */
    * entries(): IterableIterator<[K, V]> {
        for (const [key, value] of this._map.entries()) {
            // TypeScript complains that this will be undefined, but the items in
            // `this._converterInfo` and `this._map` will always be defined in each other.
            const arr: K = this._converterInfo.get(key) as K;
            yield [arr, value];
        }
    }

    /**
     * Executes a function for each entry in the map.
     * @param callbackfn The function to execute for each entry.
     * @param thisArg The value to use as `this` when executing the function.
     * @example
     * const map = new ArrayStringMap<string[], number>();
     * map.set(['a', 'b', 'c'], 123);
     * map.set(['a', 'b', 'd'], 456);
     * map.forEach((value, key) => {
     *   console.log(key, value);
     * });
     * // ['a', 'b', 'c'] 123
     * // ['a', 'b', 'd'] 456
     */
    forEach(callbackfn: (value: V, key: K, map: ArrayStringMap<K, V>) => void, thisArg?: any): void {
        for (const [key, value] of this.entries()) {
            callbackfn.call(thisArg, value, key, this);
        }
    }
    
    /**
     * Gets the value for a given key.
     * @param key The key to get the value for
     * @returns The value for the given key, or undefined if the key does not exist.
     * @example
     * const map = new ArrayStringMap<string[], number>();
     * map.set(['a', 'b', 'c'], 123);
     * map.get(['a', 'b', 'c']); // 123
     * map.get(['a', 'b']); // undefined
     */
    get(key: K): V | undefined {
        return this._map.get(this.encodeArray(key));
    }

    /**
     * Checks whether the map has a given key.
     * @param key The key to check for.
     * @returns Whether the map has the given key.
     * @example
     * const map = new ArrayStringMap<string[], number>();
     * map.set(['a', 'b', 'c'], 123);
     * map.has(['a', 'b', 'c']); // true
     * map.has(['a', 'b']); // false
     */

    has(key: K): boolean {
        return this._map.has(this.encodeArray(key));
    }

    /**
     * Get the keys in the map in array form.
     * @returns An iterator over the keys in the map.
     * @example
     * const map = new ArrayStringMap<string[], number>();
     * map.set(['a', 'b', 'c'], 123);
     * map.set(['a', 'b', 'd'], 456);
     * for (const key of map.keys()) {
     *   console.log(key);
     * }
     * // ['a', 'b', 'c']
     * // ['a', 'b', 'd']
     */
    keys(): IterableIterator<K> {
        return this._converterInfo.values();
    }

    /**
     * Sets a value for a given key.
     * @param key The key to set the value for.
     * @param value The value to set.
     * @returns The map itself.
     * @example
     * const map = new ArrayStringMap<string[], number>();
     * map.set(['a', 'b', 'c'], 123);
     */
    set(key: K, value: V): this {
        const encodedKey = this.encodeArray(key);
        this._map.set(encodedKey, value);
        this._converterInfo.set(encodedKey, key);
        return this;
    }

    /**
     * @returns An iterator over the values in the map.
     * @example
     * const map = new ArrayStringMap<string[], number>();
     * map.set(['a', 'b', 'c'], 123);
     * map.set(['a', 'b', 'd'], 456);
     * for (const value of map.values()) {
     *  console.log(value);
     * }
     * // 123
     * // 456
     */
    values(): IterableIterator<V> {
        return this._map.values();
    }

}