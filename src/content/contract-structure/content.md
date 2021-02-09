Both Ethereum and Tezos contracts consist of Code and State parts but they are organized differently. Whereas Solidity contracts resemble classes Ligo contracts are set of functions. 'main' is the key entrypoint that introduces public functions and contract storage. 


It has exactly two arguments - parameters and state - and return two parameters - a list of external operations and an updated state. If the type of action is of Variant type its subtypes are interpreted as public functions interface otherwise main function is determined as the default entrypoint. 


Don't worry if it seems too complicated to grasp: each construction is explained in future chapters. The goal of this one is to show the high-level difference that has an impact on how the code is organized.