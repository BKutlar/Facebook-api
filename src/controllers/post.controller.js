import * as PostModel from '../models/post.model';
import base64url from 'base64url';
import { ErrorBadRequest } from '../errors/BadRequest.error';
import { ErrorNotFound } from '../errors/NotFound.error';

export const CreatePostDto = async ({ body, user }, response) => {
  const { message } = body;
  if(!message) throw new ErrorBadRequest(); 
  const post = await PostModel.createOne({
    message,
    authorId: user.id,
  });
  response
    .status(201)
    .json({ data: { post } });
}

export const findById = async (request, response) => {
  const id = Number(request.params.id);
  const post = await PostModel.findById(id);
  if(!post) throw new ErrorNotFound();
  response
  .status(200)
  .json({ post, });
}


export const findAll = async (_request, response) => {
  response.json({
    posts: await PostModel.findAll(),
  });
}

export const UpdatePostDto = async (request, response) => {

  const { id } = request.params;
  const { message } = request.body;
  if(!message) throw new ErrorBadRequest();
  const post = await PostModel.updateOne({

    id: Number(id),
    message,

  });

  response.json({ post })
}


export const deleteOne = async (request, response) => {
  const id = Number(request.params.id);

  await PostModel.deleteOne(id);

  response.status(204).end();
}

