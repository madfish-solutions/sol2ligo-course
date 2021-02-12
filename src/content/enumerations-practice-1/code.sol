contract Test {
  enum Direction { Left, Right, Straight, Back }
  Direction public direction = Direction.Back;

	function test() public {
    Direction correctDirection;
    direction = correctDirection;
    correctDirection = Direction.Straight;
    bool check = correctDirection == direction;
    check = uint(correctDirection) == uint(direction);
  }
}