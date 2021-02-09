Tezos and Ethereum addresses have a different format that is why the address literals cannot be transpiled properly. The code below won't be compiled because of the line:

```jsx
a := (0xd27aCC8Eec0E6285c81972B5eEcd8dA241a4bCb5 : address);
```

There are no special syntax to declare the address literal so the literals are represented by strings casted to address type. The following literal is correct:

```jsx
a := ("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" : address);
```

The `address(0)` is usually used as burn address in Ethereum. To preserve the principle, it is advised to use some specially designed address from which nobody has the key. I.e the `"tz1ZZZZZZZZZZZZZZZZZZZZZZZZZZZZNkiRg"`.

Both languages support comparison operations for the type.