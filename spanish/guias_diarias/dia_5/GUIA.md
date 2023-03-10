# D铆a 5
# 馃З Motoko: variables estables (Stable vars), System functions y llamadas entre Canisters (Inter-Canister calls).

## 馃啔 Memoria Stable frente a memoria en mont贸n
- **Memoria en mont贸n** <br/>
Mont贸n, como en un "mont贸n de", la memoria es espacio disponible para programas, o contratos inteligentes en este caso, para asignar y desasignar seg煤n sea necesario todo el tiempo que el programa (Canister) se est谩 ejecutando.

- **Memoria Stable** <br/>
Memoria Stable, es exactamente eso, Stable. Puede crear objetos que almacenen datos en la memoria Stable utilizando variables Stables y sobrevivir谩n a las upgrades.

En un actor, puede designar una variable para almacenamiento Stable (en la memoria Stable de Internet Computer) usando la palabra clave `stable` como modificador en la declaraci贸n de la variable.

<img src="../../../daily_guides/day_5/img/stable_variables.png" width="700px" style="border: 2px solid black;"> </p>

## 馃攷 Stable Types (Tipos Stables)
Una cosa que tambi茅n debe tener en cuenta es que las variables Stables solo son posibles si el tipo subyacente de la variable es capaz de ser "Stable".

Dado que no todos los tipos son Stables, algunas variables no pueden declararse Stables.

> Por ejemplo, un objeto que contiene m茅todos (es decir, una clase) no puede ser Stable.

