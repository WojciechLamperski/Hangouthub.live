import { clerkClient } from '@clerk/clerk-sdk-node';

export default async function checkMetadata(userId) {

    const response = await clerkClient.users.getUser(userId)

    return {metadata: response.privateMetadata}
}