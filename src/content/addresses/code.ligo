type state is unit;

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
  } with (unit);