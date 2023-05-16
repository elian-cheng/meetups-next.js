import React from 'react';
import classes from './MeetupDetails.module.css';
import { MeetupData } from './NewMeetupForm';

const MeetupDetails: React.FC<MeetupData> = (props) => {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetupDetails;
