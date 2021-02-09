contract Test {
  enum LangEnum { LIGO, SOL }  
	function test() public {
        // boolean
    bool boolean = false;  
  
    // integers
    int32  intVar0 = -603;
    int256  intVar1 = -60313; 
    uint32  uintVar0 = 60313; 
    uint128  uintVar1 = 613; 
    
    // address
    address addressVar = 0x0000000000000000000000000000000000000000;

    // bytes & strings
    string  memory str = "TezosIsTheBest";
    bytes memory b0  = "0121";
    bytes1 b1 = "a";  
    
    // enumerations
    LangEnum langEnum = LangEnum.SOL;
  }
}