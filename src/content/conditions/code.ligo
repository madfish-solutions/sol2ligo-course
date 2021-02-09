type state is unit;

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
  } with (unit);