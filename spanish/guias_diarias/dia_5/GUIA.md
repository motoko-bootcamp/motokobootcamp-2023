# Día 5
# 🧩 Motoko: variables estables (Stable vars), System functions y llamadas entre Canisters (Inter-Canister calls).

## 🆚 Memoria Stable frente a memoria en montón
- **Memoria en montón** <br/>
Montón, como en un "montón de", la memoria es espacio disponible para programas, o contratos inteligentes en este caso, para asignar y desasignar según sea necesario todo el tiempo que el programa (Canister) se está ejecutando.

- **Memoria Stable** <br/>
Memoria Stable, es exactamente eso, Stable. Puede crear objetos que almacenen datos en la memoria Stable utilizando variables Stables y sobrevivirán a las upgrades.

En un actor, puede designar una variable para almacenamiento Stable (en la memoria Stable de Internet Computer) usando la palabra clave `stable` como modificador en la declaración de la variable.

<img src="../../../daily_guides/day_5/img/stable_variables.png" width="700px" style="border: 2px solid black;"> </p>

## 🔎 Stable Types (Tipos Stables)
Una cosa que también debe tener en cuenta es que las variables Stables solo son posibles si el tipo subyacente de la variable es capaz de ser "Stable".

Dado que no todos los tipos son Stables, algunas variables no pueden declararse Stables.

> Por ejemplo, un objeto que contiene métodos (es decir, una clase) no puede ser Stable.

