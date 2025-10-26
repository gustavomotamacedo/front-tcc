import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "@/contexts/QuizContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const Quiz = () => {
  const { modulo } = useParams<{ modulo: string }>();
  const navigate = useNavigate();
  const { getModuleQuestions, saveQuizResult } = useQuiz();
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (modulo) {
      const moduleQuestions = getModuleQuestions(modulo);
      if (moduleQuestions.length === 0) {
        toast.error("Módulo não encontrado");
        navigate("/dashboard");
        return;
      }
      setQuestions(moduleQuestions);
    }
  }, [modulo]);

  useEffect(() => {
    if (questions.length > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleNext();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestion, questions]);

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast.error("Por favor, selecione uma resposta");
      return;
    }

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      if (modulo) {
        saveQuizResult(modulo, newAnswers);
        navigate(`/resultado/${modulo}`);
      }
    }
  };

  if (questions.length === 0) {
    return null;
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-quiz-background text-quiz-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <div className="h-3 bg-quiz-option rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary transition-all duration-300"
                  style={{ width: `${(timeLeft / 30) * 100}%` }}
                />
              </div>
            </div>
            <div className="ml-4 w-12 h-12 rounded-full border-2 border-quiz-foreground flex items-center justify-center font-bold">
              {timeLeft}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="bg-quiz-option rounded-3xl p-8 shadow-elevated">
          <p className="text-sm text-muted-foreground mb-4">
            Pergunta {currentQuestion + 1}/{questions.length}
          </p>
          <h2 className="text-2xl font-bold mb-8">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                className={`w-full p-4 rounded-2xl text-left transition-all duration-300 flex items-center justify-between group ${
                  selectedAnswer === index
                    ? "bg-quiz-option-selected text-white scale-105"
                    : "bg-quiz-option hover:bg-quiz-option-hover"
                }`}
              >
                <span className="font-medium">{option}</span>
                {selectedAnswer === index && (
                  <CheckCircle2 className="w-6 h-6 animate-in zoom-in" />
                )}
              </button>
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="w-full mt-8 h-14 text-lg font-semibold"
          >
            {currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima"}
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="fixed top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-3xl" />
        <div className="fixed bottom-20 right-10 w-32 h-32 bg-success/20 rounded-full blur-3xl" />
        <div className="fixed top-1/2 left-1/4 w-24 h-24 bg-warning/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default Quiz;
