type setData_args is record
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
  end);