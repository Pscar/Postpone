import React, { useState, useEffect, useContext } from 'react';
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
import { StoreContext } from '../../Context/Store';
import { createSchedule, updateScheduleById, deleteScheduleById } from '../../services/postpone-serveice';

export default function DoctorSchedule() {

  const { scheduleDr, setScheduleDr, doctor } = useContext(StoreContext);
  const [saveScheduleDr, setSaveScheduleDr] = useState([]);
  const [rfcScheduleDr, setRfcScheduleDr] = useState();
  const [editScheduleDr, setEditScheduleDr] = useState([]);

  const createSchedules = (data) => {
    createSchedule(data)
      .then(res => {
        setSaveScheduleDr(res.data.data)
      })
      .catch(e => {
        console.log(e);
      });
  }
  const updateSchedules = (Id, data) => {
    updateScheduleById(Id, data)
      .then(res => {
        setEditScheduleDr(data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  const DeleteSchedule = (Id) => {
    deleteScheduleById(Id)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const onActionBegin = (args) => {

    if (args.requestType === 'eventCreate') {
      const eventData = args.addedRecords[0];
      createSchedules(eventData)
      const eventField = rfcScheduleDr.eventFields;
      const startDate = eventData[eventField.startTime];
      const endDate = eventData[eventField.endTime];

      if (!rfcScheduleDr.isSlotAvailable(startDate, endDate)) {
        args.cancel = true;
      }
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
      setScheduleDr([...scheduleDr, saveScheduleDr])
    }
  }, [saveScheduleDr])

  // useEffect(() => {
  //   console.log("🚀 ~ file: Schedule.js ~ line 131 ~ Schedule ~ editScheduleDr", editScheduleDr)
  // }, [editScheduleDr])

  return (
    <React.Fragment>
      <ScheduleComponent
        width="100%"
        height="550px"
        selectedDate={new Date()}
        ref={schedule => setRfcScheduleDr(schedule)}
        eventSettings={{
          dataSource: scheduleDr,
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
        currentView="TimelineDay"
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
            dataSource={doctor}
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