"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Search,
  Star,
  ChartBar,
  GraduationCap,
  ClipboardCheck,
} from "lucide-react";
import { EvaluationChart } from "@/components/evaluation-chart";
import { MultiSelect } from "@/components/multi-select";

// Dados das avaliações com timestamps para interações
const evaluations = [
  {
    id: 1,
    rating: 5,
    planType: "Plano Premium",
    date: "15/04/2024",
    comment: "Excelente serviço, superou minhas expectativas!",
    timestamp: new Date("2024-04-15T14:30:00"),
    category: "conteudo",
  },
  {
    id: 2,
    rating: 4,
    planType: "Plano Básico",
    date: "14/04/2024",
    comment: "Bom serviço, mas poderia melhorar em alguns aspectos.",
    timestamp: new Date("2024-04-14T10:15:00"),
    category: "geral",
  },
  {
    id: 3,
    rating: 5,
    planType: "Plano Empresarial",
    date: "13/04/2024",
    comment: "Atendeu perfeitamente às necessidades da nossa empresa.",
    timestamp: new Date("2024-04-13T17:45:00"),
    category: "correcao",
  },
  {
    id: 4,
    rating: 4,
    planType: "Plano Premium",
    date: "12/04/2024",
    comment: "Ótimo custo-benefício, recomendo!",
    timestamp: new Date("2024-04-12T09:22:00"),
    category: "conteudo",
  },
  {
    id: 5,
    rating: 3,
    planType: "Plano Básico",
    date: "11/04/2024",
    comment: "Satisfatório, mas esperava mais recursos.",
    timestamp: new Date("2024-04-11T16:10:00"),
    category: "geral",
  },
  {
    id: 6,
    rating: 2,
    planType: "Plano Básico",
    date: "10/04/2024",
    comment: "Abaixo das expectativas, precisa melhorar bastante.",
    timestamp: new Date("2024-04-10T13:20:00"),
    category: "correcao",
  },
];

// Dados para as métricas por categoria
const metricsByCategory = {
  geral: {
    average: 4.5,
    total: 100,
    minRating: 2,
    maxRating: 5,
    distribution: [
      { stars: 5, percentage: 65 },
      { stars: 4, percentage: 25 },
      { stars: 3, percentage: 10 },
    ],
  },
  conteudo: {
    average: 4.7,
    total: 75,
    minRating: 3,
    maxRating: 5,
    distribution: [
      { stars: 5, percentage: 70 },
      { stars: 4, percentage: 20 },
      { stars: 3, percentage: 10 },
    ],
  },
  correcao: {
    average: 4.2,
    total: 50,
    minRating: 2,
    maxRating: 5,
    distribution: [
      { stars: 5, percentage: 55 },
      { stars: 4, percentage: 30 },
      { stars: 3, percentage: 10 },
      { stars: 2, percentage: 5 },
    ],
  },
};

// Opções para os filtros
const dateOptions = [
  { label: "Todas as datas", value: "all" },
  { label: "Hoje", value: "today" },
  { label: "Esta semana", value: "week" },
  { label: "Este mês", value: "month" },
];

const planTypeOptions = [
  { label: "Plano Básico", value: "basic" },
  { label: "Plano Premium", value: "premium" },
  { label: "Plano Empresarial", value: "enterprise" },
];

const ratingOptions = [
  { label: "5 estrelas", value: "5" },
  { label: "4 estrelas", value: "4" },
  { label: "3 estrelas", value: "3" },
  { label: "2 estrelas", value: "2" },
  { label: "1 estrela", value: "1" },
];

