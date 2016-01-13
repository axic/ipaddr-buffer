# ipaddr-buffer

This is a tiny shim over [ipaddr.js](https://github.com/whitequark/ipaddr.js) providing
some convenience features as well as helpers for Node.js `Buffer`s. This means it is
more suitable for Node.js deployments.

It should work as a drop in replacement for `ipaddr.js`, as it is only extending it with
the following methods:
- `fromBuffer(data, [endianness])`
- `<addr>.toBuffer()`
- `fromArray(data, [endianness])`
- `<addr>.toArray()`
- `fromNumber(number)`
- `<addr>.toNumber()`

All `Array` and `Buffer` methods accept an optional endianness parameter, either
`be` (MSB, default, also called *network byte order*) or `le` (LSB).

Examples:

```js
var ipaddr = require('ipaddr-buffer')

// return an ipaddr object
ipaddr.parse() // tried to parse in various ways
ipaddr.fromArray([0x7f, 0, 0, 1]) // defaults to 'be' (MSB, network byteorder)
ipaddr.fromArray([1, 0, 0, 0x7f], 'le')
ipaddr.fromBuffer(new Buffer('7f000001', 'hex'))
ipaddr.fromNumber(0x7f000001)
```
