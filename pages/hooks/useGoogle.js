import pb from "@/lib/pocketbase";


export default async function () {
    const authData = await pb.collection('cendrawasih_users').authWithOAuth2({ provider: 'google' });
}