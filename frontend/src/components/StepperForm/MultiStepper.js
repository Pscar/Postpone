import React, { useState, useContext } from "react";
import axios from 'axios';
import { useForm, FormProvider } from "react-hook-form";
import { StoreContext } from '../../Context/Store';
import PostPoneForm from "./PostPoneForm";
import HomePage from "./HomePage";
import SubmitForm from './SubmitForm';

import {
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import ThankYou from "./ThankYou";

export default function MultiStepper() {
  const classes = useStyles();
  const [isEditing, setEditing] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const { informations, setInformation } = useContext(StoreContext)

  const methods = useForm({
    defaultValues: {
      id: informations.length + 1,
      HN: "",
      firstName: "",
      lastName: "",
      locations: "",
      appointments: "",
      MUIPickerOld: "",
      MUIPickerNew: "",
      course: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      status: "อยู่ระหว่างดำเนินการ"
    }
  });
  const getSteps = () => {
    return [
      "ขั้นตอนการเลื่อนนัด",
      "กรอกข้อมูลการเลื่อนนัด",
      "ยืนยันการเลื่อนนัด",
    ];
  }

  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };
  const isStepFalied = () => {
    return Boolean(Object.keys(methods.formState.errors).length);
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };


  const createInformations = (data) => {

    axios.post('http://localhost:5000/api/user/create', {
      email: data.email,
      password: data.password,
    }).then((res) => {
      setInformation(res.data);
    })

    axios.post('http://localhost:5000/api/postpone/create', {
      hn: data.HN,
      user_id: informations.user_id,
      firstname: data.firstName,
      lastname: data.lastName,
      locations: data.locations,
      appointments: data.appointments,
      dateOld: data.MUIPickerOld,
      dateNew: data.MUIPickerNew,
      course: data.course,
      email: data.email,
      phone: data.phone,
      password: data.password,
      confirmPassword: data.confirmPassword,
      status: data.status
    }).then((res) => {
      setInformation(res.data);
    })
  
  }
  const updateInformations = (id, data) => {
    const updateItem = informations.map((inf) => {
      return data.id === inf.id ? data : inf
    });
    setInformation(updateItem);
    console.log("update", data)
  }
  const handleNext = (data) => {
    console.log("next", data)

    if (activeStep === steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else if (activeStep === 1) {
      setActiveStep(activeStep + 1);
      return !isEditing ? createInformations(data)
        : updateInformations(data.id, data)
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    if (activeStep === 2) {
      setEditing(true)
    }
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <HomePage handleNext={handleNext} />;
      case 1:
        return <PostPoneForm />;
      case 2:
        return <SubmitForm />;
      default:
        return "unknown step";
    }
  }

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block" }}
              >
                optional
              </Typography>
            );
          }
          if (isStepFalied() && activeStep === index) {
            labelProps.error = true;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <ThankYou />
      ) : (
        <>
          <Grid item xs={12} md={12}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleNext)} className={classes.forms}>
                {getStepContent(activeStep)}

                <div className={classes.button}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    back
                  </Button>
                  {isStepOptional(activeStep) && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSkip}
                    >
                      skip
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={activeStep === 0}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>

              </form>
            </FormProvider>
          </Grid>
        </>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    display: 'flex',
    width: 'max-content',
    margin: '1rem auto',
    gap: '1rem'
  },
  forms: {
    display: 'flex',
    flexDirection: 'column',
  }
}));
