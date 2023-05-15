import React from 'react';
import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

interface Meetup {
  id: string;
  image: string;
  title: string;
  address: string;
}

interface MeetupListProps {
  meetups: Meetup[];
}

const MeetupList: React.FC<MeetupListProps> = (props) => {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
};

export default MeetupList;
