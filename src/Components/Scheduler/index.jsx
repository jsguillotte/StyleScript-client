import React, { useState, useEffect, useContext } from "react";
import { styled, darken, alpha, lighten } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import classNames from "clsx";
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  Resources,
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";
import WbSunny from "@mui/icons-material/WbSunny";
import FilterDrama from "@mui/icons-material/FilterDrama";
import Opacity from "@mui/icons-material/Opacity";
import ColorLens from "@mui/icons-material/ColorLens";
import axios from "axios";

const PREFIX = "Demo";

const classes = {
  cell: `${PREFIX}-cell`,
  content: `${PREFIX}-content`,
  text: `${PREFIX}-text`,
  sun: `${PREFIX}-sun`,
  cloud: `${PREFIX}-cloud`,
  rain: `${PREFIX}-rain`,
  sunBack: `${PREFIX}-sunBack`,
  cloudBack: `${PREFIX}-cloudBack`,
  rainBack: `${PREFIX}-rainBack`,
  opacity: `${PREFIX}-opacity`,
  appointment: `${PREFIX}-appointment`,
  apptContent: `${PREFIX}-apptContent`,
  flexibleSpace: `${PREFIX}-flexibleSpace`,
  flexContainer: `${PREFIX}-flexContainer`,
  tooltipContent: `${PREFIX}-tooltipContent`,
  tooltipText: `${PREFIX}-tooltipText`,
  title: `${PREFIX}-title`,
  icon: `${PREFIX}-icon`,
  circle: `${PREFIX}-circle`,
  textCenter: `${PREFIX}-textCenter`,
  dateAndTitle: `${PREFIX}-dateAndTitle`,
  titleContainer: `${PREFIX}-titleContainer`,
  container: `${PREFIX}-container`,
};

const getBorder = (theme) =>
  `1px solid ${
    theme.palette.mode === "light"
      ? lighten(alpha(theme.palette.divider, 1), 0.88)
      : darken(alpha(theme.palette.divider, 1), 0.68)
  }`;

const DayScaleCell = (props) => (
  <MonthView.DayScaleCell
    {...props}
    style={{ textAlign: "center", fontWeight: "bold" }}
  />
);

const StyledOpacity = styled(Opacity)(() => ({
  [`&.${classes.rain}`]: {
    color: "#4FC3F7",
  },
}));
const StyledWbSunny = styled(WbSunny)(() => ({
  [`&.${classes.sun}`]: {
    color: "#FFEE58",
  },
}));
const StyledFilterDrama = styled(FilterDrama)(() => ({
  [`&.${classes.cloud}`]: {
    color: "#90A4AE",
  },
}));

// Table (Calendar) Styling
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    color: "#78909C!important",
    position: "relative",
    userSelect: "none",
    verticalAlign: "top",
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    "&:first-of-type": {
      borderLeft: "none",
    },
    "&:last-child": {
      paddingRight: 0,
    },
    "tr:last-child &": {
      borderBottom: "none",
      
    },
    "&:hover": {
      backgroundColor: "white",
      color: "gray"
    },
    "&:focus": {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
      backgroundColor: 'gray',
      outline: 0,
    },
  },
  [`&.${classes.sunBack}`]: {
    backgroundColor: "#ECEFF1",
  },
  [`&.${classes.cloudBack}`]: {
    backgroundColor: "#ECEFF1",
  },
  [`&.${classes.rainBack}`]: {
    backgroundColor: "#ECEFF1",
  },
  [`&.${classes.opacity}`]: {
    opacity: "0.5",
  },
}));
const StyledDivText = styled("div")(() => ({
  [`&.${classes.text}`]: {
    padding: "0.5em",
    textAlign: "center",
  },
}));
const StyledDivContent = styled("div")(() => ({
  [`&.${classes.content}`]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
  },
}));

const StyledAppointmentsAppointment = styled(Appointments.Appointment)(() => ({
  [`&.${classes.appointment}`]: {
    borderRadius: "10px",
    "&:hover": {
      opacity: 0.6,
      backgroundColor: "#8c6677",
    },
    backgroundColor: '#685185',
    
  },
}));

const StyledToolbarFlexibleSpace = styled(Toolbar.FlexibleSpace)(() => ({
  [`&.${classes.flexibleSpace}`]: {
    flex: "none",
    
  },
  [`& .${classes.flexContainer}`]: {
    display: "flex",
    alignItems: "center",
    
  },
}));
const StyledAppointmentsAppointmentContent = styled(
  Appointments.AppointmentContent
)(() => ({
  [`&.${classes.apptContent}`]: {
    "&>div>div": {
      whiteSpace: "normal !important",
      lineHeight: 1.2,
      
      
    },
  },
}));

