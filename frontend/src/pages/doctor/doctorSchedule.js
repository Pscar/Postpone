import React, { useState, useEffect } from 'react';
import {
  Day,
  Week,
  WorkWeek,
  Month,
  Print,
  DragAndDrop,
  Resize,
  Inject,
  TimelineViews,
  TimelineMonth,

  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourceDirective,
  ResourcesDirective
} from '@syncfusion/ej2-react-schedule';

import { getScheduleAll, getDoctorAll, createSchedule, updateScheduleById, deleteScheduleById } from '../../services/redux-service';
import { useDispatch, useSelector } from "react-redux";

export default function DoctorSchedule() {

  const doctors = useSelector(state => state.doctors);
  const schedules = useSelector(state => state.schedules)
  const dispatch = useDispatch();

  const [rfcScheduleDr, setRfcScheduleDr] = useState();

  const [saveScheduleDr, setSaveScheduleDr] = useState([]);
  const [displaySchedule, setDisplayScheduleDr] = useState([]);

  const getScheduleAllUseCallback = React.useCallback(() => {
    dispatch(getScheduleAll());
  }, [dispatch])

  useEffect(() => {
    getScheduleAllUseCallback()
  }, [getScheduleAllUseCallback])

  const getDoctorAllUseCallback = React.useCallback(() => {
    dispatch(getDoctorAll());
  }, [dispatch])

  useEffect(() => {
    getDoctorAllUseCallback()
  }, [getDoctorAllUseCallback])

  const createSchedules = async (data) => {
    return await dispatch(createSchedule({
      Description: data.Description,
      EndTime: data.EndTime,
      Location: data.Location,
      locations: data.locations,
      StartTime: data.StartTime,
      Subject: data.Subject,
      Doc_id: data.Doc_id,
    }))
  }
  const updateSchedules = async (Id, data) => {
    return await dispatch(updateScheduleById({
      Id: Id,
      Description: data.Description,
      EndTime: data.EndTime,
      Location: data.Location,
      locations: data.locations,
      StartTime: data.StartTime,
      Subject: data.Subject,
      Doc_id: data.Doc_id,
    }))
    // setEditScheduleDr(updateItem)
    // return updateItem
  }
  const DeleteSchedule = async (Id) => {
    return await dispatch(deleteScheduleById(Id))
  }
  const onActionBegin = (args) => {

    if (args.requestType === 'eventCreate') {
      const eventData = args.addedRecords[0];
      createSchedules(eventData)
      // const eventField = rfcScheduleDr.eventFields;
      // const startDate = eventData[eventField.startTime];
      // const endDate = eventData[eventField.endTime];

      // if (!rfcScheduleDr.isSlotAvailable(startDate, endDate)) {
      //   args.cancel = true;
      // }
    } else if (args.requestType === "eventChange") {
      const Id = args.changedRecords[0].Id

      updateSchedules(Id, {
        Description: args.changedRecords[0].Description,
        EndTime: args.changedRecords[0].EndTime,
        Location: args.changedRecords[0].Location,
        locations: args.changedRecords[0].locations,
        StartTime: args.changedRecords[0].StartTime,
        Doc_id: args.changedRecords[0].Doc_id,
        Subject: args.changedRecords[0].Subject,

      })

    } else if (args.requestType === "eventRemove") {
      const eventData = args.deletedRecords[0]
      DeleteSchedule(eventData.Id)
    }
  }

  useEffect(() => {
    if (saveScheduleDr) {
      setDisplayScheduleDr([schedules, saveScheduleDr])
    }
    console.log("save")
  }, [saveScheduleDr])

  // useEffect(() => {
  //   if (editScheduleDr) {
  //     console.log("if edit")
  //     setDisplayScheduleDr([schedules, editScheduleDr])
  //   }
  //   console.log("Edit")
  // }, [editScheduleDr])

  return (
    <React.Fragment>
      <ScheduleComponent
        width="100%"
        height="550px"
        selectedDate={new Date()}
        ref={schedule => setRfcScheduleDr(schedule)}
        eventSettings={{
          dataSource: JSON.parse(JSON.stringify(schedules)), displaySchedule,
          fields: {
            id: 'Id',
            subject: { title: 'Summary', name: 'Subject' },
            location: { title: 'Location', name: 'Location' },
            description: { title: 'Comments', name: 'Description' },
            startTime: { title: 'From', name: 'StartTime' },
            endTime: { title: 'To', name: 'EndTime' }
          },
          allowAdding: true,
          enableTooltip: true
        }}
        actionBegin={onActionBegin}
        firstDayOfWeek={1}
        group={{
          byDate: false,
          resources: ['Doctors'],
          enableCompactView: false
        }}
        currentView="Day"
      >
        <ViewsDirective>
          <ViewDirective option="TimelineDay" />
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="WorkWeek" />
          <ViewDirective option="Month" />
        </ViewsDirective>
        <ResourcesDirective>
          <ResourceDirective
            field="Doc_id"
            title="Doctor"
            name="Doctors"
            allowMultiple={true}
            dataSource={doctors}
            textField="name"
            idField="Doc_id"
            colorField="DocColor"
          />
        </ResourcesDirective>
        <Inject
          services={[
            Day,
            Week,
            WorkWeek,
            Month,
            TimelineViews,
            TimelineMonth,
            DragAndDrop,
            Resize,
            Print,
          ]}
        />
      </ScheduleComponent>
    </React.Fragment>
  );
}
