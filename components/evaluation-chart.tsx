"use client";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { date: "Jan", rating: 4.2 },
  { date: "Fev", rating: 4.3 },
  { date: "Mar", rating: 4.1 },
  { date: "Abr", rating: 4.5 },
  { date: "Mai", rating: 4.4 },
  { date: "Jun", rating: 4.6 },
  { date: "Jul", rating: 4.7 },
  { date: "Ago", rating: 4.5 },
  { date: "Set", rating: 4.8 },
  { date: "Out", rating: 4.5 },
  { date: "Nov", rating: 4.6 },
  { date: "Dez", rating: 4.7 },
];

export function EvaluationChart() {
  return (
    <div className="h-[180px] w-full border border-border bg-card rounded-md p-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 15,
            left: 0,
            bottom: 10,
          }}
        >
          <XAxis
            dataKey="date"
            tickLine={true}
            axisLine={true}
            fontSize={10}
            tickMargin={5}
            stroke="currentColor"
          />
          <YAxis
            domain={[3, 5]}
            tickCount={5}
            tickLine={true}
            axisLine={true}
            fontSize={10}
            tickMargin={5}
            stroke="currentColor"
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Mês
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {payload[0].payload.date}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Média
                        </span>
                        <span className="font-bold">{payload[0].value}★</span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="rating"
            strokeWidth={3}
            stroke="hsl(var(--primary))"
            dot={{
              r: 4,
              strokeWidth: 2,
              fill: "hsl(var(--primary))",
              stroke: "hsl(var(--primary))",
            }}
            activeDot={{
              r: 6,
              fill: "hsl(var(--primary))",
              stroke: "hsl(var(--primary))",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
