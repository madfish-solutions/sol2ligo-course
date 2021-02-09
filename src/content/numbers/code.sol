contract Test {
function testInt() public {
    // declaration
    int i0 = 5;
    int i1 = 4;
  
  // comparisons
    bool b = i0 > i1;
    b = i0 >= i1;
    b = i0 < i1;
    b = i0 <= i1;
    b = i0 == i1;
    b = i0 != i1;
    
    // bit operators
    int i = i0 & i1;
    i = i0 | i1;
    i = i0 ^ i1;
    i =  ~i1;
      
    // shift operators
    i = i0 << 1;
    i = i0 >> 1;
    
    // arithmetic operators
    i = i0 + i1;
    i = i0 - i1;
    i = -i1;
    i = i0 / i1;
    i = i0 * i1;
    i = i0 % i1;
  }

function testUint() public {
    // declaration
    uint i0 = 5;
    uint i1 = 4;
  
  // comparisons
    bool b = i0 > i1;
    b = i0 >= i1;
    b = i0 < i1;
    b = i0 <= i1;
    b = i0 == i1;
    b = i0 != i1;
    
    // bit operators
    uint i = i0 & i1;
    i = i0 | i1;
    i = i0 ^ i1;
    i =  ~i1;
      
    // shift operators
    i = i0 << 1;
    i = i0 >> 1;
    
    // arithmetic operators
    i = i0 + i1;
    i = i0 - i1;
    i = i0 / i1;
    i = i0 * i1;
    i = i0 % i1;
  }

  function testTime() public {
    uint time = now;
  }
}