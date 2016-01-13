var assert = require('assert')
var ipaddr = require('../')

describe('.fromNumber()', function () {
  it('should convert', function () {
    assert.equal(ipaddr.fromNumber(0x7f000001).toString(), '127.0.0.1')
  })
  it('should fail on negative', function () {
    assert.throws(function () {
      ipaddr.fromNumber(-1)
    })
  })
  it('should fail on non-32bit number', function () {
    assert.throws(function () {
      ipaddr.fromNumber(0xffffffffff)
    })
  })
})

describe('IPv4.toNumber()', function () {
  it('should convert', function () {
    assert.equal(ipaddr.parse('127.0.0.1').toNumber(), 0x7f000001)
  })
})

describe('IPv4.toArray()', function () {
  it('should convert MSB', function () {
    assert.deepEqual(ipaddr.parse('127.0.0.1').toArray('be'), [ 0x7f, 0, 0, 1 ])
  })
  it('should default to MSB', function () {
    assert.deepEqual(ipaddr.parse('127.0.0.1').toArray(), [ 0x7f, 0, 0, 1 ])
  })
  it('should convert LSB', function () {
    assert.deepEqual(ipaddr.parse('127.0.0.1').toArray('le'), [ 1, 0, 0, 0x7f ])
  })
})

describe('IPv4.toBuffer()', function () {
  it('should convert MSB', function () {
    assert.equal(ipaddr.parse('127.0.0.1').toBuffer('be').toString('hex'), '7f000001')
  })
  it('should default to MSB', function () {
    assert.equal(ipaddr.parse('127.0.0.1').toBuffer().toString('hex'), '7f000001')
  })
  it('should convert LSB', function () {
    assert.equal(ipaddr.parse('127.0.0.1').toBuffer('le').toString('hex'), '0100007f')
  })
})

describe('IPv6.toArray()', function () {
  it('should convert MSB', function () {
    assert.deepEqual(ipaddr.parse('2001:42:1::1').toArray('be'), [ 0x20, 1, 0, 0x42, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ])
  })
  it('should default to MSB', function () {
    assert.deepEqual(ipaddr.parse('2001:42:1::1').toArray(), [ 0x20, 1, 0, 0x42, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ])
  })
  it('should convert LSB', function () {
    assert.deepEqual(ipaddr.parse('2001:42:1::1').toArray('le'), [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0x42, 0, 1, 0x20 ])
  })
})

describe('IPv6.toBuffer()', function () {
  it('should convert MSB', function () {
    assert.equal(ipaddr.parse('2001:42:1::1').toBuffer('be').toString('hex'), '20010042000100000000000000000001')
  })
  it('should default to MSB', function () {
    assert.equal(ipaddr.parse('2001:42:1::1').toBuffer().toString('hex'), '20010042000100000000000000000001')
  })
  it('should convert LSB', function () {
    assert.equal(ipaddr.parse('2001:42:1::1').toBuffer('le').toString('hex'), '01000000000000000000010042000120')
  })
})

describe('.fromArray()', function () {
  it('should parse IPv4 in MSB', function () {
    assert.equal(ipaddr.fromArray([ 0x7f, 0, 0, 1 ], 'be').toString(), '127.0.0.1')
  })
  it('should parse IPv4 (default to MSB)', function () {
    assert.equal(ipaddr.fromArray([ 0x7f, 0, 0, 1 ]).toString(), '127.0.0.1')
  })
  it('should parse IPv4 in LSB', function () {
    assert.equal(ipaddr.fromArray([ 1, 0, 0, 0x7f ], 'le').toString(), '127.0.0.1')
  })
  it('should parse IPv6 in MSB', function () {
    assert.equal(ipaddr.fromArray([ 0x20, 1, 0, 0x42, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], 'be').toString(), '2001:42:1::1')
  })
  it('should parse IPv6 (default to MSB)', function () {
    assert.equal(ipaddr.fromArray([ 0x20, 1, 0, 0x42, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ]).toString(), '2001:42:1::1')
  })
  it('should parse IPv6 in LSB', function () {
    assert.equal(ipaddr.fromArray([ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0x42, 0, 1, 0x20 ], 'le').toString(), '2001:42:1::1')
  })
})

describe('.fromBuffer()', function () {
  it('should parse IPv4 in MSB', function () {
    assert.equal(ipaddr.fromBuffer(new Buffer([ 0x7f, 0, 0, 1 ]), 'be').toString(), '127.0.0.1')
  })
  it('should parse IPv4 (default to MSB)', function () {
    assert.equal(ipaddr.fromBuffer(new Buffer([ 0x7f, 0, 0, 1 ])).toString(), '127.0.0.1')
  })
  it('should parse IPv4 in LSB', function () {
    assert.equal(ipaddr.fromBuffer(new Buffer([ 1, 0, 0, 0x7f ]), 'le').toString(), '127.0.0.1')
  })
  it('should parse IPv6 in MSB', function () {
    assert.equal(ipaddr.fromBuffer(new Buffer([ 0x20, 1, 0, 0x42, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ]), 'be').toString(), '2001:42:1::1')
  })
  it('should parse IPv6 (default to MSB)', function () {
    assert.equal(ipaddr.fromBuffer(new Buffer([ 0x20, 1, 0, 0x42, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ])).toString(), '2001:42:1::1')
  })
  it('should parse IPv6 in LSB', function () {
    assert.equal(ipaddr.fromBuffer(new Buffer([ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0x42, 0, 1, 0x20 ]), 'le').toString(), '2001:42:1::1')
  })
})

describe('.tryParse()', function () {
  it('should accept number', function () {
    assert.equal(ipaddr.tryParse(0x7f000001).toString(), '127.0.0.1')
  })
  it('should accept IPv4 string', function () {
    assert.equal(ipaddr.tryParse('127.0.0.1').toString(), '127.0.0.1')
  })
  it('should accept IPv6 string', function () {
    assert.equal(ipaddr.tryParse('2001:42:1::1').toString(), '2001:42:1::1')
  })
  it('should accept IPv4 array', function () {
    assert.equal(ipaddr.tryParse([ 0x7f, 0, 0, 1 ]).toString(), '127.0.0.1')
  })
  it('should accept IPv6 array', function () {
    assert.equal(ipaddr.tryParse([ 0x20, 1, 0, 0x42, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ]).toString(), '2001:42:1::1')
  })
  it('should accept IPv6 array', function () {
    assert.equal(ipaddr.tryParse([ 0x2001, 0x42, 1, 0, 0, 0, 0, 1 ]).toString(), '2001:42:1::1')
  })
})
