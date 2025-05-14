import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Steps } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CompletionStep } from "@/components/fragebogen/CompletionStep";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"
import * as z from "zod"
import { supabase } from "@/integrations/supabase/client";

const treatmentTypeOptions = [
  { value: "fragebogen", label: "Digital per Fragebogen" },
  { value: "video", label: "Per Video-Call" },
  { value: "vorort", label: "Vor Ort" },
];

const step1Schema = z.object({
  treatmentType: z.enum(["fragebogen", "video", "vorort"], {
    required_error: "Bitte wähle eine Behandlungsart aus.",
  }),
});

const step2Schema = z.object({
  symptoms: z.string().min(3, {
    message: "Bitte beschreibe deine Symptome genauer.",
  }),
  painLevel: z.enum(["mild", "moderate", "severe"], {
    required_error: "Bitte wähle dein Schmerzniveau aus.",
  }),
  previousTreatments: z.string().min(3, {
    message: "Bitte beschreibe deine bisherigen Behandlungen genauer.",
  }),
  medicalConditions: z.string().optional(),
  medicationList: z.string().optional(),
  consent: z.literal(true, {
    error: "Du musst den Bedingungen zustimmen, um fortzufahren.",
  }),
});

const Fragebogen = () => {
  const [step, setStep] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [treatmentType, setTreatmentType] = useState<string | null>(null);
  const navigate = useNavigate();

  const step1Form = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    mode: "onChange",
  });

  const step2Form = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    mode: "onChange",
  });

  const nextStep = () => {
    if (step === 1) {
      step1Form.handleSubmit((data) => {
        setTreatmentType(data.treatmentType);
        setStep(2);
        setProgress(50);
      })();
    } else if (step === 2) {
      step2Form.handleSubmit(async (data) => {
        setIsDialogOpen(true);

        // Simulate form submission
        setTimeout(() => {
          setIsDialogOpen(false);
          setStep(3);
          setProgress(100);
          // TODO: Submit data to Supabase and create user
          console.log("Submitting data:", data);
          toast({
            title: "Erfolgreich!",
            description: "Dein Fragebogen wurde erfolgreich übermittelt.",
          });
        }, 2000);
      })();
    }
  };

  const prevStep = () => {
    setStep(1);
    setProgress(0);
  };

  const submitForm = () => {
    if (step === 2) {
      step2Form.handleSubmit(async (data) => {
        setIsDialogOpen(true);

        // Simulate form submission
        setTimeout(() => {
          setIsDialogOpen(false);
          setStep(3);
          setProgress(100);
          // TODO: Submit data to Supabase and create user
          console.log("Submitting data:", data);
          toast({
            title: "Erfolgreich!",
            description: "Dein Fragebogen wurde erfolgreich übermittelt.",
          });
        }, 2000);
      })();
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
          Zurück
        </Button>
        <h1 className="text-3xl font-bold">Medizinisches Cannabis - Fragebogen</h1>
      </div>

      <Progress value={progress} className="mb-6" />

      {step === 1 && (
        <FormProvider {...step1Form}>
          <Form>
            <form onSubmit={step1Form.handleSubmit(nextStep)} className="space-y-8">
              <FormField
                control={step1Form.control}
                name="treatmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wie möchtest du behandelt werden?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Wähle eine Option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {treatmentTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Button type="button" onClick={nextStep}>
                  Weiter
                </Button>
              </div>
            </form>
          </Form>
        </FormProvider>
      )}

      {step === 2 && (
        <FormProvider {...step2Form}>
          <Form>
            <form onSubmit={step2Form.handleSubmit(submitForm)} className="space-y-8">
              <FormField
                control={step2Form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bitte beschreibe deine Symptome</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ich leide unter..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Eine detaillierte Beschreibung hilft uns, dich besser zu verstehen.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step2Form.control}
                name="painLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wie stark sind deine Schmerzen?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Schmerzniveau wählen" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mild">Leicht</SelectItem>
                        <SelectItem value="moderate">Mittel</SelectItem>
                        <SelectItem value="severe">Stark</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step2Form.control}
                name="previousTreatments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Welche Behandlungen hast du bereits ausprobiert?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ich habe bereits..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Bitte gib alle Behandlungen an, die du bereits versucht hast.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step2Form.control}
                name="medicalConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hast du Vorerkrankungen?</FormLabel>
                    <FormControl>
                      <Input placeholder="Wenn ja, welche?" {...field} />
                    </FormControl>
                    <FormDescription>
                      Bitte gib alle relevanten Vorerkrankungen an.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={step2Form.control}
                name="medicationList"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nimmst du aktuell Medikamente ein?</FormLabel>
                    <FormControl>
                      <Input placeholder="Wenn ja, welche?" {...field} />
                    </FormControl>
                    <FormDescription>
                      Bitte gib alle Medikamente an, die du aktuell einnimmst.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={step2Form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Ich stimme den{" "}
                        <a
                          href="/datenschutz"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2"
                        >
                          Datenschutzbestimmungen
                        </a>{" "}
                        und{" "}
                        <a
                          href="/agb"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2"
                        >
                          AGB
                        </a>{" "}
                        zu.
                      </FormLabel>
                      <FormDescription>
                        Du musst zustimmen, um fortzufahren.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Zurück
                </Button>
                <Button type="button" onClick={submitForm}>
                  Absenden
                </Button>
              </div>
            </form>
          </Form>
        </FormProvider>
      )}

      {step === 3 && (
        <CompletionStep treatmentType={treatmentType || "fragebogen"} />
      )}

      <AlertDialog open={isDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bitte warten</AlertDialogTitle>
            <AlertDialogDescription>
              Dein Fragebogen wird jetzt übermittelt. Bitte schließe dieses Fenster nicht.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Fragebogen;
