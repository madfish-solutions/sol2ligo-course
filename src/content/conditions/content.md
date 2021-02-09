In Ligo conditions must have both `if` and `else` branches and have the following syntax:

```jsx
(* syntax: if condition then actions0 else actions1 *)
(* condition with one instruction in branch*)
if a = b then a := 10n else b := 1n;

(* condition with few actions *)
if a = b then block {
  a := 10n;
  b := 0n; 
} else b := 1n;

(* condition with missing block *)
if a = b then a := 10n else skip;
```