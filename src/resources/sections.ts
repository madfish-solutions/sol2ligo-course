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
