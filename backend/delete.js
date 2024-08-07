import AWS from 'aws-sdk'
const chime = new AWS.ChimeSDKMeetings({ region: 'eu-central-1' });

const deleteMeeting = async(meetingId)=>{

    const deleteResponse = await chime
        .deleteMeeting({
            MeetingId: meetingId,
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

    return {deleteResponse}
}

export default async function deleteChimeMeeting(meetingId) {
    const {deleteResponse} = await deleteMeeting(meetingId)
    return {response: deleteResponse}
}