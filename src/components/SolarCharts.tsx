import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { PowerTimePoint } from '../types/solar';
import { WEEKLY_ENERGY_DATA, MONTHLY_ENERGY_DATA } from '../data/initialData';

interface LivePowerChartProps {
  data: PowerTimePoint[];
  filter: '1h' | '6h' | 'today';
}

export const LivePowerChart: React.FC<LivePowerChartProps> = ({ data, filter }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Filter data according to selected timeframe
  let displayData = data;
  if (filter === '1h') {
    displayData = data.slice(-8);
  } else if (filter === '6h') {
    displayData = data.slice(-14);
  }

  const labels = displayData.map(d => d.time);
  const actualValues = displayData.map(d => d.actualPower);
  const expectedValues = displayData.map(d => d.expectedPower);

  useEffect(() => {
    if (!canvasRef.current) return;

    // If chart already exists on this canvas, update data smoothly in-place
    if (chartInstance.current && chartInstance.current.canvas === canvasRef.current) {
      chartInstance.current.data.labels = labels;
      if (chartInstance.current.data.datasets[0]) {
        chartInstance.current.data.datasets[0].data = actualValues;
      }
      if (chartInstance.current.data.datasets[1]) {
        chartInstance.current.data.datasets[1].data = expectedValues;
      }
      chartInstance.current.update('none');
      return;
    }

    // Ensure any previously registered Chart on this canvas is completely destroyed
    const existingChart = Chart.getChart(canvasRef.current);
    if (existingChart) {
      existingChart.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const actualGradient = ctx.createLinearGradient(0, 0, 0, 240);
    actualGradient.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
    actualGradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Actual Power (kW)',
            data: actualValues,
            borderColor: '#059669',
            backgroundColor: actualGradient,
            borderWidth: 2.5,
            fill: true,
            tension: 0.35,
            pointRadius: displayData.length > 15 ? 2 : 4,
            pointBackgroundColor: '#059669',
            pointBorderColor: '#ffffff',
            pointHoverRadius: 6,
          },
          {
            label: 'Expected Power (kW)',
            data: expectedValues,
            borderColor: '#94a3b8',
            borderWidth: 1.8,
            borderDash: [5, 4],
            fill: false,
            tension: 0.35,
            pointRadius: 0,
            pointHoverRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 300,
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 12,
              font: {
                family: "'Plus Jakarta Sans', sans-serif",
                size: 11,
                weight: 500,
              },
              color: '#475569',
            },
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleFont: {
              family: "'Plus Jakarta Sans', sans-serif",
              size: 12,
              weight: 600,
            },
            bodyFont: {
              family: "'JetBrains Mono', monospace",
              size: 11,
            },
            padding: 10,
            boxPadding: 4,
            cornerRadius: 8,
          },
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(226, 232, 240, 0.7)',
            },
            ticks: {
              color: '#64748b',
              font: {
                family: "'JetBrains Mono', monospace",
                size: 10,
              },
              maxRotation: 0,
            },
          },
          y: {
            min: 0,
            max: 12,
            grid: {
              color: 'rgba(226, 232, 240, 0.7)',
            },
            ticks: {
              color: '#64748b',
              font: {
                family: "'JetBrains Mono', monospace",
                size: 10,
              },
              callback: value => `${value} kW`,
            },
          },
        },
      },
    };

    chartInstance.current = new Chart(canvasRef.current, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
      if (canvasRef.current) {
        const c = Chart.getChart(canvasRef.current);
        if (c) c.destroy();
      }
    };
  }, [labels.join(','), actualValues.join(','), expectedValues.join(',')]);

  return (
    <div className="w-full h-64 sm:h-72">
      <canvas ref={canvasRef} />
    </div>
  );
};

interface EnergyGenerationChartProps {
  filter: 'today' | 'week' | 'month';
}

export const EnergyGenerationChart: React.FC<EnergyGenerationChartProps> = ({ filter }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Configure dataset based on filter
  let labels: string[] = [];
  let generatedData: number[] = [];
  let expectedData: number[] = [];
  const unit = 'kWh';

  if (filter === 'today') {
    labels = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
    generatedData = [142, 235, 310, 290, 185, 86];
    expectedData = [160, 250, 330, 310, 205, 95];
  } else if (filter === 'week') {
    labels = WEEKLY_ENERGY_DATA.map(d => d.label);
    generatedData = WEEKLY_ENERGY_DATA.map(d => d.actualEnergy);
    expectedData = WEEKLY_ENERGY_DATA.map(d => d.expectedEnergy);
  } else {
    labels = MONTHLY_ENERGY_DATA.map(d => d.label);
    generatedData = MONTHLY_ENERGY_DATA.map(d => d.actualEnergy);
    expectedData = MONTHLY_ENERGY_DATA.map(d => d.expectedEnergy);
  }

  useEffect(() => {
    if (!canvasRef.current) return;

    // Ensure any previously registered Chart on this canvas is completely destroyed
    const existingChart = Chart.getChart(canvasRef.current);
    if (existingChart) {
      existingChart.destroy();
    }
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: `Actual Generation (${unit})`,
            data: generatedData,
            backgroundColor: '#059669',
            borderRadius: 6,
            barPercentage: 0.6,
            categoryPercentage: 0.7,
          },
          {
            label: `Target/Expected (${unit})`,
            data: expectedData,
            backgroundColor: '#cbd5e1',
            borderRadius: 6,
            barPercentage: 0.6,
            categoryPercentage: 0.7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 300,
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 12,
              font: {
                family: "'Plus Jakarta Sans', sans-serif",
                size: 11,
                weight: 500,
              },
              color: '#475569',
            },
          },
          tooltip: {
            backgroundColor: '#0f172a',
            padding: 10,
            cornerRadius: 8,
            bodyFont: {
              family: "'JetBrains Mono', monospace",
              size: 11,
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#64748b',
              font: {
                family: "'Plus Jakarta Sans', sans-serif",
                size: 10,
              },
            },
          },
          y: {
            grid: {
              color: 'rgba(226, 232, 240, 0.7)',
            },
            ticks: {
              color: '#64748b',
              font: {
                family: "'JetBrains Mono', monospace",
                size: 10,
              },
              callback: value => `${value} ${unit}`,
            },
          },
        },
      },
    };

    chartInstance.current = new Chart(canvasRef.current, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
      if (canvasRef.current) {
        const c = Chart.getChart(canvasRef.current);
        if (c) c.destroy();
      }
    };
  }, [filter, labels.join(','), generatedData.join(',')]);

  return (
    <div className="w-full h-64 sm:h-72">
      <canvas ref={canvasRef} />
    </div>
  );
};
