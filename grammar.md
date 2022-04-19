# Grammar of ChemHow 0.1.0-delta (Draft)
The grammar is shown in a variation of BNF form with commented productions.

## Lexer
```js
var patterns = {
  '(': '\\(',
  ')': '\\)',
  '{': '\\{',
  '}': '\\}',
  '<': '<',
  '>': '>',
  '+': '\\+',
  '-': '\\-',
  '_': '_',
  '=': '=',
  '~': '~',
  '.': '\\.',
  ',': ',',
  digit: '\\d',
  digits: '\\d+',
  sign: '[\\+\\-]',
  capital: '[A-Z]',
  small: '[a-z]',
  '//': '\/\/',
  '/*': '\/\*',
  '*/': '\*\/'
}
```
Note: the `SS` stands for skipping spaces and the `WS` stands for
skipping white space. The `WS` is overwritten to include the comments 
as shown in the grammar.


## ChemHow
```vbnf
Chem-How ::= eof  // => ChemHow{}
```
To be considered..


## Reaction (experimental)
```vbnf
Reaction := term ('-' '>' SS term)+  // branching (ratios) or side products (yields)
          | term arrow WS term   // => Reaction{}
term := Molecule ('+' SS Molecule)* WS
arrow := '<' [-=~]{1,2} '>'?

// A + B -> C + D  (81%) yield, or the branching ratio in 0.81
//       -> E + F  (12%)
//       -> ...
// A + B -> C + D  (insertion; not implemented)
//     E /
// ->, <-,  // irreversible 
// <=>, <~->, <-~>, <=->, <-=>. // reversible
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

## Comments
**Single-line comment**
```vbnf
SL-Comment := '//' All
```

**Multi-line comment**
```vbnf
ML-Comment := '/*' mlwithout('*/') '*/'
```
