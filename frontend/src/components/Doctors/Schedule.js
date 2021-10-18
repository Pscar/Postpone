import React, { useEffect, useState, useContext } from 'react';
import {
  TimelineViews,
  TimelineMonth,
  Day,
  Week,
  WorkWeek,
  Month,
  Print,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Resize,
  DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { StoreContext } from '../../Context/Store';

function Schedule() {
  const { scheduleDr, setScheduleDr, ownerDrData } = useContext(StoreContext)
  const [showScheduleDr] = useState(scheduleDr)
  const [saveScheduleDr, setSaveScheduleDr] = useState();
  const [rfcScheduleDr, setRfcScheduleDr] = useState();

  const onActionBegin = (args, id) => {

    if (args.requestType === 'eventCreate') {
      const eventData = args.data[0];
      setSaveScheduleDr(eventData)
      // const eventField = rfcScheduleDr.eventFields;
      // const startDate = eventData[eventField.startTime];
      // const endDate = eventData[eventField.endTime];
      
      // if (!rfcScheduleDr.isSlotAvailable(startDate, endDate)) {
      //   args.cancel = true;
      // }
    } else if (args.requestType === "eventChange") {

    } else if (args.requestType === "eventRemove") {

    }
  }

  useEffect(() => {
    if (saveScheduleDr) {
      setScheduleDr([...scheduleDr, saveScheduleDr])
    }
  }, [saveScheduleDr])

  return (
    <React.Fragment>
      <ScheduleComponent
        width="100%"
        height="550px"
        selectedDate={new Date()}
        ref={schedule => setRfcScheduleDr(schedule)}
        eventSettings={{
          dataSource: showScheduleDr, scheduleDr,
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
          resources: ['Owners'],
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
            field="OwnerId"
            title="Owner"
            name="Owners"
            allowMultiple={true}
            dataSource={ownerDrData}
            textField="name"
            idField="Id"
            colorField="OwnerColor"
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
            Print
          ]}
        />
      </ScheduleComponent>
    </React.Fragment>
  );
}
export default Schedule;
