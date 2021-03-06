!(function(t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define(e)
    : (t.WebAssembly = t.WebAssembly || e())
})(this, function() {
  'use strict'
  function t() {
    throw new Error(
      'Dynamic requires are not currently supported by rollup-plugin-commonjs'
    )
  }
  function e(t) {
    ;(this.message = t || ''),
      Error.captureStackTrace && Error.captureStackTrace(this, e)
  }
  function n(t) {
    ;(this.message = t || ''),
      Error.captureStackTrace && Error.captureStackTrace(this, n)
  }
  function r(t) {
    ;(this.message = t || ''),
      Error.captureStackTrace && Error.captureStackTrace(this, r)
  }
  function a(t) {
    'object' == typeof t && t._wasmBitPattern
      ? Gn.setInt32(0, t._wasmBitPattern, !0)
      : Gn.setFloat32(0, t, !0)
  }
  function i() {
    var t = Gn.getFloat32(0, !0)
    return (
      !Zn &&
        isNaN(t) &&
        ((t = new Number(t)), (t._wasmBitPattern = Gn.getInt32(0, !0))),
      t
    )
  }
  function s(t) {
    'object' == typeof t && t._wasmBitPattern
      ? (Gn.setInt32(0, t._wasmBitPattern.low, !0),
        Gn.setInt32(4, t._wasmBitPattern.high, !0))
      : Gn.setFloat64(0, t, !0)
  }
  function u(t) {
    var e = Gn.getFloat64(0, !0)
    return (
      !Xn &&
        isNaN(e) &&
        ((e = new Number(e)),
        (e._wasmBitPattern = new En(Gn.getInt32(0, !0), Gn.getInt32(4, !0)))),
      e
    )
  }
  function o(t, e) {
    if (((e = e || TypeError), void 0 === t)) throw new e()
  }
  function c(t, e, n) {
    if (((n = n || TypeError), !(t instanceof e))) throw new n()
  }
  function l(t, e, n) {
    if (((n = n || TypeError), typeof t !== e)) throw new n()
  }
  function p(t, e) {
    if (((e = e || TypeError), 'function' != typeof t)) throw new e()
  }
  function f(t, e, n) {
    if (((n = n || TypeError), void 0 === t)) return 0
    if ('number' != typeof t && !(t instanceof Number))
      throw new n('cant pass non-number in to WASM')
    switch (e) {
      case Cn.I32:
        return 0 | t
      case Cn.I64:
        return En.fromNumber(t)
      case Cn.F32:
        return Bn.ToF32(t)
      case Cn.F64:
        return +t
      default:
        throw new n('Unknown type: ' + e)
    }
  }
  function h(t, e) {
    switch (e) {
      case Cn.I32:
      case Cn.F32:
      case Cn.F64:
        return t
      case Cn.I64:
        return t.toNumber()
      default:
        throw new TypeError('unknown WASM type: ' + e)
    }
  }
  function d(t) {
    return t >>> 0
  }
  function _(t) {
    if ('number' == typeof t || ('object' == typeof t && t instanceof Number)) {
      if (isNaN(t)) {
        if ('object' == typeof t)
          return 'WebAssembly._toBoxedNaN(' + _(t._wasmBitPattern) + ')'
        qn.setFloat64(0, t, !0)
        return (
          'WebAssembly._toBoxedNaN(new Long(' +
          qn.getInt32(0, !0) +
          ', ' +
          qn.getInt32(4, !0) +
          '))'
        )
      }
      return (t < 0 || 1 / t < 0 ? '-' : '') + Math.abs(t)
    }
    if (t instanceof En) return 'new Long(' + t.low + ',' + t.high + ')'
    if ('string' == typeof t) {
      for (var n = "'", r = 0; r < t.length; r++) {
        var a = t.charCodeAt(r)
        if (a > 39 && a < 127 && 92 !== a) n += t.charAt(r)
        else {
          for (var i = a.toString(16); i.length < 4; ) i = '0' + i
          n += '\\u' + i
        }
      }
      return (n += "'")
    }
    throw new e('rendering unknown type of value: ' + typeof t + ' : ' + t)
  }
  function m(t) {
    if ('number' == typeof t) {
      qn.setInt32(0, t, !0)
      var e = qn.getFloat32(0, !0)
      if (Zn) return e
    } else {
      qn.setInt32(0, t.low, !0), qn.setInt32(4, t.high, !0)
      var e = qn.getFloat64(0, !0)
      if (Xn) return e
    }
    return (e = new Number(e)), (e._wasmBitPattern = t), e
  }
  function w(t) {
    function n(t) {
      switch (t) {
        case Cn.I32:
          return 'i'
        case Cn.I64:
          return 'l'
        case Cn.F32:
          return 'f'
        case Cn.F64:
          return 'd'
        default:
          throw new e('unexpected type: ' + t)
      }
    }
    var r = []
    return (
      t.param_types.forEach(function(t) {
        r.push(n(t))
      }),
      r.push('_'),
      t.return_types.forEach(function(t) {
        r.push(n(t))
      }),
      r.join('')
    )
  }
  function k() {
    if (
      ('undefined' == typeof process || !process.stderr) &&
      'undefined' != typeof console
    )
      return console.log.apply(console, arguments)
    for (var t = 0; t < arguments.length; t++) {
      var e = arguments[t]
      'string' == typeof e
        ? process.stderr.write(e)
        : 'number' == typeof e || e instanceof Number
        ? process.stderr.write(_(e))
        : process.stderr.write(JSON.stringify(e)),
        process.stderr.write(' ')
    }
    process.stderr.write('\n')
  }
  function g() {
    if (Wn) return Wn
    for (var t = new Error().stack.split('\n'), e = 0; e < t.length; e++) {
      var n = /(at .+ \(|at |@)(.+\/.+\.js):/.exec(t[e])
      if (n) return (Wn = n[2])
    }
    throw new r('could not determine script filename')
  }
  function b(t, e, n) {
    ;(t.prototype = Object.create(e.prototype)),
      n &&
        Object.keys(n).forEach(function(e) {
          t.prototype[e] = n[e]
        })
  }
  function I(t) {
    var n = t.read_varint7()
    if (n >= 0 || (n < Cn.F64 && n !== Cn.NONE))
      throw new e('Invalid block_type: ' + n)
    return n
  }
  function y(t, n, r) {
    function a(t, n) {
      switch ((n = n || r.getLocalTypeByIndex(t))) {
        case Cn.I32:
          return 'li' + t
        case Cn.I64:
          return 'll' + t
        case Cn.F32:
          return 'lf' + t
        case Cn.F64:
          return 'ld' + t
        default:
          throw new e('unexpected type of local')
      }
    }
    var i = r.sig.return_types.length > 0 ? r.sig.return_types[0] : Cn.NONE,
      s = new Ne(i)
    ;(r.cfStack = new D()),
      r.cfStack.push(s),
      (r.getLocalTypeByIndex = function(t) {
        var n = r.sig.param_types.length
        if (t < n) return r.sig.param_types[t]
        for (var a = 0; a < r.locals.length; ) {
          if ((n += r.locals[a].count) > t) return r.locals[a].type
          a++
        }
        throw new e('local index too large: ' + t)
      })
    t: for (;;) {
      var u = t.read_byte()
      switch (u) {
        case Ln.UNREACHABLE:
          r.cfStack.addTerminalStatement(new Se())
          break
        case Ln.NOP:
          break
        case Ln.BLOCK:
          var o = I(t)
          r.cfStack.push(new Ee(o))
          break
        case Ln.LOOP:
          var o = I(t)
          r.cfStack.push(new Fe(o))
          break
        case Ln.IF:
          var o = I(t),
            c = r.cfStack.popValue(Cn.I32)
          r.cfStack.push(new xe(o, c))
          break
        case Ln.ELSE:
          r.cfStack.peek().switchToElseBranch()
          break
        case Ln.END:
          var l = r.cfStack.pop()
          if (0 === l.index) break t
          break
        case Ln.BR:
          var p = t.read_varuint32(),
            l = r.cfStack.getBranchTarget(p)
          if (l.branchResultType === Cn.NONE)
            r.cfStack.addTerminalStatement(new pe(l))
          else {
            var f = r.cfStack.popValue(l.branchResultType)
            r.cfStack.addTerminalStatement(new pe(l, f))
          }
          break
        case Ln.BR_IF:
          var p = t.read_varuint32(),
            l = r.cfStack.getBranchTarget(p),
            c = r.cfStack.popValue(Cn.I32)
          if (l.branchResultType === Cn.NONE)
            r.cfStack.addStatement(new fe(c, l))
          else {
            r.cfStack.spillValueIfComposite()
            var f = r.cfStack.peekValue(l.branchResultType)
            r.cfStack.addStatement(new fe(c, l, f))
          }
          break
        case Ln.BR_TABLE:
          for (var h = t.read_varuint32(), d = []; h > 0; ) {
            var p = t.read_varuint32()
            d.push(r.cfStack.getBranchTarget(p)), h--
          }
          var p = t.read_varuint32(),
            _ = r.cfStack.getBranchTarget(p)
          d.forEach(function(t) {
            if (t.branchResultType !== _.branchResultType)
              throw new e('br_table result type mis-match')
          })
          var m = r.cfStack.popValue(Cn.I32)
          if (_.branchResultType === Cn.NONE)
            r.cfStack.addTerminalStatement(new he(m, _, d))
          else {
            var f = r.cfStack.popValue(_.branchResultType)
            r.cfStack.addTerminalStatement(new he(m, _, d, f))
          }
          break
        case Ln.RETURN:
          var l = r.cfStack.peekBottom()
          if (l.branchResultType === Cn.NONE)
            r.cfStack.addTerminalStatement(new pe(l))
          else {
            var f = r.cfStack.popValue(l.branchResultType)
            r.cfStack.addTerminalStatement(new pe(l, f))
          }
          break
        case Ln.CALL:
          for (
            var w = t.read_varuint32(),
              k = n.getFunctionTypeSignatureByIndex(w),
              g = new Array(k.param_types.length),
              b = k.param_types.length - 1;
            b >= 0;
            b--
          )
            g[b] = r.cfStack.popValue(k.param_types[b])
          r.cfStack.spillAllValues(),
            r.cfStack.finalizeTrapConditions(),
            0 === k.return_types.length
              ? r.cfStack.addStatement(new le(new Et(k, w, g)))
              : (r.cfStack.pushValue(new Et(k, w, g)), r.cfStack.spillValue())
          break
        case Ln.CALL_INDIRECT:
          var y = t.read_varuint32(),
            G = t.read_varuint1()
          n.getTableTypeByIndex(G)
          for (
            var k = n.getTypeSignatureByIndex(y),
              P = r.cfStack.popValue(Cn.I32),
              g = new Array(k.param_types.length),
              b = k.param_types.length - 1;
            b >= 0;
            b--
          )
            g[b] = r.cfStack.popValue(k.param_types[b])
          r.cfStack.spillAllValues(),
            r.cfStack.finalizeTrapConditions(),
            0 === k.return_types.length
              ? r.cfStack.addStatement(new le(new xt(k, P, g)))
              : (r.cfStack.pushValue(new xt(k, P, g)), r.cfStack.spillValue())
          break
        case Ln.DROP:
          var m = r.cfStack.popValue(Cn.UNKNOWN)
          r.cfStack.addStatement(new le(m))
          break
        case Ln.SELECT:
          var c = r.cfStack.popValue(Cn.I32),
            H = r.cfStack.peekType(),
            j = r.cfStack.popValue(H),
            W = r.cfStack.popValue(H)
          r.cfStack.pushValue(new Ft(c, W, j))
          break
        case Ln.GET_LOCAL:
          var w = t.read_varuint32()
          r.cfStack.pushValue(new z(r.getLocalTypeByIndex(w), w))
          break
        case Ln.SET_LOCAL:
          var w = t.read_varuint32(),
            H = r.getLocalTypeByIndex(w),
            m = r.cfStack.popValue(H)
          r.cfStack.spillAllValues(), r.cfStack.addStatement(new me(H, w, m))
          break
        case Ln.TEE_LOCAL:
          var w = t.read_varuint32(),
            H = r.getLocalTypeByIndex(w),
            m = r.cfStack.popValue(H)
          r.cfStack.spillAllValues(),
            r.cfStack.addStatement(new me(H, w, m)),
            r.cfStack.pushValue(new z(H, w))
          break
        case Ln.GET_GLOBAL:
          var w = t.read_varuint32(),
            H = n.getGlobalTypeByIndex(w)
          r.cfStack.pushValue(new q(H, w))
          break
        case Ln.SET_GLOBAL:
          var w = t.read_varuint32()
          if (!n.getGlobalMutabilityByIndex(w))
            throw new e('global is immutable: ' + w)
          var H = n.getGlobalTypeByIndex(w),
            m = r.cfStack.popValue(H)
          r.cfStack.spillAllValues(), r.cfStack.addStatement(new we(H, w, m))
          break
        case Ln.I32_LOAD:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32()
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 4), r.cfStack.pushValue(new K(st, it, J))
          break
        case Ln.I64_LOAD:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32()
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 8),
            3 === J && (J = 2),
            r.cfStack.pushValue(new K(st, it, J)),
            r.cfStack.pushValue(new K(st, it + 4, J)),
            r.cfStack.pushValue(
              new jt(r.cfStack.popValue(Cn.I32), r.cfStack.popValue(Cn.I32))
            )
          break
        case Ln.F32_LOAD:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32()
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 4), r.cfStack.pushValue(new $(st, it, J))
          break
        case Ln.F64_LOAD:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32()
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 8), r.cfStack.pushValue(new tt(st, it, J))
          break
        case Ln.I32_LOAD8_S:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32()
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 1), r.cfStack.pushValue(new et(st, it, J))
          break
        case Ln.I32_LOAD8_U:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32()
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 1), r.cfStack.pushValue(new nt(st, it, J))
          break
        case Ln.I32_LOAD16_S:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32()
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 2), r.cfStack.pushValue(new rt(st, it, J))
          break
        case Ln.I32_LOAD16_U:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32()
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 2), r.cfStack.pushValue(new at(st, it, J))
          break
        case Ln.I64_LOAD8_S:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32()
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 1),
            r.cfStack.pushValue(new et(st, it, J)),
            r.cfStack.pushValue(new Pt(r.cfStack.popValue(Cn.I32)))
          break
        case Ln.I64_LOAD8_U:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32()
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 1),
            r.cfStack.pushValue(new nt(st, it, J)),
            r.cfStack.pushValue(new Ht(r.cfStack.popValue(Cn.I32)))
          break
        case Ln.I64_LOAD16_S:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32()
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 2),
            r.cfStack.pushValue(new rt(st, it, J)),
            r.cfStack.pushValue(new Pt(r.cfStack.popValue(Cn.I32)))
          break
        case Ln.I64_LOAD16_U:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32()
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 2),
            r.cfStack.pushValue(new at(st, it, J)),
            r.cfStack.pushValue(new Ht(r.cfStack.popValue(Cn.I32)))
          break
        case Ln.I64_LOAD32_S:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32()
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 4),
            r.cfStack.pushValue(new K(st, it, J)),
            r.cfStack.pushValue(new Pt(r.cfStack.popValue(Cn.I32)))
          break
        case Ln.I64_LOAD32_U:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32()
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 4),
            r.cfStack.pushValue(new K(st, it, J)),
            r.cfStack.pushValue(new Ht(r.cfStack.popValue(Cn.I32)))
          break
        case Ln.I32_STORE:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32(),
            ot = r.cfStack.popValue(Cn.I32)
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 4),
            r.cfStack.spillAllValues(),
            r.cfStack.finalizeTrapConditions(),
            r.cfStack.addStatement(new ge(ot, st, it, J))
          break
        case Ln.I64_STORE:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32()
          r.cfStack.spillValueIfComposite()
          var ot = r.cfStack.popValue(Cn.I64)
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 8),
            r.cfStack.spillAllValues(),
            r.cfStack.finalizeTrapConditions(),
            3 === J && (J = 2),
            r.cfStack.peek().statements.push(new ge(new At(ot), st, it, J)),
            r.cfStack.addStatement(new ge(new Ut(ot), st, it + 4, J))
          break
        case Ln.F32_STORE:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32(),
            ot = r.cfStack.popValue(Cn.F32)
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 4),
            r.cfStack.spillAllValues(),
            r.cfStack.finalizeTrapConditions(),
            r.cfStack.addStatement(new be(ot, st, it, J))
          break
        case Ln.F64_STORE:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32(),
            ot = r.cfStack.popValue(Cn.F64)
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 8),
            r.cfStack.spillAllValues(),
            r.cfStack.finalizeTrapConditions(),
            r.cfStack.addStatement(new Ie(ot, st, it, J))
          break
        case Ln.I32_STORE8:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32(),
            ot = r.cfStack.popValue(Cn.I32)
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 1),
            r.cfStack.spillAllValues(),
            r.cfStack.finalizeTrapConditions(),
            r.cfStack.addStatement(new ye(ot, st, it, J))
          break
        case Ln.I32_STORE16:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32(),
            ot = r.cfStack.popValue(Cn.I32)
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 2),
            r.cfStack.spillAllValues(),
            r.cfStack.finalizeTrapConditions(),
            r.cfStack.addStatement(new ve(ot, st, it, J))
          break
        case Ln.I64_STORE8:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32(),
            ot = r.cfStack.popValue(Cn.I64)
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 1),
            r.cfStack.spillAllValues(),
            r.cfStack.finalizeTrapConditions(),
            (ot = new At(ot)),
            r.cfStack.addStatement(new ye(ot, st, it, J))
          break
        case Ln.I64_STORE16:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32(),
            ot = r.cfStack.popValue(Cn.I64)
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 2),
            r.cfStack.spillAllValues(),
            r.cfStack.finalizeTrapConditions(),
            (ot = new At(ot)),
            r.cfStack.addStatement(new ve(ot, st, it, J))
          break
        case Ln.I64_STORE32:
          n.getMemoryTypeByIndex(0)
          var J = t.read_varuint32(),
            it = t.read_varuint32(),
            ot = r.cfStack.popValue(Cn.I64)
          r.cfStack.spillValueIfComposite()
          var st = r.cfStack.popValue(Cn.I32)
          M(r, st, it, 4),
            r.cfStack.spillAllValues(),
            r.cfStack.finalizeTrapConditions(),
            (ot = new At(ot)),
            r.cfStack.addStatement(new ge(ot, st, it, J))
          break
        case Ln.CURRENT_MEMORY:
          var w = t.read_varuint1()
          n.getMemoryTypeByIndex(w), r.cfStack.pushValue(new Ot(w))
          break
        case Ln.GROW_MEMORY:
          r.cfStack.finalizeTrapConditions()
          var w = t.read_varuint1()
          n.getMemoryTypeByIndex(w)
          var m = r.cfStack.popValue(Cn.I32)
          r.cfStack.pushValue(new Rt(w, m)), r.cfStack.spillValue()
          break
        case Ln.I32_CONST:
          var lt = t.read_varint32()
          r.cfStack.pushValue(new X(lt))
          break
        case Ln.I64_CONST:
          var lt = t.read_varint64()
          r.cfStack.pushValue(new Z(lt))
          break
        case Ln.F32_CONST:
          var lt = t.read_float32()
          r.cfStack.pushValue(new Y(lt))
          break
        case Ln.F64_CONST:
          var lt = t.read_float64()
          r.cfStack.pushValue(new Q(lt))
          break
        case Ln.I32_EQZ:
          var m = r.cfStack.popValue(Cn.I32)
          r.cfStack.pushValue(new ut(m))
          break
        case Ln.I32_EQ:
          S(r, '==')
          break
        case Ln.I32_NE:
          S(r, '!=')
          break
        case Ln.I32_LT_S:
          S(r, '<')
          break
        case Ln.I32_LT_U:
          T(r, '<')
          break
        case Ln.I32_GT_S:
          S(r, '>')
          break
        case Ln.I32_GT_U:
          T(r, '>')
          break
        case Ln.I32_LE_S:
          S(r, '<=')
          break
        case Ln.I32_LE_U:
          T(r, '<=')
          break
        case Ln.I32_GE_S:
          S(r, '>=')
          break
        case Ln.I32_GE_U:
          T(r, '>=')
          break
        case Ln.I64_EQZ:
          var m = r.cfStack.popValue(Cn.I64)
          r.cfStack.pushValue(new ft(m))
          break
        case Ln.I64_EQ:
          E(r, 'i64_eq')
          break
        case Ln.I64_NE:
          E(r, 'i64_ne')
          break
        case Ln.I64_LT_S:
          E(r, 'i64_lt_s')
          break
        case Ln.I64_LT_U:
          E(r, 'i64_lt_u')
          break
        case Ln.I64_GT_S:
          E(r, 'i64_gt_s')
          break
        case Ln.I64_GT_U:
          E(r, 'i64_gt_u')
          break
        case Ln.I64_LE_S:
          E(r, 'i64_le_s')
          break
        case Ln.I64_LE_U:
          E(r, 'i64_le_u')
          break
        case Ln.I64_GE_S:
          E(r, 'i64_ge_s')
          break
        case Ln.I64_GE_U:
          E(r, 'i64_ge_u')
          break
        case Ln.F32_EQ:
          x(r, '==')
          break
        case Ln.F32_NE:
          x(r, '!=')
          break
        case Ln.F32_LT:
          x(r, '<')
          break
        case Ln.F32_GT:
          x(r, '>')
          break
        case Ln.F32_LE:
          x(r, '<=')
          break
        case Ln.F32_GE:
          x(r, '>=')
          break
        case Ln.F64_EQ:
          A(r, '==')
          break
        case Ln.F64_NE:
          A(r, '!=')
          break
        case Ln.F64_LT:
          A(r, '<')
          break
        case Ln.F64_GT:
          A(r, '>')
          break
        case Ln.F64_LE:
          A(r, '<=')
          break
        case Ln.F64_GE:
          A(r, '>=')
          break
        case Ln.I32_CLZ:
          v(r, 'i32_clz')
          break
        case Ln.I32_CTZ:
          v(r, 'i32_ctz')
          break
        case Ln.I32_POPCNT:
          v(r, 'i32_popcnt')
          break
        case Ln.I32_ADD:
          S(r, '+')
          break
        case Ln.I32_SUB:
          S(r, '-')
          break
        case Ln.I32_MUL:
          V(r, 'i32_mul')
          break
        case Ln.I32_DIV_S:
          var pt = r.cfStack.popValue(Cn.I32),
            ht = r.cfStack.spillValueIfComposite()
          r.cfStack.pushValue(pt),
            (pt = r.cfStack.spillValueIfComposite()),
            r.cfStack.addTrapCondition(new ut(pt)),
            r.cfStack.addTrapCondition(
              new ct(
                '&',
                new ct('==', ht, new X(Bn.INT32_MIN)),
                new ct('==', pt, new X(-1))
              )
            ),
            S(r, '/')
          break
        case Ln.I32_DIV_U:
          var pt = r.cfStack.spillValueIfComposite()
          r.cfStack.addTrapCondition(new ut(pt)), T(r, '/')
          break
        case Ln.I32_REM_S:
          var pt = r.cfStack.spillValueIfComposite()
          r.cfStack.addTrapCondition(new ut(pt)), S(r, '%')
          break
        case Ln.I32_REM_U:
          var pt = r.cfStack.spillValueIfComposite()
          r.cfStack.addTrapCondition(new ut(pt)), T(r, '%')
          break
        case Ln.I32_AND:
          S(r, '&')
          break
        case Ln.I32_OR:
          S(r, '|')
          break
        case Ln.I32_XOR:
          S(r, '^')
          break
        case Ln.I32_SHL:
          S(r, '<<')
          break
        case Ln.I32_SHR_S:
          S(r, '>>')
          break
        case Ln.I32_SHR_U:
          S(r, '>>>')
          break
        case Ln.I32_ROTL:
          V(r, 'i32_rotl')
          break
        case Ln.I32_ROTR:
          V(r, 'i32_rotr')
          break
        case Ln.I64_CLZ:
          N(r, 'i64_clz')
          break
        case Ln.I64_CTZ:
          N(r, 'i64_ctz')
          break
        case Ln.I64_POPCNT:
          N(r, 'i64_popcnt')
          break
        case Ln.I64_ADD:
          F(r, 'i64_add')
          break
        case Ln.I64_SUB:
          F(r, 'i64_sub')
          break
        case Ln.I64_MUL:
          F(r, 'i64_mul')
          break
        case Ln.I64_DIV_S:
          var pt = r.cfStack.popValue(Cn.I64),
            ht = r.cfStack.spillValueIfComposite()
          r.cfStack.pushValue(pt),
            (pt = r.cfStack.spillValueIfComposite()),
            r.cfStack.addTrapCondition(new ft(pt)),
            r.cfStack.addTrapCondition(
              new ct(
                '&',
                new _t('i64_eq', ht, new Z(En.MIN_VALUE)),
                new _t('i64_eq', pt, new Z(En.NEG_ONE))
              )
            ),
            F(r, 'i64_div_s')
          break
        case Ln.I64_DIV_U:
          var pt = r.cfStack.spillValueIfComposite()
          r.cfStack.addTrapCondition(new ft(pt)), F(r, 'i64_div_u')
          break
        case Ln.I64_REM_S:
          var pt = r.cfStack.spillValueIfComposite()
          r.cfStack.addTrapCondition(new ft(pt)), F(r, 'i64_rem_s')
          break
        case Ln.I64_REM_U:
          var pt = r.cfStack.spillValueIfComposite()
          r.cfStack.addTrapCondition(new ft(pt)), F(r, 'i64_rem_u')
          break
        case Ln.I64_AND:
          F(r, 'i64_and')
          break
        case Ln.I64_OR:
          F(r, 'i64_or')
          break
        case Ln.I64_XOR:
          F(r, 'i64_xor')
          break
        case Ln.I64_SHL:
          F(r, 'i64_shl')
          break
        case Ln.I64_SHR_S:
          F(r, 'i64_shr_s')
          break
        case Ln.I64_SHR_U:
          F(r, 'i64_shr_u')
          break
        case Ln.I64_ROTL:
          F(r, 'i64_rotl')
          break
        case Ln.I64_ROTR:
          F(r, 'i64_rotr')
          break
        case Ln.F32_ABS:
          C(r, 'f32_abs')
          break
        case Ln.F32_NEG:
          C(r, 'f32_neg')
          break
        case Ln.F32_CEIL:
          C(r, 'f32_ceil')
          break
        case Ln.F32_FLOOR:
          C(r, 'f32_floor')
          break
        case Ln.F32_TRUNC:
          C(r, 'f32_trunc')
          break
        case Ln.F32_NEAREST:
          C(r, 'f32_nearest')
          break
        case Ln.F32_SQRT:
          C(r, 'f32_sqrt')
          break
        case Ln.F32_ADD:
          O(r, '+')
          break
        case Ln.F32_SUB:
          O(r, '-')
          break
        case Ln.F32_MUL:
          O(r, '*')
          break
        case Ln.F32_DIV:
          O(r, '/')
          break
        case Ln.F32_MIN:
          R(r, 'f32_min')
          break
        case Ln.F32_MAX:
          R(r, 'f32_max')
          break
        case Ln.F32_COPYSIGN:
          R(r, 'f32_copysign')
          break
        case Ln.F64_ABS:
          U(r, 'f64_abs')
          break
        case Ln.F64_NEG:
          U(r, 'f64_neg')
          break
        case Ln.F64_CEIL:
          U(r, 'f64_ceil')
          break
        case Ln.F64_FLOOR:
          U(r, 'f64_floor')
          break
        case Ln.F64_TRUNC:
          U(r, 'f64_trunc')
          break
        case Ln.F64_NEAREST:
          U(r, 'f64_nearest')
          break
        case Ln.F64_SQRT:
          U(r, 'f64_sqrt')
          break
        case Ln.F64_ADD:
          L(r, '+')
          break
        case Ln.F64_SUB:
          L(r, '-')
          break
        case Ln.F64_MUL:
          L(r, '*')
          break
        case Ln.F64_DIV:
          L(r, '/')
          break
        case Ln.F64_MIN:
          B(r, 'f64_min')
          break
        case Ln.F64_MAX:
          B(r, 'f64_max')
          break
        case Ln.F64_COPYSIGN:
          B(r, 'f64_copysign')
          break
        case Ln.I32_WRAP_I64:
          var dt = r.cfStack.popValue(Cn.I64)
          r.cfStack.pushValue(new At(dt))
          break
        case Ln.I32_TRUNC_S_F32:
          r.cfStack.spillValueIfComposite()
          var dt = r.cfStack.popValue(Cn.F32)
          r.cfStack.addTrapCondition(new gt('>=', dt, new Y(Bn.INT32_MAX))),
            r.cfStack.addTrapCondition(new gt('<', dt, new Y(Bn.INT32_MIN))),
            r.cfStack.addTrapCondition(new wt(dt)),
            r.cfStack.pushValue(new Lt(dt))
          break
        case Ln.I32_TRUNC_S_F64:
          r.cfStack.spillValueIfComposite()
          var dt = r.cfStack.popValue(Cn.F64)
          r.cfStack.addTrapCondition(new Tt('>', dt, new Y(Bn.INT32_MAX))),
            r.cfStack.addTrapCondition(new Tt('<', dt, new Y(Bn.INT32_MIN))),
            r.cfStack.addTrapCondition(new vt(dt)),
            r.cfStack.pushValue(new Bt(dt))
          break
        case Ln.I32_TRUNC_U_F32:
          r.cfStack.spillValueIfComposite()
          var dt = r.cfStack.popValue(Cn.F32)
          r.cfStack.addTrapCondition(new gt('>=', dt, new Y(Bn.UINT32_MAX))),
            r.cfStack.addTrapCondition(new gt('<=', dt, new Y(-1))),
            r.cfStack.addTrapCondition(new wt(dt)),
            r.cfStack.pushValue(new Mt(dt))
          break
        case Ln.I32_TRUNC_U_F64:
          r.cfStack.spillValueIfComposite()
          var dt = r.cfStack.popValue(Cn.F64)
          r.cfStack.addTrapCondition(new Tt('>', dt, new Q(Bn.UINT32_MAX))),
            r.cfStack.addTrapCondition(new Tt('<=', dt, new Q(-1))),
            r.cfStack.addTrapCondition(new vt(dt)),
            r.cfStack.pushValue(new Mt(dt))
          break
        case Ln.I64_EXTEND_S_I32:
          var dt = r.cfStack.popValue(Cn.I32)
          r.cfStack.pushValue(new Pt(dt))
          break
        case Ln.I64_EXTEND_U_I32:
          var dt = r.cfStack.popValue(Cn.I32)
          r.cfStack.pushValue(new Ht(dt))
          break
        case Ln.I64_TRUNC_S_F32:
          r.cfStack.spillValueIfComposite()
          var dt = r.cfStack.popValue(Cn.F32)
          r.cfStack.addTrapCondition(new gt('>=', dt, new Y(922337203685e7))),
            r.cfStack.addTrapCondition(
              new gt('<=', dt, new Y(-922337313636e7))
            ),
            r.cfStack.addTrapCondition(new wt(dt)),
            r.cfStack.pushValue(new zt(dt))
          break
        case Ln.I64_TRUNC_S_F64:
          r.cfStack.spillValueIfComposite()
          var dt = r.cfStack.popValue(Cn.F64)
          r.cfStack.addTrapCondition(
            new Tt('>=', dt, new Q(0x8000000000000000))
          ),
            r.cfStack.addTrapCondition(
              new Tt('<=', dt, new Q(-0x8000000000000800))
            ),
            r.cfStack.addTrapCondition(new vt(dt)),
            r.cfStack.pushValue(new qt(dt))
          break
        case Ln.I64_TRUNC_U_F32:
          r.cfStack.spillValueIfComposite()
          var dt = r.cfStack.popValue(Cn.F32)
          r.cfStack.addTrapCondition(new gt('>=', dt, new Y(184467440737e8))),
            r.cfStack.addTrapCondition(new gt('<=', dt, new Y(-1))),
            r.cfStack.addTrapCondition(new wt(dt)),
            r.cfStack.pushValue(new Wt(dt))
          break
        case Ln.I64_TRUNC_U_F64:
          r.cfStack.spillValueIfComposite()
          var dt = r.cfStack.popValue(Cn.F64)
          r.cfStack.addTrapCondition(
            new Tt('>=', dt, new Q(0x10000000000000000))
          ),
            r.cfStack.addTrapCondition(new Tt('<=', dt, new Q(-1))),
            r.cfStack.addTrapCondition(new vt(dt)),
            r.cfStack.pushValue(new Xt(dt))
          break
        case Ln.F32_CONVERT_S_I32:
          var dt = r.cfStack.popValue(Cn.I32)
          r.cfStack.pushValue(new Yt(dt))
          break
        case Ln.F32_CONVERT_U_I32:
          var dt = r.cfStack.popValue(Cn.I32)
          r.cfStack.pushValue(new Qt(dt))
          break
        case Ln.F32_CONVERT_S_I64:
          var dt = r.cfStack.popValue(Cn.I64)
          r.cfStack.pushValue(new Jt(dt))
          break
        case Ln.F32_CONVERT_U_I64:
          var dt = r.cfStack.popValue(Cn.I64)
          r.cfStack.pushValue(new Kt(dt))
          break
        case Ln.F32_DEMOTE_F64:
          var dt = r.cfStack.popValue(Cn.F64)
          r.cfStack.pushValue(new $t(dt))
          break
        case Ln.F64_CONVERT_S_I32:
          var dt = r.cfStack.popValue(Cn.I32)
          r.cfStack.pushValue(new ee(dt))
          break
        case Ln.F64_CONVERT_U_I32:
          var dt = r.cfStack.popValue(Cn.I32)
          r.cfStack.pushValue(new ne(dt))
          break
        case Ln.F64_CONVERT_S_I64:
          var dt = r.cfStack.popValue(Cn.I64)
          r.cfStack.pushValue(new re(dt))
          break
        case Ln.F64_CONVERT_U_I64:
          var dt = r.cfStack.popValue(Cn.I64)
          r.cfStack.pushValue(new ae(dt))
          break
        case Ln.F64_PROMOTE_F32:
          var dt = r.cfStack.popValue(Cn.F32)
          r.cfStack.pushValue(new ie(dt))
          break
        case Ln.I32_REINTERPRET_F32:
          var dt = r.cfStack.popValue(Cn.F32)
          r.cfStack.pushValue(new Gt(dt))
          break
        case Ln.I64_REINTERPRET_F64:
          var dt = r.cfStack.popValue(Cn.F64)
          r.cfStack.pushValue(new Zt(dt))
          break
        case Ln.F32_REINTERPRET_I32:
          var dt = r.cfStack.popValue(Cn.I32)
          r.cfStack.pushValue(new te(dt))
          break
        case Ln.F64_REINTERPRET_I64:
          var dt = r.cfStack.popValue(Cn.I64)
          r.cfStack.pushValue(new se(dt))
          break
        default:
          throw new e('unsupported opcode: 0x' + u.toString(16))
      }
    }
    var mt = []
    r.sig.param_types.forEach(function(t, e) {
      mt.push(a(e, t))
    }),
      n.putln('function ', r.name, '(', mt.join(','), ') {'),
      r.sig.param_types.forEach(function(t, e) {
        var r = a(e, t)
        switch (t) {
          case Cn.I32:
            n.putln('  ', r, ' = ', r, '|0')
            break
          case Cn.I64:
            break
          case Cn.F32:
            n.putln('  ', r, ' = ToF32(', r, ')')
            break
          case Cn.F64:
        }
      })
    var kt = r.sig.param_types.length
    r.locals.forEach(function(t) {
      for (var e = 0; e < t.count; e++) {
        var r = a(kt++, t.type)
        switch (t.type) {
          case Cn.I32:
            n.putln('  var ', r, ' = 0')
            break
          case Cn.I64:
            n.putln('  var ', r, ' = new Long(0, 0)')
            break
          case Cn.F32:
            n.putln('  var ', r, ' = fround(0.0)')
            break
          case Cn.F64:
            n.putln('  var ', r, ' = 0.0')
        }
      }
    }),
      [Cn.I32, Cn.I64, Cn.F32, Cn.F64].forEach(function(t) {
        for (var e = r.cfStack.tempvars[t].count, a = 0; a < e; a++)
          switch (t) {
            case Cn.I32:
              n.putln('  var ti', a, ' = 0')
              break
            case Cn.I64:
              n.putln('  var tl', a, ' = new Long(0, 0)')
              break
            case Cn.F32:
              n.putln('  var tf', a, ' = fround(0.0)')
              break
            case Cn.F64:
              n.putln('  var td', a, ' = 0.0')
          }
      }),
      s.render(n),
      n.putln('}')
  }
  function v(t, e) {
    var n = t.cfStack.popValue(Cn.I32)
    t.cfStack.pushValue(new ot(e, n))
  }
  function S(t, e) {
    var n = t.cfStack.popValue(Cn.I32),
      r = t.cfStack.popValue(Cn.I32)
    t.cfStack.pushValue(new ct(e, r, n))
  }
  function T(t, e) {
    var n = t.cfStack.popValue(Cn.I32),
      r = t.cfStack.popValue(Cn.I32)
    t.cfStack.pushValue(new lt(e, r, n))
  }
  function V(t, e) {
    var n = t.cfStack.popValue(Cn.I32),
      r = t.cfStack.popValue(Cn.I32)
    t.cfStack.pushValue(new pt(e, r, n))
  }
  function N(t, e) {
    var n = t.cfStack.popValue(Cn.I64)
    t.cfStack.pushValue(new ht(e, n))
  }
  function F(t, e) {
    var n = t.cfStack.popValue(Cn.I64),
      r = t.cfStack.popValue(Cn.I64)
    t.cfStack.pushValue(new dt(e, r, n))
  }
  function E(t, e) {
    var n = t.cfStack.popValue(Cn.I64),
      r = t.cfStack.popValue(Cn.I64)
    t.cfStack.pushValue(new _t(e, r, n))
  }
  function x(t, e) {
    var n = t.cfStack.popValue(Cn.F32),
      r = t.cfStack.popValue(Cn.F32)
    t.cfStack.pushValue(new gt(e, r, n))
  }
  function C(t, e) {
    var n = t.cfStack.popValue(Cn.F32)
    t.cfStack.pushValue(new kt(e, n))
  }
  function O(t, e) {
    var n = t.cfStack.popValue(Cn.F32),
      r = t.cfStack.popValue(Cn.F32)
    t.cfStack.pushValue(new bt(e, r, n))
  }
  function R(t, e) {
    var n = t.cfStack.popValue(Cn.F32),
      r = t.cfStack.popValue(Cn.F32)
    t.cfStack.pushValue(new It(e, r, n))
  }
  function A(t, e) {
    var n = t.cfStack.popValue(Cn.F64),
      r = t.cfStack.popValue(Cn.F64)
    t.cfStack.pushValue(new Tt(e, r, n))
  }
  function U(t, e) {
    var n = t.cfStack.popValue(Cn.F64)
    t.cfStack.pushValue(new St(e, n))
  }
  function L(t, e) {
    var n = t.cfStack.popValue(Cn.F64),
      r = t.cfStack.popValue(Cn.F64)
    t.cfStack.pushValue(new Vt(e, r, n))
  }
  function B(t, e) {
    var n = t.cfStack.popValue(Cn.F64),
      r = t.cfStack.popValue(Cn.F64)
    t.cfStack.pushValue(new Nt(e, r, n))
  }
  function M(t, e, n, r) {
    n + r > Bn.UINT32_MAX
      ? t.cfStack.addTrapCondition(new X(1))
      : t.cfStack.addTrapCondition(new lt('<', new Ct(), new X(n + r))),
      t.cfStack.addTrapCondition(
        new lt('>', e, new lt('-', new Ct(), new X(n + r)))
      )
  }
  function D() {
    ;(this.stack = []),
      (this.tempvars = {}),
      (this.tempvars[Cn.I32] = { count: 0, free: [] }),
      (this.tempvars[Cn.I64] = { count: 0, free: [] }),
      (this.tempvars[Cn.F32] = { count: 0, free: [] }),
      (this.tempvars[Cn.F64] = { count: 0, free: [] })
  }
  function G(t) {
    this.type = t
  }
  function P() {
    G.call(this, Cn.UNKNOWN)
  }
  function H(t, e) {
    G.call(this, t), (this.index = e)
  }
  function j(t, e) {
    H.call(this, t, e)
  }
  function z(t, e) {
    H.call(this, t, e)
  }
  function q(t, e) {
    H.call(this, t, e)
  }
  function W(t, e) {
    G.call(this, t), (this.value = e)
  }
  function X(t) {
    W.call(this, Cn.I32, t)
  }
  function Z(t) {
    W.call(this, Cn.I64, t)
  }
  function Y(t) {
    W.call(this, Cn.F32, t)
  }
  function Q(t) {
    W.call(this, Cn.F64, t)
  }
  function J(t, e, n, r, a) {
    G.call(this, t), (this.addr = e), (this.offset = n), (this.flags = a)
  }
  function K(t, e, n) {
    J.call(this, Cn.I32, t, e, 4, n)
  }
  function $(t, e, n) {
    J.call(this, Cn.F32, t, e, 4, n)
  }
  function tt(t, e, n) {
    J.call(this, Cn.F64, t, e, 8, n)
  }
  function et(t, e, n) {
    J.call(this, Cn.I32, t, e, 1, n)
  }
  function nt(t, e, n) {
    J.call(this, Cn.I32, t, e, 1, n)
  }
  function rt(t, e, n) {
    J.call(this, Cn.I32, t, e, 2, n)
  }
  function at(t, e, n) {
    J.call(this, Cn.I32, t, e, 2, n)
  }
  function it(t, e) {
    G.call(this, t), (this.operand = e)
  }
  function st(t, e, n) {
    G.call(this, t), (this.lhs = e), (this.rhs = n)
  }
  function ut(t) {
    it.call(this, Cn.I32, t)
  }
  function ot(t, e) {
    it.call(this, Cn.I32, e), (this.what = t)
  }
  function ct(t, e, n) {
    st.call(this, Cn.I32, e, n), (this.what = t)
  }
  function lt(t, e, n) {
    st.call(this, Cn.I32, e, n), (this.what = t)
  }
  function pt(t, e, n) {
    st.call(this, Cn.I32, e, n), (this.what = t)
  }
  function ft(t) {
    it.call(this, Cn.I32, t)
  }
  function ht(t, e) {
    it.call(this, Cn.I64, e), (this.what = t)
  }
  function dt(t, e, n) {
    st.call(this, Cn.I64, e, n), (this.what = t)
  }
  function _t(t, e, n) {
    st.call(this, Cn.I32, e, n), (this.what = t)
  }
  function mt(t) {
    it.call(this, Cn.I32, t)
  }
  function wt(t) {
    it.call(this, Cn.I32, t)
  }
  function kt(t, e) {
    it.call(this, Cn.F32, e), (this.what = t)
  }
  function gt(t, e, n) {
    st.call(this, Cn.I32, e, n), (this.what = t)
  }
  function bt(t, e, n) {
    st.call(this, Cn.F32, e, n), (this.what = t)
  }
  function It(t, e, n) {
    st.call(this, Cn.F32, e, n), (this.what = t)
  }
  function yt(t) {
    it.call(this, Cn.I32, t)
  }
  function vt(t) {
    it.call(this, Cn.I32, t)
  }
  function St(t, e) {
    it.call(this, Cn.F64, e), (this.what = t)
  }
  function Tt(t, e, n) {
    st.call(this, Cn.I32, e, n), (this.what = t)
  }
  function Vt(t, e, n) {
    st.call(this, Cn.F64, e, n), (this.what = t)
  }
  function Nt(t, e, n) {
    st.call(this, Cn.F64, e, n), (this.what = t)
  }
  function Ft(t, e, n) {
    G.call(this, e.type),
      (this.cond = t),
      (this.trueExpr = e),
      (this.falseExpr = n)
  }
  function Et(t, e, n) {
    0 === t.return_types.length
      ? G.call(this, Cn.NONE)
      : G.call(this, t.return_types[0]),
      (this.typesig = t),
      (this.index = e),
      (this.args = n)
  }
  function xt(t, e, n) {
    0 === t.return_types.length
      ? G.call(this, Cn.NONE)
      : G.call(this, t.return_types[0]),
      (this.typesig = t),
      (this.index = e),
      (this.args = n)
  }
  function Ct(t) {
    G.call(this, Cn.I32), (this.index = t)
  }
  function Ot(t) {
    G.call(this, Cn.I32), (this.index = t)
  }
  function Rt(t, e) {
    G.call(this, Cn.I32), (this.index = t), (this.expr = e)
  }
  function At(t) {
    it.call(this, Cn.I32, t)
  }
  function Ut(t) {
    it.call(this, Cn.I32, t)
  }
  function Lt(t) {
    it.call(this, Cn.I32, t)
  }
  function Bt(t) {
    it.call(this, Cn.I32, t)
  }
  function Mt(t) {
    it.call(this, Cn.I32, t)
  }
  function Dt(t) {
    it.call(this, Cn.I32, t)
  }
  function Gt(t) {
    it.call(this, Cn.I32, t)
  }
  function Pt(t) {
    it.call(this, Cn.I64, t)
  }
  function Ht(t) {
    it.call(this, Cn.I64, t)
  }
  function jt(t, e) {
    G.call(this, Cn.I64), (this.high = t), (this.low = e)
  }
  function zt(t) {
    it.call(this, Cn.I64, t)
  }
  function qt(t) {
    it.call(this, Cn.I64, t)
  }
  function Wt(t) {
    it.call(this, Cn.I64, t)
  }
  function Xt(t) {
    it.call(this, Cn.I64, t)
  }
  function Zt(t) {
    it.call(this, Cn.I64, t)
  }
  function Yt(t) {
    it.call(this, Cn.F32, t)
  }
  function Qt(t) {
    it.call(this, Cn.F32, t)
  }
  function Jt(t) {
    it.call(this, Cn.F32, t)
  }
  function Kt(t) {
    it.call(this, Cn.F32, t)
  }
  function $t(t) {
    it.call(this, Cn.F32, t)
  }
  function te(t) {
    it.call(this, Cn.F32, t)
  }
  function ee(t) {
    it.call(this, Cn.F64, t)
  }
  function ne(t) {
    it.call(this, Cn.F64, t)
  }
  function re(t) {
    it.call(this, Cn.F64, t)
  }
  function ae(t) {
    it.call(this, Cn.F64, t)
  }
  function ie(t) {
    it.call(this, Cn.F64, t)
  }
  function se(t) {
    it.call(this, Cn.F64, t)
  }
  function ue() {}
  function oe(t) {
    ue.call(this), (this.expr = t)
  }
  function ce(t) {
    ue.call(this), (this.msg = t), (this.exprs = [])
    for (var e = 1; e < arguments.length; e++) this.exprs.push(arguments[e])
  }
  function le(t) {
    oe.call(this, t)
  }
  function pe(t, e) {
    ue.call(this),
      (this.cf = t),
      (this.result = e),
      t.prepareIncomingBranch(this)
  }
  function fe(t, e, n) {
    ue.call(this),
      (this.cond = t),
      (this.cf = e),
      (this.result = n),
      e.prepareIncomingBranch(this)
  }
  function he(t, e, n, r) {
    ue.call(this),
      (this.expr = t),
      (this.default_cf = e),
      (this.target_cfs = n),
      (this.result = r),
      e.prepareIncomingBranch(this),
      n.forEach(function(t) {
        t.prepareIncomingBranch(this)
      })
  }
  function de(t, e, n) {
    oe.call(this, n), (this.type = t), (this.index = e)
  }
  function _e(t, e, n) {
    de.call(this, t, e, n)
  }
  function me(t, e, n) {
    de.call(this, t, e, n)
  }
  function we(t, e, n) {
    de.call(this, t, e, n)
  }
  function ke(t, e, n, r, a, i) {
    ue.call(this),
      (this.type = t),
      (this.value = e),
      (this.addr = n),
      (this.offset = r),
      (this.flags = i)
  }
  function ge(t, e, n, r) {
    ke.call(this, Cn.I32, t, e, n, 4, r)
  }
  function be(t, e, n, r) {
    ke.call(this, Cn.F32, t, e, n, 4, r)
  }
  function Ie(t, e, n, r) {
    ke.call(this, Cn.F64, t, e, n, 8, r)
  }
  function ye(t, e, n, r) {
    ke.call(this, Cn.I32, t, e, n, 1, r)
  }
  function ve(t, e, n, r) {
    ke.call(this, Cn.I32, t, e, n, 2, r)
  }
  function Se() {
    ue.call(this)
  }
  function Te(t) {
    ue.call(this), (this.exprs = t)
  }
  function Ve(t) {
    ue.call(this),
      (this.resultType = t),
      (this.branchResultType = t),
      (this.stack = []),
      (this.statements = []),
      (this.pendingTrapConditions = [])
  }
  function Ne(t) {
    Ve.call(this, t), (this.returnValue = null)
  }
  function Fe(t) {
    Ve.call(this, t), (this.branchResultType = Cn.NONE)
  }
  function Ee(t) {
    Ve.call(this, t)
  }
  function xe(t, e) {
    Ve.call(this, t),
      (this.condExpr = e),
      (this.trueBranch = this.statements),
      (this.elseBranch = []),
      (this.startedOutDead = !1),
      (this.trueBranchGoesDead = !1),
      (this.elseBranchGoesDead = !1)
  }
  function Ce(t) {
    ;(this.bytes = t), (this.idx = 0)
  }
  function Oe(t) {
    ;(this.buffer = new ArrayBuffer(t)),
      (this.bytes = new Uint8Array(this.buffer)),
      (this.idx = 0),
      (this.lastSection = 0),
      (this.types = []),
      (this.imports = []),
      (this.exports = []),
      (this.functions = []),
      (this.globals = []),
      (this.tables = []),
      (this.memories = []),
      (this.elements = []),
      (this.datas = []),
      (this.start = null),
      (this.numImportedFunctions = 0),
      (this.numImportedGlobals = 0),
      (this.numExportedFunctions = 0),
      (this.numExportedGlobals = 0),
      (this.numExportedTables = 0),
      (this.numExportedMemories = 0),
      (this.hasRenderedOuterJSHeader = !1),
      (this.hasRenderedOuterJSFooter = !1),
      (this.hasRenderedAsmFuncCreation = !1),
      (this.hasRenderedAsmFuncHeader = !1),
      (this.hasRenderedAsmFuncFooter = !1)
  }
  function Re(t) {
    for (var e = 32768; e < 5 * t.length; ) e *= 2
    var n = new Ce(t),
      r = new Oe(e)
    return je(n), pn(r), ze(n, r), _n(r), r.finalize(), r
  }
  function Ae(t) {
    var n = t.read_varint7()
    if (n >= 0 || n < Cn.F64) throw new e('Invalid value_type: ' + n)
    return n
  }
  function Ue(t) {
    var n = t.read_varint7()
    if (n !== Cn.ANYFUNC) throw new e('Invalid elem_type: ' + n)
    return n
  }
  function Le(t) {
    var n = t.read_uint8()
    if (n > On.GLOBAL) throw new e('Invalid external_kind: ' + n)
    return n
  }
  function Be(t) {
    var n = {}
    if (((n.form = t.read_varint7()), n.form !== Cn.FUNC))
      throw new e('Invalid func_type form: ' + n.form)
    var r = t.read_varuint32()
    for (n.param_types = []; r > 0; ) n.param_types.push(Ae(t)), r--
    var a = t.read_varuint1()
    for (n.return_types = []; a > 0; ) n.return_types.push(Ae(t)), a--
    return n
  }
  function Me(t) {
    var e = {}
    return (e.content_type = Ae(t)), (e.mutability = t.read_varuint1()), e
  }
  function De(t) {
    var e = {}
    return (e.element_type = Ue(t)), (e.limits = Pe(t)), e
  }
  function Ge(t) {
    var n = {}
    if (((n.limits = Pe(t)), n.limits.initial > 65536))
      throw new e('memory size great than 4GiB')
    if (n.limits.maximum && n.limits.maximum > 65536)
      throw new e('memory size great than 4GiB')
    return n
  }
  function Pe(t) {
    var n = {},
      r = t.read_varuint1()
    if (((n.initial = t.read_varuint32()), r)) {
      if (((n.maximum = t.read_varuint32()), n.maximum < n.initial))
        throw new e('maximum cannot be less than initial')
    } else n.maximum = null
    return n
  }
  function He(t, n, r) {
    var a = {}
    switch (((a.op = t.read_byte()), a.op)) {
      case Ln.I32_CONST:
        if (r !== Cn.I32) throw new e('invalid init_expr type: ' + r)
        a.jsexpr = _(t.read_varint32())
        break
      case Ln.I64_CONST:
        if (r !== Cn.I64) throw new e('invalid init_expr type: ' + r)
        a.jsexpr = _(t.read_varint64())
        break
      case Ln.F32_CONST:
        if (r !== Cn.F32) throw new e('invalid init_expr type: ' + r)
        a.jsexpr = _(t.read_float32())
        break
      case Ln.F64_CONST:
        if (r !== Cn.F64) throw new e('invalid init_expr type: ' + r)
        a.jsexpr = _(t.read_float64())
        break
      case Ln.GET_GLOBAL:
        var i = t.read_varuint32()
        if (i >= n.globals.length)
          throw new e('init_expr refers to non-imported global: ' + i)
        if (n.globals[i].type.content_type !== r)
          throw new e('init_expr refers to global of incorrect type')
        if (n.globals[i].type.mutability)
          throw new e('init_expr refers to mutable global')
        a.jsexpr = 'G' + mn(r) + i
        break
      default:
        throw new e('Unsupported init expr opcode: 0x' + a.op.toString(16))
    }
    if (t.read_byte() !== Ln.END) throw new e('Unsupported init expr code')
    return a
  }
  function je(t) {
    if (t.read_uint32() !== Un.MAGIC_NUMBER)
      throw new e('incorrect magic number')
    if (t.read_uint32() !== Un.VERSION_NUMBER)
      throw new e('incorrect version number')
  }
  function ze(t, n) {
    for (; t.has_more_bytes(); ) {
      var r = t.read_varuint7(),
        a = t.read_varuint32(),
        i = t.idx + a
      if (r) {
        if (r <= n.lastSection)
          throw new e('out-of-order section: ' + r.toString())
        qe(t, n, r), (n.lastSection = r), t.skip_to(i)
      } else {
        var s = t.read_varuint32()
        t.read_bytes(s), t.skip_to(i)
      }
    }
  }
  function qe(t, n, r) {
    switch (r) {
      case An.TYPE:
        return We(t, n)
      case An.IMPORT:
        return Xe(t, n)
      case An.FUNCTION:
        return Ye(t, n)
      case An.TABLE:
        return Qe(t, n)
      case An.MEMORY:
        return Je(t, n)
      case An.GLOBAL:
        return Ke(t, n)
      case An.EXPORT:
        return tn(t, n)
      case An.START:
        return nn(t, n)
      case An.ELEMENT:
        return rn(t, n)
      case An.CODE:
        return sn(t, n)
      case An.DATA:
        return cn(t, n)
      default:
        throw new e('unknown section code: ' + r)
    }
  }
  function We(t, e) {
    for (var n = t.read_varuint32(); n > 0; ) e.types.push(Be(t)), n--
  }
  function Xe(t, e) {
    for (var n = t.read_varuint32(); n > 0; ) Ze(t, e), n--
  }
  function Ze(t, n) {
    var r = {},
      a = t.read_varuint32()
    r.module_name = t.read_bytes(a)
    var i = t.read_varuint32()
    switch (((r.item_name = t.read_bytes(i)), (r.kind = Le(t)), r.kind)) {
      case On.FUNCTION:
        if (((r.type = t.read_varuint32()), r.type >= n.types.length))
          throw new e('import has unknown type: ' + r.type)
        ;(r.index = n.numImportedFunctions++),
          (r.name = 'F' + r.index),
          n.functions.push(r)
        break
      case On.GLOBAL:
        if (((r.type = Me(t)), r.type.mutability))
          throw new e('mutable globals cannot be imported')
        ;(r.index = n.numImportedGlobals++),
          n.putln(
            'var G',
            mn(r.type.content_type),
            r.index,
            ' = imports.G',
            r.index
          ),
          n.globals.push(r)
        break
      case On.TABLE:
        if (n.tables.length > 0) throw new e('multiple tables')
        ;(r.type = De(t)),
          n.putln('var T', n.tables.length, ' = imports.T', n.tables.length),
          (r.index = n.numImportedTables++),
          n.tables.push(r.type)
        break
      case On.MEMORY:
        if (n.memories.length > 0) throw new e('multiple memories')
        ;(r.type = Ge(t)),
          n.putln(
            'var M',
            n.memories.length,
            ' = imports.M',
            n.memories.length
          ),
          (r.index = n.numImportedMemories++),
          n.memories.push(r.type)
        break
      default:
        throw new e('unknown import kind:' + r.kind)
    }
    n.imports.push(r)
  }
  function Ye(t, e) {
    for (var n = t.read_varuint32(); n > 0; ) {
      var r = { type: t.read_varuint32() }
      e.getTypeSignatureByIndex(r.type),
        (r.index = e.functions.length),
        (r.name = 'F' + r.index),
        e.functions.push(r),
        n--
    }
  }
  function Qe(t, n) {
    for (var r = t.read_varuint32(); r > 0; ) {
      var a = De(t)
      n.putln(
        'var T',
        n.tables.length,
        ' = new WebAssembly.Table(',
        JSON.stringify(a.limits),
        ')'
      ),
        n.tables.push(a),
        r--
    }
    if (n.tables.length > 1) throw new e('more than one table entry')
  }
  function Je(t, n) {
    for (var r = t.read_varuint32(); r > 0; ) {
      var a = Ge(t)
      n.putln(
        'var M',
        n.memories.length,
        ' = new WebAssembly.Memory(',
        JSON.stringify(a.limits),
        ')'
      ),
        n.memories.push(a),
        r--
    }
    if (n.memories.length > 1) throw new e('more than one memory entry')
  }
  function Ke(t, e) {
    for (var n = t.read_varuint32(); n > 0; ) {
      var r = $e(t, e)
      e.globals.push(r), n--
    }
  }
  function $e(t, e) {
    var n = {}
    return (n.type = Me(t)), (n.init = He(t, e, n.type.content_type)), n
  }
  function tn(t, e) {
    fn(e), e.putln('var exports = {}')
    for (var n = t.read_varuint32(), r = {}; n > 0; ) en(t, e, r), n--
  }
  function en(t, n, r) {
    var a = {},
      i = t.read_varuint32()
    if (((a.field = t.read_bytes(i)), a.field in r))
      throw new e('duplicate export name: ' + a.field)
    ;(r[a.field] = !0), (a.kind = Le(t)), (a.index = t.read_varuint32())
    var s = "trap('invalid export')"
    switch (a.kind) {
      case On.FUNCTION:
        if (a.index >= n.functions.length)
          throw new e('export of non-existent function')
        ;(s = 'funcs.F' + a.index), n.numExportedFunctions++
        break
      case On.GLOBAL:
        var u = n.getGlobalTypeByIndex(a.index)
        if (n.getGlobalMutabilityByIndex(a.index))
          throw new e('mutable globals cannot be exported')
        a.index >= n.numImportedGlobals &&
          n.putln(
            'var G',
            mn(u),
            a.index,
            ' = ',
            n.globals[a.index].init.jsexpr
          ),
          (s = 'G' + mn(u) + a.index),
          n.numExportedGlobals++
        break
      case On.TABLE:
        if (a.index >= n.tables.length)
          throw new e('export of non-existent table')
        ;(s = 'T' + a.index), n.numExportedTables++
        break
      case On.MEMORY:
        if (a.index >= n.memories.length)
          throw new e('export of non-existent memory')
        ;(s = 'M' + a.index), n.numExportedMemories++
        break
      default:
        throw new e('unchecked export kind: ' + a.kind)
    }
    n.putln('exports[', _(a.field), '] = ' + s), n.exports.push(a)
  }
  function nn(t, n) {
    var r = t.read_varuint32(),
      a = n.getFunctionTypeSignatureByIndex(r)
    if (a.param_types.length > 0)
      throw new e('start function must take no parameters')
    if (a.return_types.length > 0)
      throw new e('start function must return no results')
    n.start = r
  }
  function rn(t, e) {
    fn(e)
    for (var n = t.read_varuint32(); n > 0; ) {
      an(t, e)
      n--
    }
  }
  function an(t, n) {
    var r = {}
    if (((r.table = t.read_varuint32()), 0 !== r.table))
      throw new e('MVP requires elements table be zero')
    n.getTableTypeByIndex(r.table), (r.offset = He(t, n, Cn.I32))
    var a = (r.num_elems = t.read_varuint32())
    for (
      n.putln('if (', r.offset.jsexpr, ' + ', a, ' > T', r.table, '.length) {'),
        n.putln("  throw new WebAssembly.LinkError('table out-of-bounds')"),
        n.putln('}'),
        r.elems = [];
      a > 0;

    ) {
      var i = t.read_varuint32()
      n.getFunctionTypeSignatureByIndex(i), r.elems.push(i), a--
    }
    n.elements.push(r)
  }
  function sn(t, n) {
    var r = t.read_varuint32()
    if (r + n.numImportedFunctions !== n.functions.length)
      throw new e('code section size different to function section size')
    hn(n)
    for (var a = n.numImportedFunctions; r > 0; ) un(t, n, a), r--, a++
    dn(n)
  }
  function un(t, e, n) {
    var r = {}
    ;(r.name = 'F' + n),
      (r.sig = e.getFunctionTypeSignatureByIndex(n)),
      (r.sigStr = w(r.sig))
    var a = t.read_varuint32(),
      i = t.idx + a,
      s = t.read_varuint32()
    for (r.locals = []; s > 0; ) r.locals.push(on(t)), s--
    return y(t, e, r), t.skip_to(i), r
  }
  function on(t) {
    var e = {}
    return (e.count = t.read_varuint32()), (e.type = Ae(t)), e
  }
  function cn(t, e) {
    for (var n = t.read_varuint32(); n > 0; ) ln(t, e), n--
  }
  function ln(t, n) {
    var r = {}
    if (((r.index = t.read_varuint32()), 0 !== r.index))
      throw new e('MVP requires data index be zero')
    n.getMemoryTypeByIndex(r.index), (r.offset = He(t, n, Cn.I32))
    var a = (r.size = t.read_varuint32())
    for (
      n.putln(
        'if ((',
        r.offset.jsexpr,
        ' + ',
        a,
        ') > M0.buffer.byteLength) {'
      ),
        n.putln("  throw new WebAssembly.LinkError('memory out of bounds')"),
        n.putln('}'),
        r.bytes = [];
      a > 0;

    )
      r.bytes.push(t.read_byte()), a--
    n.datas.push(r)
  }
  function pn(t) {
    t.hasRenderedOuterJSHeader ||
      ((t.hasRenderedOuterJSHeader = !0),
      t.putln('(function(WebAssembly, asmlib, imports) {'),
      t.putln('const Long = WebAssembly._Long'))
  }
  function fn(t) {
    t.hasRenderedAsmFuncCreation ||
      ((t.hasRenderedAsmFuncCreation = !0),
      1 === t.tables.length &&
        t.types.forEach(function(e) {
          for (var n = w(e), r = ['idx'], a = 0; a < e.param_types.length; a++)
            r.push('a' + a)
          t.putln(
            'imports.call_',
            n,
            ' = function call_',
            n,
            '(',
            r.join(','),
            '){'
          ),
            t.putln('  idx = idx >>> 0'),
            t.putln('  var func = T0._get(idx)'),
            t.putln('  if (func._wasmTypeSigStr) {'),
            t.putln(
              "    if (func._wasmTypeSigStr !== '",
              n,
              "') { imports.trap('table sig') }"
            ),
            t.putln('  }'),
            t.putln('  return func(', r.slice(1).join(','), ')'),
            t.putln('}')
        }),
      t.memories.forEach(function(e, n) {
        t.putln('var HDV = new DataView(M', n, '.buffer)'),
          e.limits.initial !== e.limits.maximum &&
            (t.putln('M', n, '._onChange(function() {'),
            t.putln('  HDV = new DataView(M', n, '.buffer)'),
            t.putln('});')),
          t.putln('imports.i32_load_unaligned = function(addr) {'),
          t.putln('  return HDV.getInt32(addr, true)'),
          t.putln('}'),
          t.putln('imports.i32_load16_s_unaligned = function(addr) {'),
          t.putln('  return HDV.getInt16(addr, true)'),
          t.putln('}'),
          t.putln('imports.i32_load16_u_unaligned = function(addr) {'),
          t.putln('  return HDV.getInt16(addr, true) & 0x0000FFFF'),
          t.putln('}'),
          t.putln('imports.f32_load_unaligned = function(addr) {'),
          t.putln('  return HDV.getFloat32(addr, true)'),
          t.putln('}'),
          t.putln('imports.f64_load_unaligned = function(addr) {'),
          t.putln('  return HDV.getFloat64(addr, true)'),
          t.putln('}'),
          t.putln('imports.i32_store_unaligned = function(addr, value) {'),
          t.putln('  HDV.setInt32(addr, value, true)'),
          t.putln('}'),
          t.putln('imports.i32_store16_unaligned = function(addr, value) {'),
          t.putln('  HDV.setInt16(addr, value & 0x0000FFFF, true)'),
          t.putln('}'),
          t.putln('imports.f32_store_unaligned = function(addr, value) {'),
          t.putln('  HDV.setFloat32(addr, value, true)'),
          t.putln('}'),
          t.putln('imports.f64_store_unaligned = function(addr, value) {'),
          t.putln('  HDV.setFloat64(addr, value, true)'),
          t.putln('}'),
          t.putln('var f32_isNaN = imports.f32_isNaN'),
          t.putln('var f64_isNaN = imports.f64_isNaN'),
          t.putln('imports.f32_load_nan_bitpattern = function(v, addr) {'),
          t.putln('  if (f32_isNaN(v)) {'),
          t.putln('    v = new Number(v)'),
          t.putln('    v._wasmBitPattern = HDV.getInt32(addr, true)'),
          t.putln('  }'),
          t.putln('  return v'),
          t.putln('}'),
          t.putln('imports.f32_store_nan_bitpattern = function(v, addr) {'),
          t.putln("  if (typeof v === 'object' && v._wasmBitPattern) {"),
          t.putln('    HDV.setInt32(addr, v._wasmBitPattern, true)'),
          t.putln('  }'),
          t.putln('}'),
          t.putln('imports.f64_load_nan_bitpattern = function(v, addr) {'),
          t.putln('  if (f64_isNaN(v)) {'),
          t.putln('    v = new Number(v)'),
          t.putln('    v._wasmBitPattern = new Long('),
          t.putln('      HDV.getInt32(addr, true),'),
          t.putln('      HDV.getInt32(addr + 4, true)'),
          t.putln('    )'),
          t.putln('  }'),
          t.putln('  return v'),
          t.putln('}'),
          t.putln('imports.f64_store_nan_bitpattern = function(v, addr) {'),
          t.putln("  if (typeof v === 'object' && v._wasmBitPattern) {"),
          t.putln('    HDV.setInt32(addr, v._wasmBitPattern.low, true)'),
          t.putln('    HDV.setInt32(addr + 4, v._wasmBitPattern.high, true)'),
          t.putln('  }'),
          t.putln('}')
      }),
      t.functions.length > 0 &&
        (1 === t.memories.length
          ? t.putln('var funcs = asmfuncs(asmlib, imports, M0.buffer)')
          : t.putln('var funcs = asmfuncs(asmlib, imports)')),
      t.functions.forEach(function(e, n) {
        var r = w(t.getFunctionTypeSignatureByIndex(n))
        t.putln('funcs.', e.name, "._wasmTypeSigStr = '", r, "'"),
          t.putln('funcs.', e.name, '._wasmJSWrapper = null')
      }))
  }
  function hn(t) {
    t.hasRenderedAsmFuncHeader ||
      ((t.hasRenderedAsmFuncHeader = !0),
      t.putln('function asmfuncs(stdlib, foreign, heap) {'),
      t.putln('"use asm"'),
      t.memories.forEach(function(e, n) {
        var r
        n > 0 || e.limits.initial !== e.limits.maximum
          ? ((r = 'M' + n + '.buffer'),
            t.putln('var memorySize = ', r, '.byteLength|0'))
          : ((r = 'heap'), t.putln('var memorySize = ', e.limits.initial * xn)),
          t.putln('var HI8 = new stdlib.Int8Array(', r, ')'),
          t.putln('var HI16 = new stdlib.Int16Array(', r, ')'),
          t.putln('var HI32 = new stdlib.Int32Array(', r, ')'),
          t.putln('var HU8 = new stdlib.Uint8Array(', r, ')'),
          t.putln('var HU16 = new stdlib.Uint16Array(', r, ')'),
          t.putln('var HU32 = new stdlib.Uint32Array(', r, ')'),
          t.putln('var HF32 = new stdlib.Float32Array(', r, ')'),
          t.putln('var HF64 = new stdlib.Float64Array(', r, ')'),
          e.limits.initial !== e.limits.maximum &&
            (t.putln('M', n, '._onChange(function() {'),
            t.putln('  memorySize = ', r, '.byteLength|0'),
            t.putln('  HI8 = new stdlib.Int8Array(', r, ')'),
            t.putln('  HI16 = new stdlib.Int16Array(', r, ')'),
            t.putln('  HI32 = new stdlib.Int32Array(', r, ')'),
            t.putln('  HU8 = new stdlib.Uint8Array(', r, ')'),
            t.putln('  HU16 = new stdlib.Uint16Array(', r, ')'),
            t.putln('  HU32 = new stdlib.Uint32Array(', r, ')'),
            t.putln('  HF32 = new stdlib.Float32Array(', r, ')'),
            t.putln('  HF64 = new stdlib.Float64Array(', r, ')'),
            t.putln('});'))
      }),
      t.putln('var fround = stdlib.Math.fround'),
      Object.keys(Bn).forEach(function(e) {
        t.putln('var ', e, ' = foreign.', e)
      }),
      t.imports.forEach(function(e, n) {
        switch (e.kind) {
          case On.FUNCTION:
            t.putln('var F', e.index, ' = foreign.F', e.index)
            break
          case On.GLOBAL:
            switch (e.type.content_type) {
              case Cn.I32:
                t.putln('var Gi', e.index, ' = foreign.G', e.index, '|0')
                break
              case Cn.I64:
                t.putln('var Gl', e.index, ' = foreign.G', e.index)
                break
              case Cn.F32:
                t.putln('var Gf', e.index, ' = fround(foreign.G', e.index, ')')
                break
              case Cn.F64:
                t.putln('var Gd', e.index, ' = +foreign.G', e.index)
            }
        }
      }),
      1 === t.tables.length &&
        t.types.forEach(function(e) {
          var n = w(e)
          t.putln('var call_', n, ' = foreign.call_', n)
        }),
      t.putln('var i32_load_unaligned = foreign.i32_load_unaligned'),
      t.putln('var i32_load16_s_unaligned = foreign.i32_load16_s_unaligned'),
      t.putln('var i32_load16_u_unaligned = foreign.i32_load16_u_unaligned'),
      t.putln('var f32_load_unaligned = foreign.f32_load_unaligned'),
      t.putln('var f64_load_unaligned = foreign.f64_load_unaligned'),
      t.putln('var i32_store_unaligned = foreign.i32_store_unaligned'),
      t.putln('var i32_store16_unaligned = foreign.i32_store16_unaligned'),
      t.putln('var f32_store_unaligned = foreign.f32_store_unaligned'),
      t.putln('var f64_store_unaligned = foreign.f64_store_unaligned'),
      t.putln(
        'var f32_store_nan_bitpattern = foreign.f32_store_nan_bitpattern'
      ),
      t.putln('var f32_load_nan_bitpattern = foreign.f32_load_nan_bitpattern'),
      t.putln(
        'var f64_store_nan_bitpattern = foreign.f64_store_nan_bitpattern'
      ),
      t.putln('var f64_load_nan_bitpattern = foreign.f64_load_nan_bitpattern'),
      t.globals.forEach(function(e, n) {
        if (n >= t.numImportedGlobals)
          switch (e.type.content_type) {
            case Cn.I32:
              t.putln('var Gi', n, ' = ', e.init.jsexpr, '|0')
              break
            case Cn.I64:
              t.putln('var Gl', n, ' = ', e.init.jsexpr)
              break
            case Cn.F32:
              t.putln('var Gf', n, ' = fround(', e.init.jsexpr, ')')
              break
            case Cn.F64:
              t.putln('var Gd', n, ' = +', e.init.jsexpr)
          }
      }))
  }
  function dn(t) {
    t.hasRenderedAsmFuncFooter ||
      ((t.hasRenderedAsmFuncFooter = !0),
      t.putln('return {'),
      t.functions.forEach(function(e, n) {
        t.putln('  F', n, ': F', n, n === t.functions.length - 1 ? '' : ',')
      }),
      t.putln('}'),
      t.putln('}'))
  }
  function _n(t) {
    fn(t),
      hn(t),
      dn(t),
      t.elements.forEach(function(e) {
        for (var n = 0, r = [], a = 0; a < e.elems.length; a++)
          r.push('funcs.F' + e.elems[a]),
            (r.length >= 1024 || a === e.elems.length - 1) &&
              (t.putln(
                'T',
                e.table,
                '._setmany((',
                e.offset.jsexpr,
                ') + ',
                n,
                ', [',
                r.join(','),
                '])'
              ),
              (n += r.length),
              (r = []))
      }),
      t.datas.forEach(function(e) {
        var n = [],
          r = 0
        t.putln('var mb = new Uint8Array(M0.buffer)')
        for (var a = 0; a < e.bytes.length; a++)
          n.push(e.bytes[a]),
            (n.length >= 1024 || a === e.bytes.length - 1) &&
              (t.putln(
                'mb.set([',
                n.join(','),
                '], (',
                e.offset.jsexpr,
                ') + ',
                r,
                ')'
              ),
              (r += n.length),
              (n = []))
      }),
      null !== t.start && t.putln('funcs.F', t.start, '()'),
      t.exports.length > 0 ? t.putln('return exports') : t.putln('return {}'),
      t.putln('})')
  }
  function mn(t) {
    switch (t) {
      case Cn.I32:
        return 'i'
      case Cn.I64:
        return 'l'
      case Cn.F32:
        return 'f'
      case Cn.F64:
        return 'd'
      default:
        throw new e('unknown type: ' + t)
    }
  }
  function wn(t) {
    var e = new Uint8Array(bn(t)),
      n = Re(e)
    return (n.jsmodule = kn(n.bytes)), n
  }
  function kn(t) {
    var e = 'return '
    if ('undefined' != typeof TextDecoder)
      e += new TextDecoder('utf-8').decode(t)
    else if ('undefined' != typeof Buffer) e += new Buffer(t).toString()
    else for (var n = 0; n < t.length; n++) e += String.fromCharCode(t[n])
    return new Function(e)()
  }
  function gn(t) {
    if (
      'undefined' == typeof window ||
      'undefined' == typeof Worker ||
      'undefined' == typeof Blob ||
      'undefined' == typeof URL ||
      !typeof URL.createObjectURL ||
      !1
    )
      try {
        return Promise.resolve(wn(t))
      } catch (t) {
        return Promise.reject(t)
      }
    try {
      var e,
        n,
        r = new Uint8Array(bn(t)),
        a = new Promise(function(t, r) {
          ;(e = t), (n = r)
        }),
        i = new Blob([
          "importScripts('" + g() + "')\n",
          '\nonmessage = function(e) {\n  var bytes = e.data.bytes\n  try {\n    var r = WebAssembly._translate(bytes)\n    // Non-copying transfer of buffer back to main code.\n    postMessage({ result: r }, [r.buffer])\n  } catch (err) {\n    postMessage({ error: err })\n  }\n}',
        ]),
        s = URL.createObjectURL(i),
        u = new Worker(s)
      return (
        (u.onerror = function(t) {
          URL.revokeObjectURL(s), n(t)
        }),
        (u.onmessage = function(t) {
          u.terminate(),
            URL.revokeObjectURL(s),
            t.data.error ? n(t.data.error) : e(t.data.result)
        }),
        u.postMessage({ bytes: r }),
        a.then(function(t) {
          return 'undefined' != typeof document &&
            void 0 !== document.createElement &&
            void 0 !== document.body &&
            void 0 !== document.body.appendChild
            ? new Promise(function(e, n) {
                var r
                do {
                  r = '_onFinishCompileWASM_' + Yn++
                } while (window.hasOwnProperty(r))
                var a = new Blob(['window.' + r + '(', t.bytes, ')']),
                  i = URL.createObjectURL(a),
                  s = document.createElement('script'),
                  u = function() {
                    delete window[r], s.remove(), URL.revokeObjectURL(i)
                  }
                ;(s.onerror = function(t) {
                  u(), n(t)
                }),
                  (window[r] = function(n) {
                    u(), (t.jsmodule = n), e(t)
                  }),
                  (s.src = i),
                  document.body.appendChild(s)
              })
            : ((t.jsmodule = kn(t.bytes)), t)
        })
      )
    } catch (t) {
      return Promise.reject(t)
    }
  }
  function bn(t) {
    if (t instanceof ArrayBuffer) return t
    const e = [
      Int8Array,
      Int16Array,
      Int32Array,
      Uint8Array,
      Uint16Array,
      Uint32Array,
      Uint8ClampedArray,
      Float32Array,
      Float64Array,
      DataView,
    ]
    for (var n = 0; n < e.length; n++) if (t instanceof e[n]) return t.buffer
    return null
  }
  function In(t) {
    o(this),
      void 0 === t.jsmodule ? (this._compiled = wn(t)) : (this._compiled = t)
  }
  function yn(t) {
    o(this), l(t, 'object')
    var e = d(t.initial),
      n = null
    t.hasOwnProperty('maximum') && (n = d(t.maximum))
    for (var r = new Array(e), a = 0; a < e; a++) r[a] = null
    this._internals = { values: r, initial: e, maximum: n }
  }
  function vn(t) {
    o(this), l(t, 'object')
    var e = d(t.initial),
      n = null
    t.hasOwnProperty('maximum') && (n = d(t.maximum)),
      (this._internals = {
        buffer: new ArrayBuffer(e * xn),
        initial: e,
        current: e,
        maximum: n,
        callbacks: [],
      })
  }
  function Sn(t, e) {
    if ((o(this), c(t, In), void 0 !== e && 'object' != typeof e))
      throw new TypeError()
    var a = t._compiled,
      i = {},
      s = 0,
      u = 0
    a.imports.forEach(function(t) {
      var r = e[t.module_name]
      c(r, Object)
      var o = r[t.item_name]
      if (void 0 === o) throw new n('cannot import undefined')
      switch (t.kind) {
        case On.FUNCTION:
          if ((p(o, n), o._wasmRawFunc)) {
            if (o._wasmRawFunc._wasmTypeSigStr !== w(a.types[t.type]))
              throw new n('function import type mis-match')
            i['F' + s] = o._wasmRawFunc
          } else {
            var l = a.types[t.type]
            ;(i['F' + s] = function() {
              var t = [],
                e = arguments
              l.param_types.forEach(function(n, r) {
                t.push(h(e[r], n))
              })
              var n = o.apply(void 0, t)
              return (
                l.return_types.length > 0 && (n = f(n, l.return_types[0])), n
              )
            }),
              (i['F' + s]._origFunc = o)
          }
          s++
          break
        case On.GLOBAL:
          ;(i['G' + u] = f(o, t.type.content_type, n)), u++
          break
        case On.MEMORY:
          if ((c(o, vn, n), o._internals.current < t.type.limits.initial))
            throw new n('memory import too small')
          if (t.type.limits.maximum) {
            if (o._internals.current > t.type.limits.maximum)
              throw new n('memory import too big')
            if (
              !o._internals.maximum ||
              o._internals.maximum > t.type.limits.maximum
            )
              throw new n('memory import has too large a maximum')
          }
          i.M0 = o
          break
        case On.TABLE:
          if ((c(o, yn, n), o.length < t.type.limits.initial))
            throw new n('table import too small')
          if (t.type.limits.maximum) {
            if (o.length > t.type.limits.maximum)
              throw new n('table import too big')
            if (
              !o._internals.maximum ||
              o._internals.maximum > t.type.limits.maximum
            )
              throw new n('table import has too large a maximum')
          }
          i.T0 = o
          break
        default:
          throw new n('unexpected import kind: ' + t.kind)
      }
    }),
      Object.keys(Bn).forEach(function(t) {
        i[t] = Bn[t]
      })
    var l = {
      Int8Array: Int8Array,
      Int16Array: Int16Array,
      Int32Array: Int32Array,
      Uint8Array: Uint8Array,
      Uint16Array: Uint16Array,
      Uint32Array: Uint32Array,
      Float32Array: Float32Array,
      Float64Array: Float64Array,
      Math: Math,
    }
    ;(this._exports = a.jsmodule(Qn, l, i)), (this.exports = {})
    var d = this
    a.exports.forEach(function(t) {
      switch (t.kind) {
        case On.FUNCTION:
          var e = d._exports[t.field]
          e._wasmJSWrapper ||
            ((e._wasmJSWrapper = function() {
              var t = []
              t: for (var n = 0; n < e._wasmTypeSigStr.length; n++)
                switch (e._wasmTypeSigStr.charAt(n)) {
                  case 'i':
                    t.push(0 | arguments[n])
                    break
                  case 'l':
                    throw new r('cannot pass i64 from js: ' + arguments[n])
                  case 'f':
                    t.push(Math.fround(+arguments[n]))
                    break
                  case 'd':
                    t.push(+arguments[n])
                    break
                  case '_':
                    break t
                  default:
                    throw new r('malformed _wasmTypeSigStr')
                }
              return e.apply(this, t)
            }),
            (e._wasmJSWrapper._wasmRawFunc = e)),
            (d.exports[t.field] = e._wasmJSWrapper)
          break
        default:
          d.exports[t.field] = d._exports[t.field]
      }
    })
  }
  function Tn(t) {
    try {
      wn(t)
    } catch (t) {
      if (t instanceof e) return !1
      throw t
    }
    return !0
  }
  function Vn(t) {
    return gn(t).then(function(t) {
      return new In(t)
    })
  }
  function Nn(t, e) {
    return t instanceof In
      ? new Promise(function(n) {
          n(new Sn(t, e))
        })
      : Vn(t).then(function(t) {
          return Nn(t, e).then(function(e) {
            return { module: t, instance: e }
          })
        })
  }
  var Fn =
      'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : {},
    En = (function(t, e) {
      return (e = { exports: {} }), t(e, e.exports), e.exports
    })(function(e) {
      !(function(n, r) {
        'function' == typeof t && e && e.exports
          ? (e.exports = r())
          : ((n.dcodeIO = n.dcodeIO || {}).Long = r())
      })(Fn, function() {
        function t(t, e, n) {
          ;(this.low = 0 | t), (this.high = 0 | e), (this.unsigned = !!n)
        }
        function e(t) {
          return !0 === (t && t.__isLong__)
        }
        function n(t, e) {
          var n, r, i
          return e
            ? ((t >>>= 0),
              (i = 0 <= t && t < 256) && (r = o[t])
                ? r
                : ((n = a(t, (0 | t) < 0 ? -1 : 0, !0)), i && (o[t] = n), n))
            : ((t |= 0),
              (i = -128 <= t && t < 128) && (r = u[t])
                ? r
                : ((n = a(t, t < 0 ? -1 : 0, !1)), i && (u[t] = n), n))
        }
        function r(t, e) {
          if (isNaN(t) || !isFinite(t)) return e ? _ : d
          if (e) {
            if (t < 0) return _
            if (t >= p) return b
          } else {
            if (t <= -f) return I
            if (t + 1 >= f) return g
          }
          return t < 0 ? r(-t, e).neg() : a(t % l | 0, (t / l) | 0, e)
        }
        function a(e, n, r) {
          return new t(e, n, r)
        }
        function i(t, e, n) {
          if (0 === t.length) throw Error('empty string')
          if (
            'NaN' === t ||
            'Infinity' === t ||
            '+Infinity' === t ||
            '-Infinity' === t
          )
            return d
          if (
            ('number' == typeof e ? ((n = e), (e = !1)) : (e = !!e),
            (n = n || 10) < 2 || 36 < n)
          )
            throw RangeError('radix')
          var a
          if ((a = t.indexOf('-')) > 0) throw Error('interior hyphen')
          if (0 === a) return i(t.substring(1), e, n).neg()
          for (var s = r(c(n, 8)), u = d, o = 0; o < t.length; o += 8) {
            var l = Math.min(8, t.length - o),
              p = parseInt(t.substring(o, o + l), n)
            if (l < 8) {
              var f = r(c(n, l))
              u = u.mul(f).add(r(p))
            } else (u = u.mul(s)), (u = u.add(r(p)))
          }
          return (u.unsigned = e), u
        }
        function s(e) {
          return e instanceof t
            ? e
            : 'number' == typeof e
            ? r(e)
            : 'string' == typeof e
            ? i(e)
            : a(e.low, e.high, e.unsigned)
        }
        t.prototype.__isLong__,
          Object.defineProperty(t.prototype, '__isLong__', {
            value: !0,
            enumerable: !1,
            configurable: !1,
          }),
          (t.isLong = e)
        var u = {},
          o = {}
        ;(t.fromInt = n), (t.fromNumber = r), (t.fromBits = a)
        var c = Math.pow
        ;(t.fromString = i), (t.fromValue = s)
        var l = 4294967296,
          p = l * l,
          f = p / 2,
          h = n(1 << 24),
          d = n(0)
        t.ZERO = d
        var _ = n(0, !0)
        t.UZERO = _
        var m = n(1)
        t.ONE = m
        var w = n(1, !0)
        t.UONE = w
        var k = n(-1)
        t.NEG_ONE = k
        var g = a(-1, 2147483647, !1)
        t.MAX_VALUE = g
        var b = a(-1, -1, !0)
        t.MAX_UNSIGNED_VALUE = b
        var I = a(0, -2147483648, !1)
        t.MIN_VALUE = I
        var y = t.prototype
        return (
          (y.toInt = function() {
            return this.unsigned ? this.low >>> 0 : this.low
          }),
          (y.toNumber = function() {
            return this.unsigned
              ? (this.high >>> 0) * l + (this.low >>> 0)
              : this.high * l + (this.low >>> 0)
          }),
          (y.toString = function(t) {
            if ((t = t || 10) < 2 || 36 < t) throw RangeError('radix')
            if (this.isZero()) return '0'
            if (this.isNegative()) {
              if (this.eq(I)) {
                var e = r(t),
                  n = this.div(e),
                  a = n.mul(e).sub(this)
                return n.toString(t) + a.toInt().toString(t)
              }
              return '-' + this.neg().toString(t)
            }
            for (var i = r(c(t, 6), this.unsigned), s = this, u = ''; ; ) {
              var o = s.div(i),
                l = s.sub(o.mul(i)).toInt() >>> 0,
                p = l.toString(t)
              if (((s = o), s.isZero())) return p + u
              for (; p.length < 6; ) p = '0' + p
              u = '' + p + u
            }
          }),
          (y.getHighBits = function() {
            return this.high
          }),
          (y.getHighBitsUnsigned = function() {
            return this.high >>> 0
          }),
          (y.getLowBits = function() {
            return this.low
          }),
          (y.getLowBitsUnsigned = function() {
            return this.low >>> 0
          }),
          (y.getNumBitsAbs = function() {
            if (this.isNegative())
              return this.eq(I) ? 64 : this.neg().getNumBitsAbs()
            for (
              var t = 0 != this.high ? this.high : this.low, e = 31;
              e > 0 && 0 == (t & (1 << e));
              e--
            );
            return 0 != this.high ? e + 33 : e + 1
          }),
          (y.isZero = function() {
            return 0 === this.high && 0 === this.low
          }),
          (y.isNegative = function() {
            return !this.unsigned && this.high < 0
          }),
          (y.isPositive = function() {
            return this.unsigned || this.high >= 0
          }),
          (y.isOdd = function() {
            return 1 == (1 & this.low)
          }),
          (y.isEven = function() {
            return 0 == (1 & this.low)
          }),
          (y.equals = function(t) {
            return (
              e(t) || (t = s(t)),
              (this.unsigned === t.unsigned ||
                this.high >>> 31 != 1 ||
                t.high >>> 31 != 1) &&
                (this.high === t.high && this.low === t.low)
            )
          }),
          (y.eq = y.equals),
          (y.notEquals = function(t) {
            return !this.eq(t)
          }),
          (y.neq = y.notEquals),
          (y.lessThan = function(t) {
            return this.comp(t) < 0
          }),
          (y.lt = y.lessThan),
          (y.lessThanOrEqual = function(t) {
            return this.comp(t) <= 0
          }),
          (y.lte = y.lessThanOrEqual),
          (y.greaterThan = function(t) {
            return this.comp(t) > 0
          }),
          (y.gt = y.greaterThan),
          (y.greaterThanOrEqual = function(t) {
            return this.comp(t) >= 0
          }),
          (y.gte = y.greaterThanOrEqual),
          (y.compare = function(t) {
            if ((e(t) || (t = s(t)), this.eq(t))) return 0
            var n = this.isNegative(),
              r = t.isNegative()
            return n && !r
              ? -1
              : !n && r
              ? 1
              : this.unsigned
              ? t.high >>> 0 > this.high >>> 0 ||
                (t.high === this.high && t.low >>> 0 > this.low >>> 0)
                ? -1
                : 1
              : this.sub(t).isNegative()
              ? -1
              : 1
          }),
          (y.comp = y.compare),
          (y.negate = function() {
            return !this.unsigned && this.eq(I) ? I : this.not().add(m)
          }),
          (y.neg = y.negate),
          (y.add = function(t) {
            e(t) || (t = s(t))
            var n = this.high >>> 16,
              r = 65535 & this.high,
              i = this.low >>> 16,
              u = 65535 & this.low,
              o = t.high >>> 16,
              c = 65535 & t.high,
              l = t.low >>> 16,
              p = 65535 & t.low,
              f = 0,
              h = 0,
              d = 0,
              _ = 0
            return (
              (_ += u + p),
              (d += _ >>> 16),
              (_ &= 65535),
              (d += i + l),
              (h += d >>> 16),
              (d &= 65535),
              (h += r + c),
              (f += h >>> 16),
              (h &= 65535),
              (f += n + o),
              (f &= 65535),
              a((d << 16) | _, (f << 16) | h, this.unsigned)
            )
          }),
          (y.subtract = function(t) {
            return e(t) || (t = s(t)), this.add(t.neg())
          }),
          (y.sub = y.subtract),
          (y.multiply = function(t) {
            if (this.isZero()) return d
            if ((e(t) || (t = s(t)), t.isZero())) return d
            if (this.eq(I)) return t.isOdd() ? I : d
            if (t.eq(I)) return this.isOdd() ? I : d
            if (this.isNegative())
              return t.isNegative()
                ? this.neg().mul(t.neg())
                : this.neg()
                    .mul(t)
                    .neg()
            if (t.isNegative()) return this.mul(t.neg()).neg()
            if (this.lt(h) && t.lt(h))
              return r(this.toNumber() * t.toNumber(), this.unsigned)
            var n = this.high >>> 16,
              i = 65535 & this.high,
              u = this.low >>> 16,
              o = 65535 & this.low,
              c = t.high >>> 16,
              l = 65535 & t.high,
              p = t.low >>> 16,
              f = 65535 & t.low,
              _ = 0,
              m = 0,
              w = 0,
              k = 0
            return (
              (k += o * f),
              (w += k >>> 16),
              (k &= 65535),
              (w += u * f),
              (m += w >>> 16),
              (w &= 65535),
              (w += o * p),
              (m += w >>> 16),
              (w &= 65535),
              (m += i * f),
              (_ += m >>> 16),
              (m &= 65535),
              (m += u * p),
              (_ += m >>> 16),
              (m &= 65535),
              (m += o * l),
              (_ += m >>> 16),
              (m &= 65535),
              (_ += n * f + i * p + u * l + o * c),
              (_ &= 65535),
              a((w << 16) | k, (_ << 16) | m, this.unsigned)
            )
          }),
          (y.mul = y.multiply),
          (y.divide = function(t) {
            if ((e(t) || (t = s(t)), t.isZero()))
              throw Error('division by zero')
            if (this.isZero()) return this.unsigned ? _ : d
            var n, a, i
            if (this.unsigned) {
              if ((t.unsigned || (t = t.toUnsigned()), t.gt(this))) return _
              if (t.gt(this.shru(1))) return w
              i = _
            } else {
              if (this.eq(I)) {
                if (t.eq(m) || t.eq(k)) return I
                if (t.eq(I)) return m
                return (
                  (n = this.shr(1)
                    .div(t)
                    .shl(1)),
                  n.eq(d)
                    ? t.isNegative()
                      ? m
                      : k
                    : ((a = this.sub(t.mul(n))), (i = n.add(a.div(t))))
                )
              }
              if (t.eq(I)) return this.unsigned ? _ : d
              if (this.isNegative())
                return t.isNegative()
                  ? this.neg().div(t.neg())
                  : this.neg()
                      .div(t)
                      .neg()
              if (t.isNegative()) return this.div(t.neg()).neg()
              i = d
            }
            for (a = this; a.gte(t); ) {
              n = Math.max(1, Math.floor(a.toNumber() / t.toNumber()))
              for (
                var u = Math.ceil(Math.log(n) / Math.LN2),
                  o = u <= 48 ? 1 : c(2, u - 48),
                  l = r(n),
                  p = l.mul(t);
                p.isNegative() || p.gt(a);

              )
                (n -= o), (l = r(n, this.unsigned)), (p = l.mul(t))
              l.isZero() && (l = m), (i = i.add(l)), (a = a.sub(p))
            }
            return i
          }),
          (y.div = y.divide),
          (y.modulo = function(t) {
            return e(t) || (t = s(t)), this.sub(this.div(t).mul(t))
          }),
          (y.mod = y.modulo),
          (y.not = function() {
            return a(~this.low, ~this.high, this.unsigned)
          }),
          (y.and = function(t) {
            return (
              e(t) || (t = s(t)),
              a(this.low & t.low, this.high & t.high, this.unsigned)
            )
          }),
          (y.or = function(t) {
            return (
              e(t) || (t = s(t)),
              a(this.low | t.low, this.high | t.high, this.unsigned)
            )
          }),
          (y.xor = function(t) {
            return (
              e(t) || (t = s(t)),
              a(this.low ^ t.low, this.high ^ t.high, this.unsigned)
            )
          }),
          (y.shiftLeft = function(t) {
            return (
              e(t) && (t = t.toInt()),
              0 == (t &= 63)
                ? this
                : t < 32
                ? a(
                    this.low << t,
                    (this.high << t) | (this.low >>> (32 - t)),
                    this.unsigned
                  )
                : a(0, this.low << (t - 32), this.unsigned)
            )
          }),
          (y.shl = y.shiftLeft),
          (y.shiftRight = function(t) {
            return (
              e(t) && (t = t.toInt()),
              0 == (t &= 63)
                ? this
                : t < 32
                ? a(
                    (this.low >>> t) | (this.high << (32 - t)),
                    this.high >> t,
                    this.unsigned
                  )
                : a(
                    this.high >> (t - 32),
                    this.high >= 0 ? 0 : -1,
                    this.unsigned
                  )
            )
          }),
          (y.shr = y.shiftRight),
          (y.shiftRightUnsigned = function(t) {
            if ((e(t) && (t = t.toInt()), 0 === (t &= 63))) return this
            var n = this.high
            if (t < 32) {
              return a(
                (this.low >>> t) | (n << (32 - t)),
                n >>> t,
                this.unsigned
              )
            }
            return 32 === t
              ? a(n, 0, this.unsigned)
              : a(n >>> (t - 32), 0, this.unsigned)
          }),
          (y.shru = y.shiftRightUnsigned),
          (y.toSigned = function() {
            return this.unsigned ? a(this.low, this.high, !1) : this
          }),
          (y.toUnsigned = function() {
            return this.unsigned ? this : a(this.low, this.high, !0)
          }),
          (y.toBytes = function(t) {
            return t ? this.toBytesLE() : this.toBytesBE()
          }),
          (y.toBytesLE = function() {
            var t = this.high,
              e = this.low
            return [
              255 & e,
              (e >>> 8) & 255,
              (e >>> 16) & 255,
              (e >>> 24) & 255,
              255 & t,
              (t >>> 8) & 255,
              (t >>> 16) & 255,
              (t >>> 24) & 255,
            ]
          }),
          (y.toBytesBE = function() {
            var t = this.high,
              e = this.low
            return [
              (t >>> 24) & 255,
              (t >>> 16) & 255,
              (t >>> 8) & 255,
              255 & t,
              (e >>> 24) & 255,
              (e >>> 16) & 255,
              (e >>> 8) & 255,
              255 & e,
            ]
          }),
          t
        )
      })
    })
  ;(e.prototype = new Error()),
    (e.prototype.constructor = e),
    (n.prototype = new Error()),
    (n.prototype.constructor = n),
    (r.prototype = new Error()),
    (r.prototype.constructor = r)
  var xn = 65536,
    Cn = {
      UNKNOWN: 0,
      I32: -1,
      I64: -2,
      F32: -3,
      F64: -4,
      ANYFUNC: -16,
      FUNC: -32,
      NONE: -64,
    },
    On = { FUNCTION: 0, TABLE: 1, MEMORY: 2, GLOBAL: 3 },
    Rn = {
      FUNCTION: 'function',
      TABLE: 'table',
      MEMORY: 'memory',
      GLOBAL: 'global',
    },
    An = {
      TYPE: 1,
      IMPORT: 2,
      FUNCTION: 3,
      TABLE: 4,
      MEMORY: 5,
      GLOBAL: 6,
      EXPORT: 7,
      START: 8,
      ELEMENT: 9,
      CODE: 10,
      DATA: 11,
    },
    Un = { MAGIC_NUMBER: 1836278016, VERSION_NUMBER: 1 },
    Ln = {
      UNREACHABLE: 0,
      NOP: 1,
      BLOCK: 2,
      LOOP: 3,
      IF: 4,
      ELSE: 5,
      END: 11,
      BR: 12,
      BR_IF: 13,
      BR_TABLE: 14,
      RETURN: 15,
      CALL: 16,
      CALL_INDIRECT: 17,
      DROP: 26,
      SELECT: 27,
      GET_LOCAL: 32,
      SET_LOCAL: 33,
      TEE_LOCAL: 34,
      GET_GLOBAL: 35,
      SET_GLOBAL: 36,
      I32_LOAD: 40,
      I64_LOAD: 41,
      F32_LOAD: 42,
      F64_LOAD: 43,
      I32_LOAD8_S: 44,
      I32_LOAD8_U: 45,
      I32_LOAD16_S: 46,
      I32_LOAD16_U: 47,
      I64_LOAD8_S: 48,
      I64_LOAD8_U: 49,
      I64_LOAD16_S: 50,
      I64_LOAD16_U: 51,
      I64_LOAD32_S: 52,
      I64_LOAD32_U: 53,
      I32_STORE: 54,
      I64_STORE: 55,
      F32_STORE: 56,
      F64_STORE: 57,
      I32_STORE8: 58,
      I32_STORE16: 59,
      I64_STORE8: 60,
      I64_STORE16: 61,
      I64_STORE32: 62,
      CURRENT_MEMORY: 63,
      GROW_MEMORY: 64,
      I32_CONST: 65,
      I64_CONST: 66,
      F32_CONST: 67,
      F64_CONST: 68,
      I32_EQZ: 69,
      I32_EQ: 70,
      I32_NE: 71,
      I32_LT_S: 72,
      I32_LT_U: 73,
      I32_GT_S: 74,
      I32_GT_U: 75,
      I32_LE_S: 76,
      I32_LE_U: 77,
      I32_GE_S: 78,
      I32_GE_U: 79,
      I64_EQZ: 80,
      I64_EQ: 81,
      I64_NE: 82,
      I64_LT_S: 83,
      I64_LT_U: 84,
      I64_GT_S: 85,
      I64_GT_U: 86,
      I64_LE_S: 87,
      I64_LE_U: 88,
      I64_GE_S: 89,
      I64_GE_U: 90,
      F32_EQ: 91,
      F32_NE: 92,
      F32_LT: 93,
      F32_GT: 94,
      F32_LE: 95,
      F32_GE: 96,
      F64_EQ: 97,
      F64_NE: 98,
      F64_LT: 99,
      F64_GT: 100,
      F64_LE: 101,
      F64_GE: 102,
      I32_CLZ: 103,
      I32_CTZ: 104,
      I32_POPCNT: 105,
      I32_ADD: 106,
      I32_SUB: 107,
      I32_MUL: 108,
      I32_DIV_S: 109,
      I32_DIV_U: 110,
      I32_REM_S: 111,
      I32_REM_U: 112,
      I32_AND: 113,
      I32_OR: 114,
      I32_XOR: 115,
      I32_SHL: 116,
      I32_SHR_S: 117,
      I32_SHR_U: 118,
      I32_ROTL: 119,
      I32_ROTR: 120,
      I64_CLZ: 121,
      I64_CTZ: 122,
      I64_POPCNT: 123,
      I64_ADD: 124,
      I64_SUB: 125,
      I64_MUL: 126,
      I64_DIV_S: 127,
      I64_DIV_U: 128,
      I64_REM_S: 129,
      I64_REM_U: 130,
      I64_AND: 131,
      I64_OR: 132,
      I64_XOR: 133,
      I64_SHL: 134,
      I64_SHR_S: 135,
      I64_SHR_U: 136,
      I64_ROTL: 137,
      I64_ROTR: 138,
      F32_ABS: 139,
      F32_NEG: 140,
      F32_CEIL: 141,
      F32_FLOOR: 142,
      F32_TRUNC: 143,
      F32_NEAREST: 144,
      F32_SQRT: 145,
      F32_ADD: 146,
      F32_SUB: 147,
      F32_MUL: 148,
      F32_DIV: 149,
      F32_MIN: 150,
      F32_MAX: 151,
      F32_COPYSIGN: 152,
      F64_ABS: 153,
      F64_NEG: 154,
      F64_CEIL: 155,
      F64_FLOOR: 156,
      F64_TRUNC: 157,
      F64_NEAREST: 158,
      F64_SQRT: 159,
      F64_ADD: 160,
      F64_SUB: 161,
      F64_MUL: 162,
      F64_DIV: 163,
      F64_MIN: 164,
      F64_MAX: 165,
      F64_COPYSIGN: 166,
      I32_WRAP_I64: 167,
      I32_TRUNC_S_F32: 168,
      I32_TRUNC_U_F32: 169,
      I32_TRUNC_S_F64: 170,
      I32_TRUNC_U_F64: 171,
      I64_EXTEND_S_I32: 172,
      I64_EXTEND_U_I32: 173,
      I64_TRUNC_S_F32: 174,
      I64_TRUNC_U_F32: 175,
      I64_TRUNC_S_F64: 176,
      I64_TRUNC_U_F64: 177,
      F32_CONVERT_S_I32: 178,
      F32_CONVERT_U_I32: 179,
      F32_CONVERT_S_I64: 180,
      F32_CONVERT_U_I64: 181,
      F32_DEMOTE_F64: 182,
      F64_CONVERT_S_I32: 183,
      F64_CONVERT_U_I32: 184,
      F64_CONVERT_S_I64: 185,
      F64_CONVERT_U_I64: 186,
      F64_PROMOTE_F32: 187,
      I32_REINTERPRET_F32: 188,
      I64_REINTERPRET_F64: 189,
      F32_REINTERPRET_I32: 190,
      F64_REINTERPRET_I64: 191,
    },
    Bn = {},
    Mn = new ArrayBuffer(8),
    Dn = new Uint8Array(Mn),
    Gn = new DataView(Mn)
  ;(Bn.INT32_MIN = -2147483648),
    (Bn.INT32_MAX = 2147483647),
    (Bn.UINT32_MIN = 0),
    (Bn.UINT32_MAX = 4294967295),
    (Bn.trap = function(t) {
      throw new r(t || "it's a trap!")
    }),
    (Bn.Long = En),
    (Bn.i32_mul = Math.imul),
    (Bn.i32_clz = Math.clz32),
    (Bn.i32_rotl = function(t, e) {
      return (t << e) | (t >>> (32 - e)) | 0
    }),
    (Bn.i32_rotr = function(t, e) {
      return (t >>> e) | (t << (32 - e)) | 0
    }),
    (Bn.i32_ctz = function(t) {
      t |= 0
      for (var e = 0, n = 1; n && 0 == (t & n); )
        e++, (n = (n << 1) & 4294967295)
      return e
    }),
    (Bn.i32_popcnt = function(t) {
      t |= 0
      for (var e = 0, n = 1; n; ) t & n && e++, (n = (n << 1) & 4294967295)
      return e
    }),
    (Bn.i32_reinterpret_f32 = function(t) {
      return isNaN(t) && 'object' == typeof t && t._wasmBitPattern
        ? t._wasmBitPattern
        : (Gn.setFloat32(0, t, !0), Gn.getInt32(0, !0))
    }),
    (Bn.i64_add = function(t, e) {
      return t.add(e)
    }),
    (Bn.i64_sub = function(t, e) {
      return t.sub(e)
    }),
    (Bn.i64_mul = function(t, e) {
      return t.mul(e)
    }),
    (Bn.i64_div_s = function(t, e) {
      return t.div(e)
    }),
    (Bn.i64_div_u = function(t, e) {
      return t.toUnsigned().div(e.toUnsigned().toUnsigned())
    }),
    (Bn.i64_rem_s = function(t, e) {
      return t.mod(e)
    }),
    (Bn.i64_rem_u = function(t, e) {
      return t
        .toUnsigned()
        .mod(e.toUnsigned())
        .toUnsigned()
        .toSigned()
    }),
    (Bn.i64_and = function(t, e) {
      return t.and(e)
    }),
    (Bn.i64_or = function(t, e) {
      return t.or(e)
    }),
    (Bn.i64_xor = function(t, e) {
      return t.xor(e)
    }),
    (Bn.i64_shl = function(t, e) {
      return t.shl(e)
    }),
    (Bn.i64_shr_s = function(t, e) {
      return t.shr(e)
    }),
    (Bn.i64_shr_u = function(t, e) {
      return t.shru(e)
    }),
    (Bn.i64_eq = function(t, e) {
      return t.eq(e)
    }),
    (Bn.i64_ne = function(t, e) {
      return t.neq(e)
    }),
    (Bn.i64_lt_s = function(t, e) {
      return t.lt(e)
    }),
    (Bn.i64_lt_u = function(t, e) {
      return t.toUnsigned().lt(e.toUnsigned())
    }),
    (Bn.i64_gt_s = function(t, e) {
      return t.gt(e)
    }),
    (Bn.i64_gt_u = function(t, e) {
      return t.toUnsigned().gt(e.toUnsigned())
    }),
    (Bn.i64_le_s = function(t, e) {
      return t.lte(e)
    }),
    (Bn.i64_le_u = function(t, e) {
      return t.toUnsigned().lte(e.toUnsigned())
    }),
    (Bn.i64_ge_s = function(t, e) {
      return t.gte(e)
    }),
    (Bn.i64_ge_u = function(t, e) {
      return t.toUnsigned().gte(e.toUnsigned())
    }),
    (Bn.i64_rotl = function(t, e) {
      return t.shl(e).or(t.shru(En.fromNumber(64).sub(e)))
    }),
    (Bn.i64_rotr = function(t, e) {
      return t.shru(e).or(t.shl(En.fromNumber(64).sub(e)))
    }),
    (Bn.i64_clz = function(t) {
      var e = Bn.i32_clz(t.getHighBits())
      return 32 === e && (e += Bn.i32_clz(t.getLowBits())), En.fromNumber(e)
    }),
    (Bn.i64_ctz = function(t) {
      var e = Bn.i32_ctz(t.getLowBits())
      return 32 === e && (e += Bn.i32_ctz(t.getHighBits())), En.fromNumber(e)
    }),
    (Bn.i64_popcnt = function(t) {
      return En.fromNumber(
        Bn.i32_popcnt(t.getHighBits()) + Bn.i32_popcnt(t.getLowBits())
      )
    }),
    (Bn.i64_reinterpret_f64 = function(t) {
      if (isNaN(t) && 'object' == typeof t && t._wasmBitPattern)
        return t._wasmBitPattern
      Gn.setFloat64(0, t, !0)
      var e = Gn.getInt32(0, !0),
        n = Gn.getInt32(4, !0)
      return new En(e, n)
    }),
    (Bn.i64_from_i32_s = function(t) {
      return 2147483648 & t ? new En(t, -1) : new En(t, 0)
    }),
    (Bn.ToF32 = function(t) {
      return isNaN(t) &&
        'object' == typeof t &&
        'number' == typeof t._wasmBitPattern
        ? t
        : Math.fround(t)
    }),
    (Bn.f32_isNaN = isNaN),
    (Bn.f32_min = Math.min),
    (Bn.f32_max = Math.max),
    (Bn.f32_sqrt = Math.sqrt),
    (Bn.f32_floor = Math.floor),
    (Bn.f32_ceil = Math.ceil),
    (Bn.f32_trunc = Math.trunc),
    (Bn.f32_nearest = function(t) {
      return 0.5 === Math.abs(t - Math.trunc(t))
        ? 2 * Math.round(t / 2)
        : Math.round(t)
    }),
    (Bn.f32_abs = function(t) {
      return isNaN(t) ? (a(t), (Dn[3] &= -129), i()) : Math.abs(t)
    }),
    (Bn.f32_neg = function(t) {
      return isNaN(t)
        ? (a(t), 128 & Dn[3] ? (Dn[3] &= -129) : (Dn[3] |= 128), i())
        : -t
    }),
    (Bn.f32_signof = function(t) {
      return isNaN(t)
        ? (a(t), 128 & Dn[3] ? -1 : 1)
        : t > 0 || 1 / t > 0
        ? 1
        : -1
    }),
    (Bn.f32_copysign = function(t, e) {
      var n = Bn.f32_signof(e)
      return isNaN(t)
        ? (a(t), -1 === n ? (Dn[3] |= 128) : (Dn[3] &= -129), i())
        : n * Math.abs(t)
    }),
    (Bn.f32_reinterpret_i32 = function(t) {
      return Gn.setInt32(0, t, !0), i()
    }),
    (Bn.f64_isNaN = isNaN),
    (Bn.f64_min = Math.min),
    (Bn.f64_max = Math.max),
    (Bn.f64_sqrt = Math.sqrt),
    (Bn.f64_floor = Math.floor),
    (Bn.f64_ceil = Math.ceil),
    (Bn.f64_trunc = Math.trunc),
    (Bn.f64_nearest = Bn.f32_nearest),
    (Bn.f64_abs = function(t) {
      return isNaN(t) ? (s(t), (Dn[7] &= -129), u()) : Math.abs(t)
    }),
    (Bn.f64_neg = function(t) {
      return isNaN(t)
        ? (s(t), 128 & Dn[7] ? (Dn[7] &= -129) : (Dn[7] |= 128), u())
        : -t
    }),
    (Bn.f64_signof = function(t) {
      return isNaN(t)
        ? (s(t), 128 & Dn[7] ? -1 : 1)
        : t > 0 || 1 / t > 0
        ? 1
        : -1
    }),
    (Bn.f64_copysign = function(t, e) {
      var n = Bn.f64_signof(e)
      return isNaN(t)
        ? (s(t), -1 === n ? (Dn[7] |= 128) : (Dn[7] &= -129), u())
        : n * Math.abs(t)
    }),
    (Bn.f64_reinterpret_i64 = function(t) {
      return Gn.setInt32(0, t.low, !0), Gn.setInt32(4, t.high, !0), u()
    })
  var Pn,
    Hn = new ArrayBuffer(8),
    jn = new Uint8Array(Hn),
    zn = new Uint32Array(Hn),
    qn = new DataView(Hn),
    Wn = void 0
  ;(zn[0] = 65535), (Pn = 255 === jn[0])
  var Xn = !1
  ;(zn[0] = 4294967295),
    (zn[1] = 4294443007),
    qn.setFloat64(0, qn.getFloat64(0, !0), !0),
    4294967295 === zn[0] &&
      4294443007 === zn[1] &&
      ((zn[1] = 4294967295),
      qn.setFloat64(0, qn.getFloat64(0, !0), !0),
      4294967295 === zn[0] && 4294967295 === zn[1] && (Xn = !0))
  var Zn = !1
  ;(zn[0] = 4290772991),
    qn.setFloat32(0, qn.getFloat32(0, !0), !0),
    4290772991 === zn[0] &&
      ((zn[0] = 4294967295),
      qn.setFloat32(0, qn.getFloat32(0, !0), !0),
      4294967295 === zn[0] && (Zn = !0)),
    (D.prototype.push = function(t) {
      var e = null
      return (
        this.stack.length > 0 && (e = this.stack[this.stack.length - 1]),
        t.initialize(this.stack.length, e, this.tempvars),
        this.stack.push(t),
        t
      )
    }),
    (D.prototype.pop = function() {
      var t = this.stack.pop()
      return (
        t.markEndOfBlock(),
        this.stack.length > 0 &&
          (this.peek().addStatement(t),
          t.endReached
            ? t.resultType !== Cn.NONE &&
              this.peek().pushValue(new j(t.resultType, t.getResultVar()))
            : this.markDeadCode()),
        t
      )
    }),
    (D.prototype.peek = function() {
      return this.stack[this.stack.length - 1]
    }),
    (D.prototype.peekBottom = function() {
      return this.stack[0]
    }),
    (D.prototype.markDeadCode = function() {
      this.peek().markDeadCode()
    }),
    (D.prototype.isDeadCode = function() {
      return this.peek().isDead
    }),
    (D.prototype.addStatement = function(t) {
      return this.peek().addStatement(t)
    }),
    (D.prototype.addTerminalStatement = function(t) {
      return this.peek().addTerminalStatement(t)
    }),
    (D.prototype.pushValue = function(t) {
      return this.peek().pushValue(t)
    }),
    (D.prototype.peekType = function() {
      return this.peek().peekType()
    }),
    (D.prototype.peekValue = function(t) {
      return this.peek().peekValue(t)
    }),
    (D.prototype.popValue = function(t) {
      return this.peek().popValue(t)
    }),
    (D.prototype.getBranchTarget = function(t) {
      var n = this.stack.length - (1 + t)
      if (n < 0) throw new e('Branch depth too large')
      return this.stack[n]
    }),
    (D.prototype.spillValue = function() {
      return this.peek().spillValue()
    }),
    (D.prototype.spillValueIfComposite = function() {
      var t = this.peekValue()
      return t instanceof H ? t : t instanceof W ? t : this.spillValue()
    }),
    (D.prototype.spillAllValues = function() {
      for (var t = 0; t < this.stack.length; t++) this.stack[t].spillAllValues()
    }),
    (D.prototype.addTrapCondition = function(t) {
      this.peek().addTrapCondition(t)
    }),
    (D.prototype.finalizeTrapConditions = function() {
      this.peek().finalizeTrapConditions()
    }),
    b(G, Object, {
      render: function(t) {
        throw new e('not implemented')
      },
      walkConsumedVariables: function(t) {},
    }),
    b(P, G, {
      render: function(t) {
        t.putstr('(UNDEFINED)')
      },
    }),
    b(H, G, {
      render: function(t) {
        switch (this.type) {
          case Cn.I32:
            t.putstr(this.namePrefix), t.putstr('i'), t.putstr(this.index)
            break
          case Cn.I64:
            t.putstr(this.namePrefix), t.putstr('l'), t.putstr(this.index)
            break
          case Cn.F32:
            t.putstr(this.namePrefix), t.putstr('f'), t.putstr(this.index)
            break
          case Cn.F64:
            t.putstr(this.namePrefix), t.putstr('d'), t.putstr(this.index)
            break
          default:
            throw new e('unexpected type for variable: ' + this.type)
        }
      },
      walkConsumedVariables: function(t) {
        t(this)
      },
    }),
    b(j, H, { namePrefix: 't' }),
    b(z, H, { namePrefix: 'l' }),
    b(q, H, { namePrefix: 'G' }),
    b(W, G, {
      render: function(t) {
        t.putstr(_(this.value))
      },
    }),
    b(X, W),
    b(Z, W),
    b(Y, W),
    b(Q, W),
    b(J, G, {
      renderUnaligned: function(t, e) {
        t.putstr(e),
          t.putstr('(('),
          this.addr.render(t),
          t.putstr(') + '),
          t.putstr(this.offset),
          t.putstr(')')
      },
      renderMaybeAligned: function(t, e, n, r, a) {
        Pn
          ? (t.putstr('(((('),
            this.addr.render(t),
            t.putstr(') + '),
            t.putstr(this.offset),
            t.putstr(') & '),
            t.putstr(e),
            t.putstr(') ? '),
            t.putstr(a),
            t.putstr('(('),
            this.addr.render(t),
            t.putstr(') + '),
            t.putstr(this.offset),
            t.putstr(') : ('),
            t.putstr(r),
            t.putstr('[(('),
            this.addr.render(t),
            t.putstr(') + '),
            t.putstr(this.offset),
            t.putstr(')>>'),
            t.putstr(n),
            t.putstr(']'),
            t.putstr('))'))
          : this.renderUnaligned(t, a)
      },
      walkConsumedVariables: function(t) {
        this.addr.walkConsumedVariables(t)
      },
    }),
    b(K, J, {
      render: function(t) {
        switch (this.flags) {
          case 0:
          case 1:
            this.renderUnaligned(t, 'i32_load_unaligned')
            break
          case 2:
            this.renderMaybeAligned(
              t,
              '0x03',
              '2',
              'HI32',
              'i32_load_unaligned'
            )
            break
          default:
            throw new e('unsupported load flags')
        }
      },
    }),
    b($, J, {
      render: function(t) {
        switch ((Zn || t.putstr('f32_load_nan_bitpattern('), this.flags)) {
          case 0:
          case 1:
            this.renderUnaligned(t, 'f32_load_unaligned')
            break
          case 2:
            this.renderMaybeAligned(
              t,
              '0x03',
              '2',
              'HF32',
              'f32_load_unaligned'
            )
            break
          default:
            throw new e('unsupported load flags')
        }
        Zn ||
          (t.putstr(',('),
          this.addr.render(t),
          t.putstr(') + '),
          t.putstr(this.offset),
          t.putstr(')'))
      },
    }),
    b(tt, J, {
      render: function(t) {
        switch ((Xn || t.putstr('f64_load_nan_bitpattern('), this.flags)) {
          case 0:
          case 1:
          case 2:
            this.renderUnaligned(t, 'f64_load_unaligned')
            break
          case 3:
            this.renderMaybeAligned(
              t,
              '0x07',
              '3',
              'HF64',
              'f64_load_unaligned'
            )
            break
          default:
            throw new e('unsupported load flags')
        }
        Xn ||
          (t.putstr(',('),
          this.addr.render(t),
          t.putstr(') + '),
          t.putstr(this.offset),
          t.putstr(')'))
      },
    }),
    b(et, J, {
      render: function(t) {
        switch (this.flags) {
          case 0:
            t.putstr('HI8[('),
              this.addr.render(t),
              t.putstr(')+'),
              t.putstr(this.offset),
              t.putstr(']')
            break
          default:
            throw new e('unsupported load flags')
        }
      },
    }),
    b(nt, J, {
      render: function(t) {
        switch (this.flags) {
          case 0:
            t.putstr('HU8[('),
              this.addr.render(t),
              t.putstr(')+'),
              t.putstr(this.offset),
              t.putstr(']')
            break
          default:
            throw new e('unsupported load flags')
        }
      },
    }),
    b(rt, J, {
      render: function(t) {
        switch (this.flags) {
          case 0:
            this.renderUnaligned(t, 'i32_load16_s_unaligned')
            break
          case 1:
            this.renderMaybeAligned(
              t,
              '0x01',
              '1',
              'HI16',
              'i32_load16_s_unaligned'
            )
            break
          default:
            throw new e('unsupported load flags')
        }
      },
    }),
    b(at, J, {
      render: function(t) {
        switch (this.flags) {
          case 0:
            this.renderUnaligned(t, 'i32_load16_u_unaligned')
            break
          case 1:
            this.renderMaybeAligned(
              t,
              '0x01',
              '1',
              'HU16',
              'i32_load16_u_unaligned'
            )
            break
          default:
            throw new e('unsupported load flags')
        }
      },
    }),
    b(it, G, {
      walkConsumedVariables: function(t) {
        this.operand.walkConsumedVariables(t)
      },
    }),
    b(st, G, {
      walkConsumedVariables: function(t) {
        this.lhs.walkConsumedVariables(t), this.rhs.walkConsumedVariables(t)
      },
    }),
    b(ut, it, {
      render: function(t) {
        t.putstr('(!'), this.operand.render(t), t.putstr(')|0')
      },
    }),
    b(ot, it, {
      render: function(t) {
        t.putstr(this.what),
          t.putstr('('),
          this.operand.render(t),
          t.putstr(')')
      },
    }),
    b(ct, st, {
      render: function(t) {
        t.putstr('((('),
          this.lhs.render(t),
          t.putstr(')|0)'),
          t.putstr(this.what),
          t.putstr('(('),
          this.rhs.render(t),
          t.putstr(')|0)'),
          t.putstr(')|0')
      },
    }),
    b(lt, st, {
      render: function(t) {
        t.putstr('((('),
          this.lhs.render(t),
          t.putstr(')>>>0)'),
          t.putstr(this.what),
          t.putstr('(('),
          this.rhs.render(t),
          t.putstr(')>>>0)'),
          t.putstr(')|0')
      },
    }),
    b(pt, st, {
      render: function(t) {
        t.putstr(this.what),
          t.putstr('(('),
          this.lhs.render(t),
          t.putstr(')|0'),
          t.putstr(',('),
          this.rhs.render(t),
          t.putstr(')|0'),
          t.putstr(')')
      },
    }),
    b(ft, it, {
      render: function(t) {
        t.putstr('('), this.operand.render(t), t.putstr('.isZero())|0')
      },
    }),
    b(ht, it, {
      render: function(t) {
        t.putstr(this.what),
          t.putstr('('),
          this.operand.render(t),
          t.putstr(')')
      },
    }),
    b(dt, st, {
      render: function(t) {
        t.putstr(this.what),
          t.putstr('('),
          this.lhs.render(t),
          t.putstr(','),
          this.rhs.render(t),
          t.putstr(')')
      },
    }),
    b(_t, st, {
      render: function(t) {
        t.putstr(this.what),
          t.putstr('('),
          this.lhs.render(t),
          t.putstr(','),
          this.rhs.render(t),
          t.putstr(')|0')
      },
    }),
    b(mt, it, {
      render: function(t) {
        t.putstr('(!'), this.operand.render(t), t.putstr(')|0')
      },
    }),
    b(wt, it, {
      render: function(t) {
        t.putstr('f32_isNaN('), this.operand.render(t), t.putstr(')')
      },
    }),
    b(kt, it, {
      render: function(t) {
        t.putstr('ToF32('),
          t.putstr(this.what),
          t.putstr('('),
          this.operand.render(t),
          t.putstr('))')
      },
    }),
    b(gt, st, {
      render: function(t) {
        t.putstr('(fround('),
          this.lhs.render(t),
          t.putstr(') '),
          t.putstr(this.what),
          t.putstr(' fround('),
          this.rhs.render(t),
          t.putstr('))|0')
      },
    }),
    b(bt, st, {
      render: function(t) {
        t.putstr('fround(('),
          this.lhs.render(t),
          t.putstr(')'),
          t.putstr(this.what),
          t.putstr('('),
          this.rhs.render(t),
          t.putstr('))')
      },
    }),
    b(It, st, {
      render: function(t) {
        t.putstr(this.what),
          t.putstr('('),
          this.lhs.render(t),
          t.putstr(','),
          this.rhs.render(t),
          t.putstr(')')
      },
    }),
    b(yt, it, {
      render: function(t) {
        t.putstr('(!'), this.operand.render(t), t.putstr(')|0')
      },
    }),
    b(vt, it, {
      render: function(t) {
        t.putstr('f64_isNaN('), this.operand.render(t), t.putstr(')')
      },
    }),
    b(St, it, {
      render: function(t) {
        t.putstr(this.what),
          t.putstr('('),
          this.operand.render(t),
          t.putstr(')')
      },
    }),
    b(Tt, st, {
      render: function(t) {
        t.putstr('(+('),
          this.lhs.render(t),
          t.putstr(') '),
          t.putstr(this.what),
          t.putstr(' (+('),
          this.rhs.render(t),
          t.putstr(')))|0')
      },
    }),
    b(Vt, st, {
      render: function(t) {
        t.putstr('('),
          this.lhs.render(t),
          t.putstr(')'),
          t.putstr(this.what),
          t.putstr('('),
          this.rhs.render(t),
          t.putstr(')')
      },
    }),
    b(Nt, st, {
      render: function(t) {
        t.putstr(this.what),
          t.putstr('('),
          this.lhs.render(t),
          t.putstr(','),
          this.rhs.render(t),
          t.putstr(')')
      },
    }),
    b(Ft, G, {
      render: function(t) {
        t.putstr('(('),
          this.cond.render(t),
          t.putstr(') ? ('),
          this.trueExpr.render(t),
          t.putstr(') : ('),
          this.falseExpr.render(t),
          t.putstr('))')
      },
      walkConsumedVariables: function(t) {
        this.cond.walkConsumedVariables(t),
          this.trueExpr.walkConsumedVariables(t),
          this.falseExpr.walkConsumedVariables(t)
      },
    }),
    b(Et, G, {
      render: function(t) {
        if (
          (t.putstr('F'),
          t.putstr(this.index),
          t.putstr('('),
          this.args.length > 0)
        ) {
          for (var e = 0; e < this.args.length - 1; e++)
            this.args[e].render(t), t.putstr(',')
          this.args[e].render(t)
        }
        t.putstr(')')
      },
      walkConsumedVariables: function(t) {
        this.args.forEach(function(e) {
          e.walkConsumedVariables(t)
        })
      },
    }),
    b(xt, G, {
      render: function(t) {
        t.putstr('call_'),
          t.putstr(w(this.typesig)),
          t.putstr('('),
          this.index.render(t)
        for (var e = 0; e < this.args.length; e++)
          t.putstr(','), this.args[e].render(t)
        t.putstr(')')
      },
      walkConsumedVariables: function(t) {
        this.index.walkConsumedVariables(t),
          this.args.forEach(function(e) {
            e.walkConsumedVariables(t)
          })
      },
    }),
    b(Ct, G, {
      render: function(t) {
        t.putstr('memorySize')
      },
    }),
    b(Ot, G, {
      render: function(t) {
        t.putstr('(memorySize / '), t.putstr(xn), t.putstr(')')
      },
    }),
    b(Rt, G, {
      render: function(t) {
        t.putstr('M'),
          t.putstr(this.index),
          t.putstr('._grow('),
          this.expr.render(t),
          t.putstr(')')
      },
      walkConsumedVariables: function(t) {
        this.expr.walkConsumedVariables(t)
      },
    }),
    b(At, it, {
      render: function(t) {
        t.putstr('('), this.operand.render(t), t.putstr('.low)')
      },
    }),
    b(Ut, it, {
      render: function(t) {
        t.putstr('('), this.operand.render(t), t.putstr('.high)')
      },
    }),
    b(Lt, it, {
      render: function(t) {
        t.putstr('f32_trunc('), this.operand.render(t), t.putstr(')|0')
      },
    }),
    b(Bt, it, {
      render: function(t) {
        t.putstr('f64_trunc('), this.operand.render(t), t.putstr(')|0')
      },
    }),
    b(Mt, it, {
      render: function(t) {
        t.putstr('(f32_trunc('), this.operand.render(t), t.putstr(')|0)')
      },
    }),
    b(Dt, it, {
      render: function(t) {
        t.putstr('(f64_trunc('), this.operand.render(t), t.putstr(')|0)')
      },
    }),
    b(Gt, it, {
      render: function(t) {
        t.putstr('i32_reinterpret_f32('), this.operand.render(t), t.putstr(')')
      },
    }),
    b(Pt, it, {
      render: function(t) {
        t.putstr('i64_from_i32_s('), this.operand.render(t), t.putstr(')')
      },
    }),
    b(Ht, it, {
      render: function(t) {
        t.putstr('(new Long('), this.operand.render(t), t.putstr(', 0))')
      },
    }),
    b(jt, G, {
      render: function(t) {
        t.putstr('(new Long('),
          this.low.render(t),
          t.putstr(','),
          this.high.render(t),
          t.putstr('))')
      },
      walkConsumedVariables: function(t) {
        this.high.walkConsumedVariables(t), this.low.walkConsumedVariables(t)
      },
    }),
    b(zt, it, {
      render: function(t) {
        t.putstr('Long.fromNumber(f32_trunc('),
          this.operand.render(t),
          t.putstr('))')
      },
    }),
    b(qt, it, {
      render: function(t) {
        t.putstr('Long.fromNumber(f64_trunc('),
          this.operand.render(t),
          t.putstr('))')
      },
    }),
    b(Wt, it, {
      render: function(t) {
        t.putstr('Long.fromNumber(f32_trunc('),
          this.operand.render(t),
          t.putstr('), true).toSigned()')
      },
    }),
    b(Xt, it, {
      render: function(t) {
        t.putstr('Long.fromNumber(f64_trunc('),
          this.operand.render(t),
          t.putstr('), true).toSigned()')
      },
    }),
    b(Zt, it, {
      render: function(t) {
        t.putstr('i64_reinterpret_f64('), this.operand.render(t), t.putstr(')')
      },
    }),
    b(Yt, it, {
      render: function(t) {
        t.putstr('ToF32(('), this.operand.render(t), t.putstr(')|0)')
      },
    }),
    b(Qt, it, {
      render: function(t) {
        t.putstr('ToF32(('), this.operand.render(t), t.putstr(')>>>0)')
      },
    }),
    b(Jt, it, {
      render: function(t) {
        t.putstr('ToF32('), this.operand.render(t), t.putstr('.toNumber())')
      },
    }),
    b(Kt, it, {
      render: function(t) {
        t.putstr('ToF32('),
          this.operand.render(t),
          t.putstr('.toUnsigned().toNumber())')
      },
    }),
    b($t, it, {
      render: function(t) {
        t.putstr('ToF32('), this.operand.render(t), t.putstr(')')
      },
    }),
    b(te, it, {
      render: function(t) {
        t.putstr('f32_reinterpret_i32('), this.operand.render(t), t.putstr(')')
      },
    }),
    b(ee, it, {
      render: function(t) {
        t.putstr('+(('), this.operand.render(t), t.putstr(')|0)')
      },
    }),
    b(ne, it, {
      render: function(t) {
        t.putstr('+(('), this.operand.render(t), t.putstr(')>>>0)')
      },
    }),
    b(re, it, {
      render: function(t) {
        t.putstr('+('), this.operand.render(t), t.putstr('.toNumber())')
      },
    }),
    b(ae, it, {
      render: function(t) {
        t.putstr('+('),
          this.operand.render(t),
          t.putstr('.toUnsigned().toNumber())')
      },
    }),
    b(ie, it, {
      render: function(t) {
        t.putstr('+('), this.operand.render(t), t.putstr(')')
      },
    }),
    b(se, it, {
      render: function(t) {
        t.putstr('f64_reinterpret_i64('), this.operand.render(t), t.putstr(')')
      },
    }),
    b(ue, Object, {
      render: function(t) {
        throw new e('not implemented')
      },
      walkConsumedVariables: function(t) {},
    }),
    b(oe, ue, {
      walkConsumedVariables: function(t) {
        this.expr.walkConsumedVariables(t)
      },
    }),
    b(ce, ue, {
      render: function(t) {
        t.putstr("WebAssembly._dump('"), t.putstr(this.msg), t.putstr("'")
        for (var e = 0; e < this.exprs.length; e++)
          t.putstr(','), this.exprs[e].render(t)
        t.putstr(')\n')
      },
    }),
    b(le, oe, {
      render: function(t) {
        t.putstr('void ('), this.expr.render(t), t.putstr(')')
      },
    }),
    b(pe, ue, {
      render: function(t) {
        this.cf.renderIncomingBranch(t, this.result)
      },
      walkConsumedVariables: function(t) {
        this.result && this.result.walkConsumedVariables(t)
      },
    }),
    b(fe, ue, {
      render: function(t) {
        t.putstr('if ('),
          this.cond.render(t),
          t.putstr(') {'),
          this.cf.renderIncomingBranch(t, this.result),
          t.putstr('}')
      },
      walkConsumedVariables: function(t) {
        this.cond.walkConsumedVariables(t)
      },
    }),
    b(he, ue, {
      render: function(t, e) {
        var n = this
        t.putstr('switch ('),
          this.expr.render(t),
          t.putstr(') {\n'),
          this.target_cfs.forEach(function(r, a) {
            e.renderIndent(t, 1),
              t.putstr('case '),
              t.putstr(a),
              t.putstr(': '),
              r.renderIncomingBranch(t, n.result),
              t.putstr('\n')
          }),
          e.renderIndent(t, 1),
          t.putstr('default: '),
          this.default_cf.renderIncomingBranch(t, this.result),
          t.putstr('\n'),
          e.renderIndent(t),
          t.putstr('}')
      },
      walkConsumedVariables: function(t) {
        this.expr.walkConsumedVariables(t),
          this.result && this.result.walkConsumedVariables(t)
      },
    }),
    b(de, oe, {
      render: function(t) {
        switch (this.type) {
          case Cn.I32:
            t.putstr(this.namePrefix),
              t.putstr('i'),
              t.putstr(this.index),
              t.putstr(' = ('),
              this.expr.render(t),
              t.putstr(')|0')
            break
          case Cn.I64:
            t.putstr(this.namePrefix),
              t.putstr('l'),
              t.putstr(this.index),
              t.putstr(' = '),
              this.expr.render(t)
            break
          case Cn.F32:
            t.putstr(this.namePrefix),
              t.putstr('f'),
              t.putstr(this.index),
              t.putstr(' = '),
              this.expr.render(t)
            break
          case Cn.F64:
            t.putstr(this.namePrefix),
              t.putstr('d'),
              t.putstr(this.index),
              t.putstr(' = '),
              this.expr.render(t)
            break
          default:
            throw new e('unexpected type for setvar: ' + this.type)
        }
      },
    }),
    b(_e, de, { namePrefix: 't' }),
    b(me, de, { namePrefix: 'l' }),
    b(we, de, { namePrefix: 'G' }),
    b(ke, ue, {
      renderUnaligned: function(t, e) {
        t.putstr(e),
          t.putstr('(('),
          this.addr.render(t),
          t.putstr(') + '),
          t.putstr(this.offset),
          t.putstr(','),
          this.value.render(t),
          t.putstr(')')
      },
      renderMaybeAligned: function(t, e, n, r, a) {
        Pn
          ? (t.putstr('if ((('),
            this.addr.render(t),
            t.putstr(') + '),
            t.putstr(this.offset),
            t.putstr(') & '),
            t.putstr(e),
            t.putstr(') { '),
            t.putstr(a),
            t.putstr('(('),
            this.addr.render(t),
            t.putstr(') + '),
            t.putstr(this.offset),
            t.putstr(','),
            this.value.render(t),
            t.putstr(') } else { '),
            t.putstr(r),
            t.putstr('[(('),
            this.addr.render(t),
            t.putstr(') + '),
            t.putstr(this.offset),
            t.putstr(')>>'),
            t.putstr(n),
            t.putstr('] = '),
            this.value.render(t),
            t.putstr('}'))
          : this.renderUnaligned(t, a)
      },
      walkConsumedVariables: function(t) {
        this.addr.walkConsumedVariables(t), this.value.walkConsumedVariables(t)
      },
    }),
    b(ge, ke, {
      render: function(t) {
        switch (this.flags) {
          case 0:
          case 1:
            this.renderUnaligned(t, 'i32_store_unaligned')
            break
          case 2:
            this.renderMaybeAligned(
              t,
              '0x03',
              '2',
              'HI32',
              'i32_store_unaligned'
            )
            break
          default:
            throw new e('unsupported store flags')
        }
      },
    }),
    b(be, ke, {
      render: function(t) {
        switch (this.flags) {
          case 0:
          case 1:
            this.renderUnaligned(t, 'f32_store_unaligned')
            break
          case 2:
            this.renderMaybeAligned(
              t,
              '0x03',
              '2',
              'HF32',
              'f32_store_unaligned'
            )
            break
          default:
            throw new e('unsupported store flags')
        }
        Zn ||
          (t.putstr('; if (f32_isNaN('),
          this.value.render(t),
          t.putstr(')) { f32_store_nan_bitpattern('),
          this.value.render(t),
          t.putstr(',('),
          this.addr.render(t),
          t.putstr(')+'),
          t.putstr(this.offset),
          t.putstr(') }'))
      },
    }),
    b(Ie, ke, {
      render: function(t) {
        switch (this.flags) {
          case 0:
          case 1:
          case 2:
            this.renderUnaligned(t, 'f64_store_unaligned')
            break
          case 3:
            this.renderMaybeAligned(
              t,
              '0x07',
              '3',
              'HF64',
              'f64_store_unaligned'
            )
            break
          default:
            throw new e('unsupported store flags')
        }
        Xn ||
          (t.putstr('; if (f64_isNaN('),
          this.value.render(t),
          t.putstr(')) { f64_store_nan_bitpattern('),
          this.value.render(t),
          t.putstr(',('),
          this.addr.render(t),
          t.putstr(')+'),
          t.putstr(this.offset),
          t.putstr(') }'))
      },
    }),
    b(ye, ke, {
      render: function(t) {
        switch (this.flags) {
          case 0:
            t.putstr('HU8[('),
              this.addr.render(t),
              t.putstr(')+'),
              t.putstr(this.offset),
              t.putstr('] = '),
              this.value.render(t)
            break
          default:
            throw new e('unsupported store flags')
        }
      },
    }),
    b(ve, ke, {
      render: function(t) {
        switch (this.flags) {
          case 0:
            this.renderUnaligned(t, 'i32_store16_unaligned')
            break
          case 1:
            this.renderMaybeAligned(
              t,
              '0x01',
              '1',
              'HI16',
              'i32_store16_unaligned'
            )
            break
          default:
            throw new e('unsupported store flags')
        }
      },
    }),
    b(Se, ue, {
      render: function(t) {
        t.putstr("trap('unreachable')\n")
      },
    }),
    b(Te, ue, {
      render: function(t, e) {
        t.putstr('if ('), this.exprs[0].render(t), t.putstr(') { trap() }')
        for (var n = 1; n < this.exprs.length; n++)
          t.putstr('\n'),
            e.renderIndent(t),
            t.putstr('if ('),
            this.exprs[n].render(t),
            t.putstr(') { trap() }')
      },
      walkConsumedVariables: function(t) {},
    }),
    b(Ve, ue, {
      initialize: function(t, e, n) {
        ;(this.index = t),
          (this.label = 'L' + t),
          (this.isPolymorphic = !1),
          (this.endReached = !1),
          (this.isDead = !!e && e.isDead),
          (this.tempvars = n),
          (this.resultVar = null)
      },
      getResultVar: function() {
        if (null === this.resultVar) {
          if (this.resultType === Cn.NONE)
            throw new e('no result var for NONE block')
          this.resultVar = this.acquireTempVar(this.resultType)
        }
        return this.resultVar
      },
      markDeadCode: function() {
        ;(this.isDead = !0), (this.isPolymorphic = !0)
        for (var t = 0; t < this.stack.length; t++)
          this._pushStatement(new le(this.stack[t]))
        this.stack = []
      },
      addStatement: function(t) {
        this.finalizeTrapConditions(), this._pushStatement(t)
      },
      addTerminalStatement: function(t) {
        this.finalizeTrapConditions(),
          this.markDeadCode(),
          this._pushStatement(t)
      },
      _pushStatement: function(t) {
        var e = this
        t.walkConsumedVariables(function(t) {
          t instanceof j && e.releaseTempVar(t.type, t.index)
        }),
          this.statements.push(t)
      },
      pushValue: function(t) {
        switch (t.type) {
          case Cn.I32:
          case Cn.I64:
          case Cn.F32:
          case Cn.F64:
            this.stack.push(t)
            break
          case Cn.UNKNOWN:
            if (!this.isPolymorphic)
              throw new e('pushing value of unknown type: ' + JSON.stringify(t))
            break
          default:
            throw new e('pushing unexpected value: ' + JSON.stringify(t))
        }
        return t
      },
      peekType: function() {
        if (0 === this.stack.length) {
          if (!this.isPolymorphic) throw new e('nothing on the stack')
          return Cn.UNKNOWN
        }
        return this.stack[this.stack.length - 1].type
      },
      peekValue: function(t) {
        if (0 === this.stack.length) {
          if (!this.isPolymorphic) throw new e('nothing on the stack')
          return new P()
        }
        var n = this.stack[this.stack.length - 1]
        if (
          (t = t || Cn.UNKNOWN) !== Cn.UNKNOWN &&
          n.type !== t &&
          n.type !== Cn.UNKNOWN
        ) {
          if (!this.isPolymorphic)
            throw new e(
              'Stack type mismatch: expected ' + t + ', found ' + n.type
            )
          return new P()
        }
        return n
      },
      popValue: function(t) {
        if (0 === this.stack.length) {
          if (!this.isPolymorphic) throw new e('nothing on the stack')
          return new P()
        }
        var n = this.stack.pop()
        if (t !== Cn.UNKNOWN && n.type !== t && n.type !== Cn.UNKNOWN) {
          if (!this.isPolymorphic)
            throw new e(
              'Stack type mismatch: expected ' + t + ', found ' + n.type
            )
          return new P()
        }
        return n
      },
      spillValue: function() {
        if (this.stack.length > 0) {
          var t = this.stack[this.stack.length - 1]
          if (!(t instanceof j || t instanceof W)) {
            var e = this.acquireTempVar(t.type)
            this._pushStatement(new _e(t.type, e, t)),
              (this.stack[this.stack.length - 1] = new j(t.type, e))
          }
          return this.stack[this.stack.length - 1]
        }
      },
      spillAllValues: function() {
        for (var t = 0; t < this.stack.length; t++) {
          var e = this.stack[t]
          if (!(e instanceof j || e instanceof W)) {
            var n = this.acquireTempVar(e.type)
            this._pushStatement(new _e(e.type, n, e)),
              (this.stack[t] = new j(e.type, n))
          }
        }
      },
      acquireTempVar: function(t) {
        var e = this.tempvars[t]
        return e.free.length > 0 ? e.free.pop() : e.count++
      },
      releaseTempVar: function(t, e) {
        this.tempvars[t].free.push(e)
      },
      addTrapCondition: function(t) {
        this.pendingTrapConditions.push(t)
      },
      finalizeTrapConditions: function() {
        this.pendingTrapConditions.length > 0 &&
          (this._pushStatement(new Te(this.pendingTrapConditions)),
          (this.pendingTrapConditions = []))
      },
      render: function(t) {
        var e = this
        this.statements.forEach(function(n) {
          e.renderIndent(t), n.render(t, e), t.putstr('\n')
        })
      },
      renderIndent: function(t, e) {
        for (var n = this.index + 1 + (0 | e); n > 0; ) t.putstr('  '), n--
      },
      markEndOfBlock: function() {
        if (!this.isDead) {
          if (
            (this.finalizeTrapConditions(),
            (this.endReached = !0),
            this.resultType !== Cn.NONE)
          ) {
            var t = this.popValue(this.resultType)
            this.addStatement(new _e(this.resultType, this.getResultVar(), t))
          }
          if (this.stack.length > 0)
            throw new e('block left extra values on the stack')
        }
      },
      switchToElseBranch: function() {
        throw new e('mis-placed ELSE')
      },
      prepareIncomingBranch: function(t) {
        this.endReached = !0
      },
    }),
    b(Ne, Ve, {
      markEndOfBlock: function() {
        if (
          !this.isDead &&
          (this.finalizeTrapConditions(),
          (this.endReached = !0),
          this.resultType !== Cn.NONE &&
            (this.returnValue = this.popValue(this.resultType)),
          this.stack.length > 0)
        )
          throw new e('function left extra values on the stack')
      },
      render: function(t) {
        Ve.prototype.render.call(this, t),
          this.resultType === Cn.NONE ||
            this.isDead ||
            (this.renderIndent(t),
            t.putstr('return '),
            this.returnValue.render(t),
            t.putstr('\n'))
      },
      renderIncomingBranch: function(t, e) {
        t.putstr('return'),
          this.branchResultType !== Cn.NONE && (t.putstr(' '), e.render(t))
      },
    }),
    b(Fe, Ve, {
      render: function(t) {
        t.putstr(this.label),
          t.putstr(': while(1) {\n'),
          Ve.prototype.render.call(this, t),
          this.renderIndent(t),
          t.putstr('break'),
          this.renderIndent(t, -1),
          t.putstr('}')
      },
      renderIncomingBranch: function(t, n) {
        if (n) throw new e('cant branch to Loop with a result')
        t.putstr('continue '), t.putstr(this.label)
      },
    }),
    b(Ee, Ve, {
      render: function(t) {
        t.putstr(this.label),
          t.putstr(': do {\n'),
          Ve.prototype.render.call(this, t),
          this.renderIndent(t, -1),
          t.putstr('} while(0)')
      },
      prepareIncomingBranch: function(t) {
        this.branchResultType !== Cn.NONE && this.getResultVar(),
          Ve.prototype.prepareIncomingBranch.call(this, t)
      },
      renderIncomingBranch: function(t, e) {
        if (this.branchResultType !== Cn.NONE) {
          new _e(this.resultType, this.getResultVar(), e).render(t),
            t.putstr('; ')
        }
        t.putstr('break '), t.putstr(this.label)
      },
    }),
    b(xe, Ee, {
      initialize: function(t, e, n) {
        Ve.prototype.initialize.call(this, t, e, n),
          (this.startedOutDead = this.isDead)
      },
      switchToElseBranch: function() {
        Ee.prototype.markEndOfBlock.call(this),
          (this.trueBranchGoesDead = this.isDead),
          (this.isDead = this.startedOutDead),
          (this.isPolymorphic = !1),
          (this.statements = this.elseBranch)
      },
      markEndOfBlock: function() {
        Ee.prototype.markEndOfBlock.call(this),
          this.statements === this.elseBranch
            ? ((this.elseBranchGoesDead = this.isDead),
              (this.isDead =
                this.trueBranchGoesDead && this.elseBranchGoesDead))
            : ((this.endReached = !0), (this.isDead = this.startedOutDead))
      },
      render: function(t) {
        t.putstr('if ('),
          this.condExpr.render(t),
          t.putstr(') { '),
          (this.statements = this.trueBranch),
          Ee.prototype.render.call(this, t),
          this.elseBranch.length > 0 &&
            (t.putstr('} else { '),
            (this.statements = this.elseBranch),
            Ee.prototype.render.call(this, t)),
          t.putstr(' }')
      },
    }),
    (Ce.prototype.has_more_bytes = function() {
      return this.idx < this.bytes.length
    }),
    (Ce.prototype.skip_to = function(t) {
      if (this.idx > t) throw new e('read past end of section')
      if (t > this.bytes.length) throw new e('unepected end of bytes')
      this.idx = t
    }),
    (Ce.prototype.read_byte = function() {
      if (this.idx >= this.bytes.length) throw new e('unepected end of bytes')
      return 0 | this.bytes[this.idx++]
    }),
    (Ce.prototype.read_bytes = function(t) {
      for (var e = []; t > 0; )
        e.push(String.fromCharCode(this.read_byte())), t--
      return e.join('')
    }),
    (Ce.prototype.read_uint8 = function() {
      return this.read_byte()
    }),
    (Ce.prototype.read_uint16 = function() {
      return this.read_byte() | (this.read_byte() << 8)
    }),
    (Ce.prototype.read_uint32 = function() {
      return (
        this.read_byte() |
        (this.read_byte() << 8) |
        (this.read_byte() << 16) |
        (this.read_byte() << 24)
      )
    }),
    (Ce.prototype.read_varuint1 = function() {
      var t = this.read_varuint32()
      if (4294967294 & t) throw new e('varuint1 too large')
      return t
    }),
    (Ce.prototype.read_varuint7 = function() {
      var t = this.read_varuint32()
      if (4294967168 & t) throw new e('varuint7 too large')
      return t
    }),
    (Ce.prototype.read_varuint32 = function() {
      var t = 0,
        n = 0,
        r = 0
      do {
        if (r > 32) throw new e('varuint32 too large')
        ;(t = this.read_byte()), (n |= (127 & t) << r), (r += 7)
      } while (128 & t)
      return n >>> 0
    }),
    (Ce.prototype.read_varint7 = function() {
      var t = this.read_varint32()
      if (t > 63 || t < -64) throw new e('varint7 too large')
      return t
    }),
    (Ce.prototype.read_varint32 = function() {
      var t = 0,
        n = 0,
        r = 0
      do {
        if (r > 32) throw new e('varuint32 too large')
        ;(t = this.read_byte()), (n |= (127 & t) << r), (r += 7)
      } while (128 & t)
      return 64 & t && r < 32 && (n |= -1 << r), n
    }),
    (Ce.prototype.read_varint64 = function() {
      var t = 0,
        n = 0,
        r = 0,
        a = 0
      do {
        if (a > 32) break
        ;(t = this.read_byte()), (n |= (127 & t) << a), (a += 7)
      } while (128 & t)
      if (a < 32) 64 & t && ((n |= -1 << a), (r = -1))
      else {
        a = 3
        for (var r = (127 & t) >> 4; 128 & t; ) {
          if (a > 32) throw new e('varuint64 too large')
          ;(t = this.read_byte()), (r |= (127 & t) << a), (a += 7)
        }
        64 & t && a < 32 && (r |= -1 << a)
      }
      return new En(n, r)
    }),
    (Ce.prototype.read_float32 = function() {
      var t = new DataView(this.bytes.buffer),
        e = t.getFloat32(this.idx, !0)
      return (
        isNaN(e) &&
          !Zn &&
          ((e = new Number(e)), (e._wasmBitPattern = t.getInt32(this.idx, !0))),
        (this.idx += 4),
        e
      )
    }),
    (Ce.prototype.read_float64 = function() {
      var t = new DataView(this.bytes.buffer),
        e = t.getFloat64(this.idx, !0)
      return (
        isNaN(e) &&
          !Xn &&
          ((e = new Number(e)),
          (e._wasmBitPattern = new En(
            t.getInt32(this.idx, !0),
            t.getInt32(this.idx + 4, !0)
          ))),
        (this.idx += 8),
        e
      )
    }),
    (Oe.prototype.putc = function(t) {
      if (this.idx >= this.buffer.byteLength) {
        var e = 2 * this.buffer.byteLength,
          n = new ArrayBuffer(e),
          r = new Uint8Array(n)
        r.set(this.bytes), (this.buffer = n), (this.bytes = r)
      }
      this.bytes[this.idx++] = t
    }),
    (Oe.prototype.putstr = function(t) {
      t = '' + t
      for (var e = 0; e < t.length; e++) this.putc(t.charCodeAt(e))
    }),
    (Oe.prototype.putln = function() {
      this.putstr(Array.from(arguments).join('')), this.putc('\n'.charCodeAt(0))
    }),
    (Oe.prototype.finalize = function() {
      this.bytes = this.bytes.subarray(0, this.idx)
    }),
    (Oe.prototype.getGlobalTypeByIndex = function(t) {
      if (t >= this.globals.length) throw new e('no such global: ' + t)
      return this.globals[t].type.content_type
    }),
    (Oe.prototype.getGlobalMutabilityByIndex = function(t) {
      if (t >= this.globals.length) throw new e('no such global: ' + t)
      return this.globals[t].type.mutability
    }),
    (Oe.prototype.getTableTypeByIndex = function(t) {
      if (t >= this.tables.length) throw new e('no such table: ' + t)
      return this.tables[t]
    }),
    (Oe.prototype.getMemoryTypeByIndex = function(t) {
      if (t >= this.memories.length) throw new e('no such memory: ' + t)
      return this.memories[t]
    }),
    (Oe.prototype.getFunctionTypeSignatureByIndex = function(t) {
      if (t >= this.functions.length)
        throw new e('Invalid function index: ' + t)
      return this.getTypeSignatureByIndex(this.functions[t].type)
    }),
    (Oe.prototype.getTypeSignatureByIndex = function(t) {
      if (t >= this.types.length) throw new e('Invalid type index: ' + t)
      return this.types[t]
    })
  var Yn = 0
  ;(In.exports = function(t) {
    return (
      c(t, In),
      this._compiled.exports.map(function(t) {
        return { name: t.field, kind: Rn[t.kind] }
      })
    )
  }),
    (In.imports = function(t) {
      return (
        c(t, In),
        this._compiled.imports.map(function(t) {
          return { module: t.module_name, name: t.item_name, kind: Rn[t.kind] }
        })
      )
    }),
    (In.customSections = function(t, e) {
      throw (c(t, In), new RuntimeError('customSections not implemented yet'))
    }),
    Object.defineProperty(yn.prototype, 'length', {
      get: function() {
        return c(this, yn), this._internals.values.length
      },
    }),
    (yn.prototype.grow = function(t) {
      c(this, yn)
      var e = this.length,
        n = e + d(t)
      if (n < e) throw new RangeError()
      if (null !== this._internals.maximum && n > this._internals.maximum)
        throw new RangeError()
      for (var r = e; r < n; r++) this._internals.values.push(null)
      return e
    }),
    (yn.prototype.get = function(t) {
      if ((c(this, yn), (t = d(t)) >= this._internals.values.length))
        throw RangeError
      return this._internals.values[t]
    }),
    (yn.prototype.set = function(t, e) {
      if ((c(this, yn), (t = d(t)) >= this._internals.values.length))
        throw RangeError
      this._internals.values[t] = e
    }),
    (yn.prototype._get = function(t) {
      var e = this._internals.values[t]
      if (!e) throw new r('invalid table entry at ' + t)
      return e
    }),
    (yn.prototype._setmany = function(t, e) {
      if ((c(this, yn), (t = d(t)) + e.length > this._internals.values.length))
        throw new n('table set out of bounds')
      for (var r = 0; r < e.length; r++) this._internals.values[t + r] = e[r]
    }),
    (vn.prototype._onChange = function(t) {
      this._internals.callbacks.push(t)
    }),
    (vn.prototype.grow = function(t) {
      var e = this._grow(t)
      if (e < 0) throw new RangeError()
      return e
    }),
    (vn.prototype._grow = function(t) {
      c(this, vn)
      var e = this._internals.current
      if ((t = d(t)) > 65536) return -1
      var n = e + t
      if (this._internals.maximum && n > this._internals.maximum) return -1
      if (n > 65536) return -1
      var r = new ArrayBuffer(n * xn)
      return (
        new Uint8Array(r).set(new Uint8Array(this._internals.buffer)),
        (this._internals.buffer = r),
        (this._internals.current = n),
        this._internals.callbacks.forEach(function(t) {
          t()
        }),
        e
      )
    }),
    Object.defineProperty(vn.prototype, 'buffer', {
      get: function() {
        return c(this, vn), this._internals.buffer
      },
    })
  var Qn = {
    Module: In,
    Instance: Sn,
    Memory: vn,
    Table: yn,
    CompileError: e,
    LinkError: n,
    RuntimeError: r,
    compile: Vn,
    instantiate: Nn,
    validate: Tn,
    _Long: En,
    _translate: Re,
    _toBoxedNaN: m,
    _dump: k,
  }
  return Qn
})
