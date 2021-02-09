type test_Person is record
  account : address;
  age : nat;
  skill : nat;
  bet : nat;
  referralRewards : map(address, nat);
end;

type state is unit;

const test_Person_default : test_Person = record [ account = burn_address;
  age = 0n;
  skill = 0n;
  bet = 0n;
  referralRewards = (map end : map(address, nat)) ];

function test (const res__unit : unit) : (unit) is
  block {
    const person : test_Person = record [ account = Tezos.sender;
      age = 30;
      skill = 100;
      bet = 0 ];
    const defaultPerson : test_Person = test_Person_default;
  } with (unit);