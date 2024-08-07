// create.js
import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk'

const chime = new AWS.ChimeSDKMeetings({ region: 'eu-central-1' });

const getMeeting = async(meetingId)=>{
    // Retrieve Meetings list
    const meetingsDetails = await chime
        .getMeeting({
            MeetingId: meetingId
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
    return {meetingsDetails}
}

export default async function returnMeeting(meetingId) {
    let {meetingsDetails} = await getMeeting(meetingId)
    if(meetingsDetails){
        return {details: meetingsDetails}
    }
    else{
        return {details: "NOT FOUND"}
    }
    // return {status: "PAUSE IN WORK"}
}