# JavaScript
## Principios de JavaScript
### Hilo de ejecución y contexto de ejecución
En Javascript, cada línea es "ejecutado" una por una en un hilo de ejecución y se guarda en una memoria global. Cuando declaramos una variable o una constante, se guarda en la memoria global su identificador (nombre de la variable) y su valor.
Cuando se ejecuta con una función, guarda en la memoria el nombre de la función y en su contenido el cuerpo de la función.
Cuando se ejecuta una función, se crea un contexto de ejecución y una memoria local. En ese contexto de ejecución, hay un hilo de ejecución que ejecuta línea a línea el contenido de esa función guardando en su memoria local lo que encuentre y devuelve (si es el caso) un valor que puede estar guardado en la memoria global o no. Una vez terminado de ejecutarse, ese contexto de ejecucíón se olvida y sigue con el hilo principal

### Call Stack
Es una pila (LIFO *Last In First Out*) para que JavaScript sepa que función se está ejecutandose y a donde volver cuando una vez termina (con return). Por ejemplo, cuando se ejecuta una función, este se pone en la pila y depués se saca y vuelve a la ejecución del contexto global.
Como JavaScript es monohilo, solo hay un Call Stack por lo que solo puede ejecutar una cosa a la vez.