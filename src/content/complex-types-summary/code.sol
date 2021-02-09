contract Test {
  mapping(address => uint) public addressToUintMap;
  uint[] public uArray;
  struct SimpleSruct {
      string s;
      bytes b;
  }
    
  function test() public view {
      int32[3] memory iArray = [-11335678, 2343, 321323];
      SimpleSruct memory s = SimpleSruct("Ligo", "42");
  }
}