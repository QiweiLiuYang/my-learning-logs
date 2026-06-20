# JavaScript
## Principios de JavaScript
### Hilo de ejecución y contexto de ejecución
En Javascript, cada línea es "ejecutado" una por una en un hilo de ejecución y se guarda en una memoria global. Cuando declaramos una variable o una constante, se guarda en la memoria global su identificador (nombre de la variable) y su valor.
Cuando se ejecuta con una función, guarda en la memoria el nombre de la función y en su contenido el cuerpo de la función.
Cuando se ejecuta una función, se crea un contexto de ejecución y una memoria local. En ese contexto de ejecución, hay un hilo de ejecución que ejecuta línea a línea el contenido de esa función guardando en su memoria local lo que encuentre y devuelve (si es el caso) un valor que puede estar guardado en la memoria global o no. Una vez terminado de ejecutarse, ese contexto de ejecucíón se olvida y sigue con el hilo principal

### Call Stack
Es una pila (LIFO *Last In First Out*) para que JavaScript sepa que función se está ejecutandose y a donde volver cuando una vez termina (con return). Por ejemplo, cuando se ejecuta una función, este se pone en la pila y depués se saca y vuelve a la ejecución del contexto global.
Como JavaScript es monohilo, solo hay un Call Stack por lo que solo puede ejecutar una cosa a la vez.


