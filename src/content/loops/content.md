There are two keywords for iterations in Ligo:  `for` and `while`. Unlike Solidity, Ligo doesn't support `continue` or `break` operations. Usage:

```jsx
(* syntax:
while condition block {
    action0;
    ...
    actionN;
}; *)
while y =/= 0n block {
    z := x mod y;
    y := y - 1n;
}
(* syntax:
for iterator := init to last block {
    action0;
    ...
    actionN;
} )*
for i := 1 to 10 block {
    acc := acc + i
}
```

**Note:** in the example below, the code won't be compiled as the blocks with `continue` and `break` comments are empty. Add `skip` instruction to fix it.