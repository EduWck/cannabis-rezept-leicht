import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CheckCircle, Clock, Leaf, MessageCircle, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { CreateTestData } from "@/components/CreateTestData";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-cannabis-green-50 py-20 dark:bg-cannabis-green-950">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              Medizinisches Cannabis <br />
              <span className="text-cannabis-green-600 dark:text-cannabis-green-400">einfach & sicher</span>
            </h1>
            <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
              Erhalten Sie Ihr Rezept für medizinisches Cannabis bequem von zu Hause aus.
              Unsere Ärzte beraten Sie online und stellen bei Bedarf ein Rezept aus.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/fragebogen">
                <Button size="lg" className="w-full sm:w-auto">
                  Fragebogen starten <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/uber-uns">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Mehr erfahren
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative mx-auto max-w-[500px]">
            <AspectRatio ratio={4/3} className="overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800">
              <img
                src="/images/doctor-consultation.jpg"
                alt="Online-Beratung mit einem Arzt"
                className="h-full w-full object-cover"
              />
            </AspectRatio>
            <div className="absolute -bottom-4 -left-4 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-cannabis-green-500" />
                <div>
                  <p className="font-medium">Über 10.000</p>
                  <p className="text-sm text-muted-foreground">zufriedene Patienten</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const OptionsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">Wie möchten Sie beraten werden?</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Wählen Sie zwischen einer Online-Beratung oder einem persönlichen Termin in einer unserer Praxen.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img
                src="/images/online-consultation.jpg"
                alt="Online-Beratung"
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="mb-2 text-2xl font-bold">Online-Beratung</h3>
              <p className="mb-6 text-muted-foreground">
                Sprechen Sie bequem von zu Hause aus mit einem unserer Ärzte über Video-Chat.
                Flexibel und zeitsparend.
              </p>
              <Link to="/fragebogen">
                <Button>
                  Online-Termin vereinbaren <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img
                src="/images/clinic-visit.jpg"
                alt="Praxisbesuch"
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="mb-2 text-2xl font-bold">Praxisbesuch</h3>
              <p className="mb-6 text-muted-foreground">
                Besuchen Sie eine unserer Partnerpraxen für eine persönliche Beratung
                und Untersuchung vor Ort.
              </p>
              <Link to="/vor-ort">
                <Button>
                  Praxis finden <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  return (
    <section className="bg-cannabis-green-50 py-16 dark:bg-cannabis-green-950">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">So einfach geht's</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            In nur wenigen Schritten zu Ihrem medizinischen Cannabis-Rezept
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: 1,
              title: "Fragebogen ausfüllen",
              description: "Beantworten Sie einige Fragen zu Ihren Symptomen und Ihrer Krankengeschichte.",
              icon: <MessageCircle className="h-10 w-10 text-cannabis-green-500" />,
            },
            {
              step: 2,
              title: "Arztgespräch",
              description: "Sprechen Sie mit einem unserer spezialisierten Ärzte über Ihre Beschwerden.",
              icon: <Clock className="h-10 w-10 text-cannabis-green-500" />,
            },
            {
              step: 3,
              title: "Rezept erhalten",
              description: "Bei medizinischer Indikation stellt Ihnen der Arzt ein Rezept aus.",
              icon: <CheckCircle className="h-10 w-10 text-cannabis-green-500" />,
            },
            {
              step: 4,
              title: "Medikament erhalten",
              description: "Wir senden Ihnen Ihr Medikament diskret nach Hause oder zu einer Apotheke Ihrer Wahl.",
              icon: <Leaf className="h-10 w-10 text-cannabis-green-500" />,
            },
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm dark:bg-gray-800">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cannabis-green-100 dark:bg-cannabis-green-900">
                  {item.icon}
                </div>
                <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-cannabis-green-500 text-sm font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
              {index < 3 && (
                <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 transform lg:block">
                  <ArrowRight className="h-6 w-6 text-cannabis-green-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/fragebogen">
            <Button size="lg">
              Jetzt starten <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const BenefitsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">Ihre Vorteile</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Warum immer mehr Patienten unseren Service nutzen
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Bequem von zu Hause",
              description: "Keine Anfahrt, keine Wartezeiten. Erhalten Sie Ihre Beratung bequem von zu Hause aus.",
              icon: <MessageCircle className="h-10 w-10 text-cannabis-green-500" />,
            },
            {
              title: "Diskrete Behandlung",
              description: "Wir legen größten Wert auf Ihre Privatsphäre und behandeln alle Daten streng vertraulich.",
              icon: <ShieldCheck className="h-10 w-10 text-cannabis-green-500" />,
            },
            {
              title: "Erfahrene Fachärzte",
              description: "Unsere Ärzte sind spezialisiert auf die Behandlung mit medizinischem Cannabis.",
              icon: <CheckCircle className="h-10 w-10 text-cannabis-green-500" />,
            },
            {
              title: "Schnelle Lieferung",
              description: "Nach Rezeptausstellung erhalten Sie Ihr Medikament innerhalb weniger Tage.",
              icon: <Clock className="h-10 w-10 text-cannabis-green-500" />,
            },
            {
              title: "Kontinuierliche Betreuung",
              description: "Wir begleiten Sie während der gesamten Behandlung und passen diese bei Bedarf an.",
              icon: <MessageCircle className="h-10 w-10 text-cannabis-green-500" />,
            },
            {
              title: "Qualitätsgeprüfte Produkte",
              description: "Wir arbeiten nur mit zertifizierten Herstellern und Apotheken zusammen.",
              icon: <Leaf className="h-10 w-10 text-cannabis-green-500" />,
            },
          ].map((item, index) => (
            <div key={index} className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cannabis-green-100 dark:bg-cannabis-green-900">
                {item.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TrustSection = () => {
  return (
    <section className="bg-cannabis-green-50 py-16 dark:bg-cannabis-green-950">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">Vertrauen Sie den Experten</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Unsere Patienten berichten von ihren Erfahrungen
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              quote: "Nach jahrelangen Schmerzen hat mir medizinisches Cannabis endlich geholfen. Der gesamte Prozess war unkompliziert und professionell.",
              author: "Maria K.",
              condition: "Chronische Schmerzen",
            },
            {
              quote: "Die Online-Beratung war sehr angenehm und informativ. Mein Arzt hat sich viel Zeit genommen, um alle meine Fragen zu beantworten.",
              author: "Thomas M.",
              condition: "Schlafstörungen",
            },
            {
              quote: "Endlich kann ich wieder besser schlafen und meine Angststörung hat sich deutlich verbessert. Vielen Dank für die hervorragende Betreuung!",
              author: "Sarah L.",
              condition: "Angststörung",
            },
          ].map((item, index) => (
            <Card key={index} className="relative overflow-visible">
              <CardContent className="p-6 pt-10">
                <div className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-cannabis-green-500 text-2xl font-bold text-white">
                  "
                </div>
                <p className="mb-6 italic text-muted-foreground">{item.quote}</p>
                <div>
                  <p className="font-bold">{item.author}</p>
                  <p className="text-sm text-muted-foreground">{item.condition}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">Häufig gestellte Fragen</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Antworten auf die wichtigsten Fragen rund um medizinisches Cannabis
          </p>
        </div>

        <div className="mx-auto max-w-[800px]">
          <Tabs defaultValue="allgemein" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-3">
              <TabsTrigger value="allgemein">Allgemein</TabsTrigger>
              <TabsTrigger value="behandlung">Behandlung</TabsTrigger>
              <TabsTrigger value="rezept">Rezept & Bestellung</TabsTrigger>
            </TabsList>
            <TabsContent value="allgemein" className="space-y-4">
              {[
                {
                  question: "Was ist medizinisches Cannabis?",
                  answer: "Medizinisches Cannabis bezeichnet Arzneimittel, die aus der Cannabispflanze gewonnen werden oder synthetisch hergestellte Cannabinoide enthalten. Diese werden zur Behandlung verschiedener Erkrankungen eingesetzt, wenn herkömmliche Therapien nicht ausreichend wirken.",
                },
                {
                  question: "Ist medizinisches Cannabis legal?",
                  answer: "Ja, seit März 2017 ist medizinisches Cannabis in Deutschland legal und kann von Ärzten verschrieben werden. Es handelt sich um ein verschreibungspflichtiges Medikament.",
                },
                {
                  question: "Wer kann medizinisches Cannabis erhalten?",
                  answer: "Patienten mit schwerwiegenden Erkrankungen können medizinisches Cannabis erhalten, wenn andere Therapien nicht wirksam sind oder zu starke Nebenwirkungen verursachen. Die Entscheidung trifft der behandelnde Arzt nach einer gründlichen Untersuchung.",
                },
              ].map((item, index) => (
                <div key={index} className="rounded-lg border p-6">
                  <h3 className="mb-2 text-lg font-bold">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="behandlung" className="space-y-4">
              {[
                {
                  question: "Bei welchen Erkrankungen kann medizinisches Cannabis helfen?",
                  answer: "Medizinisches Cannabis kann bei verschiedenen Erkrankungen eingesetzt werden, darunter chronische Schmerzen, Multiple Sklerose, Epilepsie, Übelkeit und Erbrechen nach Chemotherapie, Appetitlosigkeit bei HIV/AIDS, Tourette-Syndrom, ADHS und bestimmte Formen von Angststörungen und Depressionen.",
                },
                {
                  question: "Wie wird medizinisches Cannabis eingenommen?",
                  answer: "Es gibt verschiedene Darreichungsformen: getrocknete Blüten zur Inhalation (mittels Verdampfer), Extrakte zum Einnehmen, Mundsprays oder Kapseln. Die geeignete Form wird vom Arzt individuell festgelegt.",
                },
                {
                  question: "Hat medizinisches Cannabis Nebenwirkungen?",
                  answer: "Wie alle Medikamente kann auch medizinisches Cannabis Nebenwirkungen haben. Dazu gehören Müdigkeit, Schwindel, Mundtrockenheit, Herzrasen oder Stimmungsschwankungen. Diese sind in der Regel mild und verschwinden bei Dosisanpassung oder Absetzen des Medikaments.",
                },
              ].map((item, index) => (
                <div key={index} className="rounded-lg border p-6">
                  <h3 className="mb-2 text-lg font-bold">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="rezept" className="space-y-4">
              {[
                {
                  question: "Wie erhalte ich ein Rezept für medizinisches Cannabis?",
                  answer: "Über unseren Service können Sie einen spezialisierten Arzt konsultieren, der Ihre medizinische Situation beurteilt. Bei entsprechender Indikation kann er ein Rezept ausstellen. Der Prozess beginnt mit unserem Online-Fragebogen.",
                },
                {
                  question: "Übernimmt die Krankenkasse die Kosten?",
                  answer: "Gesetzliche Krankenkassen können die Kosten für medizinisches Cannabis übernehmen, wenn ein entsprechender Antrag gestellt wird. Die Genehmigung erfolgt im Einzelfall. Private Krankenkassen haben unterschiedliche Regelungen. Wir beraten Sie gerne zu diesem Thema.",
                },
                {
                  question: "Wie läuft die Lieferung ab?",
                  answer: "Nach Rezeptausstellung können Sie Ihr Medikament entweder in einer Apotheke Ihrer Wahl abholen oder sich diskret nach Hause liefern lassen. Die Lieferung erfolgt in neutraler Verpackung und in der Regel innerhalb von 1-3 Werktagen.",
                },
              ].map((item, index) => (
                <div key={index} className="rounded-lg border p-6">
                  <h3 className="mb-2 text-lg font-bold">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">
            Haben Sie weitere Fragen? Kontaktieren Sie uns!
          </p>
          <Link to="/kontakt">
            <Button variant="outline" size="lg">
              Kontakt aufnehmen
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div>
      <Hero />
      <OptionsSection />
      <ProcessSection />
      <BenefitsSection />
      <TrustSection />
      <FAQSection />

      {/* Add test data section at the bottom, only visible in dev mode */}
      {import.meta.env.DEV && (
        <section className="py-16 border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Entwickler-Tools</h2>
            <CreateTestData />
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
