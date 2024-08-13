# 1. PRUEBA TÉCNICA DESARROLLO

## DESCRIPCIÓN DEL PROBLEMA

La empresa Celsia Internet S.A.S. requiere implementar una solución para su proceso de venta que permita la captura de información de los clientes y la contratación de uno o varios servicios del portafolio de internet.

El ejercicio consiste en implementar un backend y frontend con su configuración de despliegue en contenedores, para el registro y consulta de la información de los servicios contratados por los clientes, de acuerdo con el modelo de datos presentado a continuación.

## MODELO DE DATOS

Las tablas donde se almacena la información son las siguientes:

```console
CREATE TABLE clientes {
  identificacion VARCHAR(20) NOT NUL PRIMARY KEY,
  nombres VARCHAR(80) NOT NULL,
  apellidos VARCHAR(80) NOT NULL,
  tipoIdentificacion VARCHAR(2) NOT NULL,
  fechaNacimiento DATE NOT NULL,
  numeroCelular VARCHAR(20) NOT NULL,
  correoElectronico VARCHAR(80) NOT NULL
};


CREATE TABLE servicios {
  identificacion VARCHAR(20) NOT NUL,
  servicio VARCHAR(80) NOT NUL,
  fechaInicio DATE NOT NULL,
  ultimaFacturacion DATE NOT NULL,
  ultimoPago INTEGER NOT NUL DEFAULT 0,
  PRIMARY KEY (identificacion, servicio),
  CONSTRAINT servicios_FK1 FOREING KEY (identificacion) REFERENCES clientes(identificacion) ON UPDATE CASCADE ON DELETE NO ACTION
}
```

Para la prueba se deben crear las tablas en el motor de base de datos de su preferencia. Sobre esta base se deben almacenar los registros de los clientes y servicios que se especifican para la prueba.

## Puntos de la prueba

1.1. Implemente en el lenguaje de su preferencia, una `CRUD (Create, Read, Update and Delete)` que permita capturar y administrar la información de los clientes y sus servicios.

1.2. Se deben realizar las siguientes validaciones:

- No dejar datos en blanco.
- El tipo de dato, de acuerdo con la estructura en la base de datos.
- Si el registro ya existe muestre el mensaje `“El registro ya existe”`.

1.3. Implementar un formulario que permita registrar los servicios contratados de los clientes. `Nota: Tener en cuenta integridad referencial.`

1.4. Implementar un formulario para la consulta por número de identificación, la información de un cliente y los servicios que tiene contratados.

TIPS:

a. Para el campo `tipoIdentificacion` ingresar solamente los siguientes valores:

- CEDULA → CC
- TARJETA IDENTIDAD → TI
- CEDULA EXTRANJERIA → CE
- REGISTRO CIVIL → RC

b. Para el campo `servicio` ingresar solamente los siguientes tipos:

- Internet 200 MB
- Internet 400 MB
- Internet 600 MB
- Directv Go
- Paramount+
- Win+

c. Se evaluará el uso de patrones de diseño, en backend y frontend, la configuración de despliegue en contenedores y de la imagen a desplegar.

d. En el docker-compose se debe incluir la configuración del servicio de base de datos que haya escogido y una política de manejo de logs para cada servicio.

## ENTREGABLE

Se espera como resultado un clone del repositorio `https://github.com/celsia-internet/pruebas.git`, con la siguiente estructura.

```
api/
|-- docker-compose.yml
|-- Dockerfile
|-- README.md
|-- ...
webapp/
|-- docker-compose.yml
|-- Dockerfile
|-- README.md
|-- ...
```

El repositorio de la prueba deberá estar publicado en `github` de manera pública con el nombre `prueba-celsia-internet` usando git-flow por desarrollador.

```
main/
|-- develop
||-- <desarrollador>
```

# 2. PRUEBA TEORICO-PRACTICA

Para el desarrollo de la prueba teórica, tendrás que escribir tus respuestas en el archivo README.md del repositorio, tomando como referencia la aplicación desarrollada en la `PRUEBA TÉCNICA DE DESARROLLO`.

## PREGUNTAS

2.1. Elabore un diagrama de componentes de la aplicación. Debe cargar el archivo en la siguiente ruta del repositorio: `./assets/diagrama.png`

<img src="https://github.com/celsia-internet/pruebas/blob/main/assets/diagrama.png" alt="Diagrama" width="400">

2.2. ¿Qué mecanismos de seguridad incluirías en la aplicación para garantizar la protección del acceso a los datos?

