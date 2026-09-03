# Deep JavaScript Foundations, V3
## Types
### Primitive Types
La premisa de "Todo en javascript son objetos" es **false** y **false** es la mejor forma de decirlo porque **false** no es un objeto. Esto se malentiende porque muchos valores pueden comportarse como objetos pero sin serlos. Las variables tienen tipos de valor, no tipo objeto.

También la gente está profundamente equivocada diciende que "no me importa lo que diga la especificación si en mi código funciona así".

Los tipos oficiales que recoge la especificación de **ECMAScript** son: 
- Undefined: Solo tiene un valor, "undefined"
- Null
- Boolean: Puede ser true o false
- String
- Symbol: Sirve para crear claves pseudo privadas para los objetos. 
- Number
- Object
- Bigint

De las cuales los primitivos son **undefined, null, boolean, string, number, bigint y boolean**.

En JavaScript, a diferencia de otros lenguajes, las variables no tienen tipos, lo tienen los valores.

### typeof Operator
Tenemos un operador **typeof** que nos devuelve un string que dice el tipo de un dato dado. **typeof Dato**.

Podemos entender que el valor por defecto es **undefined** ya que una variable que no tiene asignada ningún valor pero si ha sido inicializada, tiene como valor **undefined**. Al igual que una función que no tiene un return, devuelve **undefined**.

Cuando hacemos un **typeof null** nos devuelve **object** pero esto es un bug.

Cuando hacemos **typeof function(){}** nos devuelve como tipo de dato **function** aunque sea un objeto. Pero con **typeof ["a"]** si devuelve un **object**. Existe la función **Array.isArray()** para saber si exáctamente si es un array.

### Kinds of Emptiness
- undefined: Una variable existe pero no tiene valor
- undeclared: Una variable nunca ha sido creado en ningún **scope** accesible.
- TDZ (Temporal Dead Zone) a.k.a uninitialized: Es un estado donde la variable existe en memoria pero no se puede acceder todavía, por ejemplo cuando se llama a una variable que se declara más tarde. por el **block-scope**.


El operador **typeof** es el único que puede referenciar a una variable no existente sin lanzar un error.

**TDZ** significa **Temporal Dead Zone**. Se refiere a un estado donde las variables de scope de bloque no han sido inicializados y accedidos, resultado en un error si se intenta.

### NanN & isNaN
**NaN** significa "not a number". Pero tiene un significado mejor, un número inválido. Es un valor que indica que ha ocurrido una operación numérica inválida. **NaN** es de tipo de dato **Number**!

Si restamos un **Number** con un string, da **NaN**.
Si comparamos **NaN** con otro **NaN** ya sea con **loose equality ==** o con **strict equality ===** da false.

La función **Number()** parsea un valor a **Number** si no puede da **NaN**.

La función **isNaN()** devuelve **True** si al hacerle un coerce (como **Number()**) da **NaN**.

El método **Number.isNaN()** devuelve **True** si el valor es **NaN** sin hacer ningún tipo de **coercion**. Es la forma recomendada.

Cualquier operación que involucre a **NaN** va a devolver **NaN**.

### Negative Zero
Existe el **-0**, el cero negativo.
```javascript
let trendRate = -0
trendRate === -0 // true

trendRate.toString() // "0"!
trendRate === 0 // true!
trendRate < 0 // false
trendRate > 0 // false

Object.is(trendRate, -0) // true
Object.is(trendRate, 0) // false

Math.sign(-3) // -1
Math.sign(3) // 1
Math.sign(-0) // -0
Math.sign(0) // 0

// "fix" Math.sign(..)
function sign(v){
    return v !== 0 ? Math.sign(v) : Object.is(v, -0) ? -1 : 1
}

sign(-3) // -1
sign(3) // 1
sign(-0) // -1
sign(0) // 1
```

La forma segura de saber si un valor es un **-0** es con **Object.is(valor, -0)**. De otra manera, tanto **-0 === 0** como **-0 === 0** da **true**.

El **-0** puede ser útil para indicar tendencia o dirección.

### Fundamental Objects
aka: Buil-In Objects or Native Functions
No deberíamos usarlos pero si entenderlos.
Estos son los que se usan con **new**:
- Object()
- Array()
- Function()
- Date()
- RegExp()
- Error()

Estos no hace falta usar **new**. Son frecuentemente usados para hacer **coercion**:
- String()
- Number()
- Boolean()
  
