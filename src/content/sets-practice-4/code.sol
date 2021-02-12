contract Test {
  uint[] a1;
    
  function testDynamicSized() public {
    a1 = new uint[](5);
    
    uint len = a1.length;

    bool isInArray;
    
    for (uint i=0; i < a1.length; i++) {
        isInArray = a1[i] == 5 ? true : isInArray;
    }
    
    a1.push(1);
    delete a1[0];
  }
}