import { faker } from "@faker-js/faker";
let userList: any = [];

for (let i = 0; i < 100; i++) {
  const user = {
    UserId: faker.string.uuid(),
    UserName: faker.person.fullName(),
    InterlandId: faker.number.int(),
  };
  userList.push(user);
}

export default {
  data: {
    UserList: userList,
  },
  ElapsedMilliSeconds: 156,
  ResultMessage: "İşlem başarılı.",
  IsSuccess: true,
  ValidationErrors: null,
};
