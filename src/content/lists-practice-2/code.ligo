type state is record
a1 : map(nat, nat);
end;

function testDynamicSized (const self : state) : (state) is
block {
  self.a1 := map end (* args: 5 *);
  const len : nat = size(self.a1);
  const element : nat = (case self.a1[1n] of | None -> 0n | Some(x) -> x end);
  const tmp_0 : map(nat, nat) = self.a1;
  tmp_0[size(tmp_0)] := 1n;
  remove 0n from map self.a1;
} with (self);