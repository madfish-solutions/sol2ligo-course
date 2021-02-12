contract Test {
  uint[] a1;
    
	function testDynamicSized() public {
    a1 = new uint[](5);
    
    uint len = a1.length;
    uint element = a1[1];
    
    a1.push(1);
    delete a1[0];
    // a1.pop();
  }
}