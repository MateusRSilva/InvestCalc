import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import perfilInvestimento from './graphContent';

// Cores para o gráfico
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#7D6DFF', '#33C4D1'];

const CustomPieChart = ({ valorTotal, perfil }) => {
  // Verifique o perfil e obtenha os dados apropriados
  const perfilData = perfilInvestimento[perfil] || []; // Se o perfil não for encontrado, usa um array vazio
  
  if (perfilData.length === 0) {
    return <Typography variant="body1">Nenhum dado disponível para o perfil selecionado.</Typography>;
  }

  // Calcular o valor total para o perfil específico
  const perfilTotalValue = perfilData.reduce((acc, curr) => acc + curr.value, 0);

  // Calcular a porcentagem para cada entrada de dados do perfil
  const perfilDataWithPercentage = perfilData.map((entry) => ({
    name: entry.name,
    value: (entry.value / perfilTotalValue) * 100,
  }));

  return (
    <Box position="relative" display="inline-block">
      <PieChart width={500} height={400}>
        <Pie
          data={perfilDataWithPercentage}
          dataKey="value"
          cx={200}
          cy={200}
          innerRadius={80}
          outerRadius={120}
          paddingAngle={1}
          label={({ name }) => `${name}`}
          tabIndex={-1}
        >
          {perfilDataWithPercentage.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ outline: 'none', boxShadow: 'none' }} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${Math.round(value)}%`} />
        <Legend />
      </PieChart>
      <Typography
        variant="body1"
        style={{
          position: 'absolute',
          top: '50%',
          left: '41%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          textAlign: 'center',
        }}
      >
        Total investido <br /> R${valorTotal}
      </Typography>
    </Box>
  );
};

export default CustomPieChart;
