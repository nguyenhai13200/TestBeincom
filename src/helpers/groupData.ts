import moment from 'moment';

export const groupData = (data: Array<any>) => {
  return data.reduce((acc, todo) => {
    const date = moment(todo.timeStart).format('DD-MM-YYYY');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(todo);
    return acc;
  }, {});
};
