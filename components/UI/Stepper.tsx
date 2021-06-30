import { Step, Stepper } from 'react-form-stepper'

const FormStepper = (props) => {
  // const {steps, activeStep} = props
  const { activeStep, className } = props
  const steps = [
    {
      label: 'first',
    },
    {
      label: 'second',
    },
    {
      label: 'third',
    },
    {
      label: 'forth',
    },
    {
      label: 'fifth',
    },
  ]

  return (
    <Stepper
      activeStep={activeStep}
      className={className}
      styleConfig={{
        activeBgColor: '#9b50ff',
        activeTextColor: '#ffffff',
        completedBgColor: '#4d6f0b',
        completedTextColor: '#ffffff',
        inactiveBgColor: '#e0e0e0',
        inactiveTextColor: '#ffffff',
        size: '1.5em',
        circleFontSize: '1rem',
        labelFontSize: '0.875rem',
        borderRadius: '50%',
        fontWeight: 500,
      }}
      connectorStyleConfig={{
        size: 1,
        stepSize: '2em',
        disabledColor: '#bdbdbd',
        activeColor: '#ed1d24',
        completedColor: 'a10308',
        style: 'solid',
      }}
    >
      {steps.map((step, index) => (
        <Step key={index} label={step.label} className="p-0"/>
      ))}
    </Stepper>
  )
}

export default FormStepper
