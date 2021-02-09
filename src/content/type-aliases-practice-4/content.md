Despite simplicity, Ligo has some features that are not present in Solidity but that makes the developer's life better. One of them is type aliases denoted by `type` keyword.

For instance:

```jsx
type language is string
type chain is string
const blockchain_info : (language * chain) = ("Archetype", "Tezos")
```

**Task**

Let's consider the dummy contract.  `userBags` is the mapping of all users belongings in their bags. There are exactly three slots for things and the staff should be placed in the exact order: key, pen, eraser. The `putBagsThings` prepare bags for the transaction sender. 

In the Solidity, as you see the code is quite straightforward but the compiled version seems is quite overloaded. 

Refactor the code:

1. Declare alias for `key_type` and `stationery_type`.
2. Replace the `map(nat, string)` with tuple of type `(key_type * stationery_type * stationery_type`) 
3. Update key, pen, eraser types
4. Change the step of setting new map value