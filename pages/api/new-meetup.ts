// /api/new-meetup

import { MeetupData } from '@/components/Meetups/NewMeetupForm';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body as MeetupData;
    // const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      'mongodb+srv://elian:jRsET6XKcQYHBokL@cluster0.sxj5kaw.mongodb.net/meetups-db?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: 'Meetup inserted!' });
  }
}
