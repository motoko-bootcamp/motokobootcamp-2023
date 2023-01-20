# Día 4 🐔
¡Bienvenido al Día 4 del Motoko Bootcamp! Si has llegado tan lejos ya eres un héroe 🦸
<br/> Esperamos que todos estén progresando, aprendiendo nuevas habilidades y no sufriendo demasiado.
En los próximos días, debería dedicar más y más tiempo al proyecto Principal; es por eso que los desafíos y preguntas de codificación serán menos importantes en esta guía y en las siguientes. <br/>

Hoy profundizaremos en temas más avanzados en Motoko, cómo trabajar con Buffers, usar HashMap/TrieMap para el almacenamiento de datos, comprender los Principals e identificadores de Account y discutir los problemas al actualizar un Canister.

## 🧩 Motoko: algunas estructuras de datos más: List, Buffer y TrieMap.
Hemos manipulado mucho **Array** durante los últimos días. Dado que las matrices tienen tamaños fijos en Motoko, no son estructuras de datos muy eficientes cuando se trata de agregar elementos.
En ese caso, las estructuras de datos recomendadas son: **List** o **Buffer** y una estructura más avanzada sería **HashMap** o **TrieMap**. ¡Hoy veremos 3 de ellos!

## List
Las listas en Motoko se definen como listas puramente funcionales y de enlace único.

```motoko
public type List<T> = ?(T, List<T>);
```
Una **Lista** de es un par (opcional) de dos elementos:
- El 1er elemento es un valor de tipo T.
- El 2º elemento es una Lista de tipo T.

Una lista enlazada tiene un tamaño dinámico y es realmente fácil y eficiente agregarle elementos usando la siguiente sintaxis:
```motoko
import List "mo:base/List";
actor {
  var list : List.List<Nat> = List.nil<Nat>();
  list := List.push<Nat>(8, list);
}
```

Desafortunadamente, no es tan eficiente acceder a los elementos de la lista, ya que probablemente tendrá que recorrer muchos de ellos. El costo de buscar un elemento aumentará linealmente con el tamaño de su lista, a diferencia de las matrices en las que simplemente podríamos referirnos a la matriz [i] cuando necesitábamos el elemento en el índice i.
## ➕ Buffer
Después de haber sufrido durante los últimos días usando **Array** en Motoko, te encantará saber que **Buffer** son en realidad más interesantes y generalmente se usan en el código de producción.

> El Buffer se implementa con una matriz subyacente que crecerá/reducirá según sea necesario para adaptarse a la cantidad de elementos agregados en el Buffer . Más información en la documentación de [Buffer](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/base/Buffer).

Para definir un nuevo Buffer , debe especificar un tamaño inicial y el tipo de elementos en el Buffer :
```motoko
import Buffer "mo:base/Buffer";
actor {

  let my_buffer = Buffer.Buffer<Nat>(1);
};
```

Dado que **Buffer** se definen como clases, tienen una interfaz agradable para trabajar, puede llamar a métodos como:
- .add(): agregará un elemento al final del Buffer.
```motoko
my_buffer.add(4);
```
- .size(): devuelve el número de elementos en el Buffer.
```motoko
let s = my_buffer.size(); //1
```
- .clear(): eliminará todos los valores del Buffer.
```motoko
my_buffer.clear(); //1
```

> Un inconveniente de haber definido Buffer como una clase es que, a diferencia de Array, no se pueden definir como estructura Stable de forma predeterminada. Lo que requiere algo de trabajo adicional al actualizar su Canister; más sobre eso más adelante.

## HashMap y TrieMap
En Motoko, **HashMap** y **TrieMap** tienen una interfaz similar: la única diferencia es que TrieMap está representado internamente por un Trie
Ambos representan un almacén de clave/valor:
- **K** será el tipo de clave (Nat, Text, Principal...)
- **V** será el tipo del valor (Datos de usuario, Saldo del token...)

