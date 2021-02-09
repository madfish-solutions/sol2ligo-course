contract Test {

	function test() public {
  uint sum;
  uint j;
    for (uint j; j < 10; j++) {
        sum +=j;
    }
    
    sum=0;
    j=0;
    while(j < 10) {
        sum +=j;
        j++;
    }
    
    // sum=0;
    // j=0;
    // do {
    //     sum +=j;
    //     j++;
    // } while (j < 10);
    
    sum=0;
    j=0;
    while(j < 10) {
        if (j == 5) continue;
        sum +=j;
        if (sum % 5 == 1) break;
        j++;
    }
  }
}