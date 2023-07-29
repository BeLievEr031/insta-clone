
export interface IUser {
    avatar: string;
    name: string;
    bio: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    email: string;
    password: string;
    otp: string;
    otpExpiry: Date;
    dob: Date;
}