# Día 2 🐣
¡Bienvenido de nuevo al Motoko Bootcamp! Estamos emocionados de tenerte de vuelta y felicitaciones por haber superado el primer día. También esperamos que hayas tenido la oportunidad de conocer a tus compañeros de equipo y conectar con ellos.

Hoy nos sumergimos en el lenguaje Motoko con tres lecciones dedicadas. Estarás escribiendo más código que ayer, así que prepárate para poner a prueba tus conocimientos. Comenzaremos a trabajar en el proyecto central hoy configurando el entorno correcto, brindando contexto sobre DAO y discutiendo las emocionantes posibilidades que ofrece Internet Computer.

# 🍿 Lecciones
- Motoko: tipos opcionales, interruptor/caja, opción y lista. <br/>
Esta lección cubrirá el uso de tipos opcionales en Motoko, cómo manejar valores anulables usando **Opción** y **Lista**, y cómo usar la instrucción switch/case para controlar el flujo.
- Motoko: tipos genéricos y matrices. <br/>
En esta lección, aprenderás cómo manipular arreglos en Motoko. Este es un tema importante ya que se trata de una estructura de datos más avanzada que la que vimos en el Día 1. También verá que el tipo **Array** en Motoko está íntimamente relacionado con otro concepto llamado **Generic**.
- Motoko: Char, Texto e Iteradores. <br/>
En esta lección, cubriremos la manipulación de **Char** y **Text** en Motoko y veremos cómo estos también se vinculan a través de iteradores también llamados **Iter**.

# 🧩 Motoko: condiciones, loops, Arrays y la Librería Base.
## ✅ Condiciones y operadores relacionales.
¿Recuerdas el tipo **Bool** que presentamos en la lección anterior?
Este tipo se usa a menudo con condiciones **si** para que su código se adapte a diferentes situaciones:
```
if(true){
 // Haz esto
} else {
// Haz aquello
}
```
Esas condiciones también se combinan a menudo con operadores relacionales como:
- El operador de igualdad "**==**" que prueba si dos valores son iguales y devuelve un Bool.
    ```
    public func enter_the_club(age : Nat) : async Text {
        if(age >= 18) {
            // return("Bienvenido al club");
        } else {
            // return ("Eres muy joven!");
        };
    };
    ```
> El operador "**==**" es diferente al operador "**=**". El primero probará si dos valores son iguales mientras que el segundo asignará un valor a una variable.

- El operador "**<**" (menor que) y ""**>**" (mayor que).
  ```
  3 < 5     //true
  6 < 2     //false
  1 < 1     //false
  3 > 5     //false
  6 > 2     //true
  1 > 1     //false
  ```
- Los operadores "**<=**" (menor o igual que) y "**>=**" (mayor o igual que).

  ```
  3 <= 5    //true
  6 <= 2    //false
  1 <= 1    //true
  3 >= 5    //false
  6 >= 2    //true
  1 >= 1    //true
  ```

- El operador "**!=**" (diferente).
  ```
  1 != 1    //false
  1 != 0    //true
  ```

## 🗃️ Arrays
En Motoko, una matriz (de tipo **Array**) es un grupo de elementos similares que se almacenan juntos. Para crear una matriz, debemos especificar el tipo de elementos que contendrá, por ejemplo, si la matriz contendrá números naturales, el tipo debería ser el indicado a continuación:
```
let date : [Nat] = [16, 01, 2023];
```
Lo mismo es que la matriz contendrá valores de tipo **Texto**:

```
let words : [Text] = ["Motoko", "es", "el", "mejor", "lenguaje"];
```
> Al contrario de algunos lenguajes de programación que son más flexibles (JavaScript), en Motoko no podemos mezclar elementos de diferentes tipos en la misma matriz.

<p align="center"> <img src="../../../daily_guides/day_2/img/array.png" width="600px" style="border: 2px solid black;"></p>

Para acceder a un elemento específico dentro de una matriz, usamos su índice. Tenga en cuenta que las matrices en Motoko están indexadas a cero, lo que significa que el primer elemento está en la posición 0, el segundo elemento está en la posición 1, y así sucesivamente. Por ejemplo, para acceder al primer elemento de un arreglo llamado "**myArray**", usaríamos "**myArray[0]**", y para acceder al segundo elemento, usaríamos "**myArray[1 ]**".

Por ejemplo, refiriéndose al ejemplo mencionado anteriormente:
```
let date : [Nat] = [16, 1, 2023];
let month : Nat = date[1]; // 1
```

