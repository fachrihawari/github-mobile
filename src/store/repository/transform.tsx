import { ICommit } from './reducer';

export const transformCommit = (data: any): ICommit => {
  const hasAuthor = !!data.author;

  const rawMessage = data.commit.message.split('\n\nSummary:\n');
  const message = rawMessage.length > 0 ? rawMessage[0] : data.commit.message;

  return {
    sha: data.sha,
    date: new Date(data.commit.author.date),
    message,
    authorName: data.commit.author.name,
    authorEmail: data.commit.author.email,
    authorUsername: hasAuthor ? data.author.login : '',
    authorAvatarUrl: hasAuthor
      ? data.author.avatar_url
      : 'https://camo.githubusercontent.com/0210235b9346f6c92bc22d6f5abeee5b83dffe7f/68747470733a2f2f302e67726176617461722e636f6d2f6176617461722f66306539623462336437626236303863646235306437396530666666333735613f643d68747470732533412532462532466769746875622e6769746875626173736574732e636f6d253246696d6167657325324667726176617461727325324667726176617461722d757365722d3432302e706e6726723d6726733d3430',
    authorUrl: hasAuthor ? data.author.url : ''
  };
};
