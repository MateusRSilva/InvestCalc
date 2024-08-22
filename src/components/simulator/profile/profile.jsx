import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import options from './options';
import Stage from '../stepper/steppe';
import { useSimulatorContext } from '../../../contexts/simulatorcontext/simulatorcontext';

const BootstrapButton = styled(Button)({
    marginBottom: '0.625rem',
    maxWidth: '27.1875rem',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '0.375rem 0.75rem',
    border: '0.0625rem solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});

function Profile() {
    const { selectedIndex, setSelectedIndex } = useSimulatorContext(); // Estado para armazenar o índice selecionado
    const navigate = useNavigate();
    const handleButtonClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: '1.25rem', marginBottom:'1rem' }}>
            <Stage level={1} />
            <Box
                sx={{
                    backdropFilter: 'blur(1px)', // Ajuste a intensidade do blur
                    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Cor de fundo com opacidade para o blur funcionar
                    padding: '1rem', // Espaçamento interno
                    borderRadius: '8px', // Cantos arredondados para suavizar o visual
                }}
            >
                <Typography variant="h4" sx={{ marginTop: '0.75rem' }}>
                    Precisamos conhecer um pouco mais sobre o seu perfil!
                </Typography>
                <Typography variant="body1">
                    Existem diversos tipos de investimentos. Alguns são mais seguros e com um retorno um pouco menor. Outros podem ser mais arriscados, mas trazem a possibilidade de ganhos maiores.
                </Typography>
                <Typography variant="h6" sx={{ marginTop: '0.75rem' }}>
                    O que você prioriza ao investir?
                </Typography>
                {options.map((option, index) => (
                    <BootstrapButton
                        key={index}
                        onClick={() => handleButtonClick(index)}
                        variant="contained"
                        disableRipple
                    >
                        {option}
                    </BootstrapButton>
                ))}

                <Box mt={2} >
                    <Stack direction="row" spacing={20} >
                        <Button onClick={() => { navigate('/simulator') }} size='large' color='inherit' variant="outlined">Voltar</Button>
                        <Button onClick={() => { navigate('/result') }} size='large' variant="outlined" disabled={selectedIndex === null}>Próximo</Button>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
}

export default Profile;
