import { formatDate } from './utils.js';

export const comments = [
    {
      name: 'Sergei_4',
      comment: 'Благодарю вас за видео',
      liked: { state: true, counter: 37 },
      date: formatDate(new Date())
    },
    {
      name: 'realgameplay1383',
      comment: 'Хорошо подобранные темы и их разбор. Спасибо',
      liked: { state: false, counter: 0 },
      date: formatDate(new Date())
    },
    {
      name: 'KonstK.Y.T',
      comment: 'В последнее время торговал мало, Я не знаю в какое время торгуются фьючерсы, но я эксперт, который вам расскажет про фьючерсы...',
      liked: { state: false, counter: 0 },
      date: formatDate(new Date())
    },
    {
      name: 'АнтонинаЗахаренкова-т3х',
      comment: 'Вы можете поделиться стратегией торговли фьючерсами',
      liked: { state: true, counter: 1 },
      date: formatDate(new Date())
    }
  ];

  export function addComment(name, commentText) {
    comments.push({
      name,
      comment: commentText,
      liked: { state: false, counter: 0 },
      date: formatDate(new Date()),
    });
  }
  
  export function toggleLike(index) {
    const comment = comments[index];
    comment.liked.state = !comment.liked.state;
    comment.liked.counter += comment.liked.state ? 1 : -1;
  }
