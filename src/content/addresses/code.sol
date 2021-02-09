contract Test {
	function test(address a0, address a1) public {
        bool b = a0 == a1;
        b = a0 != a1;
        b = a0 > a1;
        b = a0 >= a1;
        b = a0 < a1;
        b = a0 <= a1;
        address a = msg.sender;
        a = address(0);
        a = 0xd27aCC8Eec0E6285c81972B5eEcd8dA241a4bCb5;
    }
}