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
- `fromNumber(number)` [IPv4 only]
- `<addr>.toNumber()` [IPv4 only]
- `tryParse(data, [endianness])`

All `Array` and `Buffer` methods accept an optional endianness parameter, either
`be` (MSB, default, also called *network byte order*) or `le` (LSB).

The `tryParse` method is a bit trickier as it will try to decide what is the input and
parse appropriately. It should support input in the format of `Number`, `String`,
`Array` and `Buffer`. It defaults to considering the input an Array-compatible type.

Examples:

```js
var ipaddr = require('ipaddr-buffer')

// return an ipaddr object
ipaddr.fromArray([0x7f, 0, 0, 1]) // defaults to 'be' (MSB, network byteorder)
ipaddr.fromArray([1, 0, 0, 0x7f], 'le')
ipaddr.fromBuffer(new Buffer('7f000001', 'hex'))
ipaddr.fromNumber(0x7f000001)
ipaddr.tryParse('127.0.0.1')
ipaddr.tryParse(0x7f000001)
```
