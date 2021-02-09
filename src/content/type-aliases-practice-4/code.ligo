type state is record
  userBags : map(address, map(nat, string));
end;

function putBagsThings (const self : state) : (state) is
  block {
    const key : string = "home key";
    const pen : string = "red pen";
    const eraser : string = "small eraser";
    self.userBags[Tezos.sender] := map
      0n -> key;
      1n -> pen;
      2n -> eraser;
    end;
  } with (self);