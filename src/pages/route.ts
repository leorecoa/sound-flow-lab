import { NextResponse } from "next/server";
import { Link2, MessageSquare, Zap, Volume2 } from "lucide-react";

// Seus dados estáticos, que no futuro virão de um banco de dados.
const moduleData = {
    "1": {
        title: "Consoante + Vogal",
        description: "Quando uma palavra termina com consoante e a seguinte começa com vogal, a consoante 'pula' para a próxima palavra, criando um som contínuo.",
        examples: [
            { formalPhrase: "It is an apple", connectedPhrase: "IT_IS_AN_APPLE", translation: "É uma maçã", context: "Conversa casual", audioUrl: "/audio/it-is-an-apple.mp3" },
            { formalPhrase: "Turn it off", connectedPhrase: "TURN_IT_OFF", translation: "Desligue isso", context: "Pedido direto", audioUrl: "/audio/turn-it-off.mp3" },
        ],
        exercises: [
            { type: 'listen_repeat', id: 'ex1', text: "Listen and repeat: 'Take it easy' → TAKE_IT_EASY" },
            { type: 'multiple_choice', id: 'ex2', question: "Qual frase demonstra a conexão correta para 'What are you doing?'", options: ["What are you doing?", "Whatcha doin'?", "What you doing?", "What are doing?"], correctAnswer: "Whatcha doin'?" },
        ]
    }
};

export async function GET(
    request: Request,
    { params }: { params: { moduleId: string } }
) {
    const moduleId = params.moduleId;
    const data = moduleData[moduleId as keyof typeof moduleData];

    // Simula um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 500));

    if (data) {
        return NextResponse.json(data);
    }

    return new NextResponse("Módulo não encontrado", { status: 404 });
}