Solidity has a convenient type casting but in Ligo it can be a bit tricky. The most common conversions are:
```jsx
(* nat <- int *)
const u : nat = abs(1);
(* int <- nat *)
const i : int = int(1n);
(* address <- string *)
const a : address = ("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" : address);
(* tez <- nat *)
const tz : tez = u * 1mutez;
(* nat <- tez *)
const n : nat = tz / 1mutez;
(* tez <- int *)
const t : tez = abs(i) * 1mutez;
(* int <- tez *)
const i : int = int(t / 1mutez);
(* nat <- timestamp *)
const n : nat = abs(now - ("1970-01-01T00:00:00Z" : timestamp));
(* timestamp <- nat *)
const t : timestamp = ("1970-01-01T00:00:00Z" : timestamp) + int(u);
(* timestamp <- int *)
const t : timestamp = ("1970-01-01T00:00:00Z" : timestamp) + i;
(* int <- timestamp *)
const i : int = now - ("1970-01-01T00:00:00Z" : timestamp);
(* bytes <- nat *)
const b : bytes = Bytes.pack(u);
(* nat -> bytes *)
const u : nat = Bytes.unpack(b);
(* bytes <- int *)
const b : bytes = Bytes.pack(i);
(* int -> bytes *)
const i : int = Bytes.unpack(b);
(* bytes <-  tez *)
const b : bytes = Bytes.pack(tz);
(*  tez -> bytes *)
const tz : tez = Bytes.unpack(b);
(* bytes <- timestamp *)
const b : bytes = Bytes.pack(t);
(*  timestamp -> bytes *)
const t : timestamp = Bytes.unpack(b);
(* bytes <- address | string *)
const b : bytes = Bytes.pack(a);
(* address -> bytes *)
const a : address = Bytes.unpack(b);
(* bytes <- string *)
const b : bytes = Bytes.pack("just a string");
(* string-> bytes *)
const s : string = Bytes.unpack(b);
```
