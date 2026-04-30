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