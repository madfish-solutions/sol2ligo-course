contract Test {
    mapping(int => int) public m;

  function test() public {
        m[4] = 8;
        m[15] = m[16];
        delete m[23];
      }
}