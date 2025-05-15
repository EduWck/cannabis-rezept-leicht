
import { useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const FAQ = () => {
  useEffect(() => {
    document.title = 'FAQ - MediCannabis';
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Häufig gestellte Fragen</h1>
        
        <Card className="max-w-4xl mx-auto mb-8">
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">
                  Ist medizinisches Cannabis in Deutschland legal?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Ja, seit März 2017 ist medizinisches Cannabis in Deutschland legal. Patienten können es auf Rezept in der Apotheke erhalten, wenn eine entsprechende medizinische Indikation vorliegt und eine Behandlung mit herkömmlichen Medikamenten nicht ausreichend wirksam ist oder zu starke Nebenwirkungen verursacht.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium">
                  Bei welchen Erkrankungen kann medizinisches Cannabis helfen?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Medizinisches Cannabis kann bei verschiedenen Erkrankungen eingesetzt werden, darunter chronische Schmerzen, Multiple Sklerose, Epilepsie, Tourette-Syndrom, ADHS, Schlafstörungen, Appetitlosigkeit bei HIV/AIDS oder Krebserkrankungen, chronisch-entzündliche Darmerkrankungen, Angststörungen und Depression. Die Wirksamkeit ist jedoch individuell und muss ärztlich beurteilt werden.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium">
                  Wie bekomme ich ein Rezept für medizinisches Cannabis?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Um ein Rezept für medizinisches Cannabis zu erhalten, benötigen Sie eine ärztliche Verschreibung. Auf unserer Plattform bieten wir drei verschiedene Wege an: Einen digitalen Fragebogen mit schneller Bearbeitung, eine Video-Sprechstunde mit einem Arzt oder einen persönlichen Vor-Ort-Termin. In allen Fällen wird geprüft, ob eine medizinische Indikation vorliegt.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium">
                  Übernimmt die Krankenkasse die Kosten für medizinisches Cannabis?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Gesetzliche Krankenkassen können die Kosten für medizinisches Cannabis übernehmen, müssen dies aber nicht. Die Entscheidung wird im Einzelfall getroffen und setzt einen Antrag des behandelnden Arztes voraus. Private Krankenkassen handhaben es unterschiedlich. Bei uns bezahlen Sie zunächst die Rezeptgebühr und die Kosten für das Cannabis selbst, können aber versuchen, diese bei Ihrer Krankenkasse einzureichen.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-medium">
                  Welche Nebenwirkungen hat medizinisches Cannabis?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Mögliche Nebenwirkungen können sein: Müdigkeit, Schwindel, trockener Mund, Appetitzunahme, veränderte Wahrnehmung, Konzentrationsprobleme, Herzrasen, Blutdruckschwankungen oder psychische Effekte wie Angst oder Paranoia. Die Nebenwirkungen sind individuell unterschiedlich und hängen von der Dosierung und der persönlichen Empfindlichkeit ab.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-medium">
                  Wie wird medizinisches Cannabis eingenommen?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Es gibt verschiedene Einnahmemöglichkeiten: Cannabisblüten können inhaliert (verdampft, nicht geraucht) werden, es gibt auch Extrakte, Öle, Kapseln oder Sprays. Die geeignete Darreichungsform wird ärztlich bestimmt und hängt von der behandelten Erkrankung und den Bedürfnissen des Patienten ab.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-lg font-medium">
                  Macht medizinisches Cannabis süchtig?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Bei bestimmungsgemäßer Anwendung und ärztlicher Überwachung ist das Risiko einer Abhängigkeit gering. Dennoch kann es bei langfristiger Anwendung zu einer psychischen Abhängigkeit kommen. Die medizinische Verwendung unterscheidet sich jedoch deutlich vom Freizeitkonsum, da sie gezielt auf die Behandlung von Symptomen ausgerichtet ist und unter ärztlicher Aufsicht erfolgt.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-8">
                <AccordionTrigger className="text-lg font-medium">
                  Darf ich mit medizinischem Cannabis Auto fahren?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Grundsätzlich gilt: Wer unter dem Einfluss von Cannabis am Straßenverkehr teilnimmt, begeht eine Ordnungswidrigkeit oder sogar eine Straftat. Auch bei medizinischem Cannabis mit Rezept wird empfohlen, nicht Auto zu fahren, da die Fahrtüchtigkeit beeinträchtigt sein kann. Im Einzelfall kann es jedoch Ausnahmen geben, wenn die Fahrtüchtigkeit nachweislich nicht beeinträchtigt ist.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-9">
                <AccordionTrigger className="text-lg font-medium">
                  Wie lange ist ein Cannabis-Rezept gültig?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Ein Rezept für medizinisches Cannabis ist in der Regel 7 Tage gültig. Bei einem BtM-Rezept (Betäubungsmittelrezept) beträgt die Gültigkeit 7 Tage ab dem Tag der Ausstellung. Das Rezept kann nicht verlängert werden, sondern muss bei Bedarf neu ausgestellt werden.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-10">
                <AccordionTrigger className="text-lg font-medium">
                  Kann ich mit einem deutschen Cannabis-Rezept ins Ausland reisen?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Die Bestimmungen variieren je nach Land. Innerhalb der EU können Patienten mit einer ärztlichen Bescheinigung bis zu 30 Tage mit ihrem Medikament reisen. Für Reisen außerhalb der EU sollten Sie sich vorher über die jeweiligen Bestimmungen informieren, da medizinisches Cannabis in vielen Ländern verboten ist und der Besitz strafrechtlich verfolgt werden kann.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
