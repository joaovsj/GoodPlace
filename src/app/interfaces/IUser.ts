export interface IUser {
    id: number,
    name: String,
    email: String,
    email_verified_at: null,
    phone: String,
    public_token: string,

    placesVisited: number,
    comments: number,   
    image: string,

    social_media: [] | undefined | any,

    created_at: String;
    updated_at: String;
}
