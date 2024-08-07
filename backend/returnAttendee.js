// create.js
import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk'

const chime = new AWS.ChimeSDKMeetings({ region: 'eu-central-1' });

const getAttendee = async(attendeeId, meetingId)=>{
    // Retrieve Meetings list
    const attendeeDetails = await chime
        .getAttendee({
            MeetingId: meetingId,
            AttendeeId: attendeeId,
        })
        .promise().then(
            (data) => {
                return data
            }
        ).catch(
            (err) => {
                return false
            }
        )
    return {attendeeDetails}
}

export default async function returnAttendee(attendeeId, meetingId) {
    let {attendeeDetails} = await getAttendee(attendeeId, meetingId)
    if(attendeeDetails){
        return {details: attendeeDetails}
    }
    else{
        return {details: "NOT FOUND"}
    }
    // return {status: "PAUSE IN WORK"}
}