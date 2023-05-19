import MeetupDetails from '@/components/Meetups/MeetupDetails';
import { MeetupData } from '@/components/Meetups/NewMeetupForm';
import { MongoClient, ObjectId } from 'mongodb';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';

const DetailedMeetupPage = (props: { meetupData: MeetupData }) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetails
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
    // <MeetupDetails
    //   image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
    //   title="First Meetup"
    //   address="Some Street 5, Some City"
    //   description="This is a first meetup"
    // />
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://elian:jRsET6XKcQYHBokL@cluster0.sxj5kaw.mongodb.net/meetups-db?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  // get only meetups ids from the objects in db
  const meetups = await meetupsCollection.find({}, { projection: { _id: 1 } }).toArray();
  client.close();

  return {
    // fallback false will generate 404 for any other paths, not listed here. fallback true(first show empty page, then content) or blocking(only show page when rendered) will try to dynamically generate the page with info
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({ params: { meetupId: meetup._id.toString() } })),
    // [
    //   {
    //     params: {
    //       meetupId: 'm1',
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: 'm2',
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  // fetch data for a single meetup
  const meetupId = context?.params?.meetupId;

  const client = await MongoClient.connect(
    'mongodb+srv://elian:jRsET6XKcQYHBokL@cluster0.sxj5kaw.mongodb.net/meetups-db?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  // get the selected id meetup
  const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId as string) });
  client.close();

  console.log(meetupId);

  return {
    props: {
      meetupData: {
        id: selectedMeetup?._id.toString(),
        title: selectedMeetup?.title,
        address: selectedMeetup?.address,
        image: selectedMeetup?.image,
        description: selectedMeetup?.description,
      },
      // {
      //   image:
      //     'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
      //   id: meetupId as string,
      //   title: 'First Meetup',
      //   address: 'Some Street 5, Some City',
      //   description: 'This is a first meetup',
      // },
    },
  };
}

export default DetailedMeetupPage;