// Componente para renderizar as estrelas
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      <Star className="h-4 w-4 fill-primary text-primary" />
      <span className="ml-1">{rating}</span>
    </div>
  );
};

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState("geral");
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedPlanTypes, setSelectedPlanTypes] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    // Filtrar os dados com base na categoria selecionada
    console.log(`Filter changed to: ${filter}`);
  };

  // Obter métricas da categoria ativa
  const activeMetrics =
    metricsByCategory[activeFilter as keyof typeof metricsByCategory];

  // Ícone para a categoria atual
  const CategoryIcon = () => {
    switch (activeFilter) {
      case "conteudo":
        return <GraduationCap className="h-4 w-4 mr-1" />;
      case "correcao":
        return <ClipboardCheck className="h-4 w-4 mr-1" />;
      default:
        return <ChartBar className="h-4 w-4 mr-1" />;
    }
  };

  // Filtrar as avaliações com base nos critérios selecionados
  const filteredEvaluations = evaluations.filter((evaluation) => {
    // Aplicar filtros somente se algum valor estiver selecionado
    const passesDateFilter =
      selectedDates.length === 0 ||
      selectedDates.some((dateFilter) => {
        const today = new Date();
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);

        switch (dateFilter) {
          case "today":
            return evaluation.timestamp.toDateString() === today.toDateString();
          case "week":
            return evaluation.timestamp >= weekAgo;
          case "month":
            return evaluation.timestamp >= monthAgo;
          default:
            return true;
        }
      });

    const passesPlanFilter =
      selectedPlanTypes.length === 0 ||
      selectedPlanTypes.some((planType) => {
        switch (planType) {
          case "basic":
            return evaluation.planType === "Plano Básico";
          case "premium":
            return evaluation.planType === "Plano Premium";
          case "enterprise":
            return evaluation.planType === "Plano Empresarial";
          default:
            return true;
        }
      });

    const passesRatingFilter =
      selectedRatings.length === 0 ||
      selectedRatings.some((rating) => evaluation.rating.toString() === rating);

    const passesSearchFilter =
      searchQuery === "" ||
      evaluation.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evaluation.planType.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      passesDateFilter &&
      passesPlanFilter &&
      passesRatingFilter &&
      passesSearchFilter
    );
  });

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col gap-4 p-4 w-full max-w-7xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            Dashboard de Avaliações
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="overflow-hidden">
            <CardHeader className="pb-0 pt-4 px-4">
              <CardTitle className="text-lg">Métricas Avaliação</CardTitle>
              <CardDescription className="text-xs">
                Visão geral das avaliações
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3">
              <div className="grid grid-cols-4 gap-2">
                <div className="flex flex-col items-center justify-center rounded-md border bg-background p-2">
                  <div className="flex items-center text-xl font-bold">
                    <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
                    {activeMetrics.average.toFixed(1)}
                  </div>
                  <p className="text-xs text-muted-foreground">média</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-md border bg-background p-2">
                  <div className="flex items-center text-xl font-bold">
                    <CategoryIcon />
                    {activeMetrics.total}
                  </div>
                  <p className="text-xs text-muted-foreground">aval.</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-md border bg-background p-2">
                  <div className="flex items-center text-xl font-bold">
                    <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
                    {activeMetrics.minRating}
                  </div>
                  <p className="text-xs text-muted-foreground">nota mínima</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-md border bg-background p-2">
                  <div className="flex items-center text-xl font-bold">
                    <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
                    {activeMetrics.maxRating}
                  </div>
                  <p className="text-xs text-muted-foreground">nota máxima</p>
                </div>
              </div>

              <div className="flex justify-center space-x-2">
                <Badge
                  variant={activeFilter === "geral" ? "secondary" : "outline"}
                  className="text-xs cursor-pointer hover:bg-secondary/80"
                  onClick={() => handleFilterClick("geral")}
                >
                  Geral
                </Badge>
                <Badge
                  variant={
                    activeFilter === "conteudo" ? "secondary" : "outline"
                  }
                  className="text-xs cursor-pointer hover:bg-secondary/80"
                  onClick={() => handleFilterClick("conteudo")}
                >
                  Conteúdo
                </Badge>
                <Badge
                  variant={
                    activeFilter === "correcao" ? "secondary" : "outline"
                  }
                  className="text-xs cursor-pointer hover:bg-secondary/80"
                  onClick={() => handleFilterClick("correcao")}
                >
                  Correção
                </Badge>
              </div>

              <div className="mt-1 space-y-2">
                {activeMetrics.distribution.map((item) => (
                  <div key={item.stars} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>{item.stars}★</span>
                      <span className="text-muted-foreground">
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="pb-0 pt-4 px-4">
              <CardTitle className="text-lg">Avaliações no tempo</CardTitle>
              <CardDescription className="text-xs">
                Tendência de avaliações
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <EvaluationChart />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-[200px]">
              <MultiSelect
                options={dateOptions}
                defaultValue={selectedDates}
                onValueChange={setSelectedDates}
                placeholder="Datas"
                className="h-9"
              />
            </div>

            <div className="w-[200px]">
              <MultiSelect
                options={planTypeOptions}
                defaultValue={selectedPlanTypes}
                onValueChange={setSelectedPlanTypes}
                placeholder="Tipos de Plano"
                className="h-9"
              />
            </div>

            <div className="w-[200px]">
              <MultiSelect
                options={ratingOptions}
                defaultValue={selectedRatings}
                onValueChange={setSelectedRatings}
                placeholder="Notas"
                className="h-9"
              />
            </div>

            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar avaliações..."
                className="h-9 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nota</TableHead>
                  <TableHead>Tipo de Plano</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="w-[40%]">Comentário</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvaluations.map((evaluation) => (
                  <TableRow key={evaluation.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                        <span>{evaluation.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>{evaluation.planType}</TableCell>
                    <TableCell>{evaluation.date}</TableCell>
                    <TableCell>{evaluation.comment}</TableCell>
                  </TableRow>
                ))}
                {filteredEvaluations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      Nenhuma avaliação encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                console.log("Exporting CSV...");
                // Here you would implement the CSV export functionality
                alert("Exportando dados para CSV...");
              }}
            >
              <Download className="h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
