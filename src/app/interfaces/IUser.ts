export interface IUser {
    id: number,
    name: String,
    email: String,
    email_verified_at: null,
    phone: String,
    placesVisited: number, 
    social_media: [
        {
            github: String,
            linkedin: String,
            instagram: String
        }
    ],
}
