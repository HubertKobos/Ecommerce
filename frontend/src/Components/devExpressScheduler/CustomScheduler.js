import React, { useState, useEffect } from 'react';
import  {Scheduler}  from "devextreme-react/scheduler";

import RenderAppointment from './RenderAppointmentProp';
import OnAppointmentClickForm from './OnAppointmentClickForm';


import { useDispatch, useSelector } from 'react-redux';



export default function CustomScheduler () {
  const dispatch = useDispatch() 

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showForm, setShowForm] = useState(false);

//   const appointments = useSelector(state => state.scheduler.items)

  // const {status} = useSelector(state => state.saveEventScheduler)

  useEffect(() => {
    //   dispatch(getAllSchedulerItems())
  }, [dispatch, showForm])


  const onAppointmentHandle = (e) => {
    setShowForm(true)
    setSelectedAppointment(e);
  }

  return (
    <>
      <Scheduler
        dataSource={appointments}
        height={660}
        firstDayOfWeek={1}
        startDayHour={7}
        endDayHour={22}
        onCellClick={onAppointmentHandle}
        onAppointmentClick={onAppointmentHandle}
        appointmentRender={RenderAppointment}
        // appointmentTooltipRender={RenderAppointmentTooltipProp} // dont need this unless we are rendering appointmentRender
      >
        {/* <ViewState defaultCurrentViewName="Week" /> */}
        {showForm &&  <OnAppointmentClickForm show={showForm} onHide={() => setShowForm(false)} e={selectedAppointment.appointmentData} cellDate={selectedAppointment.cellData} />}
      </Scheduler>

      
    </>
  );
};