contract Test {
  function test() public payable {
      address sender = msg.sender;
      address source = tx.origin;
      uint value = msg.value;
      bytes memory data = msg.data;
      uint time = now;
      uint blockTimestamp = block.timestamp;
  }
}