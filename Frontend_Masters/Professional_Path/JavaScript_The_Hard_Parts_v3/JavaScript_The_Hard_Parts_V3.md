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

El objeto **Promise** tiene campos ocultos, uno de ellos es **[[PromiseResult]]** que contiene el resultado de la petición (un objeto **Response**), hasta que no se complete, es **undefined**. Tiene otro campo oculto que es **[[FulfillReaction]]** que contiene una callback a ejecutar una vez finalice su ejecución. Podemos hacer usar **Promise.then(Callback)** para registrar la función callback a ejecutar.

### setTimeout & fetch Execution
Para el hilo de ejecución del siguiente bloque de código:
```javascript
function display(data){console.log(data)};
function printHello(){console.log("Hello")};
function blockFor300ms(){/* blocks js thread for 300ms */};

setTimeout(printHello, 0);

const futureData = fetch("https://tiktok.com/will);
futureData.then(display);

blockFor300ms();
console.log("Me first!");
```

### Microtask Queue
Siguiendo con el anterior punto y el bloque de código que teníamos...
Lo que va a salir en consola va a ser el siguiente orden:
1. blockFor300ms()
2. console.log("Me First!")
3. futureData.then(display)
4. setTimeout(printHello, 0)

Esto es debido a que las promesas van a otra cola, que es la **Microtask Queue** que tiene prioridad sobre la **Callback Queue**. Esto quiere decir que para que las tareas en **Callback/Task queue** se ejecuten, tiene que estar la **Microtask Queue** vacía. Entonces el **event loop** checkea la ejecución global, call stack, microtask queue y por último la callback queue.

### Microtask Queue Q&A
A parte de las promesas, también entra dentro los **.catch()**, los **.finally()** y obviamente los **async/await**. También podemos agregar a la **Microtask Queue** funciones callback manualmente con la función **queueMicrotask(callback)**. Y por último, está la **Browser API** ofrece la clase **MutationObserver**.

Las promesas también tienen un campo oculto **[[RejectReaction]]** que guarda funciones a ejecutar cuando hay un error. Se puede añadir con **Promise.catch()**, como segundo argumento de un **Promise.then(succes, error)** o en un bloque **catch de try/catch**.

Podemos agregar una forma de abortar un **fetch** si excede un tiempo, con la clase **AbortSignal** que contiene un método estático **.timeout(ms)**. Se lo podemos pasar al segundo argumento de un fetch, que es un objeto de configuración. Quedaría de esta forma: **fetch(url, {signal: AbortSignal.timeout(200)})**.

## Classes & Prototypes (OOP)
### Object-Oriented JavaScript
En JavaScrypt no tiene una implementación nativa de OOP, si no que usa **prototype** como mecanismo que provee funcionalidad de OOP. Una de las razones por la cual se usa OOP es porque puedes tener una función que haga algo en algún lado entre 100000 líneas de código y no tener la accesible cuando la quieres usar. OOP soluciona eso implementando en el objeto mismo esa funcionalidad.

Aunque existan las keywords **new** y **class**, solo es azúcar sintáctico. Por debajo, el motor de JavaScript utiliza la cadena de **Prototype**.

### Create JavaScript Objects
El término de encapsulamiento es almacenar funciones con sus datos asociados dentro de un objeto.

Tenemos dos maneras de crear un objeto, declarando una variable con {} y sus pares de clave:valor dentro. O también lo podemos crear con una declaración vacío e ir creando sobre la marcha propiedades a través la **notación de punto** y asignarle valor a cada clave. Hereda de **Object.prototype** por lo que tiene métodos como **obj.toString()**..

De la misma manera, podemos crear un objeto vacío con **Object.create(null)** y a través de la notación de punto ir agregándole pares de clave:valor. Este objeto viene totalmente vacío (pelado) y no heredad de nada.

\* Es mejor no abusar de la notación de puntos porque ofrece un rendimiento peor que declarar desde un inicio las propiedades.

