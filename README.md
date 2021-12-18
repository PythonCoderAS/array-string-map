# array-string-map
A Map that internally encodes Arrays to strings so that two Arrays with the same elements will return the same item.

## Motivation

I was using a Map to store array values, and I kept on running into a bug where I could not get those values back. I got fed up, and then after some Googling, realized that array lookups will not work when two different arrays with the same elements are used (such as when I use array literal syntax to create them). My solution was to encode the values as string keys.