## Callbacks & Funciones de orden superior
### Generalizar funciones
Hay una regla que se llama **DRY** (Don't Repeat Yourself) que es básicamente no hacer tareas repetitivas. Podemos generalizar creando la función para que cuando se le llame, use un los datos dados en vez de *hard codear* los datos. El argumento es el dato pasado y el parámetro es la etiqueta que se le da a ese argumento dentro de la función.

### Pasar una función como argumento
Los métodos que aceptan o devuelven funciones se llaman funciones de orden superior. Esto es gracias a la programación funcional

### Código declarativo y legible
En Javascript, las funciones son **Objetos de primera clase (*First-Class Objects*)**. Esto quiere decir que son tratados como cualquier otro objeto, que son en esencia, datos. Pero a estos datos se les puede llamar, invocar o ejecutar. Para que se le considere ***First-Class Objects***, la función tiene que poder ser asignada a una variable, poder pasarse como argumento o ser devueta por otra función.
A la función que se le pasa a la función de orden superior, se le suele llamar **Callback Function** (conocido a veces como ***handler, transformation function, argument function o lambda function***).
Cuando una función es devuelta por otra función, se le llama ***Closure*** y esta recuerda el contexto en la que fue creada.

### Funciones flecha
Podemos crear una función sin nombre, llamado **función lambda o anónima**. Esto nos sirve para ahorrar tiempo y tener un código más legible y simple (**conocido como azúcar sintáctico**) Su sintaxis es la siguiente:
```javascript
arg1 => arg1*2
(arg1, arg2) => arg1 * arg2
(arg1, arg2, arg3) => {
    arg1 += arg2
    return arg1 * arg3
}
```
- Cuando solo hay un parámetro de entrada, no hace falta poner los argumentos entre paréntesis.
- Si hay más de un parámetro de entrada, hay que poner los argumentos entre paréntesis.
- Si solo hay una línea de instrucción, se puede omitir los {} y el return.
- Si hay más de una línea de instrucciones, se tiene que poner {} y return.

Hay funciones prehechas para los **arrays**, estos son los *reduce, map, filter*.

- **map**: Aplica una función a cada elemento de un array y devuelve un nuevo array sin modificar el original.
- **filter**: Aplica una función que retorna un booleano, si es true, se queda en el nuevo array, si es falso, no se queda. Devuelve un nuevo array.
- **reduce**: Aplica una función con dos argumentos para una vaya guardando la operación que se hará con el segundo argumento. Devuelvo un simple valor.

```javascript
[array].map(callback)
map(array, callback)

[array].filter(callback)
filter(array, callback)
`
[array].reduce(callback(a, b[, c]))
reduce(array, callback(a, b[, c]))
```

### Métodos de arryas que no modifican el original
En Javascript existen muchos métodos que modifican el **array** original, cosa que no debería de suceder para preveer los efectos secundarios. Por ejemplo modificar un array que se esté usando en otra parte del código y genera errores difíciles de localizar.
Existen métodos clásicos que tienen su variante que no muta el array original:
```javascript
arr.reverse()
arr.toReversed()

arr.splice()
arr.toSpliced()

arr.sort()
arr.toSorted()
```

Hay otros métodos de arrays:
```javascript
arr.flat()

arr.findLastIndex()

arr.groupBy()
```

### Llamando funciones dentro de funciones
```javascript
function createFunction() {`
  const two = 2
  function multiplyBy2(num) {
    return num * two;
  }
  return multiplyBy2;
}
const generatedFunc = createFunction();
let result = generatedFunc(3) // 6
```
El código de arriba, la función es una fábrica de otra función que devuelve la **definición** de la función (pero no la ejecuta). Esa función devuelta recuerda todo lo que estaba en su escope. Se llamas a *generatedFunc()*, no se vuelve a ejecutar createFunction() porque esta guarda la referencia a la función interna y su entorno. En definitiva, la función *createFunction* es una fábrica de funciones que recuerda su *scope* y solo se ejecuta una vez

### Closure scope
La función devuelta tiene un link oculto **[[scope]]** a las propiedades que tiene acceso. La mochila con todos los datos se llama **Closure over variable environment (COVE)** y esta es persistente. Se le llama con mayor precisión: **Persistent Lexical Scope Reference Data (PLSRD)**

### Multiple Closures
Si guardamos el resultado de una función que devuelve otra función un par de veces, como ejecuta esa función en un nuevo contexto de ejecución, se crea otra función con su scope y es devuelta y almacenada en otra variable. Esta segunda ejecución es totalmente independiente de la primera.
\*Javascript busca primero en la memoria local y si no encuentra lo que busca va a buscar al *Scope* que tiene linkeado con **[[Scope]]**. Si no lo encuentra aquí, va subiendo en la cadena de **Scope** hasta llegar al scope global


## Type coercion & metaprogramming
### Math operators & User-Submitted Data
Javascript viene con unos operadores aritméticos (* ** / % + ++ - -- ==). Estos operadores cojen los operandos de la derecha e izquierda.

Cuando hacemos una operación de Integer (7) * String ("7"). Ese "*" detecta que necesita números para operar y ejecuta un Type Coercion a cada lado del operador y aplica ToNumber a cada uno para que se convierta en un número. En este caso, 7 * "3" es posible gracias al **Type coercion**.

### Math operator Type coercion
Tenemos operadores relacionales (< > <= =>).

Los operadores relacionales también aplican **Type Coercion**.

Tenemos una excepción y es el operador **+** que si encuentra un operando **String** y otro numérico, aplica el Type Coercion de **ToString** y convierte el número en un **string**.

Podemos forzar el **Type coercion** con la función **Number()** o con los operadores unarios, que son los que no necesitan otro operando, simplemente se pone delante de un **string**:
- **+**: Transforma un string en un número.
- **-**: Transforma un string en un número y lo vuelve negativo.
- **!**: Convierte un valor en su opuesto booleano. Fuerza la coerción **ToBoolean**
```javascript
7 + "3" = "73"
7 + +"3" = 10
7 + Number("3") = 10
```

Para forzar **ToString**, podemos usar la función **String()** o usar `${}`:
```javascript
7 + "" = "7"
String(7) = "7"
`${7}` = "7"
```

### ToBoolean Coercion
Cuando tenemos que evaluar una **condición** *(if, while, for, !, &&, ||)* que evalúa una cadena vacío ("") o un 0, aplica un ToBoolean coercion y lo convierte en un booleano **False**. Solo puede ser **True** o **False** dependiendo de si es un valor **falsy** o **truthy**:

>Falsy: False, 0, -0, 0n, "", null, undefined, NaN
>
>Todo lo demás es truthy, por ejemplo:<br>
>Truthy: "0", "false", [], {}, function(){}
>
>Truco pro: usar doble negación (!!) para convertir algo en booleano

Esto puede provocar comportamientos no deseados, por eso existe el operador **===*** que no aplica ningún tipo de **Coercion**.

### Coercion Rules & Operators
Los **coercions**:

**ToNumber**
- "3" -> 3, "-3" -> -3
- true -> 1, false -> 0, null -> 0
- undefined -> NaN (Es un número)

**ToString**
- 5 -> "5", -5 -> "-5"
- true/false, null -> "true"/"false", "null"
- undefined, NaN -> "undefined", "NaN"

**ToBoolean**
- 0, "", null, undefined, NaN -> false
- Todo  lo demás -> true

Activadores de los **coercion**:
- Aritméticos (*, -, /, %, **) -> ToNumber
- Unarios (+, - justo a la izquierda) -> ToNumber
- \+ -> ToString (Salvo que ambos sean números)
- Relacionales (<, >, <=, =>) -> Primero prueba ToNumber, después ToString
- Igualdad débil (==) -> Todo (evitar)
- Condicionales (if, ||, &&, !) -> ToBoolean
- `${}` y APIs -> ToString

### Stack Memory vs. Heap Memory
**Stack** es donde se almacena los datos primitivos (string, numbers, boolean) y variables (direción a donde está guardado en el Heap) y en forma de **valor**
**Heap** es donde se almacena **objetos, array y funciones** y en forma de **referencia**

Es por eso que si hacemos esto:
```javascript
const userCredentials = {username: "admin", id: 0} // ref 10001
const userLogin = {username: "admin", id: 0}' // ref 10002

if(userCredentials == userLogin) // false
if(userCredentials === userLogin) // false

const anotherLogin = userCredentials // 10001
```

Esto pasa porque están en el **Heap** y estamos comparando las referencias, que no son iguales.

### Date Objects
Tenemos una función que viene por defecto llamado **Date()** que tiene una propiedad oculta **[[DateValue]]** que almacena el total de milisegundos (ms) transcurridos desde el 1 de enero de 1970.

Si ejecutamos **Date()** nos devolverá un objeto vacío con una propiedad oculta **[[DateValue]]**

\* Para acceder a las propiedades o claves de un objeto, la notación de brackets ( *[ ]* ) evalúa primero lo que hay dentro. La notacición de puntos no evalúa nada

### ToPrimitive Coercion
Existe el **ToPrimitive** coercion que llama a la propiedad oculta **@@toPrimitive** que convierte un objeto a un dato primitivo y podemos hacer cálculos y comparaciones con él. Que tipo de **coercion** va a utilizar es determinado por el operador.

Por ejemplo, en los objetos de **Date()**, aparte de devolvernos un objeto vacío con la propiedad oculta **[[DateValue]]**, también añade otra propiedad oculta que es **@@toPrimtive** que tiene de valor una función que devuelve el valor de **[[DateValue]]** aplicado **ToNumber** coercion.

Básicamente, **@@toPrimitive** es una función oculta en un objeto que determina como convertir el objeto a un dato primitivo.

### Implement @@toPrimitive
\*Todos los **NaN** son diferentes, por lo que si hacemos NaN == NaN o NaN === NaN va a dar false

No podemos modificar o añadir **@@toPrimitive** con la notación de puntos (object.@@toPrimitive no funcionará).

Podemos modificar o añadir **@@toPrimitive** utilizando el tipo de dato primitivo **Symbol**, que contiene algunos **Well-Known Symbol** como **toPrimitive** (que guarda el valor de **@@toPrmitive**) o **iterator**. Para usarlo, tenemos que utilizar obligatoriamente la notación de corchetes debido a que los corchetes interpretan código, y al interpretarse **Symbol.toPrimitive** se convierte en **@@toPrimitive**.
```javascript
const userStored = {name: "Will", id: 105}
const userSubmitted = {name: "Will", id: 105}

function onSubmit(){
  if(+userStored === +userSubmitted){

  }
}

function coerce(){return this.id}

userStored[Symbol.toPrimitive] = coerce
userSubmitted[Symbol.toPrimitive] = coerce

onSubmit()
```

### Symbols & Metaprogramming
Cuando se ejecuta la función que está dentro de **@@toPrimitive**, este le inserta automáticamente un parámetro que será **"number"** o **"string"**. Con esto, sabemos qué coerce aplicar en cada caso
```javascript
function coerce(hint){
  if(hint === "number") return number // Por eemplo con el (+) o Number()
  if(hint === "string") return string // Por ejemplo `${}` o String()
}
```

El tipo de dato **Symbol** nos permite añadir propiedades semi-ocultas a objetos. Estos tienen unos identificadores (etiqueta) únicos que no pueden ser escritos directamente para que no sobreescriban el código del desarrollador. Por ejemplo el **@@toPrimitive** no es lo mismo que toPrimitive.

Gracias a que **Symbol** tiene unos **Well-Known Symbols**, podemos acceder y modificar propiedades (que estaban ocultas) para cambiar el comportamiento por defecto de Javascript. Esto se le llama **Metaprogramming**

## Asynchronous JavaScript & the event loop
### Asynchronous Code Overview
En el motor de JavaScript tenemos 3 partes principalmente:
- Thread of execution
- Memory/Variable environment
- Call stack

Pero tenemos que añadirle más partes que están fuera de javascript (navegador o servidor externo):
- Web Browser APIs/Node background APIs
- Primises
- Event loop, Callback/Task queue and micro task queue

Básicamente, el ecosistema de JavaScript se compone de partes que ofrece y añade el navegador y que podemos acceder a través de JavaScript: JavaScript + DOM (document) + Service workers + console + Times (setTimeout, setInterval) + Network (XHR, fetch) + Index DB + Local Storage

### JavaScript vs. Browser APIs
Las partes anteriores mencionadas no se ejecutan con el motor de JavaScript, lo hace la API del navegador (el navegador en si).
Básicamente el navegador le presta al motor de JavaScript unas herramientas, funciones y métodos que los navegadores exponen. De esta manera, puede interactuar con el mundo exterior.

### Callback Queue
**Callback/Task queue** es la sala de espera entre **JavaScript** y el **Web Browser API**. En esta **Callback Queue** guarda todo lo que está listo  para ejecutarse una vez que el hilo principal termine todos sus procesos y la **Call Stack** esté vacía, una vez que termine, empeza a agregar al **Call Stack** lo que había en el **Callback Queue**.

### Event Loop
¿Cómo sabe JavaScript que el Call Stack está vacío, ha terminado de ejecutar el código global o que haya tareas pendientes en la Callback Queue?
Eso es el **Event Loop** y su trabajo es revisar constantemente si hay algo que ejecutar, si hay algo en el Call Stack o el Callback Queue. Revisando eso y con la condición que no haya nada en el **Call stack** ni código pendiente de ejecutar en el contexto global, es cuando permite mover una tarea del Callback Queue al Call Stack

### Promises Overview
Las promesas son un tipo de objeto especial que es un **placeholder** del valor que va a ser devuelto por la función ejecutada en segundo plano.

### Promises and the Fetch API
La función **fetch(uri)** sirve para hacer un **GET** (obtener datos) de un recurso en la red, el **fetch** usa una herramienta del navegador (**Network**). Le podemos pasar un segundo argumento con un objeto de configuración para hacer un **POST**. Ambos usan el protocolo **HTTP**.

El objeto **Promise** tiene campos ocultos, uno de ellos es **[[PromiseResult]]** que contiene el resultado de la petición, hasta que no se complete, es **undefined**. Tiene otro campo oculto que es **[[PromiseReactions]]** que contiene una callback a ejecutar una vez finalice su ejecución. Podemos hacer usar **Promise.then(Callback)** para registrar la función callback a ejecutar.