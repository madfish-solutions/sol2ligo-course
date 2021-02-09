type state is record
  a1 : map(nat, nat);
end;

function testFixedSized (const res__unit : unit) : (unit) is
  block {
    const a0 : map(nat, nat) = map
      0n -> abs(1);
      1n -> 2n;
      2n -> 3n;
      3n -> 4n;
    end;
    const len : nat = size(a0);
    const element : nat = (case a0[1n] of | None -> 0n | Some(x) -> x end);
  } with (unit);

function testDynamicSized (const self : state) : (state) is
  block {
    self.a1 := map end (* args: 5 *);
    const len : nat = size(self.a1);
    const element : nat = (case self.a1[1n] of | None -> 0n | Some(x) -> x end);
    const tmp_0 : map(nat, nat) = self.a1;
    tmp_0[size(tmp_0)] := 1n;
  } with (self);