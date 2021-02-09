type changeOwner_args is record
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
