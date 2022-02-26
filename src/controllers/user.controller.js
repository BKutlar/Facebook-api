import * as UserModel from '../models/user.model';
import base64url from "base64url";
import { ErrorBadRequest } from '../errors/BadRequest.error';
import { ErrorNotFound } from '../errors/NotFound.error';


export const UpdateProfile = async (request, response) => {
    const { id } = request.params;
    const { firstName, lastName } = request.body;
    if(!firstName || !lastName) throw new ErrorBadRequest();
    const Profile = await UserModel.updateProfile({
        userId: id,
        firstName,
        lastName,
    });

    response.json({ profile: Profile });
};



export const deleteOne = async (request, response) => {
    const { id } = (request.params);

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
};


export const paginateKeyset = async (request, response) => {
    const { API_URL = 'http://localhost:8081/api/v1/users' } = process.env;
  
    const { cursor = '' } = request.query;
    const limit = parseInt(request.query.limit || '5');
  
    const users = await UserModel.findMany({
      skip: (cursor === '') ? 0 : 1,
      cursor: (cursor === '') ? null: JSON.parse(base64url.decode(cursor)),
      limit,
    });
  
    const nextCursor = users[users.length - 1].cursor;
  
    const next = `${API_URL}/v1/articles?cursor=${nextCursor}&limit=${Math.abs(limit)}`;
    const previous = `${API_URL}/v1/articles?cursor=${cursor}&limit=${-limit}`;
  
    response
      .status(200)
      .json({
        data: { users },
        links: {
          next,
          previous,
        },
      });
  }
  
  