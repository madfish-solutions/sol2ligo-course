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
  },
  {
    title: "Booleans",
  },
  {
    title: "Numbers",
  },
  {
    title: "Addresses",
  },
  {
    title: "Bytes and Strings ",
  },
  {
    title: "Enumerations + Practice 0",
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
