Tuples are fixed-size arrays that can contain a number of elements of different types in the given order and that are accessible by index.

The tuples definition and accessing by index is presented in the example below:

```jsx
(* syntax: const tuple_name : type0 [* type1 [...]] = (value0[, value1[,...]] *)
const pasport_code : string * nat = ("XP", "31432154928");
(* syntax: tuple_name.index *)
const serial_number : string = pasport_code.0;
```

**Task**

Update the example from previous task using tuples:

1. Replace `a1` type inside the `state` type with tuple of 4 `nat`  elements
2. Update `a1` declaration
3. Set `len` to `4n`, as the tuples doesn't have the size method.
4. Get the first element of the tuple and store it to  `element` variable.