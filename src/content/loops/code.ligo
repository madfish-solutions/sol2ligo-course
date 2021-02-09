type state is unit;

function test (const res__unit : unit) : (unit) is
  block {
    const sum : nat = 0n;
    const j : nat = 0n;
    const j : nat = 0n;
    while (j < 10n) block {
      sum := (sum + j);
      j := j + 1n;
    };
    sum := 0n;
    j := 0n;
    while (j < 10n) block {
      sum := (sum + j);
      j := j + 1n;
    };
    sum := 0n;
    j := 0n;
    while (j < 10n) block {
      if (j = 5n) then block {
        (* `continue` statement is not supported in LIGO *);
      } else block {
        skip
      };
      sum := (sum + j);
      if ((sum mod 5n) = 1n) then block {
        (* `break` statement is not supported in LIGO *);
      } else block {
        skip
      };
      j := j + 1n;
    };
  } with (unit);