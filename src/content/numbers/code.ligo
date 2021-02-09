type state is unit;

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
