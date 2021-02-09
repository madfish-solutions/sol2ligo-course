type test_SimpleSruct is record
  s : string;
  b : bytes;
end;

type state is record
  addressToUintMap : map(address, nat);
  uArray : map(nat, nat);
end;

const test_SimpleSruct_default : test_SimpleSruct = record [ s = "";
  b = ("00": bytes) ];

function test (const res__unit : unit) : (unit) is
  block {
    const iArray : map(nat, int) = map
      0n -> -(11335678);
      1n -> 2343;
      2n -> 321323;
    end;
    const s : test_SimpleSruct = record [ s = "Ligo";
      b = "42" ];
  } with (unit);
  