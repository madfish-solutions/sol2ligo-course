In Ligo variables and constants are declared with keyword `var` and `cost`  as following:
```jsx
var var_name : var_type := value;
const const_name : const_type = value;
```

Unlike Solidity, Ligo allows to declare constants both in function block and in the global scope, pass constants as function arguments. 

On the other hand, Ligo doesn't have a default values so the value should be explicitly set during declaration. Such a construction will raise an error:

```jsx
var name : nat;
```
    
**Note:** despite the `bool b` is reassigned in the code, transpiler converts it into a constant variable. Ligo compiler won't throw an error in this case: `const/var` separation is designed for the developer experience.