// const WeatherIcon = ({ id }) => {
//   switch (id) {
//     case 0:
//       return <StyledOpacity className={classes.rain} fontSize="large" />;
//     case 1:
//       return <StyledWbSunny className={classes.sun} fontSize="large" />;
//     case 2:
//       return <StyledFilterDrama className={classes.cloud} fontSize="large" />;
//     default:
//       return null;
//   }
// };

const CellBase = React.memo(({ startDate, formatDate, otherMonth }) => {
  const iconId = Math.abs(Math.floor(Math.sin(startDate.getDate()) * 10) % 3);
  const isFirstMonthDay = startDate.getDate() === 1;
  const formatOptions = isFirstMonthDay
    ? { day: "numeric", month: "long" }
    : { day: "numeric" };
  return (
    <StyledTableCell
      tabIndex={0}
      className={classNames({
        [classes.cell]: true,
        [classes.rainBack]: iconId === 0,
        [classes.sunBack]: iconId === 1,
        [classes.cloudBack]: iconId === 2,
        [classes.opacity]: otherMonth,
      })}
    >
      <StyledDivContent className={classes.content}>
        {/* <WeatherIcon classes={classes} id={iconId} /> */}
      </StyledDivContent>
      <StyledDivText className={classes.text}>
        {formatDate(startDate, formatOptions)}
      </StyledDivText>
    </StyledTableCell>
  );
});

const TimeTableCell = CellBase;

const Appointment = ({ ...restProps }) => (
  <StyledAppointmentsAppointment
    {...restProps}
    className={classes.appointment}
  />
);

const AppointmentContent = ({ ...restProps }) => (
  <StyledAppointmentsAppointmentContent
    {...restProps}
    className={classes.apptContent}
  />
);

const FlexibleSpace = ({ ...restProps }) => (
  <StyledToolbarFlexibleSpace {...restProps} className={classes.flexibleSpace}>
    <div className={classes.flexContainer}>
      {/*  <ColorLens fontSize="large" htmlColor="#FF7043" />*/}
      <Typography variant="h5" style={{ marginLeft: "10px" }}></Typography>
    </div>
  </StyledToolbarFlexibleSpace>
);

function MonthScheduler() {
  const [data, setData] = useState([]);

  const today = Date.now();

  useEffect(() => {
    async function getData() {
      const API_URL = "https://style-script.onrender.com";
      // const API_URL = "http://localhost:5005";
      const storedToken = localStorage.getItem("authToken");
      const response = await axios.get(`${API_URL}/api/calendar-clothing`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const clothingSchedulers = response.data;
      setData(clothingSchedulers);
    }
    getData();
  }, []);

  const sendCalendar = async (data) => {
    const API_URL = "https://style-script.onrender.com";
    // const API_URL = "http://localhost:5005";
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      const requestBody = { data };
      await axios.post(`${API_URL}/api/update-calendar`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
    }
  };

  const deleteCalendarEntry = async (schedulerId) => {
    const API_URL = "https://style-script.onrender.com";
    // const API_URL = "http://localhost:5005";
    const storedToken = localStorage.getItem("authToken");

    try {
      if (storedToken) {
        await axios.delete(`${API_URL}/api/calendar-clothing/${schedulerId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
      }
    } catch (error) {
      console.error("Error deleting calendar entry:", error);
      // Handle error as needed
    }
  };

  function commitChanges({ added, changed, deleted }) {
    let newData;
    if (added) {
      const startingAddedId =
        data.length > 0 ? data[data.length - 1]._id + 1 : 0;
      newData = [...data, { id: startingAddedId, ...added }];
    }
    if (changed) {
      newData = data.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
    }
    if (deleted !== undefined) {
      newData = data.filter((appointment) => appointment.id !== deleted);
      let deletedOne = data.find((appointment) => appointment.id === deleted);
      deleteCalendarEntry(deletedOne._id);
    }
    setData(newData);
    sendCalendar(newData);
  }

  return (
    <Paper>
      <Scheduler data={data}>
        <EditingState onCommitChanges={commitChanges} />
        <ViewState defaultCurrentDate={today} />

        <MonthView
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
        />
        <Appointments
          appointmentComponent={Appointment}
          appointmentContentComponent={AppointmentContent}
        />
        <Toolbar flexibleSpaceComponent={FlexibleSpace} />
        <DateNavigator />
        <EditRecurrenceMenu />
        <AppointmentTooltip showCloseButton showDeleteButton showOpenButton />
        <AppointmentForm />
        <DragDropProvider/>
      </Scheduler>
    </Paper>
  );
}

export default MonthScheduler;
