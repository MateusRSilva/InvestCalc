import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import content from './homeContent';
import FAQContainer from '../faq/faqContainer';

function Home() {
    return (
        <>
            <Container maxWidth="lg" >
                {content.map((item, index) => (
                    <Typography key={index} variant={item.variant} sx={item.sx}>
                        {item.text}
                    </Typography>
                ))}
            </Container>
            <FAQContainer />
        </>
    );
}

export default Home;
