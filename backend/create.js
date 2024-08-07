// create.js
import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk'
const chime = new AWS.ChimeSDKMeetings({ region: 'eu-central-1' });

const assignValues = async(token, meetingId, userId)=>{

    const meetingResponse = await chime
        .createMeeting({
            ClientRequestToken: token,
            ExternalMeetingId: meetingId,
            MediaRegion: 'eu-central-1', // Specify the region in which to create the meeting.
        })
        .promise();

    const attendeeResponse = await chime
        .createAttendee({
            MeetingId: meetingResponse.Meeting.MeetingId,
            ExternalUserId: userId, // Link the attendee to an identity managed by your application.
        })
        .promise();

    return {meetingResponse, attendeeResponse}
}

export default async function createChimeMeeting(username) {
    const {meetingResponse, attendeeResponse} = await assignValues(uuid(), username, username)
    return {meeting: meetingResponse, attendee: attendeeResponse};
    // return {status: "PAUSE IN WORK"}
}