# Día 3 🐥
¡Bienvenido al Día 3 del Motoko Bootcamp! <br/> Esperamos que se sienta como un ninja de la programación listo para abordar temas aún más avanzados. Hoy, nos sumergiremos en las solicitudes HTTP en Motoko y aprenderemos a interactuar con los recipientes desde una interfaz utilizando el agente de JavaScript. También aprenderá sobre coincidencia de patrones y variantes en Motoko, lo que le dará el poder de controlar su código.
Además, también presentaremos estructuras de datos como operaciones HashMap/TrieMap y CRUD. Estas estructuras de datos serán realmente útiles cuando trabaje en el [proyecto central](../../../core_project/PROJECT.md). <br/>

No dudes en pedir ayuda a tus compañeros de equipo o mentores si la necesitas. Recuerde, todos estamos aquí para aprender, reír y apoyarnos unos a otros. 😉
# 🍿 Conferencias
- **Frontend: interactuando con su bote usando JavaScript (Identidad, Agente, Actor).** <br/>
En esta lección, aprenderá cómo puede interactuar con sus recipientes desde una página web usando JavaScript. Esto es extremadamente útil ya que es la forma en que la mayoría de los usuarios interactúan con las dApps. Aprenderás sobre conceptos fundamentales como Identidad, Agente o Actor y cómo usarlos.

- **Motoko: tipo personalizado, variantes, coincidencia de patrones y tipo de resultado.** <br/>
En esto, aprenderá cómo puede crear sus tipos personalizados, lo que le brinda la capacidad de representar datos de la manera que mejor se adapte a su programa: cómo manejar variantes que le permitan definir diferentes casos y combinarlos con la coincidencia de patrones. Finalmente, aprenderá sobre el tipo **Result** en Motoko. Aprenda a crear sus propios tipos, manejar errores, hacer coincidir patrones y hacer que su código sea más eficiente, legible y mantenible.

- **Motoko: HashMap, TrieMap y CRUD.** <br/>
En esta lección, aprenderá cómo usar estas poderosas estructuras de datos y cómo realizar operaciones CRUD en recipientes. CRUD significa Crear, Leer, Actualizar y Eliminar; esas son operaciones básicas que se pueden realizar en una base de datos y se utilizan para administrar datos en un almacenamiento persistente. Esto será crucial para trabajar en el proyecto principal.

# 🧩 Motoko: tipos opcionales y genéricos y funciones de orden superior.
## 🫙 Tipo opcional
En Motoko, como en muchos otros lenguajes de programación, existe un valor especial llamado "null" que representa la ausencia de un resultado. Esto es útil cuando se indica que una función no devolverá nada. El valor nulo es de tipo **null** (y el tipo **null** contiene solo un valor que es nulo). <br/> Por ejemplo, imagina que tienes un Array de nombres llamada "**nombres**" y una función llamada "**buscar_nombre**" que toma una lista de nombres como entrada y devuelve el primer índice tal que el nombre está en la Array en ese índice. Si no se encuentra el nombre, la función debe devolver "null" en lugar de un índice. De esta manera, la función indica que no encontró el nombre, ¡en lugar de producir un error!

Si escribimos lo siguiente:
```
let names : [Text] = ["Motoko", "Rust", "JavaScript", "TypeScript"];
public func find_name(name : Text) : async Nat {
    for((language, index) in names.vals()){
        if (x == name){
            return index;
        };
    };
    return null; // No encontramos ninguna coincidencia, devolvemos null.
};
```
Esta declaración no es válida - Motoko arrojará el siguiente error:
```
type error [M0050], literal of type
  Null
does not have expected type
  Nat
```
Esto se debe a que "null" no es del tipo **Nat**.
Para indicarle a Motoko que una función puede devolver un valor **Nat** o "null", necesitamos una forma de expresar que el tipo de devolución de la función puede ser una de dos posibilidades. Esto se debe a que el valor de retorno específico de la función depende de la entrada que no conocemos de antemano, por lo que no podemos predecir si la función devolverá un **Nat** o "null" hasta que se ejecute realmente. <br/>