Preste atenci贸n a los foros, ya que puede encontrar que la comunidad ha vuelto a escribir ciertos tipos de variables que les permiten aprovechar la funci贸n de var Stable de Motoko. (es decir, [StableBuffer](https://github.com/canscale/StableBuffer) que es una nueva versi贸n del tipo Buffer que permite llamarlo Stable)

## 鉁? Verificaci贸n de compatibilidad de Upgrade
El CDK de DFINITY, `dfx`, hace un excelente trabajo al verificar si el nuevo c贸digo que enviar谩 a su Canister da帽ar谩 los datos o la interoperabilidad con otros Canisters o servicios.

Si se toma el tiempo de leer el documento <i>[#ref](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/compatibility) </i> sobre este tema explicar谩 mucho, y es posible que al principio no tenga mucho sentido.

Estos son los pasos que sigue una implementaci贸n que usa el SDK:

  <img src="../../../daily_guides/day_5/img/dfx_upgrades.png" width="700px" style="border: 2px solid black;"> </p>

> Como principiante, puede confiar en el SDK para encontrar errores y problemas y confirmar que lo esperaba. Pero entender por qu茅 hay un problema y qu茅 hacer al respecto ser谩 su pr贸ximo paso.

## 馃敥 System functions: preupgrade & postupgrade 

Motoko tambi茅n proporciona dos funciones del sistema que se ejecutar谩n en el mismo momento en que se actualice su contrato inteligente. Ser谩 importante saber eventualmente qu茅 pueden y qu茅 no pueden hacer estas funciones para que pueda incluir su funcionalidad en su arquitectura. Este diagrama, al igual que el anterior, deber铆a ayudar a contextualizar un poco este concepto.

  <img src="../../../daily_guides/day_5/img/upgrade_post.png" width="700px" style="border: 2px solid black;"> </p>

Incluso si no usa variables Stables o si sus requisitos incluyen tipos de datos no Stables, puede aprovechar la memoria Stable usted mismo a trav茅s de la [Memoria Stable experimental](https://internetcomputer.org/docs/current/references/motoko- ref/ExperimentalStableMemory) y/o aprovechar las funciones Pre y PostUpgrade disponibles en Motoko


## 馃摓 Inter-Canister calls

La comunicaci贸n entre Canisters que representan diferentes servicios es fundamental para la visi贸n de Internet Computer.

Los Canisters pueden llamar a otros Canisters mediante llamadas de Upgrade. <br/>
Vamos a introducir dos Canisters:
- **Receptor** (Receiver)
- **Remitente** (Sender)

**Receptor** puede recibir un mensaje a trav茅s de un m茅todo p煤blico `receive_message`, almacenar este mensaje en una estructura de datos Stable y devolver la cantidad de mensajes ya recibidos.
```motoko
actor {
    stable var messages : [Text] = [];

    public func receive_message(message : Text) : async Nat {
        messages:= Array.append<Text>(messages, [message]);
        return messages.size();
    };
};
```

Suponiendo que la identificaci贸n del Canister del receptor sea `qaa6y-5yaaa-aaaaa-aaafa-cai`, el remitente puede declarar e instanciar un actor que le permita enviar un mensaje al receptor a trav茅s de la comunicaci贸n entre Canisters.

```motoko
actor {
    let receiver : actor { receive_message : (Text) -> async Nat } = actor ("qaa6y-5yaaa-aaaaa-aaafa-cai"); 

        public func send_message(message : Text) : async Nat {
            let size = await receiver.receive_message(message);
            return size
        };
}
```

> Intente implementar esos 2 Canisters localmente y observe la demora que aparece cuando una llamada pasa por varios Canisters. Aseg煤rese de actualizar la identificaci贸n del Canister (canisterId) para adaptarla a su entorno local.

## 鈿涳笍 Ejecuci贸n at贸mica y puntos de commit
<i> La atomicidad es una propiedad de las transacciones de la base de datos, que establece que una transacci贸n debe tratarse como una operaci贸n 煤nica e indivisible que se completa en su totalidad o no se ejecuta en absoluto. Esto significa que todos los cambios realizados dentro de una transacci贸n deben confirmarse en la base de datos juntos, o ninguno de ellos debe confirmarse. </i>

Un Canister procesa sus mensajes uno a la vez. Si no hay `await` en el cuerpo de una funci贸n, se garantiza que se ejecutar谩 at贸micamente. <br/> Somos nosotros Eficaz ya que previene cualquier condici贸n de carrera o cambio inesperado en el estado del actor.

```motoko
actor {
    var names : [Text] = ["Lenin", "Elie", "Cedric", "Mathias", "Isaac"];

    public func add_name(name : Text) : async () {
        names:= Array.append<Text>(names; [name]); //We know that the array hasn't been modified during the execution of add_name other than the new name we just added.
    };
}
````
Sin embargo, siempre que tenga una expresi贸n `await`, el estado puede haber cambiado cada vez que la ejecuci贸n de la funci贸n comienza de nuevo.
```motoko
actor { 
    let price : Nat = 10;
    
    public shared ({ caller }) func buy_sandwich() : async Text {
        let balance = await.check_balance(caller);
        if(balance > price){
            let res = await prepare_sandwich();
            switch(res){
                case(#ok){
                    await send_money();
                    return "Here is your sandwich!";
                };
                case(#err){
                    return "Error";
                };
            };
        };

    };
}
```
En este ejemplo, enviamos el dinero despu茅s de que se prepar贸 el s谩ndwich; es posible que el Canister haya recibido otro mensaje mientras esperaba `prepare_sandwich`. Suponiendo que este otro mensaje haya modificado el saldo de la persona que llama. Es posible que cuando llegue el momento de ejecutar `send.money()` el saldo est茅 vac铆o o < precio (aunque lo comprobamos antes).

> Como probablemente puedas imaginar, cuando la atomicidad de una funci贸n no est谩 garantizada, introdujo muchos problemas de seguridad potenciales. Habr谩 una conferencia dedicada a ese tema.
## 馃 Trap
En el contexto de un Canister: una **trap** es un tipo de error que ocurre durante la ejecuci贸n de un mensaje y no se puede resolver. Las causas m谩s comunes de trampas son:

- Divisi贸n por cero.
```
let a : Nat = 5;
let b : Nat = 0;
let c = a / b;
```
- El 铆ndice est谩 fuera de los l铆mites.
```
let names : [Text] = [];
```
- Fallo de aserci贸n.
```
assert(false);
```
> La captura solo detendr谩 la ejecuci贸n del mensaje actual y no evitar谩 que el contenedor responda a solicitudes posteriores.

## 鈿笍 Punto de commit
Un punto de commit es un punto en el c贸digo donde puede considerar que todos los cambios anteriores en el mensaje actual se han ejecutado y modificado el estado para que no haya ninguna reversi贸n.

Hay 2 tipos de puntos de compromiso:
- Expresiones `await`
- Regresar de una funci贸n (ya sea expl铆citamente al devolver un valor, expl铆citamente arrojando un error o impl铆citamente al evaluar la 煤ltima expresi贸n).

** Siempre que una funci贸n quede en trap, el estado se revertir谩 al punto de confirmaci贸n anterior **

## 馃獝 Subnet X
Una llamada a otro Canister demorar谩 alrededor de 2 segundos (1 ronda de consenso) en la misma subred, mientras que tomar谩 alrededor de 4 segundos (2 rondas de consenso) si el Canister est谩 en otra subred.

- Si el Canister con el que intentamos contactar est谩 en la misma subred, el mensaje se procesar谩 en la siguiente ronda.

- Si el contenedor es otra subred, necesitamos 2 rondas de consenso. Necesitamos una ronda para firmar el mensaje y enviarlo a la subred y una

# <a id="preguntas"> 馃檵 Preguntas </a>
1. Verdadero o falso: podemos evitar que el Heap se borre durante las upgrades mediante el uso de un Heap "Stable".
2. **A.llamada() -> B.llamada() -> C**
驴Cu谩nto tiempo (o rondas de consenso) debemos esperar para obtener una respuesta?
3. 驴Es posible realizar una llamada intercanister en modo consulta?

# <a id="recursos-煤tiles"> 馃敆 Recursos y enlaces 煤tiles </a>
- [Variables Stables y m茅todos de Upgrade](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/upgrades)

- [Memoria Stable](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/stablememory)

- [Compatibilidad](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/compatibility)

- [Estado mutable](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/mutable-state)

- [Memoria Stable experimental](https://internetcomputer.org/docs/current/references/motoko-ref/ExperimentalStableMemory)

- [Gr谩fico de informaci贸n IC](https://internetcomputer.org/icig.pdf)
