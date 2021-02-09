The Solidity smart contracts have functions visibility such as `external`, `public`, `internal` and `private`. Ligo contracts are organized in a completely different way.  All the functions are internal and the public methods are defined using the first argument of the `main` function. 

Main function takes exactly two arguments - user `action` and on-chain `state` - and return two values - a list of external operations and an updated `state`. When the contract is originated, the initial value of the storage is provided. When a main function is later called, only the parameter is provided, but the type of a main function contains both.

If the `action` is of Variant type its subtypes are interpreted as public functions interface otherwise main function is determined as the `default` entrypoint with the arguments of the same type as `action`. 

Example of the contracts with the only default public function/default entrypoint:

```jsx
type parameter is string

type storage is record [
  counter : nat;
  name    : string
]

type return is list (operation) * storage

function main (const s : string; const store : storage) : return is
  ((nil : list (operation)), store with record [name = s])
```

Example of the contracts with the few public methods/few entrypoints:

```jsx
type parameter is
| Action_A of nat
| Action_B of string

type storage is record [
  counter : nat;
  name    : string
]

type return is list (operation) * storage

function func_A (const n : nat; const store : storage) : return is
  ((nil : list (operation)), store with record [counter = n])

function func_B (const s : string; const store : storage) : return is
  ((nil : list (operation)), store with record [name = s])

function main (const action : parameter; const store : storage): return is
  case action of
  | Action_A (n) -> func_A (n, store)
  | Action_B (s) -> func_B (s, store)
  end
```

**Note:** the name of the entrypoint is the name of variant subtype and not the function itself.

The operations list is the queue of other function calls that should be executed during the transaction. They can involve other contract calls, external XTZ transfers or be directed to the same contract. They will be discussed in the advanced part. 

Read-only functions have a different representation in Ligo and  `pure` / `view` functions are more complicated in Tezos scope. The key difference lays is the requirement to consume the receiver contract address as an argument. So the result of the return value is always sent to another contract as a separate operation. Consider the contract with default view etrypoint that returns its storage to the `contr`:

```jsx
type storage is nat
type return is list (operation) * storage

function main (const contr : contract(storage); var s : storage) : return is
  (list [transaction(s, 0tz, contr)], s)
```

How the contract `contr` processes the received value is out of this chapter's scope.