- **RTA:** Protección como:

  1. Control de Acceso Basado en Roles (RBAC): Definir roles y permisos específicos para limitar el acceso a los datos según el rol del usuario.
  2. Autenticación y Autorización: Implementar OAuth2 y JWT (JSON Web Tokens) para asegurar que solo los usuarios autenticados y autorizados puedan acceder a los recursos.

  2.3. ¿Qué estrategia de escalabilidad recomendarías para la aplicación considerando que el crecimiento proyectado será de 1,000,000 de clientes por año?

- **RTA:** Recomendaría una estrategia de escalabilidad como:

  1. **Microservicios:** Dividir la aplicación en microservicios independientes que puedan escalarse de manera autónoma según la demanda.
  2. **Balanceo de carga:** Distribuir la carga de trabajo entre varios servidores para evitar cuellos de botella y mejorar la disponibilidad.
  3. **Orquestación de contenedores:** Utilizar herramientas como Kubernetes para gestionar y orquestar los contenedores de la aplicación.

  2.4. ¿Qué patrón o patrones de diseño recomendarías para esta solución y cómo se implementarían? (Justifique)

- **RTA:** Recomendaría los siguientes patrones de diseño:

  1. Patrón de Microservicios: Permite desarrollar, desplegar y escalar servicios de manera independiente. Cada microservicio se encarga de una funcionalidad específica y se comunica con otros servicios a través de APIs.

  2.5. ¿Qué recomendaciones harías para optimizar el manejo y la persistencia de datos de la aplicación, teniendo en cuenta que esta aplicación tiene una alta transaccionalidad?

- **RTA:** Para optimizar el manejo y la persistencia de datos seria como:

  1. Optimización de Consultas: Revisar y optimizar las consultas SQL para reducir el tiempo de ejecución y el uso de recursos.
  2. Uso de Bases de Datos NoSQL: Considerar bases de datos NoSQL como MongoDB o Cassandra para manejar grandes volúmenes de datos y transacciones.

# 3. Redes

3.1. Explica la diferencia entre un router y un switch. ¿Cuándo usarías cada uno?

- **RTA:** Un router conecta diferentes redes y permite que se comuniquen entre sí, como una red de casa con Internet. Un switch conecta varios dispositivos dentro de la misma red, como computadoras e impresoras en una oficina. Usarías un router para conectarte a Internet y un switch para conectar dispositivos en una red local.

3.2. Describe las siete capas del modelo OSI y menciona brevemente la función principal de cada una

- **RTA:**
  1. **Capa Física:** Transmite datos en forma de bits a través de cables o señales inalámbricas.
  2. **Capa de Enlace de Datos:** Asegura que los datos se envíen sin errores entre dos dispositivos.
  3. **Capa de Red:** Decide la ruta que los datos deben seguir para llegar a su destino.
  4. **Capa de Transporte:** Asegura que los datos lleguen correctamente y en el orden correcto.
  5. **Capa de Sesión:** Mantiene la comunicación abierta entre dos dispositivos.
  6. **Capa de Presentación:** Traduce los datos para que la aplicación los entienda.
  7. **Capa de Aplicación:** Proporciona servicios de red a las aplicaciones, como el correo electrónico.

3.3. Explica las diferencias entre los protocolos TCP y UDP. Dar un ejemplo de cuándo usarías cada uno?

- **RTA:** TCP es más confiable porque asegura que los datos lleguen completos y en orden, como cuando descargas un archivo. UDP es más rápido pero menos confiable, ideal para cosas como videollamadas donde la velocidad es más importante que la precisión.

3.4. ¿Qué es una máscara de subred y cómo se utiliza para dividir una red en subredes más pequeñas?

- **RTA:** Una máscara de subred es un número que ayuda a dividir una red grande en partes más pequeñas. Esto facilita la gestión y mejora la seguridad de la red.

3.5. ¿Puedes mencionar algunos protocolos de enrutamiento dinámico y explicar brevemente cómo funcionan?

- **RTA:** Algunos protocolos son RIP y BGP. Ayudan a los routers a encontrar la mejor ruta para enviar datos a través de la red, ajustándose automáticamente si hay cambios en la red.

# 4. Gestión de Proyectos

4.1. ¿En qué grupos de procesos de dirección de proyectos es creado un presupuesto detallado del proyecto?

- **RTA:** En la fase de planificación.

4.2. ¿En qué grupo de procesos de la dirección de proyectos es creada el acta de constitución del proyecto?

- **RTA:** En la fase de inicio.

4.3. El equipo de proyecto acaba de completar el primer cronograma y presupuesto del proyecto. La próxima cosa a hacer es:********\_********

- **RTA:** Obtener la aprobación de los interesados.

4.4. Un primer cronograma del proyecto puede ser creado solamente después de crear: **********\_\_\_\_**********

