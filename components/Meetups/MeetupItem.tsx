import { useRouter } from 'next/router';
import React from 'react';
import Card from '../UI/Card';
import classes from './MeetupItem.module.css';
import { Meetup } from './MeetupList';

const MeetupItem: React.FC<Meetup> = (props) => {
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push('/' + props.id);
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
};

export default MeetupItem;
