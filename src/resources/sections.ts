export const sections = [
  {
    title: "Contract structure",
    description: `Both Ethereum and Tezos contracts consist of Code and State parts but they are organized differently. Whereas Solidity contracts resemble classes Ligo contracts are set of functions. 'main' is the key entrypoint that introduces public functions and contract storage. 


It has exactly two arguments - parameters and state - and return two parameters - a list of external operations and an updated state. If the type of action is of Variant type its subtypes are interpreted as public functions interface otherwise main function is determined as the default entrypoint. 


Don't worry if it seems too complicated to grasp: each construction is explained in future chapters. The goal of this one is to show the high-level difference that has an impact on how the code is organized.`,
    solidity: `contract Thing {
  uint private quality;
  address public owner;

  function changeOwner(address newOwner) public {
      owner = newOwner;
  }
  function makeBetter() public {
      quality++;   
  }
  function makeWorse() public{
      quality--;   
  }
}`,
    ligo: `type changeOwner_args is record
  newOwner : address;
end;

type makeBetter_args is unit;
type makeWorse_args is unit;
type state is record
  quality : nat;
  owner : address;
end;

type router_enum is
 | ChangeOwner of changeOwner_args
 | MakeBetter of makeBetter_args
 | MakeWorse of makeWorse_args;

function changeOwner (const self : state; const newOwner : address) : (state) is
  block {
    self.owner := newOwner;
  } with (self);

function makeBetter (const self : state) : (state) is
  block {
    self.quality := (self.quality + 1n);
  } with (self);

function makeWorse (const self : state) : (state) is
  block {
    self.quality := (self.quality - 1n);
  } with (self);

function main (const action : router_enum; const self : state) : (list(operation) * state) is
  (case action of
  | ChangeOwner(match_action) -> ((nil: list(operation)), changeOwner(self, match_action.newOwner))
  | MakeBetter(match_action) -> ((nil: list(operation)), makeBetter(self))
  | MakeWorse(match_action) -> ((nil: list(operation)), makeWorse(self))
  end);
`,
  },
  {
    title: "Functions & Function Modifiers",
    description: `
It is reasonable to start with an explanation of the function's syntax. They are the major building block of the contract and during the whole course, the examples will be provided inside the contract functions. Due to such an approach, the code can be copied, compiled, and deployed to the network on the fly.

Functions in Ligo are defined using the \`function\` keyword followed by their name, parameters, return type definitions and body.
    
\`\`\`jsx
function func_name (var arg0 : arg0_type[; var arg1 : arg1_type[ ... ]]) : return is 
  block {...} with return_value
\`\`\`
    
If few instructions should be executed, the body is block constructions.
    
\`\`\`jsx
function increment (var n : int) : int is 
  block { 
    n := n + 1n;
    n := n + 3n;
  } with n
\`\`\`
    
If the logic can be represented by a single expression than block can be omitted. 
    
\`\`\`jsx
function increment (var n : int) : int is n + 4n
\`\`\`
    
There are no modifiers and analogs for Solidity view/pure functions.
    
In Ligo at list one argument and any return value must be present. In the example below, if the function doesn't require any arguments, in Ligo it consumes one argument of \`unit\` type (similar to \`void\` in C/C++; nothing). The same applies to functions without return value (that are absolutely pointless in Tezos): the return value and its type is replaced by \`unit\`.`,
    solidity: `contract Test {

	function funcWithoutArguments() public {
	    uint i = 0;
        i++;
	}

	function funcWithArguments(address user) public {
	    require(msg.sender == user);
	}

	function funcWithReturn() public returns (bool){
	    return false;
	}
}`,
    ligo: `function funcWithoutArguments (const res__unit : unit) : (unit) is
  block {
    const i : nat = 0n;
    i := i + 1n;
  } with (unit);

function funcWithArguments (const user : address) : (unit) is
  block {
    assert((Tezos.sender = user));
  } with (unit);

function funcWithReturn (const res__unit : unit) : (bool) is
  block {
    skip
  } with (False);`,
  },
  {
    title: "Variables and Constants",
    description: `In Ligo variables and constants are declared with keyword \`var\` and \`cost\`  as following:
\`\`\`jsx
var var_name : var_type := value;
const const_name : const_type = value;
\`\`\`

Unlike Solidity, Ligo allows to declare constants both in function block and in the global scope, pass constants as function arguments. 

On the other hand, Ligo doesn't have a default values so the value should be explicitly set during declaration. Such a construction will raise an error:

\`\`\`jsx
var name : nat;
\`\`\`
    
**Note:** despite the ****\`bool b\` is reassigned in the code, transpiler converts it into a constant variable. Ligo compiler won't throw an error in this case: \`const/var\` separation is designed for the developer experience.`,
    solidity: `contract Test {
	uint256 constant u = 1;  
	function test() public pure {
	   bool b = false;
		 b = true;
     string memory s;
  }
}`,
    ligo: `
type state is unit;

const u : nat = 1n

function test (const res__unit : unit) : (unit) is
  block {
    const b : bool = False;
    b := True;
    const s : string = "";
  } with (unit);`,
  },
  {
    title: "Booleans",
    description: `The type of boolean value is denoted by \`bool\` with 4 defined operators in both languages. The syntax is different but quite clear.

**Note:** the ****equality is checked by single \`=\` the same mark that is used for the constant declaration.`,
    solidity: `contract Test {
	function test() public {
	    bool boolean0 = false;
	    bool boolean1 = true;
        bool boolean = boolean0 && boolean1; 
        boolean = boolean0 || boolean1; 
        boolean = boolean0 == boolean1; 
        boolean = boolean0 != boolean1; 
     }
}
`,
    ligo: `type state is unit;

function test (const res__unit : unit) : (unit) is
  block {
    const boolean0 : bool = False;
    const boolean1 : bool = True;
    const boolean : bool = (boolean0 and boolean1);
    boolean := (boolean0 or boolean1);
    boolean := (boolean0 = boolean1);
    boolean := (boolean0 =/= boolean1);
  } with (unit);`,
  },
  {
    title: "Numbers",
    description: `Solidity has signed and unsigned integers of various sizes: denoted by  \`uint8\` to \`uint256\` in steps of 8 and \`int8\` to \`int256\`. Ligo has only 2 keywords for integers: \`int\` for signed and \`nat\` for unsigned integers.

Ligo supports bit operators and shifts on natural numbers only but allows the comparison and arithmetic operations for all numerical types. Bit operators are declared in \`Bitwise\` namespace& Other operators are quite similar to Solidity syntax. 

Ligo also has a specific numerical type for XTZ units called \`tez\` that uses the same math as other numbers in the language. Literals are ended with suffix \`tez\` for an integer number of XTZ and with \`mutez\` for millionth units of the XTZ. For example:

\`\`\`jsx
const c : tez = 5mutez + 0.000_010tez
\`\`\`

The signed number can be converted to unsigned and vice versa with \`abs\` and \`int\` operator correspondingly.

Integer literals are simple numbers and unsigned are followed with \`n\` suffix:

\`\`\`jsx
const a : int = 5
const b : nat = 5n
\`\`\`

Time is represented by unsigned integers are used in Solidity, but the TVM introduces own type for time - \`timestamp\`. Only addition, subtraction, and comparison are defined for the type.`,
    solidity: `contract Test {
function testInt() public {
    // declaration
    int i0 = 5;
    int i1 = 4;
  
  // comparisons
    bool b = i0 > i1;
    b = i0 >= i1;
    b = i0 < i1;
    b = i0 <= i1;
    b = i0 == i1;
    b = i0 != i1;
    
    // bit operators
    int i = i0 & i1;
    i = i0 | i1;
    i = i0 ^ i1;
    i =  ~i1;
      
    // shift operators
    i = i0 << 1;
    i = i0 >> 1;
    
    // arithmetic operators
    i = i0 + i1;
    i = i0 - i1;
    i = -i1;
    i = i0 / i1;
    i = i0 * i1;
    i = i0 % i1;
  }

function testUint() public {
    // declaration
    uint i0 = 5;
    uint i1 = 4;
  
  // comparisons
    bool b = i0 > i1;
    b = i0 >= i1;
    b = i0 < i1;
    b = i0 <= i1;
    b = i0 == i1;
    b = i0 != i1;
    
    // bit operators
    uint i = i0 & i1;
    i = i0 | i1;
    i = i0 ^ i1;
    i =  ~i1;
      
    // shift operators
    i = i0 << 1;
    i = i0 >> 1;
    
    // arithmetic operators
    i = i0 + i1;
    i = i0 - i1;
    i = i0 / i1;
    i = i0 * i1;
    i = i0 % i1;
  }

  function testTime() public {
    uint time = now;
  }
}`,
    ligo: `type state is unit;

function testInt (const res__unit : unit) : (unit) is
  block {
    const i0 : int = 5;
    const i1 : int = 4;
    const b : bool = (i0 > i1);
    b := (i0 >= i1);
    b := (i0 < i1);
    b := (i0 <= i1);
    b := (i0 = i1);
    b := (i0 =/= i1);
    const i : int = int(Bitwise.and(abs(i0), abs(i1)));
    i := int(Bitwise.or(abs(i0), abs(i1)));
    i := int(Bitwise.xor(abs(i0), abs(i1)));
    i := not (i1);
    i := int(Bitwise.shift_left(abs(i0), abs(1)));
    i := int(Bitwise.shift_right(abs(i0), abs(1)));
    i := (i0 + i1);
    i := (i0 - i1);
    i := -(i1);
    i := (i0 / i1);
    i := (i0 * i1);
    i := int(i0 mod i1);
  } with (unit);

function testUint (const res__unit : unit) : (unit) is
  block {
    const i0 : nat = 5n;
    const i1 : nat = 4n;
    const b : bool = (i0 > i1);
    b := (i0 >= i1);
    b := (i0 < i1);
    b := (i0 <= i1);
    b := (i0 = i1);
    b := (i0 =/= i1);
    const i : nat = Bitwise.and(i0, i1);
    i := Bitwise.or(i0, i1);
    i := Bitwise.xor(i0, i1);
    i := abs(not (i1));
    i := Bitwise.shift_left(i0, 1n);
    i := Bitwise.shift_right(i0, 1n);
    i := (i0 + i1);
    i := abs(i0 - i1);
    i := (i0 / i1);
    i := (i0 * i1);
    i := (i0 mod i1);
  } with (unit);

function testTime (const res__unit : unit) : (unit) is
  block {
    const time : nat = abs(now - ("1970-01-01T00:00:00Z" : timestamp));
  } with (unit);
`,
  },
  {
    title: "Addresses",
    description: `Tezos and Ethereum addresses have a different format that is why the address literals cannot be transpiled properly. The code below won't be compiled because of the line:

\`\`\`jsx
a := (0xd27aCC8Eec0E6285c81972B5eEcd8dA241a4bCb5 : address);
\`\`\`

There are no special syntax to declare the address literal so the literals are represented by strings casted to address type. The following literal is correct:

\`\`\`jsx
a := ("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" : address);
\`\`\`

The \`address(0)\` is usually used as burn address in Ethereum. To preserve the principle, it is advised to use some specially designed address from which nobody has the key. I.e the \`"tz1ZZZZZZZZZZZZZZZZZZZZZZZZZZZZNkiRg"\`.

Both languages support comparison operations for the type.`,
    solidity: `contract Test {
	function test(address a0, address a1) public {
        bool b = a0 == a1;
        b = a0 != a1;
        b = a0 > a1;
        b = a0 >= a1;
        b = a0 < a1;
        b = a0 <= a1;
        address a = msg.sender;
        a = address(0);
        a = 0xd27aCC8Eec0E6285c81972B5eEcd8dA241a4bCb5;
    }
}`,
    ligo: `type state is unit;

const burn_address : address = ("tz1ZZZZZZZZZZZZZZZZZZZZZZZZZZZZNkiRg" : address);
function test (const a0 : address; const a1 : address) : (unit) is
  block {
    const b : bool = (a0 = a1);
    b := (a0 =/= a1);
    b := (a0 > a1);
    b := (a0 >= a1);
    b := (a0 < a1);
    b := (a0 <= a1);
    const a : address = Tezos.sender;
    a := burn_address;
    a := (0xd27aCC8Eec0E6285c81972B5eEcd8dA241a4bCb5 : address);
  } with (unit);`,
  },
  {
    title: "Bytes and Strings ",
    description: `There are fixed- and dynamically-size byte arrays, strings in Solidity. Ligo has string type denoted by \`string\` and the only byte array type - \`bytes\`.

The Solidity bytes support comparison, bit and shift operations as well as index access. Meanwhile, Ligo bytes are less flexible and support comparison, slices, concatenation, packing, and unpacking.

The operations have the following syntax:

\`\`\`jsx
(* concat: Bytes.concat(bytes0 , bytes1) *)
const b0 : bytes = Bytes.concat(("42" : bytes), ("21" : bytes));

(* slice: Bytes.sub(start_index,length, bytes0) *)
const b1 : bytes = Bytes.sub(1n, 1n, b0);

(* comparison: bytes0 = bytes1 *)
const b : bool = b0 = b1;

(* pack: Bytes.pack(any_value) *)
const packed : bytes = Bytes.pack(b);

(* unpack: Bytes.unpack(bytes0) *)
const unpacked : option(bool) = Bytes.unpack(packed);

(* get length: bytes0.length *)
const len : nat = b1.length;
\`\`\`

Strings resemble the Solidity strings with defined concatenation and slicing operators.  

In the example below the code won't be compiled because access by the index isn't supported in Ligo. Nevertheless, the true Ligo developer could overcome it by such a line:

\`\`\`jsx
const b : bytes = Bytes.sub(0n, 1n, b0);
\`\`\``,
    solidity: `contract Test {
      
  function testFixedSized() public {
    bytes1 b0;
    bytes1 b1 = 0x42;
    bytes3 b2 = 0x222222;
    bytes3 b3 = hex"32";

    byte b = b0[0];
    uint len = b3.length;
    bool check = b0 == b1;
    check = b0 > b1;
    check = b0 >= b1;
    check = b0 < b1;
    check = b0 <= b1;
  }

  function testDynamicSized() public {
    bytes memory b0 = new bytes (0);
    bytes memory b1 = new bytes (20);

    byte b = b1[2];
  }

  function testString() public {
    string memory s0 = "Love Tezos";
    string memory s1 = s0;
  }
}`,
    ligo: `type state is unit;

function testFixedSized (const res__unit : unit) : (unit) is
  block {
    const b0 : bytes = ("00": bytes);
    const b1 : bytes = 0x42;
    const b2 : bytes = 0x222222;
    const b3 : bytes = 0x50;
    const b : bytes = (case b0[0n] of | None -> UNKNOWN_TYPE_DEFAULT_VALUE_byte | Some(x) -> x end);
    const len : nat = b3.length;
    const check : bool = (b0 = b1);
    check := (b0 > b1);
    check := (b0 >= b1);
    check := (b0 < b1);
    check := (b0 <= b1);
  } with (unit);

function testDynamicSized (const res__unit : unit) : (unit) is
  block {
    const b0 : bytes = ("00": bytes) (* args: 0 *);
    const b1 : bytes = ("00": bytes) (* args: 20 *);
    const b : bytes = (case b1[2n] of | None -> UNKNOWN_TYPE_DEFAULT_VALUE_byte | Some(x) -> x end);
  } with (unit);

function testString (const res__unit : unit) : (unit) is
  block {
    const s0 : string = "Love Tezos";
    const s1 : string = s0;
  } with (unit);`,
  },
  {
    title: "Enumerations + Practice 0",
    description: `Enums are one way to create a user-defined type in Solidity. They are explicitly convertible to and from all integer types. Ligo doesn't have enumerations but introduces variant types instead.

A variant type is a user-defined type represented data that may take on multiple different forms, where each form is marked by an explicit tag. The simplest example that works in the same way as an enumerator: 

\`\`\`jsx
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
\`\`\`

Another related Ligo-spesific type is an option. 

An option type is the built-in type that represents an encapsulation of an optional value. Example usage:

\`\`\`jsx
const nothing : option(nat) = (None: option (nat));
const value : option(nat) = Some(10n);
\`\`\`

But indeed, it can be something more complex:

\`\`\`jsx
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
\`\`\`

The last construction is called pattern matching. The syntax for options is the same but only two subtypes are available - Some and None. 

Despite such a feature, there is the only disadvantage of using the variant type instead of Solidity enum: it cannot be compared or converted to numbers. That is why in some cases, it is worth using the constants. 

If you prefer to use variant type as a true Ligo developer but you still need the comparison, pattern matching is the key. Consider the example below:

\`\`\`jsx
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
\`\`\`

**Task**

Modify the example:

1. Replace enum with varian type \`Direction\` with 4 options without arguments.
2. Replace \`correctDirection\` intialization and both  \`self.direction\` and \`correctDirection\` assignment 
3. Implement direction comparison based on pattern matching`,
    solidity: `contract Test {
  enum Direction { Left, Right, Straight, Back }
  Direction public direction = Direction.Back;

	function test() public {
    Direction correctDirection;
    direction = correctDirection;
    correctDirection = Direction.Straight;
    bool check = correctDirection == direction;
    check = uint(correctDirection) == uint(direction);
  }
}`,
    ligo: `type state is record
  direction : nat;
end;

const direction_Left : nat = 0n;
const direction_Right : nat = 1n;
const direction_Straight : nat = 2n;
const direction_Back : nat = 3n;
(* enum Direction converted into list of nats *)

function test (const self : state) : (state) is
  block {
    const correctDirection : nat = 0n;
    self.direction := correctDirection;
    correctDirection := direction_Straight;
    const check : bool = (correctDirection = self.direction);
    check := (abs(correctDirection) = abs(self.direction));
  } with (self);`,
  },
  {
    title: "Elementary Types Summary",
    description: `Value, or elementary, types are the type variables of which are always passed by value. In Solidity, they include: 

- booleans
- integers
- addresses
- fixed-sized byte arrays
- contract types
- enumerations
- some types of literals.

**Note:** all Michelson primitives are loaded to the stack directly.  There is no such a term as variables under the hood. So the separation to value and reference type isn't applicable for Ligo. 

Ligo booleans resemble the Solidity type. 

The \`int\` is used instead of \`intX\` and \`nat\` type is used instead of \`uintX\`.

The addresses are quite interesting. Ethereum addresses have a different format compared to Tezos. In Solidity they are represented by bytes20 array meanwhile in Ligo there are no native address literals but base58check string can be converted to address type with \`(addr_str: address)\` expression. Sol2Ligo doesn't transpile it properly and Ligo compiler will throw an error in order the developer can notice the wrong address format. 

Bytes in Ligo are represent as a hex number but not strings. 

There is no enumeration type. In most cases variant type can replace it. The only downside is that it can not be converted to integers(that is the reason why transpiler doesn't convert Solidity enums to variant type).

Ligo also provide the type for XTZ token units. For instance:
\`\`\`jsx
const amount : tez = 10mutez; 
\`\`\`

**Note:** the true Ligo developer would replace:

\`\`\`jsx
const langEnum_LIGO : nat = 0n;
const langEnum_SOL : nat = 1n;
...
const langEnum : nat = langEnum_SOL;
\`\`\`

with:

\`\`\`jsx
type langEnum is
| LIGO
| SOL
...
const langEnum : LangEnum = SOL;
\`\`\``,
    solidity: `contract Test {
  enum LangEnum { LIGO, SOL }  
	function test() public {
        // boolean
    bool boolean = false;  
  
    // integers
    int32  intVar0 = -603;
    int256  intVar1 = -60313; 
    uint32  uintVar0 = 60313; 
    uint128  uintVar1 = 613; 
    
    // address
    address addressVar = 0x0000000000000000000000000000000000000000;

    // bytes & strings
    string  memory str = "TezosIsTheBest";
    bytes memory b0  = "0121";
    bytes1 b1 = "a";  
    
    // enumerations
    LangEnum langEnum = LangEnum.SOL;
  }
}`,
    ligo: `type state is unit;

const langEnum_LIGO : nat = 0n;
const langEnum_SOL : nat = 1n;
(* enum LangEnum converted into list of nats *)

function test (const res__unit : unit) : (unit) is
  block {
    const boolean : bool = False;
    const intVar0 : int = -(603);
    const intVar1 : int = -(60313);
    const uintVar0 : nat = 60313n;
    const uintVar1 : nat = 613n;
    const addressVar : address = (0x0000000000000000000000000000000000000000 : address);
    const str : string = "TezosIsTheBest";
    const b0 : bytes = 0x48495049;
    const b1 : bytes = 0x97;
    const langEnum : nat = langEnum_SOL;
  } with (unit);`,
  },
  {
    title: "Structures",
    description: `Ligo records serve as Solidity structures. A record is made of a set of fields, which are made of a field name and a field type. Given a value of a record type, the value bound to a field can be accessed by giving its field name to a special operator (\`.\`).

There is a special generated "default" Person - \`test_Person_default\`  used for assignment the \`defaultPerson\`.  It is needed as unlike Solidity,  Ligo doesn't have build-in default values for types but all variables must be assigned during the declaration.`,
    solidity: `contract Test {
  struct Person {
      address payable account;
      uint age;
      uint skill;
      uint bet;
      mapping (address => uint) referralRewards;
  }

  function test() public {
    Person memory person = Person(msg.sender, 30, 100, 0);
    Person memory defaultPerson;
  }
}`,
    ligo: `type test_Person is record
  account : address;
  age : nat;
  skill : nat;
  bet : nat;
  referralRewards : map(address, nat);
end;

type state is unit;

const test_Person_default : test_Person = record [ account = burn_address;
  age = 0n;
  skill = 0n;
  bet = 0n;
  referralRewards = (map end : map(address, nat)) ];

function test (const res__unit : unit) : (unit) is
  block {
    const person : test_Person = record [ account = Tezos.sender;
      age = 30;
      skill = 100;
      bet = 0 ];
    const defaultPerson : test_Person = test_Person_default;
  } with (unit);`,
  },
  {
    title: "Mappings",
    description: `Both Ligo and Solidity have mapping types but they act quite differently. 

First, there are two types of mappings: 

- \`map\` : used for small amount of entries and is fully deserialized before contract execution
- \`big_map\` : designed for big number of entries and the needed values are loaded by request.

They are declared as: 

\`\`\`jsx
(* syntax: var name: map : map(key_type, value_type) = map[ 
  key0 -> value[; key1 -> value1[; ...]]  
] *)
const ledger : map(address, nat) = map [];
const big_ledger : big_map(address, nat) = map [Tezos.sender -> 100n;];
\`\`\`

Second, Ligo doesn't have default values for absent members. The value retrieved from the map is of \`option\` type.  \`None\` is returned If the key doesn't exist, and \`Some(value)\` otherwise:

\`\`\`jsx
const my_balance : option (nat) = ledger [Tezos.sender] 
\`\`\`

Third, it is possible to iterate over the \`map\`.  But the iterated operation has no return value: its only useful for causing side-effects or checking some requirements. 

\`\`\`jsx
function check_balance (const user : address; const balance : nat) : unit is
      if balance > 1n then Unit else (failwith ("Balance too low") : unit)
Map.iter (check_balance, ledger);
\`\`\`

Commonalities can be explored in the example.`,
    solidity: `contract Test {
    mapping(int => int) public m;

  function test() public {
        m[4] = 8;
        m[15] = m[16];
        delete m[23];
      }
}`,
    ligo: `type state is record
  m : map(int, int);
end;

function test (const self : state) : (state) is
  block {
    self.m[4] := 8;
    self.m[15] := (case self.m[16] of | None -> 0 | Some(x) -> x end);
    remove 23 from map self.m;
  } with (self);`,
  },
  {
    title: "Array-like types",
    description: `There are fixed and dynamic-sized arrays in Solidity. Their elements can be accessed by index and the type member \`length\` is defined. The dynamic arrays also have \`push\` and \`pop\` operators.  

Ligo doesn't have the exact type that implements all the operations that can be done on the Solidity array but it introduces 3 other collection types: tuples, lists, sets.

[Comparison](https://www.notion.so/cc2793612ebd4ad3b30845b5019f6a06)

Each type deserves more attention and will be discussed in depth further. 

Another approach to simulate the Solidity arrays functionality is to use maps with numeric keys.  But it isn't the advised path of the respected Ligo ninja.`,
    solidity: `
contract Test {
    uint[] a1;
    
  function testFixedSized() public {
        uint[4] memory a0 = [uint(1), 2, 3, 4];

        uint len = a0.length;
        uint element = a0[1];
      }
      
  function testDynamicSized() public {
        a1 = new uint[](5);
        
        uint len = a1.length;
        uint element = a1[1];
        
        a1.push(1);
        // a1.pop();
      }
}`,
    ligo: `type state is record
  a1 : map(nat, nat);
end;

function testFixedSized (const res__unit : unit) : (unit) is
  block {
    const a0 : map(nat, nat) = map
      0n -> abs(1);
      1n -> 2n;
      2n -> 3n;
      3n -> 4n;
    end;
    const len : nat = size(a0);
    const element : nat = (case a0[1n] of | None -> 0n | Some(x) -> x end);
  } with (unit);

function testDynamicSized (const self : state) : (state) is
  block {
    self.a1 := map end (* args: 5 *);
    const len : nat = size(self.a1);
    const element : nat = (case self.a1[1n] of | None -> 0n | Some(x) -> x end);
    const tmp_0 : map(nat, nat) = self.a1;
    tmp_0[size(tmp_0)] := 1n;
  } with (self);`,
  },
  {
    title: "Tuples + Practice 1",
    description: `Tuples are fixed-size arrays that can contain a number of elements of different types in the given order and that are accessible by index.

The tuples definition and accessing by index is presented in the example below:

\`\`\`jsx
(* syntax: const tuple_name : type0 [* type1 [...]] = (value0[, value1[,...]] *)
const pasport_code : string * nat = ("XP", "31432154928");
(* syntax: tuple_name.index *)
const serial_number : string = pasport_code.0;
\`\`\`

**Task**

Update the example from previous task using tuples:

1. Replace \`a1\` type inside the \`state\` type with tuple of 4 \`nat\`  elements
2. Update \`a1\` declaration
3. Set \`len\` to \`4n\`, as the tuples doesn't have the size method.
4. Get the first element of the tuple and store it to  \`element\` variable.`,
    solidity: `contract Test {
  uint[] a1;
    
	function testFixedSized() public {
    uint[4] memory a0 = [uint(1), 2, 3, 4];

    uint len = a0.length;
    uint element = a0[1];
  }
}`,
    ligo: `type state is record
  a1 : map(nat, nat);
end;

function testFixedSized (const res__unit : unit) : (unit) is
  block {
    const a0 : map(nat, nat) = map
      0n -> abs(1);
      1n -> 2n;
      2n -> 3n;
      3n -> 4n;
    end;
    const len : nat = size(a0);
    const element : nat = (case a0[1n] of | None -> 0n | Some(x) -> x end);
  } with (unit);`,
  },
  {
    title: "Lists + Practice 2",
    description: `The list is a dynamic-sized lineal collection of values of the same type.  Elements cannot be deleted or accessed by index. Linear means that, in order to reach an element in a list, we must visit all the elements before, and thus there are only operations to iterate through the lists.

Consider the definition of the list and adding the elements to it:

\`\`\`jsx
(* syntax: const list_name : list(element_type) = list[ element0[; element1[;...]] ] *)
(* empty lists *)
var l : list(int) = list[];
l := (nil : list(nat));

(* list with initial elements *)
l := list[1; 2; 3;];

(*syntax: list_name := element # list_name; *)
(* adding to list *)
l := 4 # l;
\`\`\`

There are 3 types of iterations: \`iter\`, \`fold\`, \`map\`.

The iterated operation is an iteration over the list with a unit return value. It is useful to enforce certain invariants on the element of a list or fail. Usage:

\`\`\`jsx
function iterate (const i : int) : unit is
    if i > 3 then Unit else (failwith ("Too big") : unit)
var l : list(int) = list[1; 2; 3;];
List.iter (iterate, l);
\`\`\`

Map operation changes all the elements of a given list by applying to them a function. Can be used for deleting an element from the collection. Example:

\`\`\`jsx
var l : list(int) = list[1; 2; 3;];    
var index : nat = 0n;
var counter : nat = 0n;
function delete_by_index (const element : nat): nat is 
  block {
    counter := counter + 1n;
  } with if counter = index then 0n else element;  
l := List.map (delete_by_index, l);
\`\`\`

A folded operation is an iteration over the list with an accumulated return value. The folded function takes two arguments: an accumulator and the structure element at hand, with which it then produces a new accumulator. The last accumulator is returned from the function. Can be considered as an expensive way to get the element at a given index. 

\`\`\`jsx
var l : list(int) = list[1; 2; 3;];    
var index : nat = 0n;
var counter : nat = 0n;
function get_by_index (const found : nat; const element : nat): nat is 
  block {
    counter := counter + 1n;
  } with if counter = index then element else found;  
const element : nat = List.fold (get_by_index, l, 0n);
\`\`\`

**Task**

Update the example from previous task using lists:

1. Replace \`a1\` type inside the \`state\` type with list of \`nat\`  type
2. Update \`a1\` declaration
3. Find the element at the index by  \`List.fold\` operation
4. Add element \`1n\` in the end of the list
5. Remove the element at the index by \`List.map\` operation.`,
    solidity: `contract Test {
  uint[] a1;
    
	function testDynamicSized() public {
    a1 = new uint[](5);
    
    uint len = a1.length;
    uint element = a1[1];
    
    a1.push(1);
    delete a1[0];
    // a1.pop();
  }
}`,
    ligo: `type state is record
a1 : map(nat, nat);
end;

function testDynamicSized (const self : state) : (state) is
block {
  self.a1 := map end (* args: 5 *);
  const len : nat = size(self.a1);
  const element : nat = (case self.a1[1n] of | None -> 0n | Some(x) -> x end);
  const tmp_0 : map(nat, nat) = self.a1;
  tmp_0[size(tmp_0)] := 1n;
  remove 0n from map self.a1;
} with (self);`,
  },
  {
    title: "Sets + Practice  3",
    description: `Set is the unordered dynamic-sized array of unique values of the same type. Just like in lists elements cannot be accessed by index but the defined operations include iterations, adding and removing elements, checking if the element is present.

Consider set basic syntax that resembles operations on lists:

\`\`\`jsx
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
\`\`\`

Iteration operations are the same as for lists but denoted by \`Set.iter\`, \`Set.fold\`, \`Set.map\`.

**Task**

Update the example below using sets:

1. Replace \`a1\` type inside the \`state\` type with set of \`nat\`  type
2. Update \`a1\` declaration
3. Update the loop for checking if the element exists in collection using \`contains\` 
4. Add element at the index by  \`Set.add\` operation
5. Remove the first added element \`1n\` by \`Set.remove\` operation; note: as set isn't ordered collection, the elements are deleted by value but not index.`,
    solidity: `contract Test {
  uint[] a1;
    
  function testDynamicSized() public {
    a1 = new uint[](5);
    
    uint len = a1.length;

    bool isInArray;
    
    for (uint i=0; i < a1.length; i++) {
        isInArray = a1[i] == 5 ? true : isInArray;
    }
    
    a1.push(1);
    delete a1[0];
  }
}`,
    ligo: `type state is record
  a1 : map(nat, nat);
end;

function testDynamicSized (const self : state) : (state) is
  block {
    self.a1 := map end (* args: 5 *);
    const len : nat = size(self.a1);
    const isInArray : bool = False;
    const i : nat = 0n;
    while (i < size(self.a1)) block {
      isInArray := (case ((case self.a1[i] of | None -> 0n | Some(x) -> x end) = 5n) of | True -> True | False -> isInArray end);
      i := i + 1n;
    };
    const tmp_0 : map(nat, nat) = self.a1;
    tmp_0[size(tmp_0)] := 1n;
    remove 0n from map self.a1;
  } with (self);`,
  },
  {
    title: "Complex Types Summary",
    description: `There are 3 complex types in Solidity:

- arrays;
- structs;
- mappings.

Meanwhile Ligo is more diverse:

- Records: struct-like objects, the fields can be accessed and modified by name; fields can be any types, except \`big_map\`;
- Tuples: fixed-size array that can contain elements of different types; elements can be  accessed by index;
- Lists: a dynamic-sized array of the same type, elements cannot be deleted or accessed by index; there are operations to iterate through the lists;
- Sets: dynamic-sized array with unique values of the same type, elements cannot be accessed by index; there are operations to iterate, add, remove, check if the element is present;
- Maps and big maps: dictionaries, big maps are cheaper to use and their values are accessed by keys only meanwhile maps consume more gas but there is an operation to iterate through its pairs.
- Options: None/Some wrapper;
- Units: absence of type, similar to \`void\` in C/C++;
- Variants: the type, that wraps some other types, similar to unions.

Ligo doesn't support the type that implements all the operations that can be done on Solidity array so migration from one language to another can be quite tricky. sol2ligo transpiles arrays to maps but it may be an inappropriate approach for the particular solution.  

The other mentioned types are declared as following and were discussed in previous chapters:

\`\`\`jsx
// tuple
const t : (nat * int) = (10n * 1);
// list
const l : list(nat) = list [21n; 42n; 21n];
// set
const s : set(nat) = set [1n; 2n; 3n];
// map
\`\`\``,
    solidity: `contract Test {
  mapping(address => uint) public addressToUintMap;
  uint[] public uArray;
  struct SimpleSruct {
      string s;
      bytes b;
  }
    
  function test() public view {
      int32[3] memory iArray = [-11335678, 2343, 321323];
      SimpleSruct memory s = SimpleSruct("Ligo", "42");
  }
}`,
    ligo: `type test_SimpleSruct is record
  s : string;
  b : bytes;
end;

type state is record
  addressToUintMap : map(address, nat);
  uArray : map(nat, nat);
end;

const test_SimpleSruct_default : test_SimpleSruct = record [ s = "";
  b = ("00": bytes) ];

function test (const res__unit : unit) : (unit) is
  block {
    const iArray : map(nat, int) = map
      0n -> -(11335678);
      1n -> 2343;
      2n -> 321323;
    end;
    const s : test_SimpleSruct = record [ s = "Ligo";
      b = "42" ];
  } with (unit);
  `,
  },
  {
    title: "Type Aliases + Practice 4",
    description: `Despite simplicity, Ligo has some features that are not present in Solidity but that makes the developer's life better. One of them is type aliases denoted by \`type\` keyword.

For instance:

\`\`\`jsx
type language is string
type chain is string
const blockchain_info : (language * chain) = ("Archetype", "Tezos")
\`\`\`

**Task**

Let's consider the dummy contract.  \`userBags\` is the mapping of all users belongings in their bags. There are exactly three slots for things and the staff should be placed in the exact order: key, pen, eraser. The \`putBagsThings\` prepare bags for the transaction sender. 

In the Solidity, as you see the code is quite straightforward but the compiled version seems is quite overloaded. 

Refactor the code:

1. Declare alias for \`key_type\` and \`stationery_type\`.
2. Replace the \`map(nat, string)\` with tuple of type \`(key_type * stationery_type * stationery_type\`) 
3. Update key, pen, eraser types
4. Change the step of setting new map value`,
    solidity: `contract Test {
  // user address => [keys, pen, eraser]
  mapping(address => string[3]) public userBags;

  function putBagsThings() public {
    string memory key = "home key";
    string memory pen = "red pen";
    string memory eraser = "small eraser";

    userBags[msg.sender] = [key, pen, eraser];
  }
}`,
    ligo: `type state is record
  userBags : map(address, map(nat, string));
end;

function putBagsThings (const self : state) : (state) is
  block {
    const key : string = "home key";
    const pen : string = "red pen";
    const eraser : string = "small eraser";
    self.userBags[Tezos.sender] := map
      0n -> key;
      1n -> pen;
      2n -> eraser;
    end;
  } with (self);`,
  },
  {
    title: "Conditions",
    description: `In Ligo conditions must have both \`if\` and \`else\` branches and have the following syntax:

\`\`\`jsx
(* syntax: if condition then actions0 else actions1 *)
(* condition with one instruction in branch*)
if a = b then a := 10n else b := 1n;

(* condition with few actions *)
if a = b then block {
  a := 10n;
  b := 0n; 
} else b := 1n;

(* condition with missing block *)
if a = b then a := 10n else skip;
\`\`\``,
    solidity: `contract Test {
	function test() public {
    int a = 3;
    int b = 9;
    if (a == b) a = 10; 
    else b = 1;
    
    if (a == b) {
        a = 10;
        b = 0;
    } else b = 1;
    
    if (a == b) a = 10; 
  }
}`,
    ligo: `type state is unit;

function test (const res__unit : unit) : (unit) is
  block {
    const a : int = 3;
    const b : int = 9;
    if (a = b) then block {
      a := 10;
    } else block {
      b := 1;
    };
    if (a = b) then block {
      a := 10;
      b := 0;
    } else block {
      b := 1;
    };
    if (a = b) then block {
      a := 10;
    } else block {
      skip
    };
  } with (unit);`,
  },
  {
    title: "Typecasting",
    description: `Solidity has a convenient type casting but in Ligo it can be a bit tricky. The example of the most common conversion:
\`\`\`jsx
(* nat <- int *)
const u : nat = abs(1);
(* int <- nat *)
const i : int = int(1n);
(* address <- string *)
const a : address = ("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" : address);
(* tez <- nat *)
const tz : tez = u * 1mutez;
(* nat <- tez *)
const n : nat = tz / 1mutez;
(* tez <- int *)
const t : tez = abs(i) * 1mutez;
(* int <- tez *)
const i : int = int(t / 1mutez);
(* nat <- timestamp *)
const n : nat = abs(now - ("1970-01-01T00:00:00Z" : timestamp));
(* timestamp <- nat *)
const t : timestamp = ("1970-01-01T00:00:00Z" : timestamp) + int(u);
(* timestamp <- int *)
const t : timestamp = ("1970-01-01T00:00:00Z" : timestamp) + i;
(* int <- timestamp *)
const i : int = now - ("1970-01-01T00:00:00Z" : timestamp);
(* bytes <- nat *)
const b : bytes = Bytes.pack(u);
(* nat -> bytes *)
const u : nat = Bytes.unpack(b);
(* bytes <- int *)
const b : bytes = Bytes.pack(i);
(* int -> bytes *)
const i : int = Bytes.unpack(b);
(* bytes <-  tez *)
const b : bytes = Bytes.pack(tz);
(*  tez -> bytes *)
const tz : tez = Bytes.unpack(b);
(* bytes <- timestamp *)
const b : bytes = Bytes.pack(t);
(*  timestamp -> bytes *)
const t : timestamp = Bytes.unpack(b);
(* bytes <- address | string *)
const b : bytes = Bytes.pack(a);
(* address -> bytes *)
const a : address = Bytes.unpack(b);
(* bytes <- string *)
const b : bytes = Bytes.pack("just a string");
(* string-> bytes *)
const s : string = Bytes.unpack(b);
\`\`\``,
    solidity: `contract Test {
  function test() public payable {
      uint u = 1;
      uint i = 1;
      uint uu = uint(i);
      uint ii = uint(u);
      uint n0 = msg.value; 
      uint t0 = now;
    }
}`,
    ligo: `type state is unit;

function test (const res__unit : unit) : (unit) is
  block {
    const u : nat = 1n;
    const i : nat = 1n;
    const uu : nat = abs(i);
    const ii : nat = abs(u);
    const n0 : nat = (amount / 1mutez);
    const t0 : nat = abs(now - ("1970-01-01T00:00:00Z" : timestamp));
  } with (unit);`,
  },
  {
    title: "Loops",
    description: `There are two keywords for iterations in Ligo:  \`for\` and \`while\`. Unlike Solidity, Ligo doesn't support \`continue\` or \`break\` operations. Usage:

\`\`\`jsx
(* syntax:
while condition block {
    action0;
    ...
    actionN;
}; *)
while y =/= 0n block {
    z := x mod y;
    y := y - 1n;
}
(* syntax:
for iterator := init to last block {
    action0;
    ...
    actionN;
} )*
for i := 1 to 10 block {
    acc := acc + i
}
\`\`\`

**Note:** in the example below, the code won't be compiled as the blocks with \`continue\` and \`break\` comments are empty. Add \`skip\` instruction to fix it.`,
    solidity: `contract Test {

	function test() public {
  uint sum;
  uint j;
    for (uint j; j < 10; j++) {
        sum +=j;
    }
    
    sum=0;
    j=0;
    while(j < 10) {
        sum +=j;
        j++;
    }
    
    // sum=0;
    // j=0;
    // do {
    //     sum +=j;
    //     j++;
    // } while (j < 10);
    
    sum=0;
    j=0;
    while(j < 10) {
        if (j == 5) continue;
        sum +=j;
        if (sum % 5 == 1) break;
        j++;
    }
  }
}`,
    ligo: `type state is unit;

function test (const res__unit : unit) : (unit) is
  block {
    const sum : nat = 0n;
    const j : nat = 0n;
    const j : nat = 0n;
    while (j < 10n) block {
      sum := (sum + j);
      j := j + 1n;
    };
    sum := 0n;
    j := 0n;
    while (j < 10n) block {
      sum := (sum + j);
      j := j + 1n;
    };
    sum := 0n;
    j := 0n;
    while (j < 10n) block {
      if (j = 5n) then block {
        (* \`continue\` statement is not supported in LIGO *);
      } else block {
        skip
      };
      sum := (sum + j);
      if ((sum mod 5n) = 1n) then block {
        (* \`break\` statement is not supported in LIGO *);
      } else block {
        skip
      };
      j := j + 1n;
    };
  } with (unit);`,
  },
  {
    title: "Special variables",
    description: `Some of special Solidity variables have analogues in Ligo. 

There is no analogous to \`msg.data\`.

As the current time is of the \`timestamp\` type, the subtraction of the beginning of the Unix epoch is used to convert it to \`nat\`. This step usually should be omitted as most of operations with time can be done with \`timestamp\` and is present only for Solidity compatibility.`,
    solidity: `contract Test {
  function test() public payable {
      address sender = msg.sender;
      address source = tx.origin;
      uint value = msg.value;
      bytes memory data = msg.data;
      uint time = now;
      uint blockTimestamp = block.timestamp;
  }
}`,
    ligo: `type state is unit;

function test (const res__unit : unit) : (unit) is
  block {
    const res__sender : address = Tezos.sender;
    const res__source : address = Tezos.source;
    const value : nat = (amount / 1mutez);
    const data : bytes = ("00": bytes);
    const time : nat = abs(now - ("1970-01-01T00:00:00Z" : timestamp));
    const blockTimestamp : nat = abs(now - ("1970-01-01T00:00:00Z" : timestamp));
  } with (unit);`,
  },
  {
    title: "Imports",
    description: `For convenience, the Ligo has macros for importing the code from local files. It can not be reproduced by transpiler but the syntaxis the following:

\`\`\`jsx
import "./ERC20.sol";
\`\`\`

\`\`\`jsx
#import "./ERC20.ligo"
// or
#import "./ERC20.tz"
\`\`\`

Both Michelson and Ligo files are supported.`,
  },
  {
    title: "Functions visibility and modifiers ",
    description: `The Solidity smart contracts have functions visibility such as \`external\`, \`public\`, \`internal\` and \`private\`. Ligo contracts are organized in a completely different way.  All the functions are internal and the public methods are defined using the first argument of the \`main\` function. 

Main function takes exactly two arguments - user \`action\` and on-chain \`state\` - and return two values - a list of external operations and an updated \`state\`. When the contract is originated, the initial value of the storage is provided. When a main function is later called, only the parameter is provided, but the type of a main function contains both.

If the \`action\` is of Variant type its subtypes are interpreted as public functions interface otherwise main function is determined as the \`default\` entrypoint with the arguments of the same type as \`action\`. 

Example of the contracts with the only default public function/default entrypoint:

\`\`\`jsx
type parameter is string

type storage is record [
  counter : nat;
  name    : string
]

type return is list (operation) * storage

function main (const s : string; const store : storage) : return is
  ((nil : list (operation)), store with record [name = s])
\`\`\`

Example of the contracts with the few public methods/few entrypoints:

\`\`\`jsx
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
\`\`\`

**Note:** the name of the entrypoint is the name of variant subtype and not the function itself.

The operations list is the queue of other function calls that should be executed during the transaction. They can involve other contract calls, external XTZ transfers or be directed to the same contract. They will be discussed in the advanced part. 

Read-only functions have a different representation in Ligo and  \`pure\` / \`view\` functions are more complicated in Tezos scope. The key difference lays is the requirement to consume the receiver contract address as an argument. So the result of the return value is always sent to another contract as a separate operation. Consider the contract with default view etrypoint that returns its storage to the \`contr\`:

\`\`\`jsx
type storage is nat
type return is list (operation) * storage

function main (const contr : contract(storage); var s : storage) : return is
  (list [transaction(s, 0tz, contr)], s)
\`\`\`

How the contract \`contr\` processes the received value is out of this chapter's scope.`,
    solidity: `contract Test {
  uint private data;

  function f(uint a) private pure returns(uint b) { return a + 1; }
  function setData(uint a) public { data = a; }
  function getData() public view returns(uint) { return data; }
  function compute(uint a, uint b) internal pure returns (uint) { return a + b; }
}`,
    ligo: `type setData_args is record
  a : nat;
end;

type getData_args is record
  callbackAddress : address;
end;

type state is record
  data : nat;
end;

type router_enum is
  | SetData of setData_args
 | GetData of getData_args;

function f (const a : nat) : (nat) is
  block {
    const b : nat = 0n;
  } with ((a + 1n));

function setData (const self : state; const a : nat) : (state) is
  block {
    self.data := a;
  } with (self);

function getData (const self : state) : (nat) is
  block {
    skip
  } with (self.data);

function compute (const a : nat; const b : nat) : (nat) is
  block {
    skip
  } with ((a + b));

function main (const action : router_enum; const self : state) : (list(operation) * state) is
  (case action of
  | SetData(match_action) -> ((nil: list(operation)), setData(self, match_action.a))
  | GetData(match_action) -> block {
    const tmp : (nat) = getData(self);
    var opList : list(operation) := list transaction((tmp), 0mutez, (get_contract(match_action.callbackAddress) : contract(nat))) end;
  } with ((opList, self))
  end);`,
  },
];
