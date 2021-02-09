Both Ligo and Solidity have mapping types but they act quite differently. 

First, there are two types of mappings: 

- `map` : used for small amount of entries and is fully deserialized before contract execution
- `big_map` : designed for big number of entries and the needed values are loaded by request.

They are declared as: 

```jsx
(* syntax: var name: map : map(key_type, value_type) = map[ 
  key0 -> value[; key1 -> value1[; ...]]  
] *)
const ledger : map(address, nat) = map [];
const big_ledger : big_map(address, nat) = map [Tezos.sender -> 100n;];
```

Second, Ligo doesn't have default values for absent members. The value retrieved from the map is of `option` type.  `None` is returned If the key doesn't exist, and `Some(value)` otherwise:

```jsx
const my_balance : option (nat) = ledger [Tezos.sender] 
```

Third, it is possible to iterate over the `map`.  But the iterated operation has no return value: its only useful for causing side-effects or checking some requirements. 

```jsx
function check_balance (const user : address; const balance : nat) : unit is
      if balance > 1n then Unit else (failwith ("Balance too low") : unit)
Map.iter (check_balance, ledger);
```

Commonalities can be explored in the example.