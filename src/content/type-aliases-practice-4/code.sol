contract Test {
  // user address => [keys, pen, eraser]
  mapping(address => string[3]) public userBags;

  function putBagsThings() public {
    string memory key = "home key";
    string memory pen = "red pen";
    string memory eraser = "small eraser";

    userBags[msg.sender] = [key, pen, eraser];
  }
}