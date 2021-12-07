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

import { getScheduleAll, createSchedule, updateScheduleById, deleteScheduleById } from '../../services/scheduleService';
import { getDoctorAll } from '../../services/doctorService';
import { useDispatch, useSelector } from "react-redux";

export default function DoctorSchedule() {

  const doctors = useSelector(state => state.doctors);
  const schedules = useSelector(state => state.schedules)
  const dispatch = useDispatch();

  const [rfcScheduleDr, setRfcScheduleDr] = useState();
  const [deleteScheduleDr, setDeleteScheduleDr] = useState();
  const [editScheduleDr, setEditScheduleDr] = useState();
  const [saveScheduleDr, setSaveScheduleDr] = useState([]);
  const [displayScheduleDr, setDisplayScheduleDr] = useState([]);

  const returnSchedule = React.useCallback(() => {
    dispatch(getScheduleAll());
  }, [dispatch])

  useEffect(() => {
    returnSchedule();
  }, [returnSchedule])

  const returnDoctor = React.useCallback(() => {
    dispatch(getDoctorAll());
  }, [dispatch])

  useEffect(() => {
    returnDoctor();
  }, [returnDoctor])

  const createSchedules = async (data) => {
    const createItem = await dispatch(createSchedule({
      description: data.description,
      endTime: data.endTime,
      location: data.location,
      startTime: data.startTime,
      subject: data.subject,
      doctorId: data.doctorId,
    }))
    setSaveScheduleDr(createItem)
    return createItem
  }
  const updateSchedules = async (scheduleId, data) => {
    const updateItem = await dispatch(updateScheduleById({
      scheduleId: scheduleId,
      description: data.description,
      endTime: data.endTime,
      location: data.location,
      startTime: data.startTime,
      subject: data.subject,
      doctorId: data.doctorId,
    }))
    setEditScheduleDr(updateItem)
    return updateItem
  }
  const deleteSchedule = async (scheduleId) => {
    const deleteItem = await dispatch(deleteScheduleById(scheduleId))
    setDeleteScheduleDr(deleteItem)
    return deleteItem
  }

  const onActionBegin = (args) => {
    if (args.requestType === 'eventCreate') {
      const eventData = args.addedRecords[0];
      createSchedules(eventData)
    } else if (args.requestType === "eventChange") {
      const scheduleId = args.changedRecords[0].scheduleId
      updateSchedules(scheduleId, {
        doctorId: args.changedRecords[0].doctorId,
        description: args.changedRecords[0].description,
        endTime: args.changedRecords[0].endTime,
        location: args.changedRecords[0].location,
        startTime: args.changedRecords[0].startTime,
        subject: args.changedRecords[0].subject,
      })

    } else if (args.requestType === "eventRemove") {
      const eventData = args.deletedRecords[0].scheduleId
      deleteSchedule(eventData)
    }
  }

  useEffect(() => {
    if (saveScheduleDr) {
      setDisplayScheduleDr([schedules, saveScheduleDr])
    }
  }, [saveScheduleDr])

  useEffect(() => {
    if (editScheduleDr) {
      setDisplayScheduleDr([schedules, editScheduleDr])
    }

  }, [editScheduleDr])

  useEffect(() => {
    if (deleteScheduleDr) {
      setDisplayScheduleDr([schedules, deleteScheduleDr])
    }
  }, [deleteScheduleDr])

  return (
    <React.Fragment>
      <ScheduleComponent
        width="100%"
        height="550px"
        selectedDate={new Date()}
        ref={schedule => setRfcScheduleDr(schedule)}
        eventSettings={{
          dataSource: JSON.parse(JSON.stringify(schedules)),displayScheduleDr,
          fields: {
            scheduleId: 'scheduleId',
            subject: { title: 'subject', name: 'subject' },
            location: { title: 'location', name: 'location' },
            description: { title: 'description', name: 'description' },
            startTime: { title: 'startTime', name: 'startTime' },
            endTime: { title: 'endTime', name: 'endTime' }
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
            field="doctorId"
            title="Doctor"
            name="Doctors"
            allowMultiple={true}
            dataSource={doctors}
            textField="doctorName"
            idField="doctorId"
            colorField="doctorColor"
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
