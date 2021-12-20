# array-string-map

![node-current](https://img.shields.io/node/v/array-string-map)
[![npm](https://img.shields.io/npm/v/array-string-map)](https://www.npmjs.com/package/array-string-map)
[![npm](https://img.shields.io/npm/dt/array-string-map)](https://www.npmjs.com/package/array-string-map)
[![GitHub issues](https://img.shields.io/github/issues/PythonCoderAS/array-string-map)](https://github.com/PythonCoderAS/array-string-map/issues)
[![Tests](https://github.com/PythonCoderAS/array-string-map/actions/workflows/test.yml/badge.svg)](https://github.com/PythonCoderAS/array-string-map/actions/workflows/test.yml)

A Map that internally encodes Arrays to strings so that two Arrays with the same elements will return the same item.

## Motivation

I was using a Map to store array values, and I kept on running into a bug where I could not get those values back. I got
fed up, and then after some Googling, realized that array lookups will not work when two different arrays with the same
elements are used (such as when I use array literal syntax to create them). My solution was to encode the values as
string keys.

## Usage

ESM modules or TypeScript scripts can just import the normal way, such as:

```ts
import ArrayStringMap from 'array-string-map'
```

However, for CommonJS modules, you need to use the `require` function, such as:

```js
const {default: ArrayStringMap} = require("array-string-map")
```

## API

### ArrayStringMap

A class that implements the [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
interface. All methods that can be used on a Map are available on the ArrayStringMap.

