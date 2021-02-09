There are fixed and dynamic-sized arrays in Solidity. Their elements can be accessed by index and the type member `length` is defined. The dynamic arrays also have `push` and `pop` operators.  

Ligo doesn't have the exact type that implements all the operations that can be done on the Solidity array but it introduces 3 other collection types: tuples, lists, sets.

[Comparison](https://www.notion.so/cc2793612ebd4ad3b30845b5019f6a06)

Each type deserves more attention and will be discussed in depth further. 

Another approach to simulate the Solidity arrays functionality is to use maps with numeric keys.  But it isn't the advised path of the respected Ligo ninja.