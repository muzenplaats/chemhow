# Grammar of ChemHow 0.1.0-delta (Draft)
The grammar is shown in a variation of BNF form with commented productions.

## Lexer
```js
var patterns = {
  '{': '{',
  '}': '}',
  digit: '\\d',
  captial: '[A-Z]',
  small: '[a-z]'
}
```

## (Root?)
```vbnf
Equation := eof //
```
```
->, <-, <=>, <~->, <-~>
```

## Atom
```vbnf
Atom := atomic-number? atomic-weight? capital small? |
        atomic-weight atomic-number capital small
atomic-number := (digit | '{' digit+ '}') '_'
atomic-weight := (digit | '{' digit+ '}') '^'
```

## Molecule
```vbnf
Molecule := eof  //
```
