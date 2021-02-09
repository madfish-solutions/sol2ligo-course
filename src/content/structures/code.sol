contract Test {
  struct Person {
      address payable account;
      uint age;
      uint skill;
      uint bet;
      mapping (address => uint) referralRewards;
  }

  function test() public {
    Person memory person = Person(msg.sender, 30, 100, 0);
    Person memory defaultPerson;
  }
}