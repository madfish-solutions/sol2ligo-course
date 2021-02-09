contract Test {

	function funcWithoutArguments() public {
	    uint i = 0;
        i++;
	}

	function funcWithArguments(address user) public {
	    require(msg.sender == user);
	}

	function funcWithReturn() public returns (bool){
	    return false;
	}
}