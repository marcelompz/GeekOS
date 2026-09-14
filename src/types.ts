export interface Anecdote {
  id: string;
  title: string;
  tagline: string;
  category: "backend" | "devops" | "arquitectura" | "cultura" | "relaciones-humanas";
  projectType: string;
  stack: string[];
  techChallenge: string;
  codeSnippet?: string;
  humanDilemma: string;
  resolution: string;
  geekosMoral: string;
  keyTakeaways: string[];
  date: string;
  readTime: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "geekos";
  content: string;
  timestamp: string;
  isSavedToDrive?: boolean;
}

export interface DilemmaScenario {
  id: string;
  title: string;
  situation: string;
  techStakes: string;
  humanStakes: string;
  options: {
    id: string;
    text: string;
    techImpact: number; // -10 to +10
    humanImpact: number; // -10 to +10
    feedback: string;
    geekosWisdom: string;
  }[];
}

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  size?: string;
  webViewLink?: string;
  iconLink?: string;
}
