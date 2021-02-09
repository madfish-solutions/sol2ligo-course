Value, or elementary, types are the type variables of which are always passed by value. In Solidity, they include: 

- booleans
- integers
- addresses
- fixed-sized byte arrays
- contract types
- enumerations
- some types of literals.

**Note:** all Michelson primitives are loaded to the stack directly.  There is no such a term as variables under the hood. So the separation to value and reference type isn't applicable for Ligo. 

Ligo booleans resemble the Solidity type. 

The `int` is used instead of `intX` and `nat` type is used instead of `uintX`.

The addresses are quite interesting. Ethereum addresses have a different format compared to Tezos. In Solidity they are represented by bytes20 array meanwhile in Ligo there are no native address literals but base58check string can be converted to address type with `(addr_str: address)` expression. Sol2Ligo doesn't transpile it properly and Ligo compiler will throw an error in order the developer can notice the wrong address format. 

Bytes in Ligo are represent as a hex number but not strings. 

There is no enumeration type. In most cases variant type can replace it. The only downside is that it can not be converted to integers(that is the reason why transpiler doesn't convert Solidity enums to variant type).

Ligo also provide the type for XTZ token units. For instance:
```jsx
const amount : tez = 10mutez; 
```

**Note:** the true Ligo developer would replace:

```jsx
const langEnum_LIGO : nat = 0n;
const langEnum_SOL : nat = 1n;
...
const langEnum : nat = langEnum_SOL;
```

with:

```jsx
type langEnum is
| LIGO
| SOL
...
const langEnum : LangEnum = SOL;
```