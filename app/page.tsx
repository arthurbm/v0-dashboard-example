"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Search, Star } from "lucide-react"
import { EvaluationChart } from "@/components/evaluation-chart"

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState("geral")

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
    // Here you would typically filter your data based on the selected filter
    console.log(`Filter changed to: ${filter}`)
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard de Avaliações</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="pb-0 pt-4 px-4">
            <CardTitle className="text-lg">Métricas Etapas</CardTitle>
            <CardDescription className="text-xs">Visão geral das avaliações</CardDescription>
          </CardHeader>
          <CardContent className="p-4 flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center justify-center rounded-md border bg-background p-2">
                <div className="flex items-center text-xl font-bold">
                  <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
                  4,5
                </div>
                <p className="text-xs text-muted-foreground">média</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-md border bg-background p-2">
                <div className="text-xl font-bold">100</div>
                <p className="text-xs text-muted-foreground">aval.</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-md border bg-background p-2">
                <div className="text-xl font-bold">4/5</div>
                <p className="text-xs text-muted-foreground">min/max</p>
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
                variant={activeFilter === "conteudo" ? "secondary" : "outline"}
                className="text-xs cursor-pointer hover:bg-secondary/80"
                onClick={() => handleFilterClick("conteudo")}
              >
                Conteúdo
              </Badge>
              <Badge
                variant={activeFilter === "correcao" ? "secondary" : "outline"}
                className="text-xs cursor-pointer hover:bg-secondary/80"
                onClick={() => handleFilterClick("correcao")}
              >
                Correção
              </Badge>
            </div>

            <div className="mt-1 space-y-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>5★</span>
                  <span className="text-muted-foreground">65%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[65%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>4★</span>
                  <span className="text-muted-foreground">25%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[25%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>3★</span>
                  <span className="text-muted-foreground">10%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[10%] rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-0 pt-4 px-4">
            <CardTitle className="text-lg">Avaliações no tempo</CardTitle>
            <CardDescription className="text-xs">Tendência de avaliações</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <EvaluationChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="h-9 w-[120px]">
              <SelectValue placeholder="Data" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as datas</SelectItem>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="h-9 w-[120px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="basic">Plano Básico</SelectItem>
              <SelectItem value="premium">Plano Premium</SelectItem>
              <SelectItem value="enterprise">Plano Empresarial</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="h-9 w-[120px]">
              <SelectValue placeholder="Nota" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as notas</SelectItem>
              <SelectItem value="5">5 estrelas</SelectItem>
              <SelectItem value="4">4 estrelas</SelectItem>
              <SelectItem value="3">3 estrelas</SelectItem>
              <SelectItem value="2">2 estrelas</SelectItem>
              <SelectItem value="1">1 estrela</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar avaliações..." className="h-9 pl-8" />
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
              {evaluations.map((evaluation) => (
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
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              console.log("Exporting CSV...")
              // Here you would implement the CSV export functionality
              alert("Exportando dados para CSV...")
            }}
          >
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
        </div>
      </div>
    </div>
  )
}

const evaluations = [
  {
    id: 1,
    rating: 5,
    planType: "Plano Premium",
    date: "15/04/2024",
    comment: "Excelente serviço, superou minhas expectativas!",
  },
  {
    id: 2,
    rating: 4,
    planType: "Plano Básico",
    date: "14/04/2024",
    comment: "Bom serviço, mas poderia melhorar em alguns aspectos.",
  },
  {
    id: 3,
    rating: 5,
    planType: "Plano Empresarial",
    date: "13/04/2024",
    comment: "Atendeu perfeitamente às necessidades da nossa empresa.",
  },
  {
    id: 4,
    rating: 4,
    planType: "Plano Premium",
    date: "12/04/2024",
    comment: "Ótimo custo-benefício, recomendo!",
  },
  {
    id: 5,
    rating: 3,
    planType: "Plano Básico",
    date: "11/04/2024",
    comment: "Satisfatório, mas esperava mais recursos.",
  },
]