Finalmente, podemos acceder al tamaño de una matriz usando la sintaxis **array.size()**.
```
let date : [Nat] = [16, 1, 2023];
let size : Nat = date.size() // 3
```

## 🪨 ¿Inmutable o mutable?
En Motoko, las matrices son inmutables de forma predeterminada, al igual que las variables declaradas con "**let**". Esto significa que los valores dentro de una matriz se pueden leer pero no modificar. Además, el tamaño de una matriz se fija una vez que se crea y no se puede aumentar. Para agregar un nuevo elemento a la matriz, se debe crear una nueva matriz y todos los elementos existentes se deben transferir manualmente.

> Acceder a elementos en una matriz es eficiente porque las matrices son inmutables. Esto significa que el tamaño de una matriz se fija cuando se crea y la memoria se asigna en consecuencia. Se conoce la ubicación del primer elemento en la matriz, y las ubicaciones de memoria de todos los demás elementos se pueden calcular fácilmente a partir de ella. Para esta lección no es necesario comprender los detalles de cómo se administra la memoria de la computadora, pero es importante tener en cuenta que esto es lo que hace que el acceso a los elementos en las matrices sea tan eficiente.

El siguiente código arrojaría un error:
```
actor {
let dates : [Nat] = [1, 3, 6];
dates[0] := 5;
};
```
> **Error in file Main.mo:2:0 expected mutable assignment target**

Es posible crear matrices mutables pero, al igual que las variables, debe usar la palabra clave "**var**".
```
let mutable_array : [var Nat] = [var 1, 2, 3]; // Este es mutable
```

Esta vez se compilaría el siguiente código:
```
actor {
  let mutable_dates : [var Nat] = [1, 3, 6];
  dates[0] := 5;
};
```
> Tenga en cuenta que las matrices mutables e inmutables no tienen el mismo tipo.

## 🤫 Estado mutable (Mutable state)
En Motoko, los actores pueden usar el estado mutable interno, pero no pueden compartirlo directamente con otros actores. En cambio, los actores pueden compartir datos inmutables y manejar los puntos de entrada externos de los demás, que actúan como funciones compartidas. Sin embargo, lo importante a tener en cuenta es que los datos mutables siempre deben mantenerse privados y nunca se pueden compartir de forma remota. <br/>

Para resumir, todo lo que pueda modificar en el estado de su contenedor debe considerarse privado y no podrá compartirlo.

<p align="center"> <img src="../../../daily_guides/day_2/img/mutable_state_actor.png" width="800px" style="border: 2px solid black;"></p>

> Esta regla está diseñada para simplificar su experiencia de programación. Evita que múltiples actores modifiquen simultáneamente una variable compartida sin conocimiento de las acciones de los otros actores. De lo contrario, esto causaría confusión y haría que la programación con actores fuera mucho más difícil.

Por ejemplo, el siguiente código:
```
actor {
  public var name : Text = "Motoko";
};
```
Lanzaría un error: **¡el nombre del campo del actor público tiene un tipo de función no compartida var Text**!

## 🔁 Loops 
En Motoko, podemos recorrer una matriz con la siguiente sintaxis:
```
actor {
    let array : [Nat] = [1, 2, 3, 4, 5];
    var somme : Nat = 0;

    public func somme_array() : async Nat {
        for (value in array.vals()){
          somme := somme + value;
        };
       return somme; 
    };
};
```

> Con respecto a lo que dijimos antes: puede parecer confuso que una variable mutable, "**some**", se devuelva al final de la función. Sin embargo, es importante comprender la diferencia entre compartir la variable en sí y compartir el valor de la variable. En este caso, es el valor de "**some**" lo que se comparte y no la variable en sí. Este concepto también se puede aplicar a matrices mutables mediante el uso de un método llamado '**Freeze**', que permite compartir una "instantánea" de la matriz, en lugar de la variable en sí.

