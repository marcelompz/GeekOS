import { DilemmaScenario } from "../types";

export const DILEMMAS_DATA: DilemmaScenario[] = [
  {
    id: "friday-deploy",
    title: "El Hotfix de Viernes a las 6:45 PM",
    situation:
      "Un cliente VIP reporta un bug visual molesto en la pasarela de pagos. Tu Product Manager te pide un despliegue directo a producción a 15 minutos de terminar tu jornada laboral un viernes.",
    techStakes:
      "Riesgo de introducir una regresión no testeada en la pasarela de pagos que afecte las transacciones del fin de semana.",
    humanStakes:
      "Presión de negocio inmediata vs respeto al descanso y salud mental del equipo de guardia.",
    options: [
      {
        id: "opt-1",
        text: "Hacer el merge y deploy inmediatamente sin avisar a nadie para salir rápido.",
        techImpact: -8,
        humanImpact: -9,
        feedback: "¡Peligro crítico! Los despliegues de viernes tarde sin monitoreo activo son la causa #1 de desastres de fin de semana.",
        geekosWisdom: "Como buen reptil, aprendí que apresurar el paso en terreno pantanoso solo garantiza que te hundas hasta el cuello.",
      },
      {
        id: "opt-2",
        text: "Explicar el riesgo de regresión con datos, activar un feature flag o workaround temporal, y calendarizar el deploy para el lunes a primera hora con tests completos.",
        techImpact: 9,
        humanImpact: 8,
        feedback: "¡Decisión maestra! Proteges la estabilidad del sistema y estableces límites saludables con el negocio con empatía profesional.",
        geekosWisdom: "La verdadera madurez de un ingeniero no es decir 'sí a todo' por complacer, sino negociar alternativas viables que protejan al sistema y al equipo.",
      },
      {
        id: "opt-3",
        text: "Negarte en seco de mala manera y desconectar Slack sin dar explicaciones.",
        techImpact: 0,
        humanImpact: -7,
        feedback: "Evitas el bug técnico pero destruyes la confianza con el Product Manager y generas resentimiento innecesario.",
        geekosWisdom: "Tener la razón técnica no te da licencia para comunicarte con soberbia. La diplomacia técnica es una habilidad de supervivencia.",
      },
    ],
  },
  {
    id: "cowboy-coder",
    title: "El Programador Estrella que no Documenta ni Testea",
    situation:
      "En tu equipo hay un desarrollador con 5 años de antigüedad que resuelve features en tiempo récord, pero su código no tiene tests, ni comentarios, y solo él sabe cómo funciona el módulo central.",
    techStakes:
      "Deuda técnica exponencial y un 'Bus Factor' de 1. Si se enferma o renuncia, el sistema queda huérfano.",
    humanStakes:
      "Sensación de intocabilidad del compañero y frustración en el resto del equipo que teme tocar su código.",
    options: [
      {
        id: "opt-1",
        text: "Confrontarlo públicamente en la Daily Standup para ponerlo en evidencia.",
        techImpact: -2,
        humanImpact: -9,
        feedback: "Atacar en público activa mecanismos de defensa biológicos: el compañero se cerrará por completo y polarizarás al equipo.",
        geekosWisdom: "Cuando un gecko se siente amenazado, infla la garganta o huye. Los humanos hacen lo mismo cuando los humillas en público.",
      },
      {
        id: "opt-2",
        text: "Proponer en la retrospectiva la regla de 'Pair Programming rotativo' y 'Definición de Terminado' (DoD) que obligue a que ningún PR se apruebe sin tests y documentación.",
        techImpact: 9,
        humanImpact: 9,
        feedback: "¡Excelente! Conviertes un problema interpersonal en un acuerdo de proceso neutral y objetivo.",
        geekosWisdom: "No ataques a la persona; ataca al proceso. Cuando el estándar es institucional y automático, el ego sale de la ecuación.",
      },
      {
        id: "opt-3",
        text: "Ignorar el problema y asumir que 'él siempre lo resolverá si algo falla'.",
        techImpact: -8,
        humanImpact: -5,
        feedback: "Una bomba de tiempo. Tarde o temprano ese módulo colapsará y nadie sabrá cómo revivirlo.",
        geekosWisdom: "La complacencia es el óxido silencioso de las arquitecturas de software.",
      },
    ],
  },
  {
    id: "impostor-junior",
    title: "La Pregunta 'Tonta' en la Reunión de Arquitectura",
    situation:
      "Un compañero recién incorporado al equipo lleva dos semanas sin entregar su tarea porque le da pánico preguntar cómo configurar el entorno local o admitir que no entendió el flujo de autenticación.",
    techStakes:
      "Bloqueo en el sprint y retraso en las dependencias del proyecto.",
    humanStakes:
      "Aislamiento, síndrome del impostor agudo y riesgo de abandono del talento junior.",
    options: [
      {
        id: "opt-1",
        text: "Escribirle en privado con calidez: 'Recuerdo cuando yo empecé; este entorno es un laberinto. ¿Hacemos una llamada de 20 min y lo destrabamos juntos?'.",
        techImpact: 8,
        humanImpact: 10,
        feedback: "¡Liderazgo empático de oro puro! Desarmas el miedo y construyes lealtad y confianza duradera en el equipo.",
        geekosWisdom: "Unos minutos de mentoría desinteresada pueden transformar a un junior asustado en el próximo pilar de la empresa.",
      },
      {
        id: "opt-2",
        text: "Quejarte con el Tech Lead para que lo asignen a otro equipo o le llamen la atención.",
        techImpact: -4,
        humanImpact: -9,
        feedback: "Destruye la seguridad psicológica del equipo y fomenta una cultura donde nadie se atreve a admitir dudas.",
        geekosWisdom: "Si castigas la duda, premias la simulación y la ignorancia oculta. Y eso en producción cuesta millones.",
      },
      {
        id: "opt-3",
        text: "Pasarle un enlace genérico a la documentación de 200 páginas sin más comentarios.",
        techImpact: 2,
        humanImpact: -3,
        feedback: "Poco efectivo si la documentación está desactualizada o si el problema de fondo es la inseguridad.",
        geekosWisdom: "Un manual frío no reemplaza el calor de una mano amiga que te guíe entre los logs.",
      },
    ],
  },
];
