There are 3 complex types in Solidity:

- arrays;
- structs;
- mappings.

Meanwhile Ligo is more diverse:

- Records: struct-like objects, the fields can be accessed and modified by name; fields can be any types, except `big_map`;
- Tuples: fixed-size array that can contain elements of different types; elements can be  accessed by index;
- Lists: a dynamic-sized array of the same type, elements cannot be deleted or accessed by index; there are operations to iterate through the lists;
- Sets: dynamic-sized array with unique values of the same type, elements cannot be accessed by index; there are operations to iterate, add, remove, check if the element is present;
- Maps and big maps: dictionaries, big maps are cheaper to use and their values are accessed by keys only meanwhile maps consume more gas but there is an operation to iterate through its pairs.
- Options: None/Some wrapper;
- Units: absence of type, similar to `void` in C/C++;
- Variants: the type, that wraps some other types, similar to unions.

Ligo doesn't support the type that implements all the operations that can be done on Solidity array so migration from one language to another can be quite tricky. sol2ligo transpiles arrays to maps but it may be an inappropriate approach for the particular solution.  

The other mentioned types are declared as following and were discussed in previous chapters:

```jsx
// tuple
const t : (nat * int) = (10n * 1);
// list
const l : list(nat) = list [21n; 42n; 21n];
// set
const s : set(nat) = set [1n; 2n; 3n];
// map
```