# 🦎 GeekOS — Bitácora Técnica, Arquitectura & Relaciones Humanas

[![YouTube Channel](https://img.shields.io/badge/YouTube-Canal%20Oficial-red?style=for-the-badge&logo=youtube)](https://www.youtube.com/channel/UCmg-XBeAnWkgYMo4UvrRxdg)
[![Linux & Open Source](https://img.shields.io/badge/OS-Debian%20%7C%20Linux-orange?style=for-the-badge&logo=linux)](https://www.debian.org)
[![ERP & Architecture](https://img.shields.io/badge/Stack-OmniFlow%20%7C%20Odoo-purple?style=for-the-badge)](https://www.odoo.com)
[![Google Drive Workspace](https://img.shields.io/badge/Integration-Google%20Drive-blue?style=for-the-badge&logo=googledrive)](https://workspace.google.com)

> *"El código más rápido y con menos bugs es el que no tienes que escribir. Y en las relaciones de equipo, una conversación empática de diez minutos ahorra tres semanas de resentimiento en pull requests."*  
> — **GeekOS**

---

## 📖 ¿Qué es GeekOS?

**GeekOS** es la mascota cyber-científica y el alter ego reflexivo del canal de YouTube [Geek Os](https://www.youtube.com/channel/UCmg-XBeAnWkgYMo4UvrRxdg). Representa la voz de la trinchera real en ingeniería de software y arquitectura de sistemas: un espacio de divulgación y *build in public* que combina dos dimensiones inseparables:

1. **El Sistema Operativo Técnico**:
   - **Linux & Distros a Medida**: Compilación de kernels, scripts bash, administración de permisos y optimización para hardware acotado (SBCs, terminales delgados, IoTBox y puntos de venta).
   - **Arquitectura Desacoplada (OmniFlow & OmniLedger)**: De un acelerador online hasta una plataforma de integración asincrónica para convivir con ERPs preexistentes y sistemas legacy.
   - **Odoo ERP & Open Source Empresarial**: Casos de consultoría, modelos transaccionales y despliegues productivos.

2. **El Sistema Operativo Humano**:
   - **La Escuela Dura sin Tutoriales**: Aprender desarrollo en Linux cuando las universidades solo enseñaban en entornos cerrados y no existía YouTube.
   - **Emprendimiento & Choque Cultural**: La fundación de **Crossnexion** desde una cancha de básquetbol, integrando la mentalidad de procesos corporativos de Microsoft con la libertad radical del software libre.
   - **Criterio & Honestidad en Producción**: El valor de frenar a tiempo y cancelar una demo (el caso Omnigastro) para reescribir un monolito modular unificado en lugar de vender humo con micro-bases de datos colapsadas.
   - **Cultura Blameless**: Cómo resolver desastres a las 3 AM sin buscar culpables y eliminar la arrogancia en las revisiones de código.

---

## 🚀 Funcionalidades de la Aplicación

### 1. 📚 Bitácora de Anécdotas Técnicas & Humanas
Un catálogo exhaustivo de historias de producción que incluye:
- **El Desafío Técnico**: Explicación en profundidad del bug, cuello de botella o decisión arquitectónica.
- **Snippet de Código / Arquitectura**: Ejemplos en TypeScript, Python/Odoo, SQL o scripts Bash.
- **El Dilema Humano**: El impacto en el equipo, la comunicación con el cliente o el síndrome del impostor.
- **La Resolución Real**: Lecciones aplicadas en entornos vivos de software.
- **La Máxima de GeekOS**: Frases memorables para aplicar en el día a día.

### 2. 🎭 Expresiones Dinámicas de la Mascota
El avatar vectorial interactivo de GeekOS reacciona en tiempo real según el contexto:
- 💻 **Programando (`coding`)**: Consola holográfica flotante de Debian compilando en terminal, garras mecanográficas y HUD cian.
- 🧠 **Reflexionando (`thinking`)**: Postura reflexiva con engranes de arquitectura analizando compensaciones técnicas.
- 🎉 **Deploy Exitoso (`happy`)**: Expresión alegre, sonrisa abierta, destellos dorados y pulgar robótico arriba al pasar los tests.
- 🐞 **Cazando Bugs (`debugging`)**: Radar con retícula roja rastreando deadlocks y condiciones de carrera.

### 3. 🎮 Simulador de Dilemas (Código vs. Dinámicas de Equipo)
Un juego táctico interactivo con escenarios reales donde cada decisión afecta dos métricas críticas:
- **Salud Técnica del Sistema**: Estabilidad, deuda técnica, rendimiento y mantenibilidad.
- **Confianza & Empatía del Equipo**: Seguridad psicológica, moral, retención y cultura blameless.

### 4. 🤖 Terminal Interactiva con IA (GeekOS Bot)
- Conectada al modelo **Gemini 2.5 Flash** a través de endpoints seguros en el backend Express (`/api/geekos/chat`).
- Asistente con la personalidad, el humor reflexivo y el rigor de GeekOS.
- Generador de bitácoras a medida (`/api/geekos/anecdote`) sobre cualquier tecnología o conflicto de equipo.

### 5. ☁️ Integración Oficial con Google Drive (Workspace)
- Autenticación con Google conforme a los lineamientos oficiales.
- Explorador de archivos de Drive integrado.
- Exportación directa de cualquier bitácora, anécdota o sesión de chat en formato Markdown (`.md`).
- Diálogos de confirmación explícita antes de cualquier operación de escritura o borrado para garantizar la seguridad de los datos.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Motion |
| **Backend** | Express (Node.js con `tsx` y empaquetado `esbuild`), Vite Middleware |
| **Modelos de IA** | Google GenAI SDK (`@google/genai`), Gemini 2.5 Flash |
| **Autenticación** | Firebase Auth (Google Sign-In Popup con scopes de Google Drive) |
| **Almacenamiento Cloud**| Google Drive REST API v3 (Multipart Upload, List, Delete) |
| **Iconografía** | Lucide React |

---

## 📦 Instalación y Puesta en Marcha

### Prerrequisitos
- Node.js 20+ o 22+
- npm o pnpm

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd geekos-app
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Copia el archivo de ejemplo y completa tus credenciales:
   ```bash
   cp .env.example .env
   ```
   *Variables clave:*
   - `GEMINI_API_KEY`: Clave de API de Google Gemini (manejada exclusivamente en el backend).

4. **Iniciar en modo desarrollo:**
   ```bash
   npm run dev
   ```
   El servidor estará disponible en `http://localhost:3000`.

5. **Compilación para producción:**
   ```bash
   npm run build
   npm start
   ```

---

## 📁 Estructura del Proyecto

```text
├── .env.example                 # Declaración de variables de entorno
├── index.html                   # Entrada principal con metaetiquetas de GeekOS
├── metadata.json                # Metadatos de la aplicación
├── package.json                 # Dependencias y scripts de compilación
├── server.ts                    # Backend Express + Proxy Gemini + Vite Middleware
├── src/
│   ├── main.tsx                 # Entrada de React
│   ├── App.tsx                  # Componente principal y gestión de pestañas
│   ├── types.ts                 # Definiciones de TypeScript (Anecdote, Dilemmas, Drive)
│   ├── index.css                # Estilos globales con Tailwind CSS
│   ├── data/
│   │   ├── anecdotesData.ts     # Historias de origen, Crossnexion, Omnigastro y producción
│   │   └── dilemmasData.ts      # Escenarios del simulador de decisiones
│   ├── services/
│   │   ├── firebaseAuth.ts      # Autenticación con Google y manejo seguro de tokens
│   │   └── driveService.ts      # Llamadas a la API de Google Drive
│   └── components/
│       ├── GeekOSAvatar.tsx     # Avatar vectorial con expresiones dinámicas
│       ├── HeroGeekOS.tsx       # Cabecera con selector de expresiones y citas
│       ├── AnecdotesList.tsx    # Listado, búsqueda y lector de bitácoras
│       ├── GeekOSTerminal.tsx   # Chat conversacional con IA
│       ├── DilemmaSimulator.tsx # Simulador de dilemas técnicos y humanos
│       ├── DriveBrowser.tsx     # Explorador de archivos en Google Drive
│       ├── ExportConfirmModal.tsx # Cuadro de diálogo de confirmación explícita
│       └── Navbar.tsx           # Navegación y enlace al canal de YouTube
└── tsconfig.json                # Configuración de TypeScript
```

---

## 🦎 La Filosofía GeekOS

1. **La Terminal no Miente**: Abstraerse demasiado de los fundamentos hace que los problemas simples parezcan magia negra. Conoce tu sistema operativo.
2. **Arquitectura con Criterio de Trinchera**: No adoptes modas de microservicios o tecnologías complejas si un monolito modular resuelve el problema con mayor elegancia y menor costo.
3. **El Software lo Hacen Personas**: Las máquinas hacen exactamente lo que les ordenamos; los mayores fallos ocurren en los canales de comunicación, los egos y la falta de empatía entre equipos.
4. **Cultura Sin Culpas (*Blameless*)**: Si un junior tira producción con un commit, el fallo es del proceso, de las pruebas y del sistema de despliegue, nunca de la persona.

---

## 📺 Conéctate con la Comunidad

- 🎥 **Canal de YouTube**: [https://www.youtube.com/channel/UCmg-XBeAnWkgYMo4UvrRxdg](https://www.youtube.com/channel/UCmg-XBeAnWkgYMo4UvrRxdg)
- 💼 **Crossnexion**: Soluciones empresariales y consultoría Odoo.
- 💻 **Proyecto OmniFlow**: Ecosistema modular desacoplado para hardware acotado y ERPs.

---

*Desarrollado con dedicación para la comunidad de desarrolladores, arquitectos de software y entusiastas de Linux.*
