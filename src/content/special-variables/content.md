Some of special Solidity variables have analogues in Ligo. 

There is no analogous to `msg.data`.

As the current time is of the `timestamp` type, the subtraction of the beginning of the Unix epoch is used to convert it to `nat`. This step usually should be omitted as most of operations with time can be done with `timestamp` and is present only for Solidity compatibility.