## 📚 La biblioteca base
Hasta ahora solo hemos analizado las operaciones que están integradas en el lenguaje. Para realizar operaciones más complejas, necesitaremos usar módulos, particularmente la [Biblioteca base](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/basic-concepts#the -motoko-base-library).

Un módulo es una colección de código escrito por otra persona que puede usar en su propio programa. Exploraremos diferentes métodos para importar módulos e incluso crear nuestros propios módulos, pero por hoy nos centraremos en importar módulos desde la biblioteca Base. La biblioteca Base es un conjunto de módulos que manejan operaciones comunes para tipos de uso común (como Array, Bool, Nat, Int, Text).

El código fuente de esta biblioteca está [disponible en Github](https://github.com/dfinity/motoko-base/) y lo mantienen ingenieros de la fundación Dfinity y miembros de la comunidad. Cada módulo tiene su propia página de documentación, donde puede conocer las funciones disponibles. Por ejemplo, aquí está la [página de documentación del módulo Nat](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/base/Nat).

<p align="center"> <img src="../../../daily_guides/day_2/img/base_library_nat.png" width="800px" style="border: 2px solid black;"></p>

> La firma de la función es la forma de definir los tipos de los parámetros de entrada y los valores de retorno de salida. En el caso de la función "toText", la firma es "Nat -> Text", lo que significa que toma una entrada de tipo **Nat** y devuelve una salida de tipo **Text**. De hecho, esta función convierte un valor de **Nat** en su representación de **Texto** equivalente.

Es importante saber cómo usar la documentación, pero no es necesario que comprenda cómo se escribió el código fuente de estos módulos (a menos que tenga curiosidad). El código fuente está destinado a comprender cómo se escribió un módulo específico, mientras que la documentación está destinada a comprender cómo puede usar un módulo.

> A la documentación todavía le faltan ejemplos para cada función. Esa sería una adición realmente valiosa para tener ejemplos directamente en la biblioteca Base.

Aquí hay un ejemplo que muestra cómo importar el módulo **Nat** y usar la función **toText**:
```
import Nat "mo:base/Nat";
actor {
    public func nat_to_text(n : Nat) : async Text {
        return(Nat.toText(n));
    };
};
```

> Quizás se pregunte cómo pudimos usar el tipo **Nat** en ejemplos anteriores sin importar el módulo correspondiente. Este es un concepto importante que debe comprender: el tipo **Nat** está disponible automáticamente en Motoko, pero si necesita usar una función específica del módulo **Nat**, primero deberá importar el módulo.

¡Felicidades por haber llegado tan lejos! Has terminado oficialmente tu dosis diaria de Motoko. Es hora de pasar a algo un poco más emocionante, como aprender sobre las Organizaciones Autónomas Descentralizadas. Escuché que son lo nuevo de moda en estos días.

# 🧩 ¿Qué es DAO? Descripción general de la ENN
> Durante esta semana tendrá la oportunidad de construir un prototipo para una **Organización Autónoma Descentralizada** (DAO) - consulte [proyecto central](../../core_project/PROJECT.md) para obtener más información. Es por esto que este módulo se enfocará en responder una pregunta importante: **¿Qué es una DAO?**.

## 🏛️ Organismo Autónomo Descentralizado: ¿un nuevo modelo de gobernanza?
<p align="center"> <img src="../../../daily_guides/day_2/img/dao_icon.png" width="300px" style="border: 2px solid black;"> </p>
Una Organización Autónoma Descentralizada (DAO) es una plataforma o sistema digital que se ejecuta en una cadena de bloques y se rige por reglas codificadas en contratos inteligentes. Los DAO están descentralizados en el sentido de que no están controlados por un solo individuo o entidad, sino que operan en función de la toma de decisiones colectiva de sus miembros.


Los DAO están diseñados para ser transparentes, eficientes y autosuficientes, y pueden usarse para una amplia variedad de propósitos, como administrar fondos, votar propuestas y tomar decisiones sobre la dirección de un proyecto u organización.

Los DAO se crean mediante la implementación de contratos inteligentes en la cadena de bloques, que definen las reglas y los procesos que seguirá la organización. Una vez que se implementa la DAO, puede ser administrada y gobernada por sus miembros a través de un proceso de votación, en el que los miembros pueden proponer y votar decisiones.

Por lo general, los DAO crean su token de gobierno dedicado y el poder de voto de cada miembro estará determinado por la cantidad de tokens que posean. Sin embargo, cada DAO es diferente y, en última instancia, las reglas pueden ser muy diferentes según el código que se haya implementado. En ocasiones, incluso dentro de la misma DAO, las reglas de votación cambiarán según el tipo de propuesta (Propuestas de financiación, propuestas de gestión o propuestas para cambiar el rumbo de la organización).

Algunos casos de uso para DAO incluyen los siguientes:
- **Capital de riesgo descentralizado**: los DAO se pueden utilizar para habilitar fondos de capital de riesgo descentralizados, en los que los miembros pueden proponer y votar inversiones en proyectos. [La DAO](https://en.wikipedia.org/wiki/The_DAO_(organization)) (abreviatura de "Organización Autónoma Descentralizada") fue una de las primeras DAO que se crearon y fue diseñada para ser un fondo de capital de riesgo descentralizado , aunque fue polémico y finalmente fracasó debido a un hackeo.

<p align="center"> <img src="../../../daily_guides/day_2/img/the_dao.png" height="400px" style="border: 2px solid black;"></p>
<p align="center"> Debido a un loophole en los contratos inteligentes, la DAO fue pirateada.</p>

- **Toma de decisiones**: los DAO se pueden usar para permitir que los miembros tomen decisiones sobre la dirección de un proyecto u organización. Por ejemplo, [MakerDAO](https://makerdao.com/en/) es una plataforma de finanzas descentralizadas (DeFi) que se basa en la cadena de bloques Ethereum y se rige por un DAO, en el que los miembros pueden votar propuestas para cambiar el parámetros del sistema MakerDAO, como las tasas de interés de los préstamos.
- **Gestión de la cadena de suministro**:
- **Intercambios descentralizados**:
- **Red social descentralizada**:

## 🙁 Limitaciones de las DAO actuales
En última instancia, los DAO se implementan a través de contratos inteligentes y solo pueden tomar medidas si la propuesta votada se puede implementar directamente por código.
Sería el caso de una propuesta como:
- **Tokens Mint 5000** donde se ejecutaría una función "mint" correspondiente en el contrato inteligente dedicado.
- **Grabar 2500 tokens** donde se ejecutaría una función de "grabar" correspondiente en el contrato inteligente dedicado.
- "[Aumentar la tasa de rendimiento de DAI al 1%] (https://www.theblock.co/post/190526/makerdao-is-voting-on-increasing-yield-for-the-dai-stablecoin) donde un el parámetro correspondiente se modificaría en el contrato inteligente dedicado.

Sin embargo, ¿qué pasaría si la propuesta no fuera ejecutable mediante un contrato inteligente? Digamos:

- **Modificar el sitio web https://app.uniswap.org/ para eliminar tokens que correspondan a estafas conocidas**

Esto es exactamente [lo que sucedió en julio de 2021](https://cointelegraph.com/news/uniswap-delists-100-tokens-from-interface-incluyendo-opciones-e-índices).
Esta decisión fue tomada unitariamente por Uniswap Labs a pesar de la existencia de Uniswap DAO (que se organiza en torno al token UNI).
En última instancia, el sitio web no está alojado en Ethereum y las responsabilidades legales asociadas con él son responsabilidad de Uniswap Labs y no de DAO, lo que explica la decisión.

> Ahora, ¿qué pasaría si los DAO pudieran controlar... aplicaciones web completas?

## 🚀 De contratos inteligentes a Canisters
Los contratos inteligentes son bastante limitados:
- No pueden almacenar ninguna cantidad significativa de datos (fotos, videos, archivos...)
Por ejemplo: [el costo de almacenar 1 GB de datos en la cadena de bloques de Ethereum se estima en alrededor de $5,5 millones] (https://steemit.com/ethereum/@suryanshkumr/you-need-usd5-5m-to-save-1gb- datos-en-ethereum-blockchain-d)!
- No puede interactuar con contratos inteligentes directamente desde un navegador: por lo general, se debe instalar una billetera (extensión) y esta billetera hará el relevo.
- Los contratos inteligentes se basan en oráculos para recopilar información del mundo exterior y facilitar la comunicación con él, ya que no pueden interactuar con nada fuera de la cadena de bloques por sí mismos. Los oráculos sirven como puente entre los contratos inteligentes y las fuentes y sistemas de datos externos

Otras propiedades de los contratos inteligentes, que le pueden gustar o no según su caso de uso, incluyen:
- Los contratos inteligentes nunca se pueden actualizar: son permanentes e inmutables una vez que se implementan en una cadena de bloques
- Los usuarios deben pagar tarifas para interactuar con un contrato inteligente.

Hasta ahora, para crear dApps, los desarrolladores tenían que recurrir para resolver esos problemas confiando en un actor externo. Por lo general, una entidad centralizada, algunas de ellas:
- AWS para almacenar la interfaz y los datos asociados con la dApp.
- Metamask para comunicarse desde el navegador con la blockchain.
- Chainlink para interactuar con el mundo exterior (Web2), aunque Chainlink es probablemente el menos centralizado de la lista hasta el momento.

<p align="center"> <img src="../../../daily_guides/day_2/img/ethereum_aws.png" width="400px" style="border: 2px solid black;"></p>
<p align="center"> Realmente no “sin intermediarios"</p>

Ahora imagine que los contratos inteligentes podrían:
- Almacene una cantidad ilimitada de datos y ejecute cualquier cálculo.
- Ser accesible directamente desde cualquier navegador.
- Comunicarse con el mundo exterior a través de solicitudes HTTP.
- Crear y firmar transacciones en cualquier blockchain (Bitcoin, Ethereum...).
- Habilite diferentes modelos de modelización eligiendo si el usuario paga tarifas o puede interactuar libremente con el contrato inteligente.
- Ser actualizable para agregar constantemente nuevas funciones y corregir posibles errores.

Si eso suena interesante: ¡bienvenido al mundo de los **Canisters**! Imagina lo que los DAO podrán lograr controlando los Canisters🤯

<p align="center"> <img src="../../../daily_guides/day_2/img/canister.png" width="800px" style="border: 2px solid black;"></p>
<p align="center"> Canister Canister Canister!</p>
Un poco más de información:

- ¡Un Canister puede almacenar hasta 48 GB de datos! Además, esta es una limitación temporal y la limitación de la memoria se [actualiza con frecuencia] (https://forum.dfinity.org/t/increased-canister-smart-contract-memory/6148/139).
- ¡Los Canisters pueden comunicarse con el mundo Web 2.0 sin necesidad de depender de oráculos externos!
- Los Canisters pueden contener claves y firmar transacciones en otras cadenas de bloques (Bitcoin, Ethereum y pronto todas las monedas) gracias a [Threshold ECDSA] (https://internetcomputer.org/docs/current/developer-docs/integrations/t- ecsa/). Cada réplica tiene una parte de la clave privada y pueden combinar sus partes para crear firmas ECDSA. ¡La clave privada **nunca** se reconstruye!

## 👑 ¿Quién controla el Canister?
Canisters en Internet Computer puede tener uno o varios controladores, que pueden actualizar, eliminar y modificar el estado del Canister. Hay tres casos principales a considerar:

- Un solo desarrollador o un grupo de desarrolladores controlan el Canister. En este caso, el control sobre el Canister está centralizado y cualquier confianza depositada en el Canister depende de la confianza en los controladores. Este es el estado predeterminado cuando se implementa un nuevo proyecto en la Internet Computer.

- El Canister es controlado por otro Canister. Con este enfoque, se puede diseñar cualquier tipo de sistema de gobierno. El Canister aún se puede actualizar, pero el control sobre él se puede descentralizar.

- El Canister no tiene controlador. Esta es la solución definitiva para garantizar que nunca se actualice un Canister. En este escenario, un Canister es similar a un contrato inteligente tradicional.

<p align="center"> <img src="../../../daily_guides/day_2/img/governance_canister.png" width="400px" style="border: 2px solid black;"> </p>

<p align="center"> Before trusting a canister - make sure that you know who controls it!</p>

Usando ```dfx``` podemos verificar la lista de controladores para cualquier contenedor - con el siguiente comando:
```
dfx canister --network ic info <CANISTER_ID>
```
## 🌍 Servicio de Internet abierto
Una de las aplicaciones más prometedoras de Internet Computer es el desarrollo de Open Internet Services (OIS). Esos son servicios web que se ejecutan completamente en un conjunto de Canisters, donde el gobierno de esos Canisters se garantiza a través de un Canister de gobierno público tokenizado. <br/>

<p align="center"> <img src="../../../daily_guides/day_2/img/web2_web3.jpeg" width="400px" style="border: 2px solid black;"> </p>

Open Internet Services tiene como objetivo complementar el monopolio actual de BigTech al alinear incentivos entre inversores, usuarios y desarrolladores, y se espera que opere de una manera más transparente y cooperativa que los servicios web tradicionales.

Los usuarios recibirán recompensas simbólicas por interactuar y agregar valor a la aplicación, lo que también les otorgará derechos de gobierno, ¡pero este concepto aún se está explorando y es posible que se implementen otros sistemas de gobierno! <br/>

<p align="center"> <img src="../../../daily_guides/day_2/img/ois.png" width="800px" style="border: 2px solid black;"> </p>

> **¿Una predicción?** <br/> Los servicios abiertos de Internet están aquí para revolucionar la forma en que trabajamos juntos. Con una escalabilidad sin precedentes del trabajo colaborativo habilitado por el poder combinado de DAO y OIS, ¡el cielo es el límite! Imagine el impacto positivo en la humanidad con proyectos como la conservación del medio ambiente, la investigación médica y la educación, todos amplificados por este nuevo nivel de coordinación y colaboración. Y esto es solo la punta del iceberg, ya que esta nueva tecnología podría abrir la puerta a soluciones aún más innovadoras para algunos de los problemas más apremiantes del mundo. Esta es una oportunidad para lograr un progreso real y cambiar el mundo de formas que nunca antes creímos posibles. **¡Prepárate, el futuro está aquí!**
## ☝️ Un DAO sobre el IC: el Sistema Nervioso en Red (SNN)


<p align="center"> <img src="../../../daily_guides/day_2/img/nns_home.png" width="800px" style="border: 2px solid black;"> </p>
<p align="center"> Home page of the NNS</p>

El DAO más desarrollado que opera en el IC (¡hasta ahora!) es el que administra la red en sí. Este DAO se denomina **Sistema Nervioso de la Red** y es responsable de tomar decisiones sobre el futuro de la red, coordinar varias partes y organizar la estructura de la red.

Por lo general, cuando se necesita actualizar el blockchain, el proceso tarda algunas semanas o meses en completarse. Esto requiere que los operadores de nodos actualicen su software. Si algunos operadores de nodos se niegan a actualizar o si un grupo de ellos instala una versión diferente, puede resultar en una "bifurcación", donde la cadena de bloques se divide en dos cadenas separadas, creando dos redes completamente diferentes de tamaños más bajos.

<p align="center"> <img src="../../../daily_guides/day_2/img/hard_fork.png" width="800px" style="border: 2px solid black;"> </p>
<p align="center"> Una bifurcación famosa ocurrió en 2017 cuando algunos miembros de la comunidad de Bitcoin querían aumentar el tamaño del bloque (para procesar más transacciones). Esto resultó en dos versiones separadas de Bitcoin, con la versión original siguiendo las reglas antiguas y la nueva versión (Bitcoin Cash) siguiendo las nuevas reglas. </p>

En Internet Computer, las actualizaciones son votadas por el NNS (Network Nervous System). Si se aceptan las actualizaciones, el software de los nodos se actualiza directamente, lo que mitiga la posibilidad de una bifurcación.
<br/>
El NNS se rige por una democracia líquida, en la que los titulares de ICP apuestan sus ICP para crear neuronas.
El poder de voto de estas neuronas se basa en:
- La cantidad de ICP apostados.
- La duración de la apuesta.
- La edad de la neurona.

<p align="center"> <img src="../../../daily_guides/day_2/img/neuron_recap.png" width="800px" style="border: 2px solid black;"> </p>

Las propuestas que pueden ser votadas por la ENN (Red del Sistema Nervioso) se agrupan en diferentes categorías, tales como:

- Economía de la red: propuestas relacionadas con la determinación de las recompensas pagadas a los operadores de nodos.
- Administración de nodos: propuestas relacionadas con la administración de máquinas de nodos, incluida la actualización o configuración del sistema operativo, el marco de la máquina virtual o el software de réplica de nodos.
- Gestión de subredes: propuestas relacionadas con la administración de subredes de red, como la creación de nuevas subredes, la adición y eliminación de nodos de subred o la división de subredes.
- Gobernanza: propuestas relacionadas con la administración de la gobernanza, como mociones y configuración de determinados parámetros.

Para obtener más información sobre el increíble poder del NNS, consulte [Wiki de Internet Computer] (https://wiki.internetcomputer.org/wiki/Network_Nervous_System).

## 🔎 ¿Cómo funciona el NNS?
El NNS está constituido por **diferentes Canisters**. Cada Canister se implementa en la misma subred que también se denomina [subred NNS](https://dashboard.internetcomputer.org/subnet/tdb26-jop6k-aogll-7ltgs-eruif-6kk7m-qpktf-gdiqx-mxtrf-vb5e6- eqe).

<p align="center"> <img src="../../../daily_guides/day_2/img/nns_recap.png" width="800px" style="border: 2px solid black;"> </p>
<p align="center"> Visión general de canisters corriendo la NNS</p>

- [Ledger](https://icscan.io/canister/ryjl3-tyaaa-aaaaa-aaaba-cai): Este Canister es responsable de controlar el saldo de ICP para todos los usuarios, procesar transacciones, acuñar y quemar ICP.
- [Gobernanza](https://icscan.io/canister/rrkah-fqaaa-aaaaa-aaaaq-cai): Este Canister es responsable de realizar un seguimiento de las neuronas, las propuestas y los votos y, en última instancia, tomar medidas cuando se aceptan o rechazan las propuestas.
- [Registry](https://icscan.io/canister/rwlgt-iiaaa-aaaaa-aaaaa-cai): Este contenedor es responsable de almacenar y modificar la configuración de la Internet Computer (agregar o eliminar nodos, agregar o eliminar subredes, almacenar claves públicas de subredes, asignar nodos a subredes, almacenar ID de contenedor y a qué subred pertenecen ...)
- [NNS-UI](https://icscan.io/canister/qoctq-giaaa-aaaaa-aaaea-cai): Este Canister es responsable de almacenar la interfaz oficial que brinda a los usuarios una forma de interactuar con los otros 3 Canisters.
NB: La interfaz de usuario de NNS es actualmente la principal interfaz fácil de usar para NNS, pero nada impediría que la comunidad creara otra interfaz. De hecho, la comunidad ya ha creado [otra interfaz que permite a los usuarios crear propuestas NNS](https://nnsproposal.icp.xyz/) (¡sin tener que usar su terminal!) que es una característica que aún falta en la interfaz principal.

Como vimos con el ejemplo del NNS, la creación de una DAO puede implicar la implementación y administración de varios Canisters.

## 🏗️ Arquitectura para nuestro proyecto
Queremos construir **una DAO que administre un sitio web simple** y otorgue poder de voto basado en el [Motoko Bootcamp token](../../core_project/PROJECT.md#motoko-bootcamp-token-faucet-💰). 
Necesitaremos los siguientes Canisters:
- Un contenedor backend: este contenedor será responsable de administrar la lógica de nuestro DAO: realizar un seguimiento de los miembros, las propuestas, los votos y tomar medidas cada vez que se aprueba una propuesta.
¡Tendrá que escribir la lógica completa para este Canister usted mismo!

- Un canister de página web: este canister será el encargado de almacenar una página web, respondiendo a http_request. Esta página web solo contendrá texto básico y el texto se actualizará con la votación de la DAO.
¡Tendrá que escribir el código completo para este Canister usted mismo!

- Un canister de interfaz: este canister será el encargado de almacenar la interfaz y permitir un fácil acceso a nuestra DAO. Desde esta interfaz, los usuarios deberían poder unirse a la DAO, crear propuestas y votar propuestas.
Ya que esta semana está enfocada en Motoko y crear una interfaz requiere otras habilidades y conocimientos. Proporcionaremos muestras de código que solo tendrá que completar. Para la interfaz usaremos un marco llamado [Svelte](https://svelte.dev/). Si no está familiarizado con Svelte, ¡no se preocupe! Explicaremos cómo está organizado el código.

- Un contenedor de contabilidad para el token Motoko Bootcamp: este contenedor es responsable de controlar el saldo de tokens MB para todos los usuarios, procesar transacciones, acuñar y quemar tokens MB.
Este Canister será el mismo para todos los estudiantes. Ya hemos creado este Canister y solo tendrá que interactuar con él. Este token sigue el estándar ICRC_1.
Puedes acuñar tantos tokens de Motoko Bootcamp como necesites durante la semana. Para obtener más información, lea [the dedicated section](../../core_project/PROJECT.md#motoko-bootcamp-token-faucet-💰)


# 🧹 Tarea: crear el esqueleto para el proyecto principal.
Para su primera tarea, el objetivo es **crear un esqueleto para el proyecto principal**. Esto significa que debe tener los archivos de configuración configurados y la estructura correcta para su base de código. Sin embargo, esto no incluye escribir ningún código real para el proyecto.

La idea es reunir todas las diferentes piezas que necesitará para el proyecto en un solo lugar. Esto te servirá como punto de partida para el resto del trabajo que harás durante la semana.
Para considerar que su tarea se completó, deberá tener una configuración de proyecto en ejecución (localmente) con 3 Canisters:
- Un contenedor de back-end (Motoko) para administrar la lógica de su DAO.
- Un contenedor de página web (Motoko) para almacenar la página web que controlará su DAO.
- Un contenedor de interfaz (Svelte) para la interfaz fácil de usar de su DAO.

<p align="center"> <img src="../../../daily_guides/day_2/img/project_recap.png" width="800px" style="border: 2px solid black;"> </p>
<p align="center"> Visión general de lo que estaremos construyendo esta semana💪</p>

Puede considerar que ha terminado la tarea de hoy cuando haya completado los siguientes pasos:

1. Copie e inspírese en este repositorio que contiene un [motoko-svelte-project](https://github.com/dfinity/examples/tree/master/svelte/svelte-motoko-starter)
2. Añadir el 3er Canister que necesitamos (página web). Solo agregue los archivos que no necesita para escribir ningún código.
3. Cambie el nombre de los Canisters y cambie los archivos de configuración según corresponda.
4. Implemente el proyecto **localmente**.

**¡Vamos a construir!**
# Preguntas 🙋

1. ¿Quién controla el contenedor del libro mayor?
2. ¿Cuál es la subred del Canister con la identificación: **mwrha-maaaa-aaaab-qabqq-cai**? ¿Cuántos nodos están ejecutando esta subred?
3. Tengo una neurona con 10 ICP bloqueados con un retraso de disolución de 4 años: mi neurona ha estado bloqueada durante 2 años. ¿Cuál es mi poder de voto esperado?
4. ¿Qué está mal con el siguiente código?
```
actor {
  let n : Nat = 50;
  let t : Text = "Hello";

  public func convert_to_text(m : Nat) : async Text {
    Nat.toText(m);
  };
 
}
```
5. ¿Qué está mal con el siguiente código?
```
actor {
  var languages : [var Text] = ["English", "German", "Chinese", "Japanese", "French"];

  public func show_languages(language : Text) : async [var Text] {
    return (languages);
  };
 
}
```
6. ¿Qué está mal con el siguiente código?
```
actor {
  var languages : [Text] = ["English", "German", "Chinese", "Japanese", "French"];

  public func add_language(new_language: Text) : async [Text] {
    languages := Array.append<Text>(languages, [new_language]);
    return (languages);
  };
 
}
```

# Desafíos de codificación 🧑‍💻
1. Escriba una función **average_array** que tome una matriz de enteros y devuelva el valor promedio de los elementos de la matriz.
```
promedio_arreglo(arreglo: [Int]) -> asíncrono Int.
```
2. **Recuento de caracteres**: Escriba una función que tome una cadena y un carácter, y devuelva el número de ocurrencias de ese carácter en la cadena.
```
count_character(t : Texto, c : Char) -> async Nat
```
3. Escribe una función **factorial** que tome un número natural n y devuelva el [factorial](https://www.britannica.com/science/factorial) of n.
```
factorial(n : Nat) ->  async Nat
```
4. Escribe una función **número_de_palabras** que tome una oración y devuelva el número de palabras en la oración.
```
number_of_words(t : Texto) -> async Nat
```
5. Escriba una función **find_duplicates** que tome una matriz de números naturales y devuelva una nueva matriz que contenga todos los números duplicados. El orden de los elementos en la matriz devuelta debe ser el mismo que el orden de la primera aparición en la matriz de entrada.
```
find_duplicates(a : [Nat]) -> asíncrono [Nat]
```
6. Escriba una función **convert_to_binary** que tome un número natural n y devuelva una cadena que represente la representación binaria de n.
```
convert_to_binary(n : Nat) -> Texto asíncrono
```

# Recursos y enlaces útiles 🔗
- [ICScan](https://icscan.io/): este sitio web es una herramienta increíble para acceder a información sobre la Internet Computer. Puede inspeccionar y encontrar información sobre diferentes temas (subredes, contenedores, neuronas, transacciones). También puede usar este sitio web como una herramienta para interactuar directamente con los Canisters desplegados en la Internet Computer.
- [NNS-UI](https://nns.ic0.app): la interfaz oficial de NNS. Puede usarlo para apostar ICP, crear neuronas, votar propuestas, invertir en lanzamientos de SNS y más...
- [Módulo de matriz](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/base/Array): la documentación del módulo **Array** en Motoko.
- [Módulo Bool](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/base/Bool): la documentación para el módulo **Bool** en Motoko.
- [Biblioteca base](https://github.com/dfinity/motoko-base): el código fuente de toda la biblioteca base de Motoko, mantenida por los ingenieros de DFINITY y la comunidad.
- [Estado mutable](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/mutable-state): una explicación más larga sobre el estado mutable de los actores en Motoko.


