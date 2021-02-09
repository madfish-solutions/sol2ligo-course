contract Test {
      
  function testFixedSized() public {
    bytes1 b0;
    bytes1 b1 = 0x42;
    bytes3 b2 = 0x222222;
    bytes3 b3 = hex"32";

    byte b = b0[0];
    uint len = b3.length;
    bool check = b0 == b1;
    check = b0 > b1;
    check = b0 >= b1;
    check = b0 < b1;
    check = b0 <= b1;
  }

  function testDynamicSized() public {
    bytes memory b0 = new bytes (0);
    bytes memory b1 = new bytes (20);

    byte b = b1[2];
  }

  function testString() public {
    string memory s0 = "Love Tezos";
    string memory s1 = s0;
  }
}