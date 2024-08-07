import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk'
const chime = new AWS.ChimeSDKMeetings({ region: 'eu-central-1' });

const assignValues = async(meetingId, userId)=>{

    const attendeeResponse = await chime
        .createAttendee({
            MeetingId: meetingId,
            ExternalUserId: userId, // Link the attendee to an identity managed by your application.
        })
        .promise();

    return {attendeeResponse}
}

export default async function createChimeAttendee(meetingId) {
    const {attendeeResponse} = await assignValues(meetingId, uuid())
    return {attendee: attendeeResponse};
    // return {status: "PAUSE IN WORK"}
}