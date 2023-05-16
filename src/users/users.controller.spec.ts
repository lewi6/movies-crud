import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UsersService>(UsersService);
  });

  describe('it should create a user', () => {
    it('should create a user', () => {
      const userObj = {
        name: 'John Doe',
        age: 30,
        email: 'johndoe@example.com',
        surname: 'johny',
      };
      const user = { id: '1', ...userObj };
      jest.spyOn(userService, 'insertUser').mockReturnValue(user);

      const result = controller.insertUser(userObj);

      expect(result).toBe(user);
      expect(userService.insertUser).toHaveBeenCalledWith(userObj);
    });
  });

  describe('it should query all the users', () => {
    it('should return an array of users', () => {
      const users = [
        {
          id: '1',
          name: 'John Doe',
          surname: 'johnny',
          age: 30,
          email: 'johndoe@example.com',
        },
        {
          id: '2',
          name: 'Jane Smith',
          age: 32,
          surname: 'jeannette',
          email: 'johndoe@example.com',
        },
      ];
      jest.spyOn(userService, 'getAllUsers').mockReturnValue(users);

      const result = controller.getAllUsers();

      expect(result).toBe(users);
      expect(userService.getAllUsers).toHaveBeenCalled();
    });
  });

  describe('it should get a user by Id', () => {
    it('should return a user by id', () => {
      const userId = '1';
      const user = {
        id: userId,
        name: 'John Doe',
        age: 30,
        email: 'johndoe@example.com',
        surname: 'johnny',
      };
      jest.spyOn(userService, 'getUserById').mockReturnValue(user);

      const result = controller.getUserById(userId);

      expect(result).toBe(user);
      expect(userService.getUserById).toHaveBeenCalledWith(userId);
    });
  });
});
