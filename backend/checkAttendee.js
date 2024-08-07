// create.js
import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk'

const chime = new AWS.ChimeSDKMeetings({ region: 'eu-central-1' });

const meetingExists = async(meetingId)=>{
    // Retrieve Meetings list
    const meetingsResult = await chime
        .getMeeting({
            MeetingId: meetingId
        })
        .promise().then(
            (data) => {
                return true
            }
        ).catch(
            (err) => {
                return false
            }
        )
    return !!meetingsResult
}

export default async function checkAttendee(meetingId) {
    let status = await meetingExists(meetingId)
    return {status: status}
    // return {status: "PAUSE IN WORK"}
}