Preste atención a los foros, ya que puede encontrar que la comunidad ha vuelto a escribir ciertos tipos de variables que les permiten aprovechar la función de var Stable de Motoko. (es decir, [StableBuffer](https://github.com/canscale/StableBuffer) que es una nueva versión del tipo Buffer que permite llamarlo Stable)

## ✅ Verificación de compatibilidad de Upgrade
El CDK de DFINITY, `dfx`, hace un excelente trabajo al verificar si el nuevo código que enviará a su Canister dañará los datos o la interoperabilidad con otros Canisters o servicios.

Si se toma el tiempo de leer el documento <i>[#ref](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/compatibility) </i> sobre este tema explicará mucho, y es posible que al principio no tenga mucho sentido.

Estos son los pasos que sigue una implementación que usa el SDK:

  <img src="../../../daily_guides/day_5/img/dfx_upgrades.png" width="700px" style="border: 2px solid black;"> </p>

> Como principiante, puede confiar en el SDK para encontrar errores y problemas y confirmar que lo esperaba. Pero entender por qué hay un problema y qué hacer al respecto será su próximo paso.

## 🔩 System functions: preupgrade & postupgrade 

Motoko también proporciona dos funciones del sistema que se ejecutarán en el mismo momento en que se actualice su contrato inteligente. Será importante saber eventualmente qué pueden y qué no pueden hacer estas funciones para que pueda incluir su funcionalidad en su arquitectura. Este diagrama, al igual que el anterior, debería ayudar a contextualizar un poco este concepto.

  <img src="../../../daily_guides/day_5/img/upgrade_post.png" width="700px" style="border: 2px solid black;"> </p>

Incluso si no usa variables Stables o si sus requisitos incluyen tipos de datos no Stables, puede aprovechar la memoria Stable usted mismo a través de la [Memoria Stable experimental](https://internetcomputer.org/docs/current/references/motoko- ref/ExperimentalStableMemory) y/o aprovechar las funciones Pre y PostUpgrade disponibles en Motoko


## 📞 Inter-Canister calls

La comunicación entre Canisters que representan diferentes servicios es fundamental para la visión de Internet Computer.

Los Canisters pueden llamar a otros Canisters mediante llamadas de Upgrade. <br/>
Vamos a introducir dos Canisters:
- **Receptor** (Receiver)
- **Remitente** (Sender)

**Receptor** puede recibir un mensaje a través de un método público `receive_message`, almacenar este mensaje en una estructura de datos Stable y devolver la cantidad de mensajes ya recibidos.
```motoko
actor {
    stable var messages : [Text] = [];

    public func receive_message(message : Text) : async Nat {
        messages:= Array.append<Text>(messages, [message]);
        return messages.size();
    };
};
```

Suponiendo que la identificación del Canister del receptor sea `qaa6y-5yaaa-aaaaa-aaafa-cai`, el remitente puede declarar e instanciar un actor que le permita enviar un mensaje al receptor a través de la comunicación entre Canisters.

```motoko
actor {
    let receiver : actor { receive_message : (Text) -> async Nat } = actor ("qaa6y-5yaaa-aaaaa-aaafa-cai"); 

        public func send_message(message : Text) : async Nat {
            let size = await receiver.receive_message(message);
            return size
        };
}
```

> Intente implementar esos 2 Canisters localmente y observe la demora que aparece cuando una llamada pasa por varios Canisters. Asegúrese de actualizar la identificación del Canister (canisterId) para adaptarla a su entorno local.

## ⚛️ Ejecución atómica y puntos de commit
<i> La atomicidad es una propiedad de las transacciones de la base de datos, que establece que una transacción debe tratarse como una operación única e indivisible que se completa en su totalidad o no se ejecuta en absoluto. Esto significa que todos los cambios realizados dentro de una transacción deben confirmarse en la base de datos juntos, o ninguno de ellos debe confirmarse. </i>

Un Canister procesa sus mensajes uno a la vez. Si no hay `await` en el cuerpo de una función, se garantiza que se ejecutará atómicamente. <br/> Somos nosotros Eficaz ya que previene cualquier condición de carrera o cambio inesperado en el estado del actor.

```motoko
actor {
    var names : [Text] = ["Lenin", "Elie", "Cedric", "Mathias", "Isaac"];

    public func add_name(name : Text) : async () {
        names:= Array.append<Text>(names; [name]); //We know that the array hasn't been modified during the execution of add_name other than the new name we just added.
    };
}
````
Sin embargo, siempre que tenga una expresión `await`, el estado puede haber cambiado cada vez que la ejecución de la función comienza de nuevo.
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
En este ejemplo, enviamos el dinero después de que se preparó el sándwich; es posible que el Canister haya recibido otro mensaje mientras esperaba `prepare_sandwich`. Suponiendo que este otro mensaje haya modificado el saldo de la persona que llama. Es posible que cuando llegue el momento de ejecutar `send.money()` el saldo esté vacío o < precio (aunque lo comprobamos antes).

> Como probablemente puedas imaginar, cuando la atomicidad de una función no está garantizada, introdujo muchos problemas de seguridad potenciales. Habrá una conferencia dedicada a ese tema.
## 🪤 Trap
En el contexto de un Canister: una **trap** es un tipo de error que ocurre durante la ejecución de un mensaje y no se puede resolver. Las causas más comunes de trampas son:

- División por cero.
```
let a : Nat = 5;
let b : Nat = 0;
let c = a / b;
```
- El índice está fuera de los límites.
```
let names : [Text] = [];
```
- Fallo de aserción.
```
assert(false);
```
> La captura solo detendrá la ejecución del mensaje actual y no evitará que el contenedor responda a solicitudes posteriores.

## ⚫️ Punto de commit
Un punto de commit es un punto en el código donde puede considerar que todos los cambios anteriores en el mensaje actual se han ejecutado y modificado el estado para que no haya ninguna reversión.

Hay 2 tipos de puntos de compromiso:
- Expresiones `await`
- Regresar de una función (ya sea explícitamente al devolver un valor, explícitamente arrojando un error o implícitamente al evaluar la última expresión).

** Siempre que una función quede en trap, el estado se revertirá al punto de confirmación anterior **

## 🪐 Subnet X
Una llamada a otro Canister demorará alrededor de 2 segundos (1 ronda de consenso) en la misma subred, mientras que tomará alrededor de 4 segundos (2 rondas de consenso) si el Canister está en otra subred.

- Si el Canister con el que intentamos contactar está en la misma subred, el mensaje se procesará en la siguiente ronda.

- Si el contenedor es otra subred, necesitamos 2 rondas de consenso. Necesitamos una ronda para firmar el mensaje y enviarlo a la subred y una

# <a id="preguntas"> 🙋 Preguntas </a>
1. Verdadero o falso: podemos evitar que el Heap se borre durante las upgrades mediante el uso de un Heap "Stable".
2. **A.llamada() -> B.llamada() -> C**
¿Cuánto tiempo (o rondas de consenso) debemos esperar para obtener una respuesta?
3. ¿Es posible realizar una llamada intercanister en modo consulta?

# <a id="recursos-útiles"> 🔗 Recursos y enlaces útiles </a>
- [Variables Stables y métodos de Upgrade](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/upgrades)

- [Memoria Stable](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/stablememory)

- [Compatibilidad](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/compatibility)

- [Estado mutable](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/mutable-state)

- [Memoria Stable experimental](https://internetcomputer.org/docs/current/references/motoko-ref/ExperimentalStableMemory)

- [Gráfico de información IC](https://internetcomputer.org/icig.pdf)
