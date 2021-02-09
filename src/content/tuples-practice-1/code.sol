contract Test {
  uint[] a1;
    
	function testFixedSized() public {
    uint[4] memory a0 = [uint(1), 2, 3, 4];

    uint len = a0.length;
    uint element = a0[1];
  }
}