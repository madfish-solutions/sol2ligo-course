contract Test {
	function test() public {
    int a = 3;
    int b = 9;
    if (a == b) a = 10; 
    else b = 1;
    
    if (a == b) {
        a = 10;
        b = 0;
    } else b = 1;
    
    if (a == b) a = 10; 
  }
}