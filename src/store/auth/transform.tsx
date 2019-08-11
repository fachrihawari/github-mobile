import { IUser } from './reducer';

export const transformProfile = (data: any): IUser => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    avatarUrl: data.avatar_url,
    company: data.company,
    location: data.location,
    blog: data.blog,
    bio: data.bio,
    publicRepos: data.public_repos,
    publicGists: data.public_gists,
    followers: data.followers,
    following: data.following
  };
};
