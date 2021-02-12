Enums are one way to create a user-defined type in Solidity. They are explicitly convertible to and from all integer types. Ligo doesn't have enumerations but introduces variant types instead.

A variant type is a user-defined type representing data that may take on multiple different forms, where each form is marked by an explicit tag. The simplest example that works in the same way as an enumerator: 

```jsx
type day is 
| Sunday 
| Monday
| Tuesday
| Wednesday
| Thursday
| Friday 
| Saturday

const exent_time : day = Wednesday
const weekend : day = Saturday
```

Another related Ligo-spesific type is an option. 

An option type is the built-in type that represents an encapsulation of an optional value. Example usage:

```jsx
const nothing : option(nat) = (None: option (nat));
const value : option(nat) = Some(10n);
```

But indeed, it can be something more complex:

```jsx
type action
| Write of string
| Read of address
| Idle

const act : action = Read(Tezos.sender)

case act of
| Write(a) -> { skip (*...do something *)}
| Read(a) -> { skip (*...do something *)}
| Idle -> { skip (*...do something *)}
end 
```

The last construction is called pattern matching. The syntax for options is the same but only two subtypes are available - Some and None. 

Despite such a feature, there is the only disadvantage of using the variant type instead of Solidity enum: it cannot be compared or converted to numbers. That is why in some cases, it is worth using the constants. 

If you prefer to use variant type as a true Ligo developer but you still need the comparison, pattern matching is the key. Consider the example below:

```jsx
type status is ON | OF

const device0_status : status = ON;
const device1_status : status = ON;
    
const is_status_equal : bool = case device0_status of
  | ON -> case device1_status of
    | ON -> True
    | OF -> False
    end
  | OF -> case device1_status of
    | ON -> False
    | OF -> True
    end
  end
```

**Task**

Modify the example:

1. Replace enum with varian type `Direction` with 4 options without arguments.
2. Replace `correctDirection` intialization and both  `self.direction` and `correctDirection` assignment 
3. Implement direction comparison based on pattern matching
