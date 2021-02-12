type state is record
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
  } with (self);