export class UpdateProfileDto {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
    phoneNumber?: string;
    address?: string;
    website?: string;
    socialMediaLinks?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
        youtube?: string;
        tiktok?: string;
        [key: string]: string | undefined; // For any other social media links


        // Add more social media platforms as needed
    }
}