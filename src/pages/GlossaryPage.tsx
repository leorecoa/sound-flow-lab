import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

const glossaryTerms = [
    {
        term: "Connected Speech",
        definition: "Refere-se a como os sons das palavras se ligam uns aos outros na fala natural e fluida, fazendo com que soem diferentes de quando são pronunciadas isoladamente.",
    },
    {
        term: "Linking (Catenation)",
        definition: "É a conexão de uma consoante final de uma palavra com a vogal inicial da palavra seguinte. Exemplo: 'an apple' soa como 'anapple'.",
    },
    {
        term: "Intrusion",
        definition: "A adição de um som extra (/j/, /w/, ou /r/) entre duas vogais para facilitar a transição. Exemplo: 'I am' pode soar como 'I-y-am'.",
    },
    {
        term: "Elision",
        definition: "A omissão de um ou mais sons (vogal, consoante ou sílaba inteira) em uma palavra ou frase para tornar a pronúncia mais fácil e rápida. Exemplo: 'camera' soa como 'camra'.",
    },
    {
        term: "Assimilation",
        definition: "Ocorre quando um som muda para se tornar mais semelhante a um som vizinho. Exemplo: 'handbag' pode soar como 'hambag'.",
    },
];

const GlossaryPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTerms = glossaryTerms.filter(item =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

            {filteredTerms.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                    {filteredTerms.map((item) => (
                        <AccordionItem value={item.term} key={item.term}>
                            <AccordionTrigger className="text-lg text-left">{item.term}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">{item.definition}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : (
                <p className="text-center text-muted-foreground">Nenhum termo encontrado para "{searchTerm}".</p>
            )}
        </div>
    );
};

export default GlossaryPage;