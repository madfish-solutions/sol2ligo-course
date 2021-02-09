There are fixed- and dynamically-size byte arrays, strings in Solidity. Ligo has string type denoted by `string` and the only byte array type - `bytes`.

The Solidity bytes support comparison, bit and shift operations as well as index access. Meanwhile, Ligo bytes are less flexible and support comparison, slices, concatenation, packing, and unpacking.

The operations have the following syntax:

```jsx
(* concat: Bytes.concat(bytes0 , bytes1) *)
const b0 : bytes = Bytes.concat(("42" : bytes), ("21" : bytes));

(* slice: Bytes.sub(start_index,length, bytes0) *)
const b1 : bytes = Bytes.sub(1n, 1n, b0);

(* comparison: bytes0 = bytes1 *)
const b : bool = b0 = b1;

(* pack: Bytes.pack(any_value) *)
const packed : bytes = Bytes.pack(b);

(* unpack: Bytes.unpack(bytes0) *)
const unpacked : option(bool) = Bytes.unpack(packed);

(* get length: bytes0.length *)
const len : nat = b1.length;
```

Strings resemble the Solidity strings with defined concatenation and slicing operators.  

In the example below the code won't be compiled because access by the index isn't supported in Ligo. Nevertheless, the true Ligo developer could overcome it by such a line:

```jsx
const b : bytes = Bytes.sub(0n, 1n, b0);
```