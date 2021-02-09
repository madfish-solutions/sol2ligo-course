type state is record
  m : map(int, int);
end;

function test (const self : state) : (state) is
  block {
    self.m[4] := 8;
    self.m[15] := (case self.m[16] of | None -> 0 | Some(x) -> x end);
    remove 23 from map self.m;
  } with (self);