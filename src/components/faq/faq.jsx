import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import faqData from "./faqContent";

function FAQ() {
    return (
        <Box>
            {faqData.map((item, index) => (
                <Accordion sx={{margin:'0.625rem', boxShadow:'none'}} key={index}>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <Typography>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {item.answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    )
}

export default FAQ;
