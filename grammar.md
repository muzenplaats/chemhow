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
  digits: '\\d+',
  sign: '[\\+\\-]',
  capital: '[A-Z]',
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
Atom := atomic-number? atomic-weight? capital small? Terminology? |
        atomic-weight atomic-number capital small? Terminology? |
        '{' atomic-weight ',' atomic-number '}' '+'
                                capital small? Terminology?  // abbreviation
        // => Atom{}
atomic-number := (digit | '{' digits '}') '_'
atomic-weight := (digit | '{' digits '}') '^'
```
**Terminology**
```vbnf
Terminology := '(' term-symbol (':' SS configuration)? ')' |
               '(' configuration ')'  // => Terminology
term-symbol := digits '^' capital '_' (digit | '{' digits ('/' digits)? '}')
configuration := (digits small ('_' (digit | '{' digits '}')))+
```

## Molecule
```vbnf
Molecule := ((functional-group | list) SS)+  // => Molecule{}
functional-group := (atom aggregation?)+
list := '(' functional-group (SS functional-group)* ')'
aggregation := '_' (digit | '{' digits '}'
```

## Radical
```vbnf
Radical := Molecule '-' '.' | '.' '-' Molecule  // => Radical{}
```

## Ion
```vbnf
Ion := Molecule '^' (sign | '{' digit* sign '}')  // => Ion{}
```
