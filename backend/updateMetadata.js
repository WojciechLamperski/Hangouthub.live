import { clerkClient } from '@clerk/clerk-sdk-node';

export default async function updateMetadata(userId, update) {

    const response = await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata:{
            "Meeting": update
        }
    })

    return {metadata: response.privateMetadata}
}