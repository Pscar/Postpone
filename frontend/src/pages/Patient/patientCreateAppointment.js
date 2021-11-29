import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux'

import PatientSearchDrAndTimeline from "../../components/StepperForm/patientSearchDrAndTimeline";
import PatientFieldFormRegister from "../../components/StepperForm/patientFieldFormCreateAppointment";
import PatientSubmitForm from "../../components/StepperForm/patientSubmitForm";
import PatientThankYou from "../../components/StepperForm/patientThankYou";

import { createAppointment, getAppointmentNow, updateAppointmentById } from "../../services/appointmentService";

export default function PatientCreateAppointment() {

  const classes = useStyles();
  const [isEditing, setEditing] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const [editAppointment, setAppointmentEdit] = useState();

  const dispatch = useDispatch();
  const logins = useSelector((state) => state.logins.login);

  const { appointment } = useSelector((state) => state.appointment);

  const methods = useForm({
    defaultValues: {
      hn: "",
      email: logins.email,
      locations: "",
      doctor_name: "",
      dateOld: "",
      course: "",

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

  const createAppointments = async (data) => {
    const createItem = {
      email: data.email,
      hn: data.hn,
      locations: data.locations,
      doctor_name: data.doctor_name,
      dateOld: data.dateOld,
      dateNew: data.dateNew,
      course: data.course,
      status: "อยู่ระหว่างดำเนินการ"
    }
    await dispatch(createAppointment(createItem));
    return await dispatch(getAppointmentNow())
  }

  const updateAppointments = async (appointments_id, data) => {
    const updateItem = await dispatch(updateAppointmentById({
      appointments_id: appointments_id,
      hn: data.hn,
      locations: data.locations,
      doctor_name: data.doctor_name,
      dateOld: data.dateOld,
      dateNew: data.dateNew,
      course: data.course,
      status: data.status
    }));
    setAppointmentEdit(updateItem)
    return updateItem
  }

  const handleNext = (data) => {
    const appointments_id = appointment ? appointment.appointments_id : "";

    if (activeStep === steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else if (activeStep === 1) {
      setActiveStep(activeStep + 1);
      return !isEditing ? createAppointments(data)
        : updateAppointments(appointments_id, {
          appointments_id: appointments_id,
          hn: data.hn,
          locations: data.locations,
          doctor_name: data.doctor_name,
          dateOld: data.dateOld,
          dateNew: data.dateNew,
          course: data.course,
          status: data.status
        })
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
        return <PatientSearchDrAndTimeline handleNext={handleNext} />;
      case 1:
        return <PatientFieldFormRegister activeStep={activeStep} isEditing={isEditing} />;
      case 2:
        return <PatientSubmitForm editAppointment={editAppointment} />;
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
          <PatientThankYou editAppointment={editAppointment} />
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