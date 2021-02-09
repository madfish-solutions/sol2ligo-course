contract Thing {
  uint private quality;
  address public owner;

  function changeOwner(address newOwner) public {
      owner = newOwner;
  }
  function makeBetter() public {
      quality++;   
  }
  function makeWorse() public{
      quality--;   
  }
}