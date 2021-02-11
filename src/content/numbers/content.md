Solidity has signed and unsigned integers of various sizes: denoted by  `uint8` to `uint256` in steps of 8 and `int8` to `int256`. Ligo has only 2 keywords for integers: `int` for signed and `nat` for unsigned integers.

Ligo supports bit operators and shifts on natural numbers only but allows the comparison and arithmetic operations for all numerical types. Bit operators are declared in `Bitwise` namespace. Other operators are quite similar to Solidity syntax. 

Ligo also has a specific numerical type for XTZ units called `tez` that uses the same math as other numbers in the language. Literals are ended with suffix `tez` for an integer number of XTZ and with `mutez` for millionth units of the XTZ. For example:

```jsx
const c : tez = 5mutez + 0.000_010tez
```

The signed number can be converted to unsigned and vice versa with `abs` and `int` operator correspondingly.

Integer literals are simple numbers and unsigned are followed with `n` suffix:

```jsx
const a : int = 5
const b : nat = 5n
```

In Solidity time is represented by unsigned integers, but Tezos VM introduces own type for time called `timestamp`. Only addition, subtraction, and comparison are defined for the type.
