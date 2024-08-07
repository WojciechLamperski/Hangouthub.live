// create.js
import AWS from 'aws-sdk'

const chime = new AWS.ChimeSDKMeetings({ region: 'eu-central-1' });

const MeetingExists = async(meetingId)=>{
    // Retrieve Meetings list
    const meetingResult = await chime
        .getMeeting({
            MeetingId: meetingId
        })
        .promise().then(
            (data) => {
                return data.Meeting.ExternalMeetingId
            }
        ).catch(
            (err) => {
                return false
            }
        )
    return meetingResult
}

export default async function checkMeeting(meetingId) {
    let status = await MeetingExists(meetingId)
    return {status: status}
    // return {status: "PAUSE IN WORK"}
}