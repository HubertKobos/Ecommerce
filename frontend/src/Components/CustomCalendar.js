import React, { Fragment, useMemo, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from 'react-big-calendar'
// import DemoLink from '../../src/CalendarFeatureFiles/DemoLink.component'
import events from './events'
import * as dates from "../CalendarFeatureFiles/dates"
import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'



export default function Selectable({ localizer }) {
  const mLocalizer = momentLocalizer(moment)
  const [myEvents, setEvents] = useState(events)


  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name')
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }])
      }
    },
    [setEvents]
  )

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: Date.now(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  )

  return (
    <Fragment>
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          localizer={mLocalizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
        />
      </div>
    </Fragment>
  )
}

Selectable.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}