import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/contexts/QuizContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Circle } from "lucide-react";

const Dashboard = () => {
  const { user, modules, logout } = useQuiz();
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-warning" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success">Concluído</Badge>;
      case "in-progress":
        return <Badge className="bg-warning">Em andamento</Badge>;
      default:
        return <Badge variant="outline">Não iniciado</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Quiz System</h1>
              <p className="text-sm text-muted-foreground">Bem-vindo, {user?.name}!</p>
            </div>
          </div>
          <Button variant="outline" onClick={logout}>
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Módulos de Aprendizado</h2>
          <p className="text-muted-foreground">Escolha um módulo para começar ou continuar seu quiz</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card
              key={module.id}
              className="hover:shadow-elevated transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(`/quiz/${module.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {module.icon}
                  </div>
                  {getStatusIcon(module.status)}
                </div>
                <CardTitle className="text-xl">{module.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  {getStatusBadge(module.status)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  {module.status === "completed" ? "Refazer" : module.status === "in-progress" ? "Continuar" : "Iniciar"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
