
type state is unit;

const u : nat = 1n

function test (const res__unit : unit) : (unit) is
  block {
    const b : bool = False;
    b := True;
    const s : string = "";
  } with (unit);