Set is the unordered dynamic-sized array of unique values of the same type. Just like in lists elements cannot be accessed by index but the defined operations include iterations, adding and removing elements, checking if the element is present.

Consider set basic syntax that resembles operations on lists:

```jsx
(* syntax: const set_name : set(element_type) = set[ element0[; element1[;...]] ] *)
(* empty sets *)
var s : set(int) = set[];
s := (set[] : set(nat));

(* set with initial elements *)
s := set[1; 2; 3;];

(* syntax: set_name := Set.add(element, set_name) *)
(* adding to set *)
s := Set.add(4, s);

(* syntax: set_name := Set.remove(element, set_name) *)
(* removing from set *)
s := Set.remove(1, s);

(* syntax: Set.size(set_name) *)
(* get set size *)
const len : nat = Set.size(s);

(* syntax: set_name contains element *)
(* check element presents *)
const exists : bool = s contains 5;
```

Iteration operations are the same as for lists but denoted by `Set.iter`, `Set.fold`, `Set.map`.

**Task**

Update the example below using sets:

1. Replace `a1` type inside the `state` type with set of `nat`  type
2. Update `a1` declaration
3. Update the loop for checking if the element exists in collection using `contains` 
4. Add element at the index by  `Set.add` operation
5. Remove the first added element `1n` by `Set.remove` operation; note: as set isn't ordered collection, the elements are deleted by value but not index.