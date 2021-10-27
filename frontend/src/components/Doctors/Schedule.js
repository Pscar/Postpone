import React, { useEffect, useState, useContext } from 'react';
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
import { getScheduleAll, getDoctorAll } from '../../services/postpone-serveice';

function Schedule() {
  const { scheduleDr, setScheduleDr, } = useContext(StoreContext)
  const [showScheduleDr] = useState(scheduleDr)
  const [saveScheduleDr, setSaveScheduleDr] = useState();
  const [rfcScheduleDr, setRfcScheduleDr] = useState();
  const [dataManger, setDataManager] = useState();
  const [doctor, setDoctor] = useState()

  const getDataManager = () => {
    getScheduleAll()
      .then(res => {
        setDataManager(res.data.data)
        getDoctorAll()
          .then((res => setDoctor(res.data.data)))
          .catch(err => console.log(err));
      })
      .catch(e => {
        console.log(e);
      });
  }
  useEffect(() => {
    getDataManager();
  }, [])

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

  // useEffect(() => {
  //   if (saveScheduleDr) {
  //     setScheduleDr([...scheduleDr, saveScheduleDr])
  //   }
  // }, [saveScheduleDr])

  return (
    <React.Fragment>
      <ScheduleComponent
        width="100%"
        height="550px"
        selectedDate={new Date()}
        ref={schedule => setRfcScheduleDr(schedule)}
        eventSettings={{
          dataSource: dataManger,
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
export default Schedule;
