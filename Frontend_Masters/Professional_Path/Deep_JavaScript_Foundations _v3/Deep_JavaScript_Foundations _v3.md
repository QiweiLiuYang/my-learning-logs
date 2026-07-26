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