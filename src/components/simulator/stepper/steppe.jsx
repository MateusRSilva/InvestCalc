import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
    'Informações',
    'Perfil',
    'Resultado',
  ];
function Stage({level}){
    return (
        <>
            <Stepper activeStep={level} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    )
}
export default Stage