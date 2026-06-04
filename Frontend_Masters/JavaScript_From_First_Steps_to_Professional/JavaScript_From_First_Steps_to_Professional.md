# JavaScript: From First Steps to Professional

## Value & Data Types
### Value & Data Types
typeof variable // Es un operador que indica el tipo del dato
typeof(var) // Lo mismo pero en formato función

En Javascript existen básicamente 2 tipos de datos:
- Primitivos: String, number, boolean, undefined, boolean
- Objetos: Array, objetos, colecciones, RegEx

**Undefined** es que accidentalmente no hay datos y **null** indica explícitamente que no tiene datos

### indexOf
.indexOf(Char | String) // Indica la primera ocurrencia en un String. Devuelve la posición o -1 si no está
.includes(String) // Devuelve un booleano si una cadena se encuentra dentro de otra
.startsWith(String) // Devuelve un booleano si un String empieza por el String dado 

## Expressions
### Expressions
Los **expression** se evaluan en un valor. Por ejemplo:
- 1 + 5 / 3
- "Hola" + " Mundo"
- 2 % 2 / 1 * 5 != 3 / 1

Las expresiones pueden ir en sitios donde se esperan un valor, como por ejemplo como argumento de una función

### Evaluating Code
Las variables guardan el valor dependiendo de si es de tipo primitivo o un objeto. Si es primitivo, guarda una copia. Si es un objeto, guarda una referencia. 
Este es relevante porque, si asignamos una variable a otra variable que guarda un dato primitivo, se evalúa su contenido y guarda una copia. Si se modifica la otra variable, la variable que acabmos de crear tendrá el contenido original. En cambio, con referencias, eso no pasa.
```javascript
let nombre1 = "Qiwei"
let nombre2 = nombre1
nombre1 = "Liuyang"
console.log(nombre2) // "Qiwei"

let objeto1 = {nombre: "Qiwei"}
let objeto2 = objeto1
objeto1.nombre = "Liuyang"

console.log(objeto2) // {nombre: "Liuyang"}
```

### Statement vs. Expression
Un **statement** es una declaración de acción. Manda a hacer algo.
Una **expression** es una evaluación de datos. Evalua unas operaciones para devolver un valor.

## Arrays
### Arrays
Funciones de un array
.pop() // Elimina el último elemento de un array y lo devuelve
.push(Valor) // Agrega en la ultima posición del array el valor dado y devuelve la longitud del array. **Modifica** el array original
.includes(Valor) // Devuelve un booleano si un valor se encuentra dentro del array
.sort() // Ordena un array **alfabéticamente**
.join(Valor) // Devuelve un string concatenando cada elemento del array dejando Valor entre medio de cada elemento
.concat(Array[]) // Concatena un array y devuelve el array resultante. Si no se reasigna a la variable de nuevo, los cambios no persisten. Es decir, crea una **copia**

### Mutability
Los arrays son datos **mutables**, una vez creados, pueden cambiar su contenido.
Los string y otros datos primitivos son **inmutables** una vez creados no pueden cambiar su valor. Los [] en un String son solo de lectura

### Inmutable variables & Values
Si tenemos una variable inmutable **(const)** con un valor mutable, podemos cambiar el valor pero no podemos reasignar la variable (usando "=").

Siempre que se pueda, se usará datos y variables inmutables para evitar errores ocultos y optimización con frameworks reactivos. Esto puede ser por ejemplo usar funciones que no modifiquen el dato original, si no que devuelvan uno nuevo.

### Variables & Arrays
Cuando asignamos una variable a otra variable que contiene un dato por referencia, se asigna el puntero (referencia) hacia el mismo dato en la memoria. Si la variable es un dato primitivo (se almacena por valor) se evalua la variable y le da el valor.
```javascript
let nombre1 = "Qiwei"
let nombre2 = nombre1
nombre1 = "Liuyang"
console.log(nombre2) // "Qiwei"

let objeto1 = {nombre: "Qiwei"}
let objeto2 = objeto1
objeto1.nombre = "Liuyang"

console.log(objeto2) // {nombre: "Liuyang"}
```

## Objects
### Obejcts & Property Access
Los objetos se crean con {} y funcionan con **clave: valor**, para acceder al valor de una clave, se usa la notación de puntos o la notación de corchetes. La diferencia del corchete, es que evalua antes de buscar.

También podemos reasignar valores y crear nuevos pares de clave-valor con la notación de puntos y corchetes.

```javascript
let js = {
    name: "JavaScript",
    abbreviation: "JS",
    "is Awesome": true
}

js.name // JavaScript
ja["is Awesome"] // true
```