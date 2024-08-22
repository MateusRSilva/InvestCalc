import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Stage from '../stepper/steppe';
import { useSimulatorContext } from '../../../contexts/simulatorcontext/simulatorcontext';

function Information() {
    const { amount, setAmount, name, setName, years, setYears } = useSimulatorContext();
    const [open, setOpen] = useState(false);
    const [messageShown, setMessageShown] = useState(false);
    const [messageColor, setMessageColor] = useState('');
    const [isAmountValid, setIsAmountValid] = useState(false);
    const navigate = useNavigate();

    // Verifica a validade do valor ao carregar a página
    useEffect(() => {
        const numericValue = parseFloat(amount.replace(/\D/g, '')) / 100;
        if (numericValue < 100) {
            setIsAmountValid(false);
        } else if (numericValue >= 100) {
            setIsAmountValid(true);
        }
    }, [amount]);

    const handleClick = () => {
        navigate('/profile');
    };

    const formatCurrency = (value) => {
        let numericValue = value.replace(/^0+(?!$)/, '');
        numericValue = numericValue.padStart(3, '0');
        const integerPart = numericValue.slice(0, -2);
        const decimalPart = numericValue.slice(-2);
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${formattedInteger},${decimalPart}`;
    };

    const handleChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        const formattedValue = formatCurrency(value);
        setAmount(formattedValue);

        const numericValue = parseFloat(value) / 100;
        if (numericValue < 100 && !messageShown) {
            setOpen(true);
            setMessageShown(true);
            setMessageColor('red');
            setIsAmountValid(false);
        } else if (numericValue >= 100) {
            setOpen(false);
            setMessageShown(false);
            setMessageColor('black');
            setIsAmountValid(true);
        }
    };

    const handleKeyDown = (e) => {
        if (
            !(
                (e.key >= '0' && e.key <= '9') ||
                e.key === 'Backspace' ||
                e.key === 'Delete' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Tab'
            )
        ) {
            e.preventDefault();
        }
    };

    const handleNameChange = (e) => setName(e.target.value);
    const handleYearsChange = (e) => setYears(e.target.value);

    const isFormComplete = () => {
        return name.trim() !== '' && amount.replace(/\D/g, '') !== '' && years.toString().trim() !== '' && isAmountValid;
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: '1.25rem', marginBottom:'1rem'}}>
            <Stage level={0} />
            <Box
                sx={{
                    backdropFilter: 'blur(1px)', // Ajuste a intensidade do blur
                    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Cor de fundo com opacidade para o blur funcionar
                    padding: '1rem', // Espaçamento interno
                    borderRadius: '8px', // Cantos arredondados para suavizar o visual
                }}
            >
                <Typography variant="h4">
                    Por quanto tempo e qual o valor que você quer investir?
                </Typography>
                <Typography variant="body1">
                    Pense nos seus objetivos. Uma viagem, aposentadoria, comprar um imóvel. Em quanto tempo tempo você gostaria de realizar esse sonho? E com quanto você gostaria de começar?
                </Typography>
                <Typography variant="h6" sx={{ marginTop: '0.75rem' }}>
                    Seu nome completo:
                </Typography>
                <TextField
                    id="standard-basic"
                    label="*Nome"
                    variant="standard"
                    value={name}
                    onChange={handleNameChange}
                    sx={{ width: '18.75rem' }}
                />
                <Typography variant="h6" sx={{ marginTop: '0.75rem' }}>
                    Qual valor você gostaria de investir?
                </Typography>
                <InputLabel htmlFor="standard-adornment-amount">*Valor</InputLabel>
                <Input
                    id="standard-adornment-amount"
                    value={amount}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                    sx={{ width: '18.75rem' }}
                />
                <Typography color={messageColor} variant="body1" sx={{ fontSize: '0.75rem' }}>
                    O valor mínimo é de R$ 100,00
                </Typography>
                <Typography variant="h6" sx={{ marginTop: '0.75rem' }}>
                    Por quantos anos você pretende deixar esse dinheiro investido?
                </Typography>
                <TextField
                    id="standard-number"
                    sx={{ width: '18.75rem' }}
                    label="*Anos"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    inputProps={{
                        min: 1,
                    }}
                    value={years}
                    onChange={handleYearsChange}
                />
                <Box mt={2}>
                    <Button onClick={handleClick} size='large' variant="outlined" disabled={!isFormComplete()}>Próximo</Button>
                </Box>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={open}
                message="O valor digitado é menor que 100"
            />
        </Container>
    );
}

export default Information;