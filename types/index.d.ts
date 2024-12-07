declare type SignupParams = {
    name: string;
    email: string;
    phone: string;
    password: string;
}

declare type LoginParams ={
    email: string;
    password: string;
}

declare type User ={
    userId: string;
    name: string;
    email: string;
    phone : string;
    avatar : string;
    bio: string;
}