Así es como crearía una instancia de su primer HashMap, con **Claves** de tipo **Principal** y valor de tipo **Nombre**.
En el siguiente código también puede ver un método para agregar elementos y otro que devuelve una matriz que contiene todos los valores del HashMap.
```motoko
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
actor {
    let usernames = HashMap.HashMap<Principal, Text>(0, Principal.equal, Principal.hash);

    public shared ({ caller }) func add_username(name : Text) : async () {
      usernames.put(caller, name);
    };
};
```

> HashMap y TrieMap son muy utilizados en Motoko. Lamentablemente, no son Stables de forma predeterminada (se definen como clases), pero la comunidad está trabajando en [Arrays](https://github.com/ZhenyaUsenko/motoko-hash-map).

## ¿Por qué el IC usa (2) identificaciones?
Ethereum solo tiene Accounts. En esta red, una Account es "una entidad con un saldo de ether (ETH) que puede enviar transacciones en Ethereum". En este caso, una Account podría ser un usuario, una billetera o un contrato inteligente.

El Protocolo informático de Internet, al ser una red más avanzada, divide las cosas en dos tipos de ID:
* **ID Principals** (o simplemente "*Principal*") representan un usuario o contenedor único (y autenticado) que interactúa con un sistema informático.
* **Identificadores de Account** (o simplemente "*Cuenta*") representan una billetera en el [Canister ICP Ledger](https://internetcomputer.org/docs/current/developer-docs/integrations/ledger/), que está destinado a usarse para mantener activos (como tokens o NFT). Cada Cuenta está controlada por exactamente (1) Principal.

> Un solo Principal puede tener control sobre un número (casi) ilimitado de Cuentas.

Puede usar un Principal para derivar una Cuenta que pueda ser controlada por ese Principal, pero no puede usar una Cuenta para derivar el Principal que la controla. Esto significa que puede enviar activos a un controlador (si tiene la Account del destinatario), y el Principal del controlador permanece privado y desconocido para usted.

La distinción de Principal y Cuenta permite interacciones más complejas (y privadas) entre usuarios y activos.

## Principals
Un Principal es un actor único y autenticado que puede invocar funciones de contenedor en la red informática de Internet. También se puede considerar como una clave pública, utilizando la terminología de [criptografía asimétrica](https://en.wikipedia.org/wiki/Public-key_cryptography).

### Clases de Principals
Hay (5) clases de Principals, pero solo debemos centrarnos en (3). Si tiene curiosidad acerca de las otras clases, puede encontrar la [documentación completa aquí](https://internetcomputer.org/docs/current/references/ic-interface-spec#id-classes).
* **Los ID de autenticación automática** son usuarios externos con clave privada. Por lo general, serían usuarios de su dapp que inician sesión con una billetera o un servicio de identidad. Estos Principal tienen una longitud de 29 bytes.
* **Los identificadores opacos** son la clase de Principals utilizados para los Canisters. Específicamente, los Principals de Canister son más cortos que los Principals de usuario y terminan con "-cai". Podrías escribir una función de ayuda para identificar si un Principal es un Principal de contenedor usando algo como esto:
```motoko
  import Bool         "mo:base/Bool";
  import Principal    "mo:base/Principal";
  import Text         "mo:base/Text";

  module {
  
    public func isCanisterPrincipal(p : Principal) : Bool {
      let Principal_text = Principal.toText(p);
      let correct_length = Text.size(Principal_text) == 27;
      let correct_last_characters = Text.endsWith(Principal_text, #text "-cai");

      if (Bool.logand(correct_length, correct_last_characters)) {
        return true;
      };
      return false;
    };
    
  };
```
* **Identificación anónima** es `0x04`, y esta es la "Caller por defecto" que se encuentra cuando un usuario no autenticado llama a funciones. Por ejemplo, si la información de un contenedor debe presentarse en una página web antes de que el usuario inicie sesión, llamaría a las funciones para obtener esta información y su contenedor vería que el Caller es la identificación anónima (porque no sabemos el Principal del usuario hasta que inicie sesión). La [Biblioteca base de Motoko incluye una función `isAnonymous`](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/base/Principal#function-isanonymous) que puede usar para verificar si el Caller está autenticada o no.

## Recepción de activos con un Principal (SubAccount predeterminada)
Algunos de ustedes pueden preguntarse por qué ciertas billeteras (como Plug) les dan la opción de enviar activos a un Principal. Discutiremos las SubAccounts con más detalle, pero lo único que vale la pena mencionar aquí es que es fácil encontrar la "Cuenta predeterminada" de un Principal, por lo que lo que sucede en segundo plano es que en realidad está enviando activos a la Cuenta predeterminada del Principal. que ingresó en el campo "Enviar".

Sin embargo, no todos los proveedores de billeteras hacen esta conversión de Principal a Account predeterminada. Para complicar aún más las cosas, hay algunos tipos de activos que usan un estándar que en realidad asocia activos a Principals en lugar de Cuentas. El uso del ICP Ledger es opcional, el creador de un token o contenedor NFT es libre de implementar su propio libro mayor. En resumen, tenga cuidado al transferir activos de ICP para usar el tipo correcto de identificación (Principal o Cuenta).

## Obtener el Principal de el Caller
Para obtener el Principal que está llamando a una función, todo lo que tiene que hacer es agregar `shared ({caller})` al declarar su función, y luego dentro de su función puede usar la variable `caller` (que será el Principal de lo que sea que esté llamando a esa función). Esta sintaxis se agrega inmediatamente antes de `func` e incluso se puede agregar antes de `actor` (para obtener el Principal que implementó el contenedor).

Aquí hay un ejemplo de una función que atrapa con un error si es llamada por un Canister (usando la función auxiliar definida anteriormente), pero devuelve "¡Hola, humano!" de lo contrario.
```motoko
  import Bool         "mo:base/Bool";
  import Principal    "mo:base/Principal";
  import Text         "mo:base/Text";
  
  import Helpers      "helpers";

  actor {
  
    public shared({ caller }) func helloHuman() : async Text {
      assert not _isCanister(caller);
      return "Hello human!";
    };
    
    private func _isCanister(p : Principal) : Bool {
      return Helpers.isCanisterPrincipal(p);
    };
  
  };
```

Aquí hay un ejemplo de una función que devuelve "verdadero" si el Caller es el Principal que desplegó el contenedor, o "falso" en caso contrario.
```motoko
  import Bool         "mo:base/Bool";
  import Principal    "mo:base/Principal";

  // Aquí obtendrás el Principal que hizo deploy del Canister, y la creará como una variable llamada “creator”.
  shared ({ caller = creator }) actor class () {

    // Aquí defines una variable stable llamada “master” para guardar el valor de “creator” al State del Canister.
    stable var master : Principal = creator;

    // Obtendrás el Principal llamando a esta función, y después puedes validar a ver si es igual a “master”.
    public shared ({ caller }) func isMaster() : async Bool {
      if (caller == master) {
        return true;
      };
      return false;
  };
```

## Accounts (Cuentas)
Las Accounts son números enteros grandes (representados como cadenas de 32 bytes) que representan una billetera única que puede contener activos en [el Canister Ledger](https://internetcomputer.org/docs/current/references/ledger#_accounts).

### SubAccount and Default Account (SubAccounts y Account predeterminada)
Para derivar una Account de un Principal, necesita lo que se llama una "SubAccount".

El algoritmo exacto para derivar una Account no es importante en este momento, todo lo que necesita saber es que necesita tanto una Account Principal como una SubAccount para obtener una Account:
`func accountIdentifier(principal: Principal, subAccount: SubAccount) : AccountIdentifier'

Una SubAccount también es un número entero grande (que también podría representarse como una cadena de 32 bytes), pero es más fácil pensar en ellos casi como un "contador".

Para cualquier Principal, nos referimos a la Account que corresponde a la SubAccount que es igual a 0 como la Account predeterminada de ese Principal. Si quisiera generar otra Account para ese Principal, entonces podría usar la SubAccount que es igual a 1 para generar otra Cuenta. Incluso podría elegir cualquier número aleatorio de 32 bytes y luego usarlo para obtener una Account que podría ser controlada por ese Principal. Hay muchas Cuentas que podrían generarse para un Principal, porque un número entero sin signo de 32 bits tiene un valor máximo de 4,294,967,295.

### Principal a Account
Un Canister tiene su propio Principal y, a menudo, necesita almacenar y controlar activos (como tokens o NFT) en nombre de los usuarios (que también tienen su propio Principal).

Una práctica común es convertir el Principal de un usuario en una SubAccount, luego usar esa SubAccount para derivar una Cuenta (única para ese usuario) que el Canister puede controlar.

No se preocupe por comprender esta lógica ahora, pero este es el ejemplo de una función auxiliar que se usa comúnmente para convertir el Principal de un usuario en una SubAccount (en este ejemplo, representa la SubAccount como un blob).
```motoko
  public type Subaccount = Blob;

  public func PrincipalToSubaccount(principal: Principal) : Blob {
      let idHash = SHA224.Digest();
      idHash.write(Blob.toArray(Principal.toBlob(Principal)));
      let hashSum = idHash.sum();
      let crc32Bytes = beBytes(CRC32.ofArray(hashSum));
      let buf = Buffer.Buffer<Nat8>(32);
      let blob = Blob.fromArray(Array.append(crc32Bytes, hashSum));

      return blob;
  };
```

Luego, se podría usar otra función auxiliar para combinar esta SubAccount con un Principal (como el Principal del Canister) para crear una Account que se represente como un blob (nuevamente, no se preocupe por comprender esta lógica en este momento).
```
  public type AccountIdentifier = Blob;
  
  public func accountIdentifier(principal: Principal, subaccount: Subaccount) : AccountIdentifier {
    let hash = SHA224.Digest();
    hash.write([0x0A]);
    hash.write(Blob.toArray(Text.encodeUtf8("account-id")));
    hash.write(Blob.toArray(Principal.toBlob(Principal)));
    hash.write(Blob.toArray(subaccount));
    let hashSum = hash.sum();
    let crc32Bytes = beBytes(CRC32.ofArray(hashSum));
    Blob.fromArray(Array.append(crc32Bytes, hashSum))
  };
```

Ahora podríamos usar estas funciones auxiliares para crear una dirección de depósito ICP única para un usuario (que en este caso se representa como un blob).
```motoko
  import Principal    "mo:base/Principal";
  import Text         "mo:base/Text";

  import Helpers      "helpers";
  
  // La sintaxis te da una variable 'this' que el Canister puede utilizar para obtener su propio Principal which the canister can use to get it's own Principal
  shared actor class ExampleCanister() = this {
  
    // Utiliza el valor de la función “fromActor” del módulo Principal (Base Library) para almacenar el Principal del canister a una variable 'canisterPrincipal'.
    let canisterPrincipal : Principal = Principal.fromActor(this);
  
    public type AccountIdentifier = Blob;
    public type Subaccount = Blob;
    
    public shared ({ caller }) func getAddress() : async AccountIdentifier {
      // Retorna una Account derivada del Principal del Canister y un SubAccount. El SubAccount se deriva el Principal del Caller.
      return Helpers.accountIdentifier(canisterPrincipal, Helpers.PrincipalToSubaccount(caller));
    };
    
  };
```

> Encontrará más enlaces para manipular Cuentas y Principals al final de esta guía en la sección #enlaces-útiles.

## ♻️ Upgrades
Hacer Upgrade de un Canister es una tarea común, cuando el código se actualiza e implementa, el Canister se actualiza. Hay algunas cosas a considerar antes de actualizar un Canister:
- ¿Podría la actualización causar pérdida de datos?
- ¿Podría la actualización romper el dapp debido a cambios en la interfaz?

### Preservación del State (data)
Cuando se actualiza un Canister, el estado se pierde de forma predeterminada. Esto significa que se perderán todos los datos de la aplicación, a menos que se manipule para que persistan cuando se actualice el Canister. Esto se puede lograr almacenando los datos en variables Stables, que persistirán en las actualizaciones, pero las variables Stables no admiten todos los tipos de datos.

### Stable Types (Tipos Stables)
Los tipos de datos simples como Nat, Int y Text pueden convertirse en variables Stables, lo que significa que su estado persistirá en una actualización del Canister, simplemente agregando _stable_ a la declaración de la variable:

```motoko
actor MyActor {

  stable var state : Int = 0;

  public func inc() : async Int {
    state += 1;
    return state;
  };
}
```
El valor de la variable `estado` persistirá en una actualización y no se perderá.

### Non-stable types (Tipos no Stables)
Los tipos de datos más complejos como Hashmap no son tipos Stables. Esto no significa que sus valores no puedan persistir después de una actualización, solo significa que su persistencia debe manejarse manualmente. Afortunadamente las funciones `` y ``

```motoko
actor MyActor {

  stable var entries : [(Text, Nat)] = [];

  let map = HashMap.fromIter<Text,Nat>(
    entries.vals(), 10, Text.equal, Text.hash);

  public func register(name : Text) : async () {
    switch (map.get(name)) {
      case null  {
        map.put(name, map.size());
      };
      case (?id) { };
    }
  };

  system func preupgrade() {
    entries := Iter.toArray(map.entries());
  };

  system func postupgrade() {
    entries := [];
  };
}
```

Este fragmento de código muestra cómo el estado de un HashMap puede persistir en una actualización mediante la serialización de los datos de estado antes de la actualización (`preupgrade()`). En la inicialización de la variable `mapa` después de la actualización, se carga el estado serializado. De esta manera, los datos de HashMap se vuelven persistentes después de una actualización del Canister.


### Candid changes
Los cambios en una función de Motoko pueden cambiar la interfaz de Candid y eso podría dañar la aplicación. Entonces, cuando actualice el Canister, considere cómo los cambios pueden afectar la interfaz de Candid. Incluso pequeños cambios en el código de Motoko pueden tener un gran impacto en la interfaz de Candid y potencialmente romper la dapp. Considere este ejemplo:

```motoko
actor {
  stable var state : Int
};
```
En este ejemplo, la variable `estado` es un Int, pero digamos que en una actualización el tipo se cambia a Nat, lo cual no es un gran cambio.
```motoko
actor {
  stable var state : Nat
};
```
Este sería un cambio importante para, p. la aplicación cliente si espera un número entero. Con este pequeño cambio, la interfaz de Candid cambiará.

### Cambios en la estructura de datos
Otro ejemplo de cómo se pueden perder los datos es cambiando los tipos de datos.

```motoko
actor {
  stable var state : Int
};
```
```
En este ejemplo, la variable `estado` es un Int, pero digamos que en una actualización el tipo se cambia a Texto:
```motoko
actor {
  stable var state : Text
};
```
En este caso, se perderá el valor Int actual. Una forma de evitar la pérdida de datos al cambiar los tipos de datos es mantener la variable original y crear una nueva variable para el nuevo tipo de datos. De esta forma, los datos originales no se perderán debido a las actualizaciones del Canister.

### Upgrade vs Reinstall
En algunos casos, especialmente para el desarrollo, puede que no sea necesario realizar una implementación completa del código para probarlo. El comando DFX Reinstalar reemplazará el código en el Canister y eliminará todos los datos de estado. Obtenga más información sobre la reinstalación de Canisters en la [documentación](https://internetcomputer.org/docs/current/developer-docs/build/project-setup/manage-canisters#reinstall-a-canister).

# 🧹 Tarea
Por hoy, deberá implementar las estructuras de datos para almacenar propuestas y votos dentro del contenedor DAO. Esta tarea es bastante vaga porque hay muchas formas diferentes de hacerlo, pero básicamente al final de hoy debería poder realizar operaciones CRUD en su Canister DAO y poder actualizar su Canister sin perder los datos.

# Preguntas 🙋
1. ¿Se guarda la memoria del montón al actualizar un Canister? ¿Cuánta memoria de almacenamiento dinámico tiene un Canister?
2. ¿Cuántas Accounts puede poseer un Principal único?
3. ¿Podemos actualizar de forma segura un Canister de la interfaz A a la interfaz B?

Interfaz A
```motoko
actor {
  public func greet(surname : Text, firstname : Text) : async Text {
    return "Hello" # firstname # surname # " !";
  };
}
```motoko
Interface B
```motoko
actor {
  public func greet(firstname : Text) : async Text {
    return "Hello" # firstname # " !";
  };
}
```

# Desafíos de código 🧑‍💻
1. Escriba una función `única` que tome una lista l de tipo List<T> y devuelva una nueva lista con todos los elementos duplicados eliminados.
```motoko
único<T> : (l : Lista<T>, igual: (T,T) -> Bool) -> Lista<T>
```
2. Escriba una función `reverse` que tome l de tipo List<T> y devuelva la lista invertida.
```motoko
reverse<T> : (l : Lista<T>) -> Lista<T>;
```
3. Escriba una función `is_anonymous` que no tome argumentos pero devuelva una indicación booleana indicando si el Caller es anónima o no.
```motoko
is_anynomous : () -> asíncrono Bool;
```
4. Escriba una función `find_in_buffer` que tome dos argumentos, buf de tipo **Buffer** y val de tipo **T**, y devuelva el índice opcional de la primera aparición de "val" en "buf".
```motoko
find_in_buffer<T> : (buf: Buffer.Buffer<T>, val: T, equal: (T,T) -> Bool) -> ?Nat
```
5. Echa un vistazo al código que hemos visto antes en esta guía:

```motoko
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
actor {

    let usernames = HashMap.HashMap<Principal, Text>(0, Principal.equal, Principal.hash);

    public shared ({ caller }) func add_username(name : Text) : async () {
      usernames.put(caller, name);
    };
};
```
Agregue una función llamada `get_usernames` que devolverá una matriz de tuplas (Principal, Texto) que contiene todas las entradas en los nombres de usuario.
```motoko
get_usernames : () -> async [(Principal, Text)];
```

# Recursos y enlaces útiles 🔗
- Cuenta.mo [TODO]
- Cuenta.js [POR HACER]
- [Documentación de la biblioteca base Principal](https://internetcomputer.org/docs/current/references/motoko-ref/Principal)
- [Documentación de la interfaz Principal](https://internetcomputer.org/docs/current/references/ic-interface-spec#Principal)
- [Verificación de compatibilidad de actualización](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/compatibility)
- [Gestión de Canisters](https://internetcomputer.org/docs/current/developer-docs/build/project-setup/manage-canisters#upgrade-a-canister)
- [Variables Stables y métodos de actualización](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/upgrades)
- [Reinstalar Canisters](https://internetcomputer.org/docs/current/developer-docs/build/project-setup/manage-canisters#reinstall-a-canister)
- [Verificación de compatibilidad de actualización](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/compatibility)
- [Gestión de Canisters](https://internetcomputer.org/docs/current/developer-docs/build/project-setup/manage-canisters#upgrade-a-canister)
- [Variables Stables y métodos de actualización](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/upgrades)
- [Reinstalar Canisters](https://internetcomputer.org/docs/current/developer-docs/build/project-setup/manage-canisters#reinstall-a-canister)
