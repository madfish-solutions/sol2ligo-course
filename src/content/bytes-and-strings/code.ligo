type state is unit;

function testFixedSized (const res__unit : unit) : (unit) is
  block {
    const b0 : bytes = ("00": bytes);
    const b1 : bytes = 0x42;
    const b2 : bytes = 0x222222;
    const b3 : bytes = 0x50;
    const b : bytes = (case b0[0n] of | None -> UNKNOWN_TYPE_DEFAULT_VALUE_byte | Some(x) -> x end);
    const len : nat = b3.length;
    const check : bool = (b0 = b1);
    check := (b0 > b1);
    check := (b0 >= b1);
    check := (b0 < b1);
    check := (b0 <= b1);
  } with (unit);

function testDynamicSized (const res__unit : unit) : (unit) is
  block {
    const b0 : bytes = ("00": bytes) (* args: 0 *);
    const b1 : bytes = ("00": bytes) (* args: 20 *);
    const b : bytes = (case b1[2n] of | None -> UNKNOWN_TYPE_DEFAULT_VALUE_byte | Some(x) -> x end);
  } with (unit);

function testString (const res__unit : unit) : (unit) is
  block {
    const s0 : string = "Love Tezos";
    const s1 : string = s0;
  } with (unit);