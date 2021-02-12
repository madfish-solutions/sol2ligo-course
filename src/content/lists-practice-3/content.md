The list is a dynamic-sized lineal collection of values of the same type.  Elements cannot be deleted or accessed by index. Linear means that, in order to reach an element in a list, we must visit all the elements before, and thus there are only operations to iterate through the lists.

Consider the definition of the list and adding the elements to it:

```jsx
(* syntax: const list_name : list(element_type) = list[ element0[; element1[;...]] ] *)
(* empty lists *)
var l : list(int) = list[];
l := (nil : list(nat));

(* list with initial elements *)
l := list[1; 2; 3;];

(*syntax: list_name := element # list_name; *)
(* adding to list *)
l := 4 # l;
```

There are 3 types of iterations: `iter`, `fold`, `map`.

The iterated operation is an iteration over the list with a unit return value. It is useful to enforce certain invariants on the element of a list or fail. Usage:

```jsx
function iterate (const i : int) : unit is
    if i > 3 then Unit else (failwith ("Too big") : unit)
var l : list(int) = list[1; 2; 3;];
List.iter (iterate, l);
```

Map operation changes all the elements of a given list by applying to them a function. Can be used for deleting an element from the collection. Example:

```jsx
var l : list(int) = list[1; 2; 3;];    
var index : nat = 0n;
var counter : nat = 0n;
function delete_by_index (const element : nat): nat is 
  block {
    counter := counter + 1n;
  } with if counter = index then 0n else element;  
l := List.map (delete_by_index, l);
```

A folded operation is an iteration over the list with an accumulated return value. The folded function takes two arguments: an accumulator and the structure element at hand, with which it then produces a new accumulator. The last accumulator is returned from the function. Can be considered as an expensive way to get the element at a given index. 

```jsx
var l : list(int) = list[1; 2; 3;];    
var index : nat = 0n;
var counter : nat = 0n;
function get_by_index (const found : nat; const element : nat): nat is 
  block {
    counter := counter + 1n;
  } with if counter = index then element else found;  
const element : nat = List.fold (get_by_index, l, 0n);
```

**Task**

Update the example from previous task using lists:

1. Replace `a1` type inside the `state` type with list of `nat`  type
2. Update `a1` declaration
3. Find the element at the index by  `List.fold` operation
4. Add element `1n` in the end of the list
5. Remove the element at the index by `List.map` operation.