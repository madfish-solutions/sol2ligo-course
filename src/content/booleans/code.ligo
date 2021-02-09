type state is unit;

function test (const res__unit : unit) : (unit) is
  block {
    const boolean0 : bool = False;
    const boolean1 : bool = True;
    const boolean : bool = (boolean0 and boolean1);
    boolean := (boolean0 or boolean1);
    boolean := (boolean0 = boolean1);
    boolean := (boolean0 =/= boolean1);
  } with (unit);