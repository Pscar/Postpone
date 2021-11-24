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

import { getScheduleAll, createSchedule, updateScheduleById, deleteScheduleById } from '../../services/schedule-redux';
import { getDoctorAll } from '../../services/doctor-redux';
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
  console.log("🚀 ~ file: doctorSchedule.js ~ line 35 ~ DoctorSchedule ~ displayScheduleDr", displayScheduleDr)

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
      endtime: data.endtime,
      location: data.location,
      starttime: data.starttime,
      subject: data.subject,
      doc_id: data.doc_id,
    }))
    setSaveScheduleDr(createItem)
    return createItem
  }
  const updateSchedules = async (id, data) => {
    const updateItem = await dispatch(updateScheduleById({
      id: id,
      description: data.description,
      endtime: data.endtime,
      location: data.location,
      starttime: data.starttime,
      subject: data.subject,
      doc_id: data.doc_id,
    }))
    setEditScheduleDr(updateItem)
    return updateItem
  }
  const DeleteSchedule = async (id) => {
    const deleteItem = await dispatch(deleteScheduleById(id))
    setDeleteScheduleDr(deleteItem)
    return deleteItem
  }

  const onActionBegin = (args) => {
    if (args.requestType === 'eventCreate') {
      const eventData = args.addedRecords[0];
      createSchedules(eventData)
    } else if (args.requestType === "eventChange") {
      const id = args.changedRecords[0].id
      updateSchedules(id, {
        doc_id: args.changedRecords[0].doc_id,
        description: args.changedRecords[0].description,
        endtime: args.changedRecords[0].endtime,
        location: args.changedRecords[0].location,
        starttime: args.changedRecords[0].starttime,
        subject: args.changedRecords[0].subject,
      })

    } else if (args.requestType === "eventRemove") {
      const eventData = args.deletedRecords[0].id
      DeleteSchedule(eventData)
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
          dataSource: JSON.parse(JSON.stringify(schedules)), displayScheduleDr,
          fields: {
            id: 'id',
            subject: { title: 'subject', name: 'subject' },
            location: { title: 'location', name: 'location' },
            description: { title: 'description', name: 'description' },
            startTime: { title: 'starttime', name: 'starttime' },
            endTime: { title: 'endtime', name: 'endtime' }
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
            field="doc_id"
            title="Doctor"
            name="Doctors"
            allowMultiple={true}
            dataSource={doctors}
            textField="doctor_name"
            idField="doc_id"
            colorField="doc_color"
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
