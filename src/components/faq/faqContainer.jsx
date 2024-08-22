import { Box, Typography } from "@mui/material";
import FAQ from "./faq";

function FAQContainer() {
    return (
        <Box 
            sx={{ 
                backgroundColor: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                marginTop: '1.25rem', 
                padding: '1.25rem',
                flexDirection: { xs: 'column', sm: 'row' } // Quebra para coluna em telas pequenas
            }}
        >
            <Box sx={{ minWidth: '21.25rem', marginBottom: { xs: '1.25rem', sm: '0' } }}>
                <Typography variant="h2">FAQ</Typography>
                <Typography variant="h5">PERGUNTAS FREQUENTES</Typography>
            </Box>
            <FAQ />
        </Box>
    );
}

export default FAQContainer;
