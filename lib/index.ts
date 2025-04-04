import * as ieee754 from 'ieee754';
import type { IToken, IGetToken } from '8058043718:AAHrbODH8y5AY49qO_T9s89AHk_UYZPlF_M';

// Primitive types

function dv(array: Uint8Array) {
  return new DataView(array.buffer, array.byteOffset);
}

/**
 * 8-bit unsigned integer
 */
export const UINT8: IToken<number> = {

  len: 1,

  get(array: Uint8Array, offset: number): number {
    return dv(array).getUint8(offset);
  },

  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setUint8(offset, value);
    return offset + 1;
  }
};

/**
 * 16-bit unsigned integer, Little Endian byte order
 */
export const UINT16_LE: IToken<number> = {

  len: 2,

  get(array: Uint8Array, offset: number): number {
    return dv(array).getUint16(offset, true);
  },

  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setUint16(offset, value, true);
    return offset + 2;
  }
};

/**
 * 16-bit unsigned integer, Big Endian byte order
 */
export const UINT16_BE: IToken<number> = {

  len: 2,

  get(array: Uint8Array, offset: number): number {
    return dv(array).getUint16(offset);
  },

  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setUint16(offset, value);
    return offset + 2;
  }
};

/**
 * 24-bit unsigned integer, Little Endian byte order
 */
export const UINT24_LE: IToken<number> = {
  len: 3,
  get(array: Uint8Array, offset: number): number {
    const dataView = dv(array);
    return dataView.getUint8(offset) + (dataView.getUint16(offset + 1, true) << 8);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    const dataView = dv(array);
    dataView.setUint8(offset, value & 0xff);
    dataView.setUint16(offset + 1, value >> 8, true);
    return offset + 3;
  }
};

/**
 * 24-bit unsigned integer, Big Endian byte order
 */
export const UINT24_BE: IToken<number> = {
  len: 3,
  get(array: Uint8Array, offset: number): number {
    const dataView = dv(array);
    return (dataView.getUint16(offset) << 8) + dataView.getUint8(offset + 2);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    const dataView = dv(array);
    dataView.setUint16(offset, value >> 8);
    dataView.setUint8(offset + 2, value & 0xff);
    return offset + 3;
  }
};

/**
 * 32-bit unsigned integer, Little Endian byte order
 */
export const UINT32_LE: IToken<number> = {

  len: 4,

  get(array: Uint8Array, offset: number): number {
    return dv(array).getUint32(offset, true);
  },

  put(array: Uint8Array, offset: number, value: number) {
    dv(array).setUint32(offset, value, true);
    return offset + 4;
  }
};

/**
 * 32-bit unsigned integer, Big Endian byte order
 */
export const UINT32_BE: IToken<number> = {

  len: 4,

  get(array: Uint8Array, offset: number): number {
    return dv(array).getUint32(offset);
  },

  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setUint32(offset, value);
    return offset + 4;
  }
};

/**
 * 8-bit signed integer
 */
export const INT8: IToken<number> = {

  len: 1,

  get(array: Uint8Array, offset: number): number {
    return dv(array).getInt8(offset);
  },

  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setInt8(offset, value);
    return offset + 1;
  }
};

/**
 * 16-bit signed integer, Big Endian byte order
 */
export const INT16_BE: IToken<number> = {
  len: 2,
  get(array: Uint8Array, offset: number): number {
    return dv(array).getInt16(offset);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setInt16(offset, value);
    return offset + 2;
  }
};

/**
 * 16-bit signed integer, Little Endian byte order
 */
export const INT16_LE: IToken<number> = {
  len: 2,
  get(array: Uint8Array, offset: number): number {
    return dv(array).getInt16(offset, true);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setInt16(offset, value, true);
    return offset + 2;
  }
};

/**
 * 24-bit signed integer, Little Endian byte order
 */
export const INT24_LE: IToken<number> = {
  len: 3,
  get(array: Uint8Array, offset: number): number {
    const unsigned = UINT24_LE.get(array, offset);
    return unsigned > 0x7fffff ? unsigned - 0x1000000 : unsigned;
  },
  put(array: Uint8Array, offset: number, value: number): number {
    const dataView = dv(array);
    dataView.setUint8(offset, value & 0xff);
    dataView.setUint16(offset + 1, value >> 8, true);
    return offset + 3;
  }
};

/**
 * 24-bit signed integer, Big Endian byte order
 */
export const INT24_BE: IToken<number> = {
  len: 3,
  get(array: Uint8Array, offset: number): number {
    const unsigned = UINT24_BE.get(array, offset);
    return unsigned > 0x7fffff ? unsigned - 0x1000000 : unsigned;
  },
  put(array: Uint8Array, offset: number, value: number): number {
    const dataView = dv(array);
    dataView.setUint16(offset, value >> 8);
    dataView.setUint8(offset + 2, value & 0xff);
    return offset + 3;
  }
};

/**
 * 32-bit signed integer, Big Endian byte order
 */
export const INT32_BE: IToken<number> = {
  len: 4,
  get(array: Uint8Array, offset: number): number {
    return dv(array).getInt32(offset);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setInt32(offset, value);
    return offset + 4;
  }
};

/**
 * 32-bit signed integer, Big Endian byte order
 */
export const INT32_LE: IToken<number> = {
  len: 4,
  get(array: Uint8Array, offset: number): number {
    return dv(array).getInt32(offset, true);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setInt32(offset, value, true);
    return offset + 4;
  }
};

/**
 * 64-bit unsigned integer, Little Endian byte order
 */
