type Shift<A extends Array<any>> = ((...args: A) => void) extends (
  ...args: [A[0], ...infer R]
) => void
  ? R
  : never;

type GrowExpRev<
  A extends Array<any>,
  N extends number,
  P extends Array<Array<any>>
> = A["length"] extends N
  ? A
  : {
      0: GrowExpRev<[...A, ...P[0]], N, P>;
      1: GrowExpRev<A, N, Shift<P>>;
    }[[...A, ...P[0]][N] extends undefined ? 0 : 1];

type GrowExp<
  A extends Array<any>,
  N extends number,
  P extends Array<Array<any>>
> = A["length"] extends N
  ? A
  : {
      0: GrowExp<[...A, ...A], N, [A, ...P]>;
      1: GrowExpRev<A, N, P>;
    }[[...A, ...A][N] extends undefined ? 0 : 1];

export type FixedSizeArray<T, N extends number> = N extends 0
  ? []
  : N extends 1
  ? [T]
  : GrowExp<[T, T], N, [[T]]>;

/*

Source: https://stackoverflow.com/a/60762482

Examples:

// OK
const fixedArr3: FixedArray<string, 3> = ['a', 'b', 'c'];

// Error:
// Type '[string, string, string]' is not assignable to type '[string, string]'.
//   Types of property 'length' are incompatible.
//     Type '3' is not assignable to type '2'.ts(2322)
const fixedArr2: FixedArray<string, 2> = ['a', 'b', 'c'];

// Error:
// Property '3' is missing in type '[string, string, string]' but required in type 
// '[string, string, string, string]'.ts(2741)
const fixedArr4: FixedArray<string, 4> = ['a', 'b', 'c'];

*/
