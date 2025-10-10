import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(
    request: Request,
    { params }: { params: { moduleId: string } }
) {
    const moduleId = params.moduleId;

    // Busca os dados do módulo específico no Supabase.
    // Em um cenário real, você buscaria também os exemplos e exercícios relacionados.
    const { data, error } = await supabase
        .from('modules')
        .select('*')
        .eq('id', moduleId)
        .single(); // .single() retorna um único objeto em vez de um array

    if (error) {
        console.error("Erro ao buscar módulo no Supabase:", error);
        return new NextResponse("Módulo não encontrado", { status: 404 });
    }

    if (data) {
        return NextResponse.json(data);
    }

    return new NextResponse("Módulo não encontrado", { status: 404 });
}