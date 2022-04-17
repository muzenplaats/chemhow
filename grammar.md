# Grammar of ChemHow 0.1.0-delta (Draft)
The grammar is shown in a variation of BNF form with commented productions.

## Lexer
```js
var patterns = {
  '(': '\\(',
  ')': '\\)',
  '{': '\\{',
  '}': '\\}',
  '+': '\\+',
  '-': '\\-',
  '.': '\\.',
  ',': ',',
  digit: '\\d',
  captial: '[A-Z]',
  small: '[a-z]'
}
```
Note: the `SS` stands for skipping spaces.

## (Root?)
```vbnf
Equation := eof  // production Equation
```
```
->, <-, <=>, <~->, <-~>
```

## Atom
```vbnf
Atom := atomic-number? atomic-weight? capital small? |
        atomic-weight atomic-number capital small |
        '{' atomic-weight ',' atomic-number '}' '+' capital small  // abbreviat.
        // => Atom{}
atomic-number := (digit | '{' digit+ '}') '_'
atomic-weight := (digit | '{' digit+ '}') '^'
```

## Molecule
```vbnf
Molecule := ((functional-group | list) SS)+  // => Molecule{}
functional-group := (atom ('_' digit | '{' digit+ '}'))+
list := '(' functional-group (SS functional-group)* ')'
```

## Radical
```vbnf
Radical := Molecule '-' '.' | '.' '-' Molecule  // => Radical{}
```

