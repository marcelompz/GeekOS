import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily
let geminiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", mascot: "GeekOS" });
});

// Chat endpoint with GeekOS
app.post("/api/geekos/chat", async (req, res) => {
  try {
    const { messages, userMessage } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Return a rich, thoughtful fallback in character if API key is not yet set
      return res.json({
        reply: `*Ajusta sus gafas oculares cibernéticas y teclea en la terminal*\n\n¡Saludos colega! Soy GeekOS. Mi procesador neuronal en la nube está esperando que se configure GEMINI_API_KEY en los secretos del entorno, pero mientras tanto te comparto una de mis reglas de oro:\n\n> "El código más rápido y con menos bugs es el que no tienes que escribir. Y en las relaciones de equipo, una conversación empática de 10 minutos ahorra tres semanas de resentimiento en pull requests."\n\n¿Tienes alguna duda sobre arquitectura, depuración en caliente o cómo lidiar con las presiones de entrega? ¡Cuéntame!`,
      });
    }

    const systemInstruction = `Eres GeekOS, la entrañable y brillante mascota cyber-científica del canal de YouTube (https://www.youtube.com/channel/UCmg-XBeAnWkgYMo4UvrRxdg).
Eres un gecko antropomórfico cibernético vestido con bata de laboratorio de alta tecnología, exoesqueleto ligero y gafas protectoras con lentes ámbar de precisión óptica.
Trabajas rodeado de monitores con código compilando y terminales de depuración.

Tu personalidad y sabiduría:
1. Hablas en español con un tono cercano, técnico, reflexivo, con humor inteligente y cálido de desarrollador veterano pero siempre optimista.
2. Usas ocasionales toques sutiles sobre tu naturaleza reptiliana cyber-científica (ej. "mis escamas sensoriales detectan una condición de carrera", "como buen gecko de sangre fría, aprendí a mantener la calma en los incidentes de producción a las 3 AM", "ajusto mis visores ópticos").
3. Combinas siempre dos dimensiones inseparables en todo problema tecnológico:
   - El reto técnico puro: código, algoritmos, arquitectura, patrones de diseño, buenas prácticas, refactorización, depuración y resiliencia.
   - El reto humano en los sistemas modernos: comunicación de equipo, síndrome del impostor, resolución de desacuerdos sin egos, empatía hacia los usuarios y compañeros, evitar el burnout y construir culturas blameless (sin culpas).
4. Si te piden una anécdota, relátala con estructura: el contexto del proyecto, el susto o problema que surgió, la solución técnica ingeniosa y la gran lección humana aprendida.
5. Mantén respuestas concisas, bien formateadas con Markdown, listas y citas cuando sea oportuno.`;

    // Format chat history
    let promptText = "";
    if (Array.isArray(messages) && messages.length > 0) {
      promptText = messages
        .map((m: { role: string; content: string }) => `${m.role === "user" ? "Usuario" : "GeekOS"}: ${m.content}`)
        .join("\n\n");
      promptText += `\n\nUsuario: ${userMessage}\nGeekOS:`;
    } else {
      promptText = userMessage;
    }

    const response = await Promise.race([
      ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: promptText,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      }),
      new Promise<any>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 12000)
      ),
    ]);

    const reply = response.text || "Mis sensores no pudieron procesar la respuesta en este ciclo.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Error in /api/geekos/chat:", error);
    res.json({
      reply: `*Ajusta sus gafas de precisión y sonríe*\n\n¡Hola colega! Soy GeekOS. Mi procesador neural registró una breve sobrecarga temporal, pero déjame compartirte mi principio fundamental:\n\n> "El mejor refactor técnico es el que simplifica la arquitectura sin romper el espíritu de quien la diseñó primero."\n\n¿Qué reto técnico o desafío de comunicación en tu equipo estás enfrentando ahora mismo?`,
    });
  }
});

// Endpoint to generate a custom anecdote based on a tech topic or dilemma
app.post("/api/geekos/anecdote", async (req, res) => {
  try {
    const { topic, difficulty, humanFactor } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        title: `El enigma de ${topic || "Sistemas Distribuidos"}`,
        context: "Ocurrió durante el despliegue a producción de un viernes a medianoche.",
        techChallenge: "Una fuga de memoria silenciosa provocada por closures no recolectadas por el garbage collector.",
        humanDilemma: "El equipo de soporte estaba en pánico y el Product Manager exigía revertir todo de inmediato.",
        solution: "Aislamos los hilos con profiling en tiempo real, parcheamos la retención indebida y documentamos el incidente juntos.",
        geekosMoral: "La tecnología se repara con código, pero la confianza del equipo se repara con transparencia y calma.",
      });
    }

    const prompt = `Genera una anécdota fascinante de GeekOS en formato JSON sobre el tema: "${topic || "Sistemas en Producción"}".
Nivel de complejidad técnica: ${difficulty || "Medio / Senior"}.
Factor de relaciones humanas involucrado: "${humanFactor || "Manejo de expectativas y comunicación bajo presión"}".

Debes responder ÚNICAMENTE con un objeto JSON válido con estas claves:
{
  "title": "Título llamativo y profesional de la anécdota",
  "context": "Breve contexto del proyecto o startup donde ocurrió",
  "techChallenge": "Explicación del reto técnico, bug o arquitectura a superar",
  "humanDilemma": "El desafío humano o de equipo presente en la situación",
  "solution": "Cómo se resolvió combinando código limpio y empatía humana",
  "geekosMoral": "La moraleja o principio inolvidable de GeekOS"
}`;

    const response = await Promise.race([
      ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.8,
        },
      }),
      new Promise<any>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 12000)
      ),
    ]);

    try {
      const parsed = JSON.parse(response.text || "{}");
      res.json(parsed);
    } catch {
      res.json({
        title: `La prueba de fuego en ${topic || "Producción"}`,
        context: "En un proyecto de alta concurrencia.",
        techChallenge: "Optimización de latencia y gestión de estados asíncronos.",
        humanDilemma: "Evitar la búsqueda de culpables y priorizar el aprendizaje colectivo.",
        solution: "Un test de carga riguroso y una sesión abierta de post-mortem blameless.",
        geekosMoral: "Los sistemas fallan; cómo nos tratamos al arreglarlos define a un verdadero equipo de ingenieros.",
      });
    }
  } catch (error: any) {
    console.error("Error in /api/geekos/anecdote:", error);
    res.status(500).json({ error: "Error generando anécdota" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GeekOS Server running on http://localhost:${PORT}`);
  });
}

startServer();