Para expresar eso podemos usar un **tipo opcional**: "**?T**".
En nuestro caso usaríamos "**?Nat**". Podemos reescribir nuestro código usando esta nueva notación:
```
let names : [Text] = ["Motoko", "Rust", "JavaScript", "TypeScript"];
public func find_name(name : Text) : async ?Nat {
    for((language, index) in names.vals()){
        if (x == name){
            return index;
        };
    };
    return null; // No encontramos ninguna coincidencia, devolvemos null.
};
```

> El tipo opcional indicado por ? se puede usar con cualquier otro tipo y no se limita a **Nat**. Podemos tener **?Text**, **?Int**, **?Bool** y más...

El tipo "opcional" se usa a menudo junto con el patrón "interruptor/carcasa" en Motoko. Este patrón le permite manejar un valor opcional y ejecutar diferentes partes de su código dependiendo de si el valor de entrada es "null" o no. En otras palabras, puede usar el patrón "cambiar/caso" para verificar si un valor opcional está presente o no, y luego realizar diferentes acciones en función de eso. Esto permite un código más elegante y seguro, ya que le permite manejar el caso en el que la entrada es nula y evitar cualquier comportamiento inesperado.

```
public func handle_null_value(n : ?Nat) : async Text {
    switch(n) {
        // Check if n is null 
        case(null){
            return ("The argument is null"); 
        };
        case(? something){
            return ("The argument is : " # Nat.toText(something));
        };
    };
};
```

  mundo final en el tipo opcional: hay un módulo de la biblioteca Base llamado [Opción](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/base/Bool). Este módulo le permite realizar operaciones sobre valores opcionales.

<p align="center"> <img src="../../../daily_guides/day_3/img/option_module.png" width="800px" style="border: 2px solid black;"> </p>

Por ejemplo, puede usar la función "**Option.get**" para desenvolver un valor opcional con un valor predeterminado, como se muestra a continuación:
```
import Option "mo:base/Option";
actor {

    public func always_return_a_nat(n : ?Nat) : async Nat {
        return(Option.get(n, 0))
    };

}
```

Esta función tomará **?Nat** como entrada y devolverá **Nat**. Si proporciona **Nat** como entrada, devolverá lo mismo, pero si proporciona "**null**", devolverá el valor predeterminado, que se establece en 0.

Por ejemplo, suponiendo que implementó el actor en su réplica local (y llamó al contenedor "**ejemplo**"):
```
dfx canister call example always_return_a_nat '(opt 2)'
```
Devolverá:
```
(2 : nat)
```
Considerando lo siguiente:
```
dfx canister call example always_return_a_nat '(null)'
```
Devolverá:
```
(0: nat)
```
## 👤 Tipo genérico
En la sección anterior, presentamos brevemente el concepto de "**tipo genérico**" con la notación "**?T**". Ahora, profundicemos más y exploremos el apasionante mundo de los genéricos.

  tipo genérico, generalmente escrito como "T", le permite escribir funciones y código que puede adaptarse a diferentes tipos. Cuando hablamos de "**T**" en programación, se refiere a "cualquier tipo que quieras".
Esto significa que puede crear una sola función o clase que pueda manejar múltiples tipos de entradas o datos, sin tener que escribir código separado para cada tipo.

Imaginemos que tenemos una tarea entre manos: determinar si el tamaño de un Array es par o no. Vamos a escribir una función llamada "**is_array_size_even**" que toma un Array como entrada y devuelve un valor booleano que indica si el tamaño de esa Array es par o no.

Una forma de lograr esto es escribir algo como esto:
```
public func is_array_size_even(array : [Nat]) : async Bool {
    let size = array.size();
    if(size % 2 == 0){
        return true;
    } else {
        return false;
    };
};
```

Esta función funciona según lo previsto, pero está limitada a arreglos llenos de **Nat**. Entonces, ¿qué sucede si queremos verificar el tamaño de un Array llena de **Texto** o **Int**?

Un enfoque sería crear una función separada para cada tipo posible de Array, como "**_is_array_size_even_nat**", "**_is_array_size_even_text**", "**_is_array_size_even_int**". Pero como puede imaginar, esto rápidamente se vuelve difícil de administrar y mantener.

  mejor solución es utilizar el poder de los genéricos. Con genéricos, podemos escribir una sola función que funcione para cualquier tipo de Array. Es una forma más elegante y eficiente de resolver el problema. Entonces, abracemos a nuestro nuevo amigo, los genéricos, ¡y hagamos que nuestro código sea más dinámico y flexible!
