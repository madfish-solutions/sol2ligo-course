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
      owner = newOwner;̋̋
  }
  function makeBetter() puablic {
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
  },
  {
    title: "Structures",
  },
  {
    title: "Mappings ",
  },
  {
    title: "Array-like types",
  },
  {
    title: "Tuples + Practice 1",
  },
  {
    title: "Lists + Practice 2",
  },
  {
    title: "Sets + Practice  3",
  },
  {
    title: "Complex Types Summary",
  },
  {
    title: "Type Aliases + Practice 4",
  },
  {
    title: "Conditions",
  },
  {
    title: "Typecasting",
  },
  {
    title: "Loops",
  },
  {
    title: "Special variables",
  },
  {
    title: "Imports",
  },
  {
    title: "Functions visibility and modifiers ",
  },
];
