type state is unit;

const langEnum_LIGO : nat = 0n;
const langEnum_SOL : nat = 1n;
(* enum LangEnum converted into list of nats *)

function test (const res__unit : unit) : (unit) is
  block {
    const boolean : bool = False;
    const intVar0 : int = -(603);
    const intVar1 : int = -(60313);
    const uintVar0 : nat = 60313n;
    const uintVar1 : nat = 613n;
    const addressVar : address = (0x0000000000000000000000000000000000000000 : address);
    const str : string = "TezosIsTheBest";
    const b0 : bytes = 0x48495049;
    const b1 : bytes = 0x97;
    const langEnum : nat = langEnum_SOL;
  } with (unit);