## Coercion
### Abstract Operations
Son las operaciones internas que usa el motor de JavaScript para ejecutar tareas como la conversión de tipo. Estos son:
- ToPrimitive(hint): Hint es el tipo de dato que queremos. Si hint es "number", intentará hacer primero **valueOf()** y si no puede, hará **toString()**. Ocurre lo contrario con hint = "string". Se detiene si obtiene un valor primitivo o da error.
- ToNumber()
- ToString()
- ToBoolean()
- ToObject()
- RequireObjectCoercible()

### toString
**ToString** coge cualquier valor y devuelve su representación como **string**.

\* Si se aplica *toString** a **-0** devuelve **0**.

Si hacemos un **ToString(Objecto)**, este llamará a **ToPrimitive("string")**, es decir, llamará a **toString()** o **valueOf()**.

Si aplicamos un **ToString** a un objeto array, este devuelve un string con quitando los corchetes **[]**, si hubiera valores **null** o **undefined** en el array, también los quita.
```javascript
[] => ""
[1,2,3] => "1,2,3"
[null, undefined] => ","
[[[],[]],[]] => ",,,"
[,,,,] => ",,,"
```

Si hacemos **ToString** a un objeto, quita los **{}** y deja **[object Object]**.
```javascript
{} => "[object Object]"
{a:2} => "[object Object]"
{toString(){return "X"}} => "X"
```

### toNumber
El **toNumber** coercion transforma los siguientes string a sus valores númericos:
```javascript
"" -> 0
"0" -> 0
"-0" -> 0
"   009   " -> 9
"3.14159" -> 3.14159
"0." -> 0
".0" -> 0
"." -> NaN
"0xaf" -> 175

false -> 0
true -> 1
null -> 0
undefined -> NaN

[""] -> 0
["0"] -> 0
["-0"] -> -0
[null] -> 0
[undefined] -> 0
[1, 2, 3] -> NaN
[[[[]]]] -> 0

{..} -> NaN
{valueOf(){return3;}} -> 3
```

### toBoolean
Cuando necesitamos un **boolean** pero no tenemos uno en su lugar, fuerza a transformar el valor a un valor **Falsy** o **Truthy**:
```javascript
- Falsy: "", 0, -0, null, NaN, false, undefined
- Truthy: El resto de valores
```

### Cases of Coercion
El **Coercion** es cuando obliga a un valor a transformarse a otro aplicando un **toString, toNumber, toBoolean**:
```javascript
- Template literals (``): Invoca el **toString**.
- +: Revisa si alguno de los dos lados (operando) es un **string**, si lo es, aplica el **toString** al valor que no sea un **string**.
- [...].join(""): También invoca a **toString**.
- .toString(): Invoca explícitamente **toString**.
- String(valor): Invoca explícitamente **toString**.

- +: Usado como un operador unario, como prefijo de un valor, invoca a **toNumber**.
- Number(): Invoca explícitamente **toNumber**
- -: Si se usa el operador "-", si algun operando no es numérico, aplica **toNumber**.

- En cualquier caso que necesite un valor **Falsy** o **Truthy** (**Booleanos**). Por ejemplo las condiciones en los **if**, **while**, **for**, comparaciones con **==**, etc.
- !!: Aplica el **toBoolean**.
- Operadores (>, <, <=, =>, ==): También aplican **toBoolean**.
- Boolean(valor): Aplica explícitamente **toBoolean**.
```

### Boxing
Cuando accedemos a una propiedad de un tipo primivido (por ejemplo **.length** en los **strings**). Eso se le llama **Boxing** y es una forma implícita de **coercion**. Eso es porque el JavaScript transforma el dato en su contrapartida en forma de **objeto** para que puedas usarlo como un **objeto** de verdad. De otra manera, arrojaría un error porque estás queriendo usar un dato primitivo como objeto.

### Corner Cases of Coercion
No solo un **string** vacío da 0 si se le hace **toNumber**, si no también cualquier forma de espacio blanco como **\t** o **\n**.

Con el caso de 1 < 2 < 3 da **true** porque primero evalua 1 < 2 y da **true**, que después se le aplica **toNumber** y se convierte en 1 y 1 < 3 por lo que da true. Si hacemos 3 > 2 > 1 da false por ejemplo.

También si aplicamos **toBoolean** al string "false", devolverá **true**.