// src/pages/Resultado.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "@/contexts/QuizContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, XCircle, Trophy, RotateCcw, Home } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { QuizData, QuizResult } from "@/types/quiz";

const Resultado = () => {
  const { modulo } = useParams<{ modulo: string }>();
  const navigate = useNavigate();
  const { getModuleQuestions, getModuleResult } = useQuiz();

  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    if (!modulo) {
      navigate("/dashboard");
      return;
    }

    const savedResult = getModuleResult(modulo);
    if (!savedResult) {
      // Se não há resultado salvo, redireciona (ex: usuário tentou acessar diretamente)
      navigate("/dashboard");
      return;
    }

    try {
      const data = getModuleQuestions(modulo);
      setQuizData(data);
      setResult(savedResult);
    } catch (err) {
      console.error("Erro ao carregar quiz:", err);
      navigate("/dashboard");
    }
  }, [modulo, navigate]);

  if (!result || !quizData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Carregando...
      </div>
    );
  }

  const total = Object.keys(quizData.questions).length;
  const acertos = result.acertos;
  const percentage = (acertos / total) * 100;
  const passed = percentage >= 70;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h1 className="text-2xl font-bold">Resultado do Quiz</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card
          className={`mb-8 ${
            passed ? "border-success" : "border-destructive"
          } border-2`}
        >
          <CardHeader className="text-center">
            <div
              className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                passed ? "bg-gradient-success" : "bg-gradient-error"
              }`}
            >
              {passed ? (
                <Trophy className="w-12 h-12 text-white" />
              ) : (
                <RotateCcw className="w-12 h-12 text-white" />
              )}
            </div>
            <CardTitle className="text-3xl">
              {passed ? "Parabéns! 🎉" : "Continue tentando! 💪"}
            </CardTitle>
            <CardDescription className="text-lg">
              {passed
                ? "Você passou no quiz com sucesso!"
                : "Você pode refazer o quiz para melhorar sua pontuação"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-around text-center">
                <div>
                  <p className="text-4xl font-bold text-success">
                    {result.acertos}
                  </p>
                  <p className="text-sm text-muted-foreground">Acertos</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-destructive">
                    {result.erros}
                  </p>
                  <p className="text-sm text-muted-foreground">Erros</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">{percentage.toFixed(0)}%</p>
                  <p className="text-sm text-muted-foreground">
                    Aproveitamento
                  </p>
                </div>
              </div>
              <Progress value={percentage} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4">Revisão das Questões</h2>

        <div className="space-y-4">
          {Object.entries(quizData.questions).map(([key, question], index) => {
            const feedback = result.feedback[key];
            const revisao = result.revisoes[key];
            const isCorrect = feedback?.correto === true;

            return (
              <Card
                key={key}
                className={`${
                  isCorrect ? "border-success" : "border-destructive"
                } border-l-4`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        Pergunta {index + 1}
                      </CardTitle>
                      <p className="text-foreground">{question.text}</p>
                    </div>
                    {isCorrect ? (
                      <CheckCircle2 className="w-8 h-8 text-success flex-shrink-0" />
                    ) : (
                      <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">
                      {isCorrect ? "✅ Correto!" : "❌ Incorreto"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {feedback?.mensagem}
                    </p>
                  </div>

                  {/* Só mostra a revisão se a resposta estiver errada */}
                  {!isCorrect && (
                    <div className="bg-accent p-4 rounded-lg">
                      <p className="text-sm font-semibold mb-1">📖 Revisão</p>
                      <p className="text-sm text-muted-foreground text-black">{revisao}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex gap-4 mt-8">
          <Button
            onClick={() => navigate(`/quiz/${modulo}`)}
            variant="outline"
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Refazer Quiz
          </Button>
          <Button onClick={() => navigate("/dashboard")} className="flex-1">
            <Home className="w-4 h-4 mr-2" />
            Voltar aos Módulos
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Resultado;
