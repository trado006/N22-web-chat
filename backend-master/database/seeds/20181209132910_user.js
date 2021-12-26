const userStatusEnum = require('../../app/enums/userStatus');
const bcryprt = require('bcryptjs');
let password = bcryprt.hashSync('123456');
exports.seed = async (knex) => {
  await knex('users').insert([{
    email: 'user1@gmail.com',
    full_name: 'bot 1',
    gender: 1,
    mssv: 20180001,
    birthday: '2000/03/02',
    province: 'Thành phố  Hà Nội',
    district: 'Đông Anh',
    status: userStatusEnum.ACTIVE,

    avatar_url: '',
    slogan: 'Trói em bằng cà vạt',
    location: '....',
    password,
  }, {
    email: 'user2@gmail.com',
    full_name: 'bot 2',
    gender: 1,
    mssv: 20180002,
    birthday: '2000/03/02',
    province: 'Thành phố  Hà Nội',
    district: 'Đông Anh',
    status: userStatusEnum.ACTIVE,

    avatar_url: '',
    slogan: 'Trói em bằng cà vạt',
    location: '....',
    password,
  }, {
    email: 'user3@gmail.com',
    full_name: 'bot 3',
    gender: 1,
    mssv: 20180003,
    birthday: '2000/03/02',
    province: 'Thành phố  Hà Nội',
    district: 'Đông Anh',
    status: userStatusEnum.ACTIVE,

    avatar_url: '',
    slogan: 'Trói em bằng cà vạt',
    location: '....',
    password,
  }, {
    email: 'user4@gmail.com',
    full_name: 'bot 4',
    gender: 1,
    mssv: 20180004,
    birthday: '2000/03/02',
    province: 'Thành phố  Hà Nội',
    district: 'Đông Anh',
    status: userStatusEnum.ACTIVE,

    avatar_url: '',
    slogan: 'Trói em bằng cà vạt',
    location: '....',
    password,
  }, {
    email: 'user5@gmail.com',
    full_name: 'bot 5',
    gender: 1,
    mssv: 20180005,
    birthday: '2000/03/02',
    province: 'Thành phố  Hà Nội',
    district: 'Đông Anh',
    status: userStatusEnum.ACTIVE,

    avatar_url: '',
    slogan: 'Trói em bằng cà vạt',
    location: '....',
    password,
  }, {
    email: 'user6@gmail.com',
    full_name: 'bot 6',
    gender: 1,
    mssv: 20180006,
    birthday: '2000/03/02',
    province: 'Thành phố  Hà Nội',
    district: 'Đông Anh',
    status: userStatusEnum.ACTIVE,

    avatar_url: '',
    slogan: 'Trói em bằng cà vạt',
    location: '....',
    password,
  }, {
    email: 'user7@gmail.com',
    full_name: 'bot 1',
    gender: 1,
    mssv: 20180007,
    birthday: '2000/03/02',
    province: 'Thành phố  Hà Nội',
    district: 'Đông Anh',
    status: userStatusEnum.ACTIVE,

    avatar_url: '',
    slogan: 'Trói em bằng cà vạt',
    location: '....',
    password,
  },
  ]);
};