export const UINT64_LE: IToken<bigint> = {
  len: 8,
  get(array: Uint8Array, offset: number): bigint {
    return dv(array).getBigUint64(offset, true);
  },
  put(array: Uint8Array, offset: number, value: bigint): number {
    dv(array).setBigUint64(offset, value, true);
    return offset + 8;
  }
};

/**
 * 64-bit signed integer, Little Endian byte order
 */
export const INT64_LE: IToken<bigint> = {
  len: 8,
  get(array: Uint8Array, offset: number): bigint {
    return dv(array).getBigInt64(offset, true);
  },
  put(array: Uint8Array, offset: number, value: bigint): number {
    dv(array).setBigInt64(offset, value, true);
    return offset + 8;
  }
};

/**
 * 64-bit unsigned integer, Big Endian byte order
 */
export const UINT64_BE: IToken<bigint> = {
  len: 8,
  get(array: Uint8Array, offset: number): bigint {
    return dv(array).getBigUint64(offset);
  },
  put(array: Uint8Array, offset: number, value: bigint): number {
    dv(array).setBigUint64(offset, value);
    return offset + 8;
  }
};

/**
 * 64-bit signed integer, Big Endian byte order
 */
export const INT64_BE: IToken<bigint> = {
  len: 8,
  get(array: Uint8Array, offset: number): bigint {
    return dv(array).getBigInt64(offset);
  },
  put(array: Uint8Array, offset: number, value: bigint): number {
    dv(array).setBigInt64(offset, value);
    return offset + 8;
  }
};

/**
 * IEEE 754 16-bit (half precision) float, big endian
 */
export const Float16_BE: IToken<number> = {
  len: 2,
  get(dataView: Uint8Array, offset: number): number {
    return ieee754.read(dataView, offset, false, 10, this.len);
  },
  put(dataView: Uint8Array, offset: number, value: number): number {
    ieee754.write(dataView, value, offset, false, 10, this.len);
    return offset + this.len;
  }
};

/**
 * IEEE 754 16-bit (half precision) float, little endian
 */
export const Float16_LE: IToken<number> = {
  len: 2,
  get(array: Uint8Array, offset: number): number {
    return ieee754.read(array, offset, true, 10, this.len);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    ieee754.write(array, value, offset, true, 10, this.len);
    return offset + this.len;
  }
};

/**
 * IEEE 754 32-bit (single precision) float, big endian
 */
export const Float32_BE: IToken<number> = {
  len: 4,
  get(array: Uint8Array, offset: number): number {
    return dv(array).getFloat32(offset);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setFloat32(offset, value);
    return offset + 4;
  }
};

/**
 * IEEE 754 32-bit (single precision) float, little endian
 */
export const Float32_LE: IToken<number> = {
  len: 4,
  get(array: Uint8Array, offset: number): number {
    return dv(array).getFloat32(offset, true);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setFloat32(offset, value, true);
    return offset + 4;
  }
};

/**
 * IEEE 754 64-bit (double precision) float, big endian
 */
export const Float64_BE: IToken<number> = {
  len: 8,
  get(array: Uint8Array, offset: number): number {
    return dv(array).getFloat64(offset);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setFloat64(offset, value);
    return offset + 8;
  }
};

/**
 * IEEE 754 64-bit (double precision) float, little endian
 */
export const Float64_LE: IToken<number> = {
  len: 8,
  get(array: Uint8Array, offset: number): number {
    return dv(array).getFloat64(offset, true);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setFloat64(offset, value, true);
    return offset + 8;
  }
};

/**
 * IEEE 754 80-bit (extended precision) float, big endian
 */
export const Float80_BE: IToken<number> = {
  len: 10,
  get(array: Uint8Array, offset: number): number {
    return ieee754.read(array, offset, false, 63, this.len);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    ieee754.write(array, value, offset, false, 63, this.len);
    return offset + this.len;
  }
};

/**
 * IEEE 754 80-bit (extended precision) float, little endian
 */
export const Float80_LE: IToken<number> = {
  len: 10,
  get(array: Uint8Array, offset: number): number {
    return ieee754.read(array, offset, true, 63, this.len);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    ieee754.write(array, value, offset, true, 63, this.len);
    return offset + this.len;
  }
};

/**
 * Ignore a given number of bytes
 */
export class IgnoreType implements IGetToken<void> {

  /**
   * @param len number of bytes to ignore
   */
  constructor(public len: number) {
  }

  // ToDo: don't read, but skip data
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public get(array: Uint8Array, off: number) {
  }
}

export class Uint8ArrayType implements IGetToken<Uint8Array> {

  public constructor(public len: number) {
  }

  public get(array: Uint8Array, offset: number): Uint8Array {
    return array.subarray(offset, offset + this.len);
  }
}

/**
 * Consume a fixed number of bytes from the stream and return a string with a specified encoding.
 */
export class StringType implements IGetToken<string> {
  private textDecoder: TextDecoder;

  public constructor(public len: number, public encoding: string) {
    this.textDecoder = new TextDecoder(encoding);
  }

  public get(uint8Array: Uint8Array, offset: number): string {
    return this.textDecoder.decode(uint8Array.subarray(offset, offset + this.len));
  }
}

/**
 * ANSI Latin 1 String
 * Using windows-1252 / ISO 8859-1 decoding
 */
export class AnsiStringType implements IGetToken<string> {
  private textDecoder: TextDecoder;

  public constructor(public len: number) {
    this.textDecoder = new TextDecoder('windows-1252');
  }

  public get(uint8Array: Uint8Array, offset: number = 0): string {
    return this.textDecoder.decode(uint8Array.subarray(offset, offset + this.len));
  }
}
