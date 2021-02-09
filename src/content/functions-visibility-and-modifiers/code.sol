contract Test {
  uint private data;

  function f(uint a) private pure returns(uint b) { return a + 1; }
  function setData(uint a) public { data = a; }
  function getData() public view returns(uint) { return data; }
  function compute(uint a, uint b) internal pure returns (uint) { return a + b; }
}