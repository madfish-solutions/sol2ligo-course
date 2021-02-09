function funcWithoutArguments (const res__unit : unit) : (unit) is
  block {
    const i : nat = 0n;
    i := i + 1n;
  } with (unit);

function funcWithArguments (const user : address) : (unit) is
  block {
    assert((Tezos.sender = user));
  } with (unit);

function funcWithReturn (const res__unit : unit) : (bool) is
  block {
    skip
  } with (False);