- **RTA:** El alcance del proyecto.

4.5. Una persona que debe estar al mando durante la planificación de la gestión del proyecto es:************\_\_************

- **RTA:** El gerente de proyecto.

4.6. ¿Cuál de son las entradas del grupo de procesos de inicio de un proyecto?

- **RTA:** Un documento que explica qué es el proyecto y por qué es importante. Una lista de todas las personas que tienen interés en el proyecto y que pueden afectar o ser afectadas por él.

4.7. El patrocinador del proyecto acaba de aprobar el acta de constitución del proyecto, ¿cuál es la próxima cosa a hacer?

- **RTA:** Desarrollar el plan de gestión del proyecto.

4.8. Acaban de ser establecidas las restricciones de alto nivel del cronograma del proyecto. ¿En qué grupo de procesos de dirección de proyectos se encuentra?

- **RTA:** En la fase de planificación.

4.9. ¿Qué grupos de procesos deben ser incluidos en cada proyecto?

- **RTA:** Inicio, planificación, ejecución, monitoreo y control, y cierre.

4.10. ¿Qué grupo de procesos de la dirección de proyecto necesita normalmente el mayor tiempo y número de recursos?

- **RTA:** La fase de ejecución.

# 5. Caso práctico

Celsia internet en su proceso de expansión, se ha fijado como meta un crecimiento para los proximos 5 años donde se espera tener un millon de clientes. Para el que el proceso de facturación y recaudo sea efectivo, se requiere que el sistema de liquidación mensual de procese en los tiempos de corte establecidos de acuerdo con los ciclos de facturación definidos, los servicios que han sido prestados a sus clientes y las novedades reportadas en cada periodo. Que estrategias implementaría en el desarrollo de los componentes de liquidación y facturación masiva de servicios por ciclo y el recaudo de los pagos de las factura, buscando que el sistema sea robusto, escalable, resiliente, confiable y mantenible en el tiempo, ademas de la seguridad de la infomración y el tratamiento de los datos personales de los clientes.

Describa o diseñe las estrategias que incluiría para dar solución a los requerimientos solicitados en la implementación de los componentes descritos (Justifique la priorización de ciertos atributos sobre otros atributos de calidad en la propuesta de solución).

    Para que Celsia Internet pueda manejar un millón de clientes en los próximos 5 años y asegurar que el sistema de facturación y recaudo funcione bien, aquí hay algunas estrategias que podrías implementar tomando en cuenta soluciones anteriores:

    Primero, es importante dividir el sistema en pequeñas partes independientes llamadas microservicios. Cada microservicio se encarga de tareas específicas como facturación, liquidación y recaudo. Esto hace que el sistema sea más fácil de escalar y mantener. Si una parte falla, no afecta a todo el sistema.

    Usar herramientas de automatización para procesar las facturas y pagos automáticamente es otra estrategia clave. Esto ahorra tiempo y reduce errores humanos, asegurando que las facturas se procesen a tiempo. Además, es esencial utilizar bases de datos que puedan manejar grandes volúmenes de datos y distribuir la carga entre varios servidores. Esto asegura que el sistema pueda manejar el crecimiento de clientes sin problemas de rendimiento. También es útil implementar sistemas de caching para almacenar temporalmente datos frecuentemente consultados y usar balanceadores de carga para distribuir el tráfico entre múltiples servidores. Esto mejora la velocidad de acceso a los datos y asegura que el sistema pueda manejar grandes volúmenes de tráfico sin sobrecargar un solo servidor.

    Enviar recordatorios automáticos a los clientes sobre pagos pendientes es otra buena práctica. Esto ayuda a reducir el número de pagos atrasados y mejora el flujo de caja. Además, es importante automatizar estos procesos y usar tecnología ya existente, como conectar el sistema con varias pasarelas de pago para procesar pagos de manera segura. Esto facilita el proceso de pago para los clientes y asegura que los pagos se procesen de manera segura.

    Finalmente, es crucial priorizar ciertos atributos de calidad. Enfocarse en la escalabilidad para manejar el crecimiento proyectado de clientes, la confiabilidad para asegurar que el sistema funcione correctamente y sin interrupciones, la seguridad para proteger la información sensible de los clientes, la mantenibilidad para facilitar la actualización y mejora del sistema a lo largo del tiempo, y la resiliencia para asegurar que el sistema pueda recuperarse rápidamente de fallos.

### Por último, y no menos importante, te deseamos mucha suerte y esperamos que disfrutes haciendo la prueba. El objetivo es evaluar tu conocimiento, capacidad de adaptabilidad y habilidad para resolver problemas.
