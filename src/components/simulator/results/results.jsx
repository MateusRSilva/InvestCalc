import { Container, Typography, Grid, Box } from "@mui/material";


import { useEffect, useState } from "react";
import Content from "./resultsContent";
import InvestimentProfile from "./investimentProfile/investimentProfile";
import LoopIcon from '@mui/icons-material/Loop';
import { useNavigate } from "react-router-dom";
import Stage from "../stepper/steppe";
import { useSimulatorContext } from "../../../contexts/simulatorcontext/simulatorContext";
import FAQContainer from "../../faq/faqContainer";


function Result() {
    const { name, years, amount } = useSimulatorContext();
    const [interestRate, setInterestRate] = useState(0.0080); // Valor padrão, 100% do CDI
    const [dataHoje, setDataHoje] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        setDataHoje(new Date());
    }, []);

    const formatarData = (data) => {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const amountNumber = parseFloat(amount.replace(/\./g, '').replace(',', '.')) || 0;
    const yearsNumber = (Number(years) || 1) * 12;

    const futureValue = amountNumber * Math.pow((1 + interestRate), yearsNumber);

    // Função para formatar o número de acordo com as especificações
    const formatarValor = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(valor);
    };

    // Função para calcular o valor futuro com base no CDI ajustado
    const calcularValorFuturo = (cdiPercentage) => {
        const cdiRate = (parseFloat(cdiPercentage) / 100) * interestRate; // Ajustar o interestRate com base no CDI
        return amountNumber * Math.pow((1 + cdiRate), yearsNumber);
    };

    return (
        <>
            <Container maxWidth="sm" sx={{ marginTop: '1.25rem' }}>
                <Stage level={2} />
            </Container>
            <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: '1rem' }}>
                <Box
                    sx={{
                        backdropFilter: 'blur(1px)', // Ajuste a intensidade do blur
                        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Cor de fundo com opacidade para o blur funcionar
                        padding: '1rem', // Espaçamento interno
                        borderRadius: '8px', // Cantos arredondados para suavizar o visual
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} sm={12}>
                            <Box
                                sx={{
                                    padding: 2,
                                    height: '100%',
                                    boxSizing: 'border-box'
                                }}
                            >
                                <Typography variant="h4" sx={{ marginTop: '0.75rem' }}>
                                    Olá, {name}
                                </Typography>
                                <Typography variant="h6" sx={{ marginTop: '1rem' }}>
                                    De acordo com a nossa simulação, investindo R${amount} em {years} ano(s) você poderá ter:
                                </Typography>
                                <Typography variant="h2" color="primary" sx={{ marginTop: '1rem' }}>
                                    R${formatarValor(futureValue)}
                                </Typography>
                                <Typography variant="body1" color="black">
                                    *(100% do CDI)
                                </Typography>
                                <Typography variant="body1" color="black" marginTop={'3.125rem'}>
                                    (*) Rendimento calculado em {formatarData(dataHoje)} se refere ao rendimento total no primeiro ano. Valores brutos, sem considerar descontos de Imposto de Renda. Verifique as condições de cada produto antes de investir.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sm={9} sx={{ marginTop: '1.25rem' }}>
                            <Typography variant="h5">Veja o quanto investir é vantajoso</Typography>
                            <Box
                                height={250}
                                display="flex"
                                alignItems="flex-end"
                                justifyContent="center"
                                marginTop={9}
                                gap={3}
                                p={2}
                                sx={{ marginTop: '7rem' }}
                            >
                                {Content.map((item, index) => {
                                    const valorFuturo = calcularValorFuturo(item.CDI);
                                    return (
                                        <Box key={index} display="flex" flexDirection="column" alignItems="center">
                                            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                                R${formatarValor(valorFuturo)}
                                            </Typography>
                                            <Box height={item.height} width={90} sx={{ backgroundColor: '#1976D2' }} />
                                            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                                {item.label} <br /> {item.subLabel}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <InvestimentProfile />
            </Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom:'3rem' }}>
                <Box sx={{ display: 'flex', cursor: 'pointer' }} onClick={() => {
                    navigate('/simulator'); setAmount('0,00');
                    setName('');
                    setYears('');
                    setSelectedIndex(null);
                }}>
                    <LoopIcon />
                    <Typography variant="body1">Refazer Simulação</Typography>
                </Box>
            </Box>
            <FAQContainer />
        </>
    );
}

export default Result;
