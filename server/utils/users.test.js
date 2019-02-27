const expect = require('expect');

const {Users} = require('./users');

describe('Users', ()=>{

	var users;
    beforeEach(()=>{
    	users = new Users();
    	users.users = [{
    		id : 12312,
    		name : 'Bandariya',
    		room : 'Pvt room'
    	},
    	{
    		id : 12372,
    		name : 'Namakool',
    		room : 'Public room'
    	},
    	{
    		id : 13312,
    		name : 'Jiyan',
    		room : 'Pvt room'
    	}
    	];
    });

	it('should add user to the array', ()=>{
		var u = new Users();
		var user = {
			id : 2131,
			name : 'Akku',
			room : 'My room'
		};
		var resusers = u.addUser(user.id, user.name, user.room);
		expect(u.users).toEqual([user]);  //Expecting array to contain the given user
	});

	it('should remove user from the list',()=>{
		var removedUser = users.removeUser(13312);
		expect(removedUser).toMatchObject({
		    id : 13312,
    		name : 'Jiyan',
    		room : 'Pvt room'	
		});
	});

	it('should give the users in Pvt room', ()=>{
		var userList = users.getUserList('Pvt room');
		expect(userList).toEqual(['Bandariya', 'Jiyan']);
	});
});