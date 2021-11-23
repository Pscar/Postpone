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

import UserSearchDrAndTimeline from "../../components/StepperForm/userSearchDrAndTimeline";
import UserFieldFormRegister from "../../components/StepperForm/userFieldFormRegister";
import UserSubmitForm from "../../components/StepperForm/userSubmitForm";
import UserThankYou from "../../components/StepperForm/userThankYou";

import { createPostPone, getPostPoneNow, updatePostPoneById } from "../../services/postpone-redux";

export default function UserRegister() {

  const classes = useStyles();
  const [isEditing, setEditing] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const [editPostPone, setPostPoneEdit] = useState();
  console.log("🚀 ~ file: userRegister.js ~ line 29 ~ UserRegister ~ editPostPone", editPostPone)

  const dispatch = useDispatch();
  const { postpones } = useSelector((state) => state.postpones);

  const methods = useForm({
    defaultValues: {
      hn: "",
      firstname: "",
      lastname: "",
      locations: "",
      appointments: "",
      dateOld: "",
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

  const createUserPostPone = async (data) => {
    const createItem = {
      hn: data.hn,
      firstname: data.firstname,
      lastname: data.lastname,
      locations: data.locations,
      appointments: data.appointments,
      dateOld: data.dateOld,
      dateNew: data.dateNew,
      course: data.course,
      email: data.email,
      phone: data.phone,
      password: data.password,
      confirmpassword: data.confirmpassword,
      status: "อยู่ระหว่างดำเนินการ"
    }
    await dispatch(createPostPone(createItem));
    return await dispatch(getPostPoneNow())
  }

  const updateUserPostPone = async (postpone_id, data) => {
    // send data to redux toolkit
    const updateItem = await dispatch(updatePostPoneById({
      postpone_id: postpone_id,
      hn: data.hn,
      firstname: data.firstname,
      lastname: data.lastname,
      locations: data.locations,
      appointments: data.appointments,
      dateOld: data.dateOld,
      dateNew: data.dateNew,
      course: data.course,
      email: data.email,
      phone: data.phone,
      password: data.password,
      confirmpassword: data.confirmpassword,
      status: "อยู่ระหว่างดำเนินการ"
    }));
    setPostPoneEdit(updateItem)
    return updateItem
  }

  const handleNext = (data) => {
  console.log("🚀 ~ file: userRegister.js ~ line 115 ~ handleNext ~ data", data)
    const postpone_id = postpones ? postpones.postpone_id : "";

    if (activeStep === steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else if (activeStep === 1) {
      setActiveStep(activeStep + 1);
      // แก้ไขข้อมูลในส่วนของ frontend
      return !isEditing ? createUserPostPone(data)
        : updateUserPostPone(postpone_id, {
          postpone_id: postpone_id,
          hn: data.hn,
          firstname: data.firstname,
          lastname: data.lastname,
          locations: data.locations,
          appointments: data.appointments,
          dateOld: data.dateOld,
          dateNew: data.dateNew,
          course: data.course,
          email: data.email,
          phone: data.phone,
          password: data.password,
          confirmpassword: data.confirmpassword,
          status: "อยู่ระหว่างดำเนินการ"
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
        return <UserSearchDrAndTimeline handleNext={handleNext} />;
      case 1:
        return <UserFieldFormRegister activeStep={activeStep} isEditing={isEditing} />;
      case 2:
        return <UserSubmitForm editPostPone={editPostPone} />;
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
          <UserThankYou editPostPone={editPostPone} />
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
