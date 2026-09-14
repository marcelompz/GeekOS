import { Anecdote } from "../types";

export const ANECDOTES_DATA: Anecdote[] = [
  {
    id: "origen-geekos",
    title: "La Escuela Dura de Linux: Cuando No Existía YouTube",
    tagline: "El nacimiento de GeekOS: pelear contra la terminal para entender qué ocurre tras bambalinas.",
    category: "cultura",
    projectType: "Historia de Origen / Universidad & Open Source",
    stack: ["Linux (Debian/Fedora)", "Java", "Bash", "Terminal Pura"],
    date: "2024-03-01",
    readTime: "5 min de lectura",
    techChallenge:
      "Aprender programación y desarrollo de software en una universidad donde toda la cátedra se dictaba sobre Windows y con asistentes gráficos de 'siguiente-siguiente'. En aquella época no existían videotutoriales paso a paso en YouTube ni la abundancia de Stack Overflow. Decidir hacer todo en Linux implicaba configurar a mano JAVA_HOME, PATH, lidiar con permisos y compilar desde la terminal.",
    codeSnippet: `# Configurando el entorno a mano cuando un error tipográfico detenía todo
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk
export PATH=$JAVA_HOME/bin:$PATH
javac -cp ".:lib/*" -d bin src/com/geekos/core/*.java
java -cp "bin:lib/*" com.geekos.core.MainKernel`,
    humanDilemma:
      "Tus compañeros terminaban los prácticos en 10 minutos con clics en Windows y te preguntaban '¿para qué te complicas la vida?'. La presión social para tomar el camino fácil versus la convicción profunda de que entender las entrañas del sistema operativo te daría una soberanía técnica real.",
    resolution:
      "Romperse la cabeza contra las páginas de manual (man), foros dispersos y la terminal sin atajos forjó un criterio arquitectónico que ningún instalador automático puede enseñar. GeekOS nació de ese hábito: desmontar el juguete para entender cómo funciona el motor.",
    geekosMoral:
      "El camino difícil en tecnología siempre paga dividendos. Quien solo sabe presionar botones depende de quien diseñó la interfaz; quien comprende el sistema operativo es libre.",
    keyTakeaways: [
      "Aprender a los golpes y sin tutoriales enseña a razonar el sistema en profundidad.",
      "La terminal no es una barrera elitista, sino una ventana directa a la verdad de la máquina.",
      "La soberanía técnica nace del software libre y de la curiosidad perseverante.",
    ],
  },
  {
    id: "dos-mundos-crossnexion",
    title: "De la Cancha de Básquet a Fundar Crossnexion",
    tagline: "El choque cultural entre el mundo corporativo Microsoft y la trinchera del Software Libre.",
    category: "relaciones-humanas",
    projectType: "Historia de Emprendimiento & Odoo Partner",
    stack: ["Odoo ERP", "Python", "PostgreSQL", "Debian", "Microsoft Enterprise"],
    date: "2024-06-15",
    readTime: "5 min de lectura",
    techChallenge:
      "Crear una empresa de consultoría tecnológica integrando dos visiones de mundo opuestas: la estructura de procesos de una multinacional habituada al paraguas corporativo de Microsoft, y la visión rebelde de un arquitecto defensor radical del código abierto y Linux.",
    codeSnippet: `// La convergencia arquitectónica en Odoo
class OmniConnector(models.Model):
    _name = "omni.connector.bridge"
    _description = "Puente entre procesos corporativos y libertad Open Source"
    
    sync_mode = fields.Selection([
        ('async_event', 'Desacoplado / Event-Driven'),
        ('ledger_immutable', 'OmniLedger Inmutable')
    ], default='async_event')`,
    humanDilemma:
      "El debate entre dos amigos sobre seguridad, costos y soberanía de datos. ¿Cómo dialogar sin soberbia cuando tu socio viene de la seguridad de las licencias corporativas y tú vienes del software libre? El ego técnico casi sabotea la sociedad antes de empezar.",
    resolution:
      "Descubrieron en la cancha de básquet que el trabajo en equipo gana campeonatos, no las individualidades. Unieron la rigurosidad corporativa con la agilidad del código abierto, encontrando en Odoo la plataforma ideal para transformar negocios reales sin atar a los clientes a esquemas cautivos.",
    geekosMoral:
      "Dos mentes con visiones opuestas son un peligro si compiten, pero una potencia si convergen. El software libre no necesita aislarse del mundo corporativo; necesita conquistarlo con excelencia y empatía.",
    keyTakeaways: [
      "La confianza forjada fuera de la pantalla (como en el deporte) es el cimiento más sólido para un emprendimiento de TI.",
      "No impongas el open source por ideología; demuéstralo con valor de negocio, robustez y costo total de propiedad.",
      "La complementariedad de perfiles técnicos y de gestión es la clave de Crossnexion.",
    ],
  },
  {
    id: "omnigastro-cancelacion",
    title: "Por Qué Cancelé la Demo en Producción de Omnigastro",
    tagline: "El valor de frenar a tiempo: cuando la arquitectura de micro-bases de datos colapsó en la trinchera.",
    category: "arquitectura",
    projectType: "Caso Real / Arquitectura de Software",
    stack: ["Monolito Modular", "Microservicios", "Debian Edge", "Hardware Acotado"],
    date: "2024-10-04",
    readTime: "4 min de lectura",
    techChallenge:
      "Diseñar una solución gastronómica con módulos standalone donde cada módulo tenía su propia base de datos independiente. En papel se veía moderna y desacoplada; en un restaurante real con hardware modesto y pedidos al segundo, la latencia, la sincronización entre bases de datos y el consumo de memoria hicieron colapsar el sistema.",
    codeSnippet: `// ❌ El error: Sobre-ingeniería de bases de datos por módulo
// DB Pedidos <-> DB Cocina <-> DB Facturación (Latencia inmanejable en SBCs)

// ✅ La solución: Monolito modular unificado
// Una única instancia transaccional optimizada para correr en una distro Debian dedicada`,
    humanDilemma:
      "Faltaban pocas horas para la demo decisiva con el cliente gastronómico. El instinto humano era parchar con alambre, rezar para que no fallara durante la reunión y disimular el problema para cobrar el contrato.",
    resolution:
      "Tuve el coraje de llamar al cliente, explicarle con honestidad técnica que el diseño actual no soportaría el estrés real de su cocina, cancelar la demo y reescribir la solución hacia un monolito modular unificado y liviano. El cliente valoró la sinceridad y la relación se consolidó.",
    geekosMoral:
      "Es mejor soportar la vergüenza de cancelar una demo a tiempo que la humillación de ver caer un negocio en producción por ocultar tu deuda técnica.",
    keyTakeaways: [
      "No apliques modas de microservicios a problemas que demandan la simplicidad y robustez de un monolito modular.",
      "El hardware acotado en el Edge (POS/IoT) no perdona el despilfarro de recursos.",
      "La honestidad técnica radical con el cliente genera más confianza que cualquier demo perfecta pero engañosa.",
    ],
  },
  {
    id: "deadlock-3am",
    title: "El Deadlock Fantasma de las 3:14 AM",
    tagline: "Cuando la concurrencia no perdonó y aprendimos a no buscar culpables en la sala de guerra.",
    category: "backend",
    projectType: "Pasarela Financiera de Alta Concurrencia",
    stack: ["PostgreSQL", "Node.js", "Redis", "Distributed Locks"],
    date: "2024-11-12",
    readTime: "4 min de lectura",
    techChallenge:
      "Durante una campaña de ofertas masivas, las transacciones comenzaron a colgarse en cascada. El pool de conexiones de la base de datos se saturó en 45 segundos. Dos microservicios actualizaban las tablas 'cuentas' y 'movimientos' en orden inverso dentro de transacciones acopladas, provocando un deadlock cíclico invisible en desarrollo.",
    codeSnippet: `// ❌ El antipatrón: orden inconsistente de adquisición de bloqueos
// Servicio A:
await db.query("SELECT * FROM cuentas WHERE id = $1 FOR UPDATE", [userId]);
await db.query("SELECT * FROM movimientos WHERE user_id = $1 FOR UPDATE", [userId]);

// Servicio B (ejecutándose en paralelo):
await db.query("SELECT * FROM movimientos WHERE user_id = $1 FOR UPDATE", [userId]);
await db.query("SELECT * FROM cuentas WHERE id = $1 FOR UPDATE", [userId]);
// 💥 DEADLOCK garantizado bajo carga!`,
    humanDilemma:
      "A las 3:30 AM en la videollamada de emergencia, los directores exigían saber '¿quién aprobó ese PR?'. La tensión era máxima y un desarrollador junior estaba a punto de renunciar por el pánico. El instinto humano en crisis es buscar cabezas, no soluciones sistémicas.",
    resolution:
      "Implementamos orden canónico estricto de locking ordenando los IDs numéricamente antes de cualquier transacción, y añadimos timeouts agresivos con reintentos exponenciales. Pero lo más importante: instauramos un post-mortem 'blameless' donde felicitamos al junior por detectar la anomalía en los logs.",
    geekosMoral:
      "Los sistemas de software son tan frágiles como las defensas de un gecko mudando de piel; pero el mayor bug no estaba en la base de datos, sino en la cultura del miedo.",
    keyTakeaways: [
      "Siempre adquiere recursos y bloqueos en un orden lexicográfico o numérico uniforme.",
      "Los post-mortems sin culpa (blameless) transforman desastres en capital intelectual.",
      "La calma técnica de un líder a las 3 AM vale más que 100 líneas de optimización.",
    ],
  },
  {
    id: "monolith-refactor",
    title: "El Rescate del Monolito de 10 Años sin Tests",
    tagline: "Desarmando una bomba de espagueti heredado mientras manteníamos el negocio facturando.",
    category: "arquitectura",
    projectType: "Sistema ERP para Logística Internacional",
    stack: ["Legacy PHP/Java", "TypeScript", "Docker", "Strangler Fig Pattern"],
    date: "2024-08-20",
    readTime: "5 min de lectura",
    techChallenge:
      "Un archivo central de 14,000 líneas llamado 'UtilsManager.inc' contenía la facturación de 5 países. Cada deploy era una ruleta rusa. Nadie se atrevía a tocarlo porque no existía un solo test y los fundadores originales ya no estaban en la empresa.",
    codeSnippet: `// Estrangulando al gigante con el patrón 'Strangler Fig'
export async function processInvoice(order: Order) {
  // 1. Envía el 1% del tráfico al nuevo servicio en TypeScript
  if (featureFlags.isEnabled("NEW_INVOICE_ENGINE", order.tenantId)) {
    return await modernBillingService.compute(order);
  }
  // 2. Fallback al monolito veterano mientras verificamos consistencia
  return await legacyMonolithBridge.call("UtilsManager.inc", order);
}`,
    humanDilemma:
      "El equipo veterano sentía que la refactorización era un desprecio a su trabajo de una década. Decían: 'funciona, ¿para qué arriesgarlo?'. Mientras tanto, los nuevos fichajes se frustraban y querían tirar todo a la basura y rehacerlo de cero (el clásico pecado de la reescritura total).",
    resolution:
      "En lugar de reescribir todo en secreto, organizamos sesiones donde los desarrolladores veteranos fueron los 'arquitectos consultores de honor'. Documentamos cada regla de negocio oculta y aplicamos el patrón Strangler Fig migrando funcionalidad ruta por ruta con comparación de respuestas en paralelo (dark launching).",
    geekosMoral:
      "Nunca juzgues el código heredado sin entender el contexto de supervivencia bajo el que fue escrito. Respetar a quien estuvo antes es la base del buen software.",
    keyTakeaways: [
      "La reescritura desde cero casi siempre fracasa; la estrangulación modular triunfa.",
      "El código legacy es la prueba de que el negocio sobrevivió lo suficiente para tener problemas de escala.",
      "Involucra a los autores originales como aliados, no como adversarios del progreso.",
    ],
  },
  {
    id: "full-moon-bug",
    title: "El Bug que solo Ocurría los Días 31 (y en el Timezone del Cliente)",
    tagline: "Por qué las fechas y zonas horarias son la pesadilla de cualquier desarrollador.",
    category: "devops",
    projectType: "Motor de Facturación y Suscripciones Recurrentes",
    stack: ["Temporal API", "Cron", "PostgreSQL", "UTC Handling"],
    date: "2024-05-18",
    readTime: "3 min de lectura",
    techChallenge:
      "A finales de enero y marzo, los clientes de Australia recibían cobros dobles o facturas con fecha del mes equivocado. En local todo pasaba verde en los tests porque todos los desarrolladores teníamos las máquinas en GMT-5.",
    codeSnippet: `// ❌ El peligro de operar con meses ingenuos
const nextMonth = new Date("2024-01-31");
nextMonth.setMonth(nextMonth.getMonth() + 1); 
// Resultado en JS: ¡2 de Marzo! Porque Febrero no tiene 31 días.
console.log(nextMonth.toISOString()); // 2024-03-02T...`,
    humanDilemma:
      "El equipo de soporte al cliente estaba agotado de recibir quejas enfurecidas. Sentían que 'los programadores viven en una torre de marfil y no entienden el impacto en los clientes reales'. La empatía entre soporte e ingeniería estaba completamente rota.",
    resolution:
      "Normalizamos todo el flujo con UTC estricto en la capa de persistencia y creamos una regla de facturación basada en períodos fijos en vez de manipulación directa de fechas. Además, implementamos una rotación semanal donde los programadores respondían tickets reales de soporte para ponerse en los zapatos del usuario.",
    geekosMoral:
      "Si crees que programar es solo hablar con máquinas, te estás perdiendo la mitad del ecosistema: programamos para humanos con vidas, tiempos y emociones reales.",
    keyTakeaways: [
      "Nunca manipules fechas con aritmética directa de meses; usa bibliotecas de tiempo probadas y almacena en UTC.",
      "El mejor antídoto para el desapego técnico es hacer que los ingenieros escuchen a los clientes reales.",
      "Soporte e ingeniería deben ser un solo organismo simbiótico.",
    ],
  },
  {
    id: "pr-wars",
    title: "La Gran Guerra de Pull Requests: Ego vs Estándares",
    tagline: "Cómo una discusión de 180 comentarios sobre nombres de variables casi dinamita un equipo.",
    category: "relaciones-humanas",
    projectType: "Plataforma SaaS Multi-inquilino",
    stack: ["ESLint", "Prettier", "Git Hooks", "Conventional Commits"],
    date: "2025-01-14",
    readTime: "4 min de lectura",
    techChallenge:
      "El equipo no tenía formateadores automáticos estrictos en CI. Un pull request crítico de dos semanas de trabajo se convirtió en un campo de batalla con 187 comentarios pedantes sobre indentación, nombres de variables y estilos personales de tipado.",
    codeSnippet: `// Configuración que salvó al equipo de la autodestrucción
// .husky/pre-commit
npx lint-staged

// "Si una máquina puede juzgarlo, jamás permitas que un humano discuta sobre ello en un PR"
// - Principio de Automatización Estética de GeekOS`,
    humanDilemma:
      "Los desarrolladores senior estaban usando los Code Reviews no para enseñar ni para cazar vulnerabilidades reales, sino como demostración de jerarquía y superioridad técnica. Los juniors tenían miedo de subir código.",
    resolution:
      "Delegamos el 100% del estilo a Prettier, ESLint y lint-staged en pre-commit: lo que la máquina valida no se discute. Y establecimos la regla del 'Elogio Proporcional': por cada observación crítica en un PR, debes señalar al menos una solución ingeniosa que tu compañero haya hecho bien.",
    geekosMoral:
      "El código limpio no se logra humillando a tu colega con un comentario sarcástico en GitHub; se logra automatizando el estilo y protegiendo la autoestima de tu equipo.",
    keyTakeaways: [
      "Automatiza toda discusión de formato en el pipeline de CI/CD.",
      "El objetivo de un Code Review es compartir conocimiento y mejorar el producto, jamás medir egos.",
      "Comenta preguntas en lugar de órdenes ('¿Qué te parece si...?' en vez de 'Cambia esto porque está mal').",
    ],
  },
  {
    id: "impostor-syndrome",
    title: "El Síndrome del Impostor y la Nube de Fuego",
    tagline: "Cuando me dieron la responsabilidad de diseñar el cluster principal y temblaron mis escamas.",
    category: "cultura",
    projectType: "Infraestructura Cloud Kubernetes & Terraform",
    stack: ["Kubernetes", "Terraform", "ArgoCD", "Observability"],
    date: "2024-09-05",
    readTime: "5 min de lectura",
    techChallenge:
      "Migrar 40 servicios de servidores virtuales estáticos a un cluster elástico de Kubernetes con alta disponibilidad multirregión, minimizando el downtime a cero segundos durante el corte de DNS.",
    codeSnippet: `// Declaración de resiliencia: PodDisruptionBudget
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: geekos-core-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: core-api`,
    humanDilemma:
      "Parálisis por análisis. Sentía que en cualquier momento alguien se daría cuenta de que no me sabía todos los comandos de `kubectl` de memoria y que era un fraude. Pasaba noches enteras sobre-diseñando capas redundantes por miedo a fallar.",
    resolution:
      "Decidí dar una charla interna al equipo admitiendo abiertamente: 'No sé cómo resolver este punto de red; necesito su perspectiva'. Para mi sorpresa, los ingenieros más experimentados dijeron: 'Nosotros tampoco tenemos certeza absoluta, investiguémoslo juntos'. La vulnerabilidad compartida desbloqueó el proyecto.",
    geekosMoral:
      "Nadie nació con el kernel de Linux grabado en el ADN. El verdadero senior no es el que tiene todas las respuestas, sino el que sabe formular las preguntas sin vergüenza.",
    keyTakeaways: [
      "El síndrome del impostor ataca más a quienes más se preocupan por la calidad de su trabajo.",
      "La documentación y los diagramas claros reducen la ansiedad colectiva.",
      "Admitir 'no lo sé, pero lo descubriremos' construye más liderazgo que fingir omnisciencia.",
    ],
  },
];
