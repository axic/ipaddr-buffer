var ipaddr = require('ipaddr.js')
var assert = require('assert')

ipaddr.fromBuffer = function (data, endian) {
  return this.fromArray(data, endian)
}

ipaddr.fromArray = function (data, endian) {
  assert(data.length === 4 || data.length === 16)
  if (endian === 'le') {
    data = data.slice(0).reverse()
  }
  return this.fromByteArray(data)
}

ipaddr.tryParse = function (data, endian) {
  var type = typeof (data)
  if (type === 'number') {
    assert(endian === undefined)
    return this.fromNumber(data)
  } else if (type === 'string') {
    assert(endian === undefined)
    return this.parse(data)
  } else {
    // handle special case of eight 16-bit parts for IPv6
    if (data.length == 8) {
      assert(endian === undefined)
      return new this.IPv6(data)
    }
    return this.fromArray(data, endian)
  }
}

ipaddr.fromNumber = function (num) {
  assert(num >= 0 && num <= 0xffffffff)
  // always in 'be'
  return new this.IPv4([
    (num >> 24) & 0xff,
    (num >> 16) & 0xff,
    (num >> 8) & 0xff,
    num & 0xff
  ])
}

ipaddr.IPv4.prototype.toNumber = function () {
  return (this.octets[0] << 24) |
    (this.octets[1] << 16) |
    (this.octets[2] << 8) |
    this.octets[3]
}

ipaddr.IPv4.prototype.toArray = function (endian) {
  if (endian === 'le') {
    return this.toByteArray().reverse()
  } else {
    return this.toByteArray()
  }
}

ipaddr.IPv4.prototype.toBuffer = function (endian) {
  return new Buffer(this.toArray(endian))
}

ipaddr.IPv6.prototype.toArray = function (endian) {
  if (endian === 'le') {
    return this.toByteArray().reverse()
  } else {
    return this.toByteArray()
  }
}

ipaddr.IPv6.prototype.toBuffer = function (endian) {
  return new Buffer(this.toArray(endian))
}

// This is merged into upstream, but not released yet
if (ipaddr.fromByteArray === undefined) {
  ipaddr.fromByteArray = function (bytes) {
    var length = bytes.length
    if (length === 4) {
      return new ipaddr.IPv4(bytes)
    } else if (length === 16) {
      var tmp = []
      for (var i = 0; i <= 14; i += 2) {
        tmp.push((bytes[i] << 8) | bytes[i + 1])
      }
      return new ipaddr.IPv6(tmp)
    } else {
      throw new Error('ipaddr: the binary input is neither an IPv6 nor IPv4 address')
    }
  }
}

module.exports = ipaddr
