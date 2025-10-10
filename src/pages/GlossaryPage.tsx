import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { SectionHeader } from "@/components/SectionHeader";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

const fetchGlossary = async () => {
    const { data, error } = await supabase.from('glossary').select('*').order('term');
    if (error) throw new Error(error.message);
    return data;
};

const GlossaryPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: glossaryTerms = [], isLoading } = useQuery({
        queryKey: ['glossary'],
        queryFn: fetchGlossary,
    });

    // Otimização: useMemo é usado para evitar recalcular a filtragem a cada renderização.
    // A lista só será refiltrada quando 'searchTerm' mudar.
    const filteredTerms = useMemo(() => {
        if (!glossaryTerms) return [];
        return glossaryTerms.filter(item =>
            item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.definition.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm, glossaryTerms]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <SectionHeader
                title="Glossário de Pronúncia"
                subtitle="Entenda os termos técnicos por trás da sonoridade do inglês."
            />

            <div className="mb-8">
                <Input
                    type="text"
                    placeholder="Pesquisar termos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                />
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            ) : (
                filteredTerms.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                        {filteredTerms.map((item) => (
                            <AccordionItem value={item.term} key={item.id}>
                                <AccordionTrigger className="text-lg text-left">{item.term}</AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground">{item.definition}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <p className="text-center text-muted-foreground">Nenhum termo encontrado para "{searchTerm}".</p>
                )
            )}
        </div>
    );
};

export default GlossaryPage;