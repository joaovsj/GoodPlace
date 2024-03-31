export interface IUser {
    id: number,
    name: String,
    email: String,
    email_verified_at: null,
    phone: String,

    placesVisited: number,
    comments: number,

    social_media: [] | undefined | any,

    created_at: String;
    updated_at: String;
}
