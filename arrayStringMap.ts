export default class ArrayStringMap<K extends any[], V> implements Map<K, V> {
    private readonly _map: Map<string, V> = new Map<string, V>();
    private readonly _converterInfo: Map<string, K> = new Map<string, K>();
    private readonly _sep: string;

    public constructor(sep: string = '\u200b') {
        this._sep = sep;
    }


    public get sep(): string {
        return this._sep;
    }

    public get [Symbol.toStringTag](): string {
        return "ArrayStringMap";
    }

    public get size(): number {
        return this._map.size;
    }

    private encodeArray(arr: K): string {
        return arr.map(x => x.toString()).join(this._sep)
    }


    [Symbol.iterator](): IterableIterator<[K, V]> {
        return this.entries();
    }

    clear(): void {
        this._map.clear();
        this._converterInfo.clear();
    }

    delete(key: K): boolean {
        const encoded = this.encodeArray(key)
        const retval  = this._map.delete(encoded)
        this._converterInfo.delete(encoded);
        return retval;
    }

    * entries(): IterableIterator<[K, V]> {
        for (const [key, value] of this._map.entries()) {
            // TypeScript complains that this will be undefined, but the items in
            // `this._converterInfo` and `this._map` will always be defined in each other.
            const arr: K = this._converterInfo.get(key) as K;
            yield [arr, value];
        }
    }

    forEach(callbackfn: (value: V, key: K, map: ArrayStringMap<K, V>) => void, thisArg?: any): void {
        for (const [key, value] of this.entries()) {
            callbackfn.call(thisArg, value, key, this);
        }
    }

    get(key: K): V | undefined {
        return this._map.get(this.encodeArray(key));
    }

    has(key: K): boolean {
        return this._map.has(this.encodeArray(key));
    }

    keys(): IterableIterator<K> {
        return this._converterInfo.values();
    }

    set(key: K, value: V): this {
        const encodedKey = this.encodeArray(key);
        this._map.set(encodedKey, value);
        this._converterInfo.set(encodedKey, key);
        return this;
    }

    values(): IterableIterator<V> {
        return this._map.values();
    }

}