### Generate Objects Using a Function
Lo anterior rompe la regla **DRY (Don't repeat yourself)**. Podemos crear una función donde la pasemos por argumento datos y que lo haga por nosotros y retornarlo en vez de repetir un bloque de código igual.

### Prototype Chain
Lo malo de lo anterior es la eficiencia y uno de los más afectados es la memoria. Esto es debido a que ocupamos memoria para la función dentro del objeto y para los datos del objeto en si. Podemos usar **Object.create(objetoPlantilla)** para crear una copia vacía del objeto dado en el argumento. El objeto plantilla tendrá en su interior los métodos que queramos que tengan incluidos. El objeto creado con **Object.create(objetoPlantilla)** no tendrá en su interior el contenido de la plantilla, si no que un link oculto **[[Prototype]]** que lo conecta con **objetoPlantilla**. Cuando se llame a un método y no lo encuentra en el objeto creado, el link lo lleva a su prototipo y ahí lo encuentra y lo ejecuta con el **scope** del objeto creado. En el **Heap** solo existe **objetoPlantilla** y los datos en el objeto creado.

### hasOwnProperty & Object Prototype
Tenemos un método para los objetos que es **obj.hasOwnProperty(Propiedad)** que nos devuelve un booleano si tiene la propiedad pasado como argumento dentro de él, es decir, que no lo ha heredado. Solo busca dentro del objeto en sí sin buscar de ningún hilo ni "padre".

El método **obj.hasOwnProperty(Propiedad)** lo ofrece el final de la cadena o árbol genealógico, **Object.prototype**. En él encontraremos otros métodos útilas aparte del mencionado. Más allá de **Object.prototype** está **null**, por lo que devolvería **undefined**.

Todos los objetos nacen de **Object.prototype**, a excepción del método **Object.create(objetoPlantilla)** que pone entre medio el **objetoPlantilla**, pero sigue siendo un paso más hasta llegar a **Object.prototype**.

### Arrow Functions & this Keyword
Partimos de este trozo de código:
```javascript
function userCreator(name, score){
  const newUser = Object.create(userFunctionStore);
  newUser.name = name;
  newUser.score = score
  return newUser;
}

const userFunctionStore = {
  increment: function(){
    function add1(){this.score++;}
    add1()
  }
}

const user1 = userCreator("Ari", 3);
const user2 = userCreator("Jae", 5);
user1.increment();
```

Cuando llamamos a user1.increment(), se le pasa como argumento implícito **this** que tendrá como valor lo de la izquierda del **.**. Pero en este caso, dentro del método **increment()** se llama a otro métdo **add1()** que tendrá su propio **Execution context** y su **Local memory**. Entonces se le pasa también de manera implícita **this** pero en este caso no tenemos un **.** ni un objeto a la izquierda, por lo que recae al objeto global **window**. Es decir, si no hay un **objeto** y un **.**, es como si se llamara con **window.metodo()**.

Hace tiempo, se usaba un truco y era crear una variable **that = this** porque las funciones tienen acceso al **scope** exterior. Hoy en día podemos evitar eso usando las **Arrow functions**, que adopta el **this** del lugar físico en el que se crean (**ámbito léxico**), dicho de otra manera, comparte el **scope** del método. Pero los objetos no crean un nuevo **ámbito léxico**, solo las funciones y bloques de código con **{}**. Por eso es interesante usar **Arrow functions** dentro de un método para compartir el mismo **this**. Pero si lo usas fuera de un método, **this** apuntará a **window**.

### The new Keyword
Podemos automatizar la instanciación de una clase con la keyword **new**, esto nos crea un nuevo objeto, lo *linkea* a una cadena de **prototype** y devuelve el nuevo objeto. Tenemos que refactorizar la función creadora y adaptarla a como funciona **new**. Dentro de la función creadora refactorizada, se referira al objeto creado como **this**.

\* Las funciones en javascript son funciones y objetos a su vez. Por lo cual podemos crear propiedades con la notación de puntos o paréntesis (**[]**). Un objeto función tiene en su parte de objeto una propiedad llamado **prototype**, diferente a **[[prototype]]**. Dentro de la propiedad **prototype** podemos almacenar funciones.

### Refactor userCreator with new Keyword
Al aplicar la lógica del **new** Keyword se nos quedaría así:
```javascript
function userCreator(name, score){
  // const newUser = Object.create(userFunctionStore);  Crea un objeto vacío y lo asigna a "this"
  //                                                    Vincula el [[prototype]] de this al ".prototype" de la función

  this.name = name; // Al objeto creado (this) se le asigna una propiedad (clave:valor) name
  this.score = score;
  // return newUser;  Devuelve automáticamente el objeto creado
}

userCreator.prototype = function(){this.score++;};

// const userFunctionStore = {
//   increment: function(){
//     function add1(){this.score++;}
//     add1()
//   }
// }

const user1 = userCreator("Ari", 3);
const user2 = userCreator("Jae", 5);
user1.increment();
```

Básicamente la keyword **new** crea un **this** que es un objeto vacío, asigna **[[prototype]]** a **funcion.prototype** y devuelve el objeto **this**.
Después le asignamos una propiedad al objeto **prototype** de la función. Esa propiedad contendrá una función anónima que se le pasará por argumento de forma implícita **this** y que tendrá acceso el objeto que hemos creado.