```
public func is_array_size_even<T>(array : [T]) : async Bool {
    let size = array.size();
    if(size % 2 == 0){
        return true;
    } else {
        return false;
    };
};
```

>Observe el "**\<T>**" que sigue al nombre de la función. Significa que esta función ahora depende del tipo de T.

Cuando utilice la función "**array_size**", es importante recordar que deberá especificar el tipo de Array en la que la está utilizando.
```
func is_array_size_even<T>(array : [T]) : Bool {
    let size = array.size();
    if(size % 2 == 0){
        return true;
    } else {
        return false;
    };
};

let array : [Nat] = [1,2,3,4];
let bool : Boolean = is_array_size_even<Nat>(array); // Replace T with the actual type when you use the function. 
```

## 🏋️ Funciones de orden superior
Hasta ahora, todas las funciones que hemos escrito toman argumentos "simples" (**Nat**, **Text**, **Char**, ...) ¡pero las funciones también pueden tomar otras funciones como argumentos! Estas funciones se denominan **Funciones de orden superior** y son funciones versátiles y potentes que pueden adaptarse a muchas situaciones. ¡Desbloqueemos el poder de **Funciones de orden superior** en Motoko!

El [módulo Array](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/base/Array) en particular contiene varias funciones de orden superior; es por eso que lo usaremos como un fuente de ejemplos para esta sección.


- [Find](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/base/Array#function-find): esta función buscará cada elemento en la Array uno por uno, y use el "predicado" (una función o declaración separada) para decidir si es verdadero o falso. Cuando el predicado devuelve verdadero para un elemento en particular, la función devolverá ese elemento. Si ninguno de los elementos forma el return true, la función devolverá "null" (nada/sin valor).
     <p align="center"> <img src="../../../daily_guides/day_3/img/array_find.png" width="800px" style="border: 2px solid black;"> </p>

     Podemos usar esta función de la siguiente manera:
     ```
    import Array "mo:base/Array";
    actor {
        let f = func (n : Nat) : Bool {
            if (n == 10) {
                return true
            } else {
                return false
            };
        };

        public func mystere(array : [Nat]) : async ?Nat {
            return(Array.find<Nat>(array, f));
        };
    
    };
    ```
     > Este ejemplo de código hace uso de los 3 nuevos conceptos que hemos discutido hoy: tipo opcional, tipo genérico y funciones de orden superior.
     <detalles>
         <summary> 🤔 ¿Qué crees que volverá <strong> mystere([8,4,5,18,0,2,3]) </strong> ? </resumen>
         Debería devolver el primer valor que sea igual a 10 en la Array. Como no hay ninguno, devolverá <strong> null </strong>.
     </detalles>

- Filter: esta función tomará un Array, y para cada elemento de esa Array, utilizará el "predicado" (una función o declaración separada) para decidir si es verdadero o falso. Si el predicado devuelve verdadero para un elemento en particular, ese elemento se incluirá en la nueva Array; de lo contrario, se omitirá. La función creará una nueva Array que contiene solo los elementos que pasaron la prueba de predicado.
     <p align="center"> <img src="../../../daily_guides/day_3/img/array_filter.png" width="800px" style="border: 2px solid black;"> </p>

     Podemos usar esta función de la siguiente manera:
    ```
    import Array "mo:base/Array";
    actor {
        let f = func (n : Nat) : Bool {
            if (n < 10) {
                return true
            } else {
                return false
            };
        };

        public func surprise(array : [Nat]) : async ?Nat {
            return(Array.filter<Nat>(array, f));
        };
    };
    ```
     <detalles>
         <summary> 🤔 ¿Qué crees que regresará <strong>sorpresa([1, 30, 8, 12, 129, 2]) </strong>? </resumen>
        un Array donde solo se mantienen los valores por debajo de 10 (el orden no se modifica): <strong> [1, 8, 2] </strong>.
     </detalles>

- Map: esta función tomará un arreglo y una función 'f' que mapea los elementos del arreglo de tipo X a otro tipo Y. Esta función aplicará esta función a cada elemento del arreglo original y creará un nuevo arreglo con el resultado de la función f aplicada a cada elemento. La nueva Array tendrá el mismo orden que la Array original.
     <p align="center"> <img src="../../../daily_guides/day_3/img/array_map.png" width="800px" style="border: 2px solid black;"> </p>

     Podemos usar esta función de la siguiente manera:
     ```
    import Array "mo:base/Array";
    actor {
        let f = func (n : Nat) : Nat {
            return(n + 1);
        };

        public func riddle(array : [Nat]) : async [Nat] {
            return(Array.map<Nat, Nat>(array, f));
        };
    };
    ```
     <detalles>
          <summary> 🤔 ¿Qué crees que volverá el acertijo <strong> ([1, 2, 3, 4]) </strong>?
          </resumen>
           un Array donde todos los valores se han incrementado en uno (el orden no se modifica): <strong> [2, 3, 4, 5] </strong>.
     </detalles>

A veces es útil dar nombres a las funciones para reutilizarlas más tarde; puede usar variables para almacenar funciones como puede hacer con cualquier otro tipo.

```
let f = func (x : Nat) : Nat {
  return(x + x) 
}
```

# 🧩 Motoko: Solicitudes HTTP
## Requisitos previos
Si no está familiarizado con HTTP, asegúrese de [ver este video](https://www.youtube.com/watch?v=iYM2zFP3Zn0) antes de seguir leyendo.

## 👍 Solicitud HTTP frente a llamadas salientes HTTP
En este módulo, cubriremos cómo se puede acceder a los recipientes a través de solicitudes HTTP. Este es un tema aparte de la conferencia "llamadas salientes HTTP", que está planificada para el día 5.

**Solicitud HTTP**: los recipientes pueden manejar solicitudes entrantes y servir páginas web. <br/>
**Llamadas salientes HTTP**: los recipientes pueden enviar solicitudes y comunicarse con el mundo Web 2.0. Esto se puede usar para varios casos de uso, como consultar un intercambio de precios de tokens, obtener la información meteorológica más reciente y enviar notificaciones a los usuarios.

## 🌍 Acceder a un recipiente a través de un navegador
Siempre que [acceda a un contenedor](https://wujxq-qqaaa-aaaaj-qazca-cai.raw.ic0.app/) a través de su navegador, hay algunos pasos necesarios. Repasemos todos ellos.<br/>
Notará que las URL en la computadora de Internet tienen el siguiente formato:
**<ID_CANISTER>.ic0.app**
**.ic0.app** indica que se está comunicando con [nodos de límite]().
## ¿Qué son los nodos límite?
Los recipientes se alojan en los nodos que participan en el consenso de IC. Sin embargo, los usuarios finales no pueden acceder directamente a esos nodos. <br/>
Para proteger los nodos de consenso y mejorar el rendimiento, hay una capa de **nodos de límite** que sirven para diferentes propósitos útiles:

- Traducir la solicitud HTTP del navegador del usuario a la llamada del recipiente. Esta parte se llama [Puerta de enlace HTTP](https://internetcomputer.org/docs/current/references/ic-interface-spec/#http-gateway). Cuando los recipientes envían su respuesta, la puerta de enlace la convertirá de nuevo en una solicitud HTTP.
- Dirija las llamadas a la subred correcta que ejecuta el recipiente. Para enrutar correctamente esas llamadas, los nodos fronterizos deben realizar un seguimiento de toda la configuración de la computadora de Internet:
     - Lista de subredes.
     - Lista de nodos ya qué subred pertenecen.
     - Los recipientes ejecutados por cada subred.
- Equilibrio de carga entre los nodos de réplica de la subred (es decir, si falta una réplica y ya tiene mucho trabajo pendiente, los nodos de límite enviarán la solicitud a otra réplica).
- Proteger subredes de ataques DDoS.

<i> Actualmente, los nodos de límite están a cargo de la Fundación DFINITY. Sin embargo, el objetivo (como parte de la hoja de ruta) es que cualquiera pueda configurar y ejecutar nodos de límite. Esto hará que la interacción con Internet Computer sea más reactiva para los usuarios finales y hará que la plataforma sea más resistente a la censura. Puede leer más en [el tema dedicado](https://forum.dfinity.org/t/boundary-node-roadmap/15562) si está interesado. </i>

<p align="center"> <img src="../../../daily_guides/day_3/img/http_gateway.png" width="800px" style="border: 2px solid black;"> </p>

## 📦 Asset Canisters
Para servir contenido web en la computadora de Internet, un contenedor debe tener un método que pueda manejar una solicitud HTTP, que incluye la URL, el método http y los encabezados, y producir una respuesta HTTP, que consiste en un estado, encabezados y cuerpo. Hay dos formas de hacerlo:

- Implemente usted mismo el método http_request y toda la lógica asociada (en Motoko). Esto es lo que se hará con nuestro contenedor de **página web**.
- Utilice el contenedor de **activos** provisto: este es un contenedor especial cuyo código ya ha sido implementado por DFINITY. Debe especificar el tipo de este contenedor en dfx.json y agregar la carpeta de origen de su aplicación web. Una vez que el contenedor de activos se implementa en la computadora de Internet, se puede acceder al sitio web en http://<canister id>.ic0.app y http://<canister id>.raw.ic0.app. Esto es lo que usaremos para nuestro recipiente de **interfaz**. El contenedor de interfaz que se envía cuando implementa un proyecto con `dfx new <project>` es, de hecho, un contenedor de activos (como puede confirmar al mirar `dfx.json`).

Puede acceder al [código fuente de este recipiente escrito en Rust](https://github.com/dfinity/sdk/tree/master/src/canisters/frontend/ic-frontend-canister) bajo la [organización DFINITY]( https://github.com/dfinity).

## 🔑 ic0.app frente a raw.ic0.app
Como dijimos anteriormente, hay dos formas de acceder a un bote:
- ic0.aplicación
- raw.ic0.app

¿Cuál es la diferencia?

La URL **sin procesar** simplemente devolverá la solicitud tal como está para servir los archivos de activos (HTML, CSS, Javascript).
Por otro lado, al presionar ic0.app, el nodo límite primero devolverá un **trabajador de servicio**. Esto es lo que se carga cada vez que ve esta página:

<p align="center"> <img src="../../../daily_guides/day_3/img/service_worker.png" width="800px" style="border: 2px solid black;"> </p>

Una vez que el [trabajador de servicio](https://www.npmjs.com/package/@dfinity/service-worker) está instalado, el trabajador de servicio maneja la solicitud. La gran ventaja del trabajador de servicio es que verificará el contenido que sirve el nodo. En ese caso, el canisgter firma directamente el contenido de los activos servidos (bajo la clave pública en el IC): el trabajador del servicio conoce la clave pública y es responsable de verificar que el contenido recibido coincida con la firma.

> Acceder a una página web debe ser rápido, por lo que usamos llamadas de consulta para manejar eso. Sin embargo, las llamadas de consulta no pasan por consenso y no pueden crear firmas. Para resolver este problema, utilizamos variables certificadas. Esto significa que el contenido debe estar certificado antes de que ocurra la llamada, lo que puede causar problemas para algunos contenidos. Si la certificación no es posible y está accediendo bajo ic0.app, es posible que encuentre una página de error.

<p align="center"> <img src="../../../daily_guides/day_3/img/body_no_verification.png" width="800px" style="border: 2px solid black;"> </p>

<p align="center" > En ese caso, debe acceder a raw.ic0.app para evitar el problema.</p>


> Una última cosa: el trabajador del servicio recibido al acceder a **ic0.app** podría, en teoría, ser falsificado o manipulado para certificar respuestas no válidas. La mayoría de los usuarios no se tomarán la molestia de verificar el trabajador de servicio que se les brinda. La forma de resolver esto sería enviar la clave pública de la computadora de Internet directamente al hardware o al navegador. **¡Eso sería genial!**

## 🤙 Contactando con el bote.
Una vez que el nodo límite ha recibido la solicitud. Lo codificará en Candid y llamará automáticamente al método ``` http_request``` del recipiente.
accesible para los navegadores, debe implementar un método ``http_request`` como parte de la interfaz pública de su actor.

<p align="center"> <img src="../../../daily_guides/day_3/img/http_request_public_interface.png" width="600px" style="border: 2px solid black;"> </p>

<p align="center" > Este es el código mínimo necesario para que devuelva una página simple que imprime <b>Hola mundo</b>.</p>

<p align="center"> <img src="../../../daily_guides/day_3/img/hello_world.png" width="400px" style="border: 2px solid black;"> </p>

<p align="center"> Lo que aparecerá en su navegador.</p>

## 🔧 Tipos personalizados 
Es posible que haya notado algunos tipos en el código de Motoko que se muestra anteriormente.
```HttpRequest```y ```HttpResponse```. Esos tipos han sido definidos en un archivo externo llamado ``http.mo``.

>Es una práctica recomendada crear tipos personalizados y sus métodos asociados en un archivo separado para organización, claridad y reutilización.

Revisemos este archivo juntos. Aquí está el contenido:
```
module Http {
    public type HeaderField = (Text, Text);

    public type HttpRequest = {
        body: Blob;
        headers: [HeaderField];
        method: Text;
        url: Text;
    };

    public type HttpResponse = {
        body: Blob;
        headers: [HeaderField];
        status_code: Nat16;
        streaming_strategy: ?StreamingStrategy;
    };

    public type StreamingStrategy = {
        #Callback: {
            callback : StreamingCallback;
            token    : StreamingCallbackToken;
        };
    };

    public type StreamingCallback = query (StreamingCallbackToken) -> async (StreamingCallbackResponse);

    public type StreamingCallbackToken =  {
        content_encoding : Text;
        index            : Nat;
        key              : Text;
    };

    public type StreamingCallbackResponse = {
        body  : Blob;
        token : ?StreamingCallbackToken;
    };
}
```
Lo primero que debe tener en cuenta es que, en lugar de usar nuestro archivo habitual **main.mo**, que normalmente comienza con:
```
actor {

}
```
Ha sido reemplazado por:
```
module {

}
```

Esto indica que este archivo no se utilizará para declarar un actor con una interfaz pública, sino un módulo con una interfaz pública que se importará al archivo principal.

> El concepto de un campo 'público' en un módulo cambia su significado al que estamos acostumbrados. Se puede acceder a la variable o método público en un módulo importando el archivo al módulo principal, main.mo, pero eso no significa que otros recipientes o usuarios puedan acceder directamente.

También podemos agregar un nombre (es posible tener múltiples módulos con diferentes nombres en el mismo archivo, aunque no lo haremos para mantener las cosas claras y simples).

```
module Http {

}
```

## 📲 Solicitud Http
Aquí está el tipo HttpRequest en Motoko.
```
module Http {
    public type HeaderField = (Text, Text);

    public type HttpRequest = {
        body: Blob;
        headers: [HeaderField];
        method: Text;
        url: Text;
    };
}
```

Para ayudar a ilustrar el concepto, implementé un contenedor que devuelve una página web que contiene toda la información contenida en el objeto HttpRequest que recibe <br/>
Puede acceder [aquí](https://yq5pi-saaaa-aaaap-aaxfq-cai.raw.ic0.app/).<br/>

<p align="center"> <img src="../../../daily_guides/day_3/img/http_request_motoko.png" width="800px" style="border: 2px solid black;"> </p>
<p align="center"> Se mostrará información diferente según su navegador, idioma y máquina.</p>

Como puedes ver cuando accedemos a la siguiente URL:
https://yq5pi-saaaa-aaaap-aaxfq-cai.raw.ic0.app/

- La **URL** es /.
- El **método** es GET.
- Los **encabezados** dependerán de tu configuración (dirección IP, navegador, sistema operativo, idioma...).
- El **cuerpo** está vacío.

El objeto correspondiente en Motoko sería algo como esto:
```
let request : HttpRequest = {
    body = null;
    headers = [("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:144.0) Gecko/20100101 Firefox/144.0"), (""), ()]
    method = "GET";
    url="/";
}
```


> Puede que se pregunte por qué la URL parece diferente a la proporcionada.
  Desde la perspectiva del cliente, la URL a la que se accede es https://yq5pi-saaaa-aaaap-aaxfq-cai.raw.ic0.app/ Sin embargo, desde la perspectiva del recipiente, la URL que ve es "**/**". <br/> Esto se debe a que el nodo de límite es responsable de dirigir la solicitud al recipiente. Cuando el nodo de límite convierte la solicitud y la envía al recipiente, elimina automáticamente cualquier parte innecesaria de la URL. <br/> Si hay más información en la URL, como si intentamos acceder a https://yq5pi-saaaa-aaaap-aaxfq-cai.raw.ic0.app/home, el resto de la URL aparecerá en la pagina web

## 📟 HttpRequest (Motoko)
Aquí está el tipo HttpResponse en Motoko
```
public type HttpResponse = {
    status_code: Nat16;
    headers: [HeaderField];
    body: Blob;
    streaming_strategy: ?StreamingStrategy;
};
```
- El [código de estado](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) es un número de tres dígitos que indica el resultado de la solicitud y el estado de la respuesta. El primer dígito define la categoría de la respuesta:
     - 2xx indica una respuesta exitosa.
     - 4xx indica un error del cliente.
     - 5xx indica un error del servidor.
     - algunos códigos de estado comunes son:
         - 200: Bien.
         - 404 No encontrado.
         - Error interno de servidor 500.
     > Desde el código de estado siempre es un número de tres dígitos, podemos usar Nat16 que es un tipo de Nat que tiene un rango limitado de valores. Nat16 se almacena en 16 bits, por lo que el rango de valores que se pueden representar es de 0 a 2^16 - 1. El punto principal de usar Nat16 en lugar de Nat es ahorrar algo de espacio en la memoria.

- El campo de encabezados es el mismo concepto que vimos anteriormente para HttpRequest.

- El cuerpo está codificado como [UTF-8](https://www.freecodecamp.org/news/what-is-utf-8-character-encoding/). Puede codificar/decodificar **Texto** a **Blob** en Motoko usando el [módulo de texto](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/base /Texto)
     <p align="center"> <img src="../../../daily_guides/day_3/img/utf8_encode_decode.png" width="800px" style="border: 2px solid black;"> </p>

- La transmisión por secuencias es un campo para manejar las respuestas HTTP en forma de transmisión, con la capacidad de devolver la llamada para obtener más datos utilizando la función de devolución de llamada definida. Se define de la siguiente manera:
    ```
     public type StreamingStrategy = {
            #Callback: {
                callback : StreamingCallback;
                token    : StreamingCallbackToken;
            };
        };
        public type StreamingCallback = query (StreamingCallbackToken) -> async (StreamingCallbackResponse);

        public type StreamingCallbackToken =  {
            content_encoding : Text;
            index            : Nat;
            key              : Text;
        };

        public type StreamingCallbackResponse = {
            body  : Blob;
            token : ?StreamingCallbackToken;
        };
   ```
    
Algunas explicaciones:
- **StreamingStrategy** es un tipo de objeto que tiene una sola propiedad, devolución de llamada, que es un objeto que contiene una función de devolución de llamada y un token.

- La función **StreamingCallback** se llama en un bucle, pasando un **StreamingCallbackToken** cada vez. La respuesta de la devolución de llamada incluye un cuerpo y un nuevo token opcional, que se pasa a la siguiente iteración del bucle. ¡El ciclo continúa hasta que la devolución de llamada devuelve una respuesta sin token! <br/>

Esto es extremadamente útil porque algunas páginas o archivos son demasiado grandes para procesarlos en un solo mensaje y, por lo tanto, se requiere el uso de StreamingStrategy.

## 👨‍🎤 SEO en la computadora de Internet
Debido a las primeras versiones del trabajador de servicio, hubo un problema con [SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) para dApps que se ejecutan al 100% en cadena. <br> De hecho, los rastreadores no pudieron cargar el contenido alojado en Internet Computer debido a una falla al cargar el service worker. Esto hizo que la vista previa en el motor de búsqueda no estuviera disponible.

<p align="center"> <img src="../../../daily_guides/day_3/img/preview_error.png" width="600px" style="border: 2px solid black;"> </p>
<p align="center"> En lugar de ver la vista previa del contenido, solo vería la carga del trabajador del servicio: aburrido...</p>

Las nuevas versiones de los nodos de límite han solucionado este problema y las dApps que se ejecutan al 100 % en la cadena se pueden indexar como sitios web tradicionales.

<p align="center"> <img src="../../../daily_guides/day_3/img/preview_fixed.png" width="600px" style="border: 2px solid black;"> </p>
<p align="center"> La vista previa del sitio web para Internet Computer... en Internet Computer</p>

# 🧹 Tarea
Su tarea para hoy es implementar completamente el contenedor de **página web** para el proyecto principal. Debería poder hacerlo desde el código que hemos visto hoy.

> 💀 **MODO DURO**: implementa variables certificadas para verificar el contenido del recipiente servido en **ic0.app**. Esto es opcional, pero mejorará en gran medida sus posibilidades de graduarse en la parte superior de la promoción.

# Preguntas 🙋
1. Verdadero o falso: la computadora de Internet tiene una clave pública única que se puede usar para verificar las respuestas provenientes de cualquier subred.
2. Verdadero o Falso: cuando realizo una llamada de actualización, el nodo límite participará en el consenso pero no durante las llamadas de consulta.
3. Verdadero o Falso: Puedo crear una variable certificada que certificará la respuesta del siguiente actor:
```
actor {
    public func hello(name : Text) : async Text {
        return ("hello # name");
    };
}
```

# Desafíos de codificación 🧑‍💻

> Para los desafíos 2-5 tendrás que cambiar la estructura habitual de tu repositorio & en vez de tener un único archivo `challenge.mo` tendrás tres archivos: `utils.mo`, `animal.mo` & ` principal.mo`. <br/>
> Puedes consultar la estructura correspondiente en el [repositorio de ejemplo](https://github.com/sebthuillier/motokobootcamp2023).

1. En su archivo llamado `utils.mo`: cree una función llamada `segundo_máximo` que tome un Array [Int] de enteros y devuelva el segundo número más grande de la Array.
```
segundo_máximo(Array: [Int]) -> Int;
```
2. En su archivo llamado `utils.mo`: cree una función llamada `remove_even` que tome un Array [Nat] y devuelva una nueva Array con solo los números impares de la Array original.
```
remove_even(Array: [Nat]) -> [Nat];
```
3. En su archivo llamado `utils.mo`: escriba una función `drop` <T> que tome 2 parámetros: un Array [T] y un **Nat** n. Esta función caerá los n primeros elementos del Array y devuelve el resto.
> ⛔️ No utilices bucle.
```
drop<T> : (xs : [T], n : Nat) -> [T]
```
4. En su archivo llamado `book.mo` cree un tipo personalizado con al menos 2 propiedades (título de tipo **Texto**, páginas de tipo **Nat**), importe este tipo en su `main.mo` y crea una variable que almacenará un libro.

5. En su archivo llamado `book.mo`, cree una función llamada `create_book` que tome dos parámetros: un título de tipo **Text** y el número de páginas de tipo **Nat** y devuelva un libro. Esta función creará un nuevo libro basado en los parámetros pasados y luego lo leerá antes de devolverlo.

6. En `main.mo` importe el tipo **Lista** de la Biblioteca base y cree una lista que almacene el libro.

7. En `main.mo` cree una función llamada `add_book` que tome un libro como parámetro y no devuelva nada. Esta función debería agregar este libro a su lista. Luego cree una segunda función llamada `get_books` que no tome ningún parámetro pero devuelva un **Array** que contenga todos los libros almacenados en la lista.

# Recursos y enlaces útiles 🔗
- [Trabajador de servicio personalizado](https://internetcomputer.org/docs/current/developer-docs/deploy/custom-domain#creating-the-custom-service-worker): un tutorial sobre cómo configurar su propio servicio trabajador, que puede ser útil si desea tener una buena URL.
- [Los contratos inteligentes sirven a la Web](https://internetcomputer.org/how-it-works/smart-contracts-serve-the-web/): más información y recursos sobre cómo los recipientes sirven a los navegadores web.
- [SEO en IC](https://medium.com/dfinity/how-to-configure-dapps-for-social-platform-previews-and-seo-62a55ee63d33): consulte este tutorial para obtener sugerencias y consejos sobre cómo configurar correctamente su sitio web en el IC para obtener la máxima visibilidad y accesibilidad.
- [Variables certificadas](https://www.youtube.com/watch?v=3mZHEfICi_U): un video que explica todo lo que necesita saber sobre las variables certificadas, por grandes cerebros en DFINITY.
