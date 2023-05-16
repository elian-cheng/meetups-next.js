import NewMeetupForm, { MeetupData } from '@/components/Meetups/NewMeetupForm';

const NewMeetupPage = () => {
  function addMeetupHandler(enteredMeetupData: MeetupData) {
    console.log(enteredMeetupData);
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;
