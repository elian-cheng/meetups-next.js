import MeetupList, { MeetupListProps } from '@/components/Meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
// import { GetServerSidePropsContext } from 'next';

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A First Meetup',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Some address 5, 12345 Some City',
//     description: 'This is a first meetup!',
//   },
//   {
//     id: 'm2',
//     title: 'A Second Meetup',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Some address 10, 12345 Some City',
//     description: 'This is a second meetup!',
//   },
// ];

const HomePage = (props: MeetupListProps) => {
  return (
    <>
      <Head>
        <title>Meetups Next.js</title>
        <meta name="description" content="Browse a huge list of active React meetups!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// SSR (regenerating the page for every incoming request on the server)
// use only if you need access to req and res objects
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// The faster way, the page can be cached and reused, instead of SSR regenerating it every few sec
export async function getStaticProps() {
  // fetch data from an API for prerendering, SSG

  const client = await MongoClient.connect(
    'mongodb+srv://elian:jRsET6XKcQYHBokL@cluster0.sxj5kaw.mongodb.net/meetups-db?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      // meetups: DUMMY_MEETUPS,
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // makes next.js to regenerate initial build data for frequently updated pages not only in the build process, but every 1hour for requested page
    revalidate: 3600,
  };
}

export default HomePage;
