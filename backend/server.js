import express from "express"
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'
import cors from "cors"
import dotenv from 'dotenv';
import "dotenv/config";
import createChimeMeeting from "./create.js";
import checkMeeting from "./checkMeeting.js";
import checkAttendee from "./checkAttendee.js";
import returnMeeting from "./returnMeeting.js";
import returnAttendee from "./returnAttendee.js";
import createChimeAttendee from "./createAttendee.js";
import checkMetadata from "./checkMetadata.js";
import updateMetadata from "./updateMetadata.js";
import deleteChimeMeeting from "./delete.js";

const app = express()
dotenv.config();
const PORT = process.env.PORT
const ORIGIN = process.env.ORIGIN

app.use(cors({
    origin: `${ORIGIN}`
}))

app.use(express.json())

app.post("/meeting/create", ClerkExpressRequireAuth(),
    async (req, res) => {
        const { username } = await req.body
        await createChimeMeeting(username).then((result) => {
            res.json({result})
        })
    }
)

app.post("/meeting/delete", ClerkExpressRequireAuth(),
    async (req, res) => {
        const { meetingId } = await req.body
        await deleteChimeMeeting(meetingId).then((result) => {
            res.json({result})
        })
    }
)

app.post("/meeting/create/attendee", ClerkExpressRequireAuth(),
    async (req, res) => {
        const { meetingId } = await req.body;
        await createChimeAttendee(meetingId).then((result) => {
            res.json({result})
        })
    }
)

app.post("/meeting/check/meeting", ClerkExpressRequireAuth(),
    async (req, res) => {
        const { meetingId } = await req.body;
        if(!meetingId){
            return res.status(400).send({status: "failed"})
        }
        const result = await checkMeeting(meetingId)
        return res.status(200).send({result})
    }
)

app.post("/meeting/check/attendee", ClerkExpressRequireAuth(),
    async (req, res) => {
        const { attendeeId, meetingId } = await req.body;
        if(!attendeeId || !meetingId){
            return res.status(400).send({status: "failed"})
        }
        const result = await checkAttendee(attendeeId, meetingId)
        return res.status(200).send({result})
    }
)

app.post("/meeting/return/meeting", ClerkExpressRequireAuth(),
    async (req, res) => {
        const { meetingId } = await req.body;
        if(!meetingId){
            return res.status(400).send({status: "failed"})
        }
        const result = await returnMeeting(meetingId)
        return res.status(200).send({result})
    }
)

app.post("/meeting/return/attendee", ClerkExpressRequireAuth(),
    async (req, res) => {
        const { attendeeId, meetingId } = await req.body;
        if(!attendeeId || !meetingId){
            return res.status(400).send({status: "failed"})
        }
        const result = await returnAttendee(attendeeId, meetingId)
        return res.status(200).send({result})
    }
)


app.post("/metadata/get", ClerkExpressRequireAuth(),
    async (req, res) => {
        const { userId } = await req.body;
        if(!userId){
            return res.status(400).send({status: "failed"})
        }
        const result = await checkMetadata(userId)
        return res.status(200).send({result})
    }
)

app.post("/metadata/update", ClerkExpressRequireAuth(),
    async (req, res) => {
        const { userId, body } = await req.body;
        if(!userId || !body){
            return res.status(400).send({status: "failed"})
        }
        const result = await updateMetadata(userId, body)
        return res.status(200).send({result})
    }
)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})