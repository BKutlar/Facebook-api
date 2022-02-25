import * as UserModel from '../models/user.model';



export const UpdateProfile = async (request, response) => {
    const { id } = request.params;
    const { firstName, lastName } = request.body;
    // console.log('ok')
    const Profile = await UserModel.updateProfile({
        userId: id,
        firstName,
        lastName,
    });

    response.json({ profile: Profile });
};



export const deleteOne = async (request, response) => {
    const { id } = request.params;

    await UserModel.deleteOne(id);

    response.status(204).end();
}


export const getProfile = async (request, response) => {
    const { id } = request.params;
    const profile = await UserModel.getProfile(id);

    response.json({ profile })


}

export const getPost = async (request, response) => {
    const { id } = request.params;
    const posts = await UserModel.getPost(id);

    response.json({ posts })
}

