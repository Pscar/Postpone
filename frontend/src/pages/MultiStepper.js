import React, { useState, useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { StoreContext } from '../Context/Store';
import PostPoneForm from "../components/StepperForm/PostPoneForm";
import HomePage from "../components/StepperForm/HomePage";
import SubmitForm from '../components/StepperForm/SubmitForm';

import {
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import ThankYou from "../components/StepperForm/ThankYou";

import { createPostPones, getPostPonesNow, updatePostPoneById } from '../services/postpone-serveice';

export default function MultiStepper() {

  const classes = useStyles();
  const [isEditing, setEditing] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const { postPoneNow, setCreatePostPone, setPostPoneEdit, setPostPoneNow } = useContext(StoreContext)

  const methods = useForm({
    defaultValues: {
      hn: "",
      Doc_id: parseInt,
      firstname: "",
      lastname: "",
      locations: "",
      appointments: "",
      dateOld: "",
      dateNew: "",
      course: "",
      email: "",
      phone: "",
      password: "",
      confirmpassword: "",
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
    createPostPones(data)
      .then(res => {
        setCreatePostPone(res.data)
        getPostPonesNow()
          .then((res => setPostPoneNow(res.data.data)))
          .catch(err => console.log(err));
      })
      .catch(e => {
        console.log(e);
      });
  }

  const updateInformations = (postpone_id, data) => {
    updatePostPoneById(postpone_id, data)
      .then(res => {
        setPostPoneEdit(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const handleNext = (data) => {

    if (activeStep === steps.length - 1) {
      setActiveStep(activeStep + 1);

    } else if (activeStep === 1) {
      const postpone_id = postPoneNow ? postPoneNow.postpone_id : "";

      setActiveStep(activeStep + 1);
      return !isEditing ? createInformations(data)
        : updateInformations(postpone_id, data)

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
  const handleReset = () => {
    setActiveStep(0);
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
        <React.Fragment>
          <ThankYou />
          <Button variant="contained" color="primary" onClick={handleReset} className={classes.button}>
            กลับสู่หน้าหลัก
          </Button>
        </React.Fragment>

      ) : (
        <React.Fragment>
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
        </React.Fragment>
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
