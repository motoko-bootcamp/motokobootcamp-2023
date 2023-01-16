# Proyecto central 🧑‍🔬
## ❓ **¿Cuál es el proyecto central?**
El proyecto central es un proyecto que construirás durante toda la semana.
La experiencia de construir este proyecto será lo más parecida posible a la experiencia de construir un proyecto real en Internet Computer.

## 🤔 **Motivación**
El Bootcamp no es un hackatón y no debe abordarse como un evento competitivo. Su objetivo principal es unir a la comunidad en un esfuerzo compartido para promover Internet Computer, Motoko, y capacitar a una nueva generación de desarrolladores.

Teniendo eso en cuenta, tener que trabajar en autonomía en un proyecto completo y real con diferentes requisitos proporcionará a los estudiantes y al Bootcamp los siguientes beneficios:
- Ayuda a reforzar los conocimientos y habilidades adquiridos a través de conferencias y desafíos diarios.
- Proporciona un objetivo final claro y motivador para el Bootcamp.
- Desafía la autonomía y creatividad de cada alumno.
- Les da a los estudiantes principiantes una idea de lo que es ser un desarrollador y trabajar en un proyecto.
- Permite otorgar premios a los alumnos más meritorios.
- Crea un proyecto en vivo que muestra la comunidad Motoko Bootcamp y sus logros.

# ☑️ **Requisitos**
El objetivo de esta edición es construir un **DAO (Organización Autónoma Descentralizada)** con los siguientes requisitos:

- El DAO está controlando una página web y puede modificar el texto de esa página a través de propuestas.
- La DAO puede crear propuestas. Cada usuario puede votar propuestas si tiene al menos 1 token Motoko Bootcamp (MB).
- El poder de voto de cualquier miembro es igual al número de MB que posee (en el momento en que emite su voto).
- Una propuesta se aprobará automáticamente si el poder de voto acumulado de todos los miembros que votaron por ella es igual o superior a 100.
- Una propuesta será rechazada automáticamente si el poder de voto acumulado de todos los miembros que votaron en contra es igual o superior a 100.

Aquí hay algunas funciones que deberá implementar en su Canister
```
enviar_propuesta
obtener_propuesta
obtener_todas_las_propuestas
votar
```

Si desea **graduarse con honores**, deberá completar estos requisitos adicionales:
- Los usuarios pueden bloquear sus tokens MB para crear **neuronas** especificando una cantidad y un retraso de disolución.
- Las neuronas pueden estar en 3 estados diferentes:
     - Bloqueada: la neurona está bloqueada con un retraso de disolución establecido y el usuario debe cambiarla a disolución para acceder a su MB.
     - Disolución: el retraso de disolución de la neurona disminuye con el tiempo hasta que llega a 0 y luego la neurona se disuelve y el usuario puede acceder a su ICP.
     - Disuelta: el retardo de disolución de la neurona es 0 y el usuario puede acceder a su ICP.
     El retardo de disolución se puede aumentar después de que se crea la neurona, pero solo se puede disminuir con el tiempo mientras la neurona se encuentra en estado de disolución. Además, las neuronas solo pueden votar si su retraso en la disolución es superior a 6 meses. Además, las neuronas tienen una edad que representa el tiempo transcurrido desde que se crearon o dejaron de disolverse por última vez.

- El poder de voto de una neurona se cuenta de la siguiente manera: CANTIDAD MB TOKENS * DISOLVER DELAY BONUS * AGE BONUS donde:
     - Disolver la bonificación por demora: las bonificaciones escalan linealmente, desde 6 meses que otorga una bonificación de poder de voto de 1.06x, hasta 8 años que otorga una bonificación de poder de voto 2x
     - Bonificación de edad: la bonificación máxima se alcanza a los 4 años y otorga una bonificación de 1,25x, multiplicable con cualquier otra bonificación. Los bonos para duraciones entre 0 segundos y 4 años escalan linealmente entre.
- Las propuestas pueden modificar los siguientes parámetros:
     - El token mínimo de MB necesario para votar (por defecto - 1).
     - La cantidad de poder de voto necesaria para que se apruebe una propuesta (por defecto - 100).
- Una opción para habilitar la votación cuadrática, lo que hace que el poder de voto sea igual a la raíz cuadrada de su saldo de token MB.
- El Canister tiene que estar en estado Blackhole.

Aquí hay algunas funciones que deberá implementar en su Canister
```
enviar_propuesta
obtener_propuesta
obtener_todas_las_propuestas
votar
modificar_parámetros
votación_cuadrática
crearneurona
disolverneurona
```

> Para graduarse con honores no necesita implementar un sistema de seguimiento entre neuronas como en el NNS (pero, por supuesto, si quiere hacerlo, ¡no dude en hacerlo!)

Si quieres **graduarte entre los mejores estudiantes** no hay un requisito específico que podamos dar, pero serás juzgado según los siguientes criterios:
- El código es claro y conciso.
- El código es seguro, seguro y no contiene ningún error.
- Se han implementado funcionalidades adicionales más allá de los requisitos.

## 💰 Faucet de fichas
No queremos involucrar ninguna forma de dinero real para este evento, por lo que hemos creado un faucet para usar. Este token se llama token MB (token Motoko Bootcamp). Este es el token que necesita usar para el proyecto principal. Puedes acuñar tanto como necesites.

Puede acceder al Faucet [aquí] (https://dpzjy-fyaaa-aaaah-abz7a-cai.ic0.app/).

Este token sigue el [estándar ICRC1] (https://github.com/dfinity/ICRC-1).

> Muchas gracias al equipo de [ICPipeline](https://www.icpipeline.com/) por su contribución al Token Faucet.

----Este archivo está en traducción activa. Si encuentras algún detalle, háznoslo saber.----

