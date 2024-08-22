import { Box, Grid, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import carteiras from "./investimentProfileContet";
import GraphProfile from "../graph/graphProfile";
import profileDescriptions from "./profileDescriptions";
import { useSimulatorContext } from "../../../../contexts/simulatorcontext/simulatorContext";

function InvestimentProfile() {
    const { selectedIndex, amount } = useSimulatorContext();
    const [profile, setProfile] = useState('');
    const [portifoli, setPortifolio] = useState('');
    const [description, setDescription] = useState('');
    const [profileDescription, setProfileDescription] = useState('');

    useEffect(() => {
        switch (selectedIndex) {
            case 0:
                setProfile('Conservador');
                setPortifolio('Precavida');
                break;
            case 1:
                setProfile('Moderado');
                setPortifolio('Cautelosa');
                break;
            case 2:
                setProfile('Moderado');
                setPortifolio('Estrategista');
                break;
            case 3:
                setProfile('Agressivo');
                setPortifolio('Energetica');
                break;
            default:
                setProfile('');
                setPortifolio('');
        }
    }, [selectedIndex]);

    useEffect(() => {
        const selectedCarteira = carteiras.filter(carteira => carteira.nome === portifoli);
        if (selectedCarteira.length > 0) {
            setDescription(selectedCarteira[0].descricao);
        } else {
            setDescription('');
        }

        // Set profile description based on the selected profile
        setProfileDescription(profileDescriptions[profile] || '');
    }, [profile, portifoli]);

    return (
        <Box
            sx={{
                backdropFilter: 'blur(1px)',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1.25rem'
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
                            Perfil de Investimento
                        </Typography>
                        <Typography variant="h6" sx={{ marginTop: '1rem' }}>
                            Seu perfil de investimentos é:
                        </Typography>
                        <Typography variant="h3" color="primary">
                            {profile}
                        </Typography>
                        <Typography variant="body1" color="black">
                            {profileDescription}
                        </Typography>
                        <Typography variant="h6" color="black" marginTop={'2.125rem'}>
                            E o seu portfólio recomendado é:
                        </Typography>
                        <Typography variant="h3" color="primary">
                            {portifoli}
                        </Typography>
                        <Typography variant="body1" color="black">
                            {description}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sm={9} sx={{ marginTop: '1.25rem' }}>
                    <Typography variant="h5">Composição da carteira</Typography>
                    <Box
                        height={250}
                        display="flex"
                        alignItems="flex-end"
                        marginTop={20}
                        gap={3}
                        p={2}
                    >
                        <GraphProfile valorTotal={amount} perfil={portifoli}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default InvestimentProfile;
