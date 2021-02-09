
It is reasonable to start with an explanation of the function's syntax. They are the major building block of the contract and during the whole course, the examples will be provided inside the contract functions. Due to such an approach, the code can be copied, compiled, and deployed to the network on the fly.

Functions in Ligo are defined using the `function` keyword followed by their name, parameters, return type definitions and body.
    
```jsx
function func_name (var arg0 : arg0_type[; var arg1 : arg1_type[ ... ]]) : return is 
  block {...} with return_value
```
    
If few instructions should be executed, the body is block constructions.
    
```jsx
function increment (var n : int) : int is 
  block { 
    n := n + 1n;
    n := n + 3n;
  } with n
```
    
If the logic can be represented by a single expression than block can be omitted. 
    
```jsx
function increment (var n : int) : int is n + 4n
```
    
There are no modifiers and analogs for Solidity view/pure functions.
    
In Ligo at list one argument and any return value must be present. In the example below, if the function doesn't require any arguments, in Ligo it consumes one argument of `unit` type (similar to `void` in C/C++; nothing). The same applies to functions without return value (that are absolutely pointless in Tezos): the return value and its type is replaced by `unit`.