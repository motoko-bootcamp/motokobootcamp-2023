# Día 1

Bienvenidos a vuestro primerísimo día del **Motoko Bootcamp 2023**.

Hoy está lleno de actividades y lecciones. Este primer día será intenso, pero toma la oportunidad de conectar con tus compañeros y prepárate para el viaje que viene! <br/>
Para hoy no hay [tarea](../../../README.md/#tasks-🎯) planeada, pero prepárate porque mañana tendréis la primera y empezareis el [proyecto principal](../../../core_project/PROJECT.md).

Hoy es una introducción a Motoko: ¡Hay mucho por cubrir! por lo que no te desesperes si te quedas atrás. Tómate tu tiempo para entender el material. Diviértete, concéntrate y vamos a sobrevivir a esto juntos 💪

# <a id="lectures-and-events"> 🍿 Eventos y  lecciones </a>
- <b> Evento: Inició Motoko Bootcamp. </b> <br/>
¡Prepárate para el inicio de tu viaje en el Motoko Bootcamp con nuestro excitante evento de inicio! Únete a nosotros mientras profundizamos en la organización de tu semana, compartiendo valiosos consejos, y escuchando historias inspiradoras de antiguos alumnos que tuvieron éxito en el programa.
- <b> Lección: Visión general de un proyecto: documentos, documentaciones y paquetes. </b><br/>
Seguidamente, profundizaremos sobre el lado técnico de las cosas con lecciones sobre la visión general de un proyecto, incluyendo todos los detalles importantes sobre los documentos, documentaciones y paquetes. También explicaremos un ejemplo de desplegado (deployed) con dfx y os enseñaremos cómo navegar por la estructura y entender la utilidad de cada documento.
- <b>Lección: Motoko - variables (variables), tipos (types), funciones (functions) y bucles (loops) </b> <br/> A medida que avancemos, profundizaremos en el corazón del lenguaje Motoko con lecciones sobre variables, tipos, funciones y bucles. Estos son los conceptos esenciales que necesitarás dominar durante la semana, y nuestros instructores expertos os guiarán en cada paso del camino.
- <b> Lección: ¿Cómo usar dfx para desplegar un canister? </b><br/>
Finalmente os enseñaremos cómo sacar el mayor partido de dfx mediante la proporción de una lectura en profundidad sobre cómo usarlo para desplegar y gestionar tus canisters.

Asegúrate de consultar [el calendario](https://calendar.google.com/calendar/u/0/embed?src=e0a9c944a17afc070ed77f9f10688eaac557ebd0251c5e6d0b724253506d43b3@group.calendar.google.com) para conocer precisamente el horario de cara leccion.

# <a id="introduction-to-the-motoko-language"> 🧩 Introducción del lenguaje Motoko!</a>
## <a id="what-is-motoko"> 👻 Que es Motoko? </a>
<p align="center"> <img src="../../../daily_guides/day_1/img/motoko_banner.png" width="400px" style="border: 2px solid black;"> </p>

El Internet Computer es una plataforma que aloja (hosts) un número largo de aplicaciones, las cuales operan con fluidez dentro de contenedores especiales llamados “canisters”. <br/> [La Fundacion DFINITY](https://dfinity.org/) ha introducido un nuevo lenguaje llamado Motoko, el cual es un lenguaje de programación diseñado específicamente para crear aplicaciones descentralizadas (dApps) en el Internet Computer. <br/> Los canisters en la plataforma se ejecutan usando módulos WebAssembly. WebAssembly es como una máquina virtual que ayuda a ejecutar instrucciones especiales, llamadas bytecode, en el Internet Computer. Es genial para construir aplicaciones eficientes en Internet porque es más rápido, más eficiente, y funciona en distintos dispositivos. Dado que Motoko puede convertir directamente su código a [WebAssembly](https://webassembly.org/), es un lenguaje increíble para construir en el Internet Computer.

Cabe señalar que WebAssembly, o “WASM” para acortar, fue codiseñado por [Andreas Rossberg](https://github.com/rossberg), quien se unio a la Fundacion DFNITY al principio de 2017 para trabajar en su entorno de ejecución de canister smart contract, y también es el diseñador original del lenguaje Motoko. La norma es mantenida por el [World Wide Web Consortium](https://www.w3.org/).

Un **documento Motoko** es un documento con la extensión .mo

<p align="center"> <img src="../../../daily_guides/day_1/img/mo_extension.png" width="400px" style="border: 2px solid black;"> </p>

—
<i> Motoko tiene un logotipo muy interesante que ha sido intensamente usado y modificado en la comunidad.

Así que no solo serás capaz de construir lo último en aplicaciones descentralizadas con Motoko, sino que también tendrás el mejor logo en el juego. ¿No nos crees? Solo revisa el [Motoko NFT market](https://entrepot.app/marketplace/motoko) y compruébalo tú mismo. </i>

<p align="center"> <img src="../../../daily_guides/day_1/img/motoko_variations.png" width="400px" style="border: 2px solid black;"> </p>
<p align="center"> ¿Quién será el siguiente Motoko en la ciudad?</p>

## <a id="what-is-a-canister"> 🥫 ¿Qué es un Canister? </a>
El concepto de **Canisters** es fundamental para entender cómo las dApps son desarrolladas en el Internet Computer.
<p align="center"> <img src="../../../daily_guides/day_1/img/canister_overview.png" width="800px" style="border: 2px solid black;"> </p>
<p align="center"> Vista general de un canister.</p>

Un canister está compuesto de:

- Un **módulo WebAssembly** el cual es una pieza de código compilado de lenguajes como Rust o Motoko. Este es el código que es instalado en el canister y en última instancia, es ejecutado.
- Una **Memoria WebAssembly** - también llamadas páginas de memoria. Es donde el estado del canister y los documentos (fotos, videos, tokens..) son almacenados. El código ejecutado por el WebAsembly module modificará la memoria.
<i> Un WebAssembly module puede ser reemplazado por uno nuevo manteniendo la memoria intacta- esto es lo que permite al canister ser actualizado sin perder los datos. <i/>

Los usuarios interactúan con el Canister directamente mediante el envío y la recepción de mensajes (lo cual corresponde a una función public en el canister como veremos más adelante)

Hay dos tipos de llamadas:

- Update call: Este tipo de llamada es usada cuando un usuario quiere modificar el estado de un Canister (como publicar un mensaje en una red social, enviar un token, o actualizar su perfil). Para asegurar la integridad del Internet Computer, estas llamadas deben ser procesadas mediante consenso y por todos los nodos, con el resultado de un retraso de 1-2 segundos.

<p align="center"> <img src="../../../daily_guides/day_1/img/update_call.png" width="600px" style="border: 2px solid black;"> </p>
<p align="center"> La llamada es procesada por todos los nodos de los canisters.</p>

- Query call: Este tipo de llamada es usada cuando un usuario quiere leer datos ( como buscar en las redes sociales, mirar las fotos, o descargar una película) sin modificar el state. Estas llamadas pueden ser respondidas por un solo nodo, haciéndoles rápidos para responder (alrededor de 200 milisegundos). Sin embargo, el punto en contra es que las query calls son menos seguras ya que un nodo maligno podría potencialmente proporcionar información falsa.

<p align="center"> <img src="../../../daily_guides/day_1/img/query_call.png" width="600px" style="border: 2px solid black;"> </p>
<p align="center"> La llamada es procesada por un único módulo.</p>

## <a id="what-is-an-actor"> 📬 Que es un actor? </a>
Si abres cualquier documento main.mo te daras cuenta que la primera palabra es **actor**:
```
actor {

    /// CODE

};
```
Un actor es simplemente la representación de un canister en el lenguaje Motoko. <br/>
Esta nomenclatura viene del [Actor model](https://en.wikipedia.org/wiki/Actor_model), que es una forma de escribir programas de computadora que pueden manejar varias tareas al mismo tiempo. Esto lo hace mediante el uso de “actors” como los pilares básicos del programa. <br/> Un actor es un pequeño programa de computadora que puede recibir mensajes , hacer alguna tarea con ellos y enviar los mensajes a otros actors. Actors también pueden crear nuevos actors y controlarlos. Todos los actors se comunican entre ellos mediante el envío de mensajes. Como todas las interacciones entre actores se realizan mediante el paso de mensajes, esto permite niveles altos de concurrencia y paralelismo, haciendo que esto sea muy adecuado para sistemas distribuidos (¡y eso es exactamente lo que el Internet Computer es!).

**En ese sentido el Internet Computer es como una computadora mundial gigante donde cada programa es un canister**

<p align="center"> <img src="../../../daily_guides/day_1/img/actor_model.gif" width="800px" style="border: 2px solid black;"></p>
<p align="center"> Recibir - Procesar - Enviar - Recibir - Procesar - Enviar  </p>

Ya que los canister han sido implementados para seguir el actor model - no te sorprenderá aprender que los canisters:

- Tienen un private state (memoria) & puden ejecutar cálculos.
- Reciben mensajes de otros usuarios u otros canisters.
- Pueden enviar mensajes a usuarios u otros canisters.
- Pueden crear otros canisters.

## <a id="variables"> 📦 Variables </a>
En Motoko las variables pueden ser declaradas ya sea usando las palabras claves “**let**” o “**var**”, seguido por el operador de asignación “**=**”. Las variables declaradas con “**let**” son inmutables, lo que significa que su valor no puede cambiar una vez ha sido asignado. Por el contrario, las variables declaradas con “**var**” son mutables, es decir que su valor puede ser reasignado a un valor nuevo en cualquier momento usando el operador de reasignación “**:=**”.
<br/><b>Siempre que</b> declares una variable no olvides acabar la declaración usando “**;**” de lo contrario Motoko se quejará!<br/>
Vamos a declarar un par de variables:
```
let a = 5;
var b = 5;
b := 6;
```
Sin embargo, si intentamos el siguiente código:
```
let a = 4;
a := 5;
```
Un intento para reasignar  un valor a una variable inmutable es hecho - eso es porque un error sucede. El mensaje de error específico será “type error [M0073], expected mutable assignment target." Este mensaje de error indica que la variable que se intenta reasignar es inmutable y no puede ser cambiada.

## <a id="types"> 🍎 Types (Tipos) </a>
El lenguaje Motoko hace un gran énfasis en los types, y es más estricto a la hora de hacerlos cumplir en comparación con otros lenguajes de propósito general como JavaScripts o Python. Esta rigurosidad tiene un propósito, ya que previene errores o problemas.
<p align="center"> <img src="../../../daily_guides/day_1/img/motoko_primitives_types.png" width="800px" style="border: 2px solid black;"> </p>
<p align="center">Un par de types básicos de Motoko</p>

<i> En Motoko, cada variable es asignada a un type específico, el cual es determinado antes de la ejecución del programa. El compilador revisa el uso de cada variable para evitar errores que pueden ocurrir durante la ejecución, como error de referencia null (nula), accediendo a campos inválidos, y otros tipos de problemas relacionados.</i>

Siempre que quieras asignar un type a un valor, puedes usar un doble punto “:”, como se muestra en el siguiente ejemplo:
```
var age : Nat = 20;
```
También puedes omitir la declaración del type - en los siguientes casos, el compilador entenderá automáticamente que la variable “age” es del tipo “Nat” (número natural) porque el primer valor asignado es 20.
```
var age = 20;
```
<br/><b>Sin embargo, mientras dure el Bootcamp es recomendable seguir las mejores prácticas y asignar manualmente los types de las variables, especialmente si eres nuevo en Motoko o los lenguajes tipados. </b>

Veamos un par de types!

## <a id="nat"> 🔢 Nat </a>
**Nat** es usado para los números naturales unbounded (1,2,3,4,..... ♾️). Si intentas asignar un número negativo a **Nat** el programa se parará. Unbounded significa que nunca [desbordarán](https://www.youtube.com/watch?v=WN8i5cwjkSE). La representación de la memoria crecerá para acomodar cualquier número finito.
```
let n : Nat = 10;
```
Las operaciones más usuales son incluidas también:
- Suma: Puedes sumar dos números usando el operador de suma “**+**”.
```
let a : Nat = 1 + 1; //2
```
- Resta: Puedes restar dos números usando el operador de resta “**-**”.
```
let a : Nat = 10 - 2; //8
```
>Cuando se use el operador de resta con el type **Nat**, se cuidadoso! Porque Nat solamente usa los números positivos. Si el resultado de una resta es menor de cero, no encajará. El valor dejará de ser de type **Nat** y eso puede causar problemas si tu programa está esperando un valor del type **Nat**, simplemente puede **trap**. Una trap es como un “tiempo muerto” para tu código, es un error que ocurre durante la ejecución, y cuando sucede, el programa parará y devolverá un mensaje de error, indicando que algo ocurrió mal.
- Multiplicación: Puedes multiplicar dos números usando el operador de multiplication “**\***”
```
let a : Nat = 10 * 10; //100
```
- División y módulo: Puedes dividir dos números, usando el operador de división ‘**/**’ y para encontrar el resto de a entre b, puedes usar el operador de modulo ‘**%**’.
```
let a : Nat = 10 / 2; //5
let b : Nat = 3 % 2; //1
```
## <a id="int"> ➖ Int </a>
El type de dato **Int** incluye todos los números enteros, tanto negativos como positivos. Esto incluye todos los números en el tipo de dato **Nat**. Las mismas operaciones matemáticas vistas antes (suma, resta, multiplicación, división y módulo) pueden ser realizadas en ambos tipos de datos **Int** y **Nat**.

>Motoko incluye versiones especiales de los integers y los números naturales que tienen un rango limitado de valores que pueden representar. Estas versiones son diferentes de las versiones regulares. Cada una tiene un número específico de bits (8,16,32 o 64) que determinan el rango de valor que pueden representar. Si un valor excede el límite, el programa parará de ejecutarse y ocurrirá un error.

## <a id="bool"> 🚦 Bool </a>
**Bool** representa booleans.
Este tipo de dato contiene solamente dos tipos de valores **true** y **false**. Más tarde veremos cómo usar de la mejor manera los booleans.
```
let light_on : Bool = True;
```
## <a id="text"> ✏️ Text </a>
El tipo **Text** es usado para representar una secuencia de caracteres, como palabras o frases.
```
let t : Text = "Motoko bootcamp 2023";
```
> Veremos en otro módulo que el tipo **Text** es en realidad una concatenación de otro tipo llamado **Char**.

## <a id="function"> ⚙️ Función </a>
Con el conocimiento que tenemos ahora - démosle un vistazo al siguiente actor.

<p align="center"> <img src="../../../daily_guides/day_1/img/motoko_sample_code.png" width="800px" style="border: 2px solid black;"> </p>

Este código está estructurado en 2 partes diferentes:
- Una declaración de variable para la variable llamada **”name”** del tipo **Text**. Esta variable es asignada al valor **”Motoko”**.
- Una función de declaración para una función pública llamada **”change_name”** que toma un argumento llamado **”new_name”** del tipo  **Text** y (asíncronamente), modifica nuestro valor interno y devuelve el valor. 

<b> Async? Public? </b>
Hay muchas palabras claves que necesitamos explicar. Empecemos una por una:

- **Public**. La palabra clave “**public**” en la declaración de funciones indica que la función puede ser accedida y llamada por usuarios externos u otros canisters. Por otro lado, las funciones “private” solo pueden ser llamadas por el mismo canister como veremos más tarde.

- **Async**. La palabra clave **async** antes del valor de retorno indica que la función se tomará un tiempo para completar y el caller tiene que esperar por una respuesta. Esto está en línea con el actor model de los canisters, lo que significa que siempre responderán a las peticiones con retraso.

- **var**. La palabra clave **var** es usada para declarar una variable mutable como hemos visto anteriormente.

El **body** de la función es un set de instrucciones ejecutadas cuando la función es llamada. En nuestro ejemplo, para **cahnge_name** tenemos 2 instrucciones:

- La primera tomará el valor del argumento “**new_name**” proporcionado por la persona que llama a la función y lo asigna a la variable llamada “**name**”. Esto cambia el valor almacenado en la variable “**name**” al valor de “**new_name**”.
```
name := new_name;
``` 
- La segunda instrucción devolverá lo que sea que ahora esté dentro de la variable “**name**”.
```
return name; 
``` 
Por ejemplo - llamando a change_name(“Motoko”) devolverá “**Motoko**”.

Una función siempre necesita devolver algo, ese es el por qué deberias terminar el body de tus funciones con la palabra “**return**”.

## <a id="errors"> ❌ Errores </a>
Revisemos el siguiente código:
<p align="center"> <img src="../../../daily_guides/day_1/img/motoko_type_error.png" width="800px" style="border: 2px solid black;"> </p>
<p align="center"> Ahí hay algo mal 😖</p>

En este ejemplo estamos indicando que el tipo de return de **change_name** es un **Nat** pero en realidad estamos devolviendo name el cual es de tipo **Text**. En este caso el compilador de Motoko indicará:
```
expression of type
  Text
cannot produce expected type
  Nat
```
Esto se llama un **Type error** y probablemente el tipo de error más común - así que tenlo en mente!

Otro error común que señalamos antes es el siguiente: 
```
let a : Nat = 10 - 20;
```
Si intentamos desplegar el siguiente actor:
```
actor {
let a : Nat = 10 - 20;
}
```
El despliegue fallara y devolverá un mensaje de error que dirá: "**Call was rejected: Request ID: 4af8e36bec7f235c4ea88ca581f1e42afa7a1951b2249108b63d5ef0b52898ae Reject code: 4 Reject text: Canister 3f6pv-baaaa-aaaab-qacoq-cai trapped explicitly: Natural subtraction underflow**".

## <a id="what-is-candid"> 👽 ¿Qué es Candid y por qué lo necesitamos? </a>
Un concepto importante con el que necesitarás familiarizarte es “**Candid**”.
Imaginemos la siguiente situación:
- Estamos escribiendo un canister en Motoko y hemos definido un valor x de tipo **Nat**.
```
let x : Nat = 5;
```
- Sabemos que hay otro canister que expone una función pública “square” que devuelve el cuadrado de un número - este canister está escrito en [Rust](https://www.rust-lang.org/).
```
#[ic_cdk_macros::query]
fn square(value: u128) -> u128 {
  value * value
}
```
Queremos calcular el cuadrado de nuestro valor x, pero en vez de implementar la función nosotros mismos en Motoko, usaremos la función del otro canister (si, eso es posible se llama **intercanister-calls** (llamadas entre canisters) y será abordado en otra lección!)

La situación sería la siguiente:
<p align="center"> <img src="../../../daily_guides/day_1/img/rust_motoko_situation.png" width="600px" style="border: 2px solid black;"> </p>
<p align="center"> En ocasiones la comunicación puede ser difícil...</p>

Desde la perspectiva del canister de Rust, hay un problema fundamental: el método **square** espera un input del tipo **u128** y devuelve un output del mismo tipo, pero el valor x que recibirá es de tipo **Nat**. Esto crea un problema ya que estamos intentando mezclar tipos de Motoko (**Nat**) y tipos de Rust (**u128**). <br/>

>Servicios de composición  (i.e canisters) escritos en diferentes lenguajes es el fundamento de Internet Computer. Este es el porque necesitamos introducir una Interface Description Language (IDL). Una Interface Description Language (IDL) es un término general que habilita a un programa escrito en un lenguaje comunicarse con otro programa escrito en un lenguaje desconocido.

Candid es un IDL que describe los servicios públicos desplegados en los canisters en el Internet Computer. La interfaz Candid permite la interoperabilidad entre servicios, y entre servicios y frontends, independientemente del lenguaje de programación usado.

El propósito de la interfaz Candid es similar al proposito de una [REST API](https://www.redhat.com/en/topics/api/what-is-a-rest-api), pero donde APIs tipicamente usan [JSON](https://www.youtube.com/watch?v=iiADhChRriM) para intercambiar datos, Candid es una Interface Description Language (IDL). IDL es una plataforma y un lenguaje de programación neutro, y describe el servicio, formato de datos, estructura de datos, etc. Lee más sobre Candid en la documentación. 

Candid resuelve el problema que presentamos antes, habilitando un mapping entre tipos de diferentes lenguajes.

<p align="center"> <img src="../../../daily_guides/day_1/img/candid_mapping.png" width="600px" style="border: 2px solid black;"> </p>

Podemos definir la interfaz del Rust Canister con el siguiente documento Candid:
```
service : {
  "square": (nat) -> (nat) query;
}
```
Nuestro servicio tiene una única función llamada square y esta función toma un Nat y devuelve un Nat (después de estar esperando por ello). Date cuenta que estamos usando el tipo **Nat** desde Candid ( no el **Nat** desde Motoko). La descripción del servicio es independiente del lenguaje en el cual fue escrito - ¡esta es la llave!

<p align="center"> <img src="./img/candid_solved.png" width="600px" style="border: 2px solid black;"> </p>
<p align="center">Candid es el espacio en común para todos los canisters para resolver sus incomprensiones!</p>

## <a id="the-did-file"> 📁 El DID-file (.did) </a>
Para seguir esta parte recomendamos  que despliegues (localmente) el ejemplo greet dApp que es entregado con dfx.
- Crea el código para este proyecto ejecutando:
```bash
$dfx new greet
```

- Inicia tu réplica local con el siguiente comando:
```bash
$dfx start
```

- Abre otra pestaña de la terminal & despliega el proyecto (localmente) ejecuanto:
```bash
$ dfx deploy
```
La interfaz Candid es automáticamente generada cuando construyes un proyecto Motoko, pero también puede ser escrita manualmente. En su forma simple, el Candid DID-file contiene una descripción del servicio. Cuando el proyecto es desplegado, el documento `greet.did` contendrá la descripción de este servicio:
```
service : {
  greet: (text) -> (text) query;
}
```
> Puedes encontrar el documento .did en .dfx/local/canisters/greet_backend. Si no lo ves asegúrate que has construido y desplegado el proyecto.

La greet dApp tiene una función pública: `greet(text)`. A partir de la descripción del servicio podemos ver, que la función greet() toma un Text y devuelve otro Text, y el servicio es una función query(ejecución rápida).

Puedes ver más usos avanzados de Candid en la [documentacion](https://internetcomputer.org/docs/current/developer-docs/build/candid/candid-concepts) o en otros [ejemplos de Motoko](https://github.com/dfinity/examples/tree/master/motoko).

La interfaz Candid, como previamente mencionamos, permite la interoperabilidad entre servicios, y entre servicios y frontends. Candid también es útil llamando a los Canisters desde distintos lugares:
- Usando la terminal con `dfx`.
- Usando la Candid UI.
- Usando una frontend (página web) con el JavaScript Agent.

<b> Veamos los diferentes métodos! </b>
## <a id="using-the-terminal"> 📺 Usando la  terminal (dfx) </a>
La interfaz Candid permite que llames a los servicios backend o funciones desde la línea de comandos. Esto es útil para tareas administrativas que no requieren un frontend o para pruebas del backend. En el ejemplo de la greet dApp, puedes llamar el método greet() ejecutando el comando:
```bash
$ dfx canister call greet_backend greet '("motoko")'
("Hello, motoko!")
```
La estructura general para llamar cualquier método desde cualquier canister es la siguiente:
```bash
$ dfx canister call <CANISTER_NAME OR CANISTER_ID> <METHOD_NAME> '(ARGUMENT)'
```
Si quieres, puedes llamar un canister en la red principal. Solo necesitas añadir la flag –network ic:
```bash
$ dfx canister --network ic call <CANISTER_NAME OR CANISTER_ID> <METHOD_NAME> '(ARGUMENT)'
```
> Observa que al utilizar dfx deberias poner siempre tus argumentos ente “**()**”. El formato de los argumentos es el formato Candid.

Para más información sobre cómo llamar a los canisters desde la línea de comando, mira la [documentacion](https://internetcomputer.org/docs/current/references/cli-reference/dfx-canister).

## <a id="candid-ui"> 📲 Candid UI </a>
Mientras que la línea de comando puede ser muy práctica, también hay una forma fácil de llamar a los servicios backend, y eso es mediante el uso de Candid UI.Cuando un proyecto es desplegado, además de la interfaz Candid, también se despliega un canister que ejecuta el Candid UI. El proceso de construcción mostrará la URL en la consola, pero la URL también puede ser encontrada en `greet/.dfx/local/canister_ids.json`:
```json
{
  "__Candid_UI": {
    "local": "r7inp-6aaaa-aaaaa-aaabq-cai"
  },
  "greet_backend": {
    "local": "rrkah-fqaaa-aaaaa-aaaaq-cai"
  },
  "greet_frontend": {
    "local": "ryjl3-tyaaa-aaaaa-aaaba-cai"
  }
}
```
En este caso la URL a la Candid UI es http://127.0.0.1:4943/?canisterId=r7inp-6aaaa-aaaaa-aaabq-cai&id=rrkah-fqaaa-aaaaa-aaaaq-cai

>Es posible que la URL para el Candid UI pueda ser distinta en tu computadora. Asegúrate de ajustar la URL en correspondencia con los canisters IDs en tu propio documento.

Simplemente haz clic en los botones **Query**, y mira la respuesta en la Output Log.
<p align="center"> <img src="../../../daily_guides/day_1/img/candid_ui_local.png" width="600px" style="border: 2px solid black;"> </p>

<b> Local or Live? </b> <br/>
Una confusión importante de evitar es la diferencia entre las Candid UIs local & live:

- La [live Candid UI](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.ic0.app/) es unico para el internet Computer entero - puedes acceder la interfaz de cualquier dApp (asumiendo que el documento candid ha sido enviado). Mediante el uso de live Candid UI puedes modificar directamente el state de un canister. Para enseñarte lo impresionante que es, hemos desplegado un canister “messenger”. Este canister puede almacenar un mensaje y mostrarlo a través de la función “**see_message**”. El mensaje puede ser modificado llamando la función “**change_message**”. Puedes acceder la Candid UI para este canister [aquí](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.ic0.app/?id=rhjue-eaaaa-aaaaj-qazra-cai).

<p align="center"> <img src="./img/candid_live.png" width="600px" style="border: 2px solid black;"> </p>
<p align="center"> Revisa el mensaje dejado para ti y deja otro mensaje para el siguiente estudiante. Se bueno🙏 </p>

- El Candid UI local que hemos intentado antes está solamente desplegado en tu réplica local. Esto solo puede darte acceso al canister que has desplegado localmente.

> Por cierto - la Candid UI (live o local) es también desplegada en un canister.

## <a id="using-the-frontend"> 📑 Usando Candid en el frontend </a>
La greet dApp tiene ambos backend y frontend, y el frontend accede a los servicios backend a través de la interfaz Candid. El código fuente del proyecto está organizado en las tres carpetas siguientes:

- declarations
- greet_backend 
- greet_frontend

Miremos el documento frontend’s JavaScript localizado en src/greet_frontend/src/index.js . Este documento es responsable de manejar la lógica del front-end de la greet dApp. front-end y back-end están conectados usando la interfaz Candid la cual permite al front-end acceder a los servicios back-end.

```javascript
import { greet_backend } from "../../declarations/greet_backend";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const name = document.getElementById("name").value.toString();

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  const greeting = await greet_backend.greet(name);

  button.removeAttribute("disabled");

  document.getElementById("greeting").innerText = greeting;

  return false;
});
```
Hay dos líneas en este código las cuales merecen la pena prestar atención, en referencia a Candid. La primera línea es donde la descripción del servicio Candid es importada, y en este caso no es el documento greet.did sino que es el documento index.js. El Candid index.js es generado automáticamente cuando el proyecto es construido, e importa los servicios motoko del backend.

```javascript
import { greet_backend } from "../../declarations/greet_backend";
```
Después de importar la interfaz Candid podemos usar el servicio public del backend, el cual se ilustra en esta línea:
```javascript
const greeting = await greet_backend.greet(name);
```
La función de actualización `greet()` es llamada con name como un parámetro, el cual devolverá el greet message. La llamada es asíncrona así que un **await** es añadido por lo que el frontend está esperando por una respuesta antes de seguir.

Un número de agents se desarrollan por ambos DFNITY y la comunidad para integrar fácilmente la interfaz Candid en diferentes lenguajes. Mira la [documentacion](https://internetcomputer.org/docs/current/developer-docs/build/agents/) para una lista de agents disponibles.

## <a id="motoko-playgroun"> 🛝 Motoko Playground </a>
Para probar pequeños fragmentos , o para probar algunas ideas, [Motoko Playground](https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app) puede ser muy útil. Puedes escribir código Motoko en el editor, y desplegarlo en canisters sin ir a través de los pasos para desplegar manualmente el código ya sea local o en la red principal. Todas las funciones/servicios públicos pueden ser probados con el Candid UI integrado. Pueba el [Motoko Playground](https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app) seleccionando el proyecto Counter y mira la misma interfaz Candid que en el ejemplo anterior.
![Motoko Playground](./img/motoko_playground.png)

# <a id="questions"> 🙋 Preguntas </a>
1. ¿Cuánta es la capacidad de la memoria de un canister?
2. ¿Cuál es el problema con el siguiente ejemplo de código?
```
actor {
  let counter : Nat = 0;
  public func increment_counter() : async () {
    counter := counter + 1;
  };
}
```
3. ¿Cuál es el problema con el siguiente ejemplo de código?
```
actor {
  var message : Text = 0;

  public query func change_message(new_message : Text) : async () {
    message := new_message;
    return;
  };
  
  public query func see_message() : async Text {
    return(message);
  };
}
```
4. Verdadero o Falso: podemos quitar la palabra clave **async** para el argumento return de una función query,ya que las query son más rápidas de responder.

# <a id="coding-challenges"> 🥊 Coding challenges </a>
1. Escribe una función **multiply** que tome dos números naturales y devuelva el producto.
```
multiply(n : Nat, m : Nat) -> async Nat
```
2. Escribe una función **volume** que tome dos números naturales n y devuelva el volumen de un cubo con una longitud de lado n.
```
volume(n : Nat) -> async Nat
```
3. Escribe una función **hours_to_minutes** que tome un número de horas n y devuelve el número de minutos.
```
hours_to_minutes(n : Nat) -> async Nat
```
4. Escribe dos funciones **set_counter** y **get_counter**.
- set_counter establece el valor del counter a n
- get_counter devuelve el valor actual del counter.
```
set_counter(n : Nat) -> async ()
get_counter() -> async Nat
```
5. Escribe una función **test_divide** que tome dos números naturales n y m y devuelva un boolean indicando si n es divisible entre m.
```
test_divide(n: Nat, m : Nat) -> async Bool
```
6. Escribe una función **is_even** que tome un número natural n y devuelva un boolean indicando si n es par.
```
is_even(n : Nat) -> async Bool 
```
# <a id="useful-resources"> 🔗 Links y Recursos útiles </a>
- [Internet Computer Documentacion](https://internetcomputer.org/docs/current/developer-docs/ic-overview)
- [Motoko Documentacion](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko)
- [Candid Documentacion](https://internetcomputer.org/docs/current/developer-docs/build/candid/candid-intro)
- [Motoko Playground](https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app)
- [Agents](https://internetcomputer.org/docs/current/developer-docs/build/agents/)
- [DFX](https://internetcomputer.org/docs/current/references/cli-reference/)
- [Ejemplos de proyectos](https://github.com/dfinity/examples)


