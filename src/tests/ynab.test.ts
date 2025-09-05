// FALTA CREAR LA PRUEBA PARA QUE FUNCIONE CON ARRAYS VACIOS (CLEAN OBJ)
// ME QUEDE EN QUE CREE LOS CHILDS (no los crea porque hay cosas con undefined)
// 27/06/2025
//
import { cleanObject } from '../ynab.ts';

describe('cleanObject', () => {
  it('should remove undefined values from top level', () => {
    const input = { a: 1, b: undefined, c: 'test' };
    const expected = { a: 1, c: 'test' };
    expect(cleanObject(input)).toEqual(expected);
  });

  it('should remove nested empty objects', () => {
    const input = {
      valid: { key: 'value' },
      empty: { nested: { invalid: undefined } },
    };
    expect(cleanObject(input)).toEqual({ valid: { key: 'value' } });
  });

  it('should handle arrays with objects', () => {
    const input = {
      arr: [
        { valid: 1, invalid: undefined },
        {},
        { nested: { valid: 'a', invalid: undefined } },
      ],
    };
    const expected = { arr: [{ valid: 1 }, { nested: { valid: 'a' } }] };
    expect(cleanObject(input)).toEqual(expected);
  });

  it('should remove completely empty arrays', () => {
    const input = { emptyArr: [], valid: 'value' };
    expect(cleanObject(input)).toEqual({ valid: 'value' });
  });

  it('should handle complex nested structures', () => {
    const input = {
      a: 1,
      b: {
        c: undefined,
        d: {
          e: [{ f: 'valid', g: undefined }, {}, { h: { i: undefined } }],
        },
      },
      c: [undefined, { j: 'valid' }],
    };

    const expected = {
      a: 1,
      c: [{ j: 'valid' }],
    };

    expect(cleanObject(input)).toEqual(expected);
  });

  it('should handle empty input objects', () => {
    expect(cleanObject({})).toEqual({});
  });

  it('should preserve false, 0, and empty strings', () => {
    const input = {
      bool: false,
      zero: 0,
      emptyStr: '',
      nan: NaN,
      nullVal: null,
      undef: undefined,
    };

    const expected = {
      bool: false,
      zero: 0,
      emptyStr: '',
      nan: NaN,
      nullVal: null,
    };

    expect(cleanObject(input)).toEqual(expected);
  });

  it('should handle arrays with primitive values', () => {
    const input = {
      arr: [1, 0, '', false, undefined, null],
    };

    const expected = {
      arr: [1, 0, '', false, null],
    };

    expect(cleanObject(input)).toEqual(expected);
  });

  it('should remove deeply nested empty objects', () => {
    const input = {
      level1: {
        level2: {
          level3: {
            level4: {
              empty: undefined,
            },
          },
        },
        valid: true,
      },
    };

    expect(cleanObject(input)).toEqual({ level1: { valid: true } });
  });
});

