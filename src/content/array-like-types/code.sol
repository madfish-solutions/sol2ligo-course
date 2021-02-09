
contract Test {
    uint[] a1;
    
  function testFixedSized() public {
        uint[4] memory a0 = [uint(1), 2, 3, 4];

        uint len = a0.length;
        uint element = a0[1];
      }
      
  function testDynamicSized() public {
        a1 = new uint[](5);
        
        uint len = a1.length;
        uint element = a1[1];
        
        a1.push(1);
        // a1.pop();
      }
}