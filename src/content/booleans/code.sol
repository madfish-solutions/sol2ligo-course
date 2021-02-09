contract Test {
	function test() public {
	    bool boolean0 = false;
	    bool boolean1 = true;
        bool boolean = boolean0 && boolean1; 
        boolean = boolean0 || boolean1; 
        boolean = boolean0 == boolean1; 
        boolean = boolean0 != boolean